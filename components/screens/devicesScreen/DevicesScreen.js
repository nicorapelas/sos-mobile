import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Menu from '../../commom/menu/Menu'
import PanicButton from './panicButton/PanicButton'

const DevicesScreen = () => {
  const renderContent = () => {
    return (
      <>
        <View style={styles.menuWrapper}>
          <Menu />
        </View>
        <View style={styles.container}>
          <Text>Devices screen</Text>
          <PanicButton />
        </View>
      </>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#bdd7ff',
    zIndex: 1,
  },
  menuWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
})

export default DevicesScreen
