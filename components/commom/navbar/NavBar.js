import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import DevicesNavLink from './DevicesNavLink'
import CommunitiesNavLink from './CommunitiesNavLink'
import ServicesNavLink from './ServicesNavLink'
import NotificationsNavLink from './NotificationsNavLink'

const Navbar = () => {
  const renderLoader = () => {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <DevicesNavLink />
          <CommunitiesNavLink />
          <ServicesNavLink />
          <NotificationsNavLink />
        </View>
      </View>
    )
  }

  return renderLoader()
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
    flex: 9,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})

export default Navbar
