import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';


const Navbar = () => {
    console.log(state);

    return (
        <>
            <nav className='Navbar'>
                <div className="logo"></div>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                </ul>
            </nav>
        </>
    )


};

export default withRouter(Navbar);