// Models
import {
  FetchProjectsRequest,
  FetchProjectsSuccess,
  FetchProjectsFailed,
  FetchProjectsFailedPayload,
  FetchProjectsSuccessPayload,
} from "../../models/project";
import { projectActionTypes } from "./types";

export const fetchProjectsRequest = (): FetchProjectsRequest => ({
  type: projectActionTypes.PROJECTS_REQUEST,
});

export const fetchProjectsSuccess = (
  payload: FetchProjectsSuccessPayload
): FetchProjectsSuccess => ({
  type: projectActionTypes.PROJECTS_SUCCESS,
  payload,
});

export const fetchProjectsFailed = (
  payload: FetchProjectsFailedPayload
): FetchProjectsFailed => ({
  type: projectActionTypes.PROJECTS_FAILED,
  payload,
});
