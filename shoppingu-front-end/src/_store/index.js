import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
// import { routerMiddleware } from "connected-react-router";
import rootReducers from "../_reducers";
// import history from "../routers";
// const historyRouterMiddleware = routerMiddleware(history);
const loggerMiddleware = createLogger();
const store = createStore(
  rootReducers(),
  applyMiddleware(thunkMiddleware,
  // rootReducers(history),
    // historyRouterMiddleware,
    loggerMiddleware)
);

export default store;
