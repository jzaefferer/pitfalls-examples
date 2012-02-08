SimpleHistory.start(function(url, state) {
	var parts = URL.parse(url);
	var path = parts.path;
	var index = path === "/";
	$(document.body).toggleClass("indexActive", index);
	if (index) {
		if (state.scroll) {
			var scrollTop = state.scroll;
			setTimeout(function() {
				window.scrollTo(0, scrollTop);
			}, 50);
		}
	} else {
		var photo = photos.lookup(path);
		$("#photo img").attr("src", photo.src);
		$("#photo p").text( photo.description );
	}
	$("#status").text("state changed");
});

function storeScroll() {
	var parts = URL.parse(location.href);
	if (parts.path !== "/") {
		return;
	}
	var scrollTop = $(document).scrollTop();
	SimpleHistory.replaceState(location.pathname, {
		scroll: scrollTop
	});
}

$("a:not([href^=http])").click(function(event) {
	if (event.metaKey || event.shiftKey || event.ctrlKey) {
		return;
	}
	event.preventDefault();
	SimpleHistory.pushState(this.href);
});

$(document).scroll(storeScroll.debounce());
