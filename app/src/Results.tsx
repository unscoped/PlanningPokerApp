import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';

import { User } from '../shared/model/User';

type Props = {
  users: User[];
};
export const Results: React.FC<Props> = ({ users }) => {
  const renderUser = useCallback((user: User) => {
    return (
      <Card key={`${user.id}`} style={styles.userCard}>
        <Text>{`User: ${user.userName}`}</Text>
        <Text>{`Vote value: ${user.voteValue}`}</Text>
      </Card>
    );
  }, []);

  return <View style={styles.container}>{users.map(renderUser)}</View>;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%',
  },
  userCard: {
    aspectRatio: 2,
    backgroundColor: 'tomato',
    elevation: 4,
    height: 200,
    margin: 8,
    width: 100,
  },
});
