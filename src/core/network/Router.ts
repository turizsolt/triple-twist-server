import CommunicationPeer from './Peer';
import {DataCallback} from "../Types";
import * as Http from "http";
import {Socket, SocketManager, listen} from 'socket.io';

export default class Router {
    private peers: CommunicationPeer[];
    private messageProcessors: DataCallback[];

    constructor() {
        this.peers = [];
        this.messageProcessors = [];
    }

    registerPeer(peer:CommunicationPeer) {
        this.peers.push(peer);
    }


    onMessage(data:any) {
        if(data.type) {
            let type = data.type;
            if(this.messageProcessors[type]) {
                this.messageProcessors[type](data);
            }
        }
    }

    send(destination: PeerType, messageType: string, messageData: any, teamId: number= -1) {
        this.peers
            .filter(peer => peer.match(destination, teamId))
            .map(peer => peer.emit(messageType, messageData));
    }

    registerMessageProcessor(type: string, fn: DataCallback):void {
        this.messageProcessors[type] = fn;
    }

    unregisterMessageProcessor(type: string, fn: DataCallback):void {
        this.messageProcessors[type] = null;
        delete this.messageProcessors[type];
    }
};
