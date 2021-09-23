import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../js/action/profileAction";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
//import ProfileGithub from "./ProfileGithub";



const Profile = ({match}) => {
    const profile = useSelector(state => state.profileReducer.profile);
    const loading = useSelector(state => state.profileReducer.loading);
    const auth = useSelector(state => state.authReducer.isAuth);
    const dispatch = useDispatch();
    const getprofilebyid = () =>  dispatch(getProfileById(match.params.id));
  useEffect(() => {
    getprofilebyid()
  }, []);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {auth &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />

            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience
                    .sort(el => (!el.current ? 1 : -1))
                    .map(exp => (
                      <ProfileExperience key={exp._id} experience={exp} />
                    ))}
                </Fragment>
              ) : (
                <h4>No Experience credentials</h4>
              )}
            </div>

            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map(edu => (
                    <ProfileEducation key={edu._id} education={edu} />
                  ))}
                </Fragment>
              ) : (
                <h4>No Education credentials</h4>
              )}
            </div>
            
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

/*const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);*/
export default Profile