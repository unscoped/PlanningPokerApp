import React, { useCallback } from 'react';
import { Button, IconButton, Text, useTheme } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon';

interface IProps {
  icon: IconSource;
  label: string;
  mode?: 'text' | 'outlined' | 'contained' | undefined;
  onPress: () => void;
  color?: string;
}

export const IconTextButton: React.FC<IProps> = ({
  color,
  icon,
  label,
  mode,
  onPress,
}) => {
  const theme = useTheme();

  const renderIcon: IconSource = useCallback(
    (props) => (
      <IconButton
        {...props}
        style={{ margin: 0 }}
        color={theme.colors.text}
        icon={icon}
      />
    ),
    [icon, theme.colors.text],
  );

  return (
    <Button
      style={{ marginHorizontal: 8 }}
      accessibilityRole={'button'}
      color={color ?? theme.colors.accent}
      icon={renderIcon}
      mode={mode}
      onPress={onPress}
    >
      <Text style={{ fontWeight: 'bold' }}>{label}</Text>
    </Button>
  );
};
