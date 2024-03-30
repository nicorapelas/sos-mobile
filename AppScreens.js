import React, { useState, useContext, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'

import { Context as AppContext } from './context/AppContext'
import { Context as AuthContext } from './context/AuthContext'
import InitFetchCollections from './components/data/InitFetchCollections'
import DataDrvRedirecting from './components/data/DataDrvRedirecting'
import AppLoadingCheck from './components/commom/loader/AppLoadingCheck'
import Loader from './components/commom/loader/Loader'
import Welcome from './components/screens/authScreens/Welcome'
import MainScreen from './components/screens/main/MainScreen'

export default function AppScreens() {
  const [triggerRedirectToLogin, setTriggerRedirectToLogin] = useState(false)

  const {
    state: { appLoading },
  } = useContext(AppContext)

  const {
    state: { tokenValid, redirectToLogin },
    tokenValidation,
    setRedirectToLogin,
  } = useContext(AuthContext)

  useEffect(() => {
    tokenValidation()
  }, [])

  useEffect(() => {
    if (redirectToLogin) {
      setTriggerRedirectToLogin(true)
      setRedirectToLogin(false)
    }
  }, [redirectToLogin])

  useEffect(() => {
    console.log(`tokenValid:`, tokenValid)
    console.log(`triggerRedirectToLogin:`, triggerRedirectToLogin)
  }, [tokenValid, triggerRedirectToLogin])

  const invalidTokenScreenSelector = () => {
    return (
      <>
        <Welcome />
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
      return <Welcome />
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
      <InitFetchCollections />
      <DataDrvRedirecting />
      <AppLoadingCheck />
      {renderContent()}
    </>
  )
}
