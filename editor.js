export default class Editor {
  constructor(keyboard) {
    keyboard.signals['keydown'].push(this.onKeyDown.bind(this));

    let el = document.createElement('div');
    this.el = el;
    el.classList.add('editor__container');
  }

  clear() {
    this.el.innerText = '_';
  }

  onKeyDown(event) {
    let char = event.key.length > 1 ? null : event.key;
    if (char && !(32 <= event.key.charCodeAt() && event.key.charCodeAt() <= 127)) {
      char = null;
    }
    let el = this.el;
    if (char) {
      el.innerText += char;
    } else {
      switch (event.key) {
        case 'Backspace':
          el.innerText = el.innerText.slice(0, el.innerText.length - 1);
          break;
        case 'Enter':
          el.innerText += '\n';
      }
    }
  }
}