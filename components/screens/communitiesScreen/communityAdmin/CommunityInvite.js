import React, { useContext, useEffect } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { Context as CommunityContext } from '../../../../context/CommunityContext'
import { Context as UserContext } from '../../../../context/UserDataContext'
import { normalize } from '../../../../utils/fontUtils'

const CommunityInvite = () => {
  const {
    state: { communitySelected, retry, communityInvite },
    setShowInvite,
    createCommunityInvite,
    setRetry,
  } = useContext(CommunityContext)

  const {
    state: { user },
  } = useContext(UserContext)

  useEffect(() => {
    if (retry) {
      createCommunityInvite({
        communityId: communitySelected._id,
        name: communitySelected.name,
      })
      setRetry(false)
      return () => createCommunityInvite
    }
  }, [retry, communitySelected])

  const handlePress = () => {
    if (communityInvite) {
      setShowInvite(true)
    } else {
      createCommunityInvite({
        communityId: communitySelected._id,
        name: communitySelected.name,
        adminId: user._id,
      })
    }
  }

  const renderContent = () => {
    return (
      <TouchableOpacity style={styles.container} onPress={handlePress}>
        <Text style={styles.text}>Invite</Text>
        <MaterialIcons name="share" style={styles.icon} />
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
    fontSize: normalize(16),
    alignSelf: 'flex-end',
  },
  icon: {
    fontSize: normalize(15),
    alignSelf: 'flex-end',
    marginLeft: 5,
  },
})

export default CommunityInvite
