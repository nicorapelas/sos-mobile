import createDataContext from './createDataContext'

// Reducer
const NotificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { ...state, notification: action.payload }
    default:
      return state
  }
}

// Actions
const setNotification = (dispatch) => (data) => {
  dispatch({ type: 'SET_NOTIFICATION', payload: data })
}

export const { Provider, Context } = createDataContext(
  NotificationReducer,
  {
    setNotification,
  },
  {
    notification: '',
  }
)
