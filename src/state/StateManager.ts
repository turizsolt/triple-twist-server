import IncomingRouter from "../core/network/IncomingRouter";
import OutgoingRouter from "../core/network/OutgoingRouter";
import ButtonGameServer from "./ButtonGameServer";

export default class StateManager {

    private currentState:any; // TODO State

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

                this.outgoing.emit({
                    type: "state",
                    event: "change",
                    parameters: {
                        changeTo: parameters.changeTo
                    }
                });

                if(this.currentState && this.currentState.release) {
                    this.currentState.release();
                    delete this.currentState;
                }
                this.currentState = new ButtonGameServer(this.incoming, this.outgoing);

                break;

        }
    }


}