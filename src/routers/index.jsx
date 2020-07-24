import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Toastr from '../utils/Toastr';

import SignIn from '../views/SignIn/index';
import Dashboard from '../views/Dasboard/index';

const Routers = () => {
    return (
        <Router>
            <Toastr />
            <Switch>
                <Route
                    path='/'
                    exact={true}
                    component={SignIn}
                />
                <Route
                    path='/login'
                    exact={true}
                    component={SignIn}
                />
                <ProtectedRoute
                    path='/dashboard'
                    component={Dashboard}
                />

            </Switch>
        </Router>
    )
}



export default Routers;
