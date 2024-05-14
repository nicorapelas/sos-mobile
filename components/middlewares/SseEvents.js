import React, { useEffect, useState, useContext } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import axios from 'axios'
import EventSource from 'react-native-event-source'

import { devKeys } from '../../config/devKeys'
import { Context as MenuContext } from '../../context/MenuContext'
import { normalize } from '../../utils/fontUtils'

const SseEvents = () => {
  const [events, setEvents] = useState([])

  const {
    state: { menuExpanded, useStaticMenu },
  } = useContext(MenuContext)

  useEffect(() => {
    const eventSource = new EventSource(`${devKeys.ngrokUri}/events`)

    eventSource.onmessage = (event) => {
      const newEvent = JSON.parse(event.data)
      console.log('Event received:', newEvent)
      setEvents((prevEvents) => [...prevEvents, newEvent])
    }

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error)
      eventSource.close()
    }

    eventSource.onopen = () => {
      console.log('Connection to server opened.')
    }

    return () => {
      eventSource.close()
    }
  }, [])

  const triggerSseEvent = async () => {
    try {
      const response = await axios.post(`${devKeys.ngrokUri}/trigger`, {
        event: 'panic',
      })
      console.log('Triggered SSE event:', response.data)
    } catch (error) {
      console.error('Error triggering SSE event:', error)
    }
  }

  const containerStyle = [
    styles.container,
    !menuExpanded && !useStaticMenu ? { zIndex: 10 } : {},
  ]

  return (
    <View style={containerStyle}>
      <Button title="Trigger SSE Event" onPress={triggerSseEvent} />
      {events.map((event, index) => (
        <Text key={index}>{JSON.stringify(event)}</Text>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '90%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 30,
  },
  icon: {
    color: 'black',
    fontSize: normalize(16),
    alignSelf: 'center',
    marginRight: 5,
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontSize: normalize(16),
    fontWeight: '600',
    paddingVertical: 15,
  },
})

export default SseEvents
