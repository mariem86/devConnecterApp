import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  if (!isAuth) {
    return <Redirect to="/" />;
  }                                     // path="/" render="" exact 
  return <Route component={Component} {...rest} />;
};

export default PrivateRoute;