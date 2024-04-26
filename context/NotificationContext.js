import createDataContext from './createDataContext'

// Reducer
const NotificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { ...state, notification: action.payload }
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload }
    default:
      return state
  }
}

// Actions
const setNotification = (dispatch) => (data) => {
  dispatch({ type: 'SET_NOTIFICATION', payload: data })
}

const setMessages = (dispatch) => (data) => {
  dispatch({ type: 'SET_MESSAGES', payload: data })
}

export const { Provider, Context } = createDataContext(
  NotificationReducer,
  {
    setNotification,
    setMessages,
  },
  {
    notification: '',
    messages: [],
  }
)
