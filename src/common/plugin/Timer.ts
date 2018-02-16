/**
 * Created by zsiri on 2015.10.01..
 */

import TeamSet from '../team/TeamSet';

export default class Timer {
    private teamSet: TeamSet;

    private timer:number[];
    private timerRunning:boolean[];
    private timerShared:number;
    private timerSharedRunning:boolean;
    private timerSync:boolean;

    constructor() {
        this.timer = [];
        this.timerRunning = [];
        this.timerShared = 0;
        this.timerSharedRunning = false;
        this.timerSync = true;

        this.teamSet = TeamSet.getInstance();
    }

    public resetTimer() {
        this.timer = [];
        this.timerRunning = [];
        for (var i = 0; i < this.teamSet.getTeamCount(); i++) {
            this.timer.push(0);
            this.timerRunning.push(false);
        }
        this.timerShared = 0;
        this.timerSharedRunning = false;
        this.timerSync = true;
    }

    public getTimer():any {
        return {
            timer: this.timer,
            timerShared: this.timerShared,
            timerSync: this.timerSync,
            timerRunning: this.timerRunning,
            timerSharedRunning: this.timerSharedRunning,
            isAnythingRunning: this.timerRunning.reduce((a, b) => a || b, this.timerSharedRunning)
        };
    }

    public startTimer(team:number) {
        if (team == -1) {
            this.timerSync = true;
            this.timerSharedRunning = true;
            for (var i = 0; i < this.teamSet.getTeamCount(); i++) { // TODO create an easier structure to do sg with all the teams
                this.timerRunning[i] = true;
            }
        } else {
            this.timerSync = false;
            this.timerSharedRunning = false;
            this.timerRunning[team] = true;
        }
        console.log("startTICK", this.timerRunning, this.timer); // TODO wiser logging
        console.log("startTICK2", this.timerSharedRunning, this.timerShared); // TODO wiser logging
    }

    public stopTimer(team:number) {
        if (team == -1) {
            this.timerSharedRunning = false;
            for (var i = 0; i < this.teamSet.getTeamCount(); i++) { // TODO create an easier structure to do sg with all the teams
                this.timerRunning[i] = false;
            }
        } else {
            this.timerRunning[team] = false;

            // if all clocks are stopped, stop shared as well
            var needSharedToStop = true;
            for (var i = 0; i < this.teamSet.getTeamCount(); i++) {
                if (this.timerRunning[i])needSharedToStop = false;
            }

            if (needSharedToStop) {
                this.timerSharedRunning = false;
            }
        }
        console.log("stopTICK", this.timerRunning, this.timer); // TODO wiser logging
        console.log("stopTICK2", this.timerSharedRunning, this.timerShared); // TODO wiser logging
    }

    public tickTimer() {
        if (this.timerSharedRunning) {
            this.timerShared++;
        }
        for (var i = 0; i < this.teamSet.getTeamCount(); i++) { // TODO create an easier structure to do sg with all the teams
            if (this.timerRunning[i]) {
                this.timer[i]++;
            }
        }
        //console.log("TICKTIMER", this.getTimer());
    }
}
