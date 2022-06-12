// Models
import { gatewayActionTypes } from "../actions/types";
import { GatewayActions, GatewayState } from "../../models/gateway";

const initialState: GatewayState = {
  loading: false,
  error: false,
  gateways: [],
};

const gatewayReducer = (state = initialState, action: GatewayActions) => {
  switch (action.type) {
    case gatewayActionTypes.GATEWAYS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case gatewayActionTypes.GATEWAYS_SUCCESS:
      return {
        ...state,
        loading: false,
        gateways: action.payload.data,
        error: false,
      };
    case gatewayActionTypes.GATEWAYS_FAILED:
      return {
        ...state,
        loading: false,
        gateways: [],
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};

export default gatewayReducer;
