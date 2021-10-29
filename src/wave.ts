import { getNum } from './utils'
import { getLiftCycle } from './utils'
const COUNT = 100;

export class Wave {
    pos:number[]
    startTime:number
    duration :number
    angularVelocity:number
    data: number[]
    isOver:boolean
    lifeCycle:()=>number;
    constructor(pos = [0,0], startTime = 0, duration = 5000, angularVelocity = 10) {
        this.pos = pos;
        this.startTime = startTime;
        this.duration = duration;
        this.angularVelocity = angularVelocity;
        this.data = [];
        this.isOver = false;
        this.lifeCycle = getLiftCycle(startTime, duration, 0.5);
        setTimeout(()=>{
          this.isOver = true;
        }, duration )
    }
    getDataByTime(time = +new Date()){
        // 记录水波作用时间
        const dt = time - this.startTime

        // 设置满屏的周期数，即水波的密集程度，默认为 10
        for (let i = 0; i < COUNT; i++) {
          this.data[i] = (Math.PI / 5 * (i + 1));
        }

        for(let i=0; i<COUNT; i++) {
            const x = this.data[i] - this.angularVelocity * dt / 1000
            const h = (Math.sin(x) + 1) / 2 * this.lifeCycle(time);
            this.data[i] =  getNum(h);
        }
        
        return this.data;
    }
}