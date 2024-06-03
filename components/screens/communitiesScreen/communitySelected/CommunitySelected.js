import React, { useState, useContext, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import moment from 'moment'

import CommunitySelectedAdminBar from '../communityAdmin/CommunitySelectedAdimBar'
import CommunityInvitation from '../communityAdmin/CommunityInvitation'
import CommunityMembersList from '../communityMemberList/CommunityMembersList'
import ExitCommunity from '../exitCommunity/ExitCommunity'
import CommunityRefresh from './CommunityRefresh'
import CommunityPanicAlert from './CommunityPanicAlert'
import { Context as CommunityContext } from '../../../../context/CommunityContext'
import { Context as UserDataContext } from '../../../../context/UserDataContext'
import { normalize } from '../../../../utils/fontUtils'

const CommunitySelected = () => {
  const [initListCount, setInitListCount] = useState(0)

  const {
    state: {
      membersListLoading,
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

  const {
    state: { isAdmin },
  } = useContext(UserDataContext)

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

  const renderNumberOfMembers = () => {
    if (membersListLoading) {
      return <Text style={styles.text}>loading...</Text>
    }
    return (
      <View>
        <Text style={styles.text}>{communityMembersList.length}</Text>
        <TouchableOpacity
          style={styles.viewMembersButton}
          onPress={() => setMembersListShow(true)}
        >
          <Text style={styles.text}>View members</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderList = () => {
    if (!communitySelectedAdmin || communitySelectedAdmin.length < 1) {
      return null
    }
    return communitySelectedAdmin.map((admin) => {
      return (
        <View style={styles.adminListRow} key={admin._id}>
          <FontAwesome style={styles.adminAvatar} name="user-circle" />
          <Text style={styles.text}>{admin.username}</Text>
        </View>
      )
    })
  }

  const renderRefreshComponent = () => {
    return (
      <View style={styles.refreshContainer}>
        <CommunityRefresh />
      </View>
    )
  }

  const renderContent = () => {
    if (showInvite) return <CommunityInvitation />
    if (membersListShow) return <CommunityMembersList />
    return (
      <ScrollView style={styles.container}>
        <CommunitySelectedAdminBar />
        {isAdmin ? null : renderRefreshComponent()}
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
            {renderList()}
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
        <View style={styles.NumOfMemberContainer}>
          <Text style={styles.NumOfMemberLabel}>Number of members</Text>
          {renderNumberOfMembers()}
        </View>
        <CommunityPanicAlert />
        <ExitCommunity />
      </ScrollView>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 25,
  },
  refreshContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
  },
  NumOfMemberLabel: {
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
  adminListRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  adminAvatar: {
    fontSize: normalize(17),
  },
  NumOfMemberContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#c4c4c2',
    paddingBottom: 20,
  },
})

export default CommunitySelected
