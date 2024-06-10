import { useState, useContext, useEffect } from 'react'
import io from 'socket.io-client'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Context as SocketContext } from '../../context/SocketContext'
import { Context as PanicContext } from '../../context/PanicContext'
import { Context as NotificationContext } from '../../context/NotificationContext'
import { devKeys } from '../../config/devKeys'

const SocketIo = () => {
  const [socket, setSocket] = useState(null)

  const {
    state: { socketData, socketConnectStatus },
    setSocketConnectStatus,
    setSocketData,
  } = useContext(SocketContext)

  const {
    state: { panicDataSent },
    setPanicDataReceived,
    setPanicDataSent,
  } = useContext(PanicContext)

  const {
    state: { notificationSent },
    setNotificationReceived,
    createNotification,
  } = useContext(NotificationContext)

  useEffect(() => {
    console.log(`socketConnectStatus:`, socketConnectStatus)
  }, [socketConnectStatus])

  useEffect(() => {
    const initializeSocket = async () => {
      try {
        const token = await AsyncStorage.getItem('token')
        if (!token) {
          console.error('No token found')
          return
        }

        const newSocket = io(devKeys.ngrokUri, {
          extraHeaders: {
            authorization: `Bearer ${token}`, // Pass the JWT token here
          },
          reconnection: true,
          reconnectionAttempts: Infinity,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          randomizationFactor: 0.5,
        })

        setSocket(newSocket)
      } catch (error) {
        console.error('Error initializing socket:', error)
      }
    }

    initializeSocket()

    return () => {
      if (socket) {
        socket.disconnect()
      }
    }
  }, [])

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        setSocketConnectStatus('Connected')
        console.log('Connected to Socket.IO server')
        // Listen for messages
        socket.on('message', (data) => {
          setSocketData(data)
        })
      })

      socket.on('disconnect', () => {
        setSocketConnectStatus('Disconnected')
        console.log('Disconnected from Socket.IO server')
      })

      socket.on('reconnect_attempt', () => {
        setSocketConnectStatus('Reconnecting...')
        console.log('Attempting to reconnect...')
      })

      socket.on('reconnect', (attemptNumber) => {
        setSocketConnectStatus('Connected')
        console.log(
          'Reconnected to Socket.IO server after',
          attemptNumber,
          'attempts'
        )
      })

      socket.on('reconnect_error', (error) => {
        console.error('Reconnect error:', error)
      })

      socket.on('reconnect_failed', () => {
        setSocketConnectStatus('Failed to reconnect')
        console.error('Failed to reconnect to Socket.IO server')
      })

      return () => {
        socket.off('connect')
        socket.off('disconnect')
        socket.off('reconnect_attempt')
        socket.off('reconnect')
        socket.off('reconnect_error')
        socket.off('reconnect_failed')
        socket.off('message')
      }
    }
  }, [socket])

  useEffect(() => {
    if (socketData) {
      console.log(`socketData`, socketData)
      const { event } = socketData
      switch (event) {
        case 'panic':
          console.log(`user panic`)
          setPanicDataReceived(socketData)
          setSocketData(null)
          break
        case 'membersNotification': // Notification Received
          setNotificationReceived(socketData)
          setSocketData(null)
          break
        default:
          break
      }
    }
  }, [socketData])

  useEffect(() => {
    console.log(`panicDataSent:`, panicDataSent)
    if (panicDataSent) {
      if (socket) {
        socket.emit('message', panicDataSent)
      } else {
        console.error('Socket is not initialized')
      }
      setPanicDataSent(null)
    }
  }, [panicDataSent])

  useEffect(() => {
    console.log(`notificationSent:`, notificationSent)
    if (notificationSent) {
      if (socket) {
        socket.emit('message', notificationSent)
      } else {
        console.error('Socket is not initialized')
      }
      setPanicDataSent(null)
    }
  }, [notificationSent])

  return null
}

export default SocketIo
