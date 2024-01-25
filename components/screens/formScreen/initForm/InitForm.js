import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import FormField from '../FormField'
import { Context as FormContext } from '../../../../context/FormContext'
import { normalize } from '../../../../utils/fontUtils'

const InitForm = () => {
  const [name, setName] = useState('')
  const {
    state: { formSelected },
  } = useContext(FormContext)

  const instruction = () => {
    return (
      <View style={styles.instructionContainer}>
        <View>
          <Text style={styles.welcome}>Welcome!</Text>
          <Text style={styles.instruction}>What should we call you?</Text>
        </View>
      </View>
    )
  }

  const renderContent = () => {
    return (
      <View style={styles.container}>
        {instruction()}
        <FormField
          label="Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />
      </View>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
    flex: 1,
    justifyContent: 'center',
  },
  instructionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  welcome: {
    textAlign: 'center',
    fontSize: normalize(25),
  },
  instruction: {
    textAlign: 'center',
    fontSize: normalize(20),
  },
  text: {
    color: '#c4c4c2',
    textAlign: 'center',
    fontSize: normalize(10),
  },
})

export default InitForm
