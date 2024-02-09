import React, { useContext, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { Context as CommunityContext } from '../../../../context/CommunityContext'

const CommunitySelected = () => {
  const {
    state: { communitySelected },
  } = useContext(CommunityContext)

  // get admin name
  // get list of members
  // add avatar

  const renderContent = () => {
    if (!communitySelected) return null
    return (
      <View>
        <Text>Commmunity selected screen</Text>
      </View>
    )
  }

  renderContent()
}

export default CommunitySelected
