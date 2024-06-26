import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'

import { Context as CommunityContext } from '../../../context/CommunityContext'
import Menu from '../../commom/menu/Menu'
import CreateCommunity from './createCommunity/CreateCommunity'
import CommunityList from './communityList/CommunityList'
import CommunitySelected from './communitySelected/CommunitySelected'
import JoinCommunity from './joinCommunity/JoinCommunity'

const CommunitiesScreen = () => {
  const {
    state: { communitySelected, communitySelectedAdmin },
  } = useContext(CommunityContext)

  const renderContent = () => {
    if (communitySelected && communitySelectedAdmin) {
      return <CommunitySelected />
    }
    return (
      <View style={styles.container}>
        <View style={styles.menuWrapper}>
          <Menu />
        </View>
        <CreateCommunity />
        <JoinCommunity />
        <CommunityList />
      </View>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#bdd7ff',
    zIndex: 1,
  },
  menuWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
})

export default CommunitiesScreen
