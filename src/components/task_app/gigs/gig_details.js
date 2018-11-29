import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment';
import GenreList from './genre_list'

import PhotoUpload from '../dashboard/photo_upload'
import GigPhoto from './gig_photo';
import CreateGig from './create_gig'

import format from 'date-fns/format'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

import Avatar from '../../user/settings/user_avatar'
const GigDetails = (props) => {
    const { project, auth, concert, id } = props;
    // const { auth } = props;
    // const { concert } = props;

    console.log('the id in the gig details page is', id);
    // console.log('the auth in the gig details page is', auth);
    // console.log('the auth in the gig details page is', auth);
    // console.log('the auth in the gig details page is', auth);
    // console.log(concert.selectedGenre[0].value);

    // if (!auth.uid) {
    //     return <Redirect to='/login' />
    // }

    // if (!concert.id) {
    //     return <Redirect to='/login' />
    // }
    const isHost = concert && auth.uid === concert.hostUid;
    // const host = concert.hostUsername    && isHost ? (<>You</>) : (<>{concert.hostUsername}</>)



    // if the logged in user is the same user that created the post show the edit post form

    // const editButton = concert && auth.uid === concert.hostUid ? (
    const editButton = concert && isHost ? (
        // <><h2>the uid is a match</h2></>
        <> <CreateGig formTitle="Edit Your Gig Details" concert={concert} id={id} /> </>

    ) :
        (<><h2>the uid is not a match</h2></>)
    // console.log('auth.uid = ' + auth.uid);
    // console.log('concerts = ' + concert.hostUid);
    // concert && console.log('concerts  ', concert.hostUid);



    const gigToDate = concert && concert.concertDate.toDate();
    const gigDate = concert && format(gigToDate, 'dddd Do MMMM');
    const gigCountdown = concert && distanceInWordsToNow(
        //     // new Date(2014, 6, 2)
        (gigToDate),
        { includeSeconds: true }
    )


    if (concert) {

        return (
            <div className="container section project-details">
                <div className="card z-depth-0">
                    {/* <PhotoUpload /> */}
                    <div className="card-content">
                        <span className="card-title">{concert.band}</span>
                        <GigPhoto concerts={concert} auth={auth} />
                        {/* <p className="card-title">{concert.city}</p> */}
                        {/* {concert.concertDate && <p >{moment(concert.concertDate.toDate()).calendar()}</p>} */}
                        <p >Venue: {concert && concert.venue}</p>
                        {/* {concert.genre && concert.genre.map((genre, index) => <div key={index} > <GenreList concert={concert} index={index} />  </div>)} */}
                        {concert.genre && concert.genre.map(gig => <span>{gig} </span>)}
                        {/* {concert.concertDate && <p >starts in: <span className="red-text">{moment(concert.concertDate.toDate()).toNow(true)}</span></p>} */}
                        {concert.concertDate && <p >starts in:  {gigCountdown}<span className="red-text">

                            {/* {moment(concert.concertDate.toDate()).toNow(true)} */}
                        </span></p>}

                        <p>{concert.description}   </p>
                    </div>
                    <div className="grey-text">
                        <p>Posted by {concert && concert.hostUsername}</p>
                        {/* {concert && <img {concert.hostPhotoUrl}</p>} */}
                        {concert && <img height="100px" src={concert.hostPhotoUrl} className="circle" />}
                        {/* {moment(concert.createdAt.toDate()).calendar()} */}

                        {/* {moment(project.createdAt.toDate()).calendar()} */}
                    </div>
                    {editButton}
                </div>
            </div >

        )
    } else {
        return (
            <div className="container center">
                <p>Loading Gig...</p>
            </div>
        )
    }




























    // if (project) {

    //     return (
    //         <div className="container section project-details">
    //             <div className="card z-depth-0">
    //                 <div className="card-content">
    //                     <span className="card-title">{project.title}</span>
    //                     <p>{project.content}   </p>
    //                 </div>
    //                 <div className="card-action gret lighten-4 grey-text">
    //                     <div>Posted {project.authorFirstName} {project.authorLastName}</div>
    //                     <div>8th November, 2am</div>
    //                 </div>
    //             </div>
    //         </div>

    //     )
    // } else {
    //     return (
    //         <div className="container center">
    //             <p>Loading project...</p>
    //         </div>
    //     )
    // }





}

const mapStateToProps = (state, ownProps) => {
    // console.log(state);
    const id = ownProps.match.params.id;
    // const projects = state.firestore.data.projects;
    // const project = projects ? projects[id] : null;

    // ---------------------------------------------------------------------------
    const concerts = state.firestore.data.concerts;
    const concert = concerts ? concerts[id] : null;
    // if(id === projects)
    return {
        // project: project,
        auth: state.firebase.auth,

        concert: concert,
        id: id
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([

        { collection: 'concerts' }
    ])
)(GigDetails)
