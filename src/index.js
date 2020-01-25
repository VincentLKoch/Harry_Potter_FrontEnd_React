import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

//Redux :
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/rootReducer";

//Saga :
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/rootSaga";

import App from "./App";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

//Init store with data from server :
store.dispatch({ type: "INIT_DATA" });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
