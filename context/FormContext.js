import axios from 'axios'

import ngrokApi from '../api/ngrokApi'
import createDataContext from './createDataContext'

// Reducer
const FormReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'SET_FORM_SELECTED':
      return { ...state, formSelected: action.payload }
    default:
      return state
  }
}

// Actions
const fetchUserIpData = (dispatch) => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await axios.get('https://ipapi.co/json/')
    dispatch({ type: 'FETCH_USER_IP_DATA', payload: response.data })
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

const setFormSelected = (dispatch) => (data) => {
  dispatch({ type: 'SET_FORM_SELECTED', payload: data })
}

export const { Provider, Context } = createDataContext(
  FormReducer,
  {
    setError,
    setFormSelected,
  },
  {
    loading: false,
    error: '',
    formSelected: '',
  }
)
