import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { Card, Text } from 'react-native-paper';

import { Colors } from '../ConfigConstants';
import { VoteValue } from '../shared/model/User';

import { FlexWrapRow } from './atoms/Row';

type Props = {
  value: VoteValue;
  onPress: (value: VoteValue) => void;
  isDark: boolean;
};

const values: VoteValue[] = [0, 1, 2, 3, 5, 8, 13, 21, '🤔'];

export const ValueCard: React.FC<Props> = ({ value, onPress, isDark }) => {
  const onCardPress = useCallback(() => onPress(value), [onPress, value]);

  return (
    <Card
      style={[
        styles.valueContainer,
        {
          backgroundColor: getColorForValue(value, isDark),
        },
      ]}
      onPress={onCardPress}
    >
      <View style={styles.valueCard}>
        <Text>{value}</Text>
      </View>
    </Card>
  );
};

const getColorForValue = (value: VoteValue, dark: boolean): Colors => {
  switch (value) {
    case 1:
      return dark ? Colors.DarkOne : Colors.LightOne;
    case 2:
      return dark ? Colors.DarkTwo : Colors.LightTwo;
    case 3:
      return dark ? Colors.DarkThree : Colors.LightThree;
    case 5:
      return dark ? Colors.DarkFive : Colors.LightFive;
    case 8:
      return dark ? Colors.DarkEight : Colors.LightEight;
    case 13:
      return dark ? Colors.DarkThirteen : Colors.LightThirteen;
    case 21:
      return dark ? Colors.DarkTwentyOne : Colors.LightTwentyOne;
    default:
      return dark ? Colors.DarkUnknown : Colors.LightUnknown;
  }
};

type ValuesProps = {
  onValuePress: (value: VoteValue) => void;
  isDark: boolean;
};

export const VoteValues: React.FC<ValuesProps> = ({ onValuePress, isDark }) => {
  return (
    <FlexWrapRow mode="center">
      {values.map((value) => (
        <ValueCard
          key={value}
          value={value}
          onPress={onValuePress}
          isDark={isDark}
        />
      ))}
    </FlexWrapRow>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  valueContainer: {
    marginHorizontal: 8,
    elevation: 4,
    marginVertical: 4,
  },
  valueCard: {
    alignItems: 'center',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    width: 50,
  },
});
