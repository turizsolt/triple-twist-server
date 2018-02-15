import {expect} from 'chai';
import Router from "../../../src/core/network/Router";
import Peer from "../../../src/core/network/Peer";
import {Socket} from "socket.io";
import {GeneralSocket} from "../../../src/core/network/GeneralSocket";
import * as sinon from "sinon";

const MESSAGE = "message";
const TEST_DATA = {ok: true};
const TEAM_ID = 0;

describe("Router", () => {
    var router:Router;
    var callback:sinon.SinonSpy;
    var socket:GeneralSocket;
    var peer:Peer;

    beforeEach(() => {
        router = new Router();
        callback = sinon.spy();
        socket = {
            emit: callback,
            on: () => {}
        };
        peer = new Peer(PeerType.Team, socket, TEAM_ID);
    });

    it("Added peer emits", () => {
        router.registerPeer(peer);
        router.send(PeerType.Team, MESSAGE, TEST_DATA, TEAM_ID);
        expect(callback.calledOnce);
    });

    it("Added peer does not emit", () => {
        router.registerPeer(peer);
        router.send(PeerType.Screen, MESSAGE, TEST_DATA, TEAM_ID);
        expect(callback.called).false;
    });
});
