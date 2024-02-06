import React, { useContext } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

import { Context as FormContext } from '../../../../context/FormContext'
import { Context as CommunityContext } from '../../../../context/CommunityContext'

const FormField = ({
  label,
  value,
  onChangeText,
  placeholder,
  ...textInputProps
}) => {
  const { setError: setFormError } = useContext(FormContext)

  const { setError: setCommunityError } = useContext(CommunityContext)

  const resetErrors = () => {
    setFormError('')
    setCommunityError('')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        onFocus={resetErrors}
        onChange={resetErrors}
        {...textInputProps}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
})

export default FormField
