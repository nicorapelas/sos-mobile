import React, { useContext, useEffect, useRef } from 'react'
import { View, StyleSheet, Animated, Dimensions } from 'react-native'

import MenuItems from './MenuItems'
import { Context as MenuContext } from '../../../context/MenuContext'

const Menu = () => {
  const heightAnim = useRef(new Animated.Value(0)).current

  const {
    state: { menuExpanded, useStaticMenu },
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

  const renderContent = () => {
    switch (useStaticMenu) {
      case true:
        return (
          <View style={styles.container}>
            <View style={styles.menuStatic}>
              <MenuItems />
            </View>
          </View>
        )
      case false:
        return (
          <Animated.View style={styles.container}>
            <Animated.View
              style={{
                backgroundColor: '#ffff',
                position: 'absolute',
                height: heightAnim,
                width: screenWidth * 0.5,
                zIndex: 10,
              }}
            >
              <MenuItems />
            </Animated.View>
          </Animated.View>
        )
      default:
        break
    }
  }
  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  menu: {
    backgroundColor: '#ffff',
    position: 'absolute',
  },
  menuStatic: {
    height: Dimensions.get('window').height * 0.3,
    width: Dimensions.get('window').width * 0.5,
    backgroundColor: '#ffff',
    position: 'absolute',
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
