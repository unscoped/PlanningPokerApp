import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { User } from '../shared/model/User'

type Props = {
  users: User[]
}
export const Results: React.FC<Props> = ({users}) => {
  return (
    <View style={styles.container}>
      {users.map(user => (<Text key={`${user.id}`}>{user.userName}</Text>))}
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