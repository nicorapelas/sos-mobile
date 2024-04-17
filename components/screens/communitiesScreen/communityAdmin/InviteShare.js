import React, { useContext } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  Platform,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { Context as CommunityContext } from '../../../../context/CommunityContext'
import { normalize } from '../../../../utils/fontUtils'

const CommunityInvitation = () => {
  const {
    state: { communityInvite, communitySelected, inviteTimeRemaining },
  } = useContext(CommunityContext)

  const formattedPin = communityInvite.pin
    .toString()
    .match(/.{1,2}/g)
    .join(' ')

  const handlePressShare = async () => {
    const message = `You've been invited to join the ${communitySelected.name} community.\n\n Joining pin: ${formattedPin}.\n\nNote: Pin expires in ${inviteTimeRemaining}.`
    try {
      const result = await Share.share({
        message,
        // Optionally, you can add URL or title here if needed
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with activity type of result.activityType
          return
        } else {
          // Shared
          return
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
        return
      }
    } catch (error) {
      return
    }
  }

  return (
    <View
      style={Platform.OS === 'ios' ? styles.containerIos : styles.container}
    >
      <TouchableOpacity onPress={handlePressShare} style={styles.button}>
        <Text style={styles.text}>Share</Text>
        <MaterialCommunityIcons name="share-variant" style={styles.icon} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  containerIos: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    borderColor: '#5e5e5e',
  },
  text: {
    fontSize: normalize(15),
  },
  icon: {
    fontSize: normalize(20),
  },
})

export default CommunityInvitation
