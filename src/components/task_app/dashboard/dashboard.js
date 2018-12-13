import React, { Component } from 'react'
import Notifications from './notifications'
import GigList from '../gigs/gig_list'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { getGigsForDashboard } from '../../../actions/projects_actions'
import LoadingComponent from '../layout/loading_component';


class Dashboard extends Component {

    componentDidMount() {
        this.props.getGigsForDashboard();
    }

    render() {
        const { concerts, notifications, user, loading } = this.props;

        if (loading) return <LoadingComponent />
        return (
            <>
                <div className="site-content">
                    <h2 className="title">Upcoming Gigs</h2>
                    <div className="site-content__center">

                        <div className="dashboard container">
                            {concerts[0] &&
                                <GigList concerts={concerts} user={user} loading={loading} />
                            }

                        </div>
                    </div>
                    <div className="notifications">
                        <Notifications notifications={notifications} />
                    </div>
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


        // Get gigs from query
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
            // -------------listen to notifications 
            { collection: 'notifications', limit: 6, orderBy: ['time', 'desc'] }

        ])
)(Dashboard) 
