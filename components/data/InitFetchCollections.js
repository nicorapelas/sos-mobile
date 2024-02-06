import { useContext, useEffect } from 'react'

import { Context as AuthContext } from '../../context/AuthContext'
import { Context as UserDataContext } from '../../context/UserDataContext'
import { Context as CommunityContext } from '../../context/CommunityContext'

const InitFetchCollections = () => {
  const {
    state: { tokenValid },
  } = useContext(AuthContext)

  const {
    state: { user, userIpData },
    fetchUserIpData,
    setUserCountryIpData,
    fetchUser,
  } = useContext(UserDataContext)

  const {
    state: { community },
    fetchCommunity,
  } = useContext(CommunityContext)

  useEffect(() => {
    fetchUserIpData()
    return () => {
      fetchUserIpData
    }
  }, [])

  useEffect(() => {
    if (tokenValid) {
      fetchUser()
      return () => fetchUser
    }
  }, [tokenValid])

  useEffect(() => {
    if (user) {
      return () => {
        fetchCommunity
      }
    }
    fetchCommunity()
  }, [user])

  useEffect(() => {
    if (userIpData) {
      setUserCountryIpData(userIpData.country)
    }
  }, [userIpData])

  return null
}

export default InitFetchCollections
