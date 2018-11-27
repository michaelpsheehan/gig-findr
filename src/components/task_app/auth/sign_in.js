import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn, socialLogin } from '../../../actions/authActions'
import { Redirect } from 'react-router-dom'
import SocialLogin from './social_login/social_login'


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
        // console.log(this.state);
    }



    render() {
        const { authError, auth, socialLogin } = this.props;
        if (auth.uid) {
            return <Redirect to='/' />
        }
        return (
            <>
                <div className="container">
                    <form onSubmit={this.handleSubmit} className="white">
                        <h5 className="grey-text text-darken-3">Sign In</h5>
                        <div className="input-field">
                            <label htmlFor="email" >Email</label>
                            <input type="email" id="email"
                                // value={this.state.email}
                                onChange={this.handleChange} />
                        </div>
                        <div className="input-field">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password"
                                // value={this.state.password}
                                onChange={this.handleChange} />
                        </div>

                        <div className="input-field">
                            <button className="btn pink lighten-1 z-depth-0">Login you</button>
                            <SocialLogin socialLogin={socialLogin} />
                            <div className="red-text center">
                                {authError ? <p>{authError}</p> : null}
                            </div>
                        </div>
                    </form>

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
