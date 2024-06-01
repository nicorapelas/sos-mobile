import React, { useContext } from 'react'
import { View, Text, Switch, Platform, StyleSheet } from 'react-native'

const CommunityPanicAlert = () => {
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
        onValueChange={option === 'admin' ? toggleMakeAdmin : toggleMute}
        value={option === 'admin' ? memberAdmin : mute}
        disabled={
          option === 'admin' ? isAdminSwitchDisable : muteSwitchDisabled
        }
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
        onValueChange={option === 'admin' ? toggleMakeAdmin : toggleMute}
        value={option === 'admin' ? memberAdmin : mute}
        disabled={
          option === 'admin' ? isAdminSwitchDisable : muteSwitchDisabled
        }
      />
    )
  }

  const renderContent = () => {
    return (
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Community panic alert</Text>
          {Platform.OS === 'ios' ? iosSwitch('mute') : androidSwitch('mute')}
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
})

export default CommunityPanicAlert
