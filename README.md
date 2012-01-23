# Pitfalls Examples

Examples for "Pitfalls and opportunities of single-page applications".

All examples are, on purpose, incomplete in various ways. For examples, loading hires images as thumbnails and on mobile is silly, but simplifies the setup enough to make it useful for demonstration purposes.

## Running

Needs `node` and `npm`. Run `npm install` to get dependencies.

Run `node server.js` or `./server.js` to start development server.

Better yet, `npm install nodemon -g` and run just `nodemon`. In this case, you only have to restart manually when changing templates.

Open the displayed URL.

## Further resources

### On API Design

* [Mobile API Design - Thinking Beyond REST](http://www.stereoplex.com/blog/mobile-api-design-thinking-beyond-rest)

### Code-sharing frameworks

* [Bones](https://github.com/developmentseed/bones), with a focus on sharing Backbone code on client and server
* [Joshfire Framework](http://framework.joshfire.com/), with a focus on supporting every device with a screen
* [Derby](http://derbyjs.com/), with a focus on realtime collaborative applications

### More on client+server rendering

* [Yahoo announces their drinks-inspired frameworks](http://developer.yahoo.com/blogs/ydn/posts/2011/11/yahoo-announces-cocktails-%E2%80%93-shaken-not-stirred/) - should be able to add Mojito to the frameworks list above sometime soon
* [A Google+ engineer writes about the G+ architecture](https://plus.google.com/115060278409766341143/posts/ViaVbBMpSVG), there's still a lot to research and implement.

### slide resources

* http://i.imgur.com/pd50m.jpg
* http://i.imgur.com/CtcWF.jpg
* http://www.w3.org/html/logo/
* Nodejs Rocket Turtle, by substack: http://substack.net/images/node_turtle.png

### HTML5 history API

* [Browser support for history API on caniuse.com](http://caniuse.com/#search=history)
* [Android ticket for regression on history API](http://code.google.com/p/android/issues/detail?id=23979)
* [History API on iOS under 'popup security model', requires user interaction](http://stackoverflow.com/questions/6161701/is-history-api-broken-on-ios-location-bar-doesnt-update-on-pushstate)

### Client side error handling

Not yet covered by examples, but [this blog post shows options for tracking those frontend errors](http://backstage.soundcloud.com/2011/11/front-end-javascript-bug-tracking/).
