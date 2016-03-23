if (typeof Object.assign != 'function') {
  (function () {
    Object.assign = function (target) {
      'use strict';
      if (target === undefined || target === null) throw new TypeError('Cannot convert undefined or null to object');
      var output = Object(target) , index = 1 , source;
      for (; index < arguments.length; index++) {
        source = arguments[index];
        if (source !== undefined && source !== null) {
          for (var nextKey in source) if (source.hasOwnProperty(nextKey)) output[nextKey] = source[nextKey];
        }
      }
      return output;
    };
  })();
}
