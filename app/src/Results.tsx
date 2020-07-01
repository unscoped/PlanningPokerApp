import React from 'react';

import { User, VoteValue } from '../shared/model/User';

import { ResultCard } from './ResultCard';
import { FlexWrapRow } from './atoms/Row';

type Props = {
  users: User[];
  userId?: string;
};

export const Results: React.FC<Props> = ({ users, userId }) => {
  return (
    <FlexWrapRow mode="center">
      {users
        .sort(
          (a: User, b: User) =>
            voteValueToNumber(a.voteValue) - voteValueToNumber(b.voteValue),
        )
        .map((user) => {
          const isCurrentUser = user.id === userId;

          return (
            <ResultCard
              key={user.id}
              resultValue={user.voteValue}
              showAvatar={isCurrentUser}
              username={user.userName}
            />
          );
        })}
    </FlexWrapRow>
  );
};

const voteValueToNumber = (v: VoteValue) => {
  switch (typeof v) {
    case 'number':
      return v;
    default:
      return Number.MAX_SAFE_INTEGER;
  }
};
