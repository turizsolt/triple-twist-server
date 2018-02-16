import Peer from './Peer';
import {Socket, SocketManager, listen} from 'socket.io';

export default class OutgoingRouter {
    private peers: Peer[] = [];

    constructor() {
    }

    registerPeer = (peer:Peer) => {
        this.peers.push(peer);
    }

    send = (destination: PeerType, messageType: string, messageData: any, teamId: number= -1) => {
        this.peers
            .filter(peer => peer.match(destination, teamId))
            .map(peer => peer.emit(messageType, messageData));
    }
};
