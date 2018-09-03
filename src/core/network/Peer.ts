import {Socket} from 'socket.io';
import {GeneralSocket} from "./GeneralSocket";

export default class Peer {
    // removed id:number
    constructor(
        public type: PeerType,
        public socket: GeneralSocket,
        public teamId?: number
    ) {
        if(!teamId) {
            this.teamId = -1;
        }
    }

    emit(eventName:string, data:any) {
        this.socket.emit(eventName, data);
    }

    match(destination: PeerType, teamId: number) {
        if(destination == PeerType.All) return true;
        if(teamId === -1) {
            return destination == this.type;
        } else {
            return destination == this.type && teamId == this.teamId;
        }
    }

    isSame(compSocket: GeneralSocket):boolean {
        return this.socket.getRef() === compSocket.getRef();
    }
};
