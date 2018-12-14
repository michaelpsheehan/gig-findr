import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../../actions/authActions'
import Avatar from '../../user/settings/user_avatar'

const SignedInLinks = (props) => {
    const { profile, auth } = props;
    return (
        <>
            <li>
                <NavLink to={`/usersettings/${props.auth.uid}`}  >
                    <Avatar user={props.profile} height="40px" />
                </NavLink>
            </li>
            <li className='navbar--username'>
                <NavLink to={`/usersettings/${props.auth.uid}`}  >
                    {props.profile && props.profile.displayName}
                </NavLink>
            </li>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}


export default connect(null, mapDispatchToProps)(SignedInLinks)
