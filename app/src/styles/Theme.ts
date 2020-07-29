import { DarkTheme, DefaultTheme, Theme } from 'react-native-paper';

const light: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    accent: '#ef8354',
    primary: '#eaeaeb',
    surface: '#bfc0c0',
    text: '#000000',
  },
};

const dark: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    accent: '#cd4b13',
    primary: '#292d3d',
    surface: '#323a49',
    text: '#ffffff',
  },
};

export default { light, dark };
