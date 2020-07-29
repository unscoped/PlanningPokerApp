import React, { useCallback, useMemo } from 'react';
import { Button, IconButton, Text, useTheme } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon';

interface IProps {
  onPress: () => void;
}

export const ResetButton: React.FC<IProps> = ({ onPress }) => {
  const theme = useTheme();

  const icon: IconSource = useCallback(
    (props) => (
      <IconButton {...props} color={theme.colors.text} icon="replay" />
    ),
    [theme],
  );

  return (
    <Button
      accessibilityRole={'button'}
      color={theme.colors.accent}
      icon={icon}
      mode="contained"
      onPress={onPress}
    >
      <Text>Reset</Text>
    </Button>
  );
};
