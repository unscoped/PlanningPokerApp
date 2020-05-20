import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, Theme } from 'react-native-paper';

import { Spacer } from '../atoms/Spacer';
import { useStyleSheet } from '../hooks/Theme';
import { fontStyles } from '../styles/Font';

type UserCardProps = {
  username: string;
};

export const UserCard: React.FC<UserCardProps> = ({ username }) => {
  const styles = useStyleSheet(createStyleSheet);
  return (
    <Card elevation={0}>
      <View style={styles.container}>
        <Spacer medium />
        <Text style={fontStyles.headline5}>User</Text>
        <Text style={fontStyles.subtitle2}>{`username: ${username}`}</Text>
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
      borderRadius: theme.roundness,
    },
  });
