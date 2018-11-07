import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
// import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Todos from './components/todos';
import AddTodoForm from './components/add_todo_form';
import Navbar from './components/navbar';
import Home from './components/home';
import About from './components/about';
import Contact from './components/contact';


import './App.scss'




class App extends Component {

  state = {
    todos: [
      { id: 1, content: 'buy some milk' },
      { id: 2, content: 'play mario kart' }
    ]
  }

  deleteTodo = (id) => {

    console.log(id);
    const todos = this.state.todos.filter(todo => {
      return todo.id !== id
    });
    this.setState({ todos })
    console.log(this.state)

  }

  addTodo = (todo) => {
    // todo.id = Math.random();
    let todos = [...this.state.todos, todo];
    this.setState({ todos });


  };


  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route exact path='/' component={Home} />
          <Route path='/about' component={About} />
          <Route path='/contact' component={Contact} />



          <Todos
            todos={this.state.todos}
            deleteTodo={this.deleteTodo}
          />
          <AddTodoForm
            addTodo={this.addTodo}

          />




        </div>
      </BrowserRouter>
    );
  }
}

export default App;
