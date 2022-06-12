// Models
import { gatewayActionTypes } from "../store/actions/types";

export type FetchGatewaysRequest = {
  type: typeof gatewayActionTypes.GATEWAYS_REQUEST;
};
export type FetchGatewaysSuccess = {
  type: typeof gatewayActionTypes.GATEWAYS_SUCCESS;
  payload: any;
};
export type FetchGatewaysSuccessPayload = Gateway[];
export type FetchGatewaysFailed = {
  type: typeof gatewayActionTypes.GATEWAYS_FAILED;
  payload: any;
};
export type FetchGatewaysFailedPayload = any;

export interface Gateway {
  gatewayId: string;
  userIds: string[];
  name: string;
  type: string;
  apiKey: string;
  secondaryApiKey: string;
  description: string;
}

export type GatewayState = {
  loading: boolean;
  error: boolean;
  gateways: Gateway[];
};

export type GatewayActions = { type: string; payload: any };
