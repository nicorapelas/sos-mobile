import { useContext, useEffect } from 'react'

import { Context as UserDataContext } from '../../context/UserDataContext'
import { Context as CommunityContext } from '../../context/CommunityContext'

const InitFetchCollections = () => {
  const {
    state: { user, userIpData, fetchUserCount },
    fetchUserIpData,
    setUserCountryIpData,
    fetchUser,
    setFetchUserCount,
  } = useContext(UserDataContext)

  const {
    state: { community },
    fetchCommunity,
  } = useContext(CommunityContext)

  useEffect(() => {
    fetchUserIpData()
    fetchCommunity()
    return () => {
      fetchUserIpData
      fetchCommunity
    }
  }, [])

  useEffect(() => {
    if (userIpData) {
      setUserCountryIpData(userIpData.country)
    }
  }, [userIpData])

  useEffect(() => {
    fetchUser()
    return () => fetchUser
  }, [])

  useEffect(() => {
    console.log('community', community)
  }, [community])

  // useEffect(() => {
  //   if (fetchUserCount < 1) {
  //     fetchUser()
  //     setFetchUserCount(1)
  //   }
  // }, [fetchUserCount])

  return null
}

export default InitFetchCollections
