import React, { useContext } from 'react'
import {
  View,
  FlatList,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import CommunityMemberDetail from '../communityMemberDetail/CommunityMemberDetail'
import { Context as UserDataContext } from '../../../../context/UserDataContext'
import { Context as CommunityContext } from '../../../../context/CommunityContext'
import { Context as MenuContext } from '../../../../context/MenuContext'
import { normalize } from '../../../../utils/fontUtils'

const CommunityMembersList = () => {
  const {
    state: { isAdmin },
  } = useContext(UserDataContext)

  const {
    state: { communityMembersList, memberDetailSelected },
    setMemberDetailSelected,
  } = useContext(CommunityContext)

  const {
    state: { menuExpanded, useStaticMenu },
  } = useContext(MenuContext)

  const containerStyle = [
    styles.container,
    !menuExpanded && !useStaticMenu ? { zIndex: 10 } : {},
  ]

  const handlePressMember = (_id) => {
    if (!isAdmin) {
      return null
    }
    let member = communityMembersList.filter((member) => {
      return member._id === _id
    })
    setMemberDetailSelected(member)
  }

  const renderList = () => {
    if (!communityMembersList || communityMembersList.length < 1) return null
    return (
      <FlatList
        keyExtractor={(communityMembersList) => communityMembersList._id}
        data={communityMembersList}
        renderItem={({ item }) => {
          return (
            <ScrollView>
              <TouchableOpacity
                style={styles.listRow}
                onPress={() => handlePressMember(item._id)}
              >
                <FontAwesome
                  name="user-circle"
                  style={styles.avatarPlaceHolder}
                />
                <Text style={styles.userNameText}>{item.username}</Text>
              </TouchableOpacity>
            </ScrollView>
          )
        }}
      />
    )
  }

  const renderContent = () => {
    if (memberDetailSelected) return <CommunityMemberDetail />
    return (
      <View style={containerStyle}>
        <View>
          <Text style={styles.label}>Members</Text>
          <View style={styles.listContainer}>{renderList()}</View>
        </View>
      </View>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: '90%',
  },
  label: {
    color: '#c4c4c2',
    fontWeight: '700',
    fontSize: normalize(15),
    marginBottom: 7,
    textAlign: 'center',
    marginTop: 20,
  },
  listContainer: {
    height: '95%',
  },
  listRow: {
    flexDirection: 'row',
    margin: 7,
  },
  avatarPlaceHolder: {
    color: '#c4c4c2',
    fontSize: normalize(20),
  },
  userNameText: {
    justifyContent: 'center',
    fontSize: normalize(13),
    paddingTop: 3,
    marginLeft: 10,
  },
})

export default CommunityMembersList
