import React, { useContext, useEffect } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { Context as CommunityContext } from '../../../../context/CommunityContext'
import { normalize } from '../../../../utils/fontUtils'

const CommunityRefresh = () => {
  const {
    state: { communitySelected },
    fetchSelectedCommunity,
  } = useContext(CommunityContext)

  const handlePress = () => {
    fetchSelectedCommunity({ id: communitySelected._id })
  }

  const renderContent = () => {
    return (
      <TouchableOpacity style={styles.container} onPress={handlePress}>
        <Text style={styles.text}>Refresh</Text>
        <MaterialIcons name="refresh" style={styles.icon} />
      </TouchableOpacity>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
  },
  text: {
    fontSize: normalize(14),
    alignSelf: 'flex-end',
  },
  icon: {
    fontSize: normalize(15),
    alignSelf: 'flex-end',
    marginLeft: 5,
    marginBottom: 1,
  },
})

export default CommunityRefresh
