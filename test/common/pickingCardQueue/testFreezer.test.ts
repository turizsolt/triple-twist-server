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
const FREEZER = new TeamCard(CardType.Freezer);
const JOKER = new TeamCard(CardType.Joker);
const EXTRA_TIME = new TeamCard(CardType.ExtraTime);

describe('Freezer', function(){

    /*
    Fagyasztó:
    amennyiben egy csapat a fagyasztót kijátssza, abban a játékban csavarkártyát nem lehet kijátszani
    (a kijátszott fagyasztót leszámítva)
    Fagyasztó kártyát egy játékhoz csak egy csapat játszhatja ki. Tehát, ha két csapat is fagyasztást kérne,
    csak az kapja meg, aki előbb jelölte be. Ekkor minden más csavarkártyát elutasít a rendszer.
    */

    it('One freezer is accepted', function(){
        var queue:PickingCardQueue = new PickingCardQueue();
        queue.addCard(new QueueCard(TEAM0, FREEZER));

        expect(queue.getResult()).to.be.deep.equal([
            new QueueCard(TEAM0, FREEZER, CardProcessResult.Accepted)
        ]);
    });

    it('One freezer is accepted, others are rejected', function(){
        var queue:PickingCardQueue = new PickingCardQueue();
        queue.addCard(new QueueCard(TEAM0, FREEZER));
        queue.addCard(new QueueCard(TEAM0, JOKER));
        queue.addCard(new QueueCard(TEAM1, JOKER));
        queue.addCard(new QueueCard(TEAM0, EXTRA_TIME));

        expect(queue.getResult()).to.be.deep.equal([
            new QueueCard(TEAM0, FREEZER, CardProcessResult.Accepted),
            new QueueCard(TEAM0, JOKER, CardProcessResult.FreezerHasBeenPlayed),
            new QueueCard(TEAM1, JOKER, CardProcessResult.FreezerHasBeenPlayed),
            new QueueCard(TEAM0, EXTRA_TIME, CardProcessResult.FreezerHasBeenPlayed),
        ]);
    });

    it('One freezer is accepted, no matter of the order', function(){
        var queue:PickingCardQueue = new PickingCardQueue();
        queue.addCard(new QueueCard(TEAM0, JOKER));
        queue.addCard(new QueueCard(TEAM1, JOKER));
        queue.addCard(new QueueCard(TEAM0, EXTRA_TIME));
        queue.addCard(new QueueCard(TEAM0, FREEZER));

        expect(queue.getResult()).to.be.deep.equal([
            new QueueCard(TEAM0, JOKER, CardProcessResult.FreezerHasBeenPlayed),
            new QueueCard(TEAM1, JOKER, CardProcessResult.FreezerHasBeenPlayed),
            new QueueCard(TEAM0, EXTRA_TIME, CardProcessResult.FreezerHasBeenPlayed),
            new QueueCard(TEAM0, FREEZER, CardProcessResult.Accepted),
        ]);
    });

    it('First freezer is accepted', function(){
        var queue:PickingCardQueue = new PickingCardQueue();
        queue.addCard(new QueueCard(TEAM0, FREEZER));
        queue.addCard(new QueueCard(TEAM1, FREEZER));

        expect(queue.getResult()).to.be.deep.equal([
            new QueueCard(TEAM0, FREEZER, CardProcessResult.Accepted),
            new QueueCard(TEAM1, FREEZER, CardProcessResult.ThereWereAFasterFreezer),
        ]);
    });

    it('First freezer is accepted, no matter which team played it', function(){
        var queue:PickingCardQueue = new PickingCardQueue();
        queue.addCard(new QueueCard(TEAM1, FREEZER));
        queue.addCard(new QueueCard(TEAM0, FREEZER));

        expect(queue.getResult()).to.be.deep.equal([
            new QueueCard(TEAM1, FREEZER, CardProcessResult.Accepted),
            new QueueCard(TEAM0, FREEZER, CardProcessResult.ThereWereAFasterFreezer),
        ]);
    });
});
