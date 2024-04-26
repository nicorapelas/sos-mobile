import React from 'react'
import { View, Platform, StyleSheet } from 'react-native'

const KeyboardSpacer = () => {
  if (Platform.OS !== 'ios') return null
  return <View style={styles.container}></View>
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 0,
  },
})

export default KeyboardSpacer
