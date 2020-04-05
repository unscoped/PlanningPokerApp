import UUID from 'pure-uuid'
import React, { useState, useReducer, useEffect, useCallback } from 'react'
import { Linking } from 'expo'
import {TextInput, Button, ActivityIndicator} from 'react-native-paper'
import { View, StatusBar, Text } from 'react-native'
import { Results } from './Results'
import { Room } from '../shared/model/Room'
import { Message, MessageType, JoinRequestMessage } from '../shared/model/Message'

// TODO: Connect to Heroku 🧙‍♂️
const SERVER_HOST = __DEV__ ? "ws://localhost:8999" : "" 

type ErrorMessage = {
  title: string;
  message: string;
}

let INIT_ROOM: Room = {
  id: "",
  name: "",
  users: {},
  admin: undefined
}

export const Root:React.FC = () => {
  const [userName, setUserName] = useState<string>();
  const [room, setRoom] = useState<Room>(INIT_ROOM);
  const [message, setMessage] = useState<Message>();
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>();
  const [roomId, setRoomId] = useState();

  const joinRoom = useCallback(() => {
    //TODO: Update this to be more exhaustive
    const isValidUserName = !!userName || userName.length > 0

    if(isValidUserName) {
      const roomId = new UUID(4).toString()
      
      const joinRequest: JoinRequestMessage = {
        type: MessageType.JoinRequest,
        roomId,
        payload: {
          name: userName,
        }
      }
      setMessage(joinRequest)
    }
  }, [userName]);

  const urlHandler = useCallback((url) => {
    console.log("Url received: ", url)
  }, []);

  // Set up the WebSocket connection
  useEffect(() => {
    if(!!message){

      const ws = new WebSocket(SERVER_HOST);
      
      ws.onopen = (() => {
        ws.send(JSON.stringify(message));
      })
      ws.onmessage = (event) => {
        const msg: Message = JSON.parse(event.data);
        console.log("Received message: ", msg)

        switch(msg.type){
          case MessageType.RoomUpdate: {
            console.log("Updating room")
            setRoom(msg.payload.room);
            break;
          }
          default:
            return
        }
      }
      ws.onerror = (error) => {
        console.error("Error: ", error)
        setErrorMessage({title: "Oops!", message: "Something went wrong..."});
      }
      return () => ws.close();
    }
  },[message]);

  useEffect(() => {
    Linking.getInitialURL()
      .then(urlHandler)
      .catch(e => console.error(e))
  }, [urlHandler])

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16, paddingTop: StatusBar.currentHeight + 16}}>
      <Text>{`Room id: ${room.id}`}</Text>
      <View style={{width: "50%"}}>
        <TextInput value={userName} label={"Username"}  onChangeText={(text:string) => setUserName(text)}  />
      </View>
      <View>
        <Button mode="contained"  testID={"join-room-button"} onPress={joinRoom}>
          <Text>{"Join room"}</Text>
        </Button>
      </View>
      <Results users={Object.values(room.users)} />
    </View>
  )
}