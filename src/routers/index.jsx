import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import ProtectedRoute from '../hoc/ProtectedRoute';
import SignIn from '../views/SignIn/index';
import Dashboard from '../views/Dasboard/index';
import CourseCatalog from '../views/learnig/LearningSelectCourses';


const Routers = () => {
  return (
    <Router>
      <Switch>
        <Route path='/login' exact component={SignIn} />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <ProtectedRoute exact path="/learningpath" component={CourseCatalog} />
        <ProtectedRoute exact path="/" component={Dashboard} />
      </Switch>
    </Router>
  )
}

export default Routers;
