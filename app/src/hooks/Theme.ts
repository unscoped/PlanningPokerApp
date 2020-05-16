import React, { useEffect, useState } from 'react';
import { Appearance } from 'react-native-appearance';

export const useSystemDarkMode = () => {
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

export const useManualDarkMode = () => {
  const isSystemDark = useSystemDarkMode();
  const [isDark, setIsDark] = useState(isSystemDark);

  useEffect(() => {
    setIsDark(isSystemDark);
  }, [isSystemDark]);

  return [isDark, setIsDark];
};
