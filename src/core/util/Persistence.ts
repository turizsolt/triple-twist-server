import TeamSet from "../../common/team/TeamSet";
import Config from "../../../configs/Config";
import * as Fs from 'fs';
import Team from "../../common/team/Team";

/**
 * Created by zsiri on 2017.06.22..
 */

export default class Persistence {
    private static _instance:Persistence = null;
    private teamSet:TeamSet;
    private config:Config;
    private filename:string;

    public static getInstance(): Persistence {
        if (Persistence._instance === null) {
            Persistence._instance = new Persistence();
        }
        return Persistence._instance;
    }

    // set the port where the server should start

    public static port:number = 8123;

    private constructor() {
        if (Persistence._instance) {
            throw new Error("Error: Instantiation failed: Use getInstance() instead of new.");
        }
        Persistence._instance = this;

        this.teamSet = null;
        this.config = Config.getInstance();
        this.filename = this.config.getPersistanceFilename();
    }

    public persist():void {
        if(this.teamSet == null) this.teamSet = TeamSet.getInstance();
        Fs.writeFileSync(this.filename, JSON.stringify(this.teamSet.getAllTeam(), null, 2));
    }

    public loadTeams():Team[] {
        const objArray = JSON.parse(Fs.readFileSync(this.filename, {encoding: 'utf-8'}));
        const teams:Team[] = [];

        objArray.map(obj => {teams.push(Team.deserialise(obj))});

        return teams;
    }
}
