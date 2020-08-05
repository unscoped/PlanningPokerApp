import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Theme } from 'react-native-paper';

import { VoteValue } from '../../shared/model/User';
import { useStyleSheet } from '../hooks/Theme';

import { ValueCard } from './ValueCard';

const values: VoteValue[] = [0, 1, 2, 3, 5, 8, 13, 21, '🤔'];

type ValuesProps = {
  onValuePress: (value: VoteValue) => void;
  selectedValue: VoteValue | undefined;
  isDark: boolean;
};

export const VoteValues: React.FC<ValuesProps> = ({
  onValuePress,
  selectedValue,
  isDark,
}) => {
  const styles = useStyleSheet(createStyleSheet);

  return (
    <View style={styles.container}>
      {values.map((value) => (
        <ValueCard
          key={value}
          value={value}
          onPress={onValuePress}
          isDark={isDark}
          greyedOut={selectedValue !== undefined && selectedValue !== value}
        />
      ))}
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
      width: '100%',
    },
  });
