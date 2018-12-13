import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Navbar from './components/task_app/layout/navbar'
import Dashboard from './components/task_app/dashboard/dashboard'
import GigDetails from './components/task_app/gigs/gig_details'
import CreateGig from './components/task_app/gigs/create_gig'
import SignIn from './components/task_app/auth/sign_in'
import SignUp from './components/task_app/auth/sign_up'
import UserAccountPage from './components/user/settings/user_account_page';
import NotFound from './components/task_app/layout/not_found'
import UserProfilePage from './components/user/user-profile';

class App extends Component {

  render() {

    return (
      <>
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
