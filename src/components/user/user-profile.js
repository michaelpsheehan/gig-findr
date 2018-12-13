import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux'
import { Link } from 'react-router-dom';
import LoadingComponent from '../task_app/layout/loading_component';

// --------------------------
// ----query to bring back user profile and photos

const query = ({ auth, userUid }) => {
    if (userUid !== null) {
        return [
            { collection: 'users', doc: userUid, storeAs: 'profile' },
            { collection: 'users', doc: userUid, subcollections: [{ collection: 'photos' }], storeAs: 'photos' }
        ]
    } else {
        return [
            { collection: 'users', doc: auth.uid, subcollections: [{ collection: 'photos' }], storeAs: 'photos' }
        ];
    }
};


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
        loading: state.async.loading
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
                    <button className='btn'>
                        Edit Profile</button></Link></>) : (<></>);

        if (loading) return <LoadingComponent />

        return (
            <div>
                <div className="site-content">
                    <div className="site-content__center">
                        <div className="user-profile-page">
                            <h2> {profile && title}  </h2>
                            {/* show users profile pic from firebase or the fallback while it is loading */}
                            <img className="avatar" src={profile.photoURL || '/assets/user.png'} alt="user-avatar" />
                            < h6 > Hometown: {homeTown} </h6>
                            {editButton}
                            <h4>{photosTitle}</h4>
                            <div className="profile-photos">
                                {photos && photos.map(pic => (
                                    <div key={pic.id} >
                                        <div className="profile-photos__image">
                                            <img key={pic.url} src={pic.url} alt='user-profile-images' />
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
