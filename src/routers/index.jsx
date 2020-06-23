import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import EmployeeDashboardPage from '../pages/EmployeeDashboardPage';
import ManagerDashboardPage from '../pages/ManagerDashboardPage';

const routers = () => {
    return (
        <Router>
            <Switch>
                <Route
                    path='/'
                    exact={ true }
                    component={ LoginPage }
                />
                <Route
                    path='/employeeDashboard'
                    exact={ true }
                    component={ EmployeeDashboardPage }
                />
                <Route
                    path='/managerDashboard'
                    exact={ true }
                    component={ ManagerDashboardPage }
                />
            </Switch>
        </Router>
    )
}

export default routers
