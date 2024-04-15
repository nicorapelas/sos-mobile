import ngrokApi from '../api/ngrokApi'
import createDataContext from './createDataContext'

// Reducer
const CommunityReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true }
    case 'MEMBERS_LIST_LOADING':
      return { ...state, membersListLoading: true }
    case 'MEMBER_OPTION_UPDATE_LOADING':
      return { ...state, memberOptionUpdateLoading: true }
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
        memberOptionUpdateLoading: false,
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
      return {
        ...state,
        communityMembersList: action.payload,
        membersListLoading: false,
      }
    case 'SET_MEMBERS_LIST_SHOW':
      return { ...state, membersListShow: action.payload }
    case 'SET_MEMBER_DETAIL_SELECTED':
      return {
        ...state,
        memberDetailSelected: action.payload,
        memberOptionUpdateLoading: false,
      }
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

const setSuccess = (dispatch) => (data) => {
  dispatch({ type: 'SET_SUCCESS', payload: data })
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
    if (response.data.error) {
      dispatch({ type: 'SET_ERROR', payload: response.data.error })
      return
    }
    if (response.data.success) {
      dispatch({ type: 'SET_SUCCESS', payload: response.data.success })
      dispatch({
        type: 'SET_UPDATE_LIST',
        payload: response.data.communityList,
      })
      return
    }
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
  dispatch({ type: 'MEMBERS_LIST_LOADING' })
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

const setMembersListShow = (dispatch) => (data) => {
  dispatch({ type: 'SET_MEMBERS_LIST_SHOW', payload: data })
}

const setMemberDetailSelected = (dispatch) => (data) => {
  dispatch({ type: 'SET_MEMBER_DETAIL_SELECTED', payload: data })
}

const setMemberAdminStatus = (dispatch) => async (data) => {
  dispatch({ type: 'MEMBER_OPTION_UPDATE_LOADING' })
  try {
    const response = await ngrokApi.post(
      '/community/set-members-admin-status',
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

const setMuteStatus = (dispatch) => async (data) => {
  dispatch({ type: 'MEMBER_OPTION_UPDATE_LOADING' })
  try {
    const response = await ngrokApi.post('/community/set-mute', data)
    dispatch({ type: 'SET_MEMBER_DETAIL_SELECTED', payload: response.data })
  } catch (error) {
    dispatch({
      type: 'SET_ERROR',
      payload: error,
    })
  }
}

const exitCommunity = (dispatch) => async (data) => {
  console.log(`at exit action`)
  try {
    const response = await ngrokApi.post('/community/exit-community', data)
    console.log(`response:`, response.data)
    if (response.data.error) {
      dispatch({ type: 'SET_ERROR', payload: response.data.error })
      return
    }
    if (response.data.success) {
      dispatch({ type: 'SET_SUCCESS', payload: response.data.success })
      dispatch({
        type: 'SET_UPDATE_LIST',
        payload: response.data.communityList,
      })
      return
    }
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
    setMembersListShow,
    setMemberDetailSelected,
    setMemberAdminStatus,
    setMuteStatus,
    exitCommunity,
  },
  {
    loading: false,
    membersListLoading: false,
    memberOptionUpdateLoading: false,
    error: '',
    success: '',
    retry: false,
    communityList: [],
    communitySelected: null,
    communitySelectedAdmin: [],
    communityInvite: null,
    showInvite: false,
    inviteCreatedSuccessfully: false,
    inviteTimeRemaining: '',
    updateList: [],
    initListCount: 0,
    communityMembersList: [],
    membersListShow: false,
    memberDetailSelected: null,
  }
)
