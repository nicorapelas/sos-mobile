import React, { useContext, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { Context as UserDataContext } from '../../../../context/UserDataContext'
import { Context as CommunityContext } from '../../../../context/CommunityContext'
import { Context as MenuContext } from '../../../../context/MenuContext'
import { normalize } from '../../../../utils/fontUtils'

const CommunityMembersList = () => {
  const {
    state: { user },
  } = useContext(UserDataContext)

  const {
    state: { communitySelected, communityMembersList },
    fetchCommunityMembersList,
  } = useContext(CommunityContext)

  const {
    state: { menuExpanded, useStaticMenu },
  } = useContext(MenuContext)

  useEffect(() => {
    if (communitySelected) {
      fetchCommunityMembersList(communitySelected)
    }
  }, [communitySelected])

  const containerStyle = [
    styles.container,
    !menuExpanded && !useStaticMenu ? { zIndex: 10 } : {},
  ]

  const renderContent = () => {
    return (
      <View style={containerStyle}>
        <Text>Members</Text>
      </View>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
  },
})

export default CommunityMembersList
