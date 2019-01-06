import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

import { toastr } from 'react-redux-toastr'


import GigPhoto from './gig_photo';
import CreateGig from './create_gig'
import format from 'date-fns/format'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import LoadingComponent from '../layout/loading_component';
import { Link } from 'react-router-dom'


import { withFirestore } from 'react-redux-firebase'

import { deleteGig } from '../../../actions/gig_actions'

import Button from '../form/button'

class GigDetails extends Component {
    state = {
        formToggle: false
    }

    async componentDidMount() {
        const { firestore, match } = this.props;
        let gig = await firestore.get(`concerts/${match.params.id}`);
        if (!gig.exists) {
            this.props.history.push('/error');
            toastr.error('Sorry', 'Gig not found')
        }
    }

    toggle = () => {
        this.setState({
            formToggle: !this.state.formToggle
        })
    }


    handleDeleteGig = (e) => {
        e.preventDefault();

        const id = this.props.id
        // runs the delete gig action with the current gig id
        this.props.deleteGig(id);
        // returns the user to the homepage
        this.props.history.push('/');

    }




    render() {



        const { auth, concert, id, loading } = this.props;
        const { formToggle } = this.state;

        // checks if the current user is the gig author
        const isHost = concert && auth.uid === concert.hostUid;
        const editButton = concert && isHost ? (<> <button className='btn' onClick={this.toggle} >Edit Gig</button></>) : (<></>);
        // const deleteButton = concert && isHost ? (<> <button className='btn' onClick={this.toggle} >Edit Gig</button></>) : (<></>);
        const deleteButton = concert && isHost ? (<><Button className="btn btn--delete" text='Delete Gig' onClick={this.handleDeleteGig} /></>) : (<></>);

        // generates and formats time values based on gigDate
        const gigToDate = concert && concert.concertDate.toDate();
        const gigDate = concert && format(gigToDate, 'dddd Do MMMM');
        const gigTime = concert && format(gigToDate, 'HH:mm');
        const gigCountdown = concert && distanceInWordsToNow((gigToDate), { includeSeconds: true })


        // if (loading) return <LoadingComponent />
        if (concert) {

            return (

                <div className="site-content ">
                    <div className="site-content__center">
                        <div className="gig-details-page">
                            <h2 >{concert.band}</h2>

                            <GigPhoto concerts={concert} auth={auth} loading={loading} />

                            <span className="gig-details-page__text">
                                <p ><span className="gig-details-page__text-venue">{concert && concert.venue} </span>
                                    <span className="gig-details-page__text-genres"> {concert.genre && concert.genre.map((gig, index) => <span key={`${concert.id}-${concert.genre[index]}`} > {gig} </span>)}</span></p>

                                <h4>{concert && concert.city}</h4>

                                <h4 className="gig-details-page__date">{gigDate} </h4>
                                <h4 className="gig-details-page__time"> {gigTime}</h4>
                                {concert.concertDate && <p >Starts in: <span className="red-text">{gigCountdown}</span></p>}</span>

                            <p className='gig-details-page__text-description'>{concert.description}   </p>
                        </div>

                        <div className="grey-text">
                            <p>Posted by {concert && isHost ? (<>You</>) : (<>{concert.hostUsername}</>)}</p>

                            <Link to={`/user-profile/${concert.hostUid}`}>
                                {concert && <img src={concert.hostPhotoUrl} className="avatar avatar--posted-by" alt="gig-poster-avatar" />}
                            </Link>
                        </div>
                        {!this.state.formToggle && editButton}

                        {!this.state.formToggle && deleteButton}

                        {this.state.formToggle && (<CreateGig formTitle="Edit Your Gig Details" concert={concert} id={id} />)}
                    </div>
                </div >

            )
        }
        else {
            return (
                <div className="container center">
                    <p>Loading Gig...</p>
                </div>
            )
        }



    }
}


const mapStateToProps = (state, ownProps) => {
    let gig = {}



    const id = ownProps.match.params.id;

    // ---------------------------------------------------------------------------
    const concerts = state.firestore.data.concerts;
    const concert = concerts ? concerts[id] : null;

    return {
        auth: state.firebase.auth,
        concert: concert,
        id: id,
        loading: state.async.loading
    }
}

//   add the gig functions to the props
const mapDispatchToProps = (dispatch) => {
    return {
        // addGig: (project, getGigsForDashboard) => dispatch(addGig(project, getGigsForDashboard)),
        // updateGig: (project, id) => dispatch(updateGig(project, id)),
        deleteGig: (id) => dispatch(deleteGig(id))
        // ,
        // getGigsForDashboard

    }
}



export default withFirestore(connect(mapStateToProps, mapDispatchToProps)(GigDetails));