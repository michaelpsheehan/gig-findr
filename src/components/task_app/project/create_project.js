import React, { Component } from 'react';
import {connect} from 'react-redux'
import  { createProject } from '../../../actions/projects_actions'
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

const options = [
    { value: 'Indie'
    , label: 'Indie' 
},
    { value: 'Rock'
    , label: 'Rock' 
},
    { value: 'Folk'
    , label: 'Folk'
 }
  ];
   



class CreateProject extends Component {
    
    state = {
        
        band: '',
        city: '',
        venue: '',
        concertDate: new Date(Date.UTC(96, 1, 2, 3, 4, 5)),
        genre: [],
        description: '',
        
        
        day: '',
        moment: '',
        
       
        
        
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
            
        })
        e.preventDefault();
        // console.log(moment(this.state.date).toString());
        // console.dir(this.state.date);
        console.log( 'the moment date to a date is' , moment(this.state.date).toDate());
        console.log( 'the moment date to a string is' , moment(this.state.date).toString());
        console.log( 'the moment date to a unix is' , moment.unix(this.state.date).utc());
        
        
    }
    
    handleDateChange = (e) => {
        console.log(moment(this.state.date).toString());
        
        
    }


    handleSave = (e) => {
        console.log(moment(this.state.date).toString());
        
        
    }


    handleSelectChange = (genre) => {

        let stripInputOfLabels = arr => {
            let result = [];
      
            for (let current in genre) {
              result.push(genre[current].value);
              // console.log(genres[genre].value);
            }
            return result;
        };
        let strippedInput = stripInputOfLabels(genre);
        console.log('the value of the result is ', strippedInput)

        // console.log(`the value of the option is:`, genre[0].value);
        this.setState({ 
            genre: strippedInput
         });
        console.log(`Option selected:`, genre);
      }

    
    handleSubmit = (e) => {
        console.log(moment(this.state.date).toString());
        const parseDate = moment(this.state.date).toString();
        // const parseDate = this.state.date.toString();
        this.setState({
    date: parseDate
    
    
})





console.log('the state on form submit is below');
console.dir(this.state);


// ----- original way
        e.preventDefault();
        this.props.createProject(this.state);
        this.props.history.push('/');
    }
    
    
    
    render() {
        const {auth} = this.props;
        const { selectedOption } = this.state;
        if (!auth.uid) {
            return <Redirect to='/login' />
        }
        
        console.log('the auth props on the create project component is ', auth)
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




    <Select
        value={selectedOption}
        onChange={this.handleSelectChange}
        options={options}
    isMulti={true}
      />











                  
{/* --------------------------------------------------------------------------- */}
{/* // --------------            Add City                        ------------------ */}
                    <div className="input-field">
                        <label htmlFor="city" >City</label>
                        <input type="text" id="city"
                            // value={this.state.email}
                            onChange={this.handleChange} />
                    </div>

{/* ------------------------------------------------------------------------------------------------------- */}
{/* // ---------------------------            Date Picker               ------------------------------------------ */}

{/* //         <SingleDatePicker */}
{/* //   date={this.state.date} // momentPropTypes.momentObj or null
//   onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
//   focused={this.state.focused} // PropTypes.bool
//   onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
//   id="day" // PropTypes.string.isRequired,

//   onChange={this.handleDateChange}
// /> */}

{/* --------------------------------------------------------------------------- */}
{/* // --------------            Add Venue                        ------------------ */}
                    <div className="input-field">
                        <label htmlFor="venue" >Venue</label>
                        <input type="text" id="venue"
                            // value={this.state.email}
                            onChange={this.handleChange} />
                    </div>

{/* --------------------------------------------------------------------------- */}
{/* // --------------            Add Gig TIme                        ------------------ */}
                    {/* <div className="input-field">
                        <label htmlFor="concertDate" >Concert Date</label>
                        <input className='date' type="time" id="concertDate"
                        // value={this.state.email}
                        onChange={this.handleChange} />
                    </div> */}




{/* --------------------------------------------------------------------------- */}
{/* // --------------            Add Genre                        ------------------ */}
                        {/* <label htmlFor="genre" >genres</label> */}
                    
                    {/* // value={this.state.email}
                    // <div className="input-field">
                    <select type="select" id="genre"
                            onChange={this.handleChange} >
                        // </div> */}
<div className="input-field">

<select>
<option value="Indie">Rock</option>
<option value="Rock">Rock</option>
<option value="Folk">Rock</option>

                            </select>
</div>

      



            <div className="input-field">
                <label htmlFor="description">Gig description</label>
                <textarea className="materialize-textarea />
                " type="text" id="description"
                // value={this.state.password}
                onChange={this.handleChange} />
            </div>



                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Add Gig</button>
                    </div>

                </form>
            </div>

        )
    }
}
















const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }

}


const mapDispatchToProps = (dispatch) => {
return {
    createProject: (project) => dispatch(createProject(project)) 

}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)








// class CreateProject extends Component {

//     state = {
//         title: '',
//         content: ''
//     }

//     handleChange = (e) => {
//         this.setState({
//             [e.target.id]: e.target.value

//         })
//         e.preventDefault();
//     }

//     handleSubmit = (e) => {

//         e.preventDefault();
//         this.props.createProject(this.state);
//         this.props.history.push('/');
//     }



//     render() {
//         const {auth} = this.props;
        
//         if (!auth.uid) {
//             return <Redirect to='/login' />
//         }
        
//         console.log('the auth props on the create project component is ', auth)
//         return (
//             <div className="container">
//                 <form onSubmit={this.handleSubmit} className="white">
//                     <h5 className="grey-text text-darken-3">Create New Project</h5>
//                     <div className="input-field">
//                         <label htmlFor="title" >Project Title</label>
//                         <input type="text" id="title"
//                             // value={this.state.email}
//                             onChange={this.handleChange} />
//                     </div>
//                     <div className="input-field">
//                         <label htmlFor="password">Project Content</label>
//                         <textarea className="materialize-textarea />
//                         " type="text" id="content"
//                             // value={this.state.password}
//                             onChange={this.handleChange} />
//                     </div>

//                     <div className="input-field">
//                         <button className="btn pink lighten-1 z-depth-0">Create</button>
//                     </div>

//                 </form>

//             </div>




//         )
//     }
// }





