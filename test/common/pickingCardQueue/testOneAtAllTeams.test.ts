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
const EXTRA_TIME = new TeamCard(CardType.ExtraTime);
const DOUBLE_CHANCE = new TeamCard(CardType.DoubleChance);
const SKIP_IT = new TeamCard(CardType.SkipIt);
const ROLE_CAST = new TeamCard(CardType.RoleCast);

describe('ExtraTime, DoubleChance, SkipIt and RoleCast', function(){

    /*
     Időkérés:
     a csapat az adott játékban 30 másodperc előnyt kap a másik két csapattal szemben.
     Dupla esély:
     amennyiben a játék végeredményével a csapat nem elégedett, a játék végén
     1 alkalommal kérheti az újrajátszást.
     FONTOS: Amennyiben az egyik csapat időt kér, a másik pedig dupla esélyt, akkor az
     idő mindkét alkalommal jár. A következő piros szöveg is vonatkozik erre a két kártyára.

     Kihagynánk:
     a csapat az adott játékban nem játszik, pontot nem szerez. A másik két csapat 1 és 2 pontért vetekszik.
     Szereposztás: a csapat határozhatja meg, hogy az adott játékban melyik csapatból ki játszik. Ehhez ugyanúgy
     kell játékosokat jelölni előtte a rendszerben és aszerint számol is a gép. De a szóban megnevezett játékosok
     játszanak ténylegesen. Csapatjáték esetén is kijátszható, de ekkor az egész csapatokat meg kell nevezni.

     A fenti 4 kártyatípusra igaz az, hogy egy játékhoz csak egy csapat játszhatja ki.
     Tehát, ha két csapat is időt kérne, csak az kapja meg, aki előbb jelölte be.
     A négy kártyatípus egymástól független, tehát ha valaki dupla esélyt játszik,
     a másik simán kihagyhatja és szereposzthat is.
     */

    function testCard(card:TeamCard) {
        it('Only the first team\'s accepted ('+card.getType().toString()+')', function () {
            var queue: PickingCardQueue = new PickingCardQueue();
            queue.addCard(new QueueCard(TEAM1, card));
            queue.addCard(new QueueCard(TEAM0, card));

            expect(queue.getResult()).to.be.deep.equal([
                new QueueCard(TEAM1, card, CardProcessResult.Accepted),
                new QueueCard(TEAM0, card, CardProcessResult.OnlyOneAtAllTeams),
            ]);
        });
    }

    [EXTRA_TIME, DOUBLE_CHANCE, SKIP_IT, ROLE_CAST].map(testCard);

    it('Crossing cards one one cards, but different with the teams', function () {
        var queue: PickingCardQueue = new PickingCardQueue();
        queue.addCard(new QueueCard(TEAM1, EXTRA_TIME));
        queue.addCard(new QueueCard(TEAM0, DOUBLE_CHANCE));

        expect(queue.getResult()).to.be.deep.equal([
            new QueueCard(TEAM1, EXTRA_TIME, CardProcessResult.Accepted),
            new QueueCard(TEAM0, DOUBLE_CHANCE, CardProcessResult.Accepted),
        ]);
    });
});
