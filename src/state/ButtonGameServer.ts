import IncomingRouter from "../core/network/IncomingRouter";
import OutgoingRouter from "../core/network/OutgoingRouter";
import Server from "./Server";

export default class ButtonGameServer extends Server {
    data: { counter: number };

    constructor(
        incoming:IncomingRouter,
        outgoing:OutgoingRouter
    ) {
        super(incoming, outgoing, "button-game");
        this.data = { counter: 0 };
        this.emitChanged();
    }

    onMessage(event, parameters) {
        if (event) {
            switch (event) {
                case 'increment': this.increment(); break;
                case 'zero': this.zero(); break;
            }
        }
    };

    private increment() {
        this.data.counter++;
        this.emitChanged();
    }

    private zero() {
        this.data.counter = 0;
        this.emitChanged();
    }

    private emitChanged() {
        this.emit({
            event: "changed",
            parameters: this.data
        });
    }
};
