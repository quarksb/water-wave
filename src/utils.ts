export function getNum(val:number, precision = 2) {
    const num = 10 ** precision;
    return Math.floor(val * num) / num;
}

export function smoothStep(startTime: number, endTime:number, num: number) {
    const x = (num - startTime) / (endTime - startTime); 
    // Evaluate polynomial
    return x * x * (3 - 2 * x);
}

export function getLiftCycle(startTime: number, duration: number, peakPercent: number){
    const endTime = startTime + duration;
    const changeTime = duration * (1-peakPercent) / 2;

    const start1 = startTime;
    const end1 = start1 + changeTime

    const start2 = endTime;
    const end2 = endTime - changeTime;
    const middleTime = startTime + duration/2;

    return (time: number)=>{
        if(time<start1){
            return 0
        }else if(time<end1){
            return smoothStep(start1, end1, time);
        }else if(time<end2){
            return 1
        }else if(time<start2){
            return smoothStep(start2, end2, time);
        }else{
            return 0
        }
    }
}