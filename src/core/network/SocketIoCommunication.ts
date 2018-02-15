import Peer from './Peer';
import Router from "./Router";
import * as Http from "http";
import {Socket, SocketManager, listen} from 'socket.io';
import Communication from "./Communication";
import {SocketIoSocket} from "./SocketIoSocket";

export default class SocketIoCommunication implements Communication {
    private io: SocketManager;

    constructor(private router:Router, port: number) {
        let server = Http.createServer();
        server.listen(port);
        this.io = listen(server);
        this.io.sockets.on('connection', this.onConnection(this));
    }

    private onConnection(that:SocketIoCommunication) {
        return (socket: Socket) => {
            socket.on('message', that.router.onMessage);
            socket.on('login', that.onLogin(that, socket));
        };
    }

    private onLogin(that:SocketIoCommunication, socket:Socket) {
        return (data: any) => {
            that.router.registerPeer(
                new Peer(
                    data.type,
                    new SocketIoSocket(socket),
                    data.teamId
                )
            );
        }
    }
};
