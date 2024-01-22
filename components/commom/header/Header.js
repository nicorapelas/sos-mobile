import React, { useContext } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { Context as MenuContext } from '../../../context/MenuContext'

const Header = () => {
  const {
    state: { menuExpanded },
    setMenuExpanded,
  } = useContext(MenuContext)

  const toggleMenu = () => {
    setMenuExpanded(!menuExpanded)
  }

  const renderLoader = () => {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity onPress={toggleMenu}>
            <MaterialIcons style={styles.icon} name="menu" />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return renderLoader()
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
    flex: 8,
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  icon: {
    color: 'black',
    fontSize: 32,
    paddingRight: 5,
  },
})

export default Header
