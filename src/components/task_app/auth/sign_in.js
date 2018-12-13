import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn, socialLogin } from '../../../actions/authActions'
import { Redirect } from 'react-router-dom'
import SocialLogin from './social_login/social_login'

import Input from '../form/input'

class SignIn extends Component {

    state = {
        email: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value

        })
        // e.preventDefault();
    }

    handleSubmit = (e) => {

        e.preventDefault();
        this.props.signIn(this.state);
    }



    render() {
        const { authError, auth, socialLogin } = this.props;
        if (auth.uid) {
            return <Redirect to='/' />
        }
        return (
            <>
                <div className="site-content">
                    <div className="site-content__center">
                        {/* <div className="container"> */}
                        <form onSubmit={this.handleSubmit} >
                            <h5 >Sign In</h5>

                            <Input
                                placeholder="email"
                                type="email"
                                id="email"
                                onChange={this.handleChange}
                                value={this.state.email}
                            // default

                            />

                            <Input
                                placeholder="password"
                                type="password"
                                id="password"
                                onChange={this.handleChange}
                                value={this.state.password}
                            // default

                            />



                            <div className="input-field">
                                <button className="btn pink lighten-1 z-depth-0">Login</button>
                                {/* <SocialLogin socialLogin={socialLogin} /> */}
                                <div className="red-text center">
                                    {authError ? <p>{authError}</p> : null}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds)),
        socialLogin
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
