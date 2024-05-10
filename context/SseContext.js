import ngrokApi from '../api/ngrokApi'
import createDataContext from './createDataContext'

// Reducer
const SseReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SSE_RESPONSE_DATA':
      return { ...state, sseResponseData: action.payload }
    default:
      return state
  }
}

// Actions
const triggerPanic = (dispatch) => async () => {
  try {
    const response = await ngrokApi.post('/panic/triggered')
    console.log(`res:`, response.data)
  } catch (error) {
    dispatch({
      type: 'SET_ERROR',
      payload: error,
    })
  }
}

const setSseResponseData = (dispatch) => (data) => {
  dispatch({ type: 'SET_SSE_RESPONSE_DATA', payload: data })
}

export const { Provider, Context } = createDataContext(
  SseReducer,
  {
    triggerPanic,
    setSseResponseData,
  },
  {
    sseResponseData: null,
  }
)
