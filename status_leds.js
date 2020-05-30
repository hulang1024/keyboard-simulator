export default class StatusDisplay {
  constructor(keyboard) {
    keyboard.signals.keydown.push((event) => {
      if (event.repeat) return;

      switch (event.key) {
        case 'NumLock':
          this.numLockStatusLED.turnOnOff();
          break;
        case 'CapsLock':
          this.capsLockStatusLED.turnOnOff();
          break;
        case 'ScrollLock':
          this.scrollLockStatusLED.turnOnOff();
          break;
      }
    });

    let el = document.createElement('div');
    el.style.display = 'flex';
    el.style.justifyContent = 'space-evenly';
    el.style.alignItems = 'center';
    el.style.height = 50 + 'px';
    el.style.padding = '2px 50px';
    this.el = el;
    
    this.numLockStatusLED = new StatusLED();
    this.capsLockStatusLED = new StatusLED();
    this.scrollLockStatusLED = new StatusLED();
    [this.numLockStatusLED, this.capsLockStatusLED, this.scrollLockStatusLED].forEach((item) => {
      el.appendChild(item.el);
    });
  }
}

class StatusLED {
  constructor() {
    let el = document.createElement('div');
    el.classList.add('status-led');
    el.style.width = 10 + 'px';
    el.style.height = 10 + 'px';
    el.style.borderRadius = '100%';
    el.style.transition = '.1s background,box-shadow ease-in-out';
    this.el = el;

    this.on = false;
    this.turnOff();
  }

  turnOnOff() {
    if (this.on)
      this.turnOff();
    else
      this.turnOn();
  }

  turnOn() {
    this.on = true;
    this.el.style.boxShadow = 'lawngreen 0px 0px 4px 1px';
    this.el.style.background = 'lawngreen';
  }

  turnOff() {
    this.on = false;
    this.el.style.boxShadow = 'none';
    this.el.style.background = '#333';
  }
}