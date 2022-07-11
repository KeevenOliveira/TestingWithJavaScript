module.exports.queryString = (obj) => {
  const keys = Object.keys(obj).map((key) => `${key}=${obj[key]}`);

  return keys.join("&");
};
