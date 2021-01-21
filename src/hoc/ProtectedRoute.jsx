import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Actions from "../store/actions";
import { useDispatch } from "react-redux";
import moment from "moment";
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const loginState = useSelector((response) => response.loginState);
  const dispatch = useDispatch();

  useEffect(() => {
    const loginTime = sessionStorage.getItem("USER_LOGIN_TIME");

    var now = moment().format("DD/MM/YYYY HH:mm:ss");
    var then = loginTime;

    let hours = moment
      .utc(
        moment(now, "DD/MM/YYYY HH:mm:ss").diff(
          moment(then, "DD/MM/YYYY HH:mm:ss")
        )
      )
      .format("HH:mm:ss");

    if (hours.split(":")[0] >= 23) {
      dispatch(Actions.loginActions.logout());
    }
  });

  return (
    <Route
      {...rest}
      render={(props) => {
        if (loginState.login.islogin) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
