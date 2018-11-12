import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './signed_in_links'
import SignedOutLinks from './signed_out_links'
import { connect } from 'react-redux'


const Navbar = (props) => {
    const { auth, profile } = props;
    const links = props.auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />;

    console.log('the auth property in the navbar is ', auth)
    return (
        <nav className="nav-wrapper blue darken-4">
            <div className="container">
                <Link to="/" className="brand-logo left">GIG FINDR</Link>


                {links}
            </div>
        </nav>
    )
}
const mapStateToProps = (state) => {
    console.log('the state in the navbar mapstate to props is', state);
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}


export default connect(mapStateToProps)(Navbar)

