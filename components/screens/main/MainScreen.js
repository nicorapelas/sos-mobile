import React, { useContext, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'

import Header from '../../commom/header/Header'
import Navbar from '../../commom/navbar/NavBar'
import MainContentRender from './MainContentRender'

import { Context as UserDataContext } from '../../../context/UserDataContext'
import { Context as FormContext } from '../../../context/FormContext'

const MainScreen = () => {
  const {} = useContext(UserDataContext)

  const {
    state: { formSelected },
  } = useContext(FormContext)

  const renderContent = () => {
    return (
      <View style={styles.container}>
        {formSelected === 'initForm' ? null : <Header />}
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
