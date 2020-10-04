export const buildUrl = (params) => {
  let urlParams = "";
  Object.keys(params).forEach((key, index) => {
    if (index !== 0) {
      urlParams = urlParams.concat("&");
    }
    urlParams = urlParams.concat(key);
    urlParams = urlParams.concat("=");
    urlParams = urlParams.concat(params[key]);
  });

  return urlParams;
};
