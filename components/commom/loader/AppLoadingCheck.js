import { useContext, useEffect } from 'react'

import { Context as AppContext } from '../../../context/AppContext'
import { Context as UserDataContext } from '../../../context/UserDataContext'
import { Context as AuthContext } from '../../../context/AuthContext'
import { Context as FormContext } from '../../../context/FormContext'
import { Context as CommunityContext } from '../../../context/CommunityContext'

const AppLoadingCheck = () => {
  const { setAppLoading } = useContext(AppContext)

  const {
    state: { loading: userDataLoading },
  } = useContext(UserDataContext)

  const {
    state: { loading: authLoading },
  } = useContext(AuthContext)

  const {
    state: { loading: formLoading },
  } = useContext(FormContext)

  const {
    state: { loading: communityLoading },
  } = useContext(CommunityContext)

  useEffect(() => {
    if (userDataLoading || authLoading || formLoading || communityLoading) {
      setAppLoading(true)
    }
  }, [userDataLoading, authLoading, formLoading, communityLoading])

  useEffect(() => {
    if (!userDataLoading && !authLoading && !formLoading && !communityLoading) {
      setAppLoading(false)
    }
  }, [userDataLoading, authLoading, formLoading, communityLoading])

  return null
}

export default AppLoadingCheck
