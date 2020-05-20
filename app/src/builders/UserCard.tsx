import React from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';

import { Spacer } from '../atoms/Spacer';
import { fontStyles } from '../styles/Font';

type UserCardProps = {
  username: string;
};

export const UserCard: React.FC<UserCardProps> = ({ username }) => {
  return (
    <Card elevation={0}>
      <View style={[{ marginHorizontal: 8 }]}>
        <Spacer medium />
        <Text style={fontStyles.headline5}>User</Text>
        <Text style={fontStyles.subtitle2}>{`username: ${username}`}</Text>
        <Spacer medium />
      </View>
    </Card>
  );
};
