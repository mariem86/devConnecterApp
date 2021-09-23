import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    AUTH_ERROR,
    GET_AUTH_USER,
    LOGGIN_FAIL,
    LOGGIN_SUCCESS,
   
    LOGOUT,
    DELETE_ACCOUNT
  } from "../const/ActionTypes";
  
  const initialState = {
    token: localStorage.getItem("token"),
    isAuth: null,
    loading: true,
    user: null
  };
  
  export default function(state = initialState, { type, payload }) {
    switch (type) {
      case GET_AUTH_USER:
        return {
          ...state,
          isAuth: true,
          loading: false,
          user: payload
        };
  
      case REGISTER_SUCCESS:
      case LOGGIN_SUCCESS:
        localStorage.setItem("token", payload.token);
        return {
          ...state,
          ...payload,
          isAuth: true,
          loading: false
        };
      case REGISTER_FAIL:
      case LOGGIN_FAIL:
      case AUTH_ERROR:
      case LOGOUT:
      case DELETE_ACCOUNT:
        localStorage.removeItem("token");
        return {
          ...state,
          token: null,
          isAuth: false,
          loading: false
        };
      default:
        return state;
    }
  }
  