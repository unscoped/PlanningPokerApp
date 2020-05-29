import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, TextInput, Theme, useTheme } from 'react-native-paper';

import { Spacer } from '../atoms/Spacer';
import { useStyleSheet } from '../hooks/Theme';
import { fontStyles } from '../styles/Font';

type UserCardProps = {
  username: string;
  onUsernameChange: (value: string) => void;
};

export const UserCard: React.FC<UserCardProps> = ({
  username,
  onUsernameChange,
}) => {
  const styles = useStyleSheet(createStyleSheet);
  const theme = useTheme();
  return (
    <Card elevation={0}>
      <View style={styles.container}>
        <Spacer medium />
        <Text style={fontStyles.headline5}>User</Text>
        <TextInput
          style={{ backgroundColor: theme.colors.background }}
          value={username}
          label={'Username'}
          onChangeText={onUsernameChange}
        />
        <Spacer medium />
      </View>
    </Card>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 8,
      backgroundColor: theme.colors.background,
      borderRadius: theme.roundness * 2,
    },
  });
