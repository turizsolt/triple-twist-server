import IncomingRouter from "../core/network/IncomingRouter";
import OutgoingRouter from "../core/network/OutgoingRouter";

export default class ButtonGameServer {
    data: { counter: number };

    constructor(
        private incoming:IncomingRouter,
        private outgoing:OutgoingRouter
    ) {
        this.data = { counter: 0 };
        this.incoming.registerMessageProcessor("button-game", this.onMessage);
    }

    release() {
        this.incoming.unregisterMessageProcessor("button-game");
    }

    private onMessage = (event, parameters) => {
        if (event) {
            switch (event) {
                case 'increment': this.increment(); break;
                case 'zero': this.zero(); break;
            }
        }
    };

    private increment() {
        this.data.counter++;
        this.outgoing.send(PeerType.All, 'button-game', {
            type: "button-game",
            event: "changed",
            parameters: this.data
        });
    }

    private zero() {
        this.data.counter = 0;
        this.outgoing.send(PeerType.All, 'button-game', {
            type: "button-game",
            event: "changed",
            parameters: this.data
        });
    }
};
