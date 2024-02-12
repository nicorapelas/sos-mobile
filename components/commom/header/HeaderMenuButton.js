import React, { useContext } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { Context as MenuContext } from '../../../context/MenuContext'
import { Context as NavContext } from '../../../context/NavContext'
import { Context as CommunityContext } from '../../../context/CommunityContext'
import { normalize } from '../../../utils/fontUtils'

const HeaderMenuButton = () => {
  const {
    state: { menuExpanded, useStaticMenu },
    setMenuExpanded,
    setUseStaticMenu,
  } = useContext(MenuContext)

  const {
    state: { navTabSelected },
  } = useContext(NavContext)

  const {
    state: { communitySelected },
  } = useContext(CommunityContext)

  const toggleMenu = () => {
    if (useStaticMenu) {
      setUseStaticMenu(false)
      setMenuExpanded(false)
      return
    }
    setMenuExpanded(!menuExpanded)
  }

  const renderMenuButton = () => {
    return (
      <View style={styles.menuButton}>
        {navTabSelected === 'formScreen' || communitySelected ? null : (
          <TouchableOpacity onPress={toggleMenu}>
            <MaterialIcons style={styles.menuIcon} name="menu" />
          </TouchableOpacity>
        )}
      </View>
    )
  }

  return renderMenuButton()
}

const styles = StyleSheet.create({
  menuButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  menuIcon: {
    color: 'black',
    fontSize: normalize(30),
    paddingRight: 5,
  },
})

export default HeaderMenuButton
