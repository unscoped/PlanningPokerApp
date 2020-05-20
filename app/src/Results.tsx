import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Text, Theme, useTheme } from 'react-native-paper';

import { User } from '../shared/model/User';

import { FlexWrapRow } from './atoms/Row';
import { useStyleSheet } from './hooks/Theme';
import { fontStyles } from './styles/Font';

type Props = {
  users: User[];
};
export const Results: React.FC<Props> = ({ users }) => {
  const styles = useStyleSheet(createStyleSheet);

  const renderUser = useCallback(
    (user: User) => {
      const displayValue =
        user.voteValue && user.voteValue !== 'hidden' ? user.voteValue : '?';

      return (
        <Surface key={`${user.id}`} style={styles.userCard}>
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
      styles.subtitle,
      styles.userCard,
      styles.userCardSubtitleContainer,
      styles.userCardTitleContainer,
    ],
  );

  return <FlexWrapRow mode="center">{users.map(renderUser)}</FlexWrapRow>;
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
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
