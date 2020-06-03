import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Text, Theme } from 'react-native-paper';

import { useStyleSheet } from '../hooks/Theme';
import { fontStyles } from '../styles/Font';

type UpdatableUsernameProps = {
  value?: string;
  onChangeText: (text: string) => void;
};

export const UpdatableUsername: React.FC<UpdatableUsernameProps> = ({
  value,
  onChangeText,
}) => {
  const styles = useStyleSheet(createStyleSheet);
  const [isActive, setIsActive] = useState<boolean>(false);
  const inlineInputRef = useRef<TextInput>(null);

  const toggleIsActive = useCallback(() => {
    if (value?.length === 0) {
      onChangeText('Guest');
    }
    setIsActive((wasActive) => !wasActive);
  }, [onChangeText, value]);

  useEffect(() => {
    if (isActive) {
      // Imperative method used to focus the text input
      // eslint-disable-next-line no-unused-expressions
      inlineInputRef.current?.focus();
    }
  }, [isActive]);

  if (!isActive) {
    return (
      <TouchableOpacity onPress={toggleIsActive}>
        <FixedUsername userName={value} />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.updatableUsernameContainer}>
      <View style={{ flex: 1 }}>
        <TextInput
          ref={inlineInputRef}
          style={{ paddingHorizontal: 4 }}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={toggleIsActive}
        />
      </View>
      <TouchableOpacity onPress={toggleIsActive} style={styles.button}>
        <Text style={[fontStyles.overline, styles.buttonText]}>{'OK'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const FixedUsername: React.FC<{ userName?: string }> = ({
  userName,
}) => {
  const styles = useStyleSheet(createStyleSheet);
  return (
    <View style={styles.userCardSubtitleContainer}>
      <Text style={styles.subtitle} numberOfLines={1}>
        {userName}
      </Text>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    button: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.roundness,
      marginLeft: 8,
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    buttonText: {
      color: theme.dark ? theme.colors.accent : theme.colors.primary,
      fontWeight: '900',
    },
    subtitle: { ...fontStyles.body1, color: theme.dark ? 'black' : 'white' },
    updatableUsernameContainer: {
      alignItems: 'center',
      backgroundColor: theme.dark ? theme.colors.accent : theme.colors.primary,
      flexDirection: 'row',
      padding: 4,
    },
    userCardSubtitleContainer: {
      alignItems: 'center',
      backgroundColor: theme.dark ? theme.colors.accent : theme.colors.primary,
      flexShrink: 1,
      minHeight: 32,
      paddingHorizontal: 4,
      paddingVertical: 8,
    },
    userCardTitleContainer: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
  });
