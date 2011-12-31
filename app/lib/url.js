/**
 * A library for handling and manipulating URLs
 */
URL = (function () {
  var re_parse = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
      parts = ["---", "scheme", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "fragment"],
      queryObjToString,
      URL;
  URL = {
    /**
     * Parse a URL (partial or full) into its component parts
     * @param  {String} url The URL to parse
     * @param  {Array.<String>=} opt_keys Optional parameter telling which components we want back in the
     *                                    resultant object. Pass nothing to get all components, otherwise
     *                                    pass an array of key names.
     * @return {Object} An object, possibly containing the keys: "scheme", "authority", "userInfo", "user", "password",
     *                  "host", "port", "relative", "path", "directory", "file", "query", "fragment"
     */
    parse: function (url, opt_keys) {
      var matches = re_parse.exec(url), i, key,
          out = {};
      if (!opt_keys) {
        opt_keys = parts;
      }

      for (i = 1; i < parts.length; ++i) {
        key = parts[i];
        if (opt_keys.indexOf(key) !== -1) {
          if (matches[i] || key === 'query') {
            switch (key) {
            case 'port':
              out[key] = parseInt(matches[i], 10);
              break;
            case 'path':
              out[key] = matches[i].split('/').map(decodeURIComponent).join('/');
              break;
            case 'query':
              out[key] = URL.parseQueryString(matches[i]);
              break;
            default:
              out[key] = matches[i];
            }
          }
        }
      }
      return out;
    },
    /**
     * Parse the values out of a query string
     * @param  {String} queryString
     * @return {Object} A map of the values
     * @example
     *    parseQueryString("foo=bar&fu=bah&fu=blah") ==> {
     *      foo: 'bar',
     *      fu: ['bah', 'blah']
     *    }
     */
    parseQueryString: function (queryString) {
      var query = {};
      if (queryString) {
        queryString.replace(/([^?=&]+)(?:=([^&]*))?/g, function(whole, key, val) {
          key = decodeURIComponent(key);
          val = decodeURIComponent(val || "");

          switch (typeof query[key]) {
          case 'object':
            query[key].push(val);
            break;
          case 'undefined':
            query[key] = val;
            break;
          default:
            query[key] = [query[key], val];
          }
        });
      }
      return query;
    },

    /**
     * Convert a componentized URL back into a string - the inverse function of `SC.URL.parse`.
     * If the URL object only contains partial information, a base url can be used and the two will be merged.
     *
     * @param  {Object} obj The componentized URL
     * @param  {String=} opt_base An optional URL to use as a base
     * @return {String}
     */
    stringify: function (obj, opt_base) {
      var out = [],
          queryString,
          baseObj;

      if (opt_base) {
        obj = $.extend({}, SC.URL.parse(opt_base), obj);
      }

      if (obj.scheme) {
        out.push(obj.scheme + "://");
      }
      if (obj.user) {
        out.push(obj.user);
        if (obj.password) {
          out.push(":" + obj.password);
        }
        out.push("@");
      }
      if (obj.host) {
        out.push(obj.host);
      }
      if (obj.port) {
        out.push(":" + obj.port);
      }
      if (obj.path) {
        out.push(obj.path.split('/').map(encodeURIComponent).join('/'));
      }

      queryString = queryObjToString(obj.query);
      if (queryString) {
        out.push("?" + queryString);
      }
      if (obj.fragment) {
        out.push("#" + obj.fragment);
      }
      return out.join('');
    }
  };

  queryObjToString = function(query) {
    var key, i, len, val,
        out = [];
    if (query) {
      for (key in query) {
        if (query.hasOwnProperty(key)) {
          val = query[key];
          if (typeof val === 'object') {
            len = val.length;
            for (i = 0; i < len; ++i) {
              out.push(encodeURIComponent(key) + "=" + encodeURIComponent(val[i]));
            }
          } else {
            out.push(encodeURIComponent(key) + "=" + encodeURIComponent(val));
          }
        }
      }
    }
    return out.join('&');
  };

  return URL;
}());
