import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../../actions/authActions'
import { Redirect } from 'react-router-dom'


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
    }

    handleSubmit = (e) => {

        e.preventDefault();
        this.props.signIn(this.state);
    }



    render() {
        const { authError, auth } = this.props;
        if (auth.uid) {
            return <Redirect to='/' />
        }
        return (
            <>
                <div className="site-content">
                    <div className="site-content__center">
                        <form onSubmit={this.handleSubmit} >
                            <h5 >Sign In</h5>

                            <Input
                                placeholder="email"
                                type="email"
                                id="email"
                                onChange={this.handleChange}
                                value={this.state.email}
                            />

                            <Input
                                placeholder="password"
                                type="password"
                                id="password"
                                onChange={this.handleChange}
                                value={this.state.password}
                            />

                            <div className="input-field">
                                <button className="btn">Login</button>
                                <div className="red-text">
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
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
