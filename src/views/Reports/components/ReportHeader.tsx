import React from "react";

// Components
import Button from "../../../components/Button";
import Dropdown from "../../../components/Dropdown";
import Datepicker from "../../../components/Datepicker";

// Models
import { Project, ProjectState } from "../../../models/project";
import { Gateway, GatewayState } from "../../../models/gateway";
import { ReportParameters, ReportState } from "../../../models/report";

interface ReportHeaderProps {
  reportState: ReportState;
  projectState: ProjectState;
  gatewayState: GatewayState;
  changeParameters: (parameters: ReportParameters) => void;
  generate: () => void;
}

const ReportHeader = ({
  reportState,
  projectState,
  gatewayState,
  changeParameters,
  generate,
}: ReportHeaderProps) => {
  const onSelectProject = (project: Project) => {
    const projectId = project ? project.projectId : null;
    changeParameters({
      ...reportState.parameters,
      projectId: projectId,
    } as ReportParameters);
  };

  const onSelectGateway = (gateway: Gateway) => {
    const gatewayId = gateway ? gateway.gatewayId : null;
    changeParameters({
      ...reportState.parameters,
      gatewayId: gatewayId,
    } as ReportParameters);
  };

  const onDateChange = (key: "from" | "to", value: string) => {
    changeParameters({
      ...reportState.parameters,
      [key]: value,
    } as ReportParameters);
  };

  return (
    <div className="md:flex items-center justify-between">
      <div>
        <div className="text-fig-700 text-2xl font-bold">Reports</div>
        <p className="text-fig-300 font-bold">
          Easily generate a report of your transactions
        </p>
      </div>
      <div className="flex gap-4 flex-wrap mt-6 md:mt-0">
        <div>
          <div className="relative inline-block text-left">
            <Dropdown
              name="projects"
              items={projectState.projects}
              loading={projectState.loading}
              onSelect={onSelectProject}
            />
          </div>
        </div>
        <div className="basis-1/2 md:basis-auto">
          <div className="relative inline-block text-left">
            <Dropdown
              name="gateways"
              items={gatewayState.gateways}
              loading={gatewayState.loading}
              onSelect={onSelectGateway}
            />
          </div>
        </div>
        <div>
          <div className="relative inline-block text-left">
            <Datepicker
              name="from"
              label="From date"
              value={reportState?.parameters?.from || "From date"}
              onDateChange={onDateChange}
            />
          </div>
        </div>
        <div>
          <div className="relative inline-block text-left">
            <Datepicker
              name="to"
              label="To date"
              value={reportState?.parameters?.from || "To date"}
              onDateChange={onDateChange}
            />
          </div>
        </div>
        <div>
          <div className="relative inline-block text-left">
            <Button
              name="Generate report"
              onClick={generate}
              loading={reportState.loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;
