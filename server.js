#!/usr/bin/env node

var connect = require('connect');
var fs = require('fs');
var handlebars = require('handlebars');

var httpPort = 8085;
var httpHost = "localhost";
var staticDir = "app";
var routes = {
  home: /^\/$/,
  photo: /^\/photos\/.+/
};

// TODO tell nodemon to restart when this changes
var homeTemplate = fs.readFileSync('app/gallery/index.html', 'utf8');
var template = handlebars.compile( homeTemplate );

function route(app) {
  app.get(routes.photo, function(request, response, next) {
    // TODO lookup description from same datasource as client
    // also use that to generate list of images on index
    response.end(template({indexActive: "", src: request.url.replace("/photos", "") + ".jpg", description: "..."}));
  });
  app.get(routes.home, function(request, response, next) {
    response.end(template({indexActive: "indexActive"}));
  });
}

connect.createServer(
  connect.router(route),
  //connect.logger(),
  connect.static(staticDir)
).listen(httpPort, httpHost, function() {
  console.log('HTTP Server running at http://%s:%d', httpHost, httpPort);
});
