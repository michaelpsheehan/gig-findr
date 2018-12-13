import React from 'react'
import { NavLink } from 'react-router-dom'


const SignedOutLinks = () => {
    return (
        <>
            <li><NavLink to="/signup" >Signup</NavLink></li>
            <li><NavLink to="/login" >Login</NavLink></li>
        </>
    )
}


export default SignedOutLinks
