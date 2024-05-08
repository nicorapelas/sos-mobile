import EventSource from 'react-native-event-source'

const SSEConnection = (url, onMessage) => {
  const eventSource = new EventSource(url)

  eventSource.addEventListener('message', (event) => {
    const data = JSON.parse(event.data)
    onMessage(data)
  })

  const closeConnection = () => {
    eventSource.close()
  }

  return { closeConnection }
}

export default SSEConnection
