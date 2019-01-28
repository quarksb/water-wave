# water_wave
this is an jsfile which create an interactive animation to emulate a water-wave.

this file using es6. 

water wave will emerge from where you click on the web page, and it will gradually weaken with time (the default value is 5 seconds)and distance.

To be honest, water wave is much complexed than transverse wave, and transverse wave can not spread in water. However, hydrone which in water surface have both vertical movement and Horizontal movement(hardly to see).

So I use a transverse wave propagation which along the +x axis to simulate water wave.

If you are a chinese, you can my chinese analysis on [知乎](https://www.zhihu.com/question/305185891/answer/548610049)

## How to use
if you just want use with default config, you can use like this:
``` js
import waterWave from "interactive-water-wave";
document.querySelector("body").onclick = (e)=>waterWave(e);
```

![效果展示](https://pic4.zhimg.com/50/v2-96ec56049de75a8fd8df55e68cccc43d_hd.gif)

## Todo
The color is also editable, but I don't know how to converse your input value into numerical rgb.
    
