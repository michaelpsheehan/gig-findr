import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { withFirestore } from 'react-redux-firebase'
    ;
import GenreList from './genre_list'

import PhotoUpload from '../dashboard/photo_upload'
import GigPhoto from './gig_photo';
import CreateGig from './create_gig'

import format from 'date-fns/format'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

import Avatar from '../../user/settings/user_avatar'

import LoadingComponent from '../layout/loading_component';
import { Link } from 'react-router-dom'



class GigDetails extends Component {
    state = {
        formToggle: false
    }

    async componentDidMount() {
        const { firestore, match, } = this.props;
        let gig = await firestore.get(`concerts/${match.params.id}`);
        if (!gig.exists) {
            this.props.history.push('/error')
        }
    }

    toggle = () => {
        this.setState({
            formToggle: !this.state.formToggle
        })
    }
    render() {



        const { auth, concert, id, loading } = this.props;
        const { formToggle } = this.state;


        const isHost = concert && auth.uid === concert.hostUid;
        // const host = concert.hostUsername    && isHost ? (<>You</>) : (<>{concert.hostUsername}</>)
        // const toggleButtonText


        // if the logged in user is the same user that created the post show the edit post form
        // const formToggle = false;
        // const editButton = concert && auth.uid === concert.hostUid ? (
        const editButton = concert && isHost ? (
            // <><h2>the uid is a match</h2></>
            <> <button className='btn' onClick={this.toggle} >Edit Gig</button>

                {/* <CreateGig formTitle="Edit Your Gig Details" concert={concert} id={id} /> */}

            </>

        ) :
            (<></>)



        const gigToDate = concert && concert.concertDate.toDate();
        const gigDate = concert && format(gigToDate, 'dddd Do MMMM');
        const gigTime = concert && format(gigToDate, 'HH:mm');
        const gigCountdown = concert && distanceInWordsToNow(
            //     // new Date(2014, 6, 2)
            (gigToDate),
            { includeSeconds: true }
        )

        // if (!concert.id) {
        //     return <Redirect to='/' />
        // }
        if (loading) return <LoadingComponent />
        if (concert) {



            return (

                <div className="site-content ">
                    {/* <PhotoUpload /> */}
                    <div className="site-content__center">
                        <div className="gig-details-page">
                            <h2 >{concert.band}</h2>
                            <GigPhoto concerts={concert} auth={auth} />

                            <span className="gig-details-page__text">
                                {/* <p className="card-title">{concert.city}</p> */}
                                {/* {concert.concertDate && <p >{moment(concert.concertDate.toDate()).calendar()}</p>} */}
                                <p ><span className="gig-details-page__text-venue">{concert && concert.venue} </span>  <span className="gig-details-page__text-genres"> {concert.genre && concert.genre.map(gig => <span>{gig} </span>)}</span></p>
                                {/* {concert.genre && concert.genre.map((genre, index) => <div key={index} > <GenreList concert={concert} index={index} />  </div>)} */}
                                <h4>{concert && concert.city}</h4>
                                <h4 className="gig-details-page__date">{gigDate} </h4>
                                <h4 className="gig-details-page__time"> {gigTime}</h4>







                                {/* {concert.genre && concert.genre.map(gig => <span>{gig} </span>)} */}
                                {/* {concert.concertDate && <p >starts in: <span className="red-text">{moment(concert.concertDate.toDate()).toNow(true)}</span></p>} */}
                                {concert.concertDate && <p >Starts in: <span className="red-text">{gigCountdown}</span></p>}</span>
                            <p className='gig-details-page__text-description'>{concert.description}   </p>
                        </div>
                        <div className="grey-text">
                            <p>Posted by {concert && isHost ? (<>You</>) : (<>{concert.hostUsername}</>)}</p>




                            <Link to={`/user-profile/${concert.hostUid}`}>
                                {concert && <img
                                    // height="100px" 
                                    src={concert.hostPhotoUrl} className=" avatar avatar--posted-by" />}



                                {/* {concert && <img height="100px" src={concert.hostPhotoUrl} className="circle" />} */}

                            </Link>
                        </div>
                        {!this.state.formToggle && editButton}
                        {this.state.formToggle && (<CreateGig formTitle="Edit Your Gig Details" concert={concert} id={id} />)}
                    </div>
                </div >

            )
        }
        else {
            return (
                <div className="container center">
                    <p>Loading Gig...</p>
                </div>
            )
        }


        // )
    }
}





// }


















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






const mapStateToProps = (state, ownProps) => {

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
        id: id,
        loading: state.async.loading
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([

        { collection: 'concerts' }
    ])
)(GigDetails)
