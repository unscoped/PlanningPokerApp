import UUID from 'pure-uuid';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Platform } from 'react-native';

import {
  IJoinRequestMessage,
  IResetMessage,
  IRevealMessage,
  ISetNameMessage,
  ISetVoteValueMessage,
  MessageType,
} from '../../shared/model/Message';
import { Room } from '../../shared/model/Room';
import { VoteValue } from '../../shared/model/User';

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

const send = (ws: WebSocket, msg: any) => {
  ws.send(JSON.stringify(msg));
};

const onerror = (error: Event) => {
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.error('Error: ', error);
  }
  // setErrorMessage({ title: 'Oops!', message: 'Something went wrong...' });
};

const useWebSocket = (
  onOpen: () => void,
  onMessage: (event: WebSocketMessageEvent) => void,
  onError: (error: Event) => void,
) => {
  const ws = useMemo(() => {
    const wss = new WebSocket(SERVER_HOST);

    wss.onopen = onOpen;
    wss.onmessage = onMessage;
    wss.onerror = onError;

    return wss;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    ws.onmessage = onMessage;
  }, [onMessage, ws]);

  useEffect(() => {
    ws.onerror = onError;
  }, [onError, ws]);

  return ws;
};

export const useRoom = () => {
  const rid = useUrlParam('roomId');
  const roomId = (() => {
    if (rid) {
      return rid;
    }
    const id = new UUID(4).toString();
    if (Platform.OS === 'web') {
      window.location.search = 'roomId=' + id;
    }
    return id;
  })();
  const [userName, setUserName] = useState('Guest');
  const [voteValue, setVoteValue] = useState<VoteValue>();
  const [userId, setUserId] = useState<string>();

  const onopen = useCallback(() => {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log('Opened WebSocket connection');
    }

    const joinRequest: IJoinRequestMessage = {
      type: MessageType.JoinRequest,
      roomId,
      payload: {
        name: 'Guest',
      },
    };
    send(ws, joinRequest);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onmessage = useCallback(
    (event: WebSocketMessageEvent) => {
      if (event.data === 'Heartbeat') {
        // eslint-disable-next-line no-console
        console.log('Received heartbeat from server');
        return;
      }

      try {
        const msg = JSON.parse(event.data);

        if (__DEV__) {
          // eslint-disable-next-line no-console
          console.log('Received message: ', msg);
        }

        switch (msg.type) {
          case MessageType.JoinResponse: {
            setUserId(msg.payload.userId);
            break;
          }
          case MessageType.RoomUpdate: {
            if (__DEV__) {
              // eslint-disable-next-line no-console
              console.log('Updating room');
            }
            setRoom(msg.payload.room);
            if (
              userId &&
              msg.payload.room.users[userId].voteValue !== 'hidden'
            ) {
              setVoteValue(msg.payload.room.users[userId].voteValue);
            }
            break;
          }
          default:
        }
      } catch {
        // eslint-disable-next-line no-console
        console.error('Error while parsing JSON', event.data);
      }
    },
    [userId],
  );

  const ws = useWebSocket(onopen, onmessage, onerror);

  const [room, setRoom] = useState(
    createEmptyRoom(roomId || new UUID(4).toString()),
  );

  const setName = useCallback(
    (name: string) => {
      console.log('Setting new username: ', name);
      setUserName(name);
      const setNameRequest: ISetNameMessage = {
        type: MessageType.SetName,
        roomId: room.id,
        payload: {
          name,
        },
      };
      send(ws, setNameRequest);
    },
    [room.id, ws],
  );

  const vote = useCallback(
    (newVoteValue: VoteValue) => {
      setVoteValue(newVoteValue);
      const msg: ISetVoteValueMessage = {
        type: MessageType.SetVoteValue,
        roomId: room.id,
        payload: {
          voteValue: newVoteValue,
        },
      };
      send(ws, msg);
    },
    [room.id, ws],
  );

  const reset = useCallback(() => {
    setVoteValue(undefined);
    const msg: IResetMessage = {
      type: MessageType.Reset,
      roomId: room.id,
    };
    send(ws, msg);
  }, [room.id, ws]);

  const reveal = useCallback(() => {
    // setVoteValue(undefined);
    const msg: IRevealMessage = {
      type: MessageType.Reveal,
      roomId: room.id,
    };
    send(ws, msg);
  }, [room.id, ws]);

  return {
    name: userName,
    reset,
    reveal,
    room,
    setName,
    userId,
    vote,
    voteValue,
  };
};
