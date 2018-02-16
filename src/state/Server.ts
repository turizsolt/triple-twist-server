import IncomingRouter from "../core/network/IncomingRouter";
import OutgoingRouter from "../core/network/OutgoingRouter";
import {TypelessEmitOptions} from "../core/Types";

export default class Server {
    protected data: any;
    protected MESSAGE_TYPE:string;

    constructor(
        private incoming:IncomingRouter,
        private outgoing:OutgoingRouter,
        message_type: string
    ) {
        this.MESSAGE_TYPE = message_type;
        this.incoming.registerMessageProcessor(this.MESSAGE_TYPE, (e,p) => this.onMessage(e,p));
    }

    release() {
        this.incoming.unregisterMessageProcessor(this.MESSAGE_TYPE);
    }

    onMessage(event, parameters) {
        console.log("bla-bla");
    };

    protected emit(options:TypelessEmitOptions) {
        this.outgoing.emit({
            type: this.MESSAGE_TYPE,
            teamId: options.teamId,
            to: options.to,
            event: options.event,
            parameters: options.parameters
        });
    }
};
