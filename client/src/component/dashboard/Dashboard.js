import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
//import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Experience from "./Experience";
import Education from "./Eduction";

import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardAction";
import {
  getCurrentProfile,
  deleteAccount
} from "../../js/action/profileAction";

const Dashboard = () => {
  const profile = useSelector(state => state.profileReducer.profile);
    const loading = useSelector(state => state.profileReducer.loading);
    const user= useSelector(state => state.profileReducer.user);
    
  const dispatch = useDispatch();
  const getCurrenttProfil = () => dispatch(getCurrentProfile());
  useEffect(() => {
    getCurrenttProfil();
  }, []);

  return loading && profile !== null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard </h1>
      <p className="lead">
        <i className="fas fa-user" />
        Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className="my-2">
            <button
              onClick={() => dispatch (deleteAccount())}
              className="btn btn-danger"
            >
              <i className="fas fa-user-minus" />
              Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile , please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

/*const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});*/

export default Dashboard;
