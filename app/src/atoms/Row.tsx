import React from 'react';
import { StyleSheet, View } from 'react-native';

type FlexWrapRowProps = {
  mode?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
};

export const FlexWrapRow: React.FC<FlexWrapRowProps> = ({ children, mode }) => {
  return (
    <View style={[styles.flexWrapRow, { justifyContent: mode }]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  flexWrapRow: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
