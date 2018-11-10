import React from 'react'
import ProjectSummary from './project_summary'
import { Link } from 'react-router-dom'


const ProjectList = ({ projects }) => {
    console.log();
    //  : (<p>there are no projects found</p>)
    return (
        <>
            <div className="project-list-section    ">

                {projects && (projects.map(project => {
                    return (
                        <Link to={`/project/${project.id}`} >
                            <ProjectSummary project={project} key={project.id} />
                        </Link>

                    )
                }
                ))
                }
            </div>


        </>
    )
}

export default ProjectList;