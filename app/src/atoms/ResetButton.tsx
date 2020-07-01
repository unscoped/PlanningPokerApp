import React from 'react';
import { Button } from 'react-native-paper';

interface IProps {
  onPress: () => void;
}

export const ResetButton: React.FC<IProps> = ({ onPress }) => (
  <Button icon="replay" mode="contained" onPress={onPress}>
    Reset
  </Button>
);
