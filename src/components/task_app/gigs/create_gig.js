import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addGig, updateGig, deleteGig } from '../../../actions/projects_actions'
import { Redirect, withRouter } from 'react-router-dom'
import moment from 'moment';
import Input from '../form/input'

import { withFirestore } from 'react-redux-firebase'

import { toastr } from 'react-redux-toastr'


import Select from 'react-select';
import Datetime from 'react-datetime';
import '../../../../node_modules/react-datetime/css/react-datetime.css';

// import PhotoUpload from '../dashboard/photo_upload'


import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'


const formValid = ({ formErrors, files, fileName, cropResult, image, hasError, ...rest }) => {
    let valid = true;


    Object.values(formErrors).forEach(value => {
        value.length > 0 && (valid = false)
    });



    Object.values(rest).forEach(currentValue => {

        if (currentValue === null || currentValue === '') {

            valid = false;

        }


        currentValue === null && (valid = false);

    });

    return valid;
}



const options = [
    {
        value: 'Indie'
        , label: 'Indie'
    },
    {
        value: 'Rock'
        , label: 'Rock'
    },
    {
        value: 'Folk'
        , label: 'Folk'
    },
    {
        value: 'Soul'
        , label: 'Soul'
    },
    {
        value: 'Rap'
        , label: 'Rap'
    },
    {
        value: 'House'
        , label: 'House'
    },
    {
        value: 'Hip-Hop'
        , label: 'Hip-Hop'
    },
    {
        value: 'Country'
        , label: 'Country'
    },
    {
        value: 'Reggae'
        , label: 'Reggae'
    }
];




class CreateGig extends Component {



    state = {

        band: '',
        city: '',
        venue: '',
        concertDate: '',
        genre: '',
        description: '',
        files: [],
        fileName: '',
        cropResult: null,
        image: {},


        formErrors: {
            band: '',
            city: '',
            venue: '',
            concertDate: '',
            genre: [],
            description: ''

        },
        hasError: true


    }






    handleChange = (e) => {

        const { id } = e.target;
        const { value } = e.target;
        let formErrors = this.state.formErrors;
        let isValid = this.state.isValid;



        switch (id) {
            case 'band':
                formErrors.band =
                    value.length < 1
                        ? 'minimum 1 character required'
                        : '';
                break;


            case 'venue':
                formErrors.venue =
                    value.length < 2
                        ? 'minimum 3 characters required'
                        : '';
                break;

            case 'city':
                formErrors.city =
                    value.length < 2
                        ? 'minimum 3 characters required'
                        : '';
                break;

            case 'description':
                formErrors.description =
                    value.length < 7
                        ? 'minimum 7 characters required'
                        : '';
                break;

            // case 'concertDate':
            //     formErrors.concertDate =

            //         value === 'yo'
            //             ? 'This date is valid'
            //             : 'This is an invalid date';
            //     break;
            default:
                break;

        }


        this.setState({
            // formErrors,
            [e.target.id]: e.target.value

        })
        e.preventDefault();
    }





    // handleDateChange = (e) => {



    // }


    // handleSave = (e) => {



    // }


    handleSelectChange = (genre) => {



        // --------------------------------------------------------------------------
        // ----------    Strip unwanted labels and 
        // ----------    get values from Select Genre


        const stripInputOfLabels = arr => {
            let result = [];

            for (let current in genre) {
                result.push(genre[current].value);
            }
            return result;
        };
        let strippedInput = stripInputOfLabels(genre);


        //  sets the state with the stripped genre array
        this.setState({
            genre: strippedInput
        });

    }


    handleConcertDateChange = (gigDate) => {


        // const date = gigDate._d;

        // -----------------------------------------------------
        //------- checks if the date is a valid date
        if (moment(gigDate).isValid()) {

            const concertDate = moment(gigDate).toDate()
            const errors = this.state.formErrors;


            // as the date is valid add the concert date to state 
            //  set concertDate to an empty string in the form errors state
            this.setState({
                ...this.state,
                concertDate: concertDate,
                formErrors: { ...errors, concertDate: '' }
            });

        }
        else {
            const errors = this.state.formErrors;

            //  as the date is invalid do not update the main state 
            //  set concertDate to an error message in the form errors state
            this.setState({
                ...this.state,
                formErrors: { ...errors, concertDate: 'this is an invalid Date' }
            })
        }


    }



    handleSubmit = (e) => {
        e.preventDefault();
        const editedForm = this.props.formTitle;
        const id = this.props.id


        // ----- original way
        if (editedForm) {
            if (formValid(this.state)) {

                this.props.updateGig(this.state, id);

                this.props.history.push('/');

                toastr.success('Your Gig is being Updated', 'this may take up to 1 minute.');
            } else {
                toastr.error('Error', 'invalid form')

            }
        } else {
            if (formValid(this.state)) {

                this.props.addGig(this.state);
                this.props.history.push('/');
                toastr.success('Your Gig is being Uploaded', '');
            } else {
                toastr.error('Error', 'invalid form')

            }
        }


    }


    handleUpdate = (e) => {
        e.preventDefault();

    }

    cropImage = () => {
        if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {
            return;
        }
        this.refs.cropper.getCroppedCanvas().toBlob(blob => {
            let imageUrl = URL.createObjectURL(blob);
            this.setState({
                cropResult: imageUrl,
                image: blob

            })
        }, 'image / jpg')
    }



    cancelCrop = () => {
        this.setState({
            files: [],
            image: {}

        })

    }


    onDrop = (files) => {
        this.setState({
            files,
            fileName: files[0].name
        })

        const currentFile = files[0]
        const reader = new FileReader()
        reader.addEventListener('load', () => {

            this.setState({
                imgSrc: reader.result
            })
        }, false)
        reader.readAsDataURL(currentFile)
    };

    handleDeleteGig = (e) => {
        e.preventDefault();
        const id = this.props.id


        this.props.deleteGig(id);
        this.props.history.push('/');

    }


    render() {

        const imgSrc = this.state.imgSrc;

        var yesterday = Datetime.moment().subtract(1, 'day');
        var valid = function (current) {
            return current.isAfter(yesterday);
        };




        const { formErrors, selectedOption } = this.state;
        const { auth, formTitle, concert } = this.props;
        // const { selectedOption } = this.state;




        if (!auth.uid) {
            toastr.error('Only logged in users can add gigs')
            return <Redirect to='/login' />
        }

        const title = auth && formTitle ? (<>{formTitle}</>) : (<>Add a New Gig</>);
        const editText = auth && formTitle ? (<>Edit</>) : (<>Add</>);
        const deleteButton = auth && formTitle ? (<>


            <button className="btn btn--delete">Delete Gig</button>


        </>) : (<></>);

        return (

            <div className="site-content">
                <div className="site-content__center">
                    <h2 >

                        {title}
                    </h2>
                    <form onSubmit={this.handleSubmit} className="add-gig-form">



                        {/* --------------------------------------------------------------------------- */}
                        {/* // --------------            Add Band Name                         ------------------ */}
                        <div className="input-field">
                            <label htmlFor="band" ></label>
                            <Input
                                type="text"
                                id="band"
                                placeholder="Band name"
                                // placeholder={bandName}
                                // value={concert.band}
                                onChange={this.handleChange}


                            // value={this.state.email}
                            />



                            {/* <input
                            type="text"
                            id="band"
                            placeholder="Band name"
                            // placeholder={bandName}
                            onChange={this.handleChange}


                        // value={this.state.email}
                        /> */}
                        </div>





                        {/* --------------------------------------------------------------------------- */}
                        {/* // --------------            Select Genre                       ------------------ */}

                        <Select
                            placeholder="Select genres"
                            value={selectedOption}
                            options={options}
                            isMulti={true}
                            onChange={this.handleSelectChange}
                        />
                        {/*                     
 {formErrors.band.length > 0 && (
                        <span className="error Message">{formErrors.band}</span>
                        )}
 */}










                        {/* --------------------------------------------------------------------------- */}
                        {/* // --------------            Add City                        ------------------ */}
                        <div className="input-field">
                            <label htmlFor="city" ></label>
                            <Input
                                type="text" id="city"
                                placeholder="City"
                                // value={this.state.email}
                                onChange={this.handleChange} />


                            {formErrors.city.length > 0 && (
                                <span className="error Message">{formErrors.city}</span>
                            )}

                        </div>

                        {/* ------------------------------------------------------------------------------------------------------- */}
                        {/* // ---------------------------            Date Picker               ------------------------------------------ */}
                        <div className="input-field" >
                            <label htmlFor="concertDate"  ></label>

                            <Datetime
                                // id="concertDate"
                                inputProps={{ placeholder: "Concert Date and Time", id: "concertDate" }}
                                isValidDate={valid}
                                onChange={this.handleConcertDateChange}
                            // onChange={this.handleChange}
                            />
                            {formErrors.concertDate.length > 0 && (
                                <span className="red-text">{formErrors.concertDate}</span>
                            )}
                        </div>







                        {/* --------------------------------------------------------------------------- */}
                        {/* // --------------            Add Venue                   ------------------ */}
                        <div className="input-field">
                            <label htmlFor="venue" ></label>
                            <Input
                                type="text"
                                id="venue"
                                placeholder="Add Venue"
                                // value={this.state.email}
                                onChange={this.handleChange} />

                            {formErrors.venue.length > 0 && (
                                <span className="error Message">{formErrors.venue}</span>
                            )}
                        </div>



                        {/* --------------------------------------------------------------------------- */}
                        {/* // --------------            Upload Band Image           ------------------ */}
                        {/* <div className="file-field input-field">
                        <div className="btn">
                        <span>Upload Image</span>
                        </div>
                        <label htmlFor="bandImage" ></label>
                        <input
                        type="file"
                        id="bandImage"
                        placeholder="Upload Band Image"
                        // value={this.state.email}
                        onChange={this.handleChange} />
                    </div> */}

                        {/* <PhotoUpload /> */}


                        {/* --------------------------------------------------------------------------- */}
                        {/* // --------------           Add Gig Description          ------------------ */}
                        <div className="input-field">
                            <label htmlFor="description"></label>
                            <textarea
                                className="text-area"
                                type="text"
                                id="description"
                                placeholder="Gig description"
                                value={this.state.password}
                                onChange={this.handleChange} />
                            {formErrors.description.length > 0 && (
                                <span className="error Message red-text">{formErrors.description}</span>
                            )}
                        </div>




                        <h5>{editText} Gig Photo</h5>
                        {/* <PhotoUpload /> */}
                        <div className="dropzone-area">

                            <Dropzone
                                onDrop={this.onDrop}
                                multiple={false}
                                accept='image/*'
                            >

                                <div>Upload Optional Custom Photo</div>
                                <div>
                                </div>

                            </Dropzone>
                            {/* <div></div> */}
                            {/* {this.state.files[0] && */}
                            <Cropper
                                style={{ height: 200, width: '100%' }}
                                ref='cropper'
                                // src={this.state.files[0].preview}
                                src={imgSrc}
                                aspectRatio={16 / 9}
                                viewMode={0}
                                dragMode='move'
                                guides={false}
                                scalable={true}
                                cropBoxMovable={true}
                                cropBoxResizable={true}
                                crop={this.cropImage}
                            />



                        </div>


                        {/* --------------------------------------------------------------------------- */}
                        {/* // --------------           Submit Form Button                     ------------------ */}
                        <div className="input-field">
                            <button
                                //  disabled={this.state.hasError} 
                                className="btn btn--add-gig">{editText} Gig</button>
                        </div>

                    </form>
                    <form onSubmit={this.handleDeleteGig} className="form--delete">
                        {deleteButton}
                    </ form>


                </div>
            </div>


        )
    }

}


// }














// -----------------------------------------------------------------
// ----------------  Map firebase user authentication info to the props

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }

}


//   add the create Gig function to the props
const mapDispatchToProps = (dispatch) => {
    return {
        addGig: (project) => dispatch(addGig(project)),
        updateGig: (project, id) => dispatch(updateGig(project, id)),
        deleteGig: (id) => dispatch(deleteGig(id))

    }
}

export default withRouter(withFirestore(connect(mapStateToProps, mapDispatchToProps)(CreateGig)))






