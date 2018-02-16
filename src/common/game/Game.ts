/**
 * Created by zsiri on 2015.10.05..
 */

export default class Game{
    //jótanács: a 10 karakternél hosszabb szavakat válasszuk el!
    // id: a játék azonosítója
    // played: játszottuk-e már, a játék elején konstans false
    // name: a játék neve
    // locked: false, ha bármikor választható, true, ha csak a játékmester választhatja
    // plays: hány ember kell a játékhoz, 0: csapatjáték
    // background: true, ha a játéknak nincs azonnal vége és a háttérben folytatódik
    id: number;
    played: boolean;
    shortName: string;
    name: string;
    locked: boolean;
    plays: number;
    background: boolean;

    constructor(_id: number, _played:boolean, _shortName:string, _name:string, _locked:boolean, _plays: number, _background:boolean){
        this.id = _id;
        this.played = _played;
        this.shortName = _shortName;
        this.name = _name;
        this.locked = _locked;
        this.plays = _plays;
        this.background = _background;
    }

    public getPlays(){
        return this.plays;
    }
}
