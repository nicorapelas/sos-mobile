import React, { useState, useContext, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'

import { Context as AuthContext } from '../../../context/AuthContext'
import { Context as UserDataContext } from '../../../context/UserDataContext'

const LoginStatus = () => {
  const [newOtpRequestTimeout, setNewOtpRequestTimeout] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  const {
    state: { otpCode, status },
    setOtpCode,
    verifyOtpSms,
    verifyOtpEmail,
    clearStatus,
  } = useContext(AuthContext)

  const {
    state: { userPhoneNumber, userEmailAddress },
  } = useContext(UserDataContext)

  useEffect(() => {
    const timer = setTimeout(() => setNewOtpRequestTimeout(true), 10000)
    return () => clearTimeout(timer)
  }, [])

  const handleOtpSubmit = () => {
    if (otpCode.length !== 6) {
      alert('Invalid verification code')
      return
    }
    switch (status) {
      case 'pending':
        verifyOtpSms({ phoneNumber: userPhoneNumber, otpCode: otpCode })
        clearStatus()
        setOtpCode('')
        break
      case 'emailOtpSent':
        verifyOtpEmail({ email: userEmailAddress, otpCode: otpCode })
        clearStatus()
        setOtpCode('')
        break
      default:
        break
    }
  }

  const handleNoOtpPress = () => {
    clearStatus()
    setOtpCode('')
  }

  const noOtp = () => {
    if (!newOtpRequestTimeout || otpCode.length > 0) return null
    return (
      <View>
        <Text style={styles.text}>Didn't receive an OTP?</Text>
        <TouchableOpacity onPress={() => setShowMessage(true)}>
          <Text style={styles.button}>Click here.</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const noOtpMessage = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          The OTP request via SMS is currently unavailable. Please try again
          later, or request an OTP via email address
        </Text>
        <TouchableOpacity onPress={handleNoOtpPress}>
          <Text style={styles.button}>OK</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderStatus = () => {
    if (showMessage) {
      return noOtpMessage()
    }
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Text style={styles.text}>
          OTP sent successfully, please enter your verification code
        </Text>
        <TextInput
          style={styles.input}
          value={otpCode}
          onChangeText={setOtpCode}
          keyboardType="phone-pad"
          placeholder="Verification code"
        />
        <Button title="Submit" onPress={handleOtpSubmit} />
        {noOtp()}
      </KeyboardAvoidingView>
    )
  }

  return renderStatus()
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
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 7,
    padding: 10,
    marginTop: 10,
    width: '80%',
    textAlign: 'center',
  },
  button: {
    color: '#0000EE',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
  },
})

export default LoginStatus
