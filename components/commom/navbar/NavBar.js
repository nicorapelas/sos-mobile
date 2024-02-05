import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'

import DevicesNavLink from './DevicesNavLink'
import CommunitiesNavLink from './CommunitiesNavLink'
import ServicesNavLink from './ServicesNavLink'
import NotificationsNavLink from './NotificationsNavLink'
import { Context as NavContext } from '../../../context/NavContext'

const Navbar = () => {
  const {
    state: { navTabSelected },
  } = useContext(NavContext)

  const renderContent = () => {
    if (navTabSelected === 'formScreen') return null
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

  return renderContent()
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
