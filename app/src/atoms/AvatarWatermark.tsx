import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Theme } from 'react-native-paper';

import { useStyleSheet } from '../hooks/Theme';
import { fontStyles } from '../styles/Font';

export const AvatarWatermark: React.FC = () => {
  const styles = useStyleSheet(createStyleSheet);
  return (
    <View style={styles.avatarWatermark}>
      <Text style={fontStyles.body2}>{'👤'}</Text>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    avatarWatermark: {
      position: 'absolute',
      right: 4,
      top: 4,
    },
  });
