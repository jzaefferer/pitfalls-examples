$("#breakz").click(function() {
	$.get("/not/exist");
	this.does.not.exist();
});

function logError(type, message, detail) {
	if (window.console) {
		console.log(type, message, detail);
	}
	$.post("/errorlogger", {
		type: type,
		message: message,
		detail: detail
	});
}

$(window).bind("error", function(event) {
	var original = event.originalEvent;
	logError("global", original.message, original.filename + ":" + original.lineno);
});
// window.onerror = function(message, file, line) {
// 	logError("global", message, file + ":" + line);
// };
$(document).ajaxError(function(event, xhr, options, error) {
	logError("ajax", error + ":" + xhr.responseText, options.url);
});