import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import moment from 'moment'

import CommunitySelectedAdminBar from '../communityAdmin/CommunitySelectedAdimBar'
import CommunityInvitation from '../communityAdmin/CommunityInvitation'
import CommunityMembersList from '../communityMemberList/CommunityMembersList'
import { Context as CommunityContext } from '../../../../context/CommunityContext'
import { normalize } from '../../../../utils/fontUtils'

const CommunitySelected = () => {
  const [initListCount, setInitListCount] = useState(0)

  const {
    state: {
      communitySelected,
      communitySelectedAdmin,
      showInvite,
      inviteCreatedSuccessfully,
      communityMembersList,
      membersListShow,
    },
    setShowInvite,
    fetchCommunityMembersList,
    setMembersListShow,
  } = useContext(CommunityContext)

  useEffect(() => {
    if (inviteCreatedSuccessfully) {
      setShowInvite(true)
      return () => setShowInvite
    }
  }, [inviteCreatedSuccessfully])

  useEffect(() => {
    if (initListCount < 1) {
      if (communitySelected) {
        fetchCommunityMembersList(communitySelected)
        setInitListCount(1)
      }
    }
  }, [initListCount, communitySelected])

  const renderContent = () => {
    if (showInvite) return <CommunityInvitation />
    if (membersListShow) return <CommunityMembersList />
    return (
      <View style={styles.container}>
        <CommunitySelectedAdminBar />
        <View style={styles.avatar}>
          <FontAwesome style={styles.avatarPlaceHolder} name="group" />
        </View>
        <View style={styles.row}>
          <View>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.text}>{communitySelected.name}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View>
            <Text style={styles.label}>Admin</Text>
            <Text style={styles.text}>{communitySelectedAdmin.username}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View>
            <Text style={styles.label}>Created</Text>
            <Text style={styles.text}>
              {moment(communitySelected.date).format('YYYY-MM-DD')}{' '}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.label}>Number of members</Text>
          {communityMembersList.length < 1 ? null : (
            <View>
              <Text style={styles.text}>{communityMembersList.length}</Text>
              <TouchableOpacity
                style={styles.viewMembersButton}
                onPress={() => setMembersListShow(true)}
              >
                <Text style={styles.text}>View members</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#c4c4c2',
    borderBottomWidth: 1,
    borderBottomColor: '#c4c4c2',
  },
  avatarPlaceHolder: {
    color: '#c4c4c2',
    fontSize: normalize(65),
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#c4c4c2',
    marginTop: 20,
    paddingBottom: 20,
  },
  label: {
    color: '#c4c4c2',
    fontWeight: '700',
    fontSize: normalize(15),
    marginBottom: 7,
    textAlign: 'center',
  },
  text: {
    fontSize: normalize(14),
    textAlign: 'center',
    marginHorizontal: 15,
  },
  label: {
    color: '#c4c4c2',
    fontWeight: '700',
    fontSize: normalize(15),
    marginBottom: 7,
    textAlign: 'center',
    marginTop: 20,
  },
  viewMembersButton: {
    marginTop: 10,
  },
})

export default CommunitySelected
