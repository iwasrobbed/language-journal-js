// This gives you default context menu (cut, copy, paste)
// in all input fields and textareas across your app.

import { remote } from 'electron';
import { Speech } from './../speech/speech'

const Menu = remote.Menu;
const MenuItem = remote.MenuItem;

const isAnyTextSelected = () => {
  return window.getSelection().toString() !== '';
};

const separator = new MenuItem({
    type: 'separator'
})

const cut = new MenuItem({
  label: 'Cut',
  click: () => {
      document.execCommand('cut');
  },
});

const copy = new MenuItem({
  label: 'Copy',
  click: () => {
      document.execCommand('copy');
  },
});

const paste = new MenuItem({
  label: 'Paste',
  click: () => {
      document.execCommand('paste');
  },
});

const speakWord = new MenuItem({
  label: 'Speak this word',
  click: () => {
      const word = window.getSelection().toString();
      Speech().speakText('Cet mot est ' + word);
  }
});

const speakSentence = new MenuItem({
  label: 'Speak this sentence',
  click: () => {
      const selection = window.getSelection();
      console.log('speak sentence with word ' + selection.toString() + ' and range ' + selection.getRangeAt(0));
  }
});

const speakFromHere = new MenuItem({
  label: 'Start speaking from here',
  click: () => {
      const selection = window.getSelection();
      console.log('start speaking from ' + selection.toString() + ' and range ' + selection.getRangeAt(0));
  }
});

const immutableTextMenu = new Menu();
immutableTextMenu.append(speakWord);
immutableTextMenu.append(speakSentence);
immutableTextMenu.append(speakFromHere);
immutableTextMenu.append(separator);
immutableTextMenu.append(copy);

const textEditingMenu = new Menu();
textEditingMenu.append(cut);
textEditingMenu.append(copy);
textEditingMenu.append(paste);

document.addEventListener('contextmenu', (event) => {
  switch (event.target.nodeName) {
    case 'TEXTAREA':
    case 'INPUT':
      event.preventDefault();
      textEditingMenu.popup(remote.getCurrentWindow());
      break;
    default:
      if (isAnyTextSelected()) {
        event.preventDefault();
        immutableTextMenu.popup(remote.getCurrentWindow());
    }
  }
}, false);
