SimpleHistory.start(function(path) {
	var index = path === "/";
	$(document.body).toggleClass("indexActive", index);
	if (!index) {
		$("#photo img").attr("src", path + ".jpg");
		$("#photo p").text( $("a[href='" + path + "'] p").text() );
	}
});
$("a:not([href^=http])").click(function(event) {
	console.log("click", this)
	if (event.metaKey || event.shiftKey || event.ctrlKey) {
		return;
	}
	event.preventDefault();
	SimpleHistory.pushState(this.href);
});