import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Theme, useTheme } from 'react-native-paper';

import { useStyleSheet } from '../hooks/Theme';
import { fontStyles } from '../styles/Font';

export const AvatarWatermark: React.FC = () => {
  const theme = useTheme();
  const styles = useStyleSheet(createStyleSheet);
  return (
    <View style={styles.avatarWatermark}>
      <MaterialIcons
        color={theme.colors.accent}
        style={fontStyles.body2}
        name={'person'}
      />
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    avatarWatermark: {
      position: 'absolute',
      top: 4,
      right: 4,
    },
  });
