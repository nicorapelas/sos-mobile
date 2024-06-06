import React, { useState, useContext, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import io from 'socket.io-client'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Context as MenuContext } from '../../context/MenuContext'
import { Context as UserDataContext } from '../../context/UserDataContext'
import { devKeys } from '../../config/devKeys'

const PanicButton = () => {
  const handleSend = () => {
    const message = {
      event: 'panic',
      message: 'panic triggered',
      userId: user._id,
    }
    if (socket) {
      socket.emit('message', message)
      console.log('Sent message:', message)
    } else {
      console.error('Socket is not initialized')
    }
  }

  const button = () => (
    <TouchableOpacity onPress={handleSend}>
      <Text>Send</Text>
    </TouchableOpacity>
  )

  const containerStyle = [
    styles.container,
    !menuExpanded && !useStaticMenu ? { zIndex: 10 } : {},
  ]

  return (
    <View style={containerStyle}>
      <View>
        <View>
          {messages.map((msg, index) => (
            <Text key={index}>{msg.message}</Text>
          ))}
        </View>
        <View>{button()}</View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
})

export default PanicButton
