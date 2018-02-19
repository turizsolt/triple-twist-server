/**
 * Created by zsiri on 2017.05.31..
 */

import {expect} from 'chai';
import Picking = require("../../../src/common/picking/Picking");
import PickingCardQueue from "../../../src/common/picking/PickingCardQueue";
import TeamCard from "../../../src/common/team/TeamCard";
import QueueCard from "../../../src/common/team/QueueCard";

const TEAM0 = 0;
const TEAM1 = 1;
const ADVANCE = new TeamCard(CardType.Advance);
const ASSIST = new TeamCard(CardType.Assist);
const COCOA_SNAIL = new TeamCard(CardType.CocoaSnail);

const JOKER = new TeamCard(CardType.Joker);
const HALF_POINT = new TeamCard(CardType.HalfPoint);

const EXTRA_TIME = new TeamCard(CardType.ExtraTime);
const DOUBLE_CHANCE = new TeamCard(CardType.DoubleChance);
const SKIP_IT = new TeamCard(CardType.SkipIt);
const ROLE_CAST = new TeamCard(CardType.RoleCast);

describe('General', function(){

    /*
     Előny: a csapat az adott játékot a játékvezető által meghatározott előnnyel
     játszhatja. Ez olyan 10-20% könnyítést jelent a többi csapathoz képest.
     Segítő jobb: a csapat +1 játékost küldhet az adott játékba, az eredeti
     játékos(oka)t segíteni, ekkor a csapat létszámelőnnyel játszik. Csapatjáték esetén is
     kijátszható, de ekkor létszámelőnyt nem jelent.
     Kakaóstekercs: Boborján szokta kapni a Nagymamájától postán, csomagban.
     A fenti három kártyára csak annyi a megkötés, hogy egy csapat egyfajta kártyát csak egyszer
     játszhat ki. Tehát nincs dupla előny, meg dupla tekercs és ilyesmi
     */

    function testCard(card:TeamCard){
        it('Only the first of it accepted ('+card.getType().toString()+')', function(){
            var queue:PickingCardQueue = new PickingCardQueue();
            queue.addCard(new QueueCard(TEAM0, card));
            queue.addCard(new QueueCard(TEAM0, card));
            queue.addCard(new QueueCard(TEAM1, card));

            expect(queue.getResult()).to.be.deep.equal([
                new QueueCard(TEAM0, card, CardProcessResult.Accepted),
                new QueueCard(TEAM0, card, CardProcessResult.OnlyOneOfTheSameType),
                new QueueCard(TEAM1, card, CardProcessResult.Accepted),
            ]);
        });
    }

    function testCard2(card:TeamCard){
        it('Only the first of it accepted ('+card.getType().toString()+')', function(){
            var queue:PickingCardQueue = new PickingCardQueue();
            queue.addCard(new QueueCard(TEAM0, card));
            queue.addCard(new QueueCard(TEAM0, card));

            expect(queue.getResult()).to.be.deep.equal([
                new QueueCard(TEAM0, card, CardProcessResult.Accepted),
                new QueueCard(TEAM0, card, CardProcessResult.OnlyOneOfTheSameType),
            ]);
        });
    }

    [ADVANCE, ASSIST, COCOA_SNAIL, JOKER, HALF_POINT].map(testCard);

    [EXTRA_TIME, DOUBLE_CHANCE, SKIP_IT, ROLE_CAST].map(testCard2);

    it('More than three valid cards', function(){
        var queue:PickingCardQueue = new PickingCardQueue();
        queue.addCard(new QueueCard(TEAM0, EXTRA_TIME));
        queue.addCard(new QueueCard(TEAM0, DOUBLE_CHANCE));
        queue.addCard(new QueueCard(TEAM0, SKIP_IT));
        queue.addCard(new QueueCard(TEAM0, ROLE_CAST));

        expect(queue.getResult()).to.be.deep.equal([
            new QueueCard(TEAM0, EXTRA_TIME, CardProcessResult.Accepted),
            new QueueCard(TEAM0, DOUBLE_CHANCE, CardProcessResult.Accepted),
            new QueueCard(TEAM0, SKIP_IT, CardProcessResult.Accepted),
            new QueueCard(TEAM0, ROLE_CAST, CardProcessResult.OnlyThreePerTeam),
        ]);
    });
});
