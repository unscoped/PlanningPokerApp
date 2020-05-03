import React, { useCallback, useState, useEffect } from 'react';
import { StatusBar, Text, View, AsyncStorage } from 'react-native';
import { TextInput } from 'react-native-paper';

import { Results } from './Results';
import { useRoom } from './RoomHandler';
import { VoteValues } from './VoteValues';

export const Root: React.FC = () => {
  const [userName, setUserName] = useState<string>('');

  const { vote, room } = useRoom(userName);

  const updateUserName = useCallback(
    (newName: string) => {
      setUserName(newName);
      AsyncStorage.setItem('username', newName);
    },
    [setUserName],
  );

  useEffect(() => {
    AsyncStorage.getItem('username').then((savedName) => {
      if (savedName) {
        setUserName(savedName);
      }
    });
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        paddingTop: (StatusBar.currentHeight ?? 0) + 16,
      }}
    >
      <Text>{`Room id: ${room.id}`}</Text>
      <View style={{ width: '50%' }}>
        <TextInput
          value={userName}
          label={'Username'}
          onChangeText={updateUserName}
        />
      </View>
      <VoteValues onValuePress={vote} />
      <Results users={Object.values(room.users)} />
    </View>
  );
};
