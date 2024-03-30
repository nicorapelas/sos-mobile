import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import CommunityInvite from './CommunityInvite'
import { Context as CommunityContext } from '../../../../context/CommunityContext'
import { Context as UserDataContext } from '../../../../context/UserDataContext'

const CommunitySelectedAdminBar = () => {
  const {
    state: { communitySelectedAdmin },
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
        <CommunityInvite />
      </View>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
})

export default CommunitySelectedAdminBar
