import React, { useState, useContext, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'

import { Context as AppContext } from './context/AppContext'
import { Context as AuthContext } from './context/AuthContext'
import IpData from './components/data/IpData'
import AppLoadingCheck from './components/commom/loader/AppLoadingCheck'
import Loader from './components/commom/loader/Loader'
import Login from './components/screens/authScreens/login/Login'
import MainScreen from './components/screens/main/MainScreen'

export default function AppScreens() {
  const [triggerRedirectToLogin, setTriggerRedirectToLogin] = useState(false)

  const {
    state: { appLoading },
  } = useContext(AppContext)

  const {
    state: { tokenValid, redirectToLogin },
    tokenValidation,
  } = useContext(AuthContext)

  useEffect(() => {
    tokenValidation()
  }, [])

  useEffect(() => {
    if (redirectToLogin) setTriggerRedirectToLogin(true)
  }, [redirectToLogin])

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
    if (triggerRedirectToLogin) {
      return <Login />
    }
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
