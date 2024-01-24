import React from 'react'
import { View, StyleSheet } from 'react-native'

import Menu from '../../commom/menu/Menu'
import CreateCommunity from './CreateCommunity'

const CommunitiesScreen = () => {
  const renderContent = () => {
    return (
      <>
        <View style={styles.menuWrapper}>
          <Menu />
        </View>
        <View style={styles.container}>
          <CreateCommunity />
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

export default CommunitiesScreen
