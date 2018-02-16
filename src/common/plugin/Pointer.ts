/**
 * Created by zsiri on 2015.10.01..
 */

import TeamSet from '../team/TeamSet';

export default class Pointer {
    private teamSet: TeamSet;
    private point: number[];

    constructor() {
        this.teamSet = TeamSet.getInstance();
        this.resetPoint();
    }

    public resetPoint() {
        this.point = [];
        for (var i = 0; i < this.teamSet.getTeamCount(); i++) {
            this.point.push(0);
        }
    }

    public getPoint():any {
        return this.point;
    }

    public addPoint(team:number, point:number) {
        this.point[team] += point;
    }
}
