import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { normalize } from '../../../utils/fontUtils'

const CreateCommunity = () => {
  const CreateButton = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>+ Create new community</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderContent = () => {
    return CreateButton()
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  button: {
    width: '90%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 30,
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontSize: normalize(16),
    fontWeight: '600',
    padding: 15,
  },
})

export default CreateCommunity
