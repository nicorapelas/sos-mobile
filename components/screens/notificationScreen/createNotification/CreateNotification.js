import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import { Context as NotificationContext } from '../../../../context/NotificationContext'
import { Context as MenuContext } from '../../../../context/MenuContext'
import { Context as UserDataContext } from '../../../../context/UserDataContext'

const CreateNotification = () => {
  const { setNotificationReceived, createNotification } =
    useContext(NotificationContext)

  const {
    state: { menuExpanded, useStaticMenu },
  } = useContext(MenuContext)

  const {
    state: { user },
  } = useContext(UserDataContext)

  const handleSend = () => {
    const message = {
      event: 'membersNotification',
      message: '3 mavros outside!',
      userId: user._id,
    }
    createNotification(message)
  }

  const button = () => (
    <TouchableOpacity onPress={handleSend}>
      <Text>Send Notification</Text>
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

export default CreateNotification
