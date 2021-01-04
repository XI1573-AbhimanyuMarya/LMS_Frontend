import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import ProtectedRoute from "../hoc/ProtectedRoute";
import SignIn from "../views/SignIn/index";
import Dashboard from "../views/Dasboard/index";
import CourseCatalog from "../views/learnig/LearningSelectCourses";
// import Chart from '../views/Chart';
import Assigned from "../views/Assignedlearningpath/LearningPath";//CreateLearningPath";
import NoCourse from "../views/LearningPath/NoCourse";
import ManageAssignLearningPath from "../views/ManegerAssignedLearningPath";
import Approval from "../views/Approval";

const Routers = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={SignIn} />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <ProtectedRoute exact path="/learningpath" component={CourseCatalog} />
        <ProtectedRoute exact path="/assigned" component={Assigned} />
        <ProtectedRoute
          exact
          path="/manage"
          component={ManageAssignLearningPath}
        />
        <ProtectedRoute exact path="/approvals" component={Approval} />
        <ProtectedRoute exact path="/" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default Routers;
