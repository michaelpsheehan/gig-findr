

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux'
import { FiUser } from 'react-icons/fi';

import Avatar from './settings/user_avatar';
import { Link } from 'react-router-dom';



const query = ({ auth, userUid }) => {
    if (userUid !== null) {
        return [
            {
                collection: 'users',
                doc: userUid,
                storeAs: 'profile'
            },
            {
                collection: 'users',
                doc: userUid,
                subcollections: [{ collection: 'photos' }],
                storeAs: 'photos'
            }
        ]
    } else {



        return [
            {
                collection: 'users',
                doc: auth.uid,
                subcollections: [{ collection: 'photos' }],
                storeAs: 'photos'
            }
        ];
    }
};


const mapStateToProps = (state, ownProps) => {
    console.log('----------------------------------------------------------   auth.uid is', state.firebase.auth.uid);
    console.log('----------------------------------------------------------    THE Own props id is', ownProps.match.params.id);
    let userUid = null;
    let profile = {};
    let isOwnProfile = null;

    console.log('Yooooooooooooo the user profile state is ==================', state);
    console.log('Yooooooooooooo the user profile ownProps is ==================', ownProps);


    // if (ownProps.match.params.id === state.auth.uid) {
    //     profile = state.firebase.profile;

    if (ownProps.match.params.id === state.firebase.auth.uid) {
        profile = state.firebase.profile;



        isOwnProfile = true;
        console.log('Yoooooooooooooooooooooooooooooooooooo isOwnProfile =  ', isOwnProfile)
    } else {
        profile = !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0];
        userUid = ownProps.match.params.id;
        console.log('Yoooooooooooooooooooooooooooooooooooo isOwnProfile =  ', isOwnProfile)
    }

    return {

        auth: state.firebase.auth,
        profile,
        userUid,
        isOwnProfile,
        photos: state.firestore.ordered.photos,
        // loading: state.async.loading
    }

}

const actions = {

}

class UserProfilePage extends Component {
    render() {

        const { profile, photos, loading, isOwnProfile } = this.props;
        const homeTown = profile.homeTown ? (profile.homeTown) : ('Unknown');
        const title = profile && isOwnProfile ? (<>Your profile</>) : (<>{profile.username} </>);
        const photosTitle = profile && isOwnProfile ? (<>Your Photos</>) : (<>Profile Photos </>);
        const editButton = profile && isOwnProfile ? (
            <>
                <Link to="/usersettings">
                    <button className='btn'
                    // onClick={this.toggle} 
                    >
                        Edit Profile</button></Link></>) : (<></>);


        return (
            <div>
                <div className="site-content">
                    <div className="site-content__center">



                        <div className="user-profile-page">




                            <h2> {profile && title}  </h2>
                            <img className="avatar" src={profile.photoURL || '/assets/user.png'} />



                            < h6 > Hometown: {homeTown} </h6>
                            {editButton}

                            <h4>{photosTitle}</h4>
                            <div className="profile-photos">

                                {photos && photos.map(pic => (


                                    <div key={pic.id} >

                                        <div className="profile-photos__image">

                                            <img
                                                key={pic.url}
                                                // height="400px"
                                                src={pic.url} />
                                            {/* <button onClick={this.handlePhotoDelete(pic)} className="btn btn--delete" width='200px'>Delete</button>
                                <button onClick={this.handleSetMainPhoto(pic)} className="btn btn--set-photo" width='200px'>Set as Profile</button> */}
                                        </div>
                                    </div>

                                ))}
                            </div>


                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default compose(
    connect(mapStateToProps, actions),
    firestoreConnect((auth, userUid) =>

        query(auth, userUid)

    )
)(UserProfilePage);
