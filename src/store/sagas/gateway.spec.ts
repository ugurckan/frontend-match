import { runSaga } from "redux-saga";

// Api
import * as gatewayApi from "../../api/gateway";

// Models
import {
  Gateway,
  FetchGatewaysFailed,
  FetchGatewaysSuccess,
} from "../../models/gateway";

// Store
import { fetchGatewaysSaga } from "./gateway";
import { fetchGatewaysFailed, fetchGatewaysSuccess } from "../actions/gateway";

describe("fetchGatewaysSaga", () => {
  it("should request getGateways api and dispatch success action", async () => {
    const gateways: Gateway[] = [{ gatewayId: "Testing" }] as Gateway[];
    const fetchGatewaySpy = jest
      .spyOn(gatewayApi, "getGateways")
      .mockImplementation(
        (): Promise<any> =>
          Promise.resolve(
            new Response(JSON.stringify(gateways), { status: 200 })
          )
      );

    const dispatched: FetchGatewaysSuccess[] = [];
    await runSaga(
      {
        dispatch: (action: any) => dispatched.push(action),
      },
      fetchGatewaysSaga
    ).toPromise();

    expect(fetchGatewaySpy).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([fetchGatewaysSuccess(gateways)]);
    fetchGatewaySpy.mockClear();
  });

  it("should request getGateways api and dispatch error action", async () => {
    const errorPayload = { error: "I have failed" };
    const fetchGatewaySpy = jest
      .spyOn(gatewayApi, "getGateways")
      .mockImplementation((): Promise<any> => Promise.resolve(errorPayload));

    const dispatched: FetchGatewaysFailed[] = [];
    await runSaga(
      {
        dispatch: (action: any) => dispatched.push(action),
      },
      fetchGatewaysSaga
    ).toPromise();

    expect(fetchGatewaySpy).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([fetchGatewaysFailed(errorPayload)]);
    fetchGatewaySpy.mockClear();
  });
});
