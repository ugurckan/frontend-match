// Models
import {
  ReportParameters,
  FetchGenerateReportRequest,
  FetchGenerateReportSuccess,
  FetchGenerateReportFailed,
  FetchGenerateReportFailedPayload,
  FetchGenerateReportSuccessPayload,
} from "../../models/report";
import { reportActionTypes } from "./types";

export const fetchGenerateReportRequest = (
  parameters: ReportParameters
): FetchGenerateReportRequest => ({
  type: reportActionTypes.GENERATE_REPORT_REQUEST,
  payload: parameters,
});

export const fetchGenerateReportSuccess = (
  payload: FetchGenerateReportSuccessPayload
): FetchGenerateReportSuccess => ({
  type: reportActionTypes.GENERATE_REPORT_SUCCESS,
  payload,
});

export const fetchGenerateReportFailed = (
  payload: FetchGenerateReportFailedPayload
): FetchGenerateReportFailed => ({
  type: reportActionTypes.GENERATE_REPORT_FAILED,
  payload,
});

export const changeParameters = (payload: ReportParameters) => ({
  type: reportActionTypes.CHANGE_REPORT_PARAMETERS,
  payload,
});
