// double client/server export
var photos;
if (typeof exports !== 'undefined') {
	photos = exports;
} else {
	photos = {};
}
photos.data = [
	{
		src: "/2011-09-29-everglades/DSC_1165.jpg",
		description: "Not a crocodile"
	},
	{
		src: "/2011-09-29-everglades/DSC_1166.jpg",
		description: "Another not a crocodile"
	},
	{
		src: "/2011-09-29-everglades/DSC_1211.jpg",
		description: "Alligator coming at you"
	},
	{
		src: "/2011-09-29-everglades/DSC_1217.jpg",
		description: "Alligator in the wild"
	},
	{
		src: "/2011-09-29-everglades/DSC_1223.jpg",
		description: "Alligator with greens"
	},
	{
		src: "/2011-09-29-everglades/DSC_1218.jpg",
		description: "Unzoom wild alligator"
	},
	{
		src: "/2011-09-29-everglades/DSC_1221.jpg",
		description: "Alligator crossing"
	}
];
photos.data.forEach(function(photo) {
	photo.url = "/photos" + photo.src.replace(/\.jpg$/, "");
});
photos.lookup = function(url) {
	return photos.data.filter(function(photo) {
		return photo.url == url;
	})[0];
};