import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

const ProjectDetails = (props) => {
    const { project } = props;
    const { auth } = props;
    const { concert } = props;

    if (!auth.uid) {
        return <Redirect to='/login' />
    }
    if (project) {

        return (
            <div className="container section project-details">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title">{project.title}</span>
                        <p>{project.content}   </p>
                    </div>
                    <div className="card-action gret lighten-4 grey-text">
                        <div>Posted {project.authorFirstName} {project.authorLastName}</div>
                        <div>8th November, 2am</div>
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
}

const mapStateToProps = (state, ownProps) => {
    // console.log(state);
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null;

    // ---------------------------------------------------------------------------
    const concerts = state.firestore.data.projects;
    const concert = projects ? projects[id] : null;
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
