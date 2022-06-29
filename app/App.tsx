// eslint-disable-next-line camelcase
import { Poppins_400Regular, useFonts } from '@expo-google-fonts/poppins';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import React, { useCallback, useEffect, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import { Root } from './src/Root';
import { useSystemDarkMode } from './src/hooks/Theme';
import Theme from './src/styles/Theme';

export default () => {
  const isSystemDark = useSystemDarkMode();
  const [isDark, setIsDark] = useState(isSystemDark);

  const [fontsLoaded] = useFonts({
    // eslint-disable-next-line camelcase
    Poppins: Poppins_400Regular,
  });

  const toggleTheme = useCallback(() => {
    setIsDark(!isDark);
    AsyncStorage.setItem('isDark', JSON.stringify(!isDark));
  }, [isDark, setIsDark]);

  useEffect(() => {
    AsyncStorage.getItem('isDark').then((savedIsDark) => {
      if (savedIsDark) setIsDark(JSON.parse(savedIsDark));
    });
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <PaperProvider theme={isDark ? Theme.dark : Theme.light}>
      <Root isDark={isDark} toggleTheme={toggleTheme} />
    </PaperProvider>
  );
};
