import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment';
import GenreList from './genre_list'

const ProjectDetails = (props) => {
    const { project } = props;
    const { auth } = props;
    const { concert } = props;
    // console.log(concert.selectedGenre[0].value);

    // if (!auth.uid) {
    //     return <Redirect to='/login' />
    // }

    if (concert) {

        return (
            <div className="container section project-details">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title">{concert.band}</span>
                        <p className="card-title">{concert.city}</p>
                        <p >{moment(concert.concertDate.toDate()).calendar()}</p>
                        <p >Venue: {concert.venue}</p>
                        {concert && concert.genre.map((genre, index) => <GenreList concert={concert} index={index} />)}

                        <p >starts in: <span className="red-text">{moment(concert.concertDate.toDate()).toNow(true)}</span></p>

                        <p>{concert.description}   </p>
                    </div>
                    <div className="grey-text">
                        <p>Posted by {concert.authorFirstName} {concert.authorLastName}</p>
                        {moment(concert.createdAt.toDate()).calendar()}

                        {/* {moment(project.createdAt.toDate()).calendar()} */}
                    </div>
                </div>
            </div>

        )
    } else {
        return (
            <div className="container center">
                <p>Loading project...</p>
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
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null;

    // ---------------------------------------------------------------------------
    const concerts = state.firestore.data.concerts;
    const concert = concerts ? concerts[id] : null;
    // if(id === projects)
    return {
        project: project,
        auth: state.firebase.auth,

        concert: concert
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'projects' },
        { collection: 'concerts' }
    ])
)(ProjectDetails)
