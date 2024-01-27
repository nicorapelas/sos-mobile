import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { Context as FormContext } from '../../../../context/FormContext'
import { normalize } from '../../../../utils/fontUtils'

const FormError = () => {
  const {
    state: { error },
  } = useContext(FormContext)

  const renderError = () => {
    if (error === '') return null
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{error}</Text>
      </View>
    )
  }

  return renderError()
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    width: '95%',
    alignSelf: 'center',
    marginTop: 15,
  },
  text: {
    color: '#ffff',
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: normalize(16),
  },
})

export default FormError
