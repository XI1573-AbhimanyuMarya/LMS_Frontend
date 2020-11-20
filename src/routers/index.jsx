import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import ProtectedRoute from '../hoc/ProtectedRoute';
import SignIn from '../views/SignIn/index';
import Dashboard from '../views/Dasboard/index';
import CourseCatalog from '../views/learnig/LearningSelectCourses';
<<<<<<< HEAD
import Chart from '../views/Chart';
import Assigned from '../views/Assignedlearningpath'
=======
import NoCourse from '../views/LearningPath/NoCourse';

>>>>>>> 278825eba1fc3fa34dc05a9e6bcd9a35826a0475

const Routers = () => {
  return (
    <Router>
      <Switch>
        <Route path='/login' exact component={SignIn} />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <ProtectedRoute exact path="/learningpath" component={CourseCatalog} />
        <ProtectedRoute exact path="/assigned" component={NoCourse} />
        <ProtectedRoute exact path="/" component={Dashboard} />
        <ProtectedRoute exact path="/assignedlearningpath" component={Assigned} />
      </Switch>
    </Router>
  )
}

export default Routers;
