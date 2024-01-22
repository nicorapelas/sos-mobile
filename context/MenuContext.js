import createDataContext from './createDataContext'

// Reducer
const MenuReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MENU_EXPANDED':
      return { ...state, menuExpanded: action.payload }
    default:
      return state
  }
}

// Actions
const setMenuExpanded = (dispatch) => (data) => {
  dispatch({ type: 'SET_MENU_EXPANDED', payload: data })
}

export const { Provider, Context } = createDataContext(
  MenuReducer,
  {
    setMenuExpanded,
  },
  {
    menuExpanded: false,
  }
)
