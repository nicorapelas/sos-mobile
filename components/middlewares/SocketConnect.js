import React, { useState, useContext, useEffect } from 'react'

import { Context as SocketContext } from '../../context/SocketContext'
import { devKeys } from '../../config/devKeys'

const SocketConnect = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  const {
    state: { ws },
    setWs,
  } = useContext(SocketContext)

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
