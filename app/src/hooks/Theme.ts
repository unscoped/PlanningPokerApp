import React, { useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Theme } from 'react-native-paper/lib/typescript/types';

export const useSystemDarkMode = (): boolean => {
  const [isSystemDark, setSystemDark] = useState<boolean>(
    Appearance.getColorScheme() === 'dark',
  );

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemDark(colorScheme === 'dark');
    });

    return () => subscription.remove();
  }, []);

  return isSystemDark;
};

export const useManualDarkMode = (): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
] => {
  const isSystemDark = useSystemDarkMode();
  const [isDark, setIsDark] = useState(isSystemDark);

  useEffect(() => {
    setIsDark(isSystemDark);
  }, [isSystemDark]);

  return [isDark, setIsDark];
};

export const useStyleSheet = <T>(createStyleSheet: (theme: Theme) => T): T => {
  const theme = useTheme();
  const [styles, setStyles] = useState<T>(createStyleSheet(theme));

  useEffect(() => {
    setStyles(createStyleSheet(theme));
  }, [createStyleSheet, theme]);

  return styles;
};
