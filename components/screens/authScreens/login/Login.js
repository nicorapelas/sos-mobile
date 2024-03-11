import React, { useState, useContext, useEffect } from 'react'
import { View, Text, Button, TextInput, StyleSheet } from 'react-native'
import CountryPicker from 'react-native-country-picker-modal'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

import { Context as UserDataContext } from '../../../../context/UserDataContext'
import { Context as AuthContext } from '../../../../context/AuthContext'
import LoginError from './LoginError'
import LoginStatus from './LoginStatus'

const Login = () => {
  const [countryCode, setCountryCode] = useState('')
  const [countryPickerVisible, setCountryPickerVisible] = useState(false)

  const {
    state: { userCountryIpData, userPhoneNumber },
    setUserPhoneNumber,
  } = useContext(UserDataContext)

  const {
    state: { error, status, redirectToLogin },
    requestOtp,
    setRedirectToLogin,
  } = useContext(AuthContext)

  useEffect(() => {
    if (redirectToLogin) {
      setUserPhoneNumber(null)
      setRedirectToLogin(false)
    }
  }, [redirectToLogin])

  useEffect(() => {
    if (userCountryIpData) {
      setCountryCode(userCountryIpData)
    }
  }, [userCountryIpData])

  const handleOtpRequest = () => {
    const phoneNumberObj = parsePhoneNumberFromString(
      userPhoneNumber,
      countryCode
    )
    if (phoneNumberObj?.isValid()) {
      let phoneNum = phoneNumberObj.formatInternational()
      setUserPhoneNumber(phoneNum)
      requestOtp({ phoneNumber: phoneNum })
    } else {
      alert('Invalid phone number')
    }
  }

  const renderForm = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Button
          title="Select Country"
          onPress={() => setCountryPickerVisible(true)}
        />
        <CountryPicker
          withFilter
          withFlag
          withCountryNameButton
          withCallingCode
          withAlphaFilter
          withCallingCodeButton
          countryCode={countryCode}
          onSelect={(country) => {
            setCountryCode(country.cca2)
            setUserPhoneNumber(`+${country.callingCode[0]}`)
          }}
          visible={countryPickerVisible}
        />
        <TextInput
          style={styles.input}
          value={userPhoneNumber}
          onChangeText={setUserPhoneNumber}
          keyboardType="phone-pad"
          placeholder="Enter Phone Number"
        />
        <Button title="Request OTP" onPress={handleOtpRequest} />
      </View>
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
    fontSize: 24,
    marginBottom: 20,
  },
})

export default Login
