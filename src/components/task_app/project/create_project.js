import React, { Component } from 'react'

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
        console.log(this.state);
    }



    render() {
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
                        " type="content" id="content"
                            // value={this.state.password}
                            onChange={this.handleChange} />
                    </div>

                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Login</button>
                    </div>

                </form>

            </div>
        )
    }
}

export default CreateProject
