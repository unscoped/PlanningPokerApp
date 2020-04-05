import { Linking } from 'expo';
import UUID from 'pure-uuid';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';

import {
  JoinRequestMessage,
  Message,
  MessageType,
} from '../shared/model/Message';
import { Room } from '../shared/model/Room';

import { Results } from './Results';

// TODO: Connect to Heroku 🧙‍♂️
const SERVER_HOST = __DEV__ ? 'ws://localhost:8999' : '';

type ErrorMessage = {
  title: string;
  message: string;
};

const INIT_ROOM: Room = {
  id: '',
  name: '',
  users: {},
  admin: undefined,
};

type JoinUrlParams = {
  roomId: string;
};

export const Root: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [room, setRoom] = useState<Room>(INIT_ROOM);
  const [message, setMessage] = useState<Message>();
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>();
  const [roomId, setRoomId] = useState<string>();

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
      setMessage(joinRequest);
    }
  }, [userName, roomId]);

  const urlHandler = useCallback((url) => {
    console.log('Url received: ', url);
    const { path, queryParams } = Linking.parse(url);

    try {
      const parsed = queryParams as JoinUrlParams;
      setRoomId(parsed.roomId);
    } catch (error) {
      console.error('Error casting url query params.', error);
    }
  }, []);

  // Set up the WebSocket connection
  useEffect(() => {
    if (message) {
      const ws = new WebSocket(SERVER_HOST);

      ws.onopen = () => {
        ws.send(JSON.stringify(message));
      };
      ws.onmessage = (event) => {
        const msg: Message = JSON.parse(event.data);
        console.log('Received message: ', msg);

        switch (msg.type) {
          case MessageType.RoomUpdate: {
            console.log('Updating room');
            setRoom(msg.payload.room);
            break;
          }
          default:
        }
      };
      ws.onerror = (error) => {
        console.error('Error: ', error);
        setErrorMessage({ title: 'Oops!', message: 'Something went wrong...' });
      };
      return () => ws.close();
    }
  }, [message]);

  useEffect(() => {
    Linking.getInitialURL()
      .then(urlHandler)
      .catch((e) => console.error(e));
  }, [urlHandler]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        paddingTop: StatusBar.currentHeight + 16,
      }}
    >
      <Text>{`Room id: ${roomId || room.id}`}</Text>
      <View style={{ width: '50%' }}>
        <TextInput
          value={userName}
          label={'Username'}
          onChangeText={(text: string) => setUserName(text)}
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
