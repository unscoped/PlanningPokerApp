import React, { useCallback } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { User } from '../shared/model/User'
import { Card } from 'react-native-paper'

type Props = {
  users: User[]
}
export const Results: React.FC<Props> = ({users}) => {
  const renderUser = useCallback((user: User) => {
    return(
      <Card style={{aspectRatio: 2, width: 100, height: 200, backgroundColor: 'tomato'}}>
        <View key={`${user.id}`}>
          <Text>{`User: ${user.userName}`}</Text>
          <Text>{`Vote value: ${user.voteValue}`}</Text>
        </View> 
      </Card>
    );
  }, [users]);

  return (
    <Card>
      <View style={styles.container}>
        {users.map(renderUser)}
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})