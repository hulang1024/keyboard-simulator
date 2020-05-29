
export default class Replayer {
  constructor(keyboard) {
    let button = document.createElement('button');
    button.innerText = '观看回放';
    button.onclick = () => {
      editor.clear();
      recorder.stop();
      setTimeout(() => {
        this.play();
      }, 0);
    }
    this.playButton = button;
    this.el = button;

    this.keyboard = keyboard;
    this.playing = false;
  }

  play() {
    let keyboard = this.keyboard;
    let actions = [...recorder.actions];
    if (actions.length == 0) {
      alert('没有录像数据');
      return;
    }
    let startTime = 0;
    let action = actions.shift();

    this.playing = true;
    this._onStart();

    const update = (time) => {
      if (!startTime) startTime = time;
      if ((time - startTime) >= action.time) {
        keyboard.press(action.keyCode, action.key, action.type);
        action = actions.shift();
      }
  
      if (action) {
        this.timer = requestAnimationFrame(update);
      } else {
        this.playing = false;
        this._onEnd();
      }
    }

    setTimeout(() => {
      this.timer = requestAnimationFrame(update);
    }, 200);
  }

  stop() {
    cancelAnimationFrame(this.timer);
    this.playing = false;
    this.playButton.disabled = false;
  }

  _onStart() {
    this.playButton.disabled = true;
  }

  _onEnd() {
    this.playButton.disabled = false;
  }
}