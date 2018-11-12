import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// import { TransitionGroup, CSSTransition } from 'react-transition-group';

// import Todos from './components/todos';
// import AddTodoForm from './components/add_todo_form';
// // import Navbar from './components/navbar';
// import Home from './components/home';
// import About from './components/about';
// import Contact from './components/contact';
// import Post from './components/Post'

import Navbar from './components/task_app/layout/navbar'
import Dashboard from './components/task_app/dashboard/dashboard'
import ProjectDetails from './components/task_app/project/project_details'
import CreateProject from './components/task_app/project/create_project'
import SignIn from './components/task_app/auth/sign_in'
import SignUp from './components/task_app/auth/sign_up'


// import './App.scss'




class App extends Component {


  // -----------------------------------------------------------
  // -----------------------  To do List
  // ------------
  // state = {
  //   todos: [
  //     { id: 1, content: 'buy some milk' },
  //     { id: 2, content: 'play mario kart' }
  //   ]
  // }

  // deleteTodo = (id) => {

  //   console.log(id);
  //   const todos = this.state.todos.filter(todo => {
  //     return todo.id !== id
  //   });
  //   this.setState({ todos })
  //   console.log(this.state)

  // }

  // addTodo = (todo) => {
  //   // todo.id = Math.random();
  //   let todos = [...this.state.todos, todo];
  //   this.setState({ todos });


  // };


  // render() {
  //   return (
  //     <BrowserRouter>
  //       <div className="App">
  //         {/* <Navbar /> */}
  //         <Switch>





  //           {/* <Route exact path='/' component={Home} />
  //           <Route path='/about' component={About, Todos} />
  //           <Route path='/contact' component={Contact} />
  //           <Route path='/:post_id' component={Post} /> */}
  //           {/* <Route exact path='projects/todos' component={Todos} /> */}
  //         </Switch>




  //         {/* <Todos
  //           todos={this.state.todos}
  //           deleteTodo={this.deleteTodo}
  //         />
  //         <AddTodoForm
  //           addTodo={this.addTodo}

  //         /> */}




  //       </div>
  //     </BrowserRouter>
  //   );
  // }


  render() {

    return (
      <BrowserRouter>
        <div className="App" >
          <Navbar />
          {/* <Switch> */}
          <Route exact path='/' component={Dashboard} />
          <Route path='/login' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/create' component={CreateProject} />




          {/* <Route path='/concerts/:id' component={ProjectDetails} /> */}
          <Route path='/project/:id' component={ProjectDetails} />

          {/* </Switch> */}
          {/* <Dashboard /> */}
          {/* <Dashboard /> */}

        </div>
      </BrowserRouter >




    )

  }









}

export default App;
