import React, { Component } from 'react';
import {connect} from 'react-redux'
import  { createProject } from '../../../actions/projects_actions'
import { Redirect } from 'react-router-dom'



class CreateProject extends Component {

    state = {
        title: '',
        content: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value

        })
        e.preventDefault();
    }

    handleSubmit = (e) => {

        e.preventDefault();
        this.props.createProject(this.state);
        this.props.history.push('/');
    }



    render() {
        const {auth} = this.props;
        
        if (!auth.uid) {
            return <Redirect to='/login' />
        }
        
        console.log('the auth props on the create project component is ', auth)
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Create New Project</h5>
                    <div className="input-field">
                        <label htmlFor="title" >Project Title</label>
                        <input type="text" id="title"
                            // value={this.state.email}
                            onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Project Content</label>
                        <textarea className="materialize-textarea />
                        " type="text" id="content"
                            // value={this.state.password}
                            onChange={this.handleChange} />
                    </div>

                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Create</button>
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
