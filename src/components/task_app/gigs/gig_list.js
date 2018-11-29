import React from 'react'
import GigSummary from './gig_summary'
import { Link } from 'react-router-dom'

import GigPhoto from './gig_photo'

const GigList = ({ projects, concerts, user }) => {
    // console.log('the concerts array in the project list section is', concerts);
    // console.log('the projects array in the project list section is', concerts);
    //  : (<p>there are no projects found</p>)

    return (
        <>
            <div className="project-list-section col m-6    ">
                Upcoming Concerts

                    {concerts && (concerts.map(concert => {
                    return (

                        <Link to={`/concert/${concert.id}`
                        }

                            key={concert.id}

                        >
                            <GigPhoto concerts={concert} user={user} />
                            <GigSummary concert={concert} key={concert.id} />
                        </Link>
                    )
                })
                )}


            </div>



        </>
    )
}
export default GigList;

