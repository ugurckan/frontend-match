import { ReportParameters } from "../models/report";

const _url = "report";

export const generateReport = (parameters: ReportParameters) => {
  return fetch(`${process.env.REACT_APP_API_URL}/${_url}`, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parameters),
  });
};
