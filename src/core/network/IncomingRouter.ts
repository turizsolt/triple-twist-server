import {MessageCallback} from "../Types";

export default class IncomingRouter {
    private messageProcessors: MessageCallback[] = [];

    constructor() {
    }

    onMessage(data:any) {
        if(data.type) {
            let type = data.type;
            if(this.messageProcessors[type]) {
                this.messageProcessors[type](data.event, data.parameters);
            }
        } else {
            throw new Error("Malformed message.");
        }
    }

    registerMessageProcessor(type: string, fn: MessageCallback):void {
        this.messageProcessors[type] = fn;
    }

    unregisterMessageProcessor(type: string):void {
        this.messageProcessors[type] = null;
        delete this.messageProcessors[type];
    }
};
