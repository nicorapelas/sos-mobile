import React, { useContext, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import { Context as NotificationContext } from '../../../../context/NotificationContext'
import { Context as MenuContext } from '../../../../context/MenuContext'
import { Context as UserDataContext } from '../../../../context/UserDataContext'
import { Context as CommunityContext } from '../../../../context/CommunityContext'

const CreateNotification = () => {
  const { setNotificationReceived, createNotification } =
    useContext(NotificationContext)

  const {
    state: { menuExpanded, useStaticMenu },
  } = useContext(MenuContext)

  const {
    state: { user },
  } = useContext(UserDataContext)

  const {
    state: { communityList },
  } = useContext(CommunityContext)

  const handleSend = () => {
    const message = {
      event: 'membersNotification',
      message: '3 mavros outside!',
      userId: user._id,
      communityList,
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
