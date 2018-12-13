import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './components/task_app/layout/navbar'
import Dashboard from './components/task_app/dashboard/dashboard'
import LoadingComponent from './components/task_app/layout/loading_component'

//  Lazy Loading setup
const CreateGig = lazy(() => import('./components/task_app/gigs/create_gig'));
const UserAccountPage = lazy(() => import('./components/user/settings/user_account_page'));
const UserProfilePage = lazy(() => import('./components/user/user-profile'));
const GigDetails = lazy(() => import('./components/task_app/gigs/gig_details'));
const SignUp = lazy(() => import('./components/task_app/auth/sign_up'));
const SignIn = lazy(() => import('./components/task_app/auth/sign_in'));
const NotFound = lazy(() => import('./components/task_app/layout/not_found'));


class App extends Component {

  render() {

    return (
      <>
        <BrowserRouter>
          <div className="App" >
            <Navbar />
            <Route exact path='/' component={Dashboard} />
            <Suspense fallback={<div><LoadingComponent />Loading...</div>} >
              <Switch >
                <Route path='/signup' component={SignUp} />
                <Route path='/login' component={SignIn} />
                <Route path='/create' component={CreateGig} />
                <Route exact path='/usersettings' component={UserAccountPage} />
                <Route path='/user-profile/:id' component={UserProfilePage} />
                <Route path='/concert/:id' component={GigDetails} />
                <Route path='/error' component={NotFound} />
              </Switch>
            </Suspense>
          </div>
        </BrowserRouter >
      </>
    )
  }
}

export default App;
