import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'

import FormField from '../elements/FormField'
import SubmitButton from '../elements/SubmitButton'
import FormError from '../elements/FormError'
import { Context as FormContext } from '../../../../context/FormContext'
import { Context as CommunityContext } from '../../../../context/CommunityContext'
import { normalize } from '../../../../utils/fontUtils'

const JoinCommunityForm = () => {
  const [pin, setPin] = useState('')

  const { setError } = useContext(FormContext)

  const { joinCommunity } = useContext(CommunityContext)

  const handleSubmit = () => {
    if (pin.length < 1) {
      setError(`The "Pin" field is required.`)
      return
    }
    joinCommunity({ pin })
  }

  const renderContent = () => {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <FormError />
        <View style={styles.instructionContainer}>
          <View>
            <Text style={styles.instruction}>Join a community</Text>
          </View>
        </View>
        <FormField
          label="Joining pin"
          value={pin}
          onChangeText={(text) => setPin(text.substring(0, 20))}
          placeholder="Enter community pin"
        />
        <SubmitButton onPress={handleSubmit} title="Submit" />
      </KeyboardAvoidingView>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
    flex: 1,
    marginTop: '20%',
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

export default JoinCommunityForm
