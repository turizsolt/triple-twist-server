import {Socket} from 'socket.io';

export default class Peer {
    constructor(
        public id: number,
        public type: PeerType,
        public socket: Socket,
        public teamId: number=-1
    ) {

    }
};
