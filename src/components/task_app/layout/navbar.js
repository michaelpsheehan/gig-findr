import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './signed_in_links'
import SignedOutLinks from './signed_out_links'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import Avatar from '../../user/settings/user_avatar'

const Navbar = (props) => {
    const { auth, profile } = props;
    const links = props.auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />;

    return (
        <nav className="nav-wrapper blue darken-4">
            <div className="container">
                <Link to="/" className="brand-logo left">GIG FINDR</Link>

                <ul className='right'>

                    <li><NavLink to="/create" >Add Gig</NavLink></li>
                    {links}
                    {/* <Avatar user={profile} height="40px" /> */}
                </ul>
            </div>
        </nav>
    )
}
const mapStateToProps = (state) => {

    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}


export default connect(mapStateToProps)(Navbar)

