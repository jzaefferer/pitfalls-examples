$("#breakz").click(function() {
	$.get("/not/exist");
	this.does.not.exist();
});

function logError(type, message, detail) {
	console.log(type, message, detail);
	$.get("/errorlogger", {
		type: type,
		message: message,
		detail: detail
	});
}

$(window).bind("error", function(event) {
	console.log("useless error event", event);
});
window.onerror = function(message, file, line) {
	logError("global", message, file + ":" + line);
};
$(document).ajaxError(function(event, xhr, options, error) {
	logError("ajax", error + ":" + xhr.responseText, options.url);
});