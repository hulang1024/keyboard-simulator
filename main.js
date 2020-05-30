import Keyboard from './keyboard.js';
import Editor from './editor.js';
import Recorder from './recorder.js';
import Replayer from './replayer.js';

let keyboard = new Keyboard();

let recorder = new Recorder(keyboard);
window.recorder = recorder;
document.querySelector('.settings').appendChild(recorder.el);

let replayer = new Replayer(keyboard);
window.replayer = replayer;
document.querySelector('.settings').appendChild(replayer.el);

let editor = new Editor(keyboard);
window.editor = editor;
document.body.appendChild(editor.el);

document.body.appendChild(keyboard.el);

recorder.loadRecord(HELLO_WORLD);
replayer.play();

document.getElementById('keyboardColor').onchange = function() {
  document.querySelector('.keyboard').style.background = this.value;
};