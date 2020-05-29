export default class Recorder {
  constructor(keyboard) {
    this.keyboard = keyboard;

    keyboard.signals.keydown.push((event) => {
      this.onKey(event);
    });
    keyboard.signals.keyup.push((event) => {
      this.onKey(event);
    });

    this.actions = [];
    this.started = false;

    let recordButton = document.createElement('button');
    recordButton.innerText = '开始录像';
    recordButton.onclick = () => {
      if (this.started) {
        this.stop();
      } else {
        editor.clear();
        replayer.stop();
        this.start();
      }
    };
    this.recordButton = recordButton;
    this.el = recordButton;
  }
  
  start() {
    this.actions = [];
    this.startTime = 0;
    this.started = true;
    this.recordButton.innerText = '录像中(点击停止)';
  }

  stop() {
    this.started = false;
    this.recordButton.innerText = '开始录像';
  }

  loadRecord(str) {
    const codeTypeMap = {1: 'keydown', 2: 'keyup'};
    const actions = str.split('||').map((str) => {
      let parts = str.split('|');
      return new Action({
        time: +parts[0],
        type: codeTypeMap[parts[1]],
        keyCode: parts[2],
        key: parts[3]
      });
    });
    this.actions = actions;
  }

  storeString() {
    const typeCodeMap = {keydown: 1, keyup: 2};
    let str = recorder.actions
      .map((action) => [action.time, typeCodeMap[action.type], action.keyCode, action.key].join('|'))
      .join('||');
    return str;
  }

  onKey(event) {
    if (!this.started) return;
    const now = new Date().getTime();
    if (!this.startTime) {
      this.startTime = now;
    }

    let action = new Action({
      time: now - this.startTime,
      type: event.type,
      keyCode: event.keyCode,
      key: event.key
    });
    this.actions.push(action);
  }
}

export class Action {
  constructor(spec) {
    // 偏移时间，毫秒
    this.time = spec.time;
    // 动作类型：有keydown、keyup
    this.type = spec.type;
    // keyCode
    this.keyCode = spec.keyCode;
    this.key = spec.key; //不应该存key，暂时这样实现
  }
}