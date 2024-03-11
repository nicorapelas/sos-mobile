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
    case 'SET_SHOW_INVITE':
      return { ...state, showInvite: action.payload }
    case 'SET_INVITE_CREATED_SUCCEFULLY':
      return { ...state, inviteCreatedSuccessfully: action.payload }
    case 'SET_INVITE_TIME_REMAINING':
      return { ...state, inviteTimeRemaining: action.payload }
    case 'SET_UPDATE_LIST':
      return { ...state, updateList: action.payload }
    case 'SET_INIT_LIST_COUNT':
      return { ...state, initListCount: action.payload }
    case 'SET_COMMUNITY_MEMBERS_LIST':
      return { ...state, communityMembersList: action.payload, loading: false }
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
    dispatch({ type: 'SET_SUCCESS', payload: response.data.success })
    dispatch({
      type: 'SET_UPDATE_LIST',
      payload: response.data.communityList,
    })
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
    if (response.data.retry) {
      dispatch({ type: 'SET_RETRY', payload: response.data.retry })
      return
    }
    dispatch({ type: 'SET_COMMUNITY_INVITE', payload: response.data })
    dispatch({ type: 'SET_INVITE_CREATED_SUCCEFULLY', payload: true })
    return
  } catch (error) {
    dispatch({
      type: 'SET_ERROR',
      payload: error,
    })
  }
}

const setShowInvite = (dispatch) => (data) => {
  dispatch({ type: 'SET_SHOW_INVITE', payload: data })
}

const fetchCommunityInvite = (dispatch) => async (data) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post(
      '/community/fetch-community-invite',
      data
    )
    dispatch({ type: 'SET_COMMUNITY_INVITE', payload: response.data })
    return
  } catch (error) {
    dispatch({
      type: 'SET_ERROR',
      payload: error,
    })
  }
}

const setInviteCreatedSuccessfully = (dispatch) => (data) => {
  dispatch({ type: 'SET_INVITE_CREATED_SUCCEFULLY', payload: data })
}

const setInviteTimeRemaining = (dispatch) => (data) => {
  dispatch({ type: 'SET_INVITE_TIME_REMAINING', payload: data })
}

const joinCommunity = (dispatch) => async (data) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post('/community/join-community', data)
    console.log(`response`, response.data)
    dispatch({ type: 'SET_SUCCESS', payload: response.data.success })
    dispatch({
      type: 'SET_UPDATE_LIST',
      payload: response.data.communityList,
    })
    return
  } catch (error) {
    dispatch({
      type: 'SET_ERROR',
      payload: error,
    })
  }
}

const setUpdateList = (dispatch) => (data) => {
  dispatch({ type: 'SET_UPDATE_LIST', payload: data })
}

const setInitListCount = (dispatch) => (data) => {
  dispatch({ type: 'SET_INIT_LIST_COUNT', payload: data })
}

const fetchCommunityMembersList = (dispatch) => async (data) => {
  // dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post(
      '/community/fetch-community-members-list',
      data
    )
    dispatch({ type: 'SET_COMMUNITY_MEMBERS_LIST', payload: response.data })
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
    setShowInvite,
    fetchCommunityInvite,
    setInviteCreatedSuccessfully,
    setInviteTimeRemaining,
    joinCommunity,
    setUpdateList,
    setInitListCount,
    fetchCommunityMembersList,
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
    showInvite: false,
    inviteCreatedSuccessfully: false,
    inviteTimeRemaining: '',
    updateList: [],
    initListCount: 0,
    communityMembersList: [],
  }
)
