import React, { Component } from 'react';

import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';




import BasicPage from '../settings/basic_page';
import Input from '../../task_app/form/input'
import Notifications from '../../task_app/dashboard/notifications';

// const UserAccountPage = (props) => 

class UserAccountPage extends Component {

    render() {

        const { user, concerts, auth, notifications } = this.props;

        // console.log('the values on the user account page are user = ', user);
        // console.log('the values on the user account page are concerts  = ', concerts);
        // console.log('the values on the user account page are auth  =  ', auth);
        // console.log('the values on the user account page are notifications   = ', notifications);

        console.log('the profile photo Url  = ', user.photoURL);

        return (
            <div className="container">

                <h2>User Account Page</h2>
                <p>change your info below</p>
                <p>Welcome back {user.firstName} {user.lastName}</p>
                <img height="200px" src={user.photoURL} />
                {/* <div height="200px" >{user.photoURL}</div> */}
                <form >
                    {/* <Input placeholder={} /> */}
                    <Input placeholder="New Password" type="password" id="password1" />
                    <Input placeholder="Confirm Password" type="password" id="password2" />
                    <button className="btn">Update Password</button>

                </form>
                <Notifications notifications={notifications} />
                <BasicPage />

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

        // ---------------------------------------------------------------
        // -------------get concert info 
        concerts: state.firestore.ordered.concerts
    }


}



export default compose(
    connect(mapStateToProps),
    firestoreConnect([

        // ---------------------------------------------------------------
        // -------------map concert info to props
        { collection: 'concerts', orderBy: ['concertDate', 'asc'] },
        // ---------------------------------------------------------------



        // { collection: 'projects', orderBy: ['createdAt', 'asc'] },
        { collection: 'notifications', limit: 50, orderBy: ['time', 'desc'] }
    ])
)(UserAccountPage);