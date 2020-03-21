import React from 'react'
import { View } from 'react-native'
import { Results } from './Results'
import {serverUrl} from '../config.json'

const socket = new WebSocket("ws://localhost:8999")

socket.onmessage = (message) => {
  console.warn(message)
}

socket.onopen = (() => {
  socket.send("Hallo")
})

export const Root = () => {
  return (
    <Results />
  )
}