$("#breakz").click(function() {
	$.get("/not/existings/either/so/what");
	this.does.not.exists();
});

$(window).bind("error", function(event) {
	console.log("useless error event", event);
});
window.onerror = function(message, file, line) {
	console.log("error", message, file, line);
	$.get("/errorlogger", {
		type: "global",
		message: message,
		at: file + ":" + line
	});
};
$(document).ajaxError(function(event, xhr, options, error) {
	console.log("ajax error", error, xhr.responseText);
	$.get("/errorlogger", {
		type: "ajax",
		message: error + ":" + xhr.responseText,
		url: options.url
	});
});