class Wave {
  constructor (duration = 5000, angularVelocity = 10) {
    this.timer = null
    // 水波持续时间
    this.duration = duration
    this.angularVelocity = angularVelocity
  }

  shuffle () {
    // FIXME 语义化的变量名
    const data = []
    // 设置满屏的周期数，即水波的密集程度，默认为 10
    for (let i = 0; i < 100; i++) {
      data.push(Math.PI / 5 * (i + 1))
    }
    // 记录水波作用时间
    const dt = +new Date() - this.startTime
    if (dt > this.duration) {
      this.stopMove()
      return
    }

    const height = data.map(
      value => {
        const x = value - this.angularVelocity * dt / 1000
        const h = x < 0 ? (Math.sin(x) + 1) / 4 : 0.25
        return h
      }
    )

    let bg = 'radial-gradient(circle at '
    bg += `${this.position.px}px ${this.position.py}px`
    height.forEach((value, index) => {
      bg += `,rgba(0,0,0,${value * (100 - index) / 100 * (this.duration - dt) / this.duration}) ${index + 1}%`
    })
    bg += ')'

    this.showBox.setAttribute('style', `width:100vw;height:100vh;position:fixed;z-index:100;top:0px;left:0px;background-image:${bg};`)
    this.timer = window.requestAnimationFrame(() => this.shuffle())
  }

  stopMove () {
    window.cancelAnimationFrame(this.timer)
    this.timer = null
    document.querySelector('body').removeChild(this.showBox)
  }

  render (event) {
    const covering = this.showBox || document.createElement('div')
    this.showBox = covering
    this.position = {};
    [this.position.px, this.position.py] = [event.clientX, event.clientY]
    // FIXME 由外部传入该能力
    document.querySelector('body').appendChild(covering)
    this.shuffle()
    this.startTime = +new Date()
  }
}

export default e => new Wave().render(e)
