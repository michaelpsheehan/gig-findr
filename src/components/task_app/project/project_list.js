import React from 'react'
import ProjectSummary from './project_summary'


const ProjectList = ({ projects }) => {
    console.log();
    //  : (<p>there are no projects found</p>)
    return (
        <>
            <div className="project-list-section    ">

                {projects && (projects.map(project => {
                    return (
                        <ProjectSummary project={project} key={project.id} />

                    )
                }
                ))
                }
            </div>


        </>
    )
}

export default ProjectList;