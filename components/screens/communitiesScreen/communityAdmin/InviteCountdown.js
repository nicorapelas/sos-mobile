import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { Context as CommunityContext } from '../../../../context/CommunityContext'
import { normalize } from '../../../../utils/fontUtils'

const InviteCountdown = () => {
  const {
    state: { communityInvite },
    setInviteTimeRemaining,
  } = useContext(CommunityContext)

  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const inviteDate = new Date(communityInvite.date)
      const expiryDate = new Date(inviteDate.getTime() + 24 * 60 * 60 * 1000)
      const difference = expiryDate - now
      if (difference > 0) {
        let hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
        let minutes = Math.floor((difference / 1000 / 60) % 60)
        let seconds = Math.floor((difference / 1000) % 60)
        hours = hours < 10 ? '0' + hours : hours
        minutes = minutes < 10 ? '0' + minutes : minutes
        seconds = seconds < 10 ? '0' + seconds : seconds
        return `${hours}:${minutes}:${seconds}`
      } else {
        return 'Timeout'
      }
    }
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearInterval(interval)
  }, [communityInvite.date])

  useEffect(() => {
    setInviteTimeRemaining(timeLeft)
  }, [timeLeft])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{timeLeft}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    fontSize: normalize(28),
    fontWeight: '700',
    alignSelf: 'flex-end',
  },
})

export default InviteCountdown
