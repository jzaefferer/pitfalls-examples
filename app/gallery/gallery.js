SimpleHistory.start(function(url) {
	var parts = URL.parse(url);
	var path = parts.path;
	var index = path === "/";
	$(document.body).toggleClass("indexActive", index);
	if (index) {
		if (parts.query.scroll) {
			var scrollTop = +parts.query.scroll;
			// lil' delay to deal with iOS
			setTimeout(function() {
				window.scrollTo(0, scrollTop);
			}, 50);
		}
	} else {
		var photo = photos.lookup(path);
		$("#photo img").attr("src", photo.src);
		$("#photo p").text( photo.description );
	}
});

function storeScroll() {
	var parts = URL.parse(location.href);
	if (parts.path !== "/") {
		return;
	}
	var scrollTop = $(document).scrollTop();
	if (scrollTop !== +parts.query.scroll) {
		SimpleHistory.replaceState(location.pathname + "?scroll=" + scrollTop);
	}
}

$("a:not([href^=http])").click(function(event) {
	if (event.metaKey || event.shiftKey || event.ctrlKey) {
		return;
	}
	// interesting alternative, but breaks when reloading a page
	//storeScroll();
	event.preventDefault();
	SimpleHistory.pushState(this.href);
});

$(document).scroll(storeScroll.debounce());
