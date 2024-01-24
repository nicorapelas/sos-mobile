import React, { useState, useContext, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'

import Header from '../../commom/header/Header'
import Navbar from '../../commom/navbar/NavBar'
import MainContentRender from './MainContentRender'

import { Context as UserDataContext } from '../../../context/UserDataContext'
import { Context as NavContext } from '../../../context/NavContext'

const MainScreen = () => {
  const [count, setCount] = useState(0)

  const {
    state: { user, fetchUserCount },
    fetchUser,
    setFetchUserCount,
  } = useContext(UserDataContext)

  const { setNavTabSelected } = useContext(NavContext)

  useEffect(() => {
    if (fetchUserCount < 1) {
      fetchUser()
      setFetchUserCount(1)
    }
  }, [fetchUserCount])

  useEffect(() => {
    if (user) {
      const { username } = user
      if (username === '') {
        setNavTabSelected('formScreen')
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
    backgroundColor: 'pink',
    flex: 80,
    flexDirection: 'column',
    justifyContent: 'center',
  },
})

export default MainScreen
