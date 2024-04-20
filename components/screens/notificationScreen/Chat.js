import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import io from 'socket.io-client'

import ngrokApi from '../../../api/ngrokApi'

const socket = io(ngrokApi)

const Chat = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg])
    })

    return () => {
      socket.off('chat message')
    }
  }, [])

  const sendMessage = () => {
    if (message.trim().length > 0) {
      socket.emit('chat message', message)
      setMessage('')
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <Text key={index} style={styles.message}>
            {msg}
          </Text>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  message: {
    fontSize: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginTop: 4,
    marginRight: 'auto',
    backgroundColor: '#f9f9f9',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
})

export default Chat
