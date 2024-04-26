import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { Context as MenuContext } from '../../../../context/MenuContext'
import { devKeys } from '../../../../config/devKeys'

const PanicButton = () => {
  const [panic, setPanic] = useState(false)
  const [panicData, setPanicData] = useState({})
  const [ws, setWs] = useState(null)
  const [receivedData, setReceivedData] = useState({})
  const [reconnectAttempts, setReconnectAttempts] = useState(0)

  const {
    state: { menuExpanded, useStaticMenu },
  } = useContext(MenuContext)

  useEffect(() => {
    function connectWebSocket() {
      const newWebSocket = new WebSocket(`wss://${devKeys.ngrokUri.slice(8)}`)
      newWebSocket.onopen = () => {
        console.log('WebSocket connection established')
        setReconnectAttempts(0) // Reset reconnect attempts on successful connection
      }
      newWebSocket.onmessage = (event) => {
        console.log('Received data from WebSocket:', event.data)
        try {
          const data = JSON.parse(event.data)
          setReceivedData(data)
        } catch (error) {
          console.error('Failed to parse incoming WebSocket message:', error)
        }
      }
      newWebSocket.onerror = (error) => {
        console.error('WebSocket error:', error)
      }
      newWebSocket.onclose = (event) => {
        console.log('WebSocket connection closed', event)
        if (!event.wasClean && reconnectAttempts < 5) {
          const delay = Math.pow(2, reconnectAttempts) * 1000 // Exponential backoff
          setTimeout(connectWebSocket, delay)
          setReconnectAttempts(reconnectAttempts + 1)
        }
      }

      setWs(newWebSocket)
    }

    connectWebSocket()

    return () => {
      if (ws) {
        ws.close()
      }
    }
  }, [reconnectAttempts])

  useEffect(() => {
    if (panic) {
      console.log('Panic activated')
      const newPanicData = {
        user: 'user001',
        panic: true,
        message: 'help',
      }
      setPanicData(newPanicData)
      if (ws && ws.readyState === WebSocket.OPEN) {
        console.log('Sending panic data:', newPanicData)
        ws.send(JSON.stringify(newPanicData))
      }
    }
  }, [panic, ws])

  const handlePress = () => {
    setPanic(true)
  }

  const renderContent = () => {
    const containerStyle = [
      styles.container,
      !menuExpanded && !useStaticMenu ? { zIndex: 10 } : {},
    ]

    return (
      <View style={containerStyle}>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>PANIC!</Text>
        </TouchableOpacity>
        {receivedData.message && (
          <Text>Received Message: {receivedData.message}</Text>
        )}
      </View>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: 'red',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  buttonText: {
    color: '#ffff',
    textAlign: 'center',
  },
})

export default PanicButton
