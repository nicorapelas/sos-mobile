import { useContext, useEffect } from 'react'

import { Context as AuthContext } from '../../context/AuthContext'
import { Context as UserDataContext } from '../../context/UserDataContext'
import { Context as NavContext } from '../../context/NavContext'
import { Context as FormContext } from '../../context/FormContext'
import { Context as CommunityContext } from '../../context/CommunityContext'
import { Context as ModalContext } from '../../context/ModalContext'

const DataDrvRedirecting = () => {
  const { signout } = useContext(AuthContext)

  const {
    state: { error, user },
  } = useContext(UserDataContext)

  const { setNavTabSelected } = useContext(NavContext)

  const { setFormSelected } = useContext(FormContext)

  const {
    state: { success: communitySuccess },
    setSuccess: setSuccessCommunity,
  } = useContext(CommunityContext)

  const { setModalContentSelected } = useContext(ModalContext)

  useEffect(() => {
    if (error === 'noUserLogedIn') {
      signout()
    }
  }, [error])

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
    if (communitySuccess === 'joinedSuccessfully') {
      setFormSelected('')
      setNavTabSelected('communities')
      setSuccessCommunity('')
    }
    if (communitySuccess === 'successfullyLeft') {
      setNavTabSelected('communities')
      setModalContentSelected('')
      setSuccessCommunity('')
    }
  }, [communitySuccess])

  return null
}

export default DataDrvRedirecting
