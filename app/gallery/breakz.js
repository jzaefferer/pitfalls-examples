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

window.onerror = function(message, file, line) {
	// self-destruct to avoid logging more then once, generally not helpful
	window.onerror = function() {};
	logError("global", message, file + ":" + line);
};
$(document).ajaxError(function(event, xhr, options, error) {
	logError("ajax", error + ":" + xhr.responseText, options.url);
});