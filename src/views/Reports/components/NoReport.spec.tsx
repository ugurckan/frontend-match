import React from "react";
import TestRenderer, {
  ReactTestInstance,
  ReactTestRenderer,
} from "react-test-renderer";

// Components
import NoReport from "./NoReport";

describe("NoReport", () => {
  let component: ReactTestRenderer;
  let componentInstance: ReactTestInstance;

  beforeEach(() => {
    component = TestRenderer.create(<NoReport />);
    componentInstance = component.root;
  });

  describe("page", () => {
    it("should show no reports text", async () => {
      let noReportsText = await componentInstance.findByProps({
        className: "no-reports-text",
      });
      expect(noReportsText.children).toEqual([
        "Currently you have no data for the reports to be generated. Once you start generating traffic through the Balance application the reports will be shown.",
      ]);
    });
  });
});
