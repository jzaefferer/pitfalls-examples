function triggerSearch() {
	var term = $('#search-term').val();
	SimpleHistory.replaceState(location.pathname + "?term=" + term);
	$('#status').text("loading");
	$.getJSON('/pair/result', {term: term}, function(result) {
		$('#status').text('done');
		$('#img-title').text(result.flickr.title);
		$('#img-result').attr('src', result.flickr.src);
		$('#audio-title').text(result.soundcloud.title);
		$('#audio-result').attr('src', result.soundcloud.stream_url);
	});
}
//*
$('#search').submit(function(event) {
	event.preventDefault();
	triggerSearch();
});
//*/