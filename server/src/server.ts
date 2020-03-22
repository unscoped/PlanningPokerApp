import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import {Room} from '../../shared/model/Room'
import {Message, MessageType, JoinResponseMessage, RoomUpdateMessage} from './shared/model/Message'
import Uuid from 'pure-uuid';

const rooms: {[key: string]: Room} = {}
let users: {[key: string]: WebSocket} = {}

const port = process.env.PORT || 8999;

const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

const updateRoom = (roomId: string) => {
  const room = rooms[roomId];

  const msg: RoomUpdateMessage = {
    type: MessageType.RoomUpdate,
    roomId: room.id,
    payload: {
      room
    }
  }

  Object.values(room.users).forEach((user) => {
    users[user.id].send(msg)
  })
}

wss.on('connection', (ws: WebSocket) => {
  const userId = new Uuid(4).format()
  
  //connection is up, let's add a simple simple event
  ws.on('message', (message: string) => {
    //log the received message and send it back to the client
    console.log('received: %s', message);
    
    try {
      const msg: Message = JSON.parse(message)
      switch(msg.type) {
        case MessageType.JoinRequest: {
          rooms[msg.roomId].users[userId] = {
            id: userId,
            userName: msg.payload.name,
            voteValue: undefined,
          }
          users[userId] = ws;

          const response: JoinResponseMessage = {
            type: MessageType.JoinResponse,
            roomId: msg.roomId,
            payload: {
              userId,
            }
          }

          ws.send(response)
          
          updateRoom(msg.roomId);

          break;
        }
        case MessageType.LeaveRequest: {
          delete rooms[msg.roomId].users[userId]
          delete users[userId]

          updateRoom(msg.roomId)

          break;
        }
        case MessageType.SetVoteValue: {
          rooms[msg.roomId].users[userId].voteValue = msg.payload.voteValue

          updateRoom(msg.roomId)

          break;
        }
        case MessageType.SetName: {
          rooms[msg.roomId].users[userId].userName = msg.payload.name

          updateRoom(msg.roomId)

          break;
        }
      }
    } catch {
      ws.send("Invalid message");
      ws.close();
    }

  });

    //send immediatly a feedback to the incoming connection    
    // ws.send('Hi there, I am a WebSocket server');
});

//start our server
server.listen(port, () => {
    console.log(`Server started on port ${port} :)`);
});