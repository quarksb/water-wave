import { Wave } from "./wave";
import { colorScale } from './color';
const COUNT = 100;

export class WaveEngine {
    duration:number;
    angularVelocity:number;
    waves: Wave[];
    showBox: HTMLElement;
    timer: number;
    constructor (duration = 5000, angularVelocity = 10) {
        // 水波持续时间
        this.duration = duration;
        this.angularVelocity = angularVelocity;
        this.waves = [];
        this.showBox =  document.createElement('div');
        document.querySelector('#app').appendChild(this.showBox);
    }

    shuffle () {
        this.checkWave();
        this.composeStyle(+new Date())
        this.timer = window.requestAnimationFrame(() => this.shuffle());
        if(this.waves.length < 1 && this.timer){
            this.stopMove();
        }
    }

    createWave(wave:Wave, time:number, index:number, num:number){
        const data = wave.getDataByTime(time);
        if(data) {
            let bg = 'radial-gradient(circle at '
            bg += `${wave.pos[0] || 0}px ${wave.pos[1] || 0}px`
            const k = 1/(num-index);
            for(let i=0; i< COUNT; i++) {
                const cssColor = colorScale(data[i]).alpha(data[i])
                bg += `,${cssColor} ${i + 1}%`
            }
            
            bg += ')';
            return  bg;
        } else {
            return null;
        }
        
    }

    addWave([x,y]:[number, number]) {
        const wave  = new Wave([x || 0, y || 0], +new Date());
        this.waves.unshift(wave);
    }

    checkWave() {
        const num = this.waves.length;
        let overWaveNum = 0;
        for(let i=0; i<num; i++){
            if(this.waves[i].isOver){
                this.waves.splice(i, num-i);
            }
        }
    }

    composeStyle(time:number) {
        const num = this.waves.length;
        let style = 'width:100vw;height:100vh;position:fixed;z-index:100;top:0px;left:0px;background-image:';
        
        for(let i=0; i<num; i++) {
            if(i>0){
                style += ',';
            }
            style += this.createWave(this.waves[i], time , i, num);
        }
        style += ';'; 

        this.showBox.setAttribute('style', style);
    }

    stopMove () {
        window.cancelAnimationFrame(this.timer)
        this.timer = null;
        this.showBox.setAttribute('style', 'display: none');
    }
    
    render () {
        // FIXME 由外部传入该能力
        this.shuffle();
    }
}