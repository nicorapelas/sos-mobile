import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { Context as ModalContext } from '../../../../context/ModalContext'
import { normalize } from '../../../../utils/fontUtils'

const ExitCommunity = () => {
  const { setModalContentSelected } = useContext(ModalContext)

  const handlePress = () => {
    setModalContentSelected('exitCommunity')
  }

  const renderContent = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.text}>Exit community</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },
  text: {
    color: 'red',
    fontSize: normalize(14),
    textAlign: 'center',
    marginHorizontal: 15,
  },
})

export default ExitCommunity
