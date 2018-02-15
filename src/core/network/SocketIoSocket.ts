import {GeneralSocket} from "./GeneralSocket";
import {Socket} from 'socket.io';

export class SocketIoSocket implements GeneralSocket {
    constructor(private socket:Socket) {
    }

    emit(eventName: string, data: any) {
        this.socket.emit(eventName, data);
    }

    on(eventName: string, callback: Function) {
        this.socket.on(eventName, callback);
    }
}
