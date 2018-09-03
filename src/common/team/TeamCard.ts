/**
 * Created by zsiri on 2015.10.05..
 */

export default class Card{
    private type:CardType;
    private used:CardUsed;

    constructor(_type:CardType, _used?:CardUsed){
        this.type = _type;
        this.used = _used || CardUsed.Avaiable;
    }

    public serialise():any{
        return {
            type: this.type,
            used: this.used
        }
    }

    public static deserialise(obj:any):Card {
        return new Card(obj.type, obj.used);
    }

    public isAvailable():boolean{
        return this.used == CardUsed.Avaiable;
    }

    public getType():CardType{
        return this.type;
    }

    public isType(_type:CardType):boolean{
        return this.type == _type;
    }

    public isTypeAndAvailable(_type:CardType):boolean{
        return this.isAvailable() && this.isType(_type);
    }

    public pick(): boolean{
        if(this.isAvailable()){
            this.used = CardUsed.Picked;
            return true;
        }
        return false;
    }

    public use(){
        this.used = CardUsed.Used;
    }

    public isUsed():boolean{
        return this.used == CardUsed.Used;
    }

    public getUsed():CardUsed{
        return this.used;
    }

    public restoreIfUnused(){
        if(this.used == CardUsed.Picked){
            this.used = CardUsed.Avaiable;
        }
    }
}
