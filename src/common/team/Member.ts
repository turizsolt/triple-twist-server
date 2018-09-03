/**
 * Created by zsiri on 2015.10.05..
 */

import Team from './Team';

// TODO create getter/setter, no access to the Team and Member fields

export default class Member{
    private team:Team;
    private id:number;
    private name:string;
    private pic:string;
    private col:string;
    private left:number;
    private locked:boolean;
    private used:number;

    constructor(_id: number, _name:string, _pic:string, _col:string, _left:number,
                _locked?:boolean, _used?:number){
        this.id = _id;
        this.name = _name;
        this.pic = _pic;
        this.col = _col;
        this.left = _left;
        this.locked = _locked || false;
        this.used = _used || 0;
        this.team = null;
    }

    //TODO not in the constructor, this can be harmful on some beautiful day
    public setTeam(_team:Team){
        this.team = _team;
    }

    public serialise():any{
        return {
            id: this.id,
            name: this.name,
            pic: this.pic,
            col: this.col,
            left: this.left,
            locked: this.locked,
            used: this.used
            //team is left out on purpose
        }
    }

    public static deserialise(obj:any):Member {
        return new Member(obj.id, obj.name, obj.pic, obj.col, obj.left, obj.locked, obj.used);
    }

    public getId():number{
        return this.id;
    }

    public getTeam():Team{
        return this.team;
    }

    public getTeamId():number{
        return this.team.getId();
    }

    public isMatchingId(_id:number):boolean{
        return _id == this.id;
    }

    public isAvailable():boolean{
        return this.left > 0 && !this.locked;
    }

    public isNotLocked():boolean{
        return !this.locked;
    }

    public pick():boolean{
        if(this.isAvailable()){
            this.locked = true;
            return true;
        }
        return false;
    }

    public pickForced():boolean{
        this.locked = true;
        return true;
    }

    public removeLock(){
        this.locked = false;
    }

    public decrease(){
        if(this.left > 0){
            this.left--;
        }
    }
}
