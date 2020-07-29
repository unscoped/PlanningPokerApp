import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Text, Theme, useTheme } from 'react-native-paper';
import { red100 } from 'react-native-paper/lib/typescript/src/styles/colors';

import { VoteValue } from '../shared/model/User';

import { FixedUserName, UpdatableUserName } from './atoms/UserName';
import { useStyleSheet } from './hooks/Theme';
import { fontStyles } from './styles/Font';

const AvatarWatermark: React.FC = () => {
  const theme = useTheme();
  const styles = useStyleSheet(createStyleSheet);
  return (
    <View style={styles.avatarWatermark}>
      <MaterialIcons
        color={theme.colors.accent}
        style={fontStyles.body2}
        name={'person'}
      />
    </View>
  );
};

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
        <Text style={fontStyles.headline3}>{displayValue}</Text>
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
    avatarWatermark: {
      position: 'absolute',
      top: 4,
      right: 4,
    },
    isExtreme: {
      borderColor: theme.colors.accent,
    },
    resultCard: {
      borderRadius: theme.roundness * 2,
      elevation: 8,
      height: 150,
      margin: 8,
      overflow: 'hidden',
      width: 100,
    },
    resultCardTitleContainer: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
  });
