export default (minutes, separator = ':', sufix='') => {
  const hr = Math.floor((minutes / 60) % 24);
  const min = Math.round(((((minutes / 60) % 24) - hr) / 100) * 60 * 100);
  return `${hr}${separator}${min < 10 ? `0${min}` : min}${sufix}`;
};
