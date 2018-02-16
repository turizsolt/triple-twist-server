/**
 * Created by zsiri on 2015.10.01..
 */

import Util from '../../core/util/Util';

import Team from './Team';
import TeamResult from './TeamResult';
import Member from './Member';

import Card from './TeamCard';
import Config from "../../../configs/Config";

// team
export default class TeamSet {
    private static _instance: TeamSet = null;
    private team:Team[];

    constructor() {
        if (TeamSet._instance) {
            throw new Error("Error: Instantiation failed: Use getInstance() instead of new.");
        }
        this.resetMembersAndCards();
        TeamSet._instance = this;
    }

    public static getInstance(): TeamSet {
        if (TeamSet._instance === null) {
            TeamSet._instance = new TeamSet();
        }
        return TeamSet._instance;
    }

    public resetMembersAndCards(){
        this.team = Config.getInstance().get().teamSet;
    }


    public getTeam(team:number):Team {
        return this.team[team];
    }

    public getAllTeam():any {
        return Util.serialiseArray(this.team);
    }

    public getTeamCount():number {
        return this.team.length;
    }

    // point

    public setPoint(_teamId:number, _point:number) {
        this.team[_teamId].setPoint(_point);
    }

    public addPoint(_teamId:number, _point:number) {
        this.team[_teamId].addPoint(_point);
    }

    public commitPoints() {
        for (var i = 0; i < this.getTeamCount(); i++) {
            var team = this.team[i].commitPoint();
        }
    }

    public modifyPoints(result:TeamResult[]) {
        for (var i = 0; i < this.getTeamCount(); i++) {
            console.log('result', result);
            var modifierCards = result[i].card.filter(x => x.isPointModifierCard() && x.isUsed());
            if(modifierCards.length > 0) {
                var newPoint = this.team[i].getPointToAdd();
                if (modifierCards[0].isType(CardType.Joker)) {
                    newPoint *= 2;
                } else if (modifierCards[0].isType(CardType.HalfPoint)) {
                    newPoint /= 2;
                }
                this.team[i].setPoint(newPoint);
            }
        }
    }

    public getPoints(): TeamResult[] {
        var points = [];
        for (var i = 0; i < this.getTeamCount(); i++) {
            points.push(this.team[i].getResult());
        }
        return points;
    }

    // team member

    public getMember(_teamId:number, _memberId:number){
        return this.team[_teamId].getMember(_memberId);
    }

    // TODO any is dangerous
    public findMember(_data:any):Member{
        if(!this.team[_data.teamId])return null;
        if(_data.memberId === undefined)return null;

        return this.team[_data.teamId].findMember(_data.memberId);
    }

    public removeMemberLocks(){
        for(var ind in this.team){
            this.team[ind].removeMemberLocks();
        }
    }

    public getRandomAvailableMember(_teamId):Member{
        return this.team[_teamId].getRandomAvailableMember();
    }

    // team card

    public getCard(_teamId:number, _cardId:number){
        return this.team[_teamId].getCard(_cardId);
    }

    // TODO any is dangerous
    public findCard(_data:any):Card{
        if(!this.team[_data.teamId])return null;
        if(_data.cardType === undefined)return null;

        return this.team[_data.teamId].findCard(_data.cardType);
    }

    public restoreUnusedCards(){
        for(var ind in this.team){
            this.team[ind].restoreUnusedCards();
        }
    }

    public getAnytimeCard(_teamId:number, _cardId:number){
        return this.team[_teamId].getAnytimeCard(_cardId);
    }

    // TODO any is dangerous
    public findAnytimeCard(_data:any):Card{
        if(!this.team[_data.teamId])return null;
        if(_data.cardType === undefined)return null;

        return this.team[_data.teamId].findAnytimeCard(_data.cardType);
    }

    // result

    public getResult(_teamId:number){
        return this.team[_teamId].getResult();
    }


}
