import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'

import Header from '../../commom/header/Header'
import Navbar from '../../commom/navbar/NavBar'
import MainContentRender from './MainContentRender'
import Modal from '../../commom/modal/Modal'

import { Context as FormContext } from '../../../context/FormContext'
import { Context as ModalContext } from '../../../context/ModalContext'

const MainScreen = () => {
  const [showModal, setModalShoe] = useState(false)

  const {
    state: { formSelected },
  } = useContext(FormContext)

  const {
    state: { modalContentSelected },
  } = useContext(ModalContext)

  useEffect(() => {
    modalContentSelected === '' ? setModalShoe(false) : setModalShoe(true)
  }, [modalContentSelected])

  const renderContent = () => {
    if (showModal) return <Modal />
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
