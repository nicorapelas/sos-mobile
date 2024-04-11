import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { Context as UserDataContext } from '../../../context/UserDataContext'
import { Context as FormContext } from '../../../context/FormContext'
import { Context as CommunityContext } from '../../../context/CommunityContext'

const HeaderUsername = () => {
  const {
    state: { user },
  } = useContext(UserDataContext)

  const {
    state: { formSelected },
  } = useContext(FormContext)

  const {
    state: { communitySelected },
  } = useContext(CommunityContext)

  const renderContent = () => {
    if (!user || formSelected !== '' || communitySelected) {
      return null
    }
    return (
      <View style={styles.container}>
        <Text>Hi, {user.username}</Text>
      </View>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginLeft: 10,
  },
})

export default HeaderUsername
