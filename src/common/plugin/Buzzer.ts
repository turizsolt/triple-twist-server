/**
 * Created by zsiri on 2015.10.01..
 */

import TeamSet from '../team/TeamSet';
import Pointer from './Pointer';

export default class Buzzer{
    private teamSet: TeamSet;
    private pointer: Pointer;

    private buzzEnabled: boolean;
    private buzzed: number;
    private buzzBanned: boolean[];

    constructor(_pointer: Pointer){
        this.teamSet = TeamSet.getInstance();
        this.pointer = _pointer;

        this.buzzEnabled = false;
        this.buzzed = -1;
        this.buzzBanned = [];
    }

    /* buzzer */

    public resetBuzz(enabled: boolean) {
        this.buzzEnabled = enabled;
        this.buzzed = -1;
        this.buzzBanned = [];
        for (var i = 0; i < this.teamSet.getTeamCount(); i++) {
            this.buzzBanned.push(false);
        }
    }

    public setBuzz(team: number):boolean {
        console.log("BUZZ:", this.buzzEnabled, (this.buzzed == -1), !this.buzzBanned[team]);
        if (this.buzzEnabled && this.buzzed == -1 && !this.buzzBanned[team]) {
            this.buzzed = team;
            return true;
        } else {
            return false;
        }
    }

    public cleanBuzz() {
        this.buzzed = -1;
    }

    public answerBuzz(answer: number) {
        var team = this.buzzed;
        if (team == -1) return;
        switch (answer) { // TODO remove switch - it is three different things
            case -1:
                this.buzzBanned[team] = true;
                this.pointer.addPoint(team ,-1);
                break;

            case 0:
                this.buzzBanned[team] = true;
                break;

            case 1:
                this.pointer.addPoint(team, 1);
                this.releaseBuzz();
                break;
        }

        this.cleanBuzz();
    }

    public releaseBuzz() {
        this.buzzed = -1;
        for (var i = 0; i < this.teamSet.getTeamCount(); i++) {
            this.buzzBanned[i] = false;
        }
    }

    public enableBuzz(enable: boolean) {
        this.buzzEnabled = enable;
    }

    public getBuzz(): any {
        return {
            buzzEnabled: this.buzzEnabled,
            buzzed: this.buzzed,
            buzzBanned: this.buzzBanned
        }
    }
}
