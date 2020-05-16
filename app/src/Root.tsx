import Switch from 'expo-dark-mode-switch';
import React, { useCallback, useEffect, useState } from 'react';
import { AsyncStorage, StatusBar, StyleSheet, View } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import {
  Card,
  Divider,
  Surface,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { Results } from './Results';
import { useRoom } from './RoomHandler';
import { VoteValues } from './VoteValues';
import { FlexWrapRow } from './atoms/Row';
import { RoomCard } from './builders/RoomCard';
import { UserCard } from './builders/UserCard';
import { useManualDarkMode } from './hooks/Theme';
import { fontStyles } from './styles/Font';
import { gridStyles } from './styles/Grid';

type Props = {
  isDark: boolean;
  onDarkModeChange: () => void;
};

export const Root: React.FC<Props> = ({ isDark, onDarkModeChange }) => {
  const [userName, setUserName] = useState<string>('');
  const { colors } = useTheme();

  const { vote, room } = useRoom(userName);

  const updateUserName = useCallback(
    (newName: string) => {
      setUserName(newName);
      AsyncStorage.setItem('username', newName);
    },
    [setUserName],
  );

  useEffect(() => {
    AsyncStorage.getItem('username').then((savedName) => {
      if (savedName) {
        setUserName(savedName);
      }
    });
  });

  return (
    <Surface
      style={[
        { backgroundColor: colors.primary, paddingBottom: 32 },
        styles.page,
      ]}
    >
      <Surface style={styles.canvas}>
        <FlexWrapRow mode="space-between">
          <Text style={fontStyles.headline3}>{'Planning Poker 🎲'}</Text>
          <Switch value={isDark} onChange={onDarkModeChange} />
        </FlexWrapRow>
        <View
          style={{
            borderBottomColor: isDark ? colors.accent : colors.primary,
            borderBottomWidth: 2,
            alignSelf: 'stretch',
          }}
        />
        <FlexWrapRow mode="space-evenly">
          <View style={{ flex: 1, paddingRight: 8 }}>
            <RoomCard roomId={room.id} />
          </View>
          <View style={{ flex: 1, paddingLeft: 8 }}>
            <UserCard username={userName} />
          </View>
        </FlexWrapRow>

        <View style={{ alignSelf: 'stretch', paddingVertical: 8 }}>
          <TextInput
            value={userName}
            label={'Username'}
            onChangeText={setUserName}
          />
        </View>
        <View style={{ paddingVertical: 8 }}>
          <VoteValues onValuePress={vote} isDark={isDark} />
        </View>
        <Results users={Object.values(room.users)} isDark={isDark} />
      </Surface>
    </Surface>
  );
};

const styles = StyleSheet.create({
  page: {
    alignItems: 'center',
    flex: 1,
  },
  canvas: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
    width: wp('80%'),
    height: '100%',
  },
});
