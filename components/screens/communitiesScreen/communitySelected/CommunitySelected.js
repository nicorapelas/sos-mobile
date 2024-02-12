import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { Context as CommunityContext } from '../../../../context/CommunityContext'

const CommunitySelected = () => {
  const {
    state: { communitySelected, communitySelectedAdmin },
  } = useContext(CommunityContext)

  const renderContent = () => {
    // if (!communitySelected || !communitySelectedAdmin) return null
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Commmunity selected screen</Text>
      </View>
    )
  }

  renderContent()
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'yellow',
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 7,
  },
  text: {
    color: 'blue',
    fontSize: 80,
  },
})

export default CommunitySelected
