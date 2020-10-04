import { buildUrl } from "./buildQueryParams";

const access_token = localStorage.getItem("access_token")

export const getActivity = async () => {
  const userActivity = await fetch(`https://wbsapi.withings.net/v2/measure`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer "+ access_token
    },
    body: buildUrl({
        action: "getactivity",
        startdateymd: "2020-07-01",
        enddateymd: "2020-07-02",
      })
  });
  return userActivity.json();
};
