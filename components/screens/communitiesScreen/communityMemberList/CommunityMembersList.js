import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import { Context as UserDataContext } from '../../../../context/UserDataContext'
import { Context as CommunityContext } from '../../../../context/CommunityContext'
import { Context as MenuContext } from '../../../../context/MenuContext'
import { normalize } from '../../../../utils/fontUtils'

const CommunityMembersList = () => {
  const [initListCount, setInitListCount] = useState(0)

  const {
    state: { user },
  } = useContext(UserDataContext)

  const {
    state: { communitySelected },
    fetchCommunityMembersList,
  } = useContext(CommunityContext)

  const {
    state: { menuExpanded, useStaticMenu },
  } = useContext(MenuContext)

  useEffect(() => {
    console.log(`hell world`, initListCount)
    if (initListCount < 1) {
      if (communitySelected) {
        fetchCommunityMembersList(communitySelected)
        setInitListCount(1)
      }
    }
  }, [initListCount, communitySelected])

  useEffect(() => {
    console.log(communityMembersList)
  }, [communityMembersList])

  const communityMembersList = [
    {
      __v: 0,
      _id: '65c24805053a655e8eda8f0a',
      avatar: '',
      community: [[Object], [Object], [Object], [Object]],
      created: '2024-02-06T14:53:57.895Z',
      emailAddressVerified: false,
      phoneNumber: '+27 82 758 8788',
      phoneNumberVerified: true,
      termsAndConditionsAccepted: false,
      username: 'Nico',
    },
    {
      __v: 0,
      _id: '65eb1dfdef52f5cd78396c23',
      avatar: '',
      community: [[Object]],
      created: '2024-03-08T14:17:33.633Z',
      emailAddress: 'nicorapelas@gmail.com',
      emailAddressVerified: true,
      phoneNumberVerified: false,
      termsAndConditionsAccepted: false,
      username: 'Bob Smith',
    },
    {
      __v: 0,
      _id: '65eb2dfdef52f5cd78396c23',
      avatar: '',
      community: [[Object]],
      created: '2024-03-08T14:17:33.633Z',
      emailAddress: 'bill@gmail.com',
      emailAddressVerified: true,
      phoneNumberVerified: false,
      termsAndConditionsAccepted: false,
      username: 'Bill Knox',
    },
    {
      __v: 0,
      _id: '65eb2dfdef52f5cd78395c23',
      avatar: '',
      community: [[Object]],
      created: '2024-03-08T14:17:33.633Z',
      emailAddress: 'fred@gmail.com',
      emailAddressVerified: true,
      phoneNumberVerified: false,
      termsAndConditionsAccepted: false,
      username: 'Fred Peters',
    },
    {
      __v: 0,
      _id: '65eb3dfdef52f5cd78396c23',
      avatar: '',
      community: [[Object]],
      created: '2024-03-08T14:17:33.633Z',
      emailAddress: 'kevin@gmail.com',
      emailAddressVerified: true,
      phoneNumberVerified: false,
      termsAndConditionsAccepted: false,
      username: 'Kevin Owen',
    },
    {
      __v: 0,
      _id: '65eb3dfdef62f5cd78396c23',
      avatar: '',
      community: [[Object]],
      created: '2024-03-08T14:17:33.633Z',
      emailAddress: 'jeff@gmail.com',
      emailAddressVerified: true,
      phoneNumberVerified: false,
      termsAndConditionsAccepted: false,
      username: 'Jeff Pestana',
    },
    {
      __v: 0,
      _id: '65eb3dfdef62f5cd88396c23',
      avatar: '',
      community: [[Object]],
      created: '2024-03-08T14:17:33.633Z',
      emailAddress: 'nikki@gmail.com',
      emailAddressVerified: true,
      phoneNumberVerified: false,
      termsAndConditionsAccepted: false,
      username: 'Nikki Soufis',
    },
    {
      __v: 0,
      _id: '65eb3dfdef62f5cd73396c23',
      avatar: '',
      community: [[Object]],
      created: '2024-03-08T14:17:33.633Z',
      emailAddress: 'viki@gmail.com',
      emailAddressVerified: true,
      phoneNumberVerified: false,
      termsAndConditionsAccepted: false,
      username: 'Viki Rapelas',
    },
    {
      __v: 0,
      _id: '65lb3dfdef62f5cd78396c23',
      avatar: '',
      community: [[Object]],
      created: '2024-03-08T14:17:33.633Z',
      emailAddress: 'sam@gmail.com',
      emailAddressVerified: true,
      phoneNumberVerified: false,
      termsAndConditionsAccepted: false,
      username: 'Sam Pam',
    },
    {
      __v: 0,
      _id: '65eb3dfdef62f5cc78396c23',
      avatar: '',
      community: [[Object]],
      created: '2024-03-08T14:17:33.633Z',
      emailAddress: 'dino@gmail.com',
      emailAddressVerified: true,
      phoneNumberVerified: false,
      termsAndConditionsAccepted: false,
      username: 'Dino Rapelas',
    },
    {
      __v: 0,
      _id: '65eb3dfeef62f5cc78396c23',
      avatar: '',
      community: [[Object]],
      created: '2024-03-08T14:17:33.633Z',
      emailAddress: 'tino@gmail.com',
      emailAddressVerified: true,
      phoneNumberVerified: false,
      termsAndConditionsAccepted: false,
      username: 'Tino Papadopolous',
    },
    {
      __v: 0,
      _id: '77eb3dfdef62f5cc78396c23',
      avatar: '',
      community: [[Object]],
      created: '2024-03-08T14:17:33.633Z',
      emailAddress: 'bill@gmail.com',
      emailAddressVerified: true,
      phoneNumberVerified: false,
      termsAndConditionsAccepted: false,
      username: 'Bill Murry',
    },
    {
      __v: 0,
      _id: '65eb3dfdef11f5cc78396c23',
      avatar: '',
      community: [[Object]],
      created: '2024-03-08T14:17:33.633Z',
      emailAddress: 'droll@gmail.com',
      emailAddressVerified: true,
      phoneNumberVerified: false,
      termsAndConditionsAccepted: false,
      username: 'Paul Droll',
    },
    {
      __v: 0,
      _id: '65eb3dfdef62pocc78396c23',
      avatar: '',
      community: [[Object]],
      created: '2024-03-08T14:17:33.633Z',
      emailAddress: 'guy@gmail.com',
      emailAddressVerified: true,
      phoneNumberVerified: false,
      termsAndConditionsAccepted: false,
      username: 'Some Guy',
    },
  ]

  const containerStyle = [
    styles.container,
    !menuExpanded && !useStaticMenu ? { zIndex: 10 } : {},
  ]

  const renderList = () => {
    if (!communityMembersList || communityMembersList.length < 1) return null
    return communityMembersList.map((member) => {
      return (
        <View key={member._id} style={styles.listRow}>
          <FontAwesome name="user-circle" style={styles.avatarPlaceHolder} />
          <Text style={styles.userNameText}>{member.username}</Text>
        </View>
      )
    })
  }

  const renderContent = () => {
    return (
      <View style={containerStyle}>
        <View>
          <Text style={styles.label}>Members</Text>
          <View>{renderList()}</View>
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
  },
  label: {
    color: '#c4c4c2',
    fontWeight: '700',
    fontSize: normalize(15),
    marginBottom: 7,
    textAlign: 'center',
    marginTop: 20,
  },
  listRow: {
    flexDirection: 'row',
    margin: 5,
  },
  avatarPlaceHolder: {
    color: '#c4c4c2',
    fontSize: normalize(20),
  },
  userNameText: {
    justifyContent: 'center',
    fontSize: normalize(13),
    paddingTop: 3,
    marginLeft: 7,
  },
})

export default CommunityMembersList
