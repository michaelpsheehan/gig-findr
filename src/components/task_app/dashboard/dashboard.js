import React, { Component } from 'react'
import Notifications from './notifications'
import GigList from '../project/gig_list'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {
    render() {
        const { concerts, auth, notifications } = this.props;



        // -------------- destructure concert collection from the props
        // -------------------------------------------------------------------------------------------------------------
        // const concerts = this.props.concerts;


        // -------------- 
        // -------------------------------------------------------------------------------------------------------------








        // if (!auth.uid) {
        //     return <Redirect to='/login' />
        // }
        // console.log(this.props)
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <GigList

                            // concerts={concerts}
                            // projects={projects}

                            //  passing down concerts as props
                            concerts={concerts}

                        />
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <Notifications notifications={notifications} />
                    </div>
                </div>

            </div>
        )
    }
}


const mapStateToProps = (state) => {


    return {
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications,

        // ---------------------------------------------------------------
        // -------------get concert info 
        concerts: state.firestore.ordered.concerts
    }


}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([

        // ---------------------------------------------------------------
        // -------------map concert info to props
        { collection: 'concerts', orderBy: ['concertDate', 'asc'] },
        // ---------------------------------------------------------------



        // { collection: 'projects', orderBy: ['createdAt', 'asc'] },
        { collection: 'notifications', limit: 50, orderBy: ['time', 'desc'] }
    ])
)(Dashboard) 
