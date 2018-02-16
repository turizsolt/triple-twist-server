/**
 * Created by zsiri on 2017.06.09..
 */

import Team from "../src/common/team/Team";
import Member from "../src/common/team/Member";
import Game from "../src/common/game/Game";
import * as Path from 'path';
import Persistence from "../src/core/util/Persistence";

export default class Config{
    private static _instance: Config = null;
    private teamSet:Team[];
    private gameSet:Game[];
    private eventInfo: any;
    private persistanceFilename: string;

    public static getInstance(): Config {
        if (Config._instance === null) {
            Config._instance = new Config();
        }
        return Config._instance;
    }

    // set the port where the server should start

    public static port:number = 8123;

    constructor() {
        if (Config._instance) {
            throw new Error("Error: Instantiation failed: Use getInstance() instead of new.");
        }
        Config._instance = this;

        // here you can set the texts on the Welcome screen
        // by default the date is the today's date

        this.eventInfo = {
            episode: "Event Title",
            location: "Secret Location",
            date: this.getHungarianDate() // eg. "2017. június 21., szerda"
        };

        // here you may set the filename where the server persist the data
        // which may useful when the server crashes accidentally

        this.persistanceFilename = Path.normalize(__dirname + '/../log/persist.json');
        console.log(this.persistanceFilename);

        // in any case the the server were broken and you had to restart
        // set serverWasBroken to true.
        // this will load the last available data persisted before the server broke.

        const serverWasBroken:boolean = false;

        if(serverWasBroken){
            this.teamSet = Persistence.getInstance().loadTeams();
            console.log(this.teamSet);
        } else {

            // each team will get the following cards
            // you may choose cards from CardType which is not present in the current list

            const createCards = () => {
                return [
                    CardType.Joker,
                    CardType.Joker,
                    CardType.HalfPoint,
                    CardType.Freezer,
                    CardType.SkipIt,
                    CardType.ExtraTime,
                    CardType.Assist,
                    CardType.Advance,
                    CardType.DoubleChance,
                    CardType.CocoaSnail,
                    CardType.CocoaSnail,
                ];
            }

            // each team will get the following anytime cards (the cards that can be
            // played at any time of the event)

            const createAnytimeCards = () => {
                return [
                    CardType.SwapBug,
                    CardType.SwapBug,
                    CardType.IamRight,
                    CardType.Boooring
                ];
            }

            // here you should set the teams, the team members and the images used to represent the members

            /* example:
             var color = new Team(teamId, 'Teams name', 'color', [
             new Member(memberId, "Member's name", "member's image",
             "a color that is visible on top of the image", numberOfPlayingOpportunitiesOfThePlayer),
             ], createCards());
             */

            // note that teamId and memberId SHOULD follow the pattern
            // teams: 0, 1, 2, 3
            // members: 0, 1, 2...; 10, 11, 12...; 20...

            var blue = new Team(0, 'Kék', 'blue', [
                new Member(0, "Andrew", 'blue.moon.jpg', 'black', 4),
                new Member(1, "Bill", 'blue.fish.jpg', 'black', 4),
                new Member(2, "Charlie", 'blue.pound.jpg', 'black', 4),
                new Member(3, "Charlie", 'green.eyes.jpg', 'black', 4),
                new Member(4, "Charlie", 'green.field.jpg', 'black', 4),
                new Member(5, "Charlie", 'green.train.jpg', 'black', 4),
                new Member(6, "Charlie", 'purple.car.jpg', 'black', 4),
                new Member(7, "Charlie", 'purple.sky.jpg', 'black', 4)
            ], createCards(), createAnytimeCards());

            var green = new Team(1, 'Zöld', 'green', [
                new Member(10, "Dave", 'green.eyes.jpg', 'black', 4),
                new Member(11, "Eve", 'green.field.jpg', 'black', 4),
                new Member(12, "Francisco", 'green.train.jpg', 'black', 4)
            ], createCards(), createAnytimeCards());

            var purple = new Team(2, 'Lila', 'purple', [
                new Member(20, "George", 'purple.car.jpg', 'black', 4),
                new Member(21, "Hillary", 'purple.flower.jpg', 'black', 4),
                new Member(22, "Ivon", 'purple.sky.jpg', 'black', 4)
            ], createCards(), createAnytimeCards());

            var golden = new Team(3, 'Arany', 'golden', [
                new Member(30, "George", 'purple.car.jpg', 'black', 4),
                new Member(31, "Hillary", 'purple.flower.jpg', 'black', 4),
                new Member(32, "Ivon", 'purple.sky.jpg', 'black', 4)
            ], createCards(), createAnytimeCards());

            var salmon = new Team(4, 'Lazac', 'salmon', [
                new Member(40, "George", 'purple.car.jpg', 'black', 4),
                new Member(41, "Hillary", 'purple.flower.jpg', 'black', 4),
                new Member(42, "Ivon", 'purple.sky.jpg', 'black', 4)
            ], createCards(), createAnytimeCards());

            var silver = new Team(5, 'Ezüst', 'silver', [
                new Member(50, "George", 'purple.car.jpg', 'black', 4),
                new Member(51, "Hillary", 'purple.flower.jpg', 'black', 4),
                new Member(52, "Ivon", 'purple.sky.jpg', 'black', 4)
            ], createCards(), createAnytimeCards());

            this.teamSet = [blue, green, purple, golden, salmon];//, silver];
        }


        // here you may set the games that will be played during the whole event

        /* example
         this.gameSet.push(new Game(gameId, isAlreadyPlayed,
            gameShortName, gameName, isLocked, playerNumber, background));

         where
            gameId - is the id of the game, you SHOULD give consecutive numbers, from 0
            isAlreadyPlayed - should be false when starting the game
            gameShortName - this name will be shown to the master
            gameName - this name will be shown on the screen
            isLocked - false if any team can choose to play at any time, true if only the gamemaster
                can choose it (eg. because it has dependencies)
            playerNumber - how many people needed to the game (per team)
                you should choose only 1, 2 or 3. 0 means it is a team game and everybody participates
            background - true if the game is played in the background, that means other games
                are played before this game ends
        */

        this.gameSet = [];
        this.gameSet.push(new Game( 0, false, "Inkorr", "Inkorrekt kvíz",  false, 1, false));
        this.gameSet.push(new Game( 1, false, "Tojok",  "Tojok a kvízre",  false, 0, false));
        this.gameSet.push(new Game( 2, false, "Káka",   "Káka",            false, 3, false));
        this.gameSet.push(new Game( 3, false, "Sziget", "Sziget",          false, 2, false));
        this.gameSet.push(new Game( 4, false, "Kanal",  "Kanalas game",    false, 1, false));
        this.gameSet.push(new Game( 5, false, "Ferde",  "Ferde hajlam",    false, 1, false));
        this.gameSet.push(new Game( 6, false, "Fogas",  "Fogas",           false, 1, false));

        this.gameSet.push(new Game( 7, false, "Rajz",   "Rajzgyár",        false, 1, false));
        this.gameSet.push(new Game( 8, false, "Kiürít", "Kiürítési terv",  false, 1, false));
        this.gameSet.push(new Game( 9, false, "K.bang", "Kultúrbang",      false, 0, false));
        this.gameSet.push(new Game(10, false, "Domi",   "Dominósorozat",   false, 2, false));
        this.gameSet.push(new Game(11, false, "Maga",   "Maga marna",      false, 1, false));
        this.gameSet.push(new Game(12, false, "Csőh.",  "Csőhallás",       false, 0, false));
        this.gameSet.push(new Game(13, false, "Babáz",  "Meg a bab ázás",  false, 1, false));
        this.gameSet.push(new Game(14, false, "Műv+",   "Művelet",         false, 1, false));
    }

    public get(){
        return {
            eventInfo: this.eventInfo,
            teamCount: this.teamSet.length,
            teamSet: this.teamSet,
            gameSet: this.gameSet
        }
    }

    public getPersistanceFilename(){
        return this.persistanceFilename;

    }

    private getHungarianDate(){
        const monthList = [
            'január','február','március','április',
            'május','június','július','augusztus',
            'szeptember','október','november','december'];
        const weekdayList = ['vasárnap','hétfő','kedd',
            'szerda','csütörtök','péntek','szombat'];

        const date = new Date();
        const year = date.getFullYear();
        const month = monthList[date.getMonth()];
        const day = date.getDate();
        const weekday = weekdayList[date.getDay()];

        return `${year}. ${month} ${day}., ${weekday}`;
    }
}
