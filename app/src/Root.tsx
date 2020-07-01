import Switch from 'expo-dark-mode-switch';
import React, { useCallback, useEffect } from 'react';
import { AsyncStorage, StyleSheet, View } from 'react-native';
import { Surface, Text, Theme } from 'react-native-paper';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { Results } from './Results';
import { useRoom } from './RoomHandler';
import { VoteValues } from './VoteValues';
import { ResetButton } from './atoms/ResetButton';
import { FlexWrapRow } from './atoms/Row';
import { Spacer } from './atoms/Spacer';
import { RoomCard } from './builders/RoomCard';
import { useStyleSheet } from './hooks/Theme';
import { fontStyles } from './styles/Font';

type Props = {
  isDark: boolean;
  toggleTheme: () => void;
};

export const Root: React.FC<Props> = ({ isDark, toggleTheme }) => {
  const styles = useStyleSheet(createStyleSheet);

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

  useEffect(() => {
    AsyncStorage.getItem('username').then((savedName) => {
      if (savedName) {
        setName(savedName);
      }
    });
  }, [setName]);

  return (
    <Surface style={styles.page}>
      <Surface style={styles.canvas}>
        <View style={styles.head}>
          <Text style={fontStyles.headline3}>{'Planning Poker 🎲'}</Text>
          <View style={styles.switchWrapper}>
            <Switch value={isDark} onChange={toggleTheme} />
          </View>
        </View>
        <View style={styles.divider} />
        <FlexWrapRow mode="space-evenly">
          <View style={styles.flexRow}>
            <RoomCard roomId={room.id + name} />
          </View>
        </FlexWrapRow>
        <ResetButton onPress={reset} />
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
    canvas: {
      alignItems: 'center',
      height: '100%',
      paddingHorizontal: 16,
      paddingVertical: 16,
      width: wp('90%'),
    },
    divider: {
      alignSelf: 'stretch',
      borderBottomColor: theme.dark
        ? theme.colors.accent
        : theme.colors.primary,
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
      paddingBottom: 32,
    },
    switchWrapper: {
      flexDirection: 'column',
      justifyContent: 'center',
      marginHorizontal: 16,
    },
  });
