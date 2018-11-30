import React, { Component } from 'react'
import Notifications from './notifications'
import GigList from '../gigs/gig_list'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom'
import UserAccountPage from '../../user/settings/user_account_page';
import { openModal } from '../../../features/modals/modal_actions'
import GigPhoto from '../gigs/gig_photo';
import { toastr } from 'react-redux-toastr'
import { getGigsForDashboard } from '../../../actions/projects_actions'


class Dashboard extends Component {

    componentDidMount() {
        this.props.getGigsForDashboard();
    }

    render() {
        const { concerts, auth, notifications, user, openModal } = this.props;

        return (
            <>
                <div className="dashboard container">
                    <div className="row">
                        <div className="col ">
                            <GigList
                                //  passing down concerts as props
                                concerts={concerts}
                                user={user}

                            />
                        </div>
                        <div className="col s12 m4 offset-m1">
                            <Notifications notifications={notifications} />
                        </div>
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
        openModal,

        // ---------------------------------------------------------------
        // -------------old way via listening 
        // concerts: state.firestore.ordered.concerts

        // new way to get gigs via query
        concerts: state.gigs


    }


}


export default compose(
    connect(mapStateToProps, actions),
    firestoreConnect(
        [
            // ---------------------------------------------------------------
            // -------------map concert info to props
            { collection: 'concerts', orderBy: ['concertDate', 'asc'] },
            { collection: 'notifications', limit: 5, orderBy: ['time', 'desc'] }

        ])
)(Dashboard) 
