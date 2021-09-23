import axios from "axios";
import { setAlert } from "./alertAction";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  GET_AUTH_USER,
  AUTH_ERROR,
  LOGGIN_FAIL,
  LOGGIN_SUCCESS,
  LOGOUT,
  SET_LOADING,
  CLEAR_PROFILE
} from "../const/ActionTypes";


//Load User

export const getAuthUser = () => async dispatch => {
    dispatch(setLoading());

    try {
      const options = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
      const res = await axios.get("/api/auth/me", options);

      dispatch({
        type: GET_AUTH_USER,
        payload: res.data,
      });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

//Register User
export const register = ({ name, email, password }) => async dispatch => {
    dispatch(setLoading());
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/auth/register", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

   
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

//login User
export const login = (email, password) => async dispatch => {
    dispatch(setLoading());
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth/login", body, config);

    dispatch({
      type: LOGGIN_SUCCESS,
      payload: res.data
    });

   
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGGIN_FAIL
    });
  }
};

//Logout
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({
    type: LOGOUT
  });
};
const setLoading = () => (dispatch) => {
    dispatch({
      type: SET_LOADING,
    });
  };
