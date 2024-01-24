import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { normalize } from '../../../utils/fontUtils'

const FormScreen = () => {
  const renderContent = () => {
    return (
      <View style={styles.container}>
        <Text>Form screen</Text>
      </View>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'yellow',
  },
  icon: {
    color: '#c4c4c2',
    fontSize: normalize(21),
    textAlign: 'center',
  },
  text: {
    color: '#c4c4c2',
    textAlign: 'center',
    fontSize: normalize(10),
  },
})

export default FormScreen
