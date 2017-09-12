module.exports = apiServiceFactory;

const debugLogger = require('./debug-logger');

const axios = require('axios');

function apiServiceFactory (opts) {
  var debugInstance;
  var instance;

  function apiService (url, params, callback) {
  var data = {
    method: 'get',
    url: url,
    params: Object.assign({}, opts.baseParams, params),
    headers: opts.headers
  };

    return runAxios(opts, data)
      .then(result => {
    callback(null, result.data);
    return result.data;
  })
  .catch(error => {
    callback(error.response);
    return Promise.reject(error.response);
  });
}

  function runAxios (opts, data) {
    if (opts.debug) {
      if (!debugInstance) {
        debugInstance = axios.create();
        debugLogger(debugInstance, opts.debug);
}
      return debugInstance(data);
  } else {
      if (!instance) {
        instance = axios.create();
  }
      return instance(data);
      }
      }

  return apiService;
}