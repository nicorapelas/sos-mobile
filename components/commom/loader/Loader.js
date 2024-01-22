import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function AppScreens() {
  const renderLoader = () => {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }

  return renderLoader()
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
