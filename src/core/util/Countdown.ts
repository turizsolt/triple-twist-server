/**
 * Created by zsiri on 2015.10.24..
 */

export default class Countdown{
    private counter:number;
    private tickFn:(_second:number)=>void;
    private overFn:()=>void;
    private running:boolean;

    public constructor(_second: number, _tick: (_second:number) => void, _over: () => void) {
        this.counter = _second + 1;
        this.tickFn = _tick;
        this.overFn = _over;
        this.running = true;
        this.tick();
    }

    public stop(){
        this.overFn();
        this.abort();
    }

    public abort(){
        this.running = false;
    }

    private tick(){
        if(!this.running) return;

        this.counter--;
        this.tickFn(this.counter);
        if (this.counter > 0) {
            setTimeout(() => { this.tick(); }, 1000);
        } else {
            this.overFn();
        }
    }

}
