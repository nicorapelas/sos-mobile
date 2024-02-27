import React, { useContext } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

import { Context as AuthContext } from '../../../context/AuthContext'

const LoginError = () => {
  const {
    state: { error },
    clearError,
    setOtpCode,
  } = useContext(AuthContext)

  const handleClearError = () => {
    clearError()
    setOtpCode('')
  }

  const renderError = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{error}</Text>
        <Button title="Close message" onPress={handleClearError} />
      </View>
    )
  }

  return renderError()
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
  },
})

export default LoginError
