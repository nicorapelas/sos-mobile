import { useContext, useEffect } from 'react'

import { Context as UserDataContext } from '../../context/UserDataContext'
import { Context as NavContext } from '../../context/NavContext'
import { Context as FormContext } from '../../context/FormContext'
import { Context as CommunityContext } from '../../context/CommunityContext'

const DataDrvRedirecting = () => {
  const {
    state: { user },
  } = useContext(UserDataContext)

  const { setNavTabSelected } = useContext(NavContext)

  const { setFormSelected } = useContext(FormContext)

  const {
    state: { success: communitySuccess },
    setSuccess: setSuccessCommunity,
  } = useContext(CommunityContext)

  useEffect(() => {
    if (user) {
      const { username } = user
      if (username === '') {
        setFormSelected('initForm')
        setNavTabSelected('formScreen')
        return
      } else {
        setFormSelected('')
        // HERE: Start intro tour
        setNavTabSelected('devices')
      }
    }
  }, [user])

  useEffect(() => {
    if (communitySuccess === 'communityCreatedSuccefully') {
      setFormSelected('')
      setNavTabSelected('communities')
      setSuccessCommunity('')
    }
  }, [communitySuccess])

  useEffect(() => {
    console.log(`communitySuccess:`, communitySuccess)
  }, [communitySuccess])

  return null
}

export default DataDrvRedirecting
