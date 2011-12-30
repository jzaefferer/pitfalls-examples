#!/usr/bin/env node

var connect       = require('connect');

var defaultFile = "/index.html";
var httpPort = 8085;
var httpHost = "localhost";
var staticDir = "app";
var routes = {
  home: /^\/$/,
  static: /\.(?:js|jpg|png|json|css|ico|html|manifest|mp3|txt)(?:\?.+)?$/,
  wildcard: /.*/
};

function route(app){
  app.get(routes.home, function(request, response, next) {
    request.url = defaultFile;
    next();
  });
  app.get(routes.wildcard, function(request, response, next) {
    if (!routes.static.test(request.url)) {
      request.url = defaultFile;
    }
    next();
  });
}

connect.createServer(
  connect.router(route),
  connect.logger(),
  connect.static(staticDir)
).listen(httpPort, httpHost, function() {
  console.log('HTTP Server running at http://%s:%d', httpHost, httpPort);
});
