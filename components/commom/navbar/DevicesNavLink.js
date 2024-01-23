import React, { useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { Context as NavContext } from '../../../context/NavContext'
import { Context as MenuContext } from '../../../context/MenuContext'
import { normalize } from '../../../utils/fontUtils'

const DevicesNavLink = () => {
  const {
    state: { navTabSelected },
    setNavTebSelected,
  } = useContext(NavContext)

  const {
    state: { menuExpanded },
    setUseStaticMenu,
  } = useContext(MenuContext)

  const handlePress = () => {
    setNavTebSelected('devices')
    if (menuExpanded) {
      setUseStaticMenu(true)
    }
  }

  const renderLoader = () => {
    return (
      <TouchableOpacity style={styles.container} onPress={handlePress}>
        <MaterialIcons
          style={navTabSelected === 'devices' ? styles.iconActive : styles.icon}
          name="devices-other"
        />
        <Text
          style={navTabSelected === 'devices' ? styles.textActive : styles.text}
        >
          Devices
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

export default DevicesNavLink
