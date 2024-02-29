import AsyncStorage from '@react-native-async-storage/async-storage'

import ngrokApi from '../api/ngrokApi'
import createDataContext from './createDataContext'

// Reducer
const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true }
    case 'ADD_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'CLEAR_ERROR':
      return { ...state, error: action.payload }
    case 'ADD_STATUS':
      return { ...state, status: action.payload, loading: false }
    case 'CLEAR_STATUS':
      return { ...state, status: action.payload }
    case 'SET_OTP_CODE':
      return { ...state, otpCode: action.payload }
    case 'SIGN_IN':
      return { ...state, token: action.payload, loading: false }
    case 'REDIRECT_TO_LOGIN':
      return { ...state, redirectToLogin: action.payload }
    case 'SIGN_OUT':
      return { ...state, tokenValid: action.payload, loading: false }
    case 'SET_TOKEN_VALID':
      return { ...state, tokenValid: action.payload }
    case 'SET_LOGIN_OPTION':
      return { ...state, loginOption: action.payload }
    default:
      return state
  }
}

// Actions
const clearError = (dispatch) => () => {
  dispatch({ type: 'CLEAR_ERROR', payload: null })
  return
}

const clearStatus = (dispatch) => () => {
  dispatch({ type: 'CLEAR_STATUS', payload: null })
  return
}

const requestOtpSms = (dispatch) => async (data) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post('/auth/request-otp-sms', data)
    if (response.data) {
      if (response.data.status === 'pending') {
        dispatch({ type: 'ADD_STATUS', payload: response.data.status })
        return
      }
      if (response.data.error) {
        dispatch({
          type: 'ADD_ERROR',
          payload:
            'Error requesting OPT. Please make sure the phone number is valid. If this problem persists, wait 5 minutes and try again. ',
        })
        return
      }
    }
  } catch (error) {
    dispatch({
      type: 'ADD_ERROR',
      payload: error,
    })
    return
  }
}

const setOtpCode = (dispatch) => (data) => {
  dispatch({ type: 'SET_OTP_CODE', payload: data })
  return
}

const verifyOtpSms = (dispatch) => async (data) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post('/auth/verify-otp-sms', data)
    if (response.data.error) {
      dispatch({
        type: 'ADD_ERROR',
        payload: `Invalid OTP, please request a new "One Time Pin" and try again. `,
      })
      return
    }
    await AsyncStorage.setItem('token', response.data.token)
    dispatch({ type: 'SIGN_IN', payload: response.data.token })
    dispatch({ type: 'SET_TOKEN_VALID', payload: true })
    return
  } catch (error) {
    dispatch({
      type: 'ADD_ERROR',
      payload: error,
    })
    return
  }
}

const tokenValidation = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token')
  if (!token || token === null) {
    dispatch({ type: 'SET_TOKEN_VALID', payload: false })
    return
  }
  if (token) {
    dispatch({ type: 'SIGN_IN', payload: token })
    dispatch({ type: 'SET_TOKEN_VALID', payload: true })
    return
  }
}

const requestOtpEmail = (dispatch) => async (data) => {
  // dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post('/auth/request-otp-email', data)
    console.log(`response.data`, response.data)
  } catch (error) {
    dispatch({
      type: 'ADD_ERROR',
      payload: error,
    })
    return
  }
}

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem('token')
  dispatch({ type: 'REDIRECT_TO_LOGIN', payload: true })
  dispatch({ type: 'SIGN_OUT', payload: 'false' })
  return
}

const setRedirectToLogin = (dispatch) => (data) => {
  dispatch({ type: 'REDIRECT_TO_LOGIN', payload: data })
  return
}

const setLoginOption = (dispatch) => (data) => {
  dispatch({ type: 'SET_LOGIN_OPTION', payload: data })
  return
}

export const { Provider, Context } = createDataContext(
  AuthReducer,
  {
    clearError,
    clearStatus,
    requestOtpSms,
    setOtpCode,
    verifyOtpSms,
    tokenValidation,
    requestOtpEmail,
    signout,
    setRedirectToLogin,
    setLoginOption,
  },
  {
    loading: false,
    error: null,
    status: null,
    otpCode: '',
    token: null,
    tokenValid: false,
    redirectToLogin: false,
    loginOption: '',
  }
)
