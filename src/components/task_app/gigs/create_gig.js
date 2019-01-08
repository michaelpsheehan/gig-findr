import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { withFirestore } from 'react-redux-firebase'
import moment from 'moment';
import Datetime from 'react-datetime';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import Select from 'react-select';
import '../../../../node_modules/react-datetime/css/react-datetime.css';
import 'cropperjs/dist/cropper.css'
import { toastr } from 'react-redux-toastr'
import Input from '../form/input'
import { addGig, updateGig, deleteGig, getGigsForDashboard } from '../../../actions/gig_actions'
import UploadGigPhoto from './upload_gig_photo';

import Button from '../form/button'
import { FiPlus } from 'react-icons/fi'





//------------------------------------------------------------------------------------------
// -------------------- function to validate the submitted form

//  spreads the objects into the function and uses the ..rest operator to add the rest of the state
const formValid = ({ formErrors, files, fileName, cropResult, image, hasError, ...rest }) => {
    let valid = true;

    // loop through the form errors object in state
    Object.values(formErrors).forEach(value => {
        // if any value has an error message and is not an empty string valid = false
        value.length > 0 && (valid = false)
    });

    // loops through the state of the submitted form (rest)
    Object.values(rest).forEach(currentValue => {

        // if any fields are null or an empty string valid = false
        if (currentValue === null || currentValue === '') {
            valid = false;
        }
        currentValue === null && (valid = false);
    });
    return valid;
}

//------------------------------------------------------------------------------------------
// -------------------- options for the genre select input

const options = [
    { value: 'Indie', label: 'Indie' },
    { value: 'Rock', label: 'Rock' },
    { value: 'Folk', label: 'Folk' },
    { value: 'Soul', label: 'Soul' },
    { value: 'Rap', label: 'Rap' },
    { value: 'House', label: 'House' },
    { value: 'Hip-Hop', label: 'Hip-Hop' },
    { value: 'Country', label: 'Country' },
    { value: 'Reggae', label: 'Reggae' }
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

        uploadPhotoToggle: false,

        formErrors: {
            band: '',
            city: '',
            venue: '',
            concertDate: '',
            genre: [],
            description: ''
        },


    }



    async componentDidMount() {
        const { concert, formTitle } = this.props

        if (formTitle) {
            // if the form is for an existing gig
            const date = concert.concertDate.toDate();

            if (this.state.genre === '') {

                const genres = concert.genre.map(g => {
                    return { value: g, label: g }

                });
                console.log(genres);



                this.setState({
                    band: concert.band,
                    city: concert.city,
                    venue: concert.venue,
                    concertDate: date,
                    genre: genres,
                    // genre: concert.genre,
                    // genre: concert.genre,
                    description: concert.description,
                    // defaultOptions: genres

                })
            }
        }
    }


    //------------------------------------------------------------------------------------------
    // -------------------- handles change of input values

    handleChange = (e) => {

        const { id, value } = e.target;

        let formErrors = this.state.formErrors;

        // Checks for errors in the form input values
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
            default:
                break;

        }


        // if any errors add error message to the matching field in the form error state
        this.setState({
            [e.target.id]: e.target.value
        })
        e.preventDefault();
    }


    handleSelectChange = (genre) => {
        // ----------    Strip unwanted labels and 
        // ----------    get values from Select Genre input

        // const stripInputOfLabels = arr => {
        //     let result = [];
        //     for (let current in genre) {
        //         result.push(genre[current].value);
        //     }
        //     return result;
        // };
        // let strippedInput = stripInputOfLabels(genre);


        //  sets the state with the stripped genre array
        this.setState({
            // genre:  strippedInput
            genre: genre

        });

    }


    //------------------------------------------------------------------------------------------
    // --------------------     handles concert date change

    handleConcertDateChange = (gigDate) => {
        //------- checks if the date is a valid date
        if (moment(gigDate).isValid()) {

            const concertDate = moment(gigDate).toDate()
            const errors = this.state.formErrors;


            // as the date is valid add the concert date to state 
            //  set concertDate as valid in the form errors state
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



    //------------------------------------------------------------------------------------------
    // --------------------     handles     FORM SUBMISSION

    handleSubmit = async (e) => {



        e.preventDefault();
        const editedForm = this.props.formTitle;
        const id = this.props.id
        const getGigs = this.props.getGigsForDashboard;
        console.log('getGigsfor dashboard on the creategig  = ', getGigs);
        const genreList = this.state.genre;

        const stripInputOfLabels = arr => {
            let result = [];
            for (let current in genreList) {
                result.push(genreList[current].value);
            }
            return result;
        };
        let strippedInput = stripInputOfLabels(genreList);
        console.log('genre is', genreList);
        console.log('strippedInput is ', strippedInput);

        await this.setState({
            ...this.state,
            genre: strippedInput
        });

        console.log('the state is =--- ', this.state);
        console.log('the state of genre after the stripped input is added =--- ', this.state.genre);



        // ----- checks if this is an existing gig being edited
        if (editedForm) {
            // calls the formValid function to check if the form is valid and contains no errors
            if (formValid(this.state)) {
                // as form is valid call the update Gig action to edit the gig
                this.props.updateGig(this.state, id);
                // return the user to the homepage
                this.props.history.push('/');

                toastr.success('Your Gig is being Updated', 'this may take up to 1 minute.');
            } else {
                toastr.error('Error', 'invalid form')
            }
        } else {

            if (formValid(this.state)) {
                // this is a new gig and the addGig action is called
                this.props.addGig(this.state, getGigsForDashboard);

                // return the user to the homepage
                this.props.history.push('/');

                toastr.success('Your Gig is being Uploaded', '');
            } else {
                toastr.error('Error', 'Please fill out all fields.')
            }
        }
    }


    //------------------------------------------------------------------------------------------
    // --------------------     handles file image drop to upload


    togglePhoto = () => {
        this.setState({
            uploadPhotoToggle: !this.state.uploadPhotoToggle
        })
    }


    onDrop = (files) => {
        // sets the state of max 1 file to state
        this.setState({
            files,
            fileName: files[0].name
        })

        // generates a valid image file ready to upload
        const currentFile = files[0]
        const reader = new FileReader()
        reader.addEventListener('load', () => {
            // sets the image file to state
            this.setState({
                imgSrc: reader.result
            })
        }, false)
        reader.readAsDataURL(currentFile)
    };

    //------------------------------------------------------------------------------------------
    // --------------------     handles the image crop ensuring any uploaded gig image is 16x9 aspect ratio

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


    //------------------------------------------------------------------------------------------
    // --------------------     cancels the crop and sets the image state back to empty

    cancelCrop = () => {
        this.setState({
            files: [],
            image: {}

        })

    }


    //------------------------------------------------------------------------------------------
    // --------------------     handles Deleting an existing gig

    handleDeleteGig = (e) => {
        e.preventDefault();

        const id = this.props.id
        // runs the delete gig action with the current gig id
        this.props.deleteGig(id);
        // returns the user to the homepage
        this.props.history.push('/');

    }


    render() {

        const imgSrc = this.state.imgSrc;

        // calculates current date to only allow future dates to be selected with the DatePicker Component
        var yesterday = Datetime.moment().subtract(1, 'day');
        var valid = function (current) {
            return current.isAfter(yesterday);
        };

        const { formErrors,
            // selectedOption,
            band, city, description, venue, concertDate, genre } = this.state;
        // console.log('selected option ---', selectedOption);
        const { auth, formTitle, concert } = this.props;

        // if user is not logged in redirect to the login component
        if (!auth.uid) {
            toastr.error('Only logged in users can add gigs')
            return <Redirect to='/login' />
        }

        // dynamically creates different UI elements if the gig is a new gig or an existing gig being edited
        const title = auth && formTitle ? (<>{formTitle}</>) : (<>Add a New Gig</>);
        const editText = auth && formTitle ? (<>Update Gig</>) : (<>Add Gig</>);
        const deleteButton = auth && formTitle ? (<><Button className="btn btn--delete" text='Delete Gig' onClick={this.handleDeleteGig} /></>) : (<></>);

        const div1 = auth && formTitle ? ("exisiting-gig") : ("site-content");
        const div2 = auth && formTitle ? ("") : ("site-content__center");




        return (
            <>
                <div className={div1}>
                    <div className={div2}>
                        <h2 >{title}</h2>
                        <form onSubmit={this.handleSubmit} className="add-gig-form">

                            {/* -------------------------------------------------------------------------------------------------------------------------- */}
                            {/* // --------------                         Add Band Name                                                 ------------------ */}

                            <div className="input-field">
                                <label htmlFor="band" ></label>
                                <Input type="text" id="band" placeholder="Band name" onChange={this.handleChange}
                                    value={band}
                                />

                                {/* --display possible form errors --*/}
                                {formErrors.band.length > 0 && (<span className="red-text">{formErrors.band}</span>)}
                            </div>


                            {/* -------------------------------------------------------------------------------------------------------------------------- */}
                            {/* // --------------                         Select Genre                                                  ------------------ */}
                            <div className="input-field">
                                <Select placeholder="Select genres"
                                    // value={selectedOption}
                                    options={options} isMulti={true}
                                    // defaultValue={genre}
                                    value={genre}
                                    // value={this.state.defaultOptions}
                                    // defaultValue={this.state.defaultOptions}
                                    // placeholder={genre}
                                    onChange={this.handleSelectChange} />

                                {/* --display possible form errors --*/}
                                {formErrors.genre.length > 0 && (<span className="red-text">{formErrors.genre}</span>)}

                            </div>
                            {/* -------------------------------------------------------------------------------------------------------------------------- */}
                            {/* // --------------                            Add City                                                   ------------------ */}

                            <div className="input-field">
                                <label htmlFor="city" ></label>
                                <Input type="text" id="city" placeholder="City" value={city} onChange={this.handleChange} />

                                {/* --display possible form errors --*/}
                                {formErrors.city.length > 0 && (<span className="red-text">{formErrors.city}</span>)}
                            </div>

                            {/* ---------------------------------------------------------------------------------------------------------------------------- */}
                            {/* // ---------------------------            Date Picker                              ------------------------------------------ */}

                            <div className="input-field" >
                                <label htmlFor="concertDate"  ></label>
                                <Datetime inputProps={{ placeholder: "Concert Date and Time", id: "concertDate" }} value={concertDate} isValidDate={valid} onChange={this.handleConcertDateChange} />


                                {formErrors.concertDate.length > 0 && (<span className="red-text">{formErrors.concertDate}</span>)}
                            </div>



                            {/* ---------------------------------------------------------------------------------------------------------------------------- */}
                            {/* // --------------                        Add Venue                                                        ------------------ */}

                            <div className="input-field">
                                <label htmlFor="venue" ></label>
                                <Input type="text" id="venue" placeholder="Add Venue" value={venue} onChange={this.handleChange} />

                                {formErrors.venue.length > 0 && (<span className="red-text">{formErrors.venue}</span>)}
                            </div>



                            {/* ------------------------------------------------------------------------------------------------------------------------------- */}
                            {/* // --------------                    Add Gig Description                                                     ------------------ */}

                            <div className="input-field">
                                <label htmlFor="description"></label>
                                <textarea className="text-area" type="text" id="description" placeholder="Gig description" value={description} onChange={this.handleChange} />
                                <br></br>
                                {formErrors.description.length > 0 && (<span className="red-text">{formErrors.description}</span>)}
                            </div>
                            <div className="input-field">
                                <Button className="btn btn--add-gig" text={editText} />
                                {deleteButton}

                            </div>

                            {/* ------------------------------------------------------------------------------------------------------------------------------- */}
                            {/* // --------------                    Add Gig Photo                                                   ------------------ */}


                            <div className="upload-gig-photo">

                                <div className="upload-gig-photo__add-gig-text" >

                                    <h5>{editText} Photo <FiPlus className="icon icon-plus" onClick={this.togglePhoto} /> </h5>
                                </div>

                                {this.state.uploadPhotoToggle && <div className="dropzone-area">

                                    <Dropzone onDrop={this.onDrop} multiple={false} accept='image/*' >
                                        <div>Upload Optional Custom Photo</div>
                                    </Dropzone>

                                    {/* ------------------------------------------------------------------------------------------------------------------------------- */}
                                    {/* // --------------                    Crop Image                                                  ------------------ */}
                                    <Cropper
                                        style={{ height: 200, width: '100%' }}
                                        ref='cropper'
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
                                }

                            </div>
                            {/* // --------------           Submit Form Button ------------------ */}
                            <div className="input-field">
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}



// -----------------------------------------------------------------
// ----------------  Map firebase user authentication info to the props

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }

}


//   add the gig functions to the props
const mapDispatchToProps = (dispatch) => {
    return {
        addGig: (project, getGigsForDashboard) => dispatch(addGig(project, getGigsForDashboard)),
        updateGig: (project, id) => dispatch(updateGig(project, id)),
        deleteGig: (id) => dispatch(deleteGig(id))

    }
}

export default withRouter(withFirestore(connect(mapStateToProps, mapDispatchToProps)(CreateGig)))






