import React, { useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { Context as NavContext } from '../../../context/NavContext'
import { Context as MenuContext } from '../../../context/MenuContext'
import { normalize } from '../../../utils/fontUtils'

const NotificationsNavLink = () => {
  const {
    state: { navTabSelected },
    setNavTabSelected,
  } = useContext(NavContext)

  const {
    state: { menuExpanded },
    setUseStaticMenu,
  } = useContext(MenuContext)

  const handlePress = () => {
    setNavTabSelected('notifications')
    if (menuExpanded) {
      setUseStaticMenu(true)
    }
  }

  const renderLoader = () => {
    return (
      <TouchableOpacity style={styles.container} onPress={handlePress}>
        <MaterialIcons
          style={
            navTabSelected === 'notifications' ? styles.iconActive : styles.icon
          }
          name="message"
        />
        <Text
          style={
            navTabSelected === 'notifications' ? styles.textActive : styles.text
          }
        >
          Notifications
        </Text>
      </TouchableOpacity>
    )
  }

  return renderLoader()
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  icon: {
    color: '#c4c4c2',
    fontSize: normalize(21),
    textAlign: 'center',
  },
  text: {
    color: '#c4c4c2',
    textAlign: 'center',
    fontSize: normalize(10),
  },
  iconActive: {
    color: 'black',
    fontSize: normalize(21),
    textAlign: 'center',
  },
  textActive: {
    color: 'black',
    textAlign: 'center',
    fontSize: normalize(10),
  },
})

export default NotificationsNavLink
