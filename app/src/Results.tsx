import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const results = [1, 5, 6, 19]

export const Results = () => {
  return (
    <View style={styles.container}>
      {results.map(result => (<Text>{result}</Text>))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})