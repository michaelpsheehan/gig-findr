import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../../../actions/authActions'
import Input from '../form/input'
import SocialLogin from './social_login/social_login'
import { toastr } from 'react-redux-toastr'
class SignUp extends Component {

    state = {
        username: '',
        email: '',
        password: ''
        // firstName: '',
        // lastName: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value

        })
        console.log(this.state)
        e.preventDefault();
    }

    handleSubmit = (e) => {

        e.preventDefault();
        console.log('the state on signup is', this.state)
        // console.log(this.state);
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
                    {/* <div className="container"> */}
                    <form onSubmit={this.handleSubmit} >
                        <h5 >Sign Up</h5>
                        <Input
                            placeholder="username"
                            type="text"
                            id="username"
                            onChange={this.handleChange}
                            value={this.state.username}
                        // default

                        />

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
                            <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
                            {/* <SocialLogin /> */}
                            <div className='red-text center' >
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

// const mapDispatchToProps = {

//     signUp
// }

const mapDispatchToProps = (dispatch) => {

    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
