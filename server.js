#!/usr/bin/env node

var connect = require('connect');
var fs = require('fs');
var handlebars = require('handlebars');
var url = require('url');
var formidable = require('formidable');
var util = require('util');

var photos = require('./app/gallery/photos');

var pair = require('./lib/sound-image-pair');

var httpPort = 8085;
var httpHost = "localhost";
var staticDir = "app";
var routes = {
  home: "/",
  photo: /^\/photos\/.+/,
  pair: "/pair",
  pairResult: "/pair/result",
  errorlogger: "/errorlogger"
};

// TODO tell nodemon to restart when these change
var homeTemplate = handlebars.compile( fs.readFileSync('app/gallery/index.html', 'utf8') );
var pairTemplate = handlebars.compile( fs.readFileSync('app/sound-image-pair/index.html', 'utf8') );

function route(app) {
  app.get(routes.photo, function(request, response, next) {
    var photo = photos.lookup(request.url);
    response.end(homeTemplate({
      src: photo.src,
      description: photo.description,
      photos: photos.data
    }));
  });
  app.get(routes.home, function(request, response, next) {
    response.end(homeTemplate({
      indexActive: "indexActive",
      photos: photos.data
    }));
  });
  app.get(routes.pair, function(request, response, next) {
    var term = url.parse(request.url, true).query.term || 'bird';
    pair.get(term, function(result) {
      result.term = term;
      response.end(pairTemplate(result));
    });
  });
  app.get(routes.pairResult, function(request, response, next) {
    pair.get(url.parse(request.url, true).query.term, function(result) {
      response.end(JSON.stringify(result));
    });
  });
  app.post(routes.errorlogger, function(request, response, next) {
    var form = new formidable.IncomingForm();
    form.parse(request, function(err, fields, files) {
      console.log("[CLIENT " + fields.type + " error]", fields.message, fields.detail);
      response.end("");
    });
  });
}

connect.createServer(
  connect.router(route),
  connect.static(staticDir)
).listen(httpPort, httpHost, function() {
  console.log('HTTP Server running at http://%s:%d', httpHost, httpPort);
});
