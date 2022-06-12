import React from "react";
import TestRenderer, {
  ReactTestInstance,
  ReactTestRenderer,
} from "react-test-renderer";

// Components
import GatewayRows from "./GatewayRows";
import ReportTable from "./ReportTable";

// Models
import { Gateway } from "../../../models/gateway";
import { ReportState } from "../../../models/report";

describe("GatewayRows", () => {
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
    projectsTotal: {},
    gatewayId: null,
    gatewaysTotal: {
      i6ssp: 2663.69,
    },
  };
  const gateway1 = { gatewayId: "i6ssp", name: "Gateway 1" } as Gateway;
  const gateway2 = { gatewayId: "9asc2", name: "Gateway 2" } as Gateway;
  const gateways: Gateway[] = [gateway1, gateway2];

  beforeEach(() => {
    component = TestRenderer.create(
      <GatewayRows reportState={reportState} gateways={gateways} />
    );
    componentInstance = component.root;
  });

  describe("page", () => {
    it("should show correct values", async () => {
      /** Check if gateway row is created */
      const rowInstance = await componentInstance.findByProps({
        className: "row-info",
      });
      expect(rowInstance).toBeDefined();

      /** Check if gateway name is correct & total is formatted correctly */
      const gatewayHeader = rowInstance.children as ReactTestInstance[];
      expect(gatewayHeader[0].children).toEqual(["Gateway 1"]);
      expect(gatewayHeader[1].children).toEqual([
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
