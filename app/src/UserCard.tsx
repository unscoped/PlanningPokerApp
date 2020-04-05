import React from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-paper';

import { User } from '../../shared/model/User';

type Props = {
  user: User;
};

export const UserCard: React.FC<Props> = ({ user }) => {
  return (
    <Card style={{ padding: 32 }}>
      <Text>{user.userName}</Text>
    </Card>
  );
};
