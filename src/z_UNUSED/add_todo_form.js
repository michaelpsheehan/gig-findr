import React, { Component } from 'react'

class AddTodoForm extends Component {
    state = {
        content: ''
    }

    handleChange = (e) => {
        this.setState({
            content: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state)
        this.props.addTodo(this.state);
        this.setState({
            content: ''
        })
    };


    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <label>Add new todo</label>
                    <input type="text" onChange={this.handleChange} value={this.state.content}></input>
                </form>
            </>
        )
    }
}

export default AddTodoForm; 