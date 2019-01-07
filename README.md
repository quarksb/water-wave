# water_wave
this is an animation to simulate water wave which using es6.

利用es6实现互动的水波特效

其实原理很简单，就是将波函数样式表现出来，我先简单说下波函数


我这里采取的实现方式是通过css属性background-image实现的。

波函数类
class Wave {
    constructor(position, startTime, duration = 5000, angular_speed = 20) {
        this.position = position;
        this.startTime = startTime;
        this.stopId = 0;
        //水波持续时间 默认5000ms
        this.duration = duration;
        this.angular_speed = angular_speed;
    }
}

类Wave中最重要的方法

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
                //x<0时，波还没有传播到那里，h=0
                //sinx的取值范围为[-1,1],将其转化为[0,0.5]
                let h = x < 0 ? (Math.sin(x)+1)/4 : 0.25;
                return h;
            }
        )

        let bg = "radial-gradient(circle at ";
        bg += `${this.position.px}px ${this.position.py}px`;
        height.forEach(function (value,index) {
            //颜色可以自取，我这里取了rgb(192,85,181),然后通过透明度表现出波函数
            //你可以尝试在颜色重加入时间变化
            //(100-index)/100表示随距离系数
            //(this.duration-dt)/this.duration表示时间衰减系数
            bg += `,rgba(192,85,181,${value*(100 - index) / 100 * (this.duration - dt) / this.duration}) ${index + 1}%`;
        }.bind(this));
        bg += ")";
        //注意element.style.backgroundImage = 'radial-gradient……'没有效果！这应该是原生dom一个bug.
        element.setAttribute("style", `width:100vw;height:100vh;position:fixed;z-index:100;top:0px;left:0px;background-image: ${bg};`);
        console.info(element);
        //因为requestAnimationFrame(function)默认传参time,没办法实现我们要的传递element,所以封装了一下
        //记得要绑定this,不然第二次执行shuffle就汇报this is not define!
        this.stopId = requestAnimationFrame(function (){this.shuffle(element)}.bind(this));
    }

还有一个方法是取消动画：

    stopMove() {
        cancelAnimationFrame(this.stopId);
        this.stopId = 0;
    }

将波函数加到DOM中
onload = () => {
    document.querySelector("body").onclick = (event) => {
        let covering = document.createElement("div");
        const position = {};
        //解构赋值
        [position.px, position.py] = [event.clientX, event.clientY]
        let wave = new Wave(position, new Date())
        document.querySelector("body").appendChild(covering);
        wave.shuffle(covering);
        //5秒后，将这个蒙皮移出dom
        setTimeout(()=>document.querySelector("body").removeChild(covering),5000);
    }
}
