import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Context as NavContext } from '../../../context/NavContext'
import CommunitiesScreen from '../communitiesScreen/CommunitiesScreen'
import DevicesScreen from '../devicesScreen/DevicesScreen'
import NotificationsScreen from '../notificationScreen/NotificationsScreen'
import ServicesScreen from '../servicesScreen/ServicesScreen'

const MainContentRender = () => {
  const {
    state: { navTabSelected },
  } = useContext(NavContext)

  const contentSelector = () => {
    switch (navTabSelected) {
      case 'communities':
        return <CommunitiesScreen />
      case 'devices':
        return <DevicesScreen />
      case 'notifications':
        return <NotificationsScreen />
      case 'services':
        return <ServicesScreen />
      default:
        break
    }
  }

  const renderContent = () => {
    return <View style={styles.container}>{contentSelector()}</View>
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'yellow',
    flex: 63,
  },
})

export default MainContentRender
