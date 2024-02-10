import React, { useContext, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import { Context as UserDataContext } from '../../../../context/UserDataContext'
import { Context as CommunityContext } from '../../../../context/CommunityContext'
import { Context as MenuContext } from '../../../../context/MenuContext'
import { normalize } from '../../../../utils/fontUtils'

const CommunityList = () => {
  const {
    state: { user },
  } = useContext(UserDataContext)

  const {
    state: { communityList },
    setCommunityList,
    fetchSelectedCommunity,
  } = useContext(CommunityContext)

  const {
    state: { menuExpanded, useStaticMenu },
  } = useContext(MenuContext)

  useEffect(() => {
    if (user && user.community && user.community.length > 0) {
      const isCommunityAlreadyIncluded = user.community.every((uc) =>
        communityList.includes(uc)
      )
      if (!isCommunityAlreadyIncluded) {
        const updatedCommunityList = [...communityList, ...user.community]
        setCommunityList(updatedCommunityList)
      }
    }
  }, [user])

  const handlePress = (id) => {
    fetchSelectedCommunity(id)
  }

  const containerStyle = [
    styles.container,
    !menuExpanded && !useStaticMenu ? { zIndex: 10 } : {},
  ]

  const renderList = () => {
    if (communityList.length < 1) return null
    return communityList.map((com) => {
      console.log(`com`, com)
      return (
        <TouchableOpacity
          key={com._id}
          style={containerStyle}
          onPress={() => handlePress({ id: com.communityId })}
        >
          <View style={styles.left}>
            <FontAwesome style={styles.avatarPlaceHolder} name="group" />
          </View>
          <View style={styles.middle}>
            <Text style={styles.name}>{com.name}</Text>
          </View>
          <View style={styles.right}>
            <View style={styles.expandButtonBed}>
              <FontAwesome name="angle-right" style={styles.expandButtonIcon} />
            </View>
          </View>
        </TouchableOpacity>
      )
    })
  }

  return renderList()
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 7,
  },
  left: {
    flex: 1,
  },
  avatarPlaceHolder: {
    color: '#c4c4c2',
    fontSize: normalize(47),
  },
  middle: {
    flex: 2,
    justifyContent: 'center',
  },
  name: {
    fontSize: normalize(14),
    fontWeight: '700',
  },
  right: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  expandButtonBed: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 15,
  },
  expandButtonIcon: {
    color: '#c4c4c2',
    fontSize: normalize(20),
  },
})

export default CommunityList
