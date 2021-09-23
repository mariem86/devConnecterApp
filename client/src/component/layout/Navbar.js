import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../js/action/authAction";

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.authReducer.isAuth);
  const loading = useSelector(state => state.authReducer.loading);
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />{" "}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <a href="#!" onClick={() => dispatch(logout())}>
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm"> Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Devleopers</Link>
      </li>

      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {!loading && <Fragment>{isAuth ? authLinks : guestLinks}</Fragment>}
    </nav>
  );
};

Navbar.prototype = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
/*
const mapStateToProps = state => ({
  auth: state.auth
});*/

export default Navbar;
