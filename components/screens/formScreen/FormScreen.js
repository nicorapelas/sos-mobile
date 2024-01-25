import React, { useContext } from 'react'

import InitForm from './initForm/InitForm'
import { Context as FormContext } from '../../../context/FormContext'

const FormScreen = () => {
  const {
    state: { formSelected },
  } = useContext(FormContext)

  const formSelector = () => {
    switch (formSelected) {
      case 'initForm':
        return <InitForm />
      default:
        break
    }
  }

  return formSelector()
}

export default FormScreen
