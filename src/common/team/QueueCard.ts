/**
 * Created by zsiri on 2015.10.05..
 */

import TeamCard from './TeamCard';

export default class QueueCard{
    private teamId: number;
    private card: TeamCard;
    private processResult: CardProcessResult;

    constructor(_teamId, _card:TeamCard, _processResult:CardProcessResult=CardProcessResult.NotDetermined){
        this.teamId = _teamId;
        this.card = _card;
        this.processResult = _processResult;
    }

    public setProcessResult(_processResult:CardProcessResult):void {
        this.processResult = _processResult;
    }

    public getTeamId():number {
        return this.teamId;
    }

    public isType(_type:CardType):boolean{
        return this.card.isType(_type);
    }

    public getType():CardType{
        return this.card.getType();
    }

    public isPointModifierCard():boolean{
        return [
            CardType.Joker,
            CardType.HalfPoint
        ].indexOf(this.card.getType()) !== -1;
    }

    public use(){
        this.card.use();
    }

    public isUsed():boolean{
        return this.card.isUsed();
    }

    public getUsed():CardUsed{
        return this.card.getUsed();
    }

    public serialise():any{
        return {
            teamId: this.teamId,
            card: this.card.serialise(),
            processResult: this.processResult
        }
    }
}
