import React, { useContext, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'

import Header from '../../commom/header/Header'
import Navbar from '../../commom/navbar/NavBar'
import MainContentRender from './MainContentRender'

import { Context as UserDataContext } from '../../../context/UserDataContext'
import { Context as NavContext } from '../../../context/NavContext'
import { Context as FormContext } from '../../../context/FormContext'

const MainScreen = () => {
  const {
    state: { user },
  } = useContext(UserDataContext)

  const { setNavTabSelected } = useContext(NavContext)

  const { setFormSelected } = useContext(FormContext)

  useEffect(() => {
    if (user) {
      const { username } = user
      if (username === '') {
        setFormSelected('initForm')
        setNavTabSelected('formScreen')
        return
      } else {
        setFormSelected('')
        // HERE: Start intro tour
        setNavTabSelected('devices')
      }
    }
  }, [user])

  const renderContent = () => {
    return (
      <View style={styles.container}>
        <Header />
        <MainContentRender />
        <Navbar />
      </View>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    flex: 80,
    flexDirection: 'column',
    justifyContent: 'center',
  },
})

export default MainScreen
