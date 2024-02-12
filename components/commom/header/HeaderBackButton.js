import React, { useContext } from 'react'
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import { Context as CommunityContext } from '../../../context/CommunityContext'
import { normalize } from '../../../utils/fontUtils'

const HeaderBackButton = () => {
  const {
    state: { communitySelected },
    setCommunitySelected,
  } = useContext(CommunityContext)

  const handleBackButtonPress = () => {
    setCommunitySelected(null)
  }

  const renderBackButton = () => {
    if (!communitySelected) return null
    return (
      <TouchableOpacity
        style={styles.backButon}
        onPress={handleBackButtonPress}
      >
        <View style={styles.backIconContainer}>
          <FontAwesome name="angle-left" style={styles.backIcon} />
        </View>
        <View style={styles.backTextContainer}>
          <Text style={styles.backText}>Back</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return renderBackButton()
}

const styles = StyleSheet.create({
  backButon: {
    flexDirection: 'row',
  },
  backIconContainer: {
    justifyContent: 'center',
  },
  backIcon: {
    color: 'black',
    fontSize: normalize(30),
    paddingLeft: 5,
  },
  backTextContainer: {
    justifyContent: 'center',
    marginLeft: 6,
  },
  backText: {
    color: 'black',
    fontSize: normalize(13),
    fontWeight: '600',
    paddingLeft: 5,
  },
})

export default HeaderBackButton
