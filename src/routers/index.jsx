import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { getCurrentUser } from '../modules/authServices';
import ProtectedRoute from './ProtectedRoute';
import Toastr from '../utils/Toastr';

import SignIn from '../views/SignIn/index';
import Dashboard from '../views/Dasboard/index';

class Routers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false
        }
    }
    componentDidMount() {
        
        const getSession =  getCurrentUser();
        if(getSession && getSession.jwt) {
            this.setState({isAuthenticated: true});
        }
    }
    render() {
        const { isAuthenticated } = this.state;
        const { props } = this.props;
        return (
            <Router>
                <Toastr />
                <Switch>
                    <Route
                        path='/'
                        exact={ true }
                        component={ SignIn }
                    />
                    <Route
                        path='/login'
                        exact={ true }
                        component={ SignIn }
                    />
                    {/* <ProtectedRoute 
                        path='/employeeDashboard' 
                        component={EmployeeDashboardPage} 
                    /> */}
                    <ProtectedRoute 
                        path='/dashboard' 
                        component={Dashboard} 
                    />
                
                </Switch>
            </Router>
        )
    }
    
}

export default Routers;
