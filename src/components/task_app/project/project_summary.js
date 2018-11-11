import React from 'react'

const ProjectSummary = ({ project }) => {
    return (
        <div className="project-list section">
            <p>ProjectList</p>
            <div className="cars z-depth-0 project-summary">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{project.title}</span>
                    <p>{project.authorFirstName} {project.authorLastName}</p>
                    <p className="grey-text">{project.createdAt.toDate().toString()}</p>
                </div>
            </div>
        </div >



    )
}

export default ProjectSummary