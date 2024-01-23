import React, { useContext, useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { Context as AuthContext } from '../../../context/AuthContext'
import { Context as MenuContext } from '../../../context/MenuContext'

const MenuItems = () => {
  const {
    state: { menuExpanded, useStaticMenu },
  } = useContext(MenuContext)

  const { signout } = useContext(AuthContext)

  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    if (useStaticMenu) {
      setShowContent(true)
    } else {
      setShowContent(false)
      if (menuExpanded) {
        const timer = setTimeout(() => setShowContent(true), 500)
        return () => clearTimeout(timer)
      }
    }
  }, [useStaticMenu, menuExpanded])

  const handleSignout = () => {
    signout()
  }

  const renderContent = () => {
    if (!showContent) return null
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>MENU</Text>
        <TouchableOpacity onPress={handleSignout}>
          <Text style={styles.text}>Signout</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {},
  heading: {
    fontWeight: '900',
    marginVertical: 10,
    textAlign: 'center',
  },
  text: {
    color: 'black',
    textAlign: 'center',
  },
})

export default MenuItems
