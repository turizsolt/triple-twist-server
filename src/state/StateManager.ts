import IncomingRouter from "../core/network/IncomingRouter";
import OutgoingRouter from "../core/network/OutgoingRouter";

export default class StateManager {

    constructor(
        private incoming:IncomingRouter,
        private outgoing:OutgoingRouter
    ) {
        incoming.registerMessageProcessor("state", this.onMessage);
    }

    onMessage = (event:string, parameters:any) => {
        console.log(event, parameters);
        switch(event) {
            case "change":
                console.log(event);
                var message = {
                    type: "state",
                    event: "change",
                    parameters: {
                        changeTo: parameters.changeTo
                    }
                };
                this.outgoing.send(PeerType.All, "message", message);
                break;
        }
    }


}