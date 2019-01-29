# Water Wave
Interactive water wave emulating animation using ES6.

Water wave will emerge from your click, and gradually weaken in time (5s by default) and distance.

In fact, water wave is much more complexed than transverse wave, since transverse wave can not spread in water. However, molecules in water surface have both vertical and horizontal movement (hard to see).

So we use a transverse wave propagation along the +x axis to simulate water wave.

For Chinese users, see Chinese analysis on [知乎](https://www.zhihu.com/question/305185891/answer/548610049)

## How to use
For simple usage:

``` js
import waterWave from 'interactive-water-wave';

document.querySelector('body').onclick = (e) => waterWave(e);
```

![Demo](https://pic4.zhimg.com/50/v2-96ec56049de75a8fd8df55e68cccc43d_hd.gif)

## Todo
The color is also editable, but I don't know how to convert your input args into numerical rgb.
