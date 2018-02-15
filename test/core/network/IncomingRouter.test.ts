import {expect} from 'chai';
import {Socket} from "socket.io";
import * as sinon from "sinon";
import IncomingRouter from "../../../src/core/network/IncomingRouter";

const TYPE = "almafa";
const MESSAGE_DATA = {
  type: TYPE,
  event: "default",
  parameters: {ok: true}
};
const MALFORMED_MESSAGE_DATA = {};

describe("IncomingRouter", () => {

    it("Calls registered processor", () => {
        let incoming = new IncomingRouter();
        let callback = sinon.spy();
        incoming.registerMessageProcessor(TYPE, callback);
        incoming.onMessage(MESSAGE_DATA);

        expect(callback.calledOnce);
        expect(callback.calledWith(MESSAGE_DATA));
    });

    it("Does not call unregistered processor", () => {
        let incoming = new IncomingRouter();
        let callback = sinon.spy();
        incoming.registerMessageProcessor(TYPE, callback);
        incoming.unregisterMessageProcessor(TYPE);
        incoming.onMessage(MESSAGE_DATA);

        expect(callback.called).false;
    });

    it("Malformed incoming message, no type", () => {
        let incoming = new IncomingRouter();
        expect(() => incoming.onMessage(MALFORMED_MESSAGE_DATA))
            .throw(Error);
    });

});
