import React from "react";
import TestRenderer, {
  ReactTestInstance,
  ReactTestRenderer,
} from "react-test-renderer";

// Components
import Report from "./Report";

// Models
import { Project } from "../../../models/project";
import { Gateway } from "../../../models/gateway";
import { ReportState } from "../../../models/report";

describe("Report", () => {
  let component: ReactTestRenderer;
  let componentInstance: ReactTestInstance;

  const reportState: ReportState = {
    loading: false,
    error: false,
    payments: [
      {
        paymentId: "6149cf567833e57669e60455",
        amount: 2663.69,
        projectId: "ERdPQ",
        gatewayId: "i6ssp",
        userIds: ["rahej"],
        modified: "2021-09-20",
        created: "2021-04-11",
      },
    ],
    parameters: null,
    projectId: null,
    projectsTotal: {
      ERdPQ: 2663.69,
    },
    gatewayId: null,
    gatewaysTotal: {},
  };
  const project1 = { projectId: "ERdPQ", name: "Project 1" } as Project;
  const project2 = { projectId: "24sPc", name: "Project 2" } as Project;
  const projects: Project[] = [project1, project2];
  const gateway1 = { gatewayId: "i6ssp", name: "Gateway 1" } as Gateway;
  const gateway2 = { gatewayId: "9asc2", name: "Gateway 2" } as Gateway;
  const gateways: Gateway[] = [gateway1, gateway2];

  beforeEach(() => {
    component = TestRenderer.create(
      <Report
        reportState={reportState}
        projects={projects}
        gateways={gateways}
      />
    );
    componentInstance = component.root;
  });

  describe("page", () => {
    it("should show correct values", async () => {
      /** Check if footer total row is created */
      const footerInstance = await componentInstance.findByProps({
        className: "report-footer-total",
      });
      expect(footerInstance).toBeDefined();

      /** Check if total is formatted correctly */
      const totalFooter = footerInstance.children;
      expect(totalFooter).toEqual(["TOTAL : ", "2,663.69", " USD"]);
    });

    it("should start showing all projects, and gateways", async () => {
      const filterValuesInstance = await componentInstance.findByProps({
        className: "report-header-filter",
      });
      expect(filterValuesInstance.children).toEqual([
        "All projects",
        " ",
        "|",
        " ",
        "All gateways",
      ]);
    });
  });
});
