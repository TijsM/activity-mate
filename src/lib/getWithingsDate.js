export const getCustomWithingsDate = (date) => {
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1).toString()
      : date.getMonth() + 1;
  const day =
    date.getDate() + 1 < 10
      ? "0" + (date.getDate() + 1).toString()
      : date.getDate();

  return `${year}-${month}-${day}`;
};

export const getLastYear = () => {
  let lastyear = new Date();
  lastyear.setFullYear(lastyear.getFullYear() - 1);

  return getCustomWithingsDate(lastyear);
};

export const getYesterday = () => {
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return getCustomWithingsDate(yesterday);
};

export const getDayBeforeDate = (withingsDate) => {
  const date = getJsDate(withingsDate)
  date.setDate(date.getDate() - 1);

  return getCustomWithingsDate(date);
}


export const getJsDate = (withingsDate) => {
  const date = new Date(
    withingsDate.date.split("-")[0],
    withingsDate.date.split("-")[1] - 1,
    withingsDate.date.split("-")[2]
  );

  return date;
}
