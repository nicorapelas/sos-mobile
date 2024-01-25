import axios from 'axios'

import ngrokApi from '../api/ngrokApi'
import createDataContext from './createDataContext'

// Reducer
const FormReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true }
    case 'ADD_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'CLEAR_ERROR':
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
      type: 'ADD_ERROR',
      payload: error,
    })
  }
}

const addError = (dispatch) => () => {
  dispatch({ type: 'ADD_ERROR', payload: null })
}

const clearError = (dispatch) => () => {
  dispatch({ type: 'CLEAR_ERROR', payload: null })
}

const setFormSelected = (dispatch) => (data) => {
  dispatch({ type: 'SET_FORM_SELECTED', payload: data })
}

export const { Provider, Context } = createDataContext(
  FormReducer,
  {
    addError,
    clearError,
    setFormSelected,
  },
  {
    loading: false,
    error: null,
    formSelected: null,
  }
)
