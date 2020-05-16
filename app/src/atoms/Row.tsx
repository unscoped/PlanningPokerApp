import React from 'react';
import { View } from 'react-native';

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
    <View
      style={{
        alignItems: 'center',
        alignSelf: 'stretch',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: mode,
      }}
    >
      {children}
    </View>
  );
};
