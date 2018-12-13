import React from 'react'
import GigSummary from './gig_summary'
import { Link } from 'react-router-dom'
import GigPhoto from './gig_photo'

const GigList = ({
    concerts,
    user }) => {


    if (concerts) {

        return (
            <>
                {concerts[0] && concerts.map(concert => {
                    return (
                        <div className="dashboard__gig" key={concert.id}>
                            <Link to={`/concert/${concert.id}`}>
                                <GigPhoto concerts={concert} user={user} />
                                <GigSummary concert={concert} key={concert.id} />
                            </Link>
                        </div>
                    )
                })
                }
            </>
        )
    }
}
export default GigList;

