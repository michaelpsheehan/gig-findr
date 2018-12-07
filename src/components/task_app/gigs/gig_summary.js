import React from 'react';

import GenreList from './genre_list'





import axios from 'axios'
import { uploadImage } from '../../../actions/projects_actions';
import format from 'date-fns/format'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'








const GigSummary = ({ project, concert }) => {
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
    // const genreList = if(concert.genre) {
    //     console.log(concert.genre)
    // }

    return (
        // <div className="project-list section">
        //     <p>GigList</p>
        //     <div className="cars z-depth-0 project-summary">
        //         <div className="card-content grey-text text-darken-3">
        //             <span className="card-title">{project.title}</span>
        //             <p>{project.authorFirstName} {project.authorLastName}</p>
        //             <p className="grey-text">
        //                 {moment(project.createdAt.toDate()).calendar()}
        //             </p>
        //         </div>
        //     </div>
        // </div >






        <div className="dashboard__gig__details">
            {/* <p>Concerts</p> */}

            <div className="">
                <div className="">




                    <p className="dashboard__gig__details-venue">
                        {/* Venue:  */}
                        {concert.venue}</p>

                    <p className="dashboard__gig__details-genres">
                        {concert.genre && concert.genre.map(gig => <span key='`${concert.id}${concert.genre}`' > {gig} </span>)}

                    </p>





                    <p className="dashboard__gig__details-starts-in">
                        Starts in
                        </p>
                    <p className="dashboard__gig__details-countdown">
                        {gigCountdown}
                    </p>




                </div>
            </div>
        </div >

    )
}

export default GigSummary