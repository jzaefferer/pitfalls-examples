var http = require('http');
var querystring = require('querystring');

function format(string, object) {
	return string.replace(/\$\{(.+?)\}/g, function(match, key) {
		return object[key];
	});
}

exports.get = function(tag, callback) {
	var replies = 0;
	var content = {};
	function done() {
		replies += 1;
		if (replies === 2) {
			callback(content);
		}
	}
	http.get({host: 'api.flickr.com', path: '/services/rest/?' + querystring.stringify({
		nojsoncallback: 1,
		format: 'json',
		per_page: 1,
		api_key: 'd95cee71d49de386fba7a2290de116eb',
		method: 'flickr.photos.search',
		safe_search: 1,
		tags: tag
	})}, function(response) {
		var chunks = '';
		response.on('data', function(chunk) {
			chunks += chunk.toString();
		});
		response.on('end', function() {
			var parsed = JSON.parse(chunks);
			var photos = parsed.photos.photo.map(function(photo) {
				return {
					title: photo.title,
					src: format('http://farm${farm}.static.flickr.com/${server}/${id}_${secret}_b.jpg', photo),
					href: format('http://www.flickr.com/photos/${owner}/${id}/', photo)
				};
			});
			content.flickr = photos[0];
			done();
		});
	});

	var sc_client_id = '515a1fcab907701f29fe6f1f7dabc556';
	http.get({host: 'api.soundcloud.com', path: '/tracks.json?' + querystring.stringify({
		// TODO try to limit to one result
		tags: tag,
		client_id: sc_client_id
	})}, function(response) {
		var chunks = '';
		response.on('data', function(chunk) {
			chunks += chunk.toString();
		});
		response.on('end', function() {
			var result = JSON.parse(chunks)[0];
			if (result) {
				result.stream_url += '?client_id=' + sc_client_id;
				content.soundcloud = result;
			} else {
				content.soundcloud = {
					title: "Nothing found"
				};
			}
			done();
		});
	});
};
/*
exports.get("alligator", function(response) {
	console.log("results", JSON.stringify(response));
})
//*/