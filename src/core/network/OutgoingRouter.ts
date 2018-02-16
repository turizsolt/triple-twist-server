import Peer from './Peer';
import {Socket, SocketManager, listen} from 'socket.io';
import {EmitMessageOptions, EmitOptions} from "../Types";

export default class OutgoingRouter {
    private peers: Peer[] = [];

    constructor() {
    }

    registerPeer = (peer:Peer) => {
        this.peers.push(peer);
    }

    emit = (options: EmitOptions) => {
        this.peers
            .filter(peer => peer.match(options.to || PeerType.All, options.teamId || -1))
            .map(peer => peer.emit(options.type || "message", OutgoingRouter.getMessageData(options)));
    };

    private static getMessageData(options: EmitOptions): EmitMessageOptions {
        return {
            event: options.event || "event",
            parameters: options.parameters || {}
        };
    }
};
