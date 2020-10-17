import { buildUrl } from "./buildQueryParams";
import { getCustomWithingsDate, getLastYear } from "./getWithingsDate";

const access_token = localStorage.getItem("access_token");

export const getActivities = async () => {
  let activities = [];

  let lastyear = new Date();
  lastyear.setFullYear(lastyear.getFullYear() - 1);

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

export const getSleep = async () => {
  let sleep = [];

  const getData = async (offset = 0) => {
    const userSleep = await fetch(`https://wbsapi.withings.net/v2/sleep`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + access_token,
      },
      body: buildUrl({
        action: "getsummary",
        startdateymd: getLastYear(),
        enddateymd: getCustomWithingsDate(new Date()),
        offset,
        data_fields:
          "deepsleepduration,durationtosleep,durationtowakeup,hr_average,hr_max,hr_min,lightsleepduration,remsleepduration,rr_average,rr_min,rr_max,sleep_score,snoring,snoringepisodecount,wakeupcount,wakeupduration",
      }),
    });

    const temp = await userSleep.json();
    sleep = sleep.concat(temp.body.series);


    if (temp.body.more) {
      await getData(temp.body.offset);
    }
  };

  await getData();

  return sleep;
};
