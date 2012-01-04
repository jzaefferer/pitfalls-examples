SimpleHistory.start(function() {
	var term = URL.parseQueryString(location.search).term || 'bird';
	$('#search-term').val(term);
	$('#status').text("loading");
	$.getJSON('/pair/result', {term: term}, function(result) {
		$('#status').text('done');
		$('#img-title').text(result.flickr.title);
		$('#img-result').attr('src', result.flickr.src);
		$('#audio-title').text(result.soundcloud.title);
		$('#audio-result').attr('src', result.soundcloud.stream_url);
	});
});

//*
$('#search').submit(function(event) {
	event.preventDefault();
	SimpleHistory.pushState(location.pathname + "?term=" + $('#search-term').val());
});
//*/