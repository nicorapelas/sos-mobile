import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

const FormField = ({
  label,
  value,
  onChangeText,
  placeholder,
  //   ...textInputProps
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        // {...textInputProps}
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
