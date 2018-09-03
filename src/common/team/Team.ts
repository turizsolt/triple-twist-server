/**
 * Created by zsiri on 2015.10.05..
 */

import Util from '../../core/util/Util';
import TeamResult from './TeamResult';
import Member from './Member';
import Card from './TeamCard';

// TODO create getter/setter, no access to the Team and Member fields

export default class Team{
    private id: number;
    private name: string;
    private color: string;
    private pointToAdd: number;
    private point: number;
    private member: Member[];
    private card: Card[];
    private anytimeCard: Card[];

    constructor(_id:number, _name: string, _color:string, _member: Member[],
                _cardType: CardType[], _anytimeCardType: CardType[],
                _card?: Card[], _anytimeCard?: Card[],
                _point?:number, _pointToAdd?:number) {
        this.id = _id;
        this.name = _name;
        this.color = _color;
        this.pointToAdd = _pointToAdd;
        this.point = _point;
        this.member = [];
        for(var ind in _member){
            _member[ind].setTeam(this);
            this.member.push(_member[ind]);
        }
        this.card = [];
        if(_cardType) {
            for(var ind in _cardType){
                this.card.push(new Card(_cardType[ind]));
            }
        } else if(_card) {
            for(var ind in _card){
                this.card.push(_card[ind]);
            }
        }


        this.anytimeCard = [];
        if(_anytimeCardType) {
            for(var ind in _anytimeCardType) {
                this.anytimeCard.push(new Card(_anytimeCardType[ind]));
            }
        } else if(_card) {
            for(var ind in _anytimeCard) {
                this.anytimeCard.push(_anytimeCard[ind]);
            }
        }
    }

    public serialise():any{
        return {
            id: this.id,
            name: this.name,
            color: this.color,
            pointToAdd: this.pointToAdd,
            point: this.point,
            member: Util.serialiseArray(this.member),
            card: Util.serialiseArray(this.card),
            anytimeCard: Util.serialiseArray(this.anytimeCard),
        };
    }

    public static deserialise(obj:any):Team{
        return new Team(obj.id, obj.name, obj.color,
            Util.deserialiseArray(obj.member,      Member.deserialise),
            null, null,
            Util.deserialiseArray(obj.card,        Card.deserialise),
            Util.deserialiseArray(obj.anytimeCard, Card.deserialise),
            obj.point, obj.pointToAdd);
    }

    public getId():number{
        return this.id;
    }

    // Point

    public setPoint(_point: number){
        this.pointToAdd = _point;
    }

    public addPoint(_point: number){
        this.pointToAdd += _point;
    }

    public commitPoint(){
        this.point += this.pointToAdd;
        this.pointToAdd = 0;
    }

    public getPoint(){
        return this.point;//Math.random()*100|0;
    }

    public getPointToAdd(){
        return this.pointToAdd;
    }

    public getResult():TeamResult{
        return new TeamResult(this.getPoint(), this.getPointToAdd());
    }

    // Member

    public getMember(_memberId:number):Member{
        return this.member[_memberId];
    }

    public findMember(_memberId:number):Member{
        for(var ind in this.member){
            if(this.member[ind].isMatchingId(_memberId)){
                return this.member[ind];
            }
        }
        return null;
    }

    public removeMemberLocks() {
        for(var ind in this.member){
            this.member[ind].removeLock();
        }
    }

    public getRandomAvailableMember(){
        var tries = 5000;
        while(tries > 0){
            var rand = Math.random()*this.member.length|0;
            if(this.member[rand].isAvailable()){
                this.member[rand].pick();
                return this.member[rand];
            }
            tries--;
        }

        // here there is only a rule that the people should not be picked
        tries = 5000;
        while(tries > 0){
            var rand = Math.random()*this.member.length|0;
            if(this.member[rand].isNotLocked()){
                this.member[rand].pickForced();
                return this.member[rand];
            }
            tries--;
        }

        //it's a total disaster, should never happen, but will be
        var rand = Math.random()*this.member.length|0;
        this.member[rand].pickForced();
        return this.member[rand];
    }

    // Card

    public getCard(_cardId):Card{
        return this.card[_cardId];
    }

    public findCard(_cardType:CardType):Card{
        for(var ind in this.card){
            if(this.card[ind].isTypeAndAvailable(_cardType)){
                return this.card[ind];
            }
        }
        return null;
    }

    public restoreUnusedCards(){
        for(var ind in this.card){
            this.card[ind].restoreIfUnused();
        }
    }

    public getAnytimeCard(_cardId):Card{
        return this.anytimeCard[_cardId];
    }

    public findAnytimeCard(_cardType:CardType):Card{
        for(var ind in this.anytimeCard){
            if(this.anytimeCard[ind].isTypeAndAvailable(_cardType)){
                return this.anytimeCard[ind];
            }
        }
        return null;
    }


}
