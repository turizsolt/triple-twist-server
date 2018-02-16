/**
 * Created by zsiri on 2015.10.05..
 */

import Member from './Member';
import QueueCard from './QueueCard';
import Util from '../../core/util/Util';

// record
export default class TeamResult{
    public point:number;
    public pointToAdd: number;
    public member: Member[];
    public card: QueueCard[];

    constructor(_point: number, _pointToAdd: number){
        this.point = _point;
        this.pointToAdd = _pointToAdd;
        this.member = [];
        this.card = [];
    }

    public serialise():any{
        return {
            point: this.point,
            pointToAdd: this.pointToAdd,
            member: Util.serialiseArray(this.member),
            card: Util.serialiseArray(this.card)
        };
    }

    public updatePoints(_result:TeamResult) {
        this.point = _result.getPoint();
        this.pointToAdd = _result.getPointToAdd();
    }

    public getPoint():number{
        return this.point;
    }

    public getPointToAdd():number{
        return this.pointToAdd;
    }

}
