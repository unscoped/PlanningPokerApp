import { DarkTheme, DefaultTheme, Theme } from 'react-native-paper';

const light: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#808b97',
    accent: '#78b7bb',
    surface: '#fbfbfb',
  },
};

const dark: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#222831',
    accent: '#ff5722',
    surface: '#393e46',
  },
};

export default { light, dark };
