import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import CommunityInvite from './CommunityInvite'
import { Context as CommunityContext } from '../../../../context/CommunityContext'
import { Context as UserDataContext } from '../../../../context/UserDataContext'

const CommunitySelectedAdminBar = () => {
  const {
    state: { communitySelected },
  } = useContext(CommunityContext)

  const {
    state: { user, isAdmin },
    setIsAdmin,
  } = useContext(UserDataContext)

  useEffect(() => {
    let check = user.community.filter((community) => {
      return community.communityId === communitySelected._id
    })
    if (check.length > 0) {
      const { isAdmin } = check[0]
      setIsAdmin(isAdmin)
    }
  }, [communitySelected, user])

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
