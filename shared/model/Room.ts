import { User } from "./User";

export interface Room {
  id: string;
  name: string;
  users: User[];
  admin: User | undefined;
}