import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { Theme } from 'react-native-paper/lib/typescript/types';

import { VoteValue } from '../../shared/model/User';
import { AvatarWatermark } from '../atoms/AvatarWatermark';
import { FixedUserName, UpdatableUserName } from '../atoms/UserName';
import { useStyleSheet } from '../hooks/Theme';
import { fontStyles } from '../styles/Font';

type Props = {
  showAvatar: boolean;
  resultValue: VoteValue;
  username: string;
  isExtreme: boolean;
  onUserNameChange: (text: string) => void;
};

export const ResultCard: React.FC<Props> = ({
  onUserNameChange,
  resultValue,
  showAvatar,
  username,
  isExtreme,
}) => {
  const styles = useStyleSheet(createStyleSheet);

  const displayValue =
    resultValue && resultValue !== 'hidden' ? resultValue : '?';

  return (
    <Surface
      style={[
        showAvatar && styles.avatarDecoration,
        styles.resultCard,
        isExtreme && styles.isExtreme,
      ]}
    >
      {showAvatar && <AvatarWatermark />}
      <View style={styles.resultCardTitleContainer}>
        <Text style={fontStyles.headline4}>{displayValue}</Text>
      </View>
      {showAvatar ? (
        <UpdatableUserName value={username} onChangeText={onUserNameChange} />
      ) : (
        <FixedUserName userName={username} />
      )}
    </Surface>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    avatarDecoration: {
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },
    isExtreme: {
      borderColor: theme.colors.accent,
    },
    resultCard: {
      borderRadius: theme.roundness * 2,
      elevation: 8,
      height: 112,
      margin: 8,
      overflow: 'hidden',
      width: 96,
    },
    resultCardTitleContainer: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
  });
