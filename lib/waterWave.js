class Wave {
    constructor(duration = 5000, angularVelocity = 10) {
        this.stopId = 0;
        //水波持续时间
        this.duration = duration;
        this.angularVelocity = angularVelocity;
    }

    shuffle() {
        let data = [];
        //设置满屏的周期数，即水波的密集程度，我这设置为10
        for (let i = 0; i < 100; i++) {
            data.push(Math.PI / 5 * (i + 1));
        }
        //记录水波的作用时间
        let dt = new Date() - this.startTime;
        if (dt > this.duration) {
            this.stopMove();
            return;
        }

        let height = data.map(
            (value) => {
                let x = value - this.angularVelocity * dt / 1000;
                let h = x < 0 ? (Math.sin(x) + 1) / 4 : 0.25;
                return h;
            }
        )
        
        let bg = "radial-gradient(circle at ";
        bg += `${this.position.px}px ${this.position.py}px`;
        height.forEach(function (value, index) {
            bg += `,rgba(0,0,0,${value*(100 - index) / 100 * (this.duration - dt) / this.duration}) ${index + 1}%`;
        }.bind(this));
        bg += ")";

        this.showBox.setAttribute("style", `width:100vw;height:100vh;position:fixed;z-index:100;top:0px;left:0px;background-image: ${bg};`);
        this.stopId = requestAnimationFrame(function () {
            this.shuffle()
        }.bind(this));
    }

    stopMove() {
        cancelAnimationFrame(this.stopId);
        this.stopId = 0;
        document.querySelector("body").removeChild(this.showBox);
    }

    render(event){
        const covering = this.showBox || document.createElement("div");
        this.showBox = covering;
        this.position = {};
        [this.position.px, this.position.py] = [event.clientX, event.clientY]
        document.querySelector("body").appendChild(covering);
        this.shuffle();
        this.startTime = new Date();
    }
}

export default function (e){
    return new Wave().render(e)
}
