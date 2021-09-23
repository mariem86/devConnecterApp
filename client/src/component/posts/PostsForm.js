import React, { useState } from "react";
import PropTypes from "prop-types";
//import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../js/action/postAction";

const PostsForm = () => {
    const dispatch = useDispatch();
  const [text, setText] = useState("");
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={e => {
          e.preventDefault();
         dispatch (addPost({ text }));
          setText("");
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          value={text}
          onChange={e => setText(e.target.value)}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

PostsForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

/*export default connect(null, { addPost })(PostForm);*/
export default PostsForm;