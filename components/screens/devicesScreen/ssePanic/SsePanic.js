import { useEffect, useState, useContext } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { Context as MenuContext } from '../../../../context/MenuContext'
import { Context as SseContext } from '../../../../context/SseContext'
import { Context as UserDataContext } from '../../../../context/UserDataContext'
import SSEConnection from '../../../../middlewares/SSEConnection'
import { normalize } from '../../../../utils/fontUtils'

const SsePanic = () => {
  const [message, setMessage] = useState('')

  const {
    state: { menuExpanded, useStaticMenu },
  } = useContext(MenuContext)

  const { triggerPanic } = useContext(SseContext)

  const {
    state: { user },
  } = useContext(UserDataContext)

  useEffect(() => {
    const { closeConnection } = SSEConnection(
      'https://8ca7-105-184-75-3.ngrok-free.app/events',
      (data) => {
        console.log(`data:`, data)
        setMessage(data.message)
      }
    )
    return () => {
      closeConnection()
    }
  }, [])

  const handleTriggerOne = () => {
    triggerPanic()
  }

  const containerStyle = [
    styles.container,
    !menuExpanded && !useStaticMenu ? { zIndex: 10 } : {},
  ]

  return (
    <View style={containerStyle}>
      <Text>{message}</Text>
      <TouchableOpacity onPress={handleTriggerOne}>
        <Text>Trigger panic</Text>
      </TouchableOpacity>
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

export default SsePanic
