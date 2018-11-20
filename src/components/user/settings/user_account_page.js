import React, { Component } from 'react';

import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import Datetime from 'react-datetime';
import moment from 'moment';

import BasicPage from '../settings/basic_page';
import Input from '../../task_app/form/input'
import Notifications from '../../task_app/dashboard/notifications';

import { updatePassword } from '../../../actions/authActions'
import { uploadImage } from '../../../actions/projects_actions';
import PhotoUpload from '../../task_app/dashboard/photo_upload';

// const UserAccountPage = (props) => 

class UserAccountPage extends Component {
    state = {
        newPassword1: '',
        newPassword2: '',
        username: ''
    }


    handleChange = (e) => {
        console.log('the id on the handle change form event is', e.target.id);
        console.log('the value is ', e.target.value);

        this.setState({

            [e.target.id]: e.target.value
            // [e.id]: e.value

        })
    }

    handleSubmit = (e) => {
        console.log('yo what the fuck')
        e.preventDefault();
        console.log('the state for password 1 on submit is', this.state.newPassword1)

        this.props.updatePassword(this.state);

        // console.log('the on submit event on the update password form is', e.target.id);
        // console.log('the value is' + e.target.value);


        //   dispatch(updatePassword(newPassword))
    }



    render() {

        const { updatePassword, user, concerts, auth, notifications } = this.props;


        // console.log('the values on the user account page are user = ', user);
        // console.log('the values on the user account page are concerts  = ', concerts);
        // console.log('the values on the user account page are auth  =  ', auth);
        // console.log('the values on the user account page are notifications   = ', notifications);

        // console.log('the updatePassword dispatch function on the user accounts page is =  = ', updatePassword);
        // console.log('the profile photo Url  = ', user.photoURL);

        return (
            <div className="container">

                <h2>User Account Page</h2>
                <p>change your info below</p>
                <p>Welcome back {user.firstName} {user.lastName}</p>
                {user.photoURL && <img height="200px" className="circle" src={user.photoURL} />}
                {/* <div height="200px" >{user.photoURL}</div> */}





                <form onSubmit={this.handleSubmit}>

                    {/* <PhotoUpload /> */}
                    <Input
                        placeholder="Username"
                        type="text"
                        id="username"
                        onChange={this.handleChange}
                        value={this.state.username}
                        default

                    />
                    <Input
                        placeholder="Home City"
                        type="text"
                        id="homeTown"
                        onChange={this.handleChange}
                        value={this.state.username}

                    />


                    <Datetime
                        // id="concertDate"
                        inputProps={{ placeholder: "Date of Birth", id: "dob" }}
                    // isValidDate={valid}

                    // onChange={this.handleConcertDateChange}

                    />


                    {/* <Input placeholder={} /> */}

                    <Input
                        placeholder="New Password"
                        type="password"
                        id="newPassword1"
                        onChange={this.handleChange}
                        value={this.state.newPassword1}
                    />


                    <Input placeholder="Confirm New Password" type="password" id="newPassword2" onChange={this.handleChange}
                        value={this.state.newPassword2} />
                    <button className="btn">Update Password</button>

                </form >
                <BasicPage />
                <Notifications notifications={notifications} />

            </div>
        )
    }
}

// export default
//  UserAccountPage



const mapStateToProps = (state) => {


    return {
        user: state.firebase.profile,
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications,
        concerts: state.firestore.ordered.concerts
    }


}

const mapDispatchToProps = (dispatch) => {
    return {

        updatePassword: (newPassword) => dispatch(updatePassword(newPassword))
    }
}



export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([

        // ---------------------------------------------------------------
        // -------------map concert info to props
        { collection: 'concerts', orderBy: ['concertDate', 'asc'] },
        // ---------------------------------------------------------------



        // { collection: 'projects', orderBy: ['createdAt', 'asc'] },
        { collection: 'notifications', limit: 50, orderBy: ['time', 'desc'] }
    ])
)(UserAccountPage);