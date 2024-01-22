import { useContext, useEffect } from 'react'

import { Context as AppContext } from '../../../context/AppContext'
import { Context as UserDataContext } from '../../../context/UserDataContext'
import { Context as AuthContext } from '../../../context/AuthContext'

const AppLoadingCheck = () => {
  const { setAppLoading } = useContext(AppContext)

  const {
    state: { loading: userDataLoading },
  } = useContext(UserDataContext)

  const {
    state: { loading: authLoading },
  } = useContext(AuthContext)

  useEffect(() => {
    if (userDataLoading || authLoading) {
      setAppLoading(true)
    }
  }, [userDataLoading, authLoading])

  useEffect(() => {
    if (!userDataLoading && !authLoading) {
      setAppLoading(false)
    }
  }, [userDataLoading, authLoading])

  return null
}

export default AppLoadingCheck
