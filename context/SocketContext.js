import createDataContext from './createDataContext'

// Reducer
const SocketReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WS':
      return { ...state, ws: action.payload }
    case 'SET_SOCKET_DATA':
      return { ...state, socketData: action.payload }
    default:
      return state
  }
}

// Actions
const setWs = (dispatch) => (data) => {
  dispatch({ type: 'SET_WS', payload: data })
}

const setSocketData = (dispatch) => (data) => {
  dispatch({ type: 'SET_SOCKET_DATA', payload: data })
}

export const { Provider, Context } = createDataContext(
  SocketReducer,
  {
    setWs,
    setSocketData,
  },
  {
    ws: null,
    socketData: null,
  }
)
