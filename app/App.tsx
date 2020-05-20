import React, { useCallback, useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';
import { AppearanceProvider } from 'react-native-appearance';
import { Provider as PaperProvider } from 'react-native-paper';

import { Root } from './src/Root';
import { useSystemDarkMode } from './src/hooks/Theme';
import Theme from './src/styles/Theme';

export default () => {
  const isSystemDark = useSystemDarkMode();
  const [isDark, setIsDark] = useState(isSystemDark);
  const toggleTheme = useCallback(() => {
    setIsDark(!isDark);
    AsyncStorage.setItem('isDark', JSON.stringify(!isDark));
  }, [isDark, setIsDark]);

  useEffect(() => {
    AsyncStorage.getItem('isDark').then((savedIsDark) => {
      if (savedIsDark) setIsDark(JSON.parse(savedIsDark));
    });
  }, []);

  return (
    <AppearanceProvider>
      <PaperProvider theme={isDark ? Theme.dark : Theme.light}>
        <Root isDark={isDark} toggleTheme={toggleTheme} />
      </PaperProvider>
    </AppearanceProvider>
  );
};
