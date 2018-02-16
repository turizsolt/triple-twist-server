/**
 * Created by zsiri on 2017.05.05..
 */

import TeamSet from '../team/TeamSet';
import Pointer from './Pointer';

export default class Chooser{
    private teamSet: TeamSet;
    private pointer: Pointer;

    private chosen: number[];
    private secret: boolean;
    private options: [any];
    //private buzzEnabled: boolean;
    //private buzzed: number;
    //private buzzBanned: boolean[];

    constructor(_pointer: Pointer){
        this.teamSet = TeamSet.getInstance();
        this.pointer = _pointer;

        //this.buzzEnabled = false;
        //this.buzzed = -1;
        //this.buzzBanned = [];
        this.chosen = [];
        this.secret = true;
    }

    public setOptions(_options: [any]){
        this.options = _options;
    }

    /* buzzer */

    public resetChooser() { //enabled: boolean) {
        //this.buzzEnabled = enabled;
        //this.buzzed = -1;
        //this.buzzBanned = [];
        this.chosen = [];
        for (var i = 0; i < this.teamSet.getTeamCount(); i++) {
            this.chosen.push(-1);
        }
        this.secret = true;
    }

    public setChoose(team: number, option: number):boolean {
        //console.log("BUZZ:", this.buzzEnabled, (this.buzzed == -1), !this.buzzBanned[team]);
        if (this.chosen[team] == -1) {
            this.chosen[team] = option;
            return true;
        } else {
            return false;
        }
    }

    //public cleanBuzz() {
    //    this.buzzed = -1;
    //}
    public show(){
        this.secret = false;
    }

    public chooseEval(){
        // TODO
    }

    /*public answerBuzz(answer: number) {
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
    */

    public getChosen(): any {
        return {
            secret: this.secret,
            chosen: this.chosen,
            options: this.options
        }
    }
}
