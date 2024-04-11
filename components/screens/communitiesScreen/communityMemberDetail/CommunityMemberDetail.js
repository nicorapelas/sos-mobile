import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, Switch } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import { Context as CommunityContext } from '../../../../context/CommunityContext'
import { Context as MenuContext } from '../../../../context/MenuContext'
import { Context as UserDataContext } from '../../../../context/UserDataContext'
import { normalize } from '../../../../utils/fontUtils'

const CommunityMemberDetail = () => {
  const [mute, setMute] = useState(false)
  const [memberAdminTrigger, setMemberAdminTrigger] = useState(false)
  const [memberAdmin, setMemberAdmin] = useState(false)
  const [isLastAdmin, setIsLastAdmin] = useState(false)
  const [isAdminSwitchDisable, setIsAdminSwitchDisables] = useState(false)
  const [muteTrigger, setMuteTrigger] = useState(false)
  const [muteSwitchDisabled, setMuteSwitchDisabled] = useState(false)

  const {
    state: {
      memberOptionUpdateLoading,
      memberDetailSelected,
      communitySelected,
      communitySelectedAdmin,
    },
    setMemberAdminStatus,
    setMuteStatus,
  } = useContext(CommunityContext)

  const {
    state: { menuExpanded, useStaticMenu },
  } = useContext(MenuContext)

  const {
    state: { user },
  } = useContext(UserDataContext)

  useEffect(() => {
    let check = communitySelectedAdmin.filter((admin) => {
      return admin._id === memberDetailSelected[0]._id
    })
    if (check.length > 0) {
      setMemberAdmin(true)
    } else {
      setMemberAdmin(false)
    }
  }, [communitySelectedAdmin, memberDetailSelected])

  useEffect(() => {
    if (communitySelectedAdmin.length === 1) {
      let check = communitySelectedAdmin.filter((admin) => {
        return admin._id === memberDetailSelected[0]._id
      })
      if (check.length > 0) {
        setIsLastAdmin(true)
      } else {
        setIsLastAdmin(false)
      }
    }
  }, [communitySelectedAdmin, memberDetailSelected])

  useEffect(() => {
    if (memberAdminTrigger) {
      setMemberAdminStatus({
        memberAdmin,
        memberId: memberDetailSelected[0]._id,
        communityId: communitySelected._id,
      })
      setMemberAdminTrigger(false)
    }
  }, [memberAdminTrigger, memberAdmin, memberDetailSelected, communitySelected])

  useEffect(() => {
    if (muteTrigger) {
      setMuteStatus({ mute: mute, memberId: memberDetailSelected[0]._id })
    }
    setMuteTrigger(false)
  }, [muteTrigger, mute])

  useEffect(() => {
    setIsAdminSwitchDisables(
      isLastAdmin || memberOptionUpdateLoading ? true : false
    )
    setMuteSwitchDisabled(
      memberAdmin || memberOptionUpdateLoading ? true : false
    )
  }, [isLastAdmin, memberOptionUpdateLoading, memberAdmin])

  const containerStyle = [
    styles.container,
    !menuExpanded && !useStaticMenu ? { zIndex: 10 } : {},
  ]

  const toggleMakeAdmin = () => {
    setMemberAdmin((previousState) => !previousState)
    setMemberAdminTrigger(true)
  }

  const toggleMute = () => {
    setMute((previousState) => !previousState)
    setMuteTrigger(true)
  }

  const renderContent = () => {
    if (!memberDetailSelected || memberDetailSelected.length < 1) return null
    const { username } = memberDetailSelected[0]
    return (
      <View style={containerStyle}>
        <Text style={styles.label}>{username}</Text>
        <FontAwesome name="user-circle" style={styles.avatarPlaceHolder} />
        <View style={styles.optionsContainerRow}>
          <View style={styles.optionsContainerColumn}>
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
                disabled={isAdminSwitchDisable}
              />
            </View>
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
                disabled={muteSwitchDisabled}
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
