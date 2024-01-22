import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Menu from '../../commom/menu/Menu'
import CreateCommunity from './CreateCommunity'

const CommunitiesScreen = () => {
  const renderContent = () => {
    return (
      <View style={styles.container}>
        <Menu />
        <CreateCommunity />
      </View>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bdd7ff',
  },
})

export default CommunitiesScreen
