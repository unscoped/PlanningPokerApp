import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, Theme } from 'react-native-paper';

import { Spacer } from '../atoms/Spacer';
import { useStyleSheet } from '../hooks/Theme';
import { fontStyles } from '../styles/Font';

type RoomCardProps = {
  roomId: string;
};

export const RoomCard: React.FC<RoomCardProps> = ({ roomId }) => {
  const styles = useStyleSheet(createStyleSheet);

  return (
    <Card elevation={0} style={styles.clipTextOverflow}>
      <View style={[styles.container, styles.clipTextOverflow]}>
        <Spacer medium />
        <Text style={fontStyles.headline5}>Room</Text>
        <Text
          style={fontStyles.subtitle2}
          numberOfLines={2}
        >{`ID: ${roomId}`}</Text>
        <Spacer medium />
      </View>
    </Card>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 8,
      backgroundColor: theme.colors.background,
      borderRadius: theme.roundness,
    },
    clipTextOverflow: { flexShrink: 1 },
  });
