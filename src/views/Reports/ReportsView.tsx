import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import Report from "./components/Report";
import ReportHeader from "./components/ReportHeader";

// Models
import { ReportParameters } from "../../models/report";

// Store
import {
  changeParameters,
  fetchGenerateReportRequest,
} from "../../store/actions/report";
import { fetchProjectsRequest } from "../../store/actions/project";
import { fetchGatewaysRequest } from "../../store/actions/gateway";

const ReportsView = () => {
  const dispatch = useDispatch();
  const { reportState, projectState, gatewayState } = useSelector(
    (state: any) => state
  );

  /** Change report generation parameters */
  const onChangeParameters = (parameters: ReportParameters) => {
    dispatch(changeParameters(parameters));
  };

  /** Generate reports */
  const generateReport = () => {
    dispatch(fetchGenerateReportRequest(reportState.parameters));
  };

  /** Generate initial report with all payments, and gateways */
  useEffect(() => {
    dispatch(fetchProjectsRequest());
    dispatch(fetchGatewaysRequest());
    dispatch(fetchGenerateReportRequest(new ReportParameters()));
  }, [dispatch]);

  return (
    <>
      <ReportHeader
        reportState={reportState}
        projectState={projectState}
        gatewayState={gatewayState}
        changeParameters={onChangeParameters}
        generate={generateReport}
      />
      <Report
        reportState={reportState}
        projects={projectState.projects}
        gateways={gatewayState.gateways}
      />
    </>
  );
};

export default ReportsView;
