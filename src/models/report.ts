// Models
import { Payment } from "./payment";
import { reportActionTypes } from "../store/actions/types";

export type FetchGenerateReportRequest = {
  type: typeof reportActionTypes.GENERATE_REPORT_REQUEST;
  payload: ReportParameters;
};
export type FetchGenerateReportSuccess = {
  type: typeof reportActionTypes.GENERATE_REPORT_SUCCESS;
  payload: Payment[];
};
export type FetchGenerateReportSuccessPayload = Payment[];
export type FetchGenerateReportFailed = {
  type: typeof reportActionTypes.GENERATE_REPORT_FAILED;
  payload: any;
};
export type FetchGenerateReportFailedPayload = any;

export class ReportParameters {
  from: string | null;
  to: string | null;
  projectId: string | null;
  gatewayId: string | null;

  constructor() {
    this.from = null;
    this.to = null;
    this.projectId = null;
    this.gatewayId = null;
  }
}

export type Total = { [id: string]: number };

export type ReportState = {
  loading: boolean;
  error: boolean;
  payments: Payment[];
  parameters: ReportParameters | null;
  projectId: string | null;
  projectsTotal: Total;
  gatewayId: string | null;
  gatewaysTotal: Total;
};

export type ReportActions = { type: string; payload: any };

export enum ReportChartType {
  PROJECT = "PROJECT",
  GATEWAY = "GATEWAY",
}
