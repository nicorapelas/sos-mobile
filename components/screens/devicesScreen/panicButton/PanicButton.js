import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import { Context as PanicContext } from '../../../../context/PanicContext'
import { Context as MenuContext } from '../../../../context/MenuContext'
import { Context as UserDataContext } from '../../../../context/UserDataContext'

const PanicButton = () => {
  const { setPanicDataSent } = useContext(PanicContext)

  const {
    state: { menuExpanded, useStaticMenu },
  } = useContext(MenuContext)

  const {
    state: { user },
  } = useContext(UserDataContext)

  // const handleSend = () => {
  //   const message = {
  //     event: 'panic',
  //     message: 'panic triggered',
  //     userId: user._id,
  //   }
  //   if (socket) {
  //     socket.emit('message', message)
  //     console.log('Sent message:', message)
  //   } else {
  //     console.error('Socket is not initialized')
  //   }
  // }

  const handleSend = () => {
    const message = {
      event: 'panic',
      message: 'panic triggered',
      userId: user._id,
    }
    setPanicDataSent(message)
  }

  const button = () => (
    <TouchableOpacity onPress={handleSend}>
      <Text>Send Panic</Text>
    </TouchableOpacity>
  )

  const containerStyle = [
    styles.container,
    !menuExpanded && !useStaticMenu ? { zIndex: 10 } : {},
  ]

  return (
    <View style={containerStyle}>
      <View>
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
