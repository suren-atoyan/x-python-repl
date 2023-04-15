import chromeDevTools from './chromeDevTools';
import nightOwlTheme from './nightOwlTheme';
import { Themes } from './types';

const themes = {
  [Themes.Light]: {
    monaco: chromeDevTools,
    colors: {
      text: '#000',
    },
  },
  [Themes.Dark]: {
    monaco: nightOwlTheme,
    colors: {
      text: '#fff',
    },
  },
};

export default themes;
