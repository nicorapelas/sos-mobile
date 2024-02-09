import React, { useState, useContext, useEffect } from 'react'
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { Context as MenuContext } from '../../../context/MenuContext'
import { Context as NavContext } from '../../../context/NavContext'
import { Context as FormContext } from '../../../context/FormContext'
import { Context as CommunityContext } from '../../../context/CommunityContext'

const Header = () => {
  const [returnTab, setReturnTab] = useState('')
  const [formLabel, setFormLabel] = useState('')

  const {
    state: { menuExpanded, useStaticMenu },
    setMenuExpanded,
    setUseStaticMenu,
  } = useContext(MenuContext)

  const {
    state: { navTabSelected },
    setNavTabSelected,
  } = useContext(NavContext)

  const {
    state: { formSelected },
    setFormSelected,
  } = useContext(FormContext)

  const {
    state: { communitySelected },
  } = useContext(CommunityContext)

  useEffect(() => {
    switch (formSelected) {
      case 'createCommunityForm':
        setFormLabel('CREATE COMMUNITY')
        setReturnTab('communities')
        break
      default:
        break
    }
  }, [formSelected])

  const toggleMenu = () => {
    if (useStaticMenu) {
      setUseStaticMenu(false)
      setMenuExpanded(false)
      return
    }
    setMenuExpanded(!menuExpanded)
  }

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

  const renderMenuButton = () => {
    return (
      <View style={styles.menuButton}>
        {navTabSelected === 'formScreen' ? null : (
          <TouchableOpacity onPress={toggleMenu}>
            <MaterialIcons style={styles.menuIcon} name="menu" />
          </TouchableOpacity>
        )}
      </View>
    )
  }

  const renderContent = () => {
    if (communitySelected) return null
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          {renderCancelButton()}
          {renderLabel()}
          {renderMenuButton()}
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
  menuButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  menuIcon: {
    color: 'black',
    fontSize: 32,
    paddingRight: 5,
  },
  labelBedA: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  labelBedB: {
    justifyContent: 'center',
  },
  formLabel: {
    fontWeight: '700',
  },
})

export default Header
