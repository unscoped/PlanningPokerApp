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
      <Card style={styles.userCard}>
        <View key={`${user.id}`}>
          <Text>{`User: ${user.userName}`}</Text>
          <Text>{`Vote value: ${user.voteValue}`}</Text>
        </View>
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
    width: 100,
    height: 200,
    backgroundColor: 'tomato',
    margin: 8,
    elevation: 4,
  },
});
