import UUID from 'pure-uuid';
import React, { useCallback, useState } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { JoinRequestMessage, MessageType } from '../shared/model/Message';

import { Results } from './Results';
import { useRoom } from './RoomHandler';
import { useUrlParam } from './UrlHandler';

export const Root: React.FC = () => {
  const [userName, setUserName] = useState<string>('');

  const { send, room } = useRoom();

  const roomId = useUrlParam('roomId');

  const joinRoom = useCallback(() => {
    // TODO: Update this to be more exhaustive
    const isValidUserName = !!userName || userName.length > 0;

    if (isValidUserName) {
      const joinRequest: JoinRequestMessage = {
        type: MessageType.JoinRequest,
        roomId: roomId || new UUID(4).toString(),
        payload: {
          name: userName,
        },
      };
      send(joinRequest);
    }
  }, [userName, roomId, send]);

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
      <Text>{`Room id: ${roomId || room.id}`}</Text>
      <View style={{ width: '50%' }}>
        <TextInput
          value={userName}
          label={'Username'}
          onChangeText={setUserName}
        />
      </View>
      <View>
        <Button mode="contained" testID={'join-room-button'} onPress={joinRoom}>
          <Text>{'Join room'}</Text>
        </Button>
      </View>
      <Results users={Object.values(room.users)} />
    </View>
  );
};
