import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
//import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../js/action/postAction";
import Spinner from "../layout/Spinner";
import PostsItems from "./PostsItems"
import PostsForm from "./PostsForm"


const Posts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.postReducer.posts);
    const loading = useSelector(state => state.postReducer.loading);
  useEffect(() => {
   dispatch (getPosts());
  }, []);
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Posts</h1>
          <p className="lead">
            <i className="fas fa-user" /> Welcome to the community
          </p>
          <PostsForm/>
          <div className="posts">
            {posts.map(post => (
              <PostsItems key={post._id} post={post} />
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

/*const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Post);*/
export default Posts