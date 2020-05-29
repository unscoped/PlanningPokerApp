import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Text, Theme, useTheme } from 'react-native-paper';

import { User } from '../shared/model/User';

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
          <View style={styles.userCardSubtitleContainer}>
            <Text style={styles.subtitle} numberOfLines={1}>
              {user.userName}
            </Text>
          </View>
        </Surface>
      );
    },
    [
      styles.currentUserDecoration,
      styles.subtitle,
      styles.userCard,
      styles.userCardSubtitleContainer,
      styles.userCardTitleContainer,
      userId,
    ],
  );

  return <FlexWrapRow mode="center">{users.map(renderUser)}</FlexWrapRow>;
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
    subtitle: { ...fontStyles.body1, color: theme.dark ? 'black' : 'white' },
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
    userCardSubtitleContainer: {
      alignItems: 'center',
      backgroundColor: theme.dark ? theme.colors.accent : theme.colors.primary,
      flexShrink: 1,
      paddingHorizontal: 4,
    },
  });
