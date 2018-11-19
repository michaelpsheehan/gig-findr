import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../../actions/authActions'
import TestModal from '../../../features/modals/test_modal';
// import { openModal } from '../../../features/modals/modal_actions'

const SignedInLinks = (props) => {
    // const { openModal } = this.props
    return (
        <>
            {/* <button className="btn" onClick={() => openModal('testModal', { data: 42 })}>Open modal</button> */}
            {/* // <ul className="right"> */}

            {/* <li><NavLink to="/create" >Add Gig</NavLink></li> */}
            < li >
                <button onClick={props.signOut} >
                    Log Out
                </button>
            </li >

            <li>
                {/* //--------------------------  old way with the initials and the circular profile button  */}
                {/* <NavLink to="/" className="btn- btn-floating pink lighten-1" >welcome back {props.profile.initials} */}
                <NavLink to="/"  >welcome back {props.profile.firstName}
                </NavLink></li>
            <TestModal />

            {/* // </ul > */}
        </>
    )
}

const actions = () => {
    // openModal
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
        // ,
        // openModal

    }
}


export default connect(null, mapDispatchToProps)(SignedInLinks)
