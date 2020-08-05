import Switch from 'expo-dark-mode-switch';
import React, { useCallback, useEffect } from 'react';
import { AsyncStorage, Clipboard, StyleSheet, View } from 'react-native';
import { Surface, Text, Theme } from 'react-native-paper';
import { useMediaQuery } from 'react-responsive';

import { Results } from './Results';
import { useRoom } from './RoomHandler';
import { VoteValues } from './VoteValues';
import { ResetButton } from './atoms/ResetButton';
import { ShareButton } from './atoms/ShareButton';
import { Spacer } from './atoms/Spacer';
import { useStyleSheet } from './hooks/Theme';
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

  const {
    name,
    setName: setNameNotUse,
    voteValue,
    vote,
    room,
    userId,
    reset,
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
        <View style={styles.head}>
          <Text style={pageTitleStyle}>{'Planning Poker 🎲'}</Text>
          <View style={styles.switchWrapper}>
            <Switch value={isDark} onChange={toggleTheme} />
          </View>
        </View>
        <View style={styles.buttonRow}>
          <ResetButton onPress={reset} />
          <ShareButton onPress={copyUrlToClipboard} />
        </View>
        <View style={styles.divider} />
        <View>
          <Spacer />
          <VoteValues
            onValuePress={vote}
            isDark={isDark}
            selectedValue={voteValue}
          />
          <Spacer />
        </View>
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
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      maxWidth: 320,
      paddingHorizontal: 8,
      paddingVertical: 12,
      width: '100%',
    },
    canvas: {
      alignItems: 'center',
      height: '100%',
      paddingHorizontal: 16,
      paddingVertical: 16,
    },
    divider: {
      alignSelf: 'stretch',
      borderBottomColor: theme.colors.primary,
      borderBottomWidth: 2,
    },
    fillWidth: { alignSelf: 'stretch' },
    flexRow: { flex: 1, height: '100%' },
    head: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    page: {
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      flex: 1,
    },
    switchWrapper: {
      flexDirection: 'column',
      justifyContent: 'center',
      marginHorizontal: 16,
    },
  });
