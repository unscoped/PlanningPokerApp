import React from 'react'
import { User } from '../../shared/model/User'
import { UserCard } from './UserCard'
import { ScrollView } from 'react-native'

type Props = {
    users: User[]
}

const Users: React.FC<Props> = ({users}) => {
    return(
        <ScrollView horizontal>
            {users.map(user => <UserCard user={user} />)}
        </ScrollView>
    )
}