import React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { closeModal } from './modal_actions'

const actions = {
    closeModal
}

// TODO -- set up this modal for the login and signup pages

const TestModal = ({ closeModal }) => {
    return (
        <div>
            <p className='modal__title'>Test Modal</p>
            <Modal onRequestClose={closeModal}>
                <h4>the modal popup stuff</h4>
                <button className='btn' onClick={closeModal}>close</button>
            </Modal>
        </div >
    )
}

export default connect(null, actions)(TestModal)
