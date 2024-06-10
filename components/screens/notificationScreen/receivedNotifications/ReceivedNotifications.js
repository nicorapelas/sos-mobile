import React, { useContext, useEffect } from 'react'
import { View, Text } from 'react-native'

import { Context as NotificationContext } from '../../../../context/NotificationContext'

const ReceivedNotifications = () => {
  const {
    state: { notificationReceived },
  } = useContext(NotificationContext)

  useEffect(() => {
    console.log(`notificationReceived:`, notificationReceived)
  }, [notificationReceived])

  const renderContent = () => {
    return (
      <View>
        <Text>Received notifications</Text>
      </View>
    )
  }

  return renderContent()
}

export default ReceivedNotifications
