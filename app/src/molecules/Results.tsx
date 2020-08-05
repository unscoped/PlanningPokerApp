import React from 'react';

import { User, VoteValue } from '../../shared/model/User';
import { FlexWrapRow } from '../atoms/Row';

import { ResultCard } from './ResultCard';

type Props = {
  users: User[];
  userId?: string;
  userName?: string;
  onUserNameChange: (text: string) => void;
};

export const Results: React.FC<Props> = ({
  users,
  userId,
  userName,
  onUserNameChange,
}) => {
  const sortedUsers = users.sort(
    (a: User, b: User) =>
      voteValueToNumber(a.voteValue) - voteValueToNumber(b.voteValue),
  );
  const minVoteValue = sortedUsers.length ? sortedUsers[0].voteValue : 0;
  const maxVoteValue = sortedUsers.length
    ? sortedUsers[sortedUsers.length - 1].voteValue
    : 0;
  return (
    <FlexWrapRow mode="center">
      {sortedUsers.map((user) => {
        const isCurrentUser = user.id === userId;
        const isDisplayValue =
          user.voteValue !== undefined && user.voteValue !== 'hidden';
        const isExtreme =
          isDisplayValue &&
          minVoteValue !== maxVoteValue &&
          (user.voteValue === minVoteValue || user.voteValue === maxVoteValue);
        return (
          <ResultCard
            key={user.id}
            resultValue={user.voteValue}
            showAvatar={isCurrentUser}
            username={userId === user.id && userName ? userName : user.userName}
            isExtreme={isExtreme}
            onUserNameChange={onUserNameChange}
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
