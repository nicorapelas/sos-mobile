import React, { useContext, useEffect } from 'react'
import { View, Text } from 'react-native'
import { Context as CommunityContext } from '../../../../context/CommunityContext'

const CommunityList = () => {
  const {
    state: { community },
  } = useContext(CommunityContext)

  useEffect(() => {
    console.log(community)
  }, [community])

  const renderList = () => {
    return (
      <View>
        <Text>Community List</Text>
      </View>
    )
  }

  return renderList()
}

export default CommunityList
