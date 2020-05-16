import { DarkTheme, DefaultTheme, Theme } from 'react-native-paper';

const light: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#00838f',
    accent: '#FfCDD2',
  },
};

const dark: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#005662',
    accent: '#cb9ca1',
  },
};

export default { light, dark };
