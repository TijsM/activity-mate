import { getJsDate } from "../lib/getWithingsDate";

const getLastDays = (data, days) => {
  const todayDate = new Date();

  const lastDays = data.filter((day) => {
    const date = getJsDate(day);
    return (date.getTime() > todayDate.getTime() - 1000 * 60 * 60 * 24 * days)
  });

  return lastDays;
};

export const getByDate =(data, date) => {
  return data.find(day => day.date === date)
}

export default getLastDays;
