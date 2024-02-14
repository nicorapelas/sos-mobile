import ngrokApi from '../api/ngrokApi'
import createDataContext from './createDataContext'

// Reducer
const CommunityReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'SET_SUCCESS':
      return { ...state, success: action.payload, loading: false }
    case 'SET_SUCCESS':
      return { ...state, success: action.payload }
    case 'SET_RETRY':
      return { ...state, retry: action.payload }
    case 'SET_COMMUNITY_LIST':
      return { ...state, communityList: action.payload }
    case 'ADD_COMMUNITY':
      return {
        ...state,
        communityList: [...state.communityList, action.payload],
      }
    case 'FETCH_COMMUNITY_SELECTED':
      return { ...state, communitySelected: action.payload, loading: false }
    case 'SET_COMMUNITY_SELECTED':
      return { ...state, communitySelected: action.payload }
    case 'FETCH_COMMUNITY_SELECTED_ADMIN':
      return {
        ...state,
        communitySelectedAdmin: action.payload,
        loading: false,
      }
    case 'SET_COMMUNITY_INVITE':
      return { ...state, communityInvite: action.payload, loading: false }
    default:
      return state
  }
}

// Actions
const createCommunity = (dispatch) => async (data) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post('/community/create', data)
    if (response.data.error) {
      dispatch({ type: 'SET_ERROR', payload: response.data.error })
      return
    }
    dispatch({ type: 'ADD_COMMUNITY', payload: response.data })
    dispatch({ type: 'SET_SUCCESS', payload: 'communityCreatedSuccefully' })
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

const setSuccess = (dispatch) => (success) => {
  dispatch({ type: 'SET_SUCCESS', payload: success })
}

const setRetry = (dispatch) => (error) => {
  dispatch({ type: 'SET_RETRY', payload: error })
}

const setCommunityList = (dispatch) => (data) => {
  dispatch({ type: 'SET_COMMUNITY_LIST', payload: data })
}

const fetchSelectedCommunity = (dispatch) => async (data) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post('/community/fetch-selected', data)
    dispatch({ type: 'FETCH_COMMUNITY_SELECTED', payload: response.data })
    return
  } catch (error) {
    dispatch({
      type: 'SET_ERROR',
      payload: error,
    })
  }
}

const setCommunitySelected = (dispatch) => (data) => {
  dispatch({ type: 'SET_COMMUNITY_SELECTED', payload: data })
}

const fetchSelectedCommunityAdmin = (dispatch) => async (data) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post(
      '/community/fetch-community-selected-admin',
      data
    )
    dispatch({
      type: 'FETCH_COMMUNITY_SELECTED_ADMIN',
      payload: response.data,
    })
  } catch (error) {
    dispatch({
      type: 'SET_ERROR',
      payload: error,
    })
  }
}

const createCommunityInvite = (dispatch) => async (data) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post(
      '/community/create-community-invite',
      data
    )
    console.log('response', response.data)
    if (response.data.retry) {
      dispatch({ type: 'SET_RETRY', payload: response.data.retry })
      return
    }
    dispatch({ type: 'SET_COMMUNITY_INVITE', payload: response.data })
    return
  } catch (error) {
    dispatch({
      type: 'SET_ERROR',
      payload: error,
    })
  }
}

export const { Provider, Context } = createDataContext(
  CommunityReducer,
  {
    setError,
    setSuccess,
    setRetry,
    createCommunity,
    setCommunityList,
    fetchSelectedCommunity,
    setCommunitySelected,
    fetchSelectedCommunityAdmin,
    createCommunityInvite,
  },
  {
    loading: false,
    error: '',
    success: '',
    retry: false,
    communityList: [],
    communitySelected: null,
    communitySelectedAdmin: null,
    communityInvite: null,
  }
)
