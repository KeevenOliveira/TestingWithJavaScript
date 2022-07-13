const keyValueToString = ([key, value]) => {
  if (typeof value === 'object' && !Array.isArray(value)) {
    throw new Error('Objects are not allowed as values');
  }

  return `${key}=${value}`;
};

module.exports.queryString = obj => {
  const keys = Object.entries(obj).map(keyValueToString);

  return keys.join('&');
};
