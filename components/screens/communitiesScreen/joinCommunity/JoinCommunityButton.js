import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { Context as NavContext } from '../../../../context/NavContext'
import { Context as FormContext } from '../../../../context/FormContext'
import { Context as MenuContext } from '../../../../context/MenuContext'
import { normalize } from '../../../../utils/fontUtils'

const JoinCommunityButton = () => {
  const { setNavTabSelected } = useContext(NavContext)

  const { setFormSelected } = useContext(FormContext)

  const {
    state: { menuExpanded, useStaticMenu },
  } = useContext(MenuContext)

  const handleClick = () => {
    setFormSelected('joinCommunityForm')
    setNavTabSelected('formScreen')
  }

  const containerStyle = [
    styles.container,
    !menuExpanded && !useStaticMenu ? { zIndex: 10 } : {},
  ]

  const button = () => {
    return (
      <View style={containerStyle}>
        <TouchableOpacity style={styles.button} onPress={handleClick}>
          <Feather name="link" style={styles.icon} />
          <Text style={styles.text}>Join a community</Text>
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
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '90%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 30,
  },
  icon: {
    color: 'black',
    fontSize: normalize(16),
    alignSelf: 'center',
    marginRight: 5,
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontSize: normalize(16),
    fontWeight: '600',
    paddingVertical: 15,
  },
})

export default JoinCommunityButton