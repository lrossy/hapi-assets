var _ = require('lodash');

exports.register = function (plugin, options, next) {

  var environment = process.env.NODE_ENV || 'development';

  // Hook onto the 'onPostHandler'
  plugin.ext('onPostHandler', function (request, next) {
    // Get the response object
    var response = request.response;

    // Check to see if the response is a view
    if (response.variety === 'view') {
      // console.log(response.source.template);
      var tmp = response.source.template;
      if (_.isEmpty(response.source.context.assets)) {
        response.source.context.assets = {};
      }
      var env = options[environment];
      var out = env[response.source.template];
      if (out === undefined) {
        out = env["default"];
      }
      response.source.context.assets = out;
    }
    return next();
  });
  return next();
};

exports.register.attributes = {
  pkg: require("./package.json")
};