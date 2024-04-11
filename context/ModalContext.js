import createDataContext from './createDataContext'

// Reducer
const ModalReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MODAL_CONTENT_SELECTED':
      return { ...state, modalContentSelected: action.payload }
    default:
      return state
  }
}

// Actions
const setModalContentSelected = (dispatch) => (data) => {
  dispatch({ type: 'SET_MODAL_CONTENT_SELECTED', payload: data })
}

export const { Provider, Context } = createDataContext(
  ModalReducer,
  {
    setModalContentSelected,
  },
  {
    modalContentSelected: '',
  }
)
