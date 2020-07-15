import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Text, Theme, useTheme } from 'react-native-paper';

import { User, VoteValue } from '../shared/model/User';

import { FlexWrapRow } from './atoms/Row';
import { useStyleSheet } from './hooks/Theme';
import { fontStyles } from './styles/Font';

type Props = {
  users: User[];
  userId?: string;
};

const AvatarWatermark: React.FC = () => {
  const styles = useStyleSheet(createStyleSheet);
  return (
    <View style={styles.avatarWatermark}>
      <Text style={fontStyles.body2}>{'👤'}</Text>
    </View>
  );
};

export const Results: React.FC<Props> = ({ users, userId }) => {
  const styles = useStyleSheet(createStyleSheet);

  const renderUser = useCallback(
    (user: User, minVoteValue: VoteValue, maxVoteValue: VoteValue) => {
      const isCurrentUser = user.id === userId;
      const isDisplayValue =
        user.voteValue !== undefined && user.voteValue !== 'hidden';
      const isExtreme =
        isDisplayValue &&
        minVoteValue !== maxVoteValue &&
        (user.voteValue === minVoteValue || user.voteValue === maxVoteValue);
      return (
        <Surface
          key={`${user.id}`}
          style={[
            isCurrentUser
              ? isExtreme
                ? styles.currentUserDecorationHighlight
                : styles.currentUserDecoration
              : null,
            styles.userCard,
          ]}
        >
          {isCurrentUser ? <AvatarWatermark /> : null}
          <View style={styles.userCardTitleContainer}>
            <Text style={fontStyles.headline3}>
              {isDisplayValue ? user.voteValue : '?'}
            </Text>
          </View>
          <View
            style={
              isCurrentUser && isExtreme
                ? styles.userCardSubtitleContainerHighlight
                : styles.userCardSubtitleContainer
            }
          >
            <Text style={styles.subtitle} numberOfLines={1}>
              {user.userName}
            </Text>
          </View>
        </Surface>
      );
    },
    [
      styles.currentUserDecoration,
      styles.currentUserDecorationHighlight,
      styles.subtitle,
      styles.userCard,
      styles.userCardSubtitleContainer,
      styles.userCardSubtitleContainerHighlight,
      styles.userCardTitleContainer,
      userId,
    ],
  );
  const sortedUser = users.sort(
    (a: User, b: User) =>
      voteValueToNumber(a.voteValue) - voteValueToNumber(b.voteValue),
  );

  const minVoteValue = users.length ? users[0].voteValue : 0;
  const maxVoteValue = users.length ? users[users.length - 1].voteValue : 0;

  return (
    <FlexWrapRow mode="center">
      {sortedUser.map((u) => renderUser(u, minVoteValue, maxVoteValue))}
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

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    avatarWatermark: {
      position: 'absolute',
      top: 4,
      right: 4,
    },
    currentUserDecoration: {
      borderWidth: 2,
      borderColor: theme.dark ? theme.colors.accent : theme.colors.primary,
    },
    currentUserDecorationHighlight: {
      borderWidth: 2,
      borderColor: 'red',
    },
    subtitle: { ...fontStyles.body1, color: theme.dark ? 'black' : 'white' },
    userCard: {
      borderRadius: theme.roundness * 2,
      elevation: 8,
      height: 150,
      margin: 8,
      overflow: 'hidden',
      width: 100,
    },
    userCardSubtitleContainer: {
      alignItems: 'center',
      backgroundColor: theme.dark ? theme.colors.accent : theme.colors.primary,
      flexShrink: 1,
      paddingHorizontal: 4,
    },
    userCardSubtitleContainerHighlight: {
      alignItems: 'center',
      backgroundColor: 'red',
      flexShrink: 1,
      paddingHorizontal: 4,
    },
    userCardTitleContainer: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
  });
