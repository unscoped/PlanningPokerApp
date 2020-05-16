import React, { useCallback, useState } from 'react';
import { AppearanceProvider } from 'react-native-appearance';
import { Provider as PaperProvider } from 'react-native-paper';

import { Root } from './src/Root';
import { useManualDarkMode, useSystemDarkMode } from './src/hooks/Theme';
import Theme from './src/styles/Theme';

export default () => {
  const isSystemDark = useSystemDarkMode();
  const [isDark, setIsDark] = useState(isSystemDark);
  const onDarkModeChange = useCallback(() => setIsDark((value) => !value), []);
  return (
    <AppearanceProvider>
      <PaperProvider theme={isDark ? Theme.dark : Theme.light}>
        <Root isDark={isDark} onDarkModeChange={onDarkModeChange} />
      </PaperProvider>
    </AppearanceProvider>
  );
};
