import React, { useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { Context as NavContext } from '../../../context/NavContext'
import { Context as MenuContext } from '../../../context/MenuContext'
import { normalize } from '../../../utils/fontUtils'

const ServicesNavLink = () => {
  const {
    state: { navTabSelected },
    setNavTabSelected,
  } = useContext(NavContext)

  const {
    state: { menuExpanded },
    setUseStaticMenu,
  } = useContext(MenuContext)

  const handlePress = () => {
    setNavTabSelected('services')
    if (menuExpanded) {
      setUseStaticMenu(true)
    }
  }

  const renderContent = () => {
    return (
      <TouchableOpacity style={styles.container} onPress={handlePress}>
        <MaterialIcons
          style={
            navTabSelected === 'services' ? styles.iconActive : styles.icon
          }
          name="security"
        />
        <Text
          style={
            navTabSelected === 'services' ? styles.textActive : styles.text
          }
        >
          Services
        </Text>
      </TouchableOpacity>
    )
  }

  return renderContent()
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

export default ServicesNavLink
