import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Menu from '../../commom/menu/Menu'

const ServicesScreen = () => {
  const renderContent = () => {
    return (
      <View style={styles.container}>
        <Menu />
        <Text>Services screen</Text>
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

export default ServicesScreen
