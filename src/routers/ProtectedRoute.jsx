import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getCurrentUser } from '../modules/authServices';

const protectedRoute = (props) => {
    const { component: Component } = props;
    const getSession =  getCurrentUser();
    
    return (
        <Route 
          render={props => (
            getSession ?
              <Component {...props} /> :
              <Redirect to='/login' />
          )} 
        />
    )
};

export default protectedRoute;