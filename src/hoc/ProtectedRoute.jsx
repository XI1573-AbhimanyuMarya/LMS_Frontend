import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';

const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  const loginState = useSelector(response => response.loginState);

  return (
    <Route
      {...rest}
      render={props => {
        if (loginState.login.islogin) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;