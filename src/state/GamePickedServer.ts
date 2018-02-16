import Picking from '../common/picking/Picking';
import Persistence from "../core/util/Persistence";
import Server from "./Server";
import IncomingRouter from "../core/network/IncomingRouter";
import OutgoingRouter from "../core/network/OutgoingRouter";

export default class GamePickedServer extends Server {
    private picking:Picking;

    constructor(
        incoming:IncomingRouter,
        outgoing:OutgoingRouter
    ) {
        super(incoming, outgoing, "game-picked");
        this.picking = Picking.getInstance();

        Persistence.getInstance().persist();

        this.emitInitial();
    }

    private emitInitial() {
        this.emit({
            event: "init",
            parameters: {
                result: this.picking.getResult(),
            }
        });
    }
};
