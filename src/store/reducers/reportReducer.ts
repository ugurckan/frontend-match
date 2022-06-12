// Models
import { reportActionTypes } from "../actions/types";
import { ReportState, ReportActions, Total } from "../../models/report";

const initialState: ReportState = {
  loading: false,
  error: false,
  payments: [],
  parameters: null,
  projectId: null,
  projectsTotal: {},
  gatewayId: null,
  gatewaysTotal: {},
};

const gatewayReducer = (state = initialState, action: ReportActions) => {
  switch (action.type) {
    case reportActionTypes.GENERATE_REPORT_REQUEST:
      return {
        ...state,
        loading: true,
        parameters: action.payload,
      };
    case reportActionTypes.GENERATE_REPORT_SUCCESS:
      let projectsTotal: Total = {};
      let gatewaysTotal: Total = {};
      for (const payment of action.payload.data) {
        const projectId = payment.projectId;
        if (!projectsTotal[projectId]) {
          projectsTotal[projectId] = payment.amount;
        } else {
          projectsTotal[projectId] += payment.amount;
        }
        const gatewayId = payment.gatewayId;
        if (!gatewaysTotal[gatewayId]) {
          gatewaysTotal[gatewayId] = payment.amount;
        } else {
          gatewaysTotal[gatewayId] += payment.amount;
        }
      }

      return {
        ...state,
        loading: false,
        payments: action.payload.data,
        error: false,
        projectId: state.parameters?.projectId,
        projectsTotal: projectsTotal,
        gatewayId: state.parameters?.gatewayId,
        gatewaysTotal: gatewaysTotal,
      };
    case reportActionTypes.GENERATE_REPORT_FAILED:
      return {
        ...state,
        loading: false,
        payments: [],
        error: action.payload.error,
      };
    case reportActionTypes.CHANGE_REPORT_PARAMETERS:
      return {
        ...state,
        parameters: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default gatewayReducer;
