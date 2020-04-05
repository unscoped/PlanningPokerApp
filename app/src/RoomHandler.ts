import { useEffect, useRef, useState } from 'react';

import { Message, MessageType } from '../shared/model/Message';
import { Room } from '../shared/model/Room';

// TODO: Connect to Heroku 🧙‍♂️
// const SERVER_HOST = __DEV__ ? 'ws://localhost:8999' : '';
const SERVER_HOST = 'ws://localhost:8999';

const INIT_ROOM: Room = {
  id: '',
  name: '',
  users: {},
  admin: undefined,
};

export const useRoom = () => {
  const ws = useRef(new WebSocket(SERVER_HOST)).current;
  const [room, setRoom] = useState(INIT_ROOM);

  useEffect(() => {
    ws.onopen = () => {
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.log('Opened WebSocket connection');
      }
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
    return () => ws.close();
  }, [ws]);

  return { send: (msg: any) => ws.send(JSON.stringify(msg)), room };
};
