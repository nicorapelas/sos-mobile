import axios from 'axios'

import ngrokApi from '../api/ngrokApi'
import createDataContext from './createDataContext'

// Reducer
const UserDataReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true }
    case 'FETCH_USER':
      return { ...state, user: action.payload, loading: false }
    case 'FETCH_USER_IP_DATA':
      return { ...state, userIpData: action.payload, loading: false }
    case 'ADD_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'CLEAR_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'ADD_SUCCESS':
      return { ...state, success: action.payload, loading: false }
    case 'CLEAR_SUCCESS':
      return { ...state, success: action.payload, loading: false }
    case 'SET_USER_COUNTRY_IP_DATA':
      return { ...state, userCountryIpData: action.payload }
    case 'SET_USER_PHONE_NUMBER':
      return { ...state, userPhoneNumber: action.payload }
    case 'SET_USER_EMAIL_ADDRESS':
      return { ...state, userEmailAddress: action.payload }
    case 'SET_FETCH_USER_COUNT':
      return { ...state, fetchUserCount: action.payload, loading: false }
    case 'EDIT_USER':
      return { ...state, user: action.payload, loading: false }
    case 'SET_IS_ADMIN':
      return { ...state, isAdmin: action.payload }
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

const clearError = (dispatch) => () => {
  dispatch({ type: 'CLEAR_ERROR', payload: null })
}

const clearSuccess = (dispatch) => () => {
  dispatch({ type: 'CLEAR_SUCCESS', payload: null })
}

setUserCountryIpData = (dispatch) => (data) => {
  dispatch({ type: 'SET_USER_COUNTRY_IP_DATA', payload: data })
}

setUserPhoneNumber = (dispatch) => (data) => {
  dispatch({ type: 'SET_USER_PHONE_NUMBER', payload: data })
}

setUserEmailAddress = (dispatch) => (data) => {
  dispatch({ type: 'SET_USER_EMAIL_ADDRESS', payload: data })
}

const fetchUser = (dispatch) => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('/user/fetch-user')
    dispatch({ type: 'FETCH_USER', payload: response.data })
  } catch (error) {
    dispatch({
      type: 'ADD_ERROR',
      payload: error,
    })
  }
}

const setFetchUserCount = (dispatch) => (data) => {
  dispatch({ type: 'SET_FETCH_USER_COUNT', payload: data })
}

const editUser = (dispatch) => async (data) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.patch('/user/edit-user', data)
    dispatch({ type: 'EDIT_USER', payload: response.data })
  } catch (error) {
    dispatch({
      type: 'ADD_ERROR',
      payload: error,
    })
  }
}

const setIsAdmin = (dispatch) => (data) => {
  dispatch({ type: 'SET_IS_ADMIN', payload: data })
}

export const { Provider, Context } = createDataContext(
  UserDataReducer,
  {
    fetchUserIpData,
    clearError,
    clearSuccess,
    setUserCountryIpData,
    setUserPhoneNumber,
    setUserEmailAddress,
    fetchUser,
    setFetchUserCount,
    editUser,
    setIsAdmin,
  },
  {
    loading: false,
    userIpData: null,
    error: null,
    success: null,
    userCountryIpData: null,
    userPhoneNumber: null,
    userEmailAddress: null,
    user: null,
    fetchUserCount: 0,
    isAdmin: false,
  }
)
