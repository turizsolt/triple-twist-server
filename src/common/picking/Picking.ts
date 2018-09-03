/**
 * Created by zsiri on 2015.10.01..
 */

import GameSet from '../game/GameSet';
import TeamSet from '../team/TeamSet';
import TeamResult from '../team/TeamResult';
import Card from '../team/TeamCard';
import Member from '../team/Member';
import Util from '../../core/util/Util';
import Countdown from '../../core/util/Countdown';
import PickingCardQueue from "./PickingCardQueue";
import QueueCard from "../team/QueueCard";
import {isNullOrUndefined} from "util";

// Todo prettify
// Todo depends to the TeamSet
// Todo refactor the long funs

export default class Picking {
    private static _instance: Picking = null;

    private teamSet: TeamSet;
    private gameSet: GameSet;

    private cardQueue: PickingCardQueue;

    private memberList:Member[][];
    private result:TeamResult[];
    private ready:boolean[];

    private countdown:Countdown;

    constructor() {
        if (Picking._instance) {
            throw new Error("Error: Instantiation failed: Use getInstance() instead of new.");
        }
        this.constructorx();
        Picking._instance = this;
    }

    public static getInstance(): Picking {
        if (Picking._instance === null) {
            Picking._instance = new Picking();
        }
        return Picking._instance;
    }

    private constructorx(){
        this.teamSet = TeamSet.getInstance();
        this.gameSet = GameSet.getInstance();

        //todo replace with clean
        this.memberList = [];
        this.ready = [];
        for(var i = 0; i < this.teamSet.getTeamCount();i++){
            this.memberList.push([]);
            this.ready.push(false);
        }
        this.cardQueue = new PickingCardQueue();
        this.result = null;
    }

    /* starts the countdown */

    public startCountdown(_tick: (_second:number) => void, _over: () => void, _second?:number){
        //var _second = 30; // or 20
        this.countdown = new Countdown(_second || 30, _tick, _over);
    }

    public abortPickingProcess() {
        this.countdown.abort();
        this.releaseLockedCardsAndMembers();
        this.clean();
    }

    /* reset, only for testing */

    public resetMembersAndCards(){
        this.teamSet.resetMembersAndCards();
        this.clean();
    }

    /* cleaning */

    public clean() {
        this.emptyCardQueue();
        this.emptyMemberList();
        this.emptyResult();
        this.emptyReady();
    }

    private emptyResult() {
        this.result = null;
    }

    private emptyCardQueue() {
        this.cardQueue.empty();
    }

    private emptyMemberList() {
        this.memberList = [];
        for (var i = 0; i < this.teamSet.getTeamCount(); i++) {
            this.memberList.push([]);
        }
    }

    private emptyReady() {
        this.ready = [];
        for (var i = 0; i < this.teamSet.getTeamCount(); i++) {
            this.ready.push(false);
        }
    }




    public pickCard(_cardData:any):boolean {
        var card : Card = this.teamSet.findCard(_cardData);
        if(card && card.pick()){
            this.cardQueue.addCard(new QueueCard(_cardData.teamId, card));
            return true;
        }
        return false;
    }

    // pickingMember

    public pickMember(_memberData:any):boolean {
        var member:Member = this.teamSet.findMember(_memberData);

        if(member && member.pick()){
            this.memberList[member.getTeamId()].push(member);
            return true;
        }
        return false;
    }






    public isAllTeamsAreReady():boolean{
        var b:boolean = true;
        for (var i = 0; i < this.teamSet.getTeamCount(); i++) {
            b = b && this.ready[i];
        }
        return b;
    }

    private checkIfAllTeamsAreReady(){
        if(this.isAllTeamsAreReady()){
            this.countdown.stop();
        }
    }

    public pickReady(_data:any) {
        var oldReady:boolean = this.ready[_data.teamId];
        this.ready[_data.teamId] = true;
        this.checkIfAllTeamsAreReady();
        return !oldReady;
    }








    private computeMemberList() {
        this.addSomeMembersRandomly();
        this.decreaseMembers();
    }

    private addSomeMembersRandomly(){
        // is enought member?
        // if not add some
        for (var i = 0; i < this.teamSet.getTeamCount(); i++) {
            var memberList = this.memberList[i];
            //console.log('membList', memberList.length, this.getMemberPlaysCount());

            //a. too much members, not possible
            if (memberList.length > this.getMemberPlaysCount()) {
                //throw new Error("Too much members.");
                this.memberList[i] = this.memberList[i].slice(0,this.getMemberPlaysCount());

            //b. need to add some random people
            } else if (memberList.length < this.getMemberPlaysCount()) {
                var missing = this.getMemberPlaysCount() - memberList.length;
                //console.log('missing', missing);
                for (var j = 0; j < missing; j++) {
                    memberList.push(this.teamSet.getRandomAvailableMember(i));
                }
                //console.log('membList2: ', memberList);
            }

            //c. everything is fine, nothing to do
        }
}

    // decrease the count, that shows how many times a member is able to enroll a game
    private decreaseMembers(){
        this.teamSet.removeMemberLocks();

        for (var i = 0; i < this.teamSet.getTeamCount(); i++) {
            var memberList = this.memberList[i];
            for (var ind in memberList) {
                memberList[ind].decrease();
            }
        }
    }






    // This function returns the result of the picking
    // If there is no result at the moment it also computes it

    public getResult(shouldSerialise?:boolean):any {
        shouldSerialise = shouldSerialise === undefined || shouldSerialise;
        if (!this.result) {

            this.result = [];

            this.computeMemberList();

            for (var i = 0; i < this.teamSet.getTeamCount(); i++) {
                var teamResult = this.teamSet.getResult(i);

                for (var member of this.memberList[i]) {
                    var memberId = member.getId();
                    teamResult.member.push(this.teamSet.findMember({teamId: i, memberId:memberId}));
                }

                this.result.push(teamResult);

                var cardQueueResult = this.cardQueue.getResult();
                this.teamSet.restoreUnusedCards();


            }

            for (var card of cardQueueResult) {
                //console.log('top:', top);
                //console.log('pr:', this.result);
                this.result[card.getTeamId()].card.push(card);
            }
        }else {
            for (var i = 0; i < this.teamSet.getTeamCount(); i++) {
                this.result[i].updatePoints(this.teamSet.getResult(i));
            }
        }

        if(shouldSerialise) return Util.serialiseArray(this.result);
        else return this.result;
    }


    public getMemberPlaysCount():number {
        return this.gameSet.getMemberPlaysCount();
    }

    public getReady():boolean[] {
        return this.ready;
    }

    private releaseLockedCardsAndMembers() {
        for (var i = 0; i < this.teamSet.getTeamCount(); i++) {
            let team = this.teamSet.getTeam(i);
            team.removeMemberLocks();
            team.restoreUnusedCards();
        }
    }
}
