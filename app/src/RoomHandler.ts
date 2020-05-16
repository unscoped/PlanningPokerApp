import * as Linking from 'expo-linking';
import UUID from 'pure-uuid';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';

import {
  JoinRequestMessage,
  Message,
  MessageType,
  SetNameMessage,
  SetVoteValueMessage,
} from '../shared/model/Message';
import { Room } from '../shared/model/Room';
import { VoteValue } from '../shared/model/User';

import { useUrlParam } from './UrlHandler';

// Connect to Heroku 🧙‍♂️ (Update the port)
const SERVER_HOST = __DEV__
  ? 'ws://localhost:8999'
  : 'wss://planningpokerserver.herokuapp.com/';

const createEmptyRoom = (id: string): Room => ({
  id,
  name: '',
  users: {},
  admin: undefined,
});

export const useRoom = (userName: string) => {
  const ws = useRef(new WebSocket(SERVER_HOST)).current;
  const roomId = useUrlParam('roomId');

  if (Platform.OS === 'web' && !roomId) {
    window.location.search = 'roomId=' + new UUID(4).toString();
  }

  const [room, setRoom] = useState(
    createEmptyRoom(roomId || new UUID(4).toString()),
  );

  userName = userName || 'Guest';

  const send = useCallback((msg: any) => ws.send(JSON.stringify(msg)), [ws]);

  useEffect(() => {
    ws.onopen = () => {
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.log('Opened WebSocket connection');
      }

      const joinRequest: JoinRequestMessage = {
        type: MessageType.JoinRequest,
        roomId: room.id,
        payload: {
          name: userName,
        },
      };
      send(joinRequest);
    };
    ws.onmessage = (event) => {
      const msg: Message = JSON.parse(event.data);

      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.log('Received message: ', msg);
      }

      switch (msg.type) {
        case MessageType.RoomUpdate: {
          if (__DEV__) {
            // eslint-disable-next-line no-console
            console.log('Updating room');
          }
          setRoom(msg.payload.room);
          break;
        }
        default:
      }
    };
    ws.onerror = (error) => {
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.error('Error: ', error);
      }
      // setErrorMessage({ title: 'Oops!', message: 'Something went wrong...' });
    };
  }, [room.id, send, userName, ws]);

  useEffect(() => {
    if (ws.readyState === WebSocket.OPEN) {
      const updateNameRequest: SetNameMessage = {
        type: MessageType.SetName,
        roomId: room.id,
        payload: {
          name: userName,
        },
      };
      send(updateNameRequest);
    }
  }, [room.id, send, userName, ws.readyState]);

  const vote = (voteValue: VoteValue) => {
    const msg: SetVoteValueMessage = {
      type: MessageType.SetVoteValue,
      roomId: room.id,
      payload: {
        voteValue,
      },
    };
    send(msg);
  };

  return { vote, room };
};
