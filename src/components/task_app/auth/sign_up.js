import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../../../actions/authActions'
import Input from '../form/input'

import { toastr } from 'react-redux-toastr'
class SignUp extends Component {

    state = {
        username: '',
        email: '',
        password: ''

    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value

        })

        e.preventDefault();
    }

    handleSubmit = (e) => {

        e.preventDefault();

        if (this.state.username === '') {
            toastr.error('Error', 'A username is required')
        } else {


            this.props.signUp(this.state);
        }
    }



    render() {
        const { auth
            , authError
        } = this.props;
        if (auth.uid) {
            return <Redirect to='/' />
        }
        return (
            <div className="site-content">
                <div className="site-content__center">

                    <form onSubmit={this.handleSubmit} >
                        <h5 >Sign Up</h5>
                        <Input
                            placeholder="username"
                            type="text"
                            id="username"
                            onChange={this.handleChange}
                            value={this.state.username}


                        />

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
                            <button className="btn ">Sign Up</button>
                            {/* <SocialLogin /> */}
                            <div className='red-text' >
                                {authError ? <p>  {authError}</p> : null}
                            </div>
                        </div>

                    </form>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}



const mapDispatchToProps = (dispatch) => {

    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
