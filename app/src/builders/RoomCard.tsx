import React from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';

import { fontStyles } from '../styles/Font';

type RoomCardProps = {
  roomId: string;
};

export const RoomCard: React.FC<RoomCardProps> = ({ roomId }) => {
  return (
    <Card elevation={0} style={{ flexShrink: 1 }}>
      <View style={{ marginHorizontal: 8, marginVertical: 16, flexShrink: 1 }}>
        <Text style={fontStyles.headline5}>Room</Text>
        <Text
          style={fontStyles.subtitle2}
          numberOfLines={2}
        >{`ID: ${roomId}`}</Text>
      </View>
    </Card>
  );
};
