import React from 'react';
import { StyleSheet, View } from 'react-native';

import { constants as C } from '../styles/Constants';

const S = StyleSheet.create({
  spacingSmall: { width: C.spacing.small, height: C.spacing.small },
  spacingStandard: { width: C.spacing.standard, height: C.spacing.standard },
  spacingMedium: { width: C.spacing.medium, height: C.spacing.medium },
  spacingLarge: { width: C.spacing.large, height: C.spacing.large },
  spacingExtraLarge: {
    width: C.spacing.extraLarge,
    height: C.spacing.extraLarge,
  },
});

type Props = {
  small?: boolean;
  medium?: boolean;
  large?: boolean;
  extraLarge?: boolean;
};

export const Spacer: React.FC<Props> = ({
  small,
  medium,
  large,
  extraLarge,
}) => {
  let style = S.spacingStandard;
  if (small) style = S.spacingSmall;
  else if (medium) style = S.spacingMedium;
  else if (large) style = S.spacingLarge;
  else if (extraLarge) style = S.spacingExtraLarge;

  return <View style={style} />;
};
