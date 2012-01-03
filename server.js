#!/usr/bin/env node

var connect = require('connect');
var fs = require('fs');
var handlebars = require('handlebars');

var photos = require('./app/gallery/photos');

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
    var photo = photos.lookup(request.url);
    response.end(template({
      src: photo.src,
      description: photo.description,
      photos: photos.data
    }));
  });
  app.get(routes.home, function(request, response, next) {
    response.end(template({
      indexActive: "indexActive",
      photos: photos.data
    }));
  });
}

connect.createServer(
  connect.router(route),
  //connect.logger(),
  connect.static(staticDir)
).listen(httpPort, httpHost, function() {
  console.log('HTTP Server running at http://%s:%d', httpHost, httpPort);
});
