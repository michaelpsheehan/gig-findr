import React, { Component } from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Input from '../../task_app/form/input'
import { updatePassword, updateUserDetails } from '../../../actions/authActions'
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
        homeTown: '',
    }

    handleChange = (e) => {

        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.newPassword1 !== '' && this.state.newPassword2 !== '') {
            this.props.updatePassword(this.state);
            this.props.updateUserDetails(this.state);
        } else {
            if (this.state.displayName === '' && this.state.homeTown === '') {
                toastr.error('', 'You have not added any new details to update')
            } else {
                this.props.updateUserDetails(this.state);
            }
        }
    }

    handleSubmitPassword = (e) => {
        e.preventDefault();
        if (this.state.newPassword1 !== '' && this.state.newPassword2 !== '') {
            if (this.state.newPassword1 === this.state.newPassword2) {
                this.props.updatePassword(this.state);
            }
            else {

            }
        }
    }


    render() {
        const { user, auth, authError } = this.props;

        //  if user is not logged in redirect to the login page
        if (!auth.uid) {
            return <Redirect to='/login' />
        }

        //  Dynamically create page text depending on current user profile information
        const homeTown = user.homeTown ? (user.homeTown) : ('Unknown');
        const hasProfilePic = auth && auth.photoURL === null ? (<>Add a Profile Image</>) : (<>Upload New Photo</>);
        return (
            <div className="site-content ">

                <div className="site-content__center">

                    <div className="user-account-page">


                        <h2>User Account Page </h2>
                        <Avatar user={user} height="200px" />
                        <button className="btn" onClick={this.props.signOut} >
                            Log Out
                </button>

                        <p>{user && user.displayName}</p>
                        <p>Hometown: {homeTown}</p>

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

                                <Input placeholder="Confirm New Password"
                                    type="password" id="newPassword2"
                                    onChange={this.handleChange}
                                    value={this.state.newPassword2} />

                                <div className='red-text' >
                                    {authError ? <p>  {authError}</p> : null}
                                </div>
                                <button className="btn">Change Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



const mapStateToProps = (state) => {


    return {
        user: state.firebase.profile,
        auth: state.firebase.auth,
        authError: state.auth.authError,
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
        //  listen to firestore concert info
        // -------------map concert info to props
        { collection: 'concerts', orderBy: ['concertDate', 'asc'] },
        // ---------------------------------------------------------------
    ])
)(UserAccountPage);