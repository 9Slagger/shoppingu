import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { routerMiddleware } from "connected-react-router";
import rootReducers from "../_reducers";
import history from "../../routers";
import _ from "lodash";

const historyRouterMiddleware = routerMiddleware(history);

const loadState = () => {
  const serializedState = localStorage.getItem("store");
  if (serializedState === null) {
    return undefined;
  } else {
    return JSON.parse(serializedState);
  }
};

const saveState = state => {
  if (!_.isEmpty(state)) {
    localStorage.setItem("store", JSON.stringify(state));
  }
};

const loggerMiddleware = createLogger();
const store = createStore(
  rootReducers(history),
  loadState(),
  applyMiddleware(
    thunkMiddleware,
    historyRouterMiddleware,
    loggerMiddleware
  )
);

store.subscribe(() => {
  saveState(store.getState())
})

export default store;
