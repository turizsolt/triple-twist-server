import Peer from './Peer';
import {DataCallback} from "../Types";
import Router from "./Router";
import * as Http from "http";
import {Socket, SocketManager, listen} from 'socket.io';

export default class SocketIoRouter implements Router {
    private peers: Peer[];
    private messageProcessors: DataCallback[];
    private io: SocketManager;

    constructor(port: number) {
        this.peers = [];
        this.messageProcessors = [];

        let server = Http.createServer();
        server.listen(port);
        this.io = listen(server);
        this.io.sockets.on('connection', this.onConnection(this));
    }

    private onConnection(that:SocketIoRouter) {
        return (socket: Socket) => {
            socket.on('login', that.onLogin(that, socket));
            socket.on('message', that.onMessage(that));
        };
    }

    private onLogin(that:SocketIoRouter, socket:Socket) {
        return (data: any) => {
            var _next = that.peers.length;
            that.peers.push(new Peer(_next, data.type, socket, data.teamId));
            socket.emit('loggedin', { id: _next });
        };
    }

    private onMessage(that:SocketIoRouter) {
        return (data:any) => {
            if(data.type) {
                let type = data.type;
                if(that.messageProcessors[type]) {
                    that.messageProcessors[type](data);
                }
            }
        };
    }

    send(destination: PeerType, messageType: string, messageData: any, teamId: number= -1) {
        this.peers.forEach((_value: Peer, _index: number) => {
            if (_value.type == destination || destination == PeerType.All) {
                if (destination != PeerType.Team || teamId == _value.teamId) {
                    _value.socket.emit(messageType, messageData);
                }
            }
        });
    }

    registerMessageProcessor(type: string, fn: DataCallback):void {
        this.messageProcessors[type] = fn;
    }

    unregisterMessageProcessor(type: string, fn: DataCallback):void {
        this.messageProcessors[type] = null;
        delete this.messageProcessors[type];
    }
};
