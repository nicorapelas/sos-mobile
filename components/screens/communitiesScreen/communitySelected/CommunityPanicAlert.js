import React, { useState, useContext, useEffect } from 'react'
import {
  View,
  Text,
  Switch,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'

import { Context as CommunityContext } from '../../../../context/CommunityContext'
import { Context as UserDataContext } from '../../../../context/UserDataContext'
import { normalize } from '../../../../utils/fontUtils'

const CommunityPanicAlert = () => {
  const [panicAlert, setPanicAlert] = useState(true)
  const [panicAlertTrigger, setPanicAlertTrigger] = useState(false)

  const {
    state: { memberOptionUpdateLoading, communitySelected },
    setCommunityPanicAlert,
  } = useContext(CommunityContext)

  const {
    state: { user },
  } = useContext(UserDataContext)

  useEffect(() => {
    if (user && communitySelected) {
      const { community } = user
      const { _id } = communitySelected
      let match = community.filter((com) => {
        return com.communityId === _id
      })

      console.log(`match`, match[0].panicAlertUser)
    }
  }, [user, communitySelected])

  useEffect(() => {
    const { _id } = communitySelected
    if (panicAlertTrigger) {
      setCommunityPanicAlert({ communityId: _id, panicAlertUser: panicAlert })
    }
    setPanicAlertTrigger(false)
  }, [panicAlertTrigger, panicAlert, communitySelected])

  const toggleSwitch = () => {
    setPanicAlert((previousState) => !previousState)
    setPanicAlertTrigger(true)
  }

  const iosSwitch = (option) => {
    return (
      <Switch
        style={{
          transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
          marginLeft: 5,
        }}
        trackColor={{ false: '#494949', true: '#10be00' }}
        thumbColor={'#ffff'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={panicAlert}
      />
    )
  }

  const androidSwitch = (option) => {
    if (memberOptionUpdateLoading)
      return (
        <ActivityIndicator
          size="small"
          color="#0000ff"
          style={{
            margin: 14,
          }}
        />
      )
    return (
      <Switch
        style={{
          transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
          marginLeft: 5,
        }}
        trackColor={{ false: '#494949', true: '#10be00' }}
        thumbColor={'#c4c4c2'}
        onValueChange={toggleSwitch}
        value={panicAlert}
      />
    )
  }

  const renderContent = () => {
    return (
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Community panic alert</Text>
          <Text style={styles.note}>
            When disabled, you will not receive notifications if a community
            member triggers a panic alert.
          </Text>
          <View style={styles.switchContainer}>
            {Platform.OS === 'ios' ? iosSwitch('mute') : androidSwitch('mute')}
          </View>
          <Text style={styles.note}>{panicAlert ? 'enabled' : 'disabled'}</Text>
        </View>
      </View>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
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
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  note: {
    textAlign: 'center',
    marginHorizontal: '10%',
  },
})

export default CommunityPanicAlert
