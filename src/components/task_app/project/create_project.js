import React, { Component } from 'react';
import { connect } from 'react-redux'
import { createProject } from '../../../actions/projects_actions'
import { Redirect } from 'react-router-dom'
import moment from 'moment';










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

import PhotoUpload from '../dashboard/photo_upload'
// import Dropzone from 'react-dropzone'


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



class CreateProject extends Component {

    state = {

        band: '',
        city: '',
        venue: '',
         concertDate: '',
        genre: [],
        description: '',


        // day: '',
        // moment: '',




    }




    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value

        })
        e.preventDefault();
      


    }

    handleDateChange = (e) => {
        console.log(moment(this.state.date).toString());


    }


    handleSave = (e) => {
        console.log(moment(this.state.date).toString());


    }


    handleSelectChange = (genre) => {



        // --------------------------------------------------------------------------
        // ----------    Strip unwanted data and 
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
        const concertDate = moment(gigDate).toDate()

        this.setState({
            concertDate
        });
    }


    handleSubmit = (e) => {
        
        //   ---- converts moment object date to a Date string
        const parseDate = moment(this.state.date).toString();
       

        this.setState({
            date: parseDate
        })





        


        // ----- original way
        e.preventDefault();
        this.props.createProject(this.state);
        this.props.history.push('/');
    }



    render() {


        var yesterday = Datetime.moment().subtract(1, 'day');
        var valid = function (current) {
            return current.isAfter(yesterday);
        };


      


        const { auth } = this.props;
        const { selectedOption } = this.state;

        if (!auth.uid) {
            return <Redirect to='/login' />
        }

        // console.log('the auth props on the create project component is ', auth)
        return (
            <div className="container">
                <h5 className="grey-text text-darken-3">Add a New Gig</h5>
                <form onSubmit={this.handleSubmit} className="white">



                    {/* --------------------------------------------------------------------------- */}
                    {/* // --------------            Add Band Name                         ------------------ */}
                    <div className="input-field">
                        <label htmlFor="band" >Band Name</label>
                        <input type="text" id="band"
                            // value={this.state.email}
                            onChange={this.handleChange} />
                    </div>




                    {/* --------------------------------------------------------------------------- */}
                    {/* // --------------            Select Genre                       ------------------ */}

                    <Select 
                        value={selectedOption}
                        onChange={this.handleSelectChange}
                        options={options}
                        isMulti={true}
                    />












                    {/* --------------------------------------------------------------------------- */}
                    {/* // --------------            Add City                        ------------------ */}
                    <div className="input-field">
                        <label htmlFor="band" >City</label>
                        <input type="text" id="city"
                            // value={this.state.email}
                            onChange={this.handleChange} />
                    </div>

                    {/* ------------------------------------------------------------------------------------------------------- */}
                    {/* // ---------------------------            Date Picker               ------------------------------------------ */}
                    <div className="input-field">
                        <label htmlFor="band" >Gig date</label>
                        <Datetime id="concertDate"
                            isValidDate={valid}
                            onChange={this.handleConcertDateChange}
                        />
                    </div>







                    {/* --------------------------------------------------------------------------- */}
                    {/* // --------------            Add Venue                   ------------------ */}
                    <div className="input-field">
                        <label htmlFor="venue" >Venue</label>
                        <input type="text" id="venue"
                            // value={this.state.email}
                            onChange={this.handleChange} />
                    </div>

              

                            {/* --------------------------------------------------------------------------- */}
                            {/* // --------------            Upload Band Image           ------------------ */}
                    <div class="file-field input-field">
                        <div className="btn">
                            <span>File</span>
                        </div>
                        <label htmlFor="bandImage" >Band Image</label>
                        <input type="file" id="bandImage"
                            // value={this.state.email}
                            onChange={this.handleChange} />
                    </div>

                            {/* --------------------------------------------------------------------------- */}
                            {/* // --------------           Add Gig Description          ------------------ */}
                    <div className="input-field">
                <label htmlFor="description">Gig description</label>
                <textarea className="materialize-textarea />
                " type="text" id="description"
                // value={this.state.password}
                onChange={this.handleChange} />
            </div>





<PhotoUpload />


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
        createProject: (project) => dispatch(createProject(project))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)






