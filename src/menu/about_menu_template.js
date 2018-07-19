import { app } from 'electron';

export const aboutMenuTemplate = {
  label: 'About',
  submenu: [
    { label: 'About',
      click: () => {
        // Show modal eventually
      }
    },
    { type: 'separator' },
    {
      label: 'Quit',
      accelerator: 'CmdOrCtrl+Q',
      click: () => {
        app.quit();
      }
    },
  ],
};
