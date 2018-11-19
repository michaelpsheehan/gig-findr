import React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { closeModal } from './modal_actions'

const actions = {
    closeModal
}

const TestModal = ({ closeModal }) => {
    return (
        <div>
            <p className='modal__title'>Test Modal</p>
            {/* <button className="btn" onClick={closeModal}>close modal</button> */}





            <Modal

                // isOpen={true}

                onRequestClose={closeModal}


            // isOpen={this.state.modalIsOpen}
            // onAfterOpen={this.afterOpenModal}
            // onRequestClose={this.closeModal}
            // style={customStyles}
            // contentLabel="Example Modal"

            >



                {/* <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2> */}
                <h4>the modal popup stuff</h4>

                <button className='btn' onClick={closeModal}>close</button>

                {/* <button onClick={this.closeModal}>close</button> */}
                    // {/* <div>I am a modal</div>
                    // <form>
                    //     <input />
                    //     <button>tab navigation</button>
                    //     <button>stays</button>
                    //     <button>inside</button>
                    //     <button>the modal</button>
                    // </form>
                    */}
            </Modal>






        </div >
    )
}

export default connect(null, actions)(TestModal)
