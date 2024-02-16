import React, { useContext, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import moment from 'moment'

import { Context as CommunityContext } from '../../../../context/CommunityContext'
import { normalize } from '../../../../utils/fontUtils'

const CommunityInvitation = () => {
  const {
    state: { communityInvite },
    setShowInvite,
    setInviteCreatedSuccessfully,
  } = useContext(CommunityContext)

  const handlePressClose = () => {
    setInviteCreatedSuccessfully(false)
    setShowInvite(false)
  }

  const handlePressShare = () => {
    console.log(`share`)
  }

  const renderContent = () => {
    return (
      <View style={styles.containerY}>
        <View style={styles.containerX}>
          <View style={styles.closeContainer}>
            <TouchableOpacity onPress={handlePressClose}>
              <MaterialCommunityIcons name="close" style={styles.closeIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.label}>Joining pin</Text>
            <Text style={styles.text}>{communityInvite.pin}</Text>
            <Text style={styles.label}>Date created</Text>
            <Text style={styles.text}>
              {moment(communityInvite.date).format('YYYY-MM-DD')}
            </Text>
          </View>
          <View style={styles.shareContainer}>
            <TouchableOpacity
              onPress={handlePressShare}
              style={styles.shareButton}
            >
              <Text style={styles.shareText}>Share</Text>
              <MaterialCommunityIcons
                name="share-variant"
                style={styles.shareIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  containerY: {
    flex: 1,
    justifyContent: 'center',
  },
  containerX: {
    height: '70%',
    marginHorizontal: '10%',
    borderColor: '#5e5e5e',
    borderWidth: 1,
    borderRadius: 15,
  },
  closeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
    marginRight: 5,
  },
  closeIcon: {
    borderColor: '#5e5e5e',
    fontSize: normalize(25),
  },
  label: {
    color: '#c4c4c2',
    fontWeight: '700',
    fontSize: normalize(15),
    marginBottom: 7,
    textAlign: 'center',
  },
  textContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  text: {
    fontSize: normalize(14),
    textAlign: 'center',
    marginHorizontal: 15,
    marginBottom: 10,
  },
  shareContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  shareButton: {
    flexDirection: 'row',
    borderColor: '#5e5e5e',
  },
  shareText: {
    fontSize: normalize(15),
  },
  shareIcon: {
    fontSize: normalize(20),
  },
})

export default CommunityInvitation
