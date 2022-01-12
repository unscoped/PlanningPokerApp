export type VoteValue = number | '🤔' | 'hidden' | undefined;

export interface User {
  id: string;
  userName: string;
  voteValue: VoteValue;
}
