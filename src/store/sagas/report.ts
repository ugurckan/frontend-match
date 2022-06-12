import { call, put } from "redux-saga/effects";

// Api
import { generateReport } from "../../api/report";

// Models
import { FetchGenerateReportRequest } from "../../models/report";

// Store
import {
  fetchGenerateReportFailed,
  fetchGenerateReportSuccess,
} from "../actions/report";

export function* fetchGenerateReportSaga({
  payload,
}: FetchGenerateReportRequest): any {
  const response = yield call(generateReport, payload);
  if (response.ok) {
    const result = yield call([response, "json"]);
    yield put(fetchGenerateReportSuccess(result));
  } else {
    yield put(
      fetchGenerateReportFailed({
        error: response.error,
      })
    );
  }
}
