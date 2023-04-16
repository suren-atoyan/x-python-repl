import chromeDevTools from './chromeDevTools';
import nightOwlTheme from './nightOwlTheme';
import { Themes } from './types';

const themes = {
  [Themes.Light]: {
    monaco: chromeDevTools,
    colors: {
      text: '#000',
      indexIn: 'green',
      indexOut: 'purple',
    },
  },
  [Themes.Dark]: {
    monaco: nightOwlTheme,
    colors: {
      text: '#fff',
      indexIn: '#79f29d',
      indexOut: '#B87FDB',
    },
  },
};

export default themes;
