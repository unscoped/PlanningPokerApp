import { User } from './User';

export interface Room {
  id: string;
  name: string;
  users: { [key: string]: User };
  admin: User | undefined;
}
