import createDataContext from './createDataContext'

// Reducer
const SocketReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SOCKET_DATA':
      return { ...state, socketData: action.payload }
    default:
      return state
  }
}

// Actions
const setSocketData = (dispatch) => (data) => {
  dispatch({ type: 'SET_SOCKET_DATA', payload: data })
}

export const { Provider, Context } = createDataContext(
  SocketReducer,
  {
    setSocketData,
  },
  {
    socketData: null,
  }
)
