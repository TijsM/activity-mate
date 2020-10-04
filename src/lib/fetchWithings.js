import { buildUrl } from "./buildQueryParams";
import { getCustomWithingsDate, getLastYear } from "./getWithingsDate";

const access_token = localStorage.getItem("access_token");

export const getActivities = async () => {
  let activities = [];
  const getData = async (offset = 0) => {
    const userActivities = await fetch(
      `https://wbsapi.withings.net/v2/measure`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + access_token,
        },
        body: buildUrl({
          action: "getactivity",
          startdateymd: getLastYear(),
          enddateymd: getCustomWithingsDate(new Date()),
          offset,
        }),
      }
    );

    const temp = await userActivities.json();
    activities = activities.concat(temp.body.activities);

    if (temp.body.more) {
      await getData(temp.body.offset);
    }
  };

  await getData();

  return activities;
};
