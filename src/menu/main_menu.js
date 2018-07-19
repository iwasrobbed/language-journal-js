import env from './../env';

import { aboutMenuTemplate } from './about_menu_template';
import { editMenuTemplate } from './edit_menu_template';
import { devMenuTemplate } from './dev_menu_template';

export const mainMenu = () => {
  // private
  const items = [aboutMenuTemplate,
                 editMenuTemplate];
  if (env.name !== 'production') {
    items.push(devMenuTemplate);
  }

  // public
  return {
    items: items
  }
};
