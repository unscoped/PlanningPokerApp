import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';
import Switch from 'expo-dark-mode-switch';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Text, useTheme } from 'react-native-paper';
import { Theme } from 'react-native-paper/lib/typescript/types';
import { useMediaQuery } from 'react-responsive';

import { Colors } from '../ConfigConstants';

import { IconTextButton } from './atoms/IconButton';
import { useRoom } from './hooks/Room';
import { useStyleSheet } from './hooks/Theme';
import { Results } from './molecules/Results';
import { VoteValues } from './molecules/VoteValues';
import { fontStyles } from './styles/Font';

type Props = {
  isDark: boolean;
  toggleTheme: () => void;
};

export const Root: React.FC<Props> = ({ isDark, toggleTheme }) => {
  const styles = useStyleSheet(createStyleSheet);
  const isTabletOrLaptop = useMediaQuery({
    query: '(min-device-width: 600px)',
  });

  const pageTitleStyle = isTabletOrLaptop
    ? fontStyles.headline3
    : fontStyles.headline4;

  const theme = useTheme();

  const {
    name,
    setName: setNameNotUse,
    voteValue,
    vote,
    room,
    userId,
    reset,
    reveal,
  } = useRoom();

  const setName = useCallback(
    (newName: string) => {
      setNameNotUse(newName);
      AsyncStorage.setItem('username', newName);
    },
    [setNameNotUse],
  );

  const copyUrlToClipboard = useCallback(() => {
    const roomLink = window.location.href;
    Clipboard.setString(roomLink);
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('username').then((savedName) => {
      if (savedName) {
        setName(savedName);
      }
    });
  }, [setName]);

  return (
    <Surface style={styles.page}>
      <Surface
        style={[styles.canvas, { width: isTabletOrLaptop ? '90%' : '100%' }]}
      >
        <Text style={pageTitleStyle}>{'Planning Poker 🎲'}</Text>
        <View style={styles.spacedRow}>
          <IconTextButton
            icon="share"
            label="Share room"
            mode="outlined"
            onPress={copyUrlToClipboard}
          />
          <Switch value={isDark} onChange={toggleTheme} />
        </View>

        <View style={styles.divider} />
        <View style={styles.centerRow}>
          <IconTextButton
            icon="replay"
            label="Reset"
            mode="contained"
            onPress={reset}
          />
          <IconTextButton
            icon="eye-check-outline"
            label="Reveal"
            mode="contained"
            onPress={reveal}
            color={theme.dark ? Colors.DarkZero : Colors.LightZero}
          />
        </View>
        <VoteValues
          onValuePress={vote}
          isDark={isDark}
          selectedValue={voteValue}
        />
        <Results
          users={Object.values(room.users)}
          userId={userId}
          userName={name}
          onUserNameChange={setName}
        />
      </Surface>
    </Surface>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    canvas: {
      alignItems: 'center',
      height: '100%',
      paddingHorizontal: 16,
      paddingVertical: 16,
    },
    centerRow: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
    },
    divider: {
      alignSelf: 'stretch',
      borderBottomColor: theme.colors.primary,
      borderBottomWidth: 2,
    },
    page: {
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      flex: 1,
    },
    spacedRow: {
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      maxWidth: 375,
      paddingVertical: 8,
      width: '100%',
    },
  });
