import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../../actions/authActions'


const SignedInLinks = (props) => {
    return (
        <ul className="right">

            <li><NavLink to="/create" >Add Gig</NavLink></li>
            <li>
                <button onClick={props.signOut} >
                    Log Out
            </button>
            </li>

            <li>
                {/* //--------------------------  old way with the initials and the circular profile button  */}
                {/* <NavLink to="/" className="btn- btn-floating pink lighten-1" >welcome back {props.profile.initials} */}
                <NavLink to="/"  >welcome back {props.profile.firstName}
                </NavLink></li>

        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}


export default connect(null, mapDispatchToProps)(SignedInLinks)
