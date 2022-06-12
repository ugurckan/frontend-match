import { combineReducers } from "redux";

// Reducers
import reportReducer from "./reportReducer";
import projectReducer from "./projectReducer";
import gatewayReducer from "./gatewayReducer";

const rootReducer = combineReducers({
  reportState: reportReducer,
  projectState: projectReducer,
  gatewayState: gatewayReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
