import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT,
    SET_LOADING
  } from "../const/ActionTypes";
  
  const initialState = {
    post: null,
    posts: [],
    loading: true,
    error: {}
  };
  
  export default function(state = initialState, { type, payload }) {
    switch (type) {
        case SET_LOADING:
            return { ...state, loading: true };
      case GET_POSTS:
        return {
          ...state,
          posts: payload,
          loading: false
        };
      case GET_POST:
        return {
          ...state,
          post: payload,
          loading: false
        };
      case ADD_POST:
        return {
          ...state,
          posts: [payload, ...state.posts],
          loading: false
        };
      case POST_ERROR:
        return {
          ...state,
          error: payload,
          loading: false
        };
      case UPDATE_LIKES:
        return {
          ...state,
          posts: state.posts.map(post =>
            post._id === payload.id ? { ...post, likes: payload.likes } : post
          ),
          loading: false
        };
       
      case DELETE_POST:
        return {
          ...state,
          posts: state.posts.filter(post => post._id !== payload.id),
          loading: false
        };
  
      case ADD_COMMENT:
        return {
          ...state,
          post: { ...state.post, comments: payload },
          loading:false 
        };
      case REMOVE_COMMENT:
        return {
          ...state,
          post: {
            ...state.post,
            comments: state.post.comments.filter(comment => comment._id !== payload),
            loading:false 
          }
        };
      default:
        return state;
    }
  }


