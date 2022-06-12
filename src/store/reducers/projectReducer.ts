// Models
import { ProjectActions, ProjectState } from "../../models/project";
import { projectActionTypes } from "../actions/types";

const initialState: ProjectState = {
  loading: false,
  error: false,
  projects: [],
};

const projectReducer = (state = initialState, action: ProjectActions) => {
  switch (action.type) {
    case projectActionTypes.PROJECTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case projectActionTypes.PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: action.payload.data,
        error: false,
      };
    case projectActionTypes.PROJECTS_FAILED:
      return {
        ...state,
        loading: false,
        projects: [],
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};

export default projectReducer;
