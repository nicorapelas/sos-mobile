import React, { useState, useContext, useEffect, useRef } from 'react'
import {
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native'

import { Context as MenuContext } from '../../../context/MenuContext'

const Menu = () => {
  const heightAnim = useRef(new Animated.Value(0)).current

  const {
    state: { menuExpanded },
  } = useContext(MenuContext)

  // Get screen dimensions
  const screenWidth = Dimensions.get('window').width
  const screenHeight = Dimensions.get('window').height

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: menuExpanded ? screenHeight * 0.3 : 0, // 30% of screen height
      duration: 500,
      useNativeDriver: false,
    }).start()
  }, [menuExpanded, heightAnim])

  return (
    <Animated.View style={styles.container}>
      <Animated.View
        style={[styles.menu, { height: heightAnim, width: screenWidth * 0.5 }]}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  menu: {
    position: 'absolute',
    backgroundColor: '#ffff',
  },
  button: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
})

export default Menu
