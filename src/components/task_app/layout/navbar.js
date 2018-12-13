import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './signed_in_links'
import SignedOutLinks from './signed_out_links'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'


const Navbar = (props) => {
    const { profile } = props;
    const links = props.auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />;

    return (
        <nav className="navbar ">
            <Link to="/" className="navbar__logo">GIG FINDR</Link>
            <div className="navbar__links">

                <ul>
                    <li><NavLink to="/create" >Add Gig</NavLink></li>
                    {links}
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

