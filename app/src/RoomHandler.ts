import UUID from 'pure-uuid';
import { useCallback, useEffect, useRef, useState } from 'react';

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

// TODO: Connect to Heroku 🧙‍♂️
// const SERVER_HOST = __DEV__ ? 'ws://localhost:8999' : '';
const SERVER_HOST = 'ws://localhost:8999';

const INIT_ROOM: Room = {
  id: '',
  name: '',
  users: {},
  admin: undefined,
};

export const useRoom = (userName: string) => {
  const ws = useRef(new WebSocket(SERVER_HOST)).current;
  const [room, setRoom] = useState(INIT_ROOM);

  userName = userName || 'Guest';

  const roomId = useUrlParam('roomId') || new UUID(4).toString();

  const send = useCallback((msg: any) => ws.send(JSON.stringify(msg)), [ws]);

  useEffect(() => {
    ws.onopen = () => {
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.log('Opened WebSocket connection');
      }

      const joinRequest: JoinRequestMessage = {
        type: MessageType.JoinRequest,
        roomId,
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
  }, [roomId, send, userName, ws]);

  useEffect(() => {
    if (ws.readyState === WebSocket.OPEN) {
      const updateNameRequest: SetNameMessage = {
        type: MessageType.SetName,
        roomId,
        payload: {
          name: userName,
        },
      };
      send(updateNameRequest);
    }
  }, [roomId, send, userName, ws.readyState]);

  const vote = (voteValue: VoteValue) => {
    const msg: SetVoteValueMessage = {
      type: MessageType.SetVoteValue,
      roomId,
      payload: {
        voteValue,
      },
    };
    send(msg);
  };

  return { vote, room };
};
