/**
 * Created by zsiri on 2015.10.01..
 */
import Game from "./Game";
import GameInstance from "./GameInstance";
import Config from "../../../configs/Config";

export default class GameSet{
    private static _instance: GameSet = null;

    private nowPlaying:number;
    private hibernated: GameInstance[];
    private game: Game[];

    constructor() {
        if (GameSet._instance) {
            throw new Error("Error: Instantiation failed: Use getInstance() instead of new.");
        }
        this.constructorx();
        GameSet._instance = this;
    }

    public static getInstance(): GameSet {
        if (GameSet._instance === null) {
            GameSet._instance = new GameSet();
        }
        return GameSet._instance;
    }

    constructorx(){
        this.nowPlaying = 0;
        this.hibernated = [];
        this.game = Config.getInstance().get().gameSet;
    }

    public getMemberPlaysCount(){
        return this.game[this.nowPlaying].getPlays();
    }

    public setNowPlaying(_nowPlaying:number){
        this.nowPlaying = _nowPlaying;
    }

    public getNowPlaying():Game{
        return this.game[this.nowPlaying];
    }
}
