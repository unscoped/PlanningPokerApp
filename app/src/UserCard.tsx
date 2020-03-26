import React from 'react'
import { User } from '../../shared/model/User'
import { Card } from 'react-native-paper'
import { Text } from 'react-native'

type Props = {
    user: User
}

export const UserCard: React.FC<Props> = ({user}) => {
    return (
        <Card style={{padding: 32}} >
            <Text >{user.userName}</Text>
        </Card>
    )
}

