export class Timeline {
  constructor() {
    this.animations = [];
    this.requestId = null;
    this.tick = () => {
      let t = Date.now() - this.startTime;
      console.log(t);
      const animations = this.animations.filter(animation => !animation.finished)
      for (let animation of animations) {
        let { object, property, duration, start, end, timingFunction, delay, template, startTime } = animation;

        let progression = timingFunction((t - delay - startTime) / duration);  // 0 - 1之间的数

        if (t > duration + delay + startTime) {
          progression = 1;
          animation.finished = true;
        }

        let value = animation.valueFormProgression(progression); // value 是根据 progression 算出当前值

        object[property] = template(value);

      }
      if (this.animations)
        this.requestId = requestAnimationFrame(this.tick)
    }
    this.state = "inited";
  }

  start() {
    if (this.state !== "inited") {
      return;
    }
    this.state = "playing"
    this.startTime = Date.now()
    this.tick()
  }

  restart() {
    if (this.state === "playing") {
      this.pause()
    }
    this.animations = []
    this.requestId = null;
    this.state = "playing";
    this.startTime = Date.now();
    this.pauseTime = null;
    this.tick()
  }

  add(animation, addTime) {
    this.animations.push(animation);
    animation.finished = false;
    if (this.state == "playing") {
      animation.addTime = addTime !== void 0 ? addTime : Date.now() - this.startTime
    } else {
      animation.addTime = addTime !== void 0 ? addTime : 0;
    }
  }

  // 暂停
  pause() {
    if (this.state !== "playing") {
      return;
    }
    this.state = "paused"
    this.pauseTime = Date.now()
    if (this.requestId !== null) {
      cancelAnimationFrame(this.requestId)
    }
  }
  // 恢复 继续进行
  resume() {
    if (this.state !== "paused") {
      return;
    }
    this.state = "starting"
    this.startTime += Date.now() - this.pauseTime;
    this.tick();
  }
}

export class Animation {
  constructor(object, property, template, start, end, duration, delay, timingFunction, template) {
    this.object = object;
    this.property = property;
    this.template = template;
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.delay = delay;
    this.timingFunction = timingFunction || ((start, end) => {
      return (t) => start + (t / duration) * (end - start)
    });
  }
}

/**
let animation = new Animation(object, property, start, end, duration, delay, timingFunction)
let animation2 = new Animation(object2, property2, start, end, duration, delay, timingFunction)

let timeline = new Timeline;
// 管理多个动画
timeline.add(animation);
timeline.add(animation2);

timeline.start()

timeline.pause()
timeline.resume()

timeline.stop()

setTimeout
setInterval
requestAnimationFrame
 */
