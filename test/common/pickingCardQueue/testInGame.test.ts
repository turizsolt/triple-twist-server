/**
 * Created by zsiri on 2017.05.31..
 */

import {expect} from 'chai';
import Picking = require("../../../src/common/picking/Picking");
import PickingCardQueue from "../../../src/common/picking/PickingCardQueue";
import TeamCard from "../../../src/common/team/TeamCard";
import QueueCard from "../../../src/common/team/QueueCard";

const TEAM0 = 0;
const BOOORING = new TeamCard(CardType.Boooring);

describe('InGame', function(){

    /*
     TODO implement in-game rules
     */

    it('An ingame card', function(){
        var queue:PickingCardQueue = new PickingCardQueue();
        queue.addCard(new QueueCard(TEAM0, BOOORING));

        expect(queue.getResult()).to.be.deep.equal([
            new QueueCard(TEAM0, BOOORING, CardProcessResult.UseOnlyInGame),
        ]);
    });

});
