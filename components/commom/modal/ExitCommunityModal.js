import React, { useContext } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

import { Context as ModalContext } from '../../../context/ModalContext'
import { Context as CommunityContext } from '../../../context/CommunityContext'
import { normalize } from '../../../utils/fontUtils'

const ExitCommunityModal = () => {
  const { setModalContentSelected } = useContext(ModalContext)

  const {
    state: { communitySelected },
    exitCommunity,
  } = useContext(CommunityContext)

  const handlePressYes = () => {
    exitCommunity({ communityId: communitySelected._id })
  }

  const handlePressCancel = () => {
    setModalContentSelected('')
  }

  const renderContent = () => {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View>
            <View style={styles.messageContainer}>
              <Text style={styles.text}>
                Exit "{communitySelected.name}" community,
              </Text>
              <Text style={styles.text}>Are you sure?</Text>
            </View>
            <TouchableOpacity onPress={handlePressYes}>
              <Text style={styles.button}>yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePressCancel}>
              <Text style={styles.button}>cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  messageContainer: {
    marginBottom: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: normalize(15),
    marginVertical: 7,
  },
  button: {
    textAlign: 'center',
    fontSize: normalize(15),
    marginVertical: 12,
  },
})

export default ExitCommunityModal
