import createDataContext from './createDataContext'

// Reducer
const AppReducer = (state, action) => {
  switch (action.type) {
    case 'SET_APP_LOADING':
      return { ...state, appLoading: action.payload }
    case 'SET_USER':
      return { ...state, user: action.payload }
    default:
      return state
  }
}

// Actions
const setAppLoading = (dispatch) => (data) => {
  dispatch({ type: 'SET_APP_LOADING', payload: data })
}

export const { Provider, Context } = createDataContext(
  AppReducer,
  {
    setAppLoading,
  },
  {
    appLoading: false,
    user: null,
  }
)
