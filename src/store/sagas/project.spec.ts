import { runSaga } from "redux-saga";

// Api
import * as projectApi from "../../api/project";

// Models
import {
  Project,
  FetchProjectsFailed,
  FetchProjectsSuccess,
} from "../../models/project";

// Store
import { fetchProjectsSaga } from "./project";
import { fetchProjectsFailed, fetchProjectsSuccess } from "../actions/project";

describe("fetchProjectsSaga", () => {
  it("should request getProjects api and dispatch success action", async () => {
    const projects: Project[] = [{ projectId: "Testing" }] as Project[];
    const fetchProjectSpy = jest
      .spyOn(projectApi, "getProjects")
      .mockImplementation(
        (): Promise<any> =>
          Promise.resolve(
            new Response(JSON.stringify(projects), { status: 200 })
          )
      );

    const dispatched: FetchProjectsSuccess[] = [];
    await runSaga(
      {
        dispatch: (action: any) => dispatched.push(action),
      },
      fetchProjectsSaga
    ).toPromise();

    expect(fetchProjectSpy).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([fetchProjectsSuccess(projects)]);
    fetchProjectSpy.mockClear();
  });

  it("should request getProjects api and dispatch error action", async () => {
    const errorPayload = { error: "I have failed" };
    const fetchProjectSpy = jest
      .spyOn(projectApi, "getProjects")
      .mockImplementation((): Promise<any> => Promise.resolve(errorPayload));

    const dispatched: FetchProjectsFailed[] = [];
    await runSaga(
      {
        dispatch: (action: any) => dispatched.push(action),
      },
      fetchProjectsSaga
    ).toPromise();

    expect(fetchProjectSpy).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([fetchProjectsFailed(errorPayload)]);
    fetchProjectSpy.mockClear();
  });
});
