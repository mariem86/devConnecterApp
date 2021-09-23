import {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    UPDATE_PROFILE,
    GET_PROFILES,
    SET_LOADING,
    GET_REPOS
  } from "../const/ActionTypes";
  
  const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
  };
  
  export default function(state = initialState, { type, payload }) {
    switch (type) {
        case SET_LOADING:
        return { ...state, loading: true };
      case GET_PROFILE:
      case UPDATE_PROFILE:
        return {
          ...state,
          profile: payload,
          loading: false
        };
      case GET_PROFILES:
        return {
          ...state,
          profiles: payload,
          loading: false
        };
      case GET_REPOS:
        return {
          ...state,
          repos: payload,
          loading: false
        };
  
      case PROFILE_ERROR:
        return {
          ...state,
          error: payload,
          loading: false
        };
      case CLEAR_PROFILE:
        return {
          ...state,
          profile: null,
          repos: [],
          loading: true
        };
      default:
        return state;
    }
  }
  