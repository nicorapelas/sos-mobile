import createDataContext from './createDataContext'

// Reducer
const PanicReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PANIC_DATA_RECEIVE':
      return { ...state, panicDataReceived: action.payload }
    case 'SET_PANIC_DATA_SENT':
      return { ...state, panicDataSent: action.payload }
    default:
      return state
  }
}

// Actions
const setPanicDataReceived = (dispatch) => (data) => {
  dispatch({ type: 'SET_PANIC_DATA_RECEIVE', payload: data })
}

const setPanicDataSent = (dispatch) => (data) => {
  dispatch({ type: 'SET_PANIC_DATA_SENT', payload: data })
}

export const { Provider, Context } = createDataContext(
  PanicReducer,
  {
    setPanicDataReceived,
    setPanicDataSent,
  },
  {
    panicDataReceived: null,
    panicDataSent: null,
  }
)
