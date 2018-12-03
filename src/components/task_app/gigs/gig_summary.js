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






        <div className="project-list section">
            {/* <p>Concerts</p> */}

            <div className="cars z-depth-0 project-summary">
                <div className="card-content grey-text text-darken-3">




                    {/* {concert.band && <span className="card-title">{concert.band} </span>} */}
                    {/* <p className="card-title">{concert.city}</p> */}
                    {/* <p className="card-title">{moment(concert.concertDate.toDate()).calendar()}</p> */}
                    <p className="card-title">Venue: {concert.venue}</p>
                    <p>

                        {/* {concert && concert.genre.map((genre, index) => {
                            return (
                                <span key={concert.id[index]} >
                                    <GenreList concert={concert} index={index} />
                                </span>

                            )
                        })} */}
                    </p>
                    <p >
                        {concert.genre && concert.genre.map(gig => <span key='`${concert.id}${concert.genre}`' > {gig} </span>)}
                        {/* {concert.genre[0].value}, {concert.genre[1].value}, */}
                        {

                        }
                        {/* {concert.genre[2].value} */}
                        {/* {console.dir(concert.genre)} */}
                    </p>

                    {/* <p className="card-title">starts <span className="red-text">{
                        // let daTime = 
                        moment(concert.concertDate.toDate()).fromNow()
                        // .format('h:mm:ss a')
r
                    }</span></p> */}

                    {/* {calcTime(concert.concertDate)} */}
                    {/* Gig Date {gigDate} */}
                    {/* {

                        concert.concertDate && format(concert.concertDate.toDate(), 'dddd Do MMMM')
                    } */}



                    Starts in {gigCountdown}


                    {/* <p className="card-title">starts in: <span className="red-text">{moment(concert.concertDate.toDate()).toNow(true)}</span></p> */}

                    {/* <button className='btn red'>See More</button> */}
                    {/* <p className="card-title">starts <span className="red-text">the time right now is {moment().format('h:mm:ss a')}</span></p> */}

                </div>
            </div>
        </div >

    )
}

export default GigSummary