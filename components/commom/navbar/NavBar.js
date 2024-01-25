import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import DevicesNavLink from './DevicesNavLink'
import CommunitiesNavLink from './CommunitiesNavLink'
import ServicesNavLink from './ServicesNavLink'
import NotificationsNavLink from './NotificationsNavLink'
import { Context as FormContext } from '../../../context/FormContext'

const Navbar = () => {
  const {
    state: { formSelected },
  } = useContext(FormContext)

  const renderContent = () => {
    if (formSelected === 'initForm') return null
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
