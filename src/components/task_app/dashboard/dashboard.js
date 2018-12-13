import React, { Component } from 'react'
import Notifications from './notifications'
import GigList from '../gigs/gig_list'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';


import { openModal } from '../../../features/modals/modal_actions'

import { getGigsForDashboard } from '../../../actions/projects_actions'
import LoadingComponent from '../layout/loading_component';


class Dashboard extends Component {

    componentDidMount() {
        this.props.getGigsForDashboard();
    }

    render() {
        const {
            concerts,
            auth, notifications, user, openModal, loading, newGigAdded } = this.props;

        if (loading) return <LoadingComponent />
        // const concerts = this.props.concerts;


        // const gigys = concerts && concerts[0] ? (<>yo yo we have some concerts G like this concert {concerts[0].band}</>) : (<>we have no events g</>)

        return (
            <>
                <div className="site-content">
                    <h2 className="title">Upcoming Gigs</h2>

                    <div className="site-content__center">

                        <div className="dashboard container">
                            {/* <div className="dashboard__gigs"> */}
                            {/* <p> */}
                            {/* {gigys} */}
                            {/* {concerts && concerts[0].band} */}
                            {/* {concerts && concerts[0].band} */}
                            {/* </p> */}
                            {/* <div className="col "> */}
                            {concerts[0] && <GigList
                                //  passing down concerts as props
                                concerts={concerts}
                                user={user}
                                loading={loading}



                            />
                            }
                            {/* </div> */}
                        </div>
                    </div>
                    <div className="notifications">
                        {/* <p>Notifications</p> */}
                        <Notifications notifications={notifications} />
                    </div>

                    {/* </div> */}
                </div>
            </>
        )
    }
}


const actions = {
    getGigsForDashboard
}

const mapStateToProps = (state) => {


    return {
        user: state.firebase.profile,
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications,
        openModal,

        // ---------------------------------------------------------------
        // -------------old way via listening 
        // concerts: state.firestore.ordered.concerts

        // new way to get gigs via query
        // concerts: state.gig,
        concerts: state.gig,
        loading: state.async.loading,
        newGigAdded: state.newGigAdded


    }


}


export default compose(
    connect(mapStateToProps, actions),
    firestoreConnect(
        [
            // ---------------------------------------------------------------
            // -------------map concert info to props
            // { collection: 'concerts', orderBy: ['concertDate', 'asc'] },
            { collection: 'notifications', limit: 5, orderBy: ['time', 'desc'] }

        ])
)(Dashboard) 
