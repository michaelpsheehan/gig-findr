import React from 'react';
import moment from 'moment';
import GenreList from './genre_list'





import axios from 'axios'
import { uploadImage } from '../../../actions/projects_actions';









const ProjectSummary = ({ project, concert }) => {
    const calcTime = (gigTime) => {

        let startTime = concert.concertDate && moment(gigTime.toDate()).fromNow()


    }




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

                    {/* gs://task-e5ee4.appspot.com/band-image-min-1.jpg */}


                    {
                        // axios.get('https://firebasestorage.googleapis.com/v0/b/task-e5ee4.appspot.com/o/band-image-min-1.jpg?alt=media&token=68738688-23ba-4388-82cb-57e10bc237c3')

                        // axios.get('gs://task-e5ee4.appspot.com/band-image-min-1.jpg')
                        // .then(res => this.setState({ image: res.data }))
                        // .catch(err => console.log(err))


                    }



                    <span className="card-title">{concert.band} </span>
                    <p className="card-title">{concert.city}</p>
                    {/* <p className="card-title">{moment(concert.concertDate.toDate()).calendar()}</p> */}
                    <p className="card-title">Venue: {concert.venue}</p>
                    <p>

                        {concert && concert.genre.map((genre, index) => {
                            return (
                                <span>
                                    <GenreList concert={concert} index={index} />
                                </span>

                            )
                        })}
                    </p>
                    <p >
                        {/* {concert.genre[0].value}, {concert.genre[1].value}, */}
                        {

                        },
                        {/* {concert.genre[2].value} */}
                        {/* {console.dir(concert.genre)} */}
                    </p>

                    {/* <p className="card-title">starts <span className="red-text">{
                        // let daTime = 
                        moment(concert.concertDate.toDate()).fromNow()
                        // .format('h:mm:ss a')

                    }</span></p> */}

                    {calcTime(concert.concertDate)}


                    {/* <p className="card-title">starts in: <span className="red-text">{moment(concert.concertDate.toDate()).toNow(true)}</span></p> */}

                    {/* <button className='btn red'>See More</button> */}
                    {/* <p className="card-title">starts <span className="red-text">the time right now is {moment().format('h:mm:ss a')}</span></p> */}

                </div>
            </div>
        </div >

    )
}

export default ProjectSummary