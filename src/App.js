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
import GigDetails from './components/task_app/gigs/gig_details'
import CreateGig from './components/task_app/gigs/create_gig'
import SignIn from './components/task_app/auth/sign_in'
import SignUp from './components/task_app/auth/sign_up'
import BasicPage from './components/user/settings/basic_page';
import UserAccountPage from './components/user/settings/user_account_page';

import ModalManager from './features/modals/modal_manager'
import NotFound from './components/task_app/layout/not_found'
import UserProfilePage from './components/user/user-profile';

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
      <>
        {/* <ModalManager /> */}
        <BrowserRouter>
          <div className="App" >
            <Navbar />
            {/* <Switch> */}
            <Route exact path='/' component={Dashboard} />
            <Route path='/login' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/create' component={CreateGig} />
            <Route exact path='/usersettings' component={UserAccountPage} />
            <Route path='/error' component={NotFound} />




            <Route path='/concert/:id' component={GigDetails} />
            <Route path='/user-profile/:id' component={UserProfilePage} />
            {/* <Route path='/project/:id' component={GigDetails} /> */}

            {/* </Switch> */}
            {/* <Dashboard /> */}
            {/* <Dashboard /> */}

          </div>
        </BrowserRouter >



      </>
    )

  }









}

export default App;
