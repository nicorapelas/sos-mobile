import React, { useContext, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'

import { Context as AppContext } from './context/AppContext'
import { Context as AuthContext } from './context/AuthContext'
import IpData from './components/data/IpData'
import AppLoadingCheck from './components/commom/loader/AppLoadingCheck'
import Loader from './components/commom/loader/Loader'
import Login from './components/Screens/authScreens/login/Login'
import MainScreen from './components/Screens/main/MainScreen'

export default function AppScreens() {
  const {
    state: { appLoading },
  } = useContext(AppContext)

  const {
    state: { tokenValid },
    tokenValidation,
    signout,
  } = useContext(AuthContext)

  useEffect(() => {
    // signout()
    tokenValidation()
  }, [])

  const invalidTokenScreenSelector = () => {
    return (
      <>
        <Login />
        <StatusBar style="auto" />
      </>
    )
  }

  const validTokenScreenSelector = () => {
    return (
      <>
        <MainScreen />
        <StatusBar style="auto" />
      </>
    )
  }

  const renderContent = () => {
    if (appLoading) return <Loader />
    switch (tokenValid) {
      case false:
        return invalidTokenScreenSelector()
      case true:
        return validTokenScreenSelector()
      default:
        break
    }
  }

  return (
    <>
      <IpData />
      <AppLoadingCheck />
      {renderContent()}
    </>
  )
}
