import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

import { Colors } from '../ConfigConstants';
import { VoteValue } from '../shared/model/User';

type Props = {
  value: VoteValue;
  onPress: (value: VoteValue) => void;
};

const values: VoteValue[] = [0, 1, 2, 3, 5, 8, 13, 21, '🤔'];

export const ValueCard: React.FC<Props> = ({ value, onPress }) => {
  const onCardPress = useCallback(() => onPress(value), [onPress, value]);

  return (
    <Card
      style={[
        styles.valueContainer,
        {
          backgroundColor: getColorForValue(value),
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

const getColorForValue = (value: VoteValue): Colors => {
  switch (value) {
    case 1:
      return Colors.One;
    case 2:
      return Colors.Two;
    case 3:
      return Colors.Three;
    case 5:
      return Colors.Five;
    case 8:
      return Colors.Eight;
    case 13:
      return Colors.Thirteen;
    case 21:
      return Colors.TwentyOne;
    default:
      return Colors.Unknown;
  }
};

type ValuesProps = {
  onValuePress: (value: VoteValue) => void;
};

export const VoteValues: React.FC<ValuesProps> = ({ onValuePress }) => {
  return (
    <View style={styles.container}>
      {values.map((value) => (
        <ValueCard key={value} value={value} onPress={onValuePress} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  valueContainer: {
    marginHorizontal: 8,
    elevation: 4,
  },
  valueCard: {
    alignItems: 'center',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    width: 50,
  },
});
