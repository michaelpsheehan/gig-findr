import React from 'react'
import GigSummary from './gig_summary'
import { Link } from 'react-router-dom'
import { objectToArray } from '../../../comon/util/helpers'
import GigPhoto from './gig_photo'

const GigList = ({
    concerts,
    user }) => {
    // console.log('the concerts array in the project list section is', concerts);
    // console.log('the projects array in the project list section is', concerts);
    //  : (<p>there are no projects found</p>)
    console.log('the gig list cncerts are', concerts)
    console.log('the user in the gig list is', user)
    // const concerts = [1, 2, 3]
    // console.log('the gig list props  are', this.props)

    // const concertsArray = objectToArray(concerts)
    // console.log('the concertsArray is ------', concertsArray);
    if (concerts) {




        return (
            <>
                <div className="project-list-section col m-6    ">
                    Upcoming Concerts

                    {concerts[0] &&

                        // (concerts.map(concert => {
                        // (
                        concerts.map(concert => {
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
                        // )
                    }


                </div>



            </>
        )
    }
}
export default GigList;

