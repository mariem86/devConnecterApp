import axios from "axios";
import { setAlert } from "./alertAction";
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  DELETE_ACCOUNT,
  GET_PROFILES,
  GET_REPOS,
  SET_LOADING,
} from "../const/ActionTypes";

//Create or update a profile
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
    dispatch(setLoading());
  try {
    const options = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
    const res = await axios.post("/api/profile", formData,options);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(
      setAlert(edit ? "Profile Updated " : "Profile Created", "success")
    );

    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get current Users Profile
export const getCurrentProfile = () => async dispatch => {
    dispatch(setLoading());
  try {
    const options = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
    const res = await axios.get("/api/profile/current",options);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get All profiles
export const getProfiles = () => async dispatch => {
  dispatch({
    type: CLEAR_PROFILE
  });

  try {
    const res = await axios.get("/api/profile/All");

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get All profile by id
export const getProfileById = userId => async dispatch => {
    dispatch(setLoading());
  try {
    const res = await axios.get(`/api/profile/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get All profile by id
export const getGithubRepos = username => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);
    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  } catch (err) {
    //handle invalid github username 
    dispatch({
      type: GET_REPOS,
      payload: null
    });
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

 


//add experience

export const addExperience = (formData, history) => async dispatch => {
    dispatch(setLoading());
  try {
    const options = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
    const res = await axios.put("/api/profile/experience", formData,options);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert("Experience Added", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//add education

export const addEducation = (formData, history) => async dispatch => {
    dispatch(setLoading());
  try {
    const options = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
    const res = await axios.put("/api/profile/education", formData,options);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert("Education Added", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Experience
export const deleteExperience = id => async dispatch => {
    dispatch(setLoading());
  try {
    const options = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
    const res = await axios.delete(`/api/profile/experience/${id}`,options);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    dispatch(setAlert("Eexperience Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Delete Education
export const deleteEducation = id => async dispatch => {
    dispatch(setLoading());
  try {
    const options = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
    const res = await axios.delete(`/api/profile/education/${id}`,options);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    dispatch(setAlert("Education Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//DELETE ACOUNT & PROFILE
export const deleteAccount = () => async dispatch => {
  if (window.confirm("Are you sure ? this can NOT be undone ")) {
    try {
        const options = {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          };
    await axios.delete(`/api/profile`,options);

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: DELETE_ACCOUNT });

      dispatch(setAlert("Your account has been permantly deleted", "primary"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

const setLoading = () => (dispatch) => {
    dispatch({
      type: SET_LOADING,
    });
  };