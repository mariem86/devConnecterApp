import React, {  Fragment,  useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./component/layout/Navbar";
import Landing from "./component/layout/Landing";
import Alert from "./component/layout/Alert";

import Register from "./component/auth/Registre";
import Login from "./component/auth/Login";
import Dashboard from "./component/dashboard/Dashboard";
import CreateProfile from "./component/profile-forms/CreateProfile";
import EditProfile from "./component/profile-forms/EditProfile";
import AddExperience from "./component/profile-forms/AddExperience";
import AddEducation from "./component/profile-forms/AddEductaion";
import Profiles from "./component/profiles/Profiles";
import Profile from "./component/profile/Profile";
import Posts from "./component/posts/Posts";
import Post from "./component/post/Post";

import PrivateRoute from "./component/route/PrivateRoute";

import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import { getAuthUser } from "./js/action/authAction";


const App = () => {
  const dispatch = useDispatch();
  const getUser = () =>  dispatch(getAuthUser());
  useEffect(() => {
    getUser();
  }, []);

  return (
   
      <Router>
        
        <Fragment>
          <NavBar />
          <Route exact path="/" component={Landing} />
          <section className="container">
          <Route exact path="/alert" component={Alert} />
            <Switch>
            
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />

              <Route exact path="/profile/:id" component={Profile} />

              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />
              <PrivateRoute exact path="/posts" component={Posts} />
              <PrivateRoute exact path="/posts/:id" component={Post} />
             </Switch>
             </section>
        </Fragment>
      </Router>
    
  );
};
export default App;
