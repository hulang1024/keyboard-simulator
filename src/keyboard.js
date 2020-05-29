class DrawableKey {
  constructor(spec) {
    this.keyCode = spec.keyCode;
    let el = document.createElement('div');
    this.el = el;
    el.classList.add('keyboard__key');
  }
}

class InputKeyEvent {
  static fromRawKeyboardEvent(event) {
    let keyEvent = new InputKeyEvent();
    // 原始事件里, key存储存储实际产生的键值（例如[!]，是按下shift+数字1)，keyCode是一个数字，标识物理按键
    // 自定义事件里，keyCode是数字有可能是字符串
    const keyCode = ['Shift', 'Alt', 'Control', 'Meta', 'Enter'].includes(event.key)
      ? event.code
      : event.keyCode;
    keyEvent.type = event.type;
    keyEvent.key = event.key;
    keyEvent.keyCode = keyCode;
    keyEvent.altKey = event.altKey;
    keyEvent.ctrlKey = event.ctrlKey;
    keyEvent.shiftKey = event.shiftKey;
    keyEvent.metaKey = event.metaKey;
    return keyEvent;
  }
}

export default class Keyboard {
  constructor() {
    let el = document.createElement('div');
    el.classList.add('keyboard');
    this.el = el;

    this.realFunctionEnabled = false;

    document.addEventListener('keydown', (event) => {
      console.log(event.keyCode, event);
      this.onRawKeyboardEvent(event);
      if (!this.realFunctionEnabled) {
        event.returnValue = false;
        return false;
      }
    });
    document.addEventListener('keyup', (event) => {
      this.onRawKeyboardEvent(event);
      if (!this.realFunctionEnabled) {
        event.returnValue = false;
        return false;
      }
    });
    document.getElementById('enableRealFunctionCheckbox').onchange = function() {
      keyboard.setRealFunctionEnabled(this.checked);
    };
    
    this.signals = {
      keydown: [],
      keyup: []
    };

    this.drawableKeyMap = {};

    const K = (text, keyCode, width, height) => {
      let key = new DrawableKey({keyCode});
      key.el.style.width = (width || 42) + 'px';
      key.el.style.height = (height || 42) + 'px';
      key.el.classList.add('align-top');
      key.el.innerText = text;
      key.el.onmousedown = () => {
        alert('暂不支持鼠标');
      };
      key.el.onmouseup = () => {
        alert('暂不支持鼠标');
      };
      this.drawableKeyMap[keyCode] = key;
      
      return key.el;
    };
    const Row = (props) => {
      let div = document.createElement('div');
      div.classList.add('row');
      div.style.display = 'flex';
      for (let propName in props.style) {
        div.style[propName] = props.style[propName];
      }
      props.children.forEach((child) => {
        div.append(child);
      });
      return div;
    };
    const Col = (props) => {
      let div = document.createElement('div');
      div.classList.add('col');
      props.children.forEach((child) => {
        div.append(child);
      });
      return div;
    };
    const Padding = (props) => {
      let div = document.createElement('div');
      div.classList.add('padding');
      div.style.paddingLeft = (props.left || 0) + 'px';
      div.style.paddingTop = (props.top || 0) + 'px';
      return div;
    };
    
    const StatusLED = (on) => {
      let div = document.createElement('div');
      div.style.width = 10 + 'px';
      div.style.height = 20 + 'px';
      div.style.borderRadius = 30 + 'px';
      div.style.background = on ? 'dodgerblue' : '#aaa';
      if (on) {
        div.style.boxShadow = 'dodgerblue 0px 0px 4px 1px';
      }
      return div;
    };
    const StatusDisplay = () => {
      let div = document.createElement('div');
      div.style.display = 'flex';
      div.style.justifyContent = 'space-evenly';
      div.style.height = 50 + 'px';
      div.style.padding = '2px 50px';
      [StatusLED(true), StatusLED(false), StatusLED(false)].forEach((item) => {
        div.appendChild(item);
      });
      return div;
    };

    let keyboardChild = Row({
      children: [
        // 左边主区域
        Col({
          children: [
            //顶部功能区
            Row({
              children: [
                K('ESC',27,92),
                Padding({left: 18}),
                K('F1',112), K('F2',113), K('F3',114), K('F4',115),
                Padding({left: 18}),
                K('F5',116), K('F6',117), K('F7',118), K('F8',119),
                Padding({left: 18}),
                K('F9',120), K('F10',121), K('F11',122), K('F12',123),
              ]
            }),
            Padding({top: 8}),
            Row({
              children: [
                K('~\n`',192), K('!\n1',49), K('@\n2',50), K('#\n3',51), K('$\n4',52),
                K('%\n5',53), K('^\n6',54), K('&\n7',55), K('*\n8',56), K('(\n9',57),
                K(')\n0',48), K('─\n-',189), K('+\n=',187), K('Back Space',8,92),
              ]
            }),
            Row({
              children: [
                K('Tab',9,50+8),
                K('Q',81), K('W',87), K('E',69), K('R',82), K('T',84), K('Y',89), K('U',85), K('I',73), K('O',79), K('P',80),
                K('{\n[',219), K('}\n]',221),K('|\n\\',220,50+26),
              ]
            }),
            Row({
              children: [
                K('Caps Lock',20,50+32),
                K('A',65), K('S',83), K('D',68), K('F',70), K('G',71), K('H',72), K('J',74), K('K',75), K('L',76),
                K(':\n;',186), K('"\n,',222), K('Enter','Enter',50+56),
              ]
            }),
            Row({
              children: [
                K('Shift','ShiftLeft',50+56),
                K('Z',90), K('X',88), K('C',67), K('V',86), K('B',66), K('N',78), K('M',77),
                K('<\n,',188), K('>\n.',190), K('?\n/',191),
                K('Shift','ShiftRight',50+86),
              ]
            }),
            Row({
              children: [
                K('Ctrl','ControlLeft',60), K('Win','MetaLeft',60), K('Alt','AltLeft',60), K('',32,290),
                K('Alt','AltRight',60), K('Win','MetaRight',60), K('Menu',93,60), K('Ctrl','ControlRight',60),
              ]
            }),
          ]
        }),

        Padding({left: 8}),

        // 中间
        Col({
          children: [
            Row({
              children: [
                K('PrtSc\nSysRq',0), K('Scroll\nLock',145), K('Pause\nBreak',19)
              ]
            }),
            Padding({top: 8}),
            Row({
              children: [
                K('Insert',45), K('Home',36), K('PgUp',33),
              ]
            }),
            Row({
              children: [
                K('Delete',46), K('End',35), K('PgDn',34),
              ]
            }),
            Padding({top: 54}),
            Row({
              style: {
                justifyContent: 'center'
              },
              children: [
                K('↑',38)
              ]
            }),
            Row({
              children: [
                K('←',37), K('↓',40), K('→',39),
              ]
            }),
          ]
        }),

        Padding({left: 8}),

        // 指示灯和小键盘区
        Col({
          children: [
            StatusDisplay(),
            Padding({top: 8}),
            Col({
              children: [
                Row({
                  children: [
                    K('Num\nLock',144), K('/',111), K('*',106), K('-',109),
                  ]
                }),
                Row({
                  children: [
                    Col({
                      children: [
                        Row({
                          children: [
                            K('7\nHome',103), K('8\n↑',104), K('9\nPgUp',105)
                          ]
                        }),
                        Row({
                          children: [
                            K('4\n←',100), K('5',101), K('6\n→',102)
                          ]
                        }),
                      ]
                    }),
                    Col({
                      children: [
                        K('+',107,null,50*2-4)
                      ]
                    }),
                  ]
                }),
                Row({
                  children: [
                    Col({
                      children: [
                        Row({
                          children: [
                            K('1\nEnd',97), K('2\n↓',98), K('3\nPgDn',99)
                          ]
                        }),
                        Row({
                          children: [
                            K('0\nIns',96,50*2-4), K('.\nDel',110),
                          ]
                        }),
                      ]
                    }),
                    Col({
                      children: [
                        K('Enter','NumpadEnter',null,50*2-4)
                      ]
                    }),
                  ]
                }),
              ]
            }),
          ]
        })
      ]
    });

    this.el.appendChild(keyboardChild);

  }

  setRealFunctionEnabled(enabled) {
    this.realFunctionEnabled = enabled;
  }

  onRawKeyboardEvent(event) {
    this.onKey(InputKeyEvent.fromRawKeyboardEvent(event));
  }

  // event是自定义InputKeyEvent对象而不是原始键盘事件对象
  onKey(event) {
    const key = this.drawableKeyMap[event.keyCode];
    if (!key) return;
    if (event.type == 'keydown') {
      key.el.classList.add('state-keydown');
    } else {
      key.el.classList.remove('state-keydown');
    }
    this.signals[event.type].forEach((handler) => {
      handler(event);
    });
  }


  press(keyCode, key, type) {
    let keyEvent = new InputKeyEvent();
    keyEvent.type = type;
    keyEvent.keyCode = keyCode;
    keyEvent.key = key;
    this.onKey(keyEvent);
  }
}