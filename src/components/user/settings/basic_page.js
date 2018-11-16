import React, { Component } from 'react'
import Select from 'react-select';
import Datetime from 'react-datetime';
import { connect } from 'react-redux'


// -----------------------------------------------------------------
// ----------------  Map firebase user authentication info to the props
// const mapStateToProps = (state) => {
//     return {
//         // auth: state.firebase.auth
//         user: state.firebase.profile
//     }

// }


// //   add the create Gig function to the props
// const mapDispatchToProps = (dispatch) => {
//     return {
//         // addGig: (project) => dispatch(addGig(project))

//     }
// }


class BasicPage extends Component {
    render() {
        return (
            <div>
                <h1>Basic Page</h1>
            </div>
        )
    }
}

export default BasicPage;




// export default connect(mapStateToProps, mapDispatchToProps)(BasicPage)
