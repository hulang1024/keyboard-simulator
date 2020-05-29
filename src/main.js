import Keyboard from './keyboard.js';
import Editor from './editor/index.js';
import Recorder from './recorder/index.js';
import Replayer from './replayer/index.js';

let keyboard = new Keyboard();

let recorder = new Recorder(keyboard);
window.recorder = recorder;
document.body.appendChild(recorder.el);

let replayer = new Replayer(keyboard);
window.replayer = replayer;
document.body.appendChild(replayer.el);

let editor = new Editor(keyboard);
window.editor = editor;
document.body.appendChild(editor.el);

document.body.appendChild(keyboard.el);

recorder.loadRecord(HELLO_WORLD);
replayer.play();