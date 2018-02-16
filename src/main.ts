import {SocketManager} from 'socket.io';
import OutgoingRouter from "./core/network/OutgoingRouter";
import IncomingRouter from "./core/network/IncomingRouter";
import Communication from "./core/network/Communication";
import SocketIoCommunication from "./core/network/SocketIoCommunication";
import StateManager from "./state/StateManager";

const outgoing:OutgoingRouter = new OutgoingRouter();
const incoming:IncomingRouter = new IncomingRouter();
const communication:Communication = new SocketIoCommunication(incoming, outgoing, 8123);
const stateManager:StateManager = new StateManager(incoming, outgoing);
