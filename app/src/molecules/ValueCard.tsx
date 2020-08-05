import React, { useCallback } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Card } from 'react-native-paper';
import { Theme } from 'react-native-paper/lib/typescript/src/types';

import { Colors } from '../../ConfigConstants';
import { VoteValue } from '../../shared/model/User';
import { useStyleSheet } from '../hooks/Theme';
import { fontStyles } from '../styles/Font';

type Props = {
  value: VoteValue;
  onPress: (value: VoteValue) => void;
  isDark: boolean;
  greyedOut: boolean;
};
const getColorForValue = (value: VoteValue, dark: boolean): Colors => {
  switch (value) {
    case -1:
      return dark ? Colors.DarkDisabled : Colors.LightDisabled;
    case 0:
      return dark ? Colors.DarkZero : Colors.LightZero;
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

export const ValueCard: React.FC<Props> = ({
  value,
  onPress,
  isDark,
  greyedOut,
}) => {
  const styles = useStyleSheet(createStyleSheet);
  const cardColorStyle: ViewStyle = {
    backgroundColor: greyedOut
      ? getColorForValue(-1, isDark)
      : getColorForValue(value, isDark),
  };
  const onCardPress = useCallback(() => onPress(value), [onPress, value]);

  return (
    <Card style={[styles.valueContainer, cardColorStyle]} onPress={onCardPress}>
      <View style={styles.valueCard}>
        <Text style={[fontStyles.subtitle1, { fontWeight: '900' }]}>
          {value}
        </Text>
      </View>
    </Card>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    valueCard: {
      alignItems: 'center',
      borderRadius: 8,
      height: 50,
      justifyContent: 'center',
      width: 50,
    },
    valueContainer: {
      marginHorizontal: 8,
      elevation: 4,
      marginVertical: 4,
    },
  });
