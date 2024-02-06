import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'

import FormField from '../elements/FormField'
import SubmitButton from '../elements/SubmitButton'
import FormError from '../elements/FormError'
import { Context as FormContext } from '../../../../context/FormContext'
import { Context as UserDataContext } from '../../../../context/UserDataContext'
import { normalize } from '../../../../utils/fontUtils'

const InitForm = () => {
  const [name, setName] = useState('')

  const { setError } = useContext(FormContext)

  const { editUser } = useContext(UserDataContext)

  const handleSubmit = () => {
    if (name.length < 1) {
      setError(`The "Name" field is required.`)
      return
    }
    editUser({ username: name })
  }

  const renderContent = () => {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <View style={styles.instructionContainer}>
          <View>
            <Text style={styles.welcome}>Welcome!</Text>
            <Text style={styles.instruction}>What should we call you?</Text>
          </View>
        </View>
        <FormError />
        <FormField
          label="Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />
        <SubmitButton onPress={handleSubmit} title="Submit" />
      </KeyboardAvoidingView>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
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
