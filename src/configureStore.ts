import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";

// Store
import rootReducer from "./store/reducers/rootReducer";
import { rootSaga } from "./store/sagas/app";

const configureAppStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware];

  const store = configureStore({
    reducer: rootReducer,
    middleware: middlewares,
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureAppStore;
