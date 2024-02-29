import React, { useState, useContext, useEffect } from 'react'
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native'
import CountryPicker from 'react-native-country-picker-modal'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

import { Context as UserDataContext } from '../../../../context/UserDataContext'
import { Context as AuthContext } from '../../../../context/AuthContext'
import { normalize } from '../../../../utils/fontUtils'
import LoginError from '../LoginError'
import LoginStatus from '../LoginStatus'

const LoginPhone = () => {
  const [countryCode, setCountryCode] = useState('')
  const [countryPickerVisible, setCountryPickerVisible] = useState(false)

  const {
    state: { userCountryIpData, userPhoneNumber },
    setUserPhoneNumber,
  } = useContext(UserDataContext)

  const {
    state: { error, status, redirectToLogin },
    requestOtpSms,
    setRedirectToLogin,
    setLoginOption,
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
      requestOtpSms({ phoneNumber: phoneNum })
    } else {
      alert('Invalid phone number')
    }
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
        <Text style={styles.title}>Phone login</Text>
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

export default LoginPhone
