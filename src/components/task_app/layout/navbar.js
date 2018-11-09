import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './signed_in_links'
import SignedOutLinks from './signed_out_links'


const Navbar = () => {
    return (
        <nav className="nav-wrapper blue darken-4">
            <div className="container">
                <Link to="/" className="brand-logo left">Mario Plan</Link>
                <SignedInLinks />
                <SignedOutLinks />
            </div>
        </nav>
    )
}


export default Navbar
