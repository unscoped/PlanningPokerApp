import React, { useCallback, useState } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

import { Results } from './Results';
import { useRoom } from './RoomHandler';

export const Root: React.FC = () => {
  const [userName, setUserName] = useState<string>('');

  const { vote, room } = useRoom(userName);

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
          onChangeText={setUserName}
        />
      </View>
      <Results users={Object.values(room.users)} />
    </View>
  );
};
