import React, { useContext, useEffect } from 'react'
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native'

import { Context as UserDataContext } from '../../../../context/UserDataContext'
import { Context as AuthContext } from '../../../../context/AuthContext'
import { normalize } from '../../../../utils/fontUtils'
import LoginError from '../LoginError'
import LoginStatus from '../LoginStatus'

const LoginEmail = () => {
  const {
    state: { userEmailAddress },
    setUserEmailAddress,
  } = useContext(UserDataContext)

  const {
    state: { error, status, redirectToLogin },
    emailSignin,
    setRedirectToLogin,
    setLoginOption,
  } = useContext(AuthContext)

  useEffect(() => {
    if (redirectToLogin) {
      setUserEmailAddress(null)
      setRedirectToLogin(false)
    }
  }, [redirectToLogin])

  const handleSubmit = () => {
    emailSignin({ email: userEmailAddress })
  }

  const renderForm = () => {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <View style={styles.backButtonContainer}>
          <TouchableOpacity onPress={() => setLoginOption('')}>
            <Text style={styles.backButtonText}>back</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Email login</Text>
        <TextInput
          style={styles.input}
          value={userEmailAddress}
          onChangeText={setUserEmailAddress}
          keyboardType="email-address"
          placeholder="Enter email address"
          autoCapitalize="none"
        />
        <Button title="Submit" onPress={handleSubmit} />
      </KeyboardAvoidingView>
    )
  }

  const renderContent = () => {
    if (error) return <LoginError />
    if (status) return <LoginStatus />
    return renderForm()
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
  backButtonContainer: {
    width: '100%',
    marginBottom: 30,
  },
  backButtonText: {
    fontSize: normalize(16),
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 7,
    padding: 10,
    marginTop: 10,
    width: '80%',
    textAlign: 'center',
  },
  title: {
    fontSize: normalize(20),
    marginBottom: 20,
  },
})

export default LoginEmail
