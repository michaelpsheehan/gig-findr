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

  render() {

    return (
      <>
        {/* <ModalManager /> */}
        <BrowserRouter>
          <div className="App" >
            <Navbar />

            <Route exact path='/' component={Dashboard} />
            <Route path='/login' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/create' component={CreateGig} />
            <Route exact path='/usersettings' component={UserAccountPage} />
            <Route path='/error' component={NotFound} />
            <Route path='/concert/:id' component={GigDetails} />
            <Route path='/user-profile/:id' component={UserProfilePage} />


          </div>
        </BrowserRouter >



      </>
    )

  }









}

export default App;
