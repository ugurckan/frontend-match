// Models
import {
  FetchGatewaysFailed,
  FetchGatewaysRequest,
  FetchGatewaysSuccess,
  FetchGatewaysFailedPayload,
  FetchGatewaysSuccessPayload,
} from "../../models/gateway";
import { gatewayActionTypes } from "./types";

export const fetchGatewaysRequest = (): FetchGatewaysRequest => ({
  type: gatewayActionTypes.GATEWAYS_REQUEST,
});

export const fetchGatewaysSuccess = (
  payload: FetchGatewaysSuccessPayload
): FetchGatewaysSuccess => ({
  type: gatewayActionTypes.GATEWAYS_SUCCESS,
  payload,
});

export const fetchGatewaysFailed = (
  payload: FetchGatewaysFailedPayload
): FetchGatewaysFailed => ({
  type: gatewayActionTypes.GATEWAYS_FAILED,
  payload,
});
