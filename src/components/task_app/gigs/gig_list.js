import React from 'react'
import ProjectSummary from './gig_summary'
import { Link } from 'react-router-dom'


const GigList = ({ projects, concerts }) => {
    // console.log('the concerts array in the project list section is', concerts);
    // console.log('the projects array in the project list section is', concerts);
    //  : (<p>there are no projects found</p>)

    return (
        <>
            <div className="project-list-section    ">
                Upcoming Concerts
                    {concerts && (concerts.map(concert => {
                    return (

                        <Link to={`/concert/${concert.id}`} >
                            <ProjectSummary concert={concert} key={concert.id} />
                        </Link>
                    )
                })
                )}


            </div>



        </>
    )
}
export default GigList;
