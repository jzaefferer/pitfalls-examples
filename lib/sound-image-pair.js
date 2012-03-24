var querystring = require('querystring');
var request = require('request');


// see http://www.flickr.com/services/api/flickr.photos.search.html
function flickrUrl(tag) {
	return 'http://api.flickr.com/services/rest/?' + querystring.stringify({
		nojsoncallback: 1,
		format: 'json',
		per_page: 1,
		api_key: 'd95cee71d49de386fba7a2290de116eb',
		method: 'flickr.photos.search',
		safe_search: 1,
		tags: tag
	});
}
function format(string, object) {
	return string.replace(/\$\{(.+?)\}/g, function(match, key) {
		return object[key];
	});
}
function parseFlickr(data) {
	var parsed = JSON.parse(data);
	var photos = parsed.photos.photo.map(function(photo) {
		return {
			title: photo.title,
			src: format('http://farm${farm}.static.flickr.com/${server}/${id}_${secret}_b.jpg', photo),
			href: format('http://www.flickr.com/photos/${owner}/${id}/', photo)
		};
	});
	return photos[0];
}

// see http://developers.soundcloud.com/docs/api/tracks#filtering
var sc_client_id = '515a1fcab907701f29fe6f1f7dabc556';
function soundcloudUrl(tag) {
	return 'http://api.soundcloud.com/tracks.json?' + querystring.stringify({
		// TODO try to limit to one result
		tags: tag,
		client_id: sc_client_id
	});
}
function parseSoundcloud(data) {
	var result = JSON.parse(data)[0];
	if (!result) {
		return {
			title: "Nothing found"
		};
	}
	result.stream_url += '?client_id=' + sc_client_id;
	return result;
}

module.exports = function(tag, callback) {
	var replies = 0;
	var content = {};
	function done(type, result) {
		content[type] = result;
		replies += 1;
		if (replies === 2) {
			callback(content);
		}
	}
	request.get(flickrUrl(tag), function(error, response, body) {
		done('flickr', parseFlickr(body));
	});
	request.get(soundcloudUrl(tag), function(error, response, body) {
		done('soundcloud', parseSoundcloud(body));
	});
};
/*
module.exports("alligator", function(response) {
	console.log("results", JSON.stringify(response));
});
//*/