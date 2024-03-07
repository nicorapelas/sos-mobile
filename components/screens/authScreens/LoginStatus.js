import React, { useContext } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'

import { Context as AuthContext } from '../../../context/AuthContext'
import { Context as UserDataContext } from '../../../context/UserDataContext'

const LoginStatus = () => {
  const {
    state: { otpCode, status },
    setOtpCode,
    verifyOtpSms,
    clearStatus,
  } = useContext(AuthContext)

  const {
    state: { userPhoneNumber },
  } = useContext(UserDataContext)

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
        console.log(`hello world...!`)
        clearStatus()
        setOtpCode('')
        break
      default:
        break
    }
  }

  const renderStatus = () => {
    return (
      <View style={styles.container}>
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
      </View>
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
})

export default LoginStatus
