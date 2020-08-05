import React, { useCallback, useMemo } from 'react';
import { Button, IconButton, Text, useTheme } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon';

interface IProps {
  onPress: () => void;
}

export const ShareButton: React.FC<IProps> = ({ onPress }) => {
  const theme = useTheme();

  const icon: IconSource = useCallback(
    (props) => <IconButton {...props} color={theme.colors.text} icon="share" />,
    [theme],
  );

  return (
    <Button
      accessibilityRole={'button'}
      color={theme.colors.accent}
      icon={icon}
      mode="outlined"
      onPress={onPress}
    >
      <Text>Share room</Text>
    </Button>
  );
};
