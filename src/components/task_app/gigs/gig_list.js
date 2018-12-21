import React from 'react'
import GigSummary from './gig_summary'
import { Link } from 'react-router-dom'
import GigPhoto from './gig_photo'

const GigList = ({
    concerts,
    user, loading }) => {


    if (concerts) {
        return (
            <>
                {concerts[0] && concerts.map(concert => {
                    return (
                        <div className="dashboard__gig" key={concert.id}>
                            <Link to={`/concert/${concert.id}`}>
                                {/* <Link to={`/concertdetails/${concert.id}`}> */}
                                <GigPhoto concerts={concert} user={user} loading={loading} />
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

