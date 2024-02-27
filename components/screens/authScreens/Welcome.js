import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import LoginPhone from './phone/LoginPhone'
import LoginEmail from './email/LoginEmail'
import { Context as AuthContext } from '../../../context/AuthContext'
import { normalize } from '../../../utils/fontUtils'

const Welcome = () => {
  const {
    state: { loginOption },
    setLoginOption,
  } = useContext(AuthContext)

  const renderOptions = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.instruction}>Sign in using either,</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setLoginOption('email')}
        >
          <Text style={styles.buttonText}>email address</Text>
        </TouchableOpacity>
        <Text>or</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setLoginOption('phone')}
        >
          <Text style={styles.buttonText}>phone number</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderContent = () => {
    if (loginOption === '') {
      return renderOptions()
    } else {
      switch (loginOption) {
        case 'email':
          return <LoginEmail />
        case 'phone':
          return <LoginPhone />
        default:
          break
      }
    }
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#d1d1d1',
    borderRadius: 7,
    margin: 10,
  },
  buttonText: {
    fontSize: normalize(15),
    paddingVertical: 13,
    paddingHorizontal: 20,
  },
  instruction: {
    textAlign: 'center',
    fontSize: normalize(20),
    marginBottom: 10,
  },
})

export default Welcome
