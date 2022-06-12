// Models
import { projectActionTypes } from "../store/actions/types";

export type FetchProjectsRequest = {
  type: typeof projectActionTypes.PROJECTS_REQUEST;
};
export type FetchProjectsSuccess = {
  type: typeof projectActionTypes.PROJECTS_SUCCESS;
  payload: Project[];
};
export type FetchProjectsSuccessPayload = Project[];
export type FetchProjectsFailed = {
  type: typeof projectActionTypes.PROJECTS_FAILED;
  payload: any;
};
export type FetchProjectsFailedPayload = any;

export interface Project {
  projectId: string;
  userIds: string[];
  rule: string;
  gatewayIds: string[];
  structure: string;
  industry: string;
  website: string;
  description: string;
  image: string;
  name: string;
}

export type ProjectState = {
  loading: boolean;
  error: boolean;
  projects: Project[];
};

export type ProjectActions = { type: string; payload: any };
