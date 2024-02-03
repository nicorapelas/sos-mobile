import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { Context as NavContext } from '../../../../context/NavContext'
import { Context as FormContext } from '../../../../context/FormContext'
import { normalize } from '../../../../utils/fontUtils'

const CreateCommunityButton = () => {
  const { setNavTabSelected } = useContext(NavContext)

  const { setFormSelected } = useContext(FormContext)

  const handleClick = () => {
    setFormSelected('createCommunityForm')
    setNavTabSelected('formScreen')
  }

  const button = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onClick={handleClick}>
          <Text style={styles.text}>+ Create new community</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return button()
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  button: {
    width: '90%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 30,
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontSize: normalize(16),
    fontWeight: '600',
    padding: 15,
  },
})

export default CreateCommunityButton
