import axios from "axios";
import { setAlert } from "./alertAction";
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  SET_LOADING,
  REMOVE_COMMENT
} from "../const/ActionTypes";

//Get Posts
export const getPosts = () => async dispatch => {
   // dispatch(setLoading());
  try {
    const options = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
    const res = await axios.get("/api/posts/all",options);
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
 
      
  }
};

//ADD LIKE
export const addLike = postId => async dispatch => {
   // dispatch(setLoading());
  try {
    const options = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
    const res = await axios.put(`/api/posts/like/${postId}`,options);
    dispatch({
      type: UPDATE_LIKES,
      payload:{ id: postId,likes:res.data}
    });
  } catch (err) {
    
    
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
 
      
 
  }
};

//Remove Like
export const removeLike = postId => async dispatch => {
    //dispatch(setLoading());
  try {
    const options = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
    const res = await axios.put(`/api/posts/unlike/${postId}`,options);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id: postId,likes:res.data}
    });
  } catch (err) {
    
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
 
 
  }
};

//Remove Post
export const deletePost = postId => async dispatch => {
    //dispatch(setLoading());
  try {
    const options = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
    await axios.delete(`/api/posts/delete/${postId}`,options);
    dispatch({
      type: DELETE_POST,
      payload: { id: postId }
    });
    dispatch(setAlert("Post has been removed", "success"));
  } catch (err) {
    
    
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
 
      
 
  }
};
//Add Post
export const addPost = newPost => async dispatch => {
  if (!newPost.text.trim()) {
    return dispatch(setAlert("Add a valid text to publish a post", "danger"));
  }

  try {
    const options = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
    const res = await axios.post(`/api/posts/CreatePost`, newPost,options);
    dispatch({
      type: ADD_POST,
      payload: res.data
    });
    dispatch(setAlert("Post created", "success"));
  } catch (err) {
    
    
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
 
      
  
  }
};
//Get Post
export const getPostById = id => async dispatch => {
  // dispatch(setLoading());
  try {
    const options = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
    const res = await axios.get(`/api/posts/${id}`,options);
    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
 
      
  
  }
};

//Add Comment
export const addComment = (postId, formData) => async dispatch => {
  if (!formData.text.trim()) {
    return dispatch(setAlert("Add a valid text to add a comment", "danger"));
  }

  try {
    const options = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
    const res = await axios.post(`/api/posts/comment/${postId}`, formData,options);
    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });
  dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    
    
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
 
      
  
  }
};

//Remove a Comment
export const removeComment = (postId, commentId) => async dispatch => {
  try {
    const options = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
    const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`,options);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });
    dispatch(setAlert("Comment Removed", "success"));
  } catch (err) {
  
    
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
 
      
  
  }
};
const setLoading = () => (dispatch) => {
    dispatch({
      type: SET_LOADING,
    });
  };