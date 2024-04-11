import React, { useContext, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'

import Header from '../../commom/header/Header'
import Navbar from '../../commom/navbar/NavBar'
import MainContentRender from './MainContentRender'

import { Context as FormContext } from '../../../context/FormContext'
import { Context as ModalContext } from '../../../context/ModalContext'

const MainScreen = () => {
  const {
    state: { formSelected },
  } = useContext(FormContext)

  const {
    state: { modalContentSelected },
  } = useContext(ModalContext)

  useEffect(() => {
    console.log(modalContentSelected)
  }, [modalContentSelected])

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
