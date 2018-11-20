import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addGig } from '../../../actions/projects_actions'
import { Redirect } from 'react-router-dom'
import moment from 'moment';

// import moduleName from 'date-fns'
// import Form from 'redux-form'

// import PhotoUpload from '../dashboard/photo_upload'









// import 'react-dates/initialize';
// import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
// import 'react-dates/lib/css/_datepicker.css';


// import Calendar from 'react-input-calendar'
// import InputMoment from 'input-moment'
// import 'input-moment/dist/input-moment.css'
// import {InputMoment, BigInputMoment, DatePicker, TimePicker} from 'react-input-moment';


















import Select from 'react-select';
import Datetime from 'react-datetime';
import '../../../../node_modules/react-datetime/css/react-datetime.css';
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan } from 'revalidate'


import PhotoUpload from '../dashboard/photo_upload'
// import Dropzone from 'react-dropzone'

import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'


// const formValid = ({ formErrors, ...rest }) => {
//     let valid = true;
//     console.log('forErrors =', formErrors);
//     console.log('..rest  =', rest);

//     Object.values(formErrors).forEach(value => {
//         value.length > 0 && (valid = false)
//     });

//     console.log('THE CURRENT VALUE OF THE VALID VARIABLE IS', valid);

//     Object.values(rest).forEach(currentValue => {
//         // currentInput.length === 0 && (valid = false)

//         currentValue === null && (valid = false);
//         // console.log(` the current input is invalid as it it is empty the input is`, currentValue)
//     });
//     console.log('THE CURRENT VALUE OF THE VALID VARIABLE IS', valid);
//     return valid;
// }



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
    }
];

// const validate = combineValidators({
//     band: isRequired({message: 'the Band Name field is required'}),
//     city: isRequired({message: 'a City field is required'}),
//     venue: isRequired('venue')
// })


class CreateGig extends Component {




    state = {

        band: '',
        city: '',
        venue: '',
        concertDate: '',
        genre: '',
        description: '',
        // gigImage: {

        files: [],
        fileName: '',
        cropResult: null,
        image: {},
        // },

        // band: null,
        // city: null,
        // venue: null,
        // concertDate: null,
        // genre: null,
        // description: null,
        // // gigImage: {

        // files: [],
        // fileName: '',
        // cropResult: null,
        // image: {},
        // },


        // formErrors: {
        //     band: '',
        //     city: '',
        //     venue: '',
        //     concertDate: '',
        //     genre: [],
        //     description: ''

        // }

    }
    // day: '',
    // moment: '',


    // uploadGigImage = async () => {
    //     try {
    //         await this.props.uploadGigImage(this.state.image, this.state.fileName);
    //         this.cancelCrop();
    //         console.log('the upload of the photo was sucessful yay')
    //         toastr.success('Success!', 'Your photo has been uploaded')
    //     } catch (error) {
    //         console.log('oops theres been an error while uploading the photo', error)
    //         toastr.error('Oops', error.message);
    //     }

    // }






    handleChange = (e) => {

        const { id } = e.target;
        const { value } = e.target;
        // let formErrors = this.state.formErrors;
        // console.log('the id on the handle change form event is', id);
        // console.log('the value is ', value);

        // // console.log('for error value is', formErrors);


        // switch (id) {
        //     case 'band':
        //         formErrors.band =
        //             value.length < 3
        //                 ? 'minimum 3 characters required'
        //                 : '';
        //         break;


        //     case 'venue':
        //         formErrors.venue =
        //             value.length < 2
        //                 ? 'minimum 3 characters required'
        //                 : '';
        //         break;

        //     case 'city':
        //         formErrors.city =
        //             value.length < 2
        //                 ? 'minimum 3 characters required'
        //                 : '';
        //         break;

        //     case 'description':
        //         formErrors.description =
        //             value.length < 7
        //                 ? 'minimum 7 characters required'
        //                 : '';
        //         break;

        //     case 'concertDate':
        //         formErrors.concertDate =
        //             // value.length < 7
        //             value === 'yo'
        //                 ? 'the date is valid you gangsta G'
        //                 : 'this isnt a valid date you dick face';
        //         break;
        //     default:
        //         break;








        this.setState({
            // formErrors,
            [e.target.id]: e.target.value

        })
        e.preventDefault();
    }





    handleDateChange = (e) => {
        // console.log(moment(this.state.date).toString());


    }


    handleSave = (e) => {
        // console.log(moment(this.state.date).toString());


    }


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

        console.log('the date after the input change event is ', gigDate._d);
        const date = gigDate._d;
        if (moment(gigDate).isValid()) {
            const concertDate = moment(gigDate).toDate()

            this.setState({
                ...this.state,
                concertDate: concertDate
            });
            // this.state.formErrors.concertDate = ''



        }
        else {

            let errors = { ...this.state.formErrors };
            // console.log('this is the coppy of the formerrors bit of state', errors)
            // errors.concertDate = 'Thats not a valid date you Cunt! Pick a proper date you twat';
            // this.setState(
            //     ...this.state,

            //     formErrors.concertDate: errors
            // )




            // this.setState(prevState => ({
            //     ...this.state,
            //     formErrors: {
            //         // ...prevState.formErrors,
            //         ...prevState.formErrors,
            //         concertDate: 'Pleasse select a valid date and time'
            //     }
            // }))


            // this.setState({
            //     ...this.state,
            //     formErrors: { ...formErrors, concertDate: 'this isnt a valid date you dick face' }
            // })
        }


    }


    handleSubmit = (e) => {
        e.preventDefault();

        // if (formValid(this.state)) {
        //     console.log(`
        //     submitting ---
        //     band: ${this.state.band},
        //     city: ${this.state.city},
        //     venue: ${this.state.venue},


        //     `)

        // ----- original way
        this.props.addGig(this.state);
        // this.props.history.push('/');
        // } 
        // else 
        // {
        // console.error(`form invalid`);
        // };

        //   ---- converts moment object date to a Date string
        // const parseDate = moment(this.state.date).toString();


        // this.setState({
        // date: parseDate
        // })








        // ----- original way
        // this.props.addGig(this.state);
        // this.props.history.push('/');
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
            // imgSrc: null
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
            console.log(reader.result)
            this.setState({
                imgSrc: reader.result
            })
        }, false)
        reader.readAsDataURL(currentFile)
    };




    render() {


        const imgSrc = this.state.imgSrc;

        var yesterday = Datetime.moment().subtract(1, 'day');
        var valid = function (current) {
            return current.isAfter(yesterday);
        };




        const { formErrors } = this.state;
        const { auth } = this.props;
        const { selectedOption } = this.state;

        if (!auth.uid) {
            // return <Redirect to='/login' />
        }

        // console.log('the auth props on the create project component is ', auth)
        return (
            <div className="container">
                <h5 className="grey-text text-darken-3">Add a New Gig</h5>
                <form onSubmit={this.handleSubmit} className="white">



                    {/* --------------------------------------------------------------------------- */}
                    {/* // --------------            Add Band Name                         ------------------ */}
                    <div className="input-field">
                        <label htmlFor="band" ></label>
                        <input
                            type="text"
                            id="band"
                            placeholder="Band name"
                            onChange={this.handleChange}


                        // value={this.state.email}
                        />
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
                        <label htmlFor="band" ></label>
                        <input
                            type="text" id="city"
                            placeholder="City"
                            // value={this.state.email}
                            onChange={this.handleChange} />


                        {/* {formErrors.city.length > 0 && (
                            <span className="error Message">{formErrors.city}</span>
                        )} */}

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
                        {/* {formErrors.concertDate.length > 0 && (
                            <span className="red-text">{formErrors.concertDate}</span>
                        )} */}
                    </div>







                    {/* --------------------------------------------------------------------------- */}
                    {/* // --------------            Add Venue                   ------------------ */}
                    <div className="input-field">
                        <label htmlFor="venue" ></label>
                        <input
                            type="text"
                            id="venue"
                            placeholder="Add Venue"
                            // value={this.state.email}
                            onChange={this.handleChange} />

                        {/* // {formErrors.venue.length > 0 && ( */}
                        {/* //     <span className="error Message">{formErrors.venue}</span> */}
                        {/* // )} */}
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
                            className="materialize-textarea  // />    "
                            type="text"
                            id="description"
                            placeholder="Gig description"
                            value={this.state.password}
                            onChange={this.handleChange} />
                        {/* {formErrors.description.length > 0 && (
                            <span className="error Message red-text">{formErrors.description}</span>
                        )} */}
                    </div>




                    <h5>Add Gig Photo</h5>
                    {/* <PhotoUpload /> */}
                    <div className="container">

                        <Dropzone
                            onDrop={this.onDrop}
                            multiple={false}
                            accept='image/*'
                        >

                            <div>1 Upload Photo</div>
                            <div>
                            </div>

                        </Dropzone>
                        <div>2 Resize Photo</div>
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
                        <button className="btn pink lighten-1 z-depth-0">Add Gig</button>
                    </div>

                </form>
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
        addGig: (project) => dispatch(addGig(project))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGig)






