import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { Context as FormContext } from '../../../../context/FormContext'
import { Context as CommunityContext } from '../../../../context/CommunityContext'
import { normalize } from '../../../../utils/fontUtils'

const FormError = () => {
  const [errors, setErrors] = useState('')

  const {
    state: { error: formError },
  } = useContext(FormContext)

  const {
    state: { error: communityError },
  } = useContext(CommunityContext)

  useEffect(() => {
    if (formError !== '') setErrors(formError)
    if (communityError !== '') setErrors(communityError)
  }, [formError, communityError])

  useEffect(() => {
    if (formError === '' && communityError === '') {
      setErrors('')
    }
  }, [formError, communityError])

  const renderError = () => {
    if (errors === '') return null
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{errors}</Text>
      </View>
    )
  }

  return renderError()
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    width: '95%',
    alignSelf: 'center',
    marginTop: 15,
  },
  text: {
    color: '#ffff',
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: normalize(16),
  },
})

export default FormError
