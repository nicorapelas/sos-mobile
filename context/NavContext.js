import createDataContext from './createDataContext'

// Reducer
const NavReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NAV_TAB_SELECTED':
      return { ...state, navTabSelected: action.payload }
    default:
      return state
  }
}

// Actions
const setNavTabSelected = (dispatch) => (data) => {
  dispatch({ type: 'SET_NAV_TAB_SELECTED', payload: data })
}

export const { Provider, Context } = createDataContext(
  NavReducer,
  {
    setNavTabSelected,
  },
  {
    navTabSelected: 'devices',
  }
)
