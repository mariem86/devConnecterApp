import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
//import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItems";
import { getProfiles } from "../../js/action/profileAction";

const Profiles = () => {
    const dispatch = useDispatch();
    const profiles = useSelector(state => state.profileReducer.profiles);
    const loading = useSelector(state => state.profileReducer.loading);
  useEffect(() => {
    dispatch (getProfiles());
  }, [getProfiles]);

  return (
    <Fragment>
      {loading ? (
        <Spinner/>
      ) : (
        <Fragment>
          <h1 className="large text-primary">Devlopers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i>
            Browse and connect with devlopers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No Profiles found ...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

/*const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);*/
export default Profiles