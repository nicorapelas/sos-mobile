import { useContext, useEffect } from 'react'

import { Context as UserDataContext } from '../../context/UserDataContext'

const IpData = () => {
  const {
    state: { userIpData },
    fetchUserIpData,
    setUserCountryIpData,
  } = useContext(UserDataContext)

  useEffect(() => {
    fetchUserIpData()
    return () => fetchUserIpData
  }, [])

  useEffect(() => {
    if (userIpData) {
      setUserCountryIpData(userIpData.country)
    }
  }, [userIpData])

  return null
}

export default IpData
