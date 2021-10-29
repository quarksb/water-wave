import { WaveEngine } from "../src/index";
import { getLiftCycle } from "../src/utils";

const appNode = document.getElementById('app');
appNode.style.width='100%';
appNode.style.height='100vh';
const waveEngine = new WaveEngine();

appNode.onclick = (e)=>{
    waveEngine.addWave([e.clientX, e.clientY])
    waveEngine.render();
}

appNode.click();

