import {SocketManager} from 'socket.io';
import SocketIoRouter from './core/network/SocketIoRouter';
import Router from "./core/network/Router";

const router:Router = new SocketIoRouter(8123);
//const stateController = new StateController(router);
