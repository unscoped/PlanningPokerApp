import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Text, useTheme } from 'react-native-paper';

import { User } from '../shared/model/User';

import { FlexWrapRow } from './atoms/Row';
import { fontStyles } from './styles/Font';

type Props = {
  users: User[];
  isDark: boolean;
};
export const Results: React.FC<Props> = ({ users, isDark }) => {
  const { colors, roundness } = useTheme();
  const renderUser = useCallback(
    (user: User) => {
      const displayValue =
        user.voteValue && user.voteValue !== 'hidden' ? user.voteValue : '?';

      return (
        <Surface
          key={`${user.id}`}
          style={[
            styles.userCard,
            { borderRadius: roundness * 2, overflow: 'hidden' },
          ]}
        >
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text style={fontStyles.headline3}>{displayValue}</Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: isDark ? colors.accent : colors.primary,
              flexShrink: 1,
              paddingHorizontal: 4,
            }}
          >
            <Text
              style={[fontStyles.body1, { color: isDark ? 'black' : 'white' }]}
              numberOfLines={1}
            >
              {user.userName}
            </Text>
          </View>
        </Surface>
      );
    },
    [colors.accent, colors.primary, isDark, roundness],
  );

  return <FlexWrapRow mode="center">{users.map(renderUser)}</FlexWrapRow>;
};

const styles = StyleSheet.create({
  userCard: {
    height: 150,
    margin: 8,
    width: 100,
    elevation: 8,
  },
});
