import {expect} from 'chai';
import Peer from "../../../src/core/network/Peer";
import {GeneralSocket} from "../../../src/core/network/GeneralSocket";

describe("Peer", () => {
    var socket:GeneralSocket = {
            emit: () => {},
            on: () => {},
            getRef: null
        };

    it("Match ALL", () => {
        let peer:Peer = new Peer(PeerType.Screen, socket);
        expect(peer.match(PeerType.All, -1));
    });

    it("Match THIS peer", () => {
        let peer:Peer = new Peer(PeerType.Team, socket, 0);
        expect(peer.match(PeerType.Team, -1));
    });

    it("Does not match, other type", () => {
        let peer:Peer = new Peer(PeerType.Team, socket, 0);
        expect(peer.match(PeerType.Master, -1)).false;
    });

    it("Does not match, other id", () => {
        let peer:Peer = new Peer(PeerType.Team, socket, 0);
        expect(peer.match(PeerType.Team, 1)).false;
    });
});
