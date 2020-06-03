import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Text, Theme } from 'react-native-paper';

import { User } from '../shared/model/User';

import { AvatarWatermark } from './atoms/AvatarWatermark';
import { FlexWrapRow } from './atoms/Row';
import { FixedUsername, UpdatableUsername } from './atoms/Username';
import { useStyleSheet } from './hooks/Theme';
import { fontStyles } from './styles/Font';

type Props = {
  users: User[];
  userId?: string;
  userName?: string;
  onUsernameChange: (text: string) => void;
};

export const Results: React.FC<Props> = ({
  users,
  userId,
  userName,
  onUsernameChange,
}) => {
  const styles = useStyleSheet(createStyleSheet);

  const renderUser = useCallback(
    (user: User) => {
      const isCurrentUser = user.id === userId;
      const displayValue =
        user.voteValue && user.voteValue !== 'hidden' ? user.voteValue : '?';

      return (
        <Surface
          key={`${user.id}`}
          style={[
            isCurrentUser && styles.currentUserDecoration,
            styles.userCard,
          ]}
        >
          {isCurrentUser && <AvatarWatermark />}
          <View style={styles.userCardTitleContainer}>
            <Text style={fontStyles.headline3}>{displayValue}</Text>
          </View>
          {isCurrentUser ? (
            <UpdatableUsername
              value={userName}
              onChangeText={onUsernameChange}
            />
          ) : (
            <FixedUsername userName={user.userName} />
          )}
        </Surface>
      );
    },
    [
      onUsernameChange,
      styles.currentUserDecoration,
      styles.userCard,
      styles.userCardTitleContainer,
      userId,
      userName,
    ],
  );

  return <FlexWrapRow mode="center">{users.map(renderUser)}</FlexWrapRow>;
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    currentUserDecoration: {
      borderColor: theme.dark ? theme.colors.accent : theme.colors.primary,
      borderWidth: 2,
    },
    userCard: {
      borderRadius: theme.roundness * 2,
      elevation: 8,
      height: 150,
      margin: 8,
      overflow: 'hidden',
      width: 100,
    },
    userCardTitleContainer: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
  });
