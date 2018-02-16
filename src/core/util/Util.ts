export default class Util{

    public static serialiseArray(arr:any[]):any {
        var ret:any = [];
        for(var ind in arr){
            ret.push(arr[ind].serialise());
        }
        return ret;
    }

    public static deserialiseArray<T>(arr:any[], deserialise:(any) => T):T[] {
        var ret:T[] = [];
        for(var ind in arr){
            ret.push(deserialise(arr[ind]));
        }
        return ret;
    }
}
