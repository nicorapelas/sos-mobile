import React, { useContext } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { Context as MenuContext } from '../../../context/MenuContext'
import { Context as FormContext } from '../../../context/FormContext'

const Header = () => {
  const {
    state: { menuExpanded, useStaticMenu },
    setMenuExpanded,
    setUseStaticMenu,
  } = useContext(MenuContext)

  const {
    state: { formSelected },
  } = useContext(FormContext)

  const toggleMenu = () => {
    if (useStaticMenu) {
      setUseStaticMenu(false)
      setMenuExpanded(false)
      return
    }
    setMenuExpanded(!menuExpanded)
  }

  const renderContent = () => {
    if (formSelected === 'initForm') return null
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

  return renderContent()
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
