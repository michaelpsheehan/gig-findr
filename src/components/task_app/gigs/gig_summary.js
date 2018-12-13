import React from 'react';

import GenreList from './genre_list'





import axios from 'axios'
import { uploadImage } from '../../../actions/projects_actions';
import format from 'date-fns/format'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'








const GigSummary = ({ concert }) => {
    const calcTime = (gigTime) => {

        // let startTime = concert.concertDate && moment(gigTime.toDate()).fromNow()
        let startTime = concert.concertDate && format(gigTime, 'dddd Do MMMM')


    }



    const gigToDate = concert.concertDate && concert.concertDate.toDate();
    const gigDate = concert.concertDate && format(gigToDate, 'dddd Do MMMM');

    const gigCountdown = concert.concertDate && distanceInWordsToNow(
        // new Date(2014, 6, 2)
        (gigToDate),
        { includeSeconds: true }
    )


    return (

        <div className="dashboard__gig__details">


            {/* <div className="">
                <div className=""> */}




            <p className="dashboard__gig__details-venue">
                {/* Venue:  */}
                {concert.venue}</p>

            <p className="dashboard__gig__details-genres">
                {concert.genre && concert.genre.map((gig, index) => <span key={`${concert.id}-${concert.genre[index]}`} > {gig} </span>)}

            </p>





            <p className="dashboard__gig__details-starts-in">
                Starts in
                        </p>
            <p className="dashboard__gig__details-countdown">
                {gigCountdown}
            </p>




            {/* </div>
            </div> */}
        </div >

    )
}

export default GigSummary