// Api
import { getGateways } from "../../api/gateway";
import { call, put } from "redux-saga/effects";
import { fetchGatewaysFailed, fetchGatewaysSuccess } from "../actions/gateway";

type FetchGatewaysGet = any;

export function* fetchGatewaysSaga(): FetchGatewaysGet {
  const response = yield call(getGateways);
  if (response.ok) {
    const result = yield call([response, "json"]);
    yield put(fetchGatewaysSuccess(result));
  } else {
    yield put(
      fetchGatewaysFailed({
        error: response.error,
      })
    );
  }
}
