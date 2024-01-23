import React, { useContext, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'

import Header from '../../commom/header/Header'
import Navbar from '../../commom/navbar/NavBar'
import MainContentRender from './MainContentRender'

import { Context as UserDataContext } from '../../../context/UserDataContext'

const MainScreen = () => {
  const {
    state: { user },
    fetchUser,
  } = useContext(UserDataContext)

  useEffect(() => {
    fetchUser()
  }, [])

  useEffect(() => {
    console.log(`user`.user)
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
    backgroundColor: 'pink',
    flex: 80,
    flexDirection: 'column',
    justifyContent: 'center',
  },
})

export default MainScreen
