import React, { useContext, useEffect } from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'
import EventSource from 'react-native-event-source'
import { Context as MenuContext } from '../../context/MenuContext'
import { Context as SseContext } from '../../context/SseContext'
import ngrokApi from '../../api/ngrokApi'

import { normalize } from '../../utils/fontUtils'

const SseEvents = () => {
  const {
    state: { menuExpanded, useStaticMenu },
  } = useContext(MenuContext)

  const {
    state: { sseResponseData },
    setSseResponseData,
  } = useContext(SseContext)

  useEffect(() => {
    const eventSource = new EventSource(`${ngrokApi}/events`)
    eventSource.addEventListener('message', function (event) {
      console.log('New SSE event:', JSON.parse(event.data))
    })
    return () => {
      console.log('Closing EventSource.')
      eventSource.close()
    }
  }, [])

  useEffect(() => {
    console.log(`hello world:`, sseResponseData)
  }, [sseResponseData])

  const triggerSseEvent = async () => {
    console.log('Triggering SSE event on server.')
    const response = await fetch(
      'https://a958-105-184-75-3.ngrok-free.app/trigger',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ panic: true }),
      }
    )
    const data = await response.json()
    console.log('Server response after triggering:', data)
    setSseResponseData(data)
  }

  const containerStyle = [
    styles.container,
    !menuExpanded && !useStaticMenu ? { zIndex: 10 } : {},
  ]

  return (
    <View style={containerStyle}>
      <Text>Server-Sent Events Test</Text>
      <Button title="Trigger SSE Event" onPress={triggerSseEvent} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  button: {
    width: '90%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 30,
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontSize: normalize(16),
    fontWeight: '600',
    padding: 15,
  },
})

export default SseEvents
