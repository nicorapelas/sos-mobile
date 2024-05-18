import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import { Context as MenuContext } from '../../../context/MenuContext'

const SseTest = () => {
  const {
    state: { menuExpanded, useStaticMenu },
  } = useContext(MenuContext)

  const handlePress = () => {
    // Test SSE
  }

  const sseTrigger = () => {
    return (
      <TouchableOpacity onPress={handlePress}>
        <Text>test</Text>
      </TouchableOpacity>
    )
  }

  const containerStyle = [
    styles.container,
    !menuExpanded && !useStaticMenu ? { zIndex: 10 } : {},
  ]

  const renderContent = () => {
    return <View>{sseTrigger()}</View>
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
})

export default SseTest
