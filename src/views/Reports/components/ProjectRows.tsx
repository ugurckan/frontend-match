import React, { useState } from "react";

// Components
import ReportTable from "./ReportTable";

// Models
import { Project } from "../../../models/project";
import { ReportState } from "../../../models/report";

// Utils
import { formatNumber } from "../../../utils/number.util";
import { getProjectPayments } from "../../../utils/report.util";

interface ProjectRowsProps {
  reportState: ReportState;
  projects: Project[];
}

const ProjectRows = ({ reportState, projects }: ProjectRowsProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const getProjectTotal = (projectId: string): number => {
    if (reportState.loading) return 0;
    return reportState.projectsTotal[projectId];
  };

  return (
    <>
      {projects?.length > 0 &&
        projects.map((project: Project, index: number) => {
          const projectPayments = getProjectPayments(
            reportState.payments,
            project.projectId
          );
          if (!projectPayments.length) {
            return <div key={`project-${index}`}></div>;
          }

          return (
            <div key={`project-${index}`}>
              <div className="row-info" onClick={() => setSelectedIndex(index)}>
                <div>{project.name}</div>
                <div>
                  TOTAL: {formatNumber(getProjectTotal(project.projectId))} USD
                </div>
              </div>
              <div className="hidden">space 2</div>
              {selectedIndex === index && (
                <ReportTable
                  payments={projectPayments}
                  gatewayId={reportState.gatewayId}
                />
              )}
            </div>
          );
        })}
    </>
  );
};

export default ProjectRows;
