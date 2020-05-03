import * as express from "express";
import * as http from "http";
import * as WebSocket from "ws";
import { Room } from "./shared/model/Room";
import { User } from "shared/model/User";
import {
  Message,
  MessageType,
  JoinResponseMessage,
  RoomUpdateMessage,
} from "./shared/model/Message";
import Uuid from "pure-uuid";

const rooms: { [key: string]: Room } = {};
let users: { [key: string]: WebSocket } = {};

const port = process.env.NODE_ENV === "production" ? 13579 : 8999;

const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

const filterValuesFromRoom = (room: Room): Room => {
  return {
    ...room,
    users: Object.fromEntries(
      Object.entries(room.users).map(([key, user]) => [
        key,
        { ...user, voteValue: user.voteValue ? "hidden" : undefined },
      ])
    ),
  };
};

const updateRoom = (roomId: string) => {
  const room = rooms[roomId];

  const everyoneVoted = Object.values(room.users).every(
    (user) => user.voteValue
  );

  const msg: RoomUpdateMessage = {
    type: MessageType.RoomUpdate,
    roomId: room.id,
    payload: {
      room: everyoneVoted ? room : filterValuesFromRoom(room),
    },
  };

  Object.values(room.users).forEach((user) => {
    users[user.id].send(JSON.stringify(msg));
  });
};

// const filterUserFromRoom = (userId: string, room: Room): Room => ({
//   ...room,
//   users: Object.entries(room.users)
//     .filter(([uId]) => uId !== userId)
//     .reduce<{ [key: string]: User }>(
//       (room, [uId, user]) => ({ ...room, [uId]: user }),
//       {}
//     ),
// });

wss.on("connection", (ws: WebSocket) => {
  const userId = new Uuid(4).format();

  //connection is up, let's add a simple simple event
  ws.on("message", (message: string) => {
    //log the received message and send it back to the client
    console.log("received: %s", message);

    try {
      const msg: Message = JSON.parse(message);
      switch (msg.type) {
        case MessageType.JoinRequest: {
          if (!rooms[msg.roomId]) {
            rooms[msg.roomId] = {
              id: msg.roomId,
              users: {},
              name: msg.roomId,
              admin: undefined,
            };
          }

          rooms[msg.roomId].users[userId] = {
            id: userId,
            userName: msg.payload.name,
            voteValue: undefined,
          };
          users[userId] = ws;

          const response: JoinResponseMessage = {
            type: MessageType.JoinResponse,
            roomId: msg.roomId,
            payload: {
              userId,
            },
          };

          ws.send(JSON.stringify(response));

          updateRoom(msg.roomId);

          break;
        }
        case MessageType.LeaveRequest: {
          delete rooms[msg.roomId].users[userId];
          delete users[userId];

          updateRoom(msg.roomId);

          break;
        }
        case MessageType.SetVoteValue: {
          rooms[msg.roomId].users[userId].voteValue = msg.payload.voteValue;

          updateRoom(msg.roomId);

          break;
        }
        case MessageType.SetName: {
          rooms[msg.roomId].users[userId].userName = msg.payload.name;

          updateRoom(msg.roomId);

          break;
        }
      }
    } catch (error) {
      console.error(error);
      ws.send("Invalid message");
      ws.close();
    }

    ws.on("close", () => {
      // Remove user from users list
      delete users[userId];

      // Remove user from all rooms and update these rooms
      Object.keys(rooms).forEach((roomId) => {
        if (rooms[roomId].users[userId]) {
          delete rooms[roomId].users[userId];

          updateRoom(roomId);
        }
      });
    });
  });
});

//start our server
server.listen(port, () => {
  console.log(`Server started on port ${port} :)`);
});
