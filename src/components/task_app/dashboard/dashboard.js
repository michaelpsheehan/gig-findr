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

class Dashboard extends Component {

    // async componentDidMount() {
    //     const { concerts, firestore, match, history } = this.props;
    //     let gig = await firestore.get(`concerts/${match.params.id}`);
    //     if (!gig.exists) {
    //         history.push('/');

    //     }
    // }







    render() {
        const { concerts, auth, notifications, user, openModal } = this.props;


        //-----------------new add lifecycle hook  23 11 18






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
            <>
                {/* <button className="btn" onClick={() => openModal('testModal', { data: 42 })}>Open modal</button> */}


                <div className="dashboard container">
                    <div className="row">
                        <div className="col ">
                            <GigList

                                // concerts={concerts}
                                // projects={projects}

                                //  passing down concerts as props
                                concerts={concerts}
                                user={user}

                            />
                        </div>
                        <div className="col s12 m4 offset-m1">
                            <Notifications notifications={notifications} />
                            {/* <UserAccountPage /> */}
                        </div>
                    </div>

                </div>
            </>
        )
    }
}


const mapStateToProps = (state) => {


    return {
        user: state.firebase.profile,
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications,
        openModal,

        // ---------------------------------------------------------------
        // -------------get concert info 
        concerts: state.firestore.ordered.concerts
    }


}

// const query = ({ concerts }) => {
//     // console.log('the auth uid on the photo upload page is ', auth.uid);
//     return [
//         {
//             collection: 'concerts',
//             // doc: concerts.id,
//             doc: 'b4CZVBGtg7EPC5AlBQjo',
//             // doc: docName,

//             subcollections: [{ collection: 'gig_photos' }],
//             storeAs: 'gigPhotos'
//         }
//     ];
// };



export default compose(
    connect(mapStateToProps),
    firestoreConnect(
        // concerts =>


        [

            // ---------------------------------------------------------------
            // -------------map concert info to props
            { collection: 'concerts', orderBy: ['concertDate', 'asc'] },
            {
                collection: 'notifications', limit: 5
                , orderBy: ['time', 'desc']
            }


            // { collection: 'concerts', doc: 'b4CZVBGtg7EPC5AlBQjo', subcollections: [{ collection: 'gig_photos' }], saveAs: 'GigPhotos' },


            // ---------------------------------------------------------------



            // { collection: 'projects', orderBy: ['createdAt', 'asc'] },
            // ,

            // query(concerts)

        ])
)(Dashboard) 
