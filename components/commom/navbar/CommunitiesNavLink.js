import React, { useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import { Context as NavContext } from '../../../context/NavContext'
import { normalize } from '../../../utils/fontUtils'

const CommunitiesNavLink = () => {
  const {
    state: { navTabSelected },
    setNavTebSelected,
  } = useContext(NavContext)

  const handlePress = () => {
    setNavTebSelected('communities')
  }

  const renderContent = () => {
    return (
      <TouchableOpacity style={styles.container} onPress={handlePress}>
        <FontAwesome
          style={
            navTabSelected === 'communities' ? styles.iconActive : styles.icon
          }
          name="group"
        />
        <Text
          style={
            navTabSelected === 'communities' ? styles.textActive : styles.text
          }
        >
          Communities
        </Text>
      </TouchableOpacity>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  icon: {
    color: '#c4c4c2',
    fontSize: normalize(21),
    textAlign: 'center',
  },
  text: {
    color: '#c4c4c2',
    textAlign: 'center',
    fontSize: normalize(10),
  },
  iconActive: {
    color: 'black',
    fontSize: normalize(21),
    textAlign: 'center',
  },
  textActive: {
    color: 'black',
    textAlign: 'center',
    fontSize: normalize(10),
  },
})

export default CommunitiesNavLink
