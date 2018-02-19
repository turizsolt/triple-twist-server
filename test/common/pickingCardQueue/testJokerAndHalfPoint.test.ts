/**
 * Created by zsiri on 2017.05.31..
 */

import {expect} from 'chai';
import Picking = require("../../../src/common/picking/Picking");
import PickingCardQueue from "../../../src/common/picking/PickingCardQueue";
import TeamCard from "../../../src/common/team/TeamCard";
import QueueCard from "../../../src/common/team/QueueCard";

const TEAM0 = 0;
const JOKER = new TeamCard(CardType.Joker);
const HALF_POINT = new TeamCard(CardType.HalfPoint);

describe('Joker and HalfPoint', function(){

    /*
     Joker:
     a csapat az adott játékban elért pontszáma (0, 1, 2) helyett a dupláját (0, 2, 4) kapja.
     Felező:
     a csapat az adott játékban elért pontszáma (0, 1, 2) helyett a felét (0, 0.5, 1) kapja.
     Joker és felező kártyákból minden csapat egy játékhoz összesen legfeljebb egy kártyát
     használhat fel. Tehát jokert és felezőt egyszerre nem lehet kijátszani.
     */

    it('Only the first accepted', function(){
        var queue:PickingCardQueue = new PickingCardQueue();
        queue.addCard(new QueueCard(TEAM0, JOKER));
        queue.addCard(new QueueCard(TEAM0, HALF_POINT));

        expect(queue.getResult()).to.be.deep.equal([
            new QueueCard(TEAM0, JOKER, CardProcessResult.Accepted),
            new QueueCard(TEAM0, HALF_POINT, CardProcessResult.OnlyOneJokerAndHalfPoint),
        ]);
    });

    it('Only the first accepted, no matter the order', function(){
        var queue:PickingCardQueue = new PickingCardQueue();
        queue.addCard(new QueueCard(TEAM0, HALF_POINT));
        queue.addCard(new QueueCard(TEAM0, JOKER));

        expect(queue.getResult()).to.be.deep.equal([
            new QueueCard(TEAM0, HALF_POINT, CardProcessResult.Accepted),
            new QueueCard(TEAM0, JOKER, CardProcessResult.OnlyOneJokerAndHalfPoint),
        ]);
    });

});
