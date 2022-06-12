import React from "react";
import TestRenderer, {
  ReactTestInstance,
  ReactTestRenderer,
} from "react-test-renderer";

// Components
import ProjectRows from "./ProjectRows";
import ReportTable from "./ReportTable";

// Models
import { Project } from "../../../models/project";
import { ReportState } from "../../../models/report";

describe("ProjectRows", () => {
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

  beforeEach(() => {
    component = TestRenderer.create(
      <ProjectRows reportState={reportState} projects={projects} />
    );
    componentInstance = component.root;
  });

  describe("page", () => {
    it("should show correct values", async () => {
      /** Check if project row is created */
      const rowInstance = await componentInstance.findByProps({
        className: "row-info",
      });
      expect(rowInstance).toBeDefined();

      /** Check if project name is correct & total is formatted correctly */
      const projectHeader = rowInstance.children as ReactTestInstance[];
      expect(projectHeader[0].children).toEqual(["Project 1"]);
      expect(projectHeader[1].children).toEqual([
        "TOTAL: ",
        "2,663.69",
        " USD",
      ]);
    });

    it("should show first index table is visible", async () => {
      const tableInstance = await componentInstance.findByType(ReportTable);
      expect(tableInstance).toBeDefined();
    });

    it("should show second index table is not visible", async () => {
      const tableInstances = await componentInstance.findAllByType(ReportTable);
      expect(tableInstances.length).toEqual(1);
    });
  });
});
