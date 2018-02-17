
import IncomingRouter from "../core/network/IncomingRouter";
import OutgoingRouter from "../core/network/OutgoingRouter";
import TeamSet from "../common/team/TeamSet";
import Picking from "../common/picking/Picking";
import Server from "./Server";

export default class GamePickerServer extends Server {
    private counter: number;
    private teamSet: TeamSet;
    private picking: Picking;
    private tick: (number) => void;
    private evaluate: () => void;

    constructor(
        incoming:IncomingRouter,
        outgoing:OutgoingRouter
    ) {
        super(incoming, outgoing, "game-picker");

        this.teamSet = TeamSet.getInstance();
        this.picking = Picking.getInstance();
        this.picking.clean();

        this.tick = (counter:number):void => {
            this.emit({
                event: 'counter',
                parameters: {counter: counter}
            });
        };

        this.evaluate = ():void => {
            this.incoming.onMessage({
                type: "state",
                event: "change",
                parameters: {changeTo: "game-picked"}
            });
        };

        this.picking.startCountdown(this.tick, this.evaluate);

        this.emitInitial();
    }

    release() {
        if(this.counter > 1 && !this.picking.isAllTeamsAreReady()) {
            console.log('released GPS');
            this.picking.abortPickingProcess();
        }
    }

    private emitInitial() {
        this.emit({
            event: "init",
            parameters: {
                team: this.teamSet.getAllTeam(),
                result: this.teamSet.getPoints(),
                memberChoose: this.picking.getMemberPlaysCount(),
                ready: this.picking.getReady()
            }
        });
    }

    onMessage(event, parameters) {
        if (event) {
            switch (event) {
                case 'pick-member': this.member(parameters); break;
                case 'pick-card': this.card(parameters); break;
                case 'pick-ready': this.ready(parameters); break;
            }
        }
    }

    private member(_data: any) {
        console.log('member', _data);
        if (this.picking.pickMember(_data)){
            this.emit({
                to: PeerType.Team,
                teamId: _data.teamId,
                event: 'picked-member',
                parameters: _data
            });
        }
    }

    private card(_data: any) {
        console.log('card', _data);
        if(this.picking.pickCard(_data)){
            this.emit({
                to: PeerType.Team,
                teamId: _data.teamId,
                event: 'picked-card',
                parameters: _data
            });
        }
    }

    private ready(_data: any) {
        console.log('ready', _data);
        if(this.picking.pickReady(_data)){
            this.emit({
                to: PeerType.Team,
                teamId: _data.teamId,
                event: 'picked-ready',
                parameters: _data
            });
        }
    }
};
