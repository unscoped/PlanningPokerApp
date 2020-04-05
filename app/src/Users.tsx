import React from 'react';
import { ScrollView } from 'react-native';

import { User } from '../../shared/model/User';

import { UserCard } from './UserCard';

type Props = {
  users: User[];
};

const Users: React.FC<Props> = ({ users }) => {
  return (
    <ScrollView horizontal>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </ScrollView>
  );
};
