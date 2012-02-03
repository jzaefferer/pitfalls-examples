$("#breakz").click(function() {
	$.get("/not/existings/either/so/what");
	this.does.not.exist();
});

function logError(type, message, detail) {
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
	console.log("error", message, file, line);
	logError("global", message, file + ":" + line);
};
$(document).ajaxError(function(event, xhr, options, error) {
	console.log("ajax error", error, xhr.responseText);
	logError("ajax", error + ":" + xhr.responseText, options.url);
});