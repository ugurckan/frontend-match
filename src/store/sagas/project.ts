// Api
import { getProjects } from "../../api/project";
import { call, put } from "redux-saga/effects";
import { fetchProjectsFailed, fetchProjectsSuccess } from "../actions/project";

type FetchProjectsGet = any;

export function* fetchProjectsSaga(): FetchProjectsGet {
  const response = yield call(getProjects);
  if (response.ok) {
    const result = yield call([response, "json"]);
    yield put(fetchProjectsSuccess(result));
  } else {
    yield put(
      fetchProjectsFailed({
        error: response.error,
      })
    );
  }
}
