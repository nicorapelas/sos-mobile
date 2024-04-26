import React, { useState, useContext, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native'

import KeyboardSpacer from '../../commom/sweeks/KeyboardSpacer'
import { Context as MenuContext } from '../../../context/MenuContext'
import { Context as SocketContext } from '../../../context/SocketContext'
import { Context as NotificationContext } from '../../../context/NotificationContext'
import { devKeys } from '../../../config/devKeys'

const Chat = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  const {
    state: { menuExpanded, useStaticMenu },
  } = useContext(MenuContext)

  const {
    state: { ws },
    setWs,
  } = useContext(SocketContext)

  useEffect(() => {
    const websocket = new WebSocket(`wss://${devKeys.ngrokUri.slice(8)}`)
    websocket.onmessage = (e) => {
      setMessages((prev) => [...prev, e.data])
    }
    websocket.onerror = (e) => {
      console.error(e.message)
    }
    websocket.onclose = (e) => {
      console.log('WebSocket closed', e.reason)
    }
    setWs(websocket)

    return () => {
      websocket.close()
    }
  }, [])

  const sendMessage = () => {
    if (ws && input.trim()) {
      const messageObject = { message: input }
      ws.send(JSON.stringify(messageObject)) // Sending as a JSON string
      setInput('')
    }
  }

  const containerStyle = [
    styles.container,
    !menuExpanded && !useStaticMenu ? { zIndex: 10 } : {},
  ]

  const rendercontent = () => {
    return (
      <View style={containerStyle}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
          <View style={styles.messagesContainer}>
            {messages.map((message, index) => (
              <Text style={styles.message} key={index}>
                {message}
              </Text>
            ))}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="Type your message here..."
            />
            <Button title="Send" onPress={sendMessage} color="#1e90ff" />
          </View>
        </KeyboardAvoidingView>
        <KeyboardSpacer />
      </View>
    )
  }

  return rendercontent()
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 10,
  },
  message: {
    backgroundColor: '#ddd', // Light grey for message bubbles
    color: '#333', // Dark text for readability
    padding: 8,
    borderRadius: 10,
    marginVertical: 2,
    fontSize: 16,
    overflow: 'hidden',
  },
  inputContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
  },
})

export default Chat
