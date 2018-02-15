import {DataCallback} from "../Types";

interface Router {
    send(destination: PeerType, messageType: string, messageData: any, teamId: number): void;
    registerMessageProcessor(type: string, fn: DataCallback): void;
    unregisterMessageProcessor(type: string, fn: DataCallback): void;
}

export default Router;