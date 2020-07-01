import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Text, Theme } from 'react-native-paper';

import { VoteValue } from '../shared/model/User';

import { useStyleSheet } from './hooks/Theme';
import { fontStyles } from './styles/Font';

const AvatarWatermark: React.FC = () => {
  const styles = useStyleSheet(createStyleSheet);
  return (
    <View style={styles.avatarWatermark}>
      <Text style={fontStyles.body2}>{'👤'}</Text>
    </View>
  );
};

type Props = {
  showAvatar: boolean;
  resultValue: VoteValue;
  username: string;
};

export const ResultCard: React.FC<Props> = ({
  showAvatar,
  username,
  resultValue,
}) => {
  const styles = useStyleSheet(createStyleSheet);

  const displayValue =
    resultValue && resultValue !== 'hidden' ? resultValue : '?';

  return (
    <Surface style={[showAvatar && styles.avatarDecoration, styles.resultCard]}>
      {showAvatar && <AvatarWatermark />}
      <View style={styles.resultCardTitleContainer}>
        <Text style={fontStyles.headline3}>{displayValue}</Text>
      </View>
      <View style={styles.resultCardSubtitleContainer}>
        <Text style={styles.subtitle} numberOfLines={1}>
          {username}
        </Text>
      </View>
    </Surface>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    avatarDecoration: {
      borderWidth: 2,
      borderColor: theme.dark ? theme.colors.accent : theme.colors.primary,
    },
    avatarWatermark: {
      position: 'absolute',
      top: 4,
      right: 4,
    },
    resultCard: {
      borderRadius: theme.roundness * 2,
      elevation: 8,
      height: 150,
      margin: 8,
      overflow: 'hidden',
      width: 100,
    },
    resultCardSubtitleContainer: {
      alignItems: 'center',
      backgroundColor: theme.dark ? theme.colors.accent : theme.colors.primary,
      flexShrink: 1,
      paddingHorizontal: 4,
    },
    resultCardTitleContainer: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    subtitle: { ...fontStyles.body1, color: theme.dark ? 'black' : 'white' },
  });
