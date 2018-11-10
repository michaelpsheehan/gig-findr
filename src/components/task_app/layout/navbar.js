import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './signed_in_links'
import SignedOutLinks from './signed_out_links'
import { connect } from 'react-redux'


const Navbar = (props) => {
    const { auth } = props;
    const links = props.auth.uid ? <SignedInLinks /> : <SignedOutLinks />;

    console.log('the auth property in the navbar is ', auth)
    return (
        <nav className="nav-wrapper blue darken-4">
            <div className="container">
                <Link to="/" className="brand-logo left">Mario Plan</Link>


                {links}
            </div>
        </nav>
    )
}
const mapStateToProps = (state) => {

    return {
        auth: state.firebase.auth
    }
}


export default connect(mapStateToProps)(Navbar)

