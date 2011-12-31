Function.prototype.debounce = function() {
  var func = this;
  var timeout;
  return function() {
    var obj = this,
        args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      func.apply(obj, args);
    }, 100);
  };
};
