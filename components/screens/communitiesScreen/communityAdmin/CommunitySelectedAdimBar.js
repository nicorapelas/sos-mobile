import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import CommunityInvite from './CommunityInvite'
import { Context as CommunityContext } from '../../../../context/CommunityContext'
import { Context as UserDataContext } from '../../../../context/UserDataContext'

const CommunitySelectedAdminBar = () => {
  const [isAdmin, setIsAdmin] = useState(false)

  const {
    state: { communitySelected },
  } = useContext(CommunityContext)

  const {
    state: { user },
  } = useContext(UserDataContext)

  useEffect(() => {
    if (communitySelected.adminId === user._id) {
      setIsAdmin(true)
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
