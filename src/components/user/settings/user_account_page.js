import React, { Component } from 'react';

import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import Datetime from 'react-datetime';
import moment from 'moment';

import BasicPage from '../settings/basic_page';
import Input from '../../task_app/form/input'
import Notifications from '../../task_app/dashboard/notifications';

import { updatePassword, updateUserDetails } from '../../../actions/authActions'
import { uploadImage } from '../../../actions/projects_actions';
import PhotoUpload from '../../task_app/dashboard/photo_upload';
import Avatar from './user_avatar'

import { signOut } from '../../../actions/authActions'

import { toastr } from 'react-redux-toastr'

import { Redirect } from 'react-router-dom'
class UserAccountPage extends Component {
    state = {
        newPassword1: '',
        newPassword2: '',
        displayName: '',
        // dob: '',
        homeTown: '',
        // displayNameFromFirebase: ''


    }







    // async componentDidMount() {
    //     //     const { firestore, match } = this.props;
    //     //     const newdata = await firestore.get(`users/${match.params.id}`);
    //     //     console.log('neeeeeeeeeeeeeeeeeeeeeew DAAAAAAAAAAAAAAAAATA is ======', newdata)
    //     const originalState = this.state;

    //     this.setState({
    //         ...originalState,
    //         displayNameFromFirebase: this.state

    //     })

    // }









    handleChange = (e) => {
        // console.log('the id on the handle change form event is', e.target.id);
        // console.log('the value is ', e.target.value);

        this.setState({

            [e.target.id]: e.target.value


        })
    }

    handleSubmit = (e) => {

        e.preventDefault();
        // console.log('the state for password 1 on submit is', this.state.newPassword1)

        if (this.state.newPassword1 !== '' && this.state.newPassword2 !== '') {

            this.props.updatePassword(this.state);
            this.props.updateUserDetails(this.state);

        } else {

            if (this.state.displayName === '' && this.state.homeTown === '') {
                toastr.error('', 'You have not added any new details to update')
            } else {

                this.props.updateUserDetails(this.state);
            }
            // console.log('the on submit event on the update password form is', e.target.id);
            // console.log('the value is' + e.target.value);
        }


        //   dispatch(updatePassword(newPassword))
    }


    handleSubmitPassword = (e) => {

        e.preventDefault();
        // console.log('the state for password 1 on submit is', this.state.newPassword1)


        if (this.state.newPassword1 !== '' && this.state.newPassword2 !== '') {
            if (this.state.newPassword1 === this.state.newPassword2) {

                this.props.updatePassword(this.state);
                console.log('tis working')
                // this.props.updateUserDetails(this.state);
            }
            else {
                console.log('it isnt');
            }


        }

    }


    render() {



        const { updatePassword, updateUserDetails, user, concerts, auth, authError
            // notifications
        } = this.props;

        if (!auth.uid) {
            // toastr.error('Only logged in users can add gigs')
            return <Redirect to='/' />
        }
        const homeTown = user.homeTown ? (user.homeTown) : ('Unknown');

        const hasProfilePic = auth && auth.photoURL === null ? (<>Add a Profile Image</>) : (<>Upload New Photo</>);

        // console.log('the values on the user account page are user = ', user);
        // console.log('the values on the user account page are concerts  = ', concerts);
        // console.log('the values on the user account page are auth  =  ', auth);
        // console.log('the values on the user account page are notifications   = ', notifications);

        // console.log('the updatePassword dispatch function on the user accounts page is =  = ', updatePassword);
        // console.log('the profile photo Url  = ', user.photoURL);


        return (

            <div className="site-content ">

                <div className="site-content__center">

                    <div className="user-account-page">


                        <h2>User Account Page </h2>
                        <Avatar user={user} height="200px" />
                        <button className="btn" onClick={this.props.signOut} >
                            Log Out
                </button>
                        {/* {user.photoURL && <img height="200px" className="circle" src={user.photoURL} />} */}
                        {/* <p>{auth.displayName}</p> */}
                        {/* <p>{user && user.username}</p> */}
                        <p>{user && user.displayName}</p>
                        <p>Hometown: {homeTown}</p>



                        {/* <p>Welcome back {user.firstName ? (<>{user.firstName} {user.lastName}</>) : (<>{user.displayName}</>)}</p> */}
                        {/* <div height="200px" >{user.photoURL}</div> */}




                        <PhotoUpload hasProfilePic={hasProfilePic} />

                        <form onSubmit={this.handleSubmit}>
                            <h4 className="edit-profile-title">Edit your profile details</h4>
                            <Input
                                placeholder="Username"
                                type="text"
                                id="displayName"
                                onChange={this.handleChange}
                                value={this.state.displayName}
                                default

                            />
                            <Input
                                placeholder="Home City"
                                type="text"
                                id="homeTown"
                                onChange={this.handleChange}
                                value={this.state.homeTown}

                            />




                            <button className="btn">Update Profile</button>

                        </form >


                        <div className='update-password' >
                            <form onSubmit={this.handleSubmitPassword}>

                                <Input
                                    placeholder="New Password"
                                    type="password"
                                    id="newPassword1"
                                    onChange={this.handleChange}
                                    value={this.state.newPassword1}
                                />


                                <Input placeholder="Confirm New Password" type="password" id="newPassword2" onChange={this.handleChange}
                                    value={this.state.newPassword2} />



                                <div className='red-text' >
                                    {authError ? <p>  {authError}</p> : null}
                                </div>

                                <button className="btn">Change Password</button>

                            </form>

                        </div>
                        {/* <BasicPage /> */}
                        {/* <Notifications notifications={notifications} /> */}

                    </div>


                </div>
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
        authError: state.auth.authError,
        // notifications: state.firestore.ordered.notifications,
        concerts: state.firestore.ordered.concerts
    }


}

const mapDispatchToProps = (dispatch) => {
    return {

        updatePassword: (newPassword) => dispatch(updatePassword(newPassword)),
        updateUserDetails: (newDetails) => dispatch(updateUserDetails(newDetails)),

        signOut: () => dispatch(signOut())
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
        // { collection: 'notifications', limit: 50, orderBy: ['time', 'desc'] }
    ])
)(UserAccountPage);