import {expect} from 'chai';
import OutgoingRouter from "../../../src/core/network/OutgoingRouter";
import Peer from "../../../src/core/network/Peer";
import {Socket} from "socket.io";
import {GeneralSocket} from "../../../src/core/network/GeneralSocket";
import * as sinon from "sinon";

const MESSAGE = "message";
const TEST_DATA = {ok: true};
const TEAM_ID = 0;

describe("OutgoingRouter", () => {
    var router:OutgoingRouter;
    var callback:sinon.SinonSpy;
    var socket:GeneralSocket;
    var peer:Peer;

    beforeEach(() => {
        router = new OutgoingRouter();
        callback = sinon.spy();
        socket = {
            emit: callback,
            on: () => {},
            getRef: () => {return new Object();}
        };
        peer = new Peer(PeerType.Team, socket, TEAM_ID);
    });

    it("Added peer emits", () => {
        router.registerPeer(peer);
        router.emit({
            to: PeerType.Team,
            type: MESSAGE,
            event: MESSAGE,
            parameters: TEST_DATA,
            teamId: TEAM_ID
        });
        expect(callback.calledOnce);
    });

    it("Added peer does not emit", () => {
        router.registerPeer(peer);
        router.emit({
            to: PeerType.Screen,
            type: MESSAGE,
            event: MESSAGE,
            parameters: TEST_DATA,
            teamId: TEAM_ID
        });
        expect(callback.called).false;
    });
});
