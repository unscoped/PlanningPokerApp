import { Room } from "./Room";
import { VoteValue } from "./User";

export type Message = JoinRequestMessage | JoinResponseMessage | SetVoteValueMessage | SetNameMessage | LeaveRequestMessage | RoomUpdateMessage;

export enum MessageType {
  JoinRequest,
  JoinResponse,
  LeaveRequest,
  SetVoteValue,
  SetName,
  RoomUpdate,
}

export interface JoinRequestMessage {
  type: MessageType.JoinRequest;
  roomId: string;
  payload: {
    name: string;
  };
}

export interface JoinResponseMessage {
  type: MessageType.JoinResponse;
  roomId: string;
  payload: {
    id: string;
    room: Room;
  };
}

export interface SetVoteValueMessage {
  type: MessageType.SetVoteValue;
  roomId: string;
  payload: {
    voteValue: VoteValue;
  };
}

export interface SetNameMessage {
  type: MessageType.SetName;
  roomId: string;
  payload: {
    name: string;
  };
}

export interface LeaveRequestMessage {
  type: MessageType.LeaveRequest;
  roomId: string;
}

export interface RoomUpdateMessage {
  type: MessageType.RoomUpdate;
  roomId: string;
  payload: {
    room: Room;
  };
}