import { runSaga } from "redux-saga";

// Api
import * as reportApi from "../../api/report";

// Models
import {
  ReportParameters,
  FetchGenerateReportFailed,
  FetchGenerateReportSuccess,
} from "../../models/report";
import { Payment } from "../../models/payment";

// Store
import {
  fetchGenerateReportFailed,
  fetchGenerateReportSuccess,
} from "../actions/report";
import { fetchGenerateReportSaga } from "./report";
import { reportActionTypes } from "../actions/types";

describe("fetchGenerateReportSaga", () => {
  it("should request generateReport api and dispatch success action", async () => {
    const payments: Payment[] = [
      {
        paymentId: "6149cf567833e57669e60455",
        amount: 2663.69,
        projectId: "ERdPQ",
        gatewayId: "i6ssp",
        userIds: ["rahej"],
        modified: "2021-09-20",
        created: "2021-04-11",
      },
    ];
    const parameters: ReportParameters = {
      from: null,
      gatewayId: null,
      projectId: null,
      to: null,
    };
    const fetchReportSpy = jest
      .spyOn(reportApi, "generateReport")
      .mockImplementation(
        (): Promise<any> =>
          Promise.resolve(
            new Response(JSON.stringify(payments), { status: 200 })
          )
      );

    const dispatched: FetchGenerateReportSuccess[] = [];
    await runSaga(
      {
        dispatch: (action: any) => dispatched.push(action),
      },
      fetchGenerateReportSaga,
      { type: reportActionTypes.GENERATE_REPORT_REQUEST, payload: parameters }
    ).toPromise();

    expect(fetchReportSpy).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([fetchGenerateReportSuccess(payments)]);
    fetchReportSpy.mockClear();
  });

  it("should request generateReport api and dispatch error action", async () => {
    const errorPayload = { error: "I have failed" };
    const parameters: ReportParameters = {
      from: null,
      gatewayId: null,
      projectId: null,
      to: null,
    };
    const fetchReportSpy = jest
      .spyOn(reportApi, "generateReport")
      .mockImplementation((): Promise<any> => Promise.resolve(errorPayload));

    const dispatched: FetchGenerateReportFailed[] = [];
    await runSaga(
      {
        dispatch: (action: any) => dispatched.push(action),
      },
      fetchGenerateReportSaga,
      { type: reportActionTypes.GENERATE_REPORT_REQUEST, payload: parameters }
    ).toPromise();

    expect(fetchReportSpy).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([fetchGenerateReportFailed(errorPayload)]);
    fetchReportSpy.mockClear();
  });
});
