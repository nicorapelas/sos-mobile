import React from 'react'
import { View, StyleSheet } from 'react-native'

import Menu from '../../commom/menu/Menu'
import SseTest from './SseTest'

const DevicesScreen = () => {
  const renderContent = () => {
    return (
      <View style={styles.container}>
        <View style={styles.menuWrapper}>
          <Menu />
        </View>
        <SseTest />
      </View>
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
