import React, { useState, useContext, useEffect } from 'react'
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'

import HeaderBackButton from './HeaderBackButton'
import HeaderMenuButton from './HeaderMenuButton'
import HeaderUsername from './HeaderUsername'
import { Context as NavContext } from '../../../context/NavContext'
import { Context as FormContext } from '../../../context/FormContext'

const Header = () => {
  const [returnTab, setReturnTab] = useState('')
  const [formLabel, setFormLabel] = useState('')

  const {
    state: { navTabSelected },
    setNavTabSelected,
  } = useContext(NavContext)

  const {
    state: { formSelected },
    setFormSelected,
  } = useContext(FormContext)

  useEffect(() => {
    switch (formSelected) {
      case 'createCommunityForm':
        setFormLabel('CREATE COMMUNITY')
        setReturnTab('communities')
        break
      case 'joinCommunityForm':
        setFormLabel('JOIN COMMUNITY')
        setReturnTab('communities')
      default:
        break
    }
  }, [formSelected])

  const handleCancel = () => {
    setNavTabSelected(returnTab)
    setFormLabel('')
    setFormSelected('')
  }

  const renderCancelButton = () => {
    return (
      <View style={styles.cancelButton}>
        {navTabSelected !== 'formScreen' ? null : (
          <TouchableOpacity onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
    )
  }

  const renderLabel = () => {
    return (
      <View style={styles.labelBedA}>
        <View style={styles.labelBedB}>
          {navTabSelected !== 'formScreen' ? null : (
            <Text style={styles.formLabel}>{formLabel}</Text>
          )}
        </View>
      </View>
    )
  }

  const renderContent = () => {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <HeaderBackButton />
          <HeaderUsername />
          {renderCancelButton()}
          {renderLabel()}
          <HeaderMenuButton />
        </View>
      </View>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
    flex: 8,
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
  },
  cancelButton: {
    flex: 1,
    justifyContent: 'center',
  },
  cancelButtonText: {
    paddingLeft: 5,
  },
  labelBedA: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  labelBedB: {
    justifyContent: 'center',
  },
})

export default Header
