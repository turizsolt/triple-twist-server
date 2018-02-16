/**
 * Created by zsiri on 2017.06.06..
 */

import QueueCard from '../team/QueueCard';
//import Config from '../../../../configs/Config';

export default class PickingCardQueue {
    private cardQueue:QueueCard[];
    private teamCount:number[];
    private resultComputed:boolean;

    public constructor(){
        this.empty();
    }

    public addCard(card:QueueCard){
        this.cardQueue.push(card);
    }

    /* private */

    public empty() {
        this.cardQueue = [];
        this.teamCount = [];
        this.resultComputed = false;
    }

    private checkFreezer():boolean{
        for (var i = 0; i < this.cardQueue.length; i++) {
            if (this.cardQueue[i].isType(CardType.Freezer)) {
                this.cardQueue[i].use();
                return true;
            }
        }
        return false;
    }

    private isJokerAndHalfPoint(cardTypeI,cardTypeJ:number):boolean{
        return cardTypeI == CardType.Joker && cardTypeJ == CardType.HalfPoint ||
            cardTypeI == CardType.HalfPoint && cardTypeJ == CardType.Joker;
    }

    private isTeamHasThreeCards(_teamId:number):boolean{
        return this.teamCount[_teamId] && this.teamCount[_teamId] > 2;
    }

    private countTeamCard(_teamId:number){
        if(!this.teamCount[_teamId]){
            this.teamCount[_teamId] = 0;
        }
        this.teamCount[_teamId] += 1;
    }

    private isOnlyOneCard(cardTypeI:number):boolean {
        return cardTypeI == CardType.ExtraTime ||
            cardTypeI == CardType.DoubleChance ||
            cardTypeI == CardType.SkipIt ||
            cardTypeI == CardType.RoleCast;
    }

    private isIngameCard(cardTypeI:number):boolean {
        return cardTypeI == CardType.SwapBug ||
            cardTypeI == CardType.IamRight ||
            cardTypeI == CardType.Boooring;
    }

    public getResult(){
        this.computeCardQueue();
        return this.cardQueue;
    }

    private computeCardQueue() {
        if(!this.resultComputed) {
            if (this.checkFreezer()) {
                this.computeFreezerCase();
            } else {
                for (var i = 0; i < this.cardQueue.length; i++) {
                    var choosable: CardProcessResult = CardProcessResult.Accepted;

                    var cardTypeI: CardType = this.cardQueue[i].getType();
                    var cardTeamI: number = this.cardQueue[i].getTeamId();

                    if (this.isIngameCard(cardTypeI)) {
                        choosable = CardProcessResult.UseOnlyInGame;
                    } else {
                        for (var j = 0; j < i && (choosable == CardProcessResult.Accepted); j++) {

                            var cardTypeJ: CardType = this.cardQueue[j].getType();
                            var cardTeamJ: number = this.cardQueue[j].getTeamId();

                            if (cardTeamI == cardTeamJ) {
                                if (cardTypeI == cardTypeJ) {
                                    choosable = CardProcessResult.OnlyOneOfTheSameType;
                                }

                                if (this.isJokerAndHalfPoint(cardTypeI, cardTypeJ)) {
                                    choosable = CardProcessResult.OnlyOneJokerAndHalfPoint;
                                }

                                if (this.isTeamHasThreeCards(cardTeamI)) {
                                    choosable = CardProcessResult.OnlyThreePerTeam;
                                }

                            } else if (this.isOnlyOneCard(cardTypeI)) {
                                if (cardTypeI == cardTypeJ) {
                                    choosable = CardProcessResult.OnlyOneAtAllTeams;
                                }
                            }
                        }
                    }

                    if (choosable == CardProcessResult.Accepted) {
                        this.countTeamCard(cardTeamI);
                        this.cardQueue[i].use();
                    }

                    this.cardQueue[i].setProcessResult(choosable);
                }
            }

            this.resultComputed = true;
        }
    }

    private computeFreezerCase() {
        var wasFreezer = false;
        for (var card of this.cardQueue) {
            if (card.isType(CardType.Freezer)) {
                if (!wasFreezer) {
                    card.setProcessResult(CardProcessResult.Accepted);
                    wasFreezer = true;
                } else {
                    card.setProcessResult(CardProcessResult.ThereWereAFasterFreezer);
                }
            } else {
                card.setProcessResult(CardProcessResult.FreezerHasBeenPlayed);
            }
        }
    }
}
