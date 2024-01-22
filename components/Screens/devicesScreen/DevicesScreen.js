import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Menu from '../../commom/menu/Menu'

const DevicesScreen = () => {
  const renderContent = () => {
    return (
      <View style={styles.container}>
        <Menu />
        <Text>Devices screen</Text>
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

export default DevicesScreen
