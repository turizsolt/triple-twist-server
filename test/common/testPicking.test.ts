/**
 * Created by zsiri on 2017.05.31..
 */

import {expect} from 'chai';
import Picking from '../../src/common/picking/Picking';

describe('Picking', function(){
    // TODO how to expect error?
    //var p2:Picking = new Picking();

    it('Picking a member', function(){
        var picking:Picking = Picking.getInstance();
        picking.resetMembersAndCards();

        picking.startCountdown(function(){}, function(){});
        picking.pickMember({memberId: 2, teamId: 0});

        var result = picking.getResult();
        expect(result[0].member[0].id).to.be.equal(2);

    });

    it('Picking a card', function(){
        var picking:Picking = Picking.getInstance();
        picking.resetMembersAndCards();

        picking.startCountdown(function(){}, function(){});
        picking.pickCard({teamId: 0, cardId: 1, cardType: 0});

        var result = picking.getResult();
        expect(result[0].card[0].card.type).to.be.equal(0);
        expect(result[0].card[0].card.used).to.be.equal(CardUsed.Used);

    });

    // TODO DI - dependencí injection eg. inversify
    // How to inject TeamSet and GameSet into the tests
    // How to reset completely all the variables - make a new function for that?

    /* TODO common cases

     it("Loads according to team counts, team member counts and cards", function(){});
     make a preset function

     describe("Member picking", function(){
        it("Every team choses a member", function(){});
        it("There is random pick - cause the lack of picking by the team", function(){});
        it("Over picking, should refuse the additional ones", function(){});
        it("Same member twice, should count only once", function(){});
        it("Multiple member pick", function(){});
        it("No member pick is needed", function(){});
     });

     describe("Card picking - one team only", function(){
        it("No card has been picked", function(){});
        it("Valid one card picking", function(){});
        it("More than three cards were picked, only three is valid", function(){});
        it("Picked a card type more than available", function(){});
        it("Picked a freezer, no other cards effective", function(){});
        it("Picked a joker, no halfer is effective", function(){});
        // TODO review all the rules
     });

     describe("Card picking - interfearing teams", function(){
        it("More team pickes X, only the first is effective", function(){});
        it("A team picked a freezer", function(){});
        it("Multiple teams picked freezers", function(){});
        // TODO review all the rules
     });

     describe("Ready of picking", function(){
        it("Every team is ready, should evaluate instantly", function(){});
        it("Waiting for the end of the countdown", function(){});
        it("No member pick is effective after timeout", function(){});
        it("No card pick is effective after timeout", function(){});
     });

     */

});
