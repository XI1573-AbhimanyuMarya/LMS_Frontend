import React from 'react'
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import SignIn from '../views/SignIn/index';
import Dashboard from '../views/Dasboard/index';

const Routers = () => {
    const loginState = useSelector(response => response.loginState);
    return (
        <Router>
            {
                !loginState.login.islogin ?
                    (<Switch>
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
                        <Redirect to='/' />
                    </Switch>) :
                    (<Switch>
                        <Route
                            path='/dashboard'
                            component={Dashboard}
                        />
                        <Redirect to='/dashboard' />
                    </Switch>)
            }
        </Router>
    )
}

export default Routers;
