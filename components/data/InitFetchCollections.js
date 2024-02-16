import { useContext, useEffect } from 'react'

import { Context as AuthContext } from '../../context/AuthContext'
import { Context as UserDataContext } from '../../context/UserDataContext'
import { Context as CommunityContext } from '../../context/CommunityContext'

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

  const {
    state: { communitySelected },
    fetchSelectedCommunityAdmin,
    fetchCommunityInvite,
  } = useContext(CommunityContext)

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

  useEffect(() => {
    if (communitySelected) {
      fetchSelectedCommunityAdmin({ adminId: communitySelected.adminId })
      fetchCommunityInvite({ communityId: communitySelected._id })
    }
  }, [communitySelected])

  return null
}

export default InitFetchCollections
