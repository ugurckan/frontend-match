import { takeEvery, takeLatest } from "redux-saga/effects";

// Models
import {
  gatewayActionTypes,
  projectActionTypes,
  reportActionTypes,
} from "../actions/types";

// Store
import { fetchProjectsSaga } from "./project";
import { fetchGatewaysSaga } from "./gateway";
import { fetchGenerateReportSaga } from "./report";

export function* rootSaga() {
  yield takeLatest(projectActionTypes.PROJECTS_REQUEST, fetchProjectsSaga);
  yield takeLatest(gatewayActionTypes.GATEWAYS_REQUEST, fetchGatewaysSaga);
  yield takeLatest(
    reportActionTypes.GENERATE_REPORT_REQUEST,
    fetchGenerateReportSaga
  );
}
