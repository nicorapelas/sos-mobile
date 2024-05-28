import React, { useState, useContext, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import io from 'socket.io-client'

import { Context as MenuContext } from '../../context/MenuContext'
import { devKeys } from '../../config/devKeys'

const socket = io(devKeys.ngrokUri, {
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  randomizationFactor: 0.5,
}) // Adjust the URL to match your server

const SocketIo = () => {
  const [messages, setMessages] = useState([])
  const [status, setStatus] = useState('Disconnected')

  const {
    state: { menuExpanded, useStaticMenu },
  } = useContext(MenuContext)

  useEffect(() => {
    socket.on('connect', () => {
      setStatus('Connected')
      console.log('Connected to Socket.IO server')

      // Listen for messages
      socket.on('message', (data) => {
        setMessages((prevMessages) => [...prevMessages, data])
      })
    })

    socket.on('disconnect', () => {
      setStatus('Disconnected')
      console.log('Disconnected from Socket.IO server')
    })

    socket.on('reconnect_attempt', () => {
      setStatus('Reconnecting...')
      console.log('Attempting to reconnect...')
    })

    socket.on('reconnect', (attemptNumber) => {
      setStatus('Connected')
      console.log(
        'Reconnected to Socket.IO server after',
        attemptNumber,
        'attempts'
      )
    })

    socket.on('reconnect_error', (error) => {
      console.error('Reconnect error:', error)
    })

    socket.on('reconnect_failed', () => {
      setStatus('Failed to reconnect')
      console.error('Failed to reconnect to Socket.IO server')
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('reconnect_attempt')
      socket.off('reconnect')
      socket.off('reconnect_error')
      socket.off('reconnect_failed')
      socket.off('message')
    }
  }, [])

  const handleSend = () => {
    const message = { event: 'eventOne', message: 'hello world' }
    socket.emit('message', message)
    console.log('Sent message:', message)
  }

  const button = () => {
    return (
      <TouchableOpacity onPress={handleSend}>
        <Text>Send</Text>
      </TouchableOpacity>
    )
  }

  const containerStyle = [
    styles.container,
    !menuExpanded && !useStaticMenu ? { zIndex: 10 } : {},
  ]

  const renderContent = () => {
    return (
      <View style={containerStyle}>
        <View>
          <View>
            <Text>Status: {status}</Text>
            {messages.map((msg, index) => (
              <Text key={index}>{msg.message}</Text>
            ))}
          </View>
          <View>{button()}</View>
        </View>
      </View>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
})

export default SocketIo
