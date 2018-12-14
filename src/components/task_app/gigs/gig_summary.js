import React from 'react';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
const GigSummary = ({ concert }) => {
    const gigToDate = concert.concertDate && concert.concertDate.toDate();
    const gigCountdown = concert.concertDate && distanceInWordsToNow((gigToDate), { includeSeconds: true })

    return (
        <div className="dashboard__gig__details">
            <p className="dashboard__gig__details-venue">{concert.venue}</p>
            <p className="dashboard__gig__details-genres">
                {concert.genre && concert.genre.map((gig, index) =>
                    <span key={`${concert.id}-${concert.genre[index]}`} > {gig} </span>)}
            </p>
            <p className="dashboard__gig__details-starts-in">Starts in </p>
            <p className="dashboard__gig__details-countdown">
                {gigCountdown}
            </p>
        </div >
    )
}

export default GigSummary