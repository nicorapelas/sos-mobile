import React, { useContext, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { Context as UserDataContext } from '../../../context/UserDataContext'

const HeaderUsername = () => {
  const {
    state: { user },
  } = useContext(UserDataContext)

  const renderContent = () => {
    return (
      <View style={styles.container}>
        <Text>Hi, </Text>
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
