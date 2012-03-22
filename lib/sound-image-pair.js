var querystring = require('querystring');
var request = require('request');

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
	// see http://www.flickr.com/services/api/flickr.photos.search.html
	request.get('http://api.flickr.com/services/rest/?' + querystring.stringify({
		nojsoncallback: 1,
		format: 'json',
		per_page: 1,
		api_key: 'd95cee71d49de386fba7a2290de116eb',
		method: 'flickr.photos.search',
		safe_search: 1,
		tags: tag
	}), function(error, response, body) {
		var parsed = JSON.parse(body);
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

	// see http://developers.soundcloud.com/docs/api/tracks#filtering
	var sc_client_id = '515a1fcab907701f29fe6f1f7dabc556';
	request.get('http://api.soundcloud.com/tracks.json?' + querystring.stringify({
		// TODO try to limit to one result
		tags: tag,
		client_id: sc_client_id
	}), function(error, response, body) {
		var result = JSON.parse(body)[0];
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
};
/*
exports.get("alligator", function(response) {
	console.log("results", JSON.stringify(response));
});
//*/