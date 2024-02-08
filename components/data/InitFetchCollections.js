import { useContext, useEffect } from 'react'

import { Context as AuthContext } from '../../context/AuthContext'
import { Context as UserDataContext } from '../../context/UserDataContext'

const InitFetchCollections = () => {
  const {
    state: { tokenValid },
  } = useContext(AuthContext)

  const {
    state: { userIpData },
    fetchUserIpData,
    setUserCountryIpData,
    fetchUser,
  } = useContext(UserDataContext)

  useEffect(() => {
    fetchUserIpData()
    return () => fetchUserIpData
  }, [])

  useEffect(() => {
    if (tokenValid) {
      fetchUser()
      return () => fetchUser
    }
  }, [tokenValid])

  useEffect(() => {
    if (userIpData) {
      setUserCountryIpData(userIpData.country)
    }
  }, [userIpData])

  return null
}

export default InitFetchCollections
