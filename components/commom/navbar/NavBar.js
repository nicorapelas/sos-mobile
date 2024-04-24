import React, { useContext } from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import { useKeyboard } from '@react-native-community/hooks'

import DevicesNavLink from './DevicesNavLink'
import CommunitiesNavLink from './CommunitiesNavLink'
import ServicesNavLink from './ServicesNavLink'
import NotificationsNavLink from './NotificationsNavLink'
import { Context as NavContext } from '../../../context/NavContext'
import { Context as CommunityContext } from '../../../context/CommunityContext'

const Navbar = () => {
  const {
    state: { navTabSelected },
  } = useContext(NavContext)

  const {
    state: { communitySelected },
  } = useContext(CommunityContext)

  const keyboard = useKeyboard()

  const renderContent = () => {
    if (
      navTabSelected === 'formScreen' ||
      communitySelected ||
      (keyboard.keyboardShown && Platform !== 'ios')
    )
      return null
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
