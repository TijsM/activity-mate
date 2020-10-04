export const getActivity = async () => {
  const userActivity = await fetch(`https://wbsapi.withings.net/v2/measure`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "action=getactivity&startdateymd=2020-07-01&enddateymd=2020-07-02",


  });
};
