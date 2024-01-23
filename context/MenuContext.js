import createDataContext from './createDataContext'

// Reducer
const MenuReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MENU_EXPANDED':
      return { ...state, menuExpanded: action.payload }
    case 'SET_USE_STATIC_MENU':
      return { ...state, useStaticMenu: action.payload }
    default:
      return state
  }
}

// Actions
const setMenuExpanded = (dispatch) => (data) => {
  dispatch({ type: 'SET_MENU_EXPANDED', payload: data })
}

const setUseStaticMenu = (dispatch) => (data) => {
  dispatch({ type: 'SET_USE_STATIC_MENU', payload: data })
}

export const { Provider, Context } = createDataContext(
  MenuReducer,
  {
    setMenuExpanded,
    setUseStaticMenu,
  },
  {
    menuExpanded: false,
    useStaticMenu: false,
  }
)
