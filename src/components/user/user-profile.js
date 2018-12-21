import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect, isEmpty, isLoaded, withFirestore } from 'react-redux-firebase';
import { compose } from 'redux'
import { Link } from 'react-router-dom';
import LoadingComponent from '../task_app/layout/loading_component';
import { userDetailsQuery } from './user_queries'
import UserPhotos from './user_photos';



const mapStateToProps = (state, ownProps) => {
    let userUid = null;
    let profile = {};
    let isOwnProfile = null;

    //  checks if the current user matches the id of the profile being viewed
    if (ownProps.match.params.id === state.firebase.auth.uid) {
        profile = state.firebase.profile;
        isOwnProfile = true;
    } else {
        profile = !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0];
        userUid = ownProps.match.params.id;
    }

    return {
        auth: state.firebase.auth,
        profile,
        userUid,
        isOwnProfile,
        photos: state.firestore.ordered.photos,
        loading: state.async.loading,
        requesting: state.firestore.status.requesting
    }

}

const actions = {

}

class UserProfilePage extends Component {

    render() {

        const { profile, photos, isOwnProfile, auth, requesting } = this.props;

        const isLoading = Object.values(requesting).some(requesting => requesting === true)

        const homeTown = profile.homeTown ? (profile.homeTown) : ('Unknown');
        const title = profile && isOwnProfile ? (<>Your profile</>) : (<>{profile.username} </>);
        const photosTitle = profile && isOwnProfile ? (<>Your Photos</>) : (<>Profile Photos </>);
        const editButton = profile && isOwnProfile ? (
            <>
                <Link to={`/usersettings/${auth.uid}`}  >
                    <button className='btn'>
                        Edit Profile</button></Link></>) : (<></>);


        if (isLoading) return <LoadingComponent />

        return (
            <div>
                <div className="site-content">
                    <div className="site-content__center">
                        <div className="user-profile-page">
                            {/* <h1>{defaultAvatar}</h1> */}
                            <h2> {profile && title}  </h2>
                            {/* show users profile pic from firebase or the fallback while it is loading */}
                            <img className="avatar" src={profile.photoURL || '/assets/user.png'} alt="user-avatar" />
                            < h6 > Hometown: {homeTown} </h6>
                            {editButton}
                            <h4>{photosTitle}</h4>
                            {photos && photos.length > 0 &&

                                <UserPhotos photos={photos} />
                            }
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

        userDetailsQuery(auth, userUid)

    )
)(UserProfilePage);
