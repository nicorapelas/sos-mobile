import React, { useState, useContext, useEffect } from 'react'
import {
  View,
  FlatList,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import { Context as UserDataContext } from '../../../../context/UserDataContext'
import { Context as CommunityContext } from '../../../../context/CommunityContext'
import { Context as MenuContext } from '../../../../context/MenuContext'
import { normalize } from '../../../../utils/fontUtils'

const CommunityMemberDetail = () => {
  const [initValuesSetDone, setInitValuesSetDone] = useState(false)

  const [mute, setMute] = useState(false)
  const [memberAdmin, setMemberAdmin] = useState(false)

  const {
    state: { memberDetailSelected, communitySelected },
    setMemberAdminStatus,
  } = useContext(CommunityContext)

  const {
    state: { menuExpanded, useStaticMenu },
  } = useContext(MenuContext)

  useEffect(() => {
    if (!initValuesSetDone) {
      let check = memberDetailSelected[0].community.filter((community) => {
        return community.communityId === communitySelected._id
      })
      if (check.length > 0) {
        const { isAdmin } = check[0]
        setMemberAdmin(isAdmin)
      }
      setInitValuesSetDone(true)
    }
  }, [communitySelected, memberDetailSelected])

  useEffect(() => {
    if (initValuesSetDone) {
      setMemberAdminStatus({ memberAdmin })
    }
  }, [initValuesSetDone, memberAdmin])

  const containerStyle = [
    styles.container,
    !menuExpanded && !useStaticMenu ? { zIndex: 10 } : {},
  ]

  //   memberDetailSelected: [
  //     {
  //       __v: 0,
  //       _id: '65eb1dfdef52f5cd78396c23',
  //       avatar: '',
  //       community: [[Object]],
  //       created: '2024-03-08T14:17:33.633Z',
  //       emailAddress: 'nicorapelas@gmail.com',
  //       emailAddressVerified: true,
  //       phoneNumberVerified: false,
  //       termsAndConditionsAccepted: false,
  //       username: 'Bob Smith',
  //     },
  //   ]

  const toggleMakeAdmin = () =>
    setMemberAdmin((previousState) => !previousState)
  const toggleMute = () => setMute((previousState) => !previousState)

  const renderContent = () => {
    const { username } = memberDetailSelected[0]
    return (
      <View style={containerStyle}>
        <Text style={styles.label}>{username}</Text>
        <FontAwesome name="user-circle" style={styles.avatarPlaceHolder} />
        <View style={styles.optionsContainerRow}>
          <View style={styles.optionsContainerColumn}>
            <View style={styles.optionRow}>
              <Text style={styles.optionText}>Mute</Text>
              <Switch
                style={{
                  transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
                  marginLeft: 5,
                }}
                trackColor={{ false: '#494949', true: '#10be00' }}
                thumbColor={memberAdmin ? '#ffff' : '#ffff'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleMute}
                value={mute}
              />
            </View>
            <View style={styles.optionRow}>
              <Text style={styles.optionText}>Admin</Text>
              <Switch
                style={{
                  transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
                  marginLeft: 5,
                }}
                trackColor={{ false: '#494949', true: '#10be00' }}
                thumbColor={memberAdmin ? '#ffff' : '#ffff'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleMakeAdmin}
                value={memberAdmin}
              />
            </View>
          </View>
        </View>
      </View>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {},
  label: {
    color: '#c4c4c2',
    fontWeight: '700',
    fontSize: normalize(20),
    marginBottom: 7,
    textAlign: 'center',
    marginTop: 20,
  },
  avatarPlaceHolder: {
    color: '#c4c4c2',
    fontSize: normalize(80),
    textAlign: 'center',
    margin: 15,
  },
  optionsContainerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  optionsContainerColumn: {},
  optionRow: {
    width: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  optionText: {
    fontSize: normalize(17),
    alignSelf: 'center',
  },
})

export default CommunityMemberDetail
