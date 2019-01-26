class Wave {
    constructor(position, startTime, duration = 5000, angular_speed = 20) {
        //起始位置
        this.position = position;
        this.startTime = startTime;
        this.stopId = 0;
        //水波持续时间
        this.duration = duration;
        this.angular_speed = angular_speed;
    }
    shuffle (element){
        let data = [];
        //设置满屏的周期数，即水波的密集程度，我这设置为10
        for (let i = 0; i < 100; i++) {
            data.push(Math.PI / 5 * (i + 1));
        }
        //记录水波的作用时间
        let dt = new Date() - this.startTime;
        if (dt > this.duration){
            this.stopMove();
            return;
        }

        let height = data.map(
            (value) => {
                let x = value - this.angular_speed * dt / 1000;
                let h = x < 0 ? (Math.sin(x)+1)/4 : 0.25;
                return h;
            }
        )

        let bg = "radial-gradient(circle at ";
        bg += `${this.position.px}px ${this.position.py}px`;
        height.forEach(function (value,index) {
            bg += `,rgba(0,05,0,${value*(100 - index) / 100 * (this.duration - dt) / this.duration}) ${index + 1}%`;
        }.bind(this));
        bg += ")";

        element.setAttribute("style", `width:100vw;height:100vh;position:fixed;z-index:100;top:0px;left:0px;background-image: ${bg};`);
        this.stopId = requestAnimationFrame(function (){this.shuffle(element)}.bind(this));
    }

    stopMove() {
        cancelAnimationFrame(this.stopId);
        this.stopId = 0;
    }
}


onload = () => {
    document.querySelector("body").onclick = (event) => {
        let covering = document.createElement("div");
        const position = {};
        [position.px, position.py] = [event.clientX, event.clientY]
        let wave = new Wave(position, new Date())
        document.querySelector("body").appendChild(covering);
        wave.shuffle(covering);
        setTimeout(()=>document.querySelector("body").removeChild(covering),5000);
    }
}
