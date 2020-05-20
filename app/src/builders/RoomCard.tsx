import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

import { Spacer } from '../atoms/Spacer';
import { fontStyles } from '../styles/Font';

type RoomCardProps = {
  roomId: string;
};

export const RoomCard: React.FC<RoomCardProps> = ({ roomId }) => {
  return (
    <Card elevation={0} style={styles.clipTextOverflow}>
      <View style={[{ marginHorizontal: 8 }, styles.clipTextOverflow]}>
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

const styles = StyleSheet.create({
  clipTextOverflow: { flexShrink: 1 },
});
