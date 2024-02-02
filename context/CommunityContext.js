import ngrokApi from '../api/ngrokApi'
import createDataContext from './createDataContext'

// Reducer
const CommunityReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'FETCH_COMMUNITY':
      return { ...state, community: action.payload, loading: false }
    case 'CREATE_COMMUNITY':
      return { ...state, community: action.payload, loading: false }
    default:
      return state
  }
}

// Actions
const fetchCommunity = (dispatch) => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('/community/fetch')
    dispatch({ type: 'FETCH_COMMUNITY', payload: response.data })
  } catch (error) {
    dispatch({
      type: 'SET_ERROR',
      payload: error,
    })
  }
}

const createCommunity = (dispatch) => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post('/community/create')
    console.log(`response:`, response)
    if (response.data.error) {
      dispatch({ type: 'SET_ERROR', payload: response.data.error })
      return
    }
    dispatch({ type: 'CREATE_COMMUNITY', payload: response.data })
    return
  } catch (error) {
    dispatch({
      type: 'SET_ERROR',
      payload: error,
    })
  }
}

const setError = (dispatch) => (error) => {
  dispatch({ type: 'SET_ERROR', payload: error })
}

export const { Provider, Context } = createDataContext(
  CommunityReducer,
  {
    setError,
    fetchCommunity,
    createCommunity,
  },
  {
    loading: false,
    error: '',
    community: [],
  }
)
