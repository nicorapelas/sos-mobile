import React, { useContext, useState, useEffect } from 'react'

import ExitCommunityModal from './ExitCommunityModal'
import { Context as ModalContext } from '../../../context/ModalContext'

const Modal = () => {
  const [content, setContent] = useState('')

  const {
    state: { modalContentSelected },
  } = useContext(ModalContext)

  useEffect(() => {
    setContent(modalContentSelected)
  }, [modalContentSelected])

  const renderContent = () => {
    switch (content) {
      case 'exitCommunity':
        return <ExitCommunityModal />
      default:
        break
    }
  }

  return renderContent()
}

export default Modal
