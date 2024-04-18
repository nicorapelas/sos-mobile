import React, { useContext, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'

import CommunityRefresh from '../communitySelected/CommunityRefresh'
import CommunityInvite from './CommunityInvite'
import { Context as CommunityContext } from '../../../../context/CommunityContext'
import { Context as UserDataContext } from '../../../../context/UserDataContext'

const CommunitySelectedAdminBar = () => {
  const {
    state: { communitySelectedAdmin, communitySelected },
  } = useContext(CommunityContext)

  const {
    state: { user, isAdmin },
    setIsAdmin,
  } = useContext(UserDataContext)

  useEffect(() => {
    let check = communitySelectedAdmin.filter((admin) => {
      return admin._id === user._id
    })
    if (check.length > 0) {
      setIsAdmin(true)
    } else {
      setIsAdmin(false)
    }
  }, [communitySelectedAdmin, user])

  const renderContent = () => {
    if (!isAdmin) return null
    return (
      <View style={styles.container}>
        <CommunityRefresh />
        <CommunityInvite />
      </View>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export default CommunitySelectedAdminBar
