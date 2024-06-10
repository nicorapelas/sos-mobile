import createDataContext from './createDataContext'
import ngrokApi from '../api/ngrokApi'

// Reducer
const NotificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION_RECEIVED':
      return { ...state, notificationReceived: action.payload }
    case 'CREATE_NOTIFICATION':
      return { ...state, notificationSent: action.payload }
    default:
      return state
  }
}

// Actions
const setNotificationReceived = (dispatch) => (data) => {
  dispatch({ type: 'SET_NOTIFICATION_RECEIVED', payload: data })
}

const createNotification = (dispatch) => async (data) => {
  try {
    const response = await ngrokApi.post('/notification/create', data)
    console.log(`response`, response.data)
    dispatch({ type: 'CREATE_NOTIFICATION', payload: data })
    return
  } catch (error) {
    dispatch({
      type: 'SET_ERROR',
      payload: error,
    })
  }
}

export const { Provider, Context } = createDataContext(
  NotificationReducer,
  {
    setNotificationReceived,
    createNotification,
  },
  {
    notificationReceived: [],
    notificationSent: [],
  }
)
