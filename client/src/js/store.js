import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../js/reducer";

const initState = {};
const middleware = [thunk];
const devTool =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
  rootReducer,
  initState,
  compose(applyMiddleware(...middleware), devTool)
);

export default store 