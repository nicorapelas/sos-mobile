import React, { useState, useContext, useEffect } from 'react'
import { devKeys } from '../../../config/devKeys'

const SocketConnect = () => {
  const [ws, setWs] = useState(null)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const websocket = new WebSocket(`wss://${devKeys.ngrokUri.slice(8)}`)
    websocket.onmessage = (e) => {
      setMessages((prev) => [...prev, e.data])
    }
    websocket.onerror = (e) => {
      console.error(e.message)
    }
    websocket.onclose = (e) => {
      console.log('WebSocket closed', e.reason)
    }
    setWs(websocket)
    return () => {
      websocket.close()
    }
  }, [])

  return null
}

export default SocketConnect
