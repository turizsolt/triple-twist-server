/**
 * Created by zsiri on 2015.10.05..
 */
import Game from './Game';
import Picking from '../picking/Picking';

export default class GameInstance{
    private id:number;
    private game:Game;
    private gameData:any;
    private picking:Picking;

    constructor(_id: number, _game:Game, _gameData:any, _picking:Picking){
        this.id = _id;
        this.game = _game;
        this.gameData = _gameData;
        this.picking = _picking;
    }
}
