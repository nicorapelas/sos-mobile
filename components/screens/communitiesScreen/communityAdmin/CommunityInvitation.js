import React, { useContext, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Context as CommunityContext } from '../../../../context/CommunityContext'
import { normalize } from '../../../../utils/fontUtils'

const CommunityInvitation = () => {
  const {
    state: { communityInvite },
  } = useContext(CommunityContext)

  const renderContent = () => {
    return (
      <View style={styles.container} onPress={handlePress}>
        <Text style={styles.text}>invitation</Text>
      </View>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: normalize(16),
  },
})

export default CommunityInvitation
