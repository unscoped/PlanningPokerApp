import { Room } from './Room';
import { VoteValue } from './User';

export type Message =
  | IJoinRequestMessage
  | IJoinResponseMessage
  | ILeaveRequestMessage
  | IResetMessage
  | IRoomUpdateMessage
  | ISetNameMessage
  | ISetVoteValueMessage;

export enum MessageType {
  JoinRequest,
  JoinResponse,
  LeaveRequest,
  Reset,
  RoomUpdate,
  SetName,
  SetVoteValue,
}

export interface IJoinRequestMessage {
  type: MessageType.JoinRequest;
  roomId: string;
  payload: {
    name: string;
  };
}

export interface IJoinResponseMessage {
  type: MessageType.JoinResponse;
  roomId: string;
  payload: {
    userId: string;
  };
}

export interface ISetVoteValueMessage {
  type: MessageType.SetVoteValue;
  roomId: string;
  payload: {
    voteValue: VoteValue;
  };
}

export interface ISetNameMessage {
  type: MessageType.SetName;
  roomId: string;
  payload: {
    name: string;
  };
}

export interface ILeaveRequestMessage {
  type: MessageType.LeaveRequest;
  roomId: string;
}

export interface IRoomUpdateMessage {
  type: MessageType.RoomUpdate;
  roomId: string;
  payload: {
    room: Room;
  };
}

export interface IResetMessage {
  type: MessageType.Reset;
  roomId: string;
}
