import Peer from './Peer';
import OutgoingRouter from "./OutgoingRouter";
import * as Http from "http";
import {Socket, SocketManager, listen} from 'socket.io';
import Communication from "./Communication";
import {SocketIoSocket} from "./SocketIoSocket";
import IncomingRouter from "./IncomingRouter";

export default class SocketIoCommunication implements Communication {
    private io: SocketManager;

    constructor(
        private incoming:IncomingRouter,
        private outgoing:OutgoingRouter,
        port: number
    ) {
        let server = Http.createServer();
        server.listen(port);
        this.io = listen(server);
        this.io.sockets.on('connection', this.onConnection(this));
    }

    private onConnection(that:SocketIoCommunication) {
        return (socket: Socket) => {
            socket.on('message', that.incoming.onMessage);
            socket.on('login', that.onLogin(that, socket));
        };
    }

    private onLogin(that:SocketIoCommunication, socket:Socket) {
        return (data: any) => {
            that.outgoing.registerPeer(
                new Peer(
                    data.type,
                    new SocketIoSocket(socket),
                    data.teamId
                )
            );

            socket.emit("loggedin", {ok: true});
        }
    }
};
