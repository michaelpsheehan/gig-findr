import React from 'react';
import moment from 'moment';

const ProjectSummary = ({ project, concert }) => {
    const calcTime = (gigTime) => {
        let startTime = moment(gigTime.toDate()).fromNow()

        // let diff = moment(startTime.format('h:mm:ss a'));

        //     // console.log('the start time is' + startTime);
        //     console.log('the difference in time is     ' +


        //     // )
    }

    return (
        // <div className="project-list section">
        //     <p>ProjectList</p>
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
                    <span className="card-title">{concert.band} </span>
                    <p className="card-title">{concert.city}</p>
                    {/* <p className="card-title">{moment(concert.concertDate.toDate()).calendar()}</p> */}
                    <p className="card-title">Venue: {concert.venue}</p>

                    <p >
                        {concert.genre[0].value}, {concert.genre[1].value},
                        {/* {concert.genre[2].value} */}

                    </p>

                    {/* <p className="card-title">starts <span className="red-text">{
                        // let daTime = 
                        moment(concert.concertDate.toDate()).fromNow()
                        // .format('h:mm:ss a')

                    }</span></p> */}

                    {calcTime(concert.concertDate)}


                    <p className="card-title">starts in: <span className="red-text">{moment(concert.concertDate.toDate()).toNow(true)}</span></p>

                    <button className='btn red'>See More</button>
                    {/* <p className="card-title">starts <span className="red-text">the time right now is {moment().format('h:mm:ss a')}</span></p> */}

                </div>
            </div>
        </div >

    )
}

export default ProjectSummary