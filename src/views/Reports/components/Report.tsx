import React from "react";

// Components
import NoReport from "./NoReport";
import ProjectRows from "./ProjectRows";
import GatewayRows from "./GatewayRows";
import ReportTable from "./ReportTable";
import ReportChart from "./ReportChart";
import LoadingSpinner from "../../../components/LoadingSpinner";

// Models
import { Gateway } from "../../../models/gateway";
import { Project } from "../../../models/project";
import { ReportChartType, ReportState } from "../../../models/report";

// Utils
import {
  getTotal,
  getItemsName,
  getProjectPayments,
} from "../../../utils/report.util";
import { classNames } from "../../../utils/style.util";
import { formatNumber } from "../../../utils/number.util";

interface ReportProps {
  reportState: ReportState;
  projects: Project[];
  gateways: Gateway[];
}

const Report = ({ reportState, projects, gateways }: ReportProps) => {
  const hasOnlyProject = (): boolean => {
    return !reportState.gatewayId && !!reportState.projectId;
  };

  const hasOnlyGateway = (): boolean => {
    return !!reportState.gatewayId && !reportState.projectId;
  };

  const hasOnlySingleId = (): boolean => {
    return hasOnlyGateway() || hasOnlyProject();
  };

  const hasNotAnyId = (): boolean => {
    return !reportState.gatewayId && !reportState.projectId;
  };

  const hasProjectAndGateway = (): boolean => {
    return !!reportState.gatewayId && !!reportState.projectId;
  };

  if (reportState.loading) {
    return <LoadingSpinner />;
  }

  if (!reportState.payments.length) {
    return <NoReport />;
  }

  return (
    <div className="grow">
      <div
        className={classNames(
          hasOnlySingleId() ? "md:grid-cols-2" : "md:grid-cols-0",
          "grid gap-6 mt-6"
        )}
      >
        <div>
          <div className="card">
            <h3 className="report-header-filter">
              {getItemsName(
                reportState.projectId,
                "projectId",
                "All projects",
                projects
              )}{" "}
              |{" "}
              {getItemsName(
                reportState.gatewayId,
                "gatewayId",
                "All gateways",
                gateways
              )}
            </h3>
            <div className="space-y-2 mt-8">
              {hasProjectAndGateway() && (
                <ReportTable
                  payments={getProjectPayments(
                    reportState.payments,
                    reportState.projectId
                  )}
                  gatewayId={reportState.gatewayId}
                />
              )}
              {hasNotAnyId() && (
                <ProjectRows reportState={reportState} projects={projects} />
              )}
              {hasOnlyProject() && (
                <GatewayRows reportState={reportState} gateways={gateways} />
              )}
              {hasOnlyGateway() && (
                <ProjectRows reportState={reportState} projects={projects} />
              )}
            </div>
          </div>
        </div>
        {hasOnlySingleId() ? (
          <ReportChart
            reportState={reportState}
            projects={projects}
            gateways={gateways}
            type={
              hasOnlyProject()
                ? ReportChartType.PROJECT
                : ReportChartType.GATEWAY
            }
          />
        ) : (
          <div className="report-footer-total">
            TOTAL : {formatNumber(getTotal(reportState.projectsTotal))} USD
          </div>
        )}
      </div>
    </div>
  );
};

export default Report;
