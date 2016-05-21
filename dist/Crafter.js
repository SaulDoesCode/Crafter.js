var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
  return typeof obj;
} : function(obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
/**
 *  @overview Crafter.js , minimalist front-end library
 *  @author Saul van der Walt - https://github.com/SaulDoesCode/
 *  @license MIT
 */
(function(doc, root) {
  "use strict ";
  var Ready = doc.readyState === "complete",
    ua = navigator.userAgent,
    tabActive = !0,
    tabListeners = [],
    tem = void 0,
    Br = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i),
    sI = 'Isync',
    ud = void 0,
    head = doc.head,
    RegExps = {
      email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
      timeString: /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/,
      dateString: /^(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/(?:[0-9]{2})?[0-9]{2}$/,
      hexadecimal: /^[0-9a-fA-F]+$/,
      hexColor: /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
      ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
      ipv6: /^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,
      ip: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/
    };
  if (Br && (tem = ua.match(/version\/([\.\d]+)/i)) !== null) Br[2] = tem[1];
  Br = (Br ? [Br[1], Br[2]] : [navigator.appName, navigator.appVersion, '-?']).join(' ');

  function Locs(test) {
    return [location.hash, location.href, location.pathname].some(test);
  }

  function last(arr) {
    return arr[arr.length - 1];
  } // document , fragment , from , string -   dffstr
  function dffstr(html) {
    return doc.createRange().createContextualFragment(html);
  }

  function toArr(val) {
    return Array.from(val);
  }

  function type(obj, str) {
    return toString.call(obj) === str;
  } // tests arguments with Array.prototype.every;
  function ta(test) {
    return function() {
      return arguments.length && toArr(arguments).every(test);
    };
  }

  function rif(b, e) {
    if (b) return e;
  } // if x then return y else return z
  function W(x, y, z, a) {
    return a ? (x ? y : z) + a : x ? y : z;
  }

  function toInt(num) {
    if (is.String(num)) num = Number(num);
    if (isNaN(num)) return 0;
    if (num === 0 || !isFinite(num)) return num;
    return (num > 0 ? 1 : -1) * Math.floor(Math.abs(num));
  }

  function makeFn(fn, Args, totalArity) {
    var remainingArity = totalArity - Args.length;
    return is.Between(remainingArity, 10, 0) ? function() {
      return doInvok(fn, Args.concat(toArr(arguments)), totalArity);
    } : function(fn, args, arity) {
      var a = [];
      for (var i = arity; 0 > i; i--) {
        a.push('a' + i.toString());
      }
      return function() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return doInvok(fn, args.concat(a));
      };
    }(fn, args, remainingArity);
  }

  function doInvok(fn, argsArr, totalArity) {
    if (argsArr.length > totalArity) argsArr = argsArr.slice(0, totalArity);
    return argsArr.length == totalArity ? fn.apply(null, argsArr) : makeFn(fn, argsArr, totalArity);
  }

  function cutdot(str) {
    return str.split('.');
  }

  function joindot(arr) {
    if (!is.Arr(arr) && is.Arraylike(arr)) arr = toArr(arr);
    return arr.join('.');
  }
  var def = ta(function(o) {
      return typeof o !== 'undefined';
    }),
    nil = ta(function(o) {
      return o === null;
    });
  /**
   * is - Type Testing / Assertion *
   *
   */
  root.is = {
    /**
     * @method Bool
     * Test if something is a boolean type
     * @param val - value to test
     */
    Bool: ta(function(o) {
      return typeof o === 'boolean';
    }),
    /**
     * Test if something is a String
     * @param args - value/values to test
     */
    String: ta(function(o) {
      return typeof o === 'string';
    }),
    /**
     * Test if something is an Array
     * @param args - value/values to test
     */
    Arr: ta(Array.isArray),
    /**
     * Array.isArray alias for convenience and performance when only one argument is present
     * @param {*} val - value to test
     */
    Array: Array.isArray,
    /**
     * Test if something is an Array-Like
     * @param args - value/values to test
     */
    Arraylike: ta(function(o) {
      try {
        return def(o.length);
      } catch (e) {}
      return !1;
    }),
    /**
     * Determine whether a variable is undefined
     * @param args - value/values to test
     */
    Undef: function Undef() {
      return !def.apply(this, arguments);
    },
    /**
     * Determine whether a variable is in fact defined
     * @param args - value/values to test
     */
    Def: def,
    /**
     * Determine whether a variable is null
     * @param args - value/values to test
     */
    Null: ta(function(o) {
      return o === null;
    }),
    /**
     * Determine whether a variable is a DOM Node
     * @param args - value/values to test
     */
    Node: ta(function(o) {
      return o instanceof Node;
    }),
    /**
     * Test an element's tagname
     * @param {Node} element - node to test
     * @param {string} tag - tag to test node for
     */
    Tag: function Tag(element, tag) {
      return is.Node(element) ? element.tagName === tag.toUpperCase() : false;
    },
    /**
     * Determine whether a variable is a DOM NodeList or Collection of Nodes
     * @param args - value/values to test
     */
    NodeList: ta(function(nl) {
      return nl instanceof NodeList || is.Arraylike(nl) ? ta(function(n) {
        return n instanceof Node;
      }).apply(null, nl) : false;
    }),
    /**
     * Determine if a variable is a Number
     * @param {...*} args - value/values to test
     */
    Num: ta(function(o) {
      return !isNaN(Number(o));
    }),
    /**
     * Determine if a variable is an Object
     * @param args - value/values to test
     */
    Object: ta(function(o) {
      return toString.call(o) === '[object Object]';
    }),
    /**
     * Determine if a sring is JSON
     * @param args - value/values to test
     */
    Json: ta(function(str) {
      try {
        JSON.parse(str);
        return !0;
      } catch (e) {}
      return !1;
    }),
    /**
     * Determine if a variable is a HTMLElement
     * @param args - value/values to test
     */
    Element: ta(function(o) {
      return type(o, '[object HTMLElement]');
    }),
    /**
     * Determine if a variable is a File Object
     * @param args - value/values to test
     */
    File: ta(function(o) {
      return type(o, '[object File]');
    }),
    /**
     * Determine if a variable is of a FormData type
     * @param args - value/values to test
     */
    FormData: ta(function(o) {
      return type(o, '[object FormData]');
    }),
    /**
     * Determine if a variable is a Map
     * @param args - value/values to test
     */
    Map: ta(function(o) {
      return type(o, '[object Map]');
    }),
    /**
     * Determine if a variable is a function
     * @param args - value/values to test
     */
    Func: ta(function(o) {
      return typeof o === 'function';
    }),
    /**
     * Determine if a variable/s are true
     * @param args - value/values to test
     */
    True: ta(function(o) {
      return o === !0;
    }),
    /**
     * Determine if a variable/s are false
     * @param args - value/values to test
     */
    False: ta(function(o) {
      return !o;
    }),
    /**
     * Determine if a variable is of Blob type
     * @param obj - variable to test
     */
    Blob: ta(function(o) {
      return type(o, '[object Blob]');
    }),
    /**
     * Determine if a variable is a Regular Expression
     * @param obj - variable to test
     */
    RegExp: ta(function(o) {
      return type(o, '[object RegExp]');
    }),
    /**
     * Determine if a variable is a Date type
     * @param {...*} variable to test
     */
    Date: ta(function(o) {
      return type(o, '[object Date]');
    }),
    /**
     * Determine if a variable is a Set
     * @param obj - variable to test
     */
    Set: ta(function(o) {
      return type(o, '[object Set]');
    }),
    /**
     * Determine if a variable is of an arguments type
     * @param obj - variables to test
     */
    Args: function Args(val) {
      return !nil(val) && type(val, '[object Arguments]');
    },
    /**
     * Determine if a variable is a Symbol
     * @param obj - variables to test
     */
    Symbol: ta(function(obj) {
      return type(obj, '[object Symbol]');
    }),
    /**
     * tests if a value is a single character
     * @param {...string} values to test
     */
    char: ta(function(val) {
      return is.String(val) && val.length == 1;
    }),
    /**
     * tests if a value is a space character
     * @param {...string} values to test
     */
    space: function space(val) {
      return is.char(val) && val.charCodeAt(0) > 8 && val.charCodeAt(0) < 14 || val.charCodeAt(0) === 32;
    },
    /**
     * Determine if a String is UPPERCASE
     * @param {string} char - variable to test
     */
    Uppercase: function Uppercase(str) {
      return is.String(str) && !is.Num(str) && str === str.toUpperCase();
    },
    /**
     * Determine if a String is LOWERCASE
     * @param {string} char - variable to test
     */
    Lowercase: function Lowercase(str) {
      return is.String(str) && str === str.toLowerCase();
    },
    /**
     * Determine if a String contains only characters and numbers (alphanumeric)
     * @param {string} str - variable to test
     */
    Alphanumeric: function Alphanumeric(str) {
      return (/^[0-9a-zA-Z]+$/.test(str));
    },
    /**
     * Determines whether a String is a valid Email
     * @param {string} email - variable to test
     */
    Email: function Email(email) {
      return RegExps.email.test(email);
    },
    /**
     * Determines whether a String is a URL
     * @param {string} url - variable to test
     */
    URL: function(_URL) {
      function URL(_x) {
        return _URL.apply(this, arguments);
      }
      URL.toString = function() {
        return _URL.toString();
      };
      return URL;
    }(function(url) {
      try {
        new URL(url);
        return !0;
      } catch (e) {}
      return !1;
    }),
    /**
     * Determines whether a String is a HEX-COLOR (#fff123)
     * @param {string} HexColor - variable to test
     */
    HexColor: function HexColor(hexColor) {
      return RegExps.hexColor.test(hexColor);
    },
    /**
     * Determines whether a String is a ip
     * @param {string} ip - variable to test
     */
    ip: function ip(_ip) {
      return RegExps.ip.test(_ip);
    },
    /**
     * Determines whether a String is a ipv4
     * @param {string} ipv4 - variable to test
     */
    ipv4: function ipv4(_ipv) {
      return RegExps.ipv4.test(_ipv);
    },
    /**
     * Determines whether a String is a ipv6
     * @param {string} ipv6 - variable to test
     */
    ipv6: function ipv6(_ipv2) {
      return RegExps.ipv6.test(_ipv2);
    },
    /**
     * Determines whether a String is hexadecimal
     * @param {string} hexadecimal - variable to test
     */
    hexadecimal: function hexadecimal(_hexadecimal) {
      return RegExps.hexadecimal.test(_hexadecimal);
    },
    /**
     * checks wether a date is today
     * @param obj - Date to test
     */
    today: function today(obj) {
      return is.Date(obj) && obj.toDateString() === new Date().toDateString();
    },
    /**
     * checks wether a date is yesterday
     * @param obj - Date to test
     */
    yesterday: function yesterday(obj) {
      var now = new Date();
      return is.Date(obj) && obj.toDateString() === new Date(now.setDate(now.getDate() - 1)).toDateString();
    },
    /**
     * checks wether a date is tommorow
     * @param obj - Date to test
     */
    tomorrow: function tomorrow(obj) {
      var now = new Date();
      return is.Date(obj) && obj.toDateString() === new Date(now.setDate(now.getDate() + 1)).toDateString();
    },
    /**
     * Determines if a date is in the past
     * @param obj - Date to test
     */
    past: function past(obj) {
      try {
        if (!is.Date(obj)) obj = is.String(obj) ? new Date(is.Num(obj) ? Number(obj) : obj) : new Date(obj);
      } catch (e) {}
      return is.Date(obj) && obj.getTime() < new Date().getTime();
    },
    /**
     * Determines if a date is in the future
     * @param obj - Date to test
     */
    future: function future(obj) {
      return !is.past(obj);
    },
    /**
     * Determines whether a String is a timeString
     * @param time - variable to test
     */
    time: function time(_time) {
      return RegExps.timeString.test(_time);
    },
    /**
     * Determines whether a String is a dateString
     * @param {string} dateString - variable to test
     */
    dateString: function dateString(_dateString) {
      return RegExps.dateString.test(_dateString);
    },
    /**
     * Determines whether a Number is between a maximum and a minimum
     * @param {Number} val - number value to test
     * @param {Number} max - maximum to compare the value with
     * @param {Number} min - minimum to compare the value with
     * @returns {Boolean} wether or not the value is between the max and min
     */
    Between: function Between(val, max, min) {
      return val <= max && val >= min;
    },
    /**
     * checks if a number is an integer
     * @param val - variable / value to test
     */
    int: function int(val) {
      return is.Num(val) && val % 1 === 0;
    },
    /**
     * checks if a number is an even number
     * @param val - variable / value to test
     */
    even: function even(val) {
      return is.Num(val) && val % 2 === 0;
    },
    /**
     * checks if a number is an odd number
     * @param val - variable / value to test
     */
    odd: function odd(val) {
      return is.Num(val) && val % 2 !== 0;
    },
    /**
     * checks if a number is positive
     * @param val - variable / value to test
     */
    positive: function positive(val) {
      return is.Num(val) && val > 0;
    },
    /**
     * checks if a number is positive
     * @param val - variable / value to test
     */
    negative: function negative(val) {
      return is.Num(val) && val < 0;
    },
    /**
     * tests that all parameters following the first are not the same as the first
     * @param {*} value - inital value to compare all other params with
     * @param {...*} arguments to compare with value
     */
    neither: function neither(value) {
      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }
      return args.every(function(val) {
        return value !== val;
      });
    },
    /**
     * Determines if two variables are equal
     * @param a - first value to compare
     * @param b - second value to compare
     */
    eq: function eq(a, b) {
      return a === b;
    },
    /**
     * Determines if a number is LOWER than another
     * @param {Number} val - value to test
     * @param {Number} other - num to test with value
     */
    lt: function lt(val, other) {
      return val < other;
    },
    /**
     * Determines if a number is LOWER than or equal to another
     * @param {Number} val - value to test
     * @param {Number} other - num to test with value
     */
    lte: function lte(val, other) {
      return val <= other;
    },
    /**
     * Determines if a number is BIGGER than another
     * @param {Number} val - value to test
     * @param {Number} other - num to test with value
     */
    bt: function bt(val, other) {
      return val > other;
    },
    /**
     * Determines if a number is BIGGER than or equal to another
     * @param {Number} val - value to test
     * @param {Number} other - num to test with value
     */
    bte: function bte(val, other) {
      return val >= other;
    },
    /**
     * Determine if a given collection or string is empty
     * @param {Object|Array|string} val - value to test if empty
     */
    empty: ta(function(val) {
      try {
        return !(is.Object(val) ? Object.keys(val).length : is.Map(val) || is.Set(val) ? val.size : val.length) || val === '';
      } catch (e) {}
      return !1;
    }),
    /**
     * Test if something is a Native JavaScript feature
     * @param val - value to test
     */
    Native: function Native(val) {
      var type = typeof val === "undefined" ? "undefined" : _typeof(val);
      return is.Func(val) ? RegExp('^' + String(Object.prototype.toString).replace(/[.*+?^${}()|[\]\/\\]/g, '\\$&').replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$').test(Function.prototype.toString.call(val)) : val && type == 'object' && /^\[object .+?Constructor\]$/.test(val.toString) || false;
    },
    /**
     * Tests where a dom element is an input of some sort
     * @param {Element|Node} - element to test
     */
    Input: function Input(element) {
      return ['INPUT', 'TEXTAREA'].some(function(i) {
        return element.tagName.includes(i);
      });
    }
  };
  /**
   * Easy way to loop through Collections and Objects and Numbers as well
   * @param {Array|Object|NodeList|Number} iterable - any collection that is either an Object or has a .length value
   * @param {function} func - function called on each iteration -> "function( value , indexOrKey ) {...}"
   */
  root.forEach = function(iterable, func) {
    if (!is.empty(iterable) && is.Func(func)) {
      var i = 0;
      if (is.Arraylike(iterable) && !localStorage) {
        for (; i < iterable.length; i++) {
          func(iterable[i], i);
        }
      } else if (is.int(iterable)) {
        iterable = toInt(iterable);
        for (; i < iterable; func(iterable--)) {}
      } else
        for (i in iterable) {
          if (iterable.hasOwnProperty(i)) func(iterable[i], i);
        }
    }
  };
  /**
   * Converts any Query/QueryAll to an Array of Nodes even if there is only one Node , this is error proof when no arguments are present it returns an empty array
   * @param {Node|NodeList|Array|String} val - pass either a CSS Selector string , Node/NodeList or Array of Nodes
   * @param {Node|NodeList|Array|String} within - pass either a CSS Selector string , Node/NodeList or Array of Nodes to search for val in
   */
  function NodeOrQuerytoArr(val, within) {
    if (is.String(val)) val = queryAll(val, within);
    return is.Node(val) ? [val] : is.NodeList(val) ? toArr(val) : [];
  }
  /**
   * Event Handler
   * @param {string} EventType - set the type of event to listen for example "click" or "scroll"
   * @param {Node|NodeList|window|document} Target - the Event Listener's target , can also be a NodeList to listen on multiple Nodes
   * @param {function} Func - Handler function that will be called when the event is triggered -> "function( event , event.srcElement ) {...}"
   * @returns Interface On,Off,Once
   */
  function EventHandler(EventType, Target, func, Within) {
    return new function() {
      EventType = EventType || 'click';
      this.state = !1;
      Target = Target !== root && Target !== doc ? NodeOrQuerytoArr(Target, Within) : [Target];
      if (is.String(EventType) && EventType.includes(',')) EventType = EventType.split(',');
      if (!is.Arr(EventType)) EventType = [EventType];

      function FuncWrapper(e) {
        func(e, e.target, Craft.deglove(Target));
      }
      /**
       * Activates the EventHandler to start listening for the EventType on the Target/Targets
       */
      Object.defineProperty(this, 'On', {
        get: function get() {
          var ehdl = this;
          Target.forEach(function(target) {
            EventType.forEach(function(evt) {
              target.addEventListener(evt, FuncWrapper);
            });
          });
          ehdl.state = !0;
          return ehdl;
        },
        enumerable: !0
      });
      /**
       * Change the Event type to listen for
       * {string} type - the name of the event/s to listen for
       */
      Object.defineProperty(this, 'Type', {
        set: function set(type) {
          var ehdl = this; //  have you tried turning it on and off again? - THE IT CROWD
          ehdl.Off;
          EventType = type.includes(',') ? type.split(',') : type;
          if (!is.Arr(EventType)) EventType = [EventType];
          ehdl.On;
          return ehdl;
        },
        get: function get() {
          return EventType;
        },
        enumerable: !0
      });
      /**
       * De-activates / turns off the EventHandler to stop listening for the EventType on the Target/Targets
       * can still optionally be re-activated with On again
       */
      Object.defineProperty(this, 'Off', {
        get: function get() {
          var ehdl = this;
          Target.forEach(function(target) {
            EventType.forEach(function(evt) {
              target.removeEventListener(evt, FuncWrapper);
            });
          });
          ehdl.state = !1;
          return ehdl;
        },
        enumerable: !0
      });
      /**
       * Once the the Event has been triggered the EventHandler will stop listening for the EventType on the Target/Targets
       * the Handler function will be called only Once
       */
      Object.defineProperty(this, 'Once', {
        get: function get() {
          var ehdl = this,
            func = FuncWrapper;
          EventType.forEach(function(evt) {
            ehdl.state = !0;
            var listenOnce = function listenOnce(e) {
              ehdl.state = !1;
              func(e);
              Target.forEach(function(t) {
                t.removeEventListener(evt, listenOnce);
              });
            };
            Target.forEach(function(t) {
              t.addEventListener(evt, listenOnce);
            });
          });
          return ehdl;
        },
        enumerable: !0
      });
    }();
  }
  /**
   * Easy way to get a DOM Node or Node within another DOM Node using CSS selectors
   * @param {string} selector - CSS selector to query the DOM Node with
   * @param {Node|string=} element - Optional Node or CSS selector to search within insead of document
   */
  root.query = function(selector, element) {
    if (is.String(element)) element = doc.querySelector(element);
    return is.Node(element) ? element.querySelector(selector) : doc.querySelector(selector);
  };
  /**
   * Easy way to get a DOM NodeList or NodeList within another DOM Node using CSS selectors
   * @param {string} selector - CSS selector to query the DOM Nodes with
   * @param {Node|NodeList|string=} element - Optional Node or CSS selector to search within insead of document
   */
  root.queryAll = function(selector, element) {
    if (is.String(element)) element = queryAll(element);
    var list = void 0;
    if (Craft.len(element) !== 1 && (is.Arr(element) || is.NodeList(element))) {
      list = [];
      forEach(element, function(el) {
        if (is.String(el)) el = query(el);
        if (is.Node(el)) {
          el = queryAll(selector, el);
          if (is.NodeList(el)) list.concat(toArr(el));
        }
      });
    } else list = is.NodeList(element) ? element[0].querySelectorAll(selector) : is.Node(element) ? element.querySelectorAll(selector) : doc.querySelectorAll(selector);
    return is.Null(list) ? list : is.Arr(list) ? list : toArr(list);
  };
  /**
   * Easy way to loop through Nodes in the DOM using a CSS Selector or a NodeList
   * @param {string|NodeList|Node} selector - CSS selector to query the DOM Nodes with or NodeList to iterate through
   * @param {Node|string=} element - Optional Node or CSS selector to search within insead of document
   * @param {function} func - function called on each iteration -> "function( Element , index ) {...}"
   * @param {boolean=} returnList - should queryEach also return the list of nodes
   */
  root.queryEach = function(selector, element, func, returnList) {
    if (is.Func(element)) func = element;
    var list = NodeOrQuerytoArr(selector, element);
    forEach(list, func);
    if (returnList) return list;
  };

  function EventTypes(Target, within, listen) {
    var etype = function etype(type) {
        return function(fn) {
          return EventHandler(type, Target, fn, within)[listen || 'On'];
        };
      },
      keypress = function keypress(keycode) {
        return function(fn) {
          return EventHandler('keydown', Target, function(e, el) {
            if (event.which == keycode || event.keyCode == keycode) fn(e, el);
          }, within)[listen || 'On'];
        };
      };
    return {
      Click: etype('click'),
      Input: etype('input'),
      DoubleClick: etype('dblclick'),
      Focus: etype('focus'),
      Blur: etype('blur'),
      Keydown: etype('keydown'),
      Mousemove: etype('mousemove'),
      Mousedown: etype('mousedown'),
      Mouseup: etype('mouseup'),
      Mouseover: etype('mouseover'),
      Mouseout: etype('mouseout'),
      Mouseenter: etype('mouseenter'),
      Mouseleave: etype('mouseleave'),
      Scroll: etype('scroll'),
      Enter: keypress(13),
      Escape: keypress(27),
      Delete: keypress(46),
      Space: keypress(32),
      UpArrow: keypress(38),
      DownArrow: keypress(40),
      LeftArrow: keypress(37),
      RightArrow: keypress(39)
    };
  }

  function EvtLT() {
    var ListenType = arguments.length <= 0 || arguments[0] === undefined ? 'On' : arguments[0];
    return function(EventType, Target, element, func) {
      var args = toArr(arguments);
      return is.Func(Target) ? EventHandler(EventType, root, Target)[ListenType] : args.length < 3 && !args.some(function(i) {
        return is.Func(i);
      }) ? EventTypes(EventType, Target) : is.Func(element) ? EventHandler(EventType, Target, element)[ListenType] : EventHandler(EventType, Target, func, element)[ListenType];
    };
  }
  /**
   * Starts listening for an EventType on the Target/Targets
   * @param {string} EventType - set the type of event to listen for example "click" or "scroll"
   * @param {Node|NodeList|window|document} Target - the Event Listener's target , can be a NodeList to listen on multiple Nodes
   * @param {function} Func - Handler function that will be called when the event is triggered -> "function( event , event.srcElement ) {...}"
   * @returns Off - when On is defined as a variable "var x = On(...)" it allows you to access all the EventHandler interfaces Off,Once,On
   */
  root.On = EvtLT();
  /**
   * Starts listening for an EventType on the Target/Targets ONCE after triggering the Once event Listener will stop listening
   * @param {string} EventType - set the type of event to listen for example "click" or "scroll"
   * @param {Node|NodeList|window|document} Target - the Event Listener's target , can be a NodeList to listen on multiple Nodes
   * @param {function} Func - Handler function that will be called when the event is triggered -> "function( event , event.srcElement ) {...}"
   * @returns On,Off,Once - when Once is defined as a variable "var x = Once(...)" it allows you to access all the EventHandler interfaces Off,Once,On
   */
  root.Once = EvtLT('Once');

  function craftElement(name, inner, attributes, extraAttr, stringForm) {
    var newEl = domManip(doc.createElement(name));
    if (is.Object(inner)) {
      attributes = inner;
      inner = ud;
    }
    if (inner != ud) {
      var _type = newEl.isInput ? 'value' : 'innerHTML';
      if (!is.Arr(inner)) is.Node(inner) ? newEl.appendChild(inner) : newEl[_type] = inner;
      else newEl[_type] = inner.map(function(val) {
        if (is.Node(val)) newEl.append(val);
        else return val;
      }).join('');
    }
    if (is.Object(attributes) || is.String(attributes)) newEl.setAttr(attributes);
    if (extraAttr != ud) is.Bool(extraAttr) ? stringForm = extraAttr : newEl.setAttr(extraAttr);
    if (stringForm) newEl = newEl.outerHTML;
    return newEl;
  }
  /**
   * Contains several methods for Element Creation
   * @namespace dom
   */
  var Dom = {
    element: craftElement,
    frag: function frag(inner) {
      var dfrag = doc.createDocumentFragment();
      if (is.String(inner)) inner = dffstr(inner);
      if (is.Node(inner)) dfrag.appendChild(dfrag);
      return dfrag;
    },
    br: function br() {
      return Dom.element('br');
    },
    /**
     * creates an img element with the options provided
     * @method img
     * @memberof dom
     * @param {string} sets src of the img
     * @param {string} sets alt of the img
     * @param {string|Object=} sets p attributes with URL variable style string ("id=123&class=big-header") or Object with properties {id : 123 , class : 'big-header'}
     */
    img: function img(src, alt, attr) {
      return Dom.element('img', '', attr, {
        src: src,
        alt: alt
      });
    },
    input: function input(type, attr) {
      if (is.Object(type)) {
        attributes = type;
        type = 'text';
      }
      return Dom.element('input', '', attr, {
        type: type || 'text'
      });
    },
    list: function list(type, items, attr) {
      var list = "";
      if (is.Arrylike(items)) forEach(items, function(item) {
        if (is.String(item)) list += Dom.element('li', item).outerHTML;
        else if (is.Object(items)) list += Dom.element('li', item.inner, item.attr).outerHTML;
      });
      return Dom.element(type, list, attr);
    },
    a: function a(link, inner, attr) {
      return Dom.element('a', inner, attr, {
        href: link
      });
    },
    script: function script(code, attr, defer, onload) {
      var script = Dom.element('script', '', attr, {
        type: 'text/javascript'
      });
      script.src = Craft.URLfrom(code);
      if (defer == !0) script.defer = defer != !1;
      if (is.Func(onload)) script.onload = onload;
      return script;
    },
    SafeHTML: function SafeHTML(html, node) {
      html = html.replace(/<script[^>]*?>.*?<\/script>/gi, '').replace(/<style[^>]*?>.*?<\/style>/gi, '').replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');
      return !node ? html : dffstr(html);
    }
  };
  'table,td,th,tr,article,ul,ol,li,h1,h2,h3,h4,h5,h6,div,span,button,br,label,header,i,style'.split(',').forEach(function(tag) {
    Dom[tag] = function(inner, attr) {
      return Dom.element(tag, inner, attr);
    };
  });

  function domNodeList(elements) {
    Craft.omit(Object.getOwnPropertyNames(Array.prototype), "length").forEach(function(method) {
      elements[method] = Array.prototype[method];
    });
    /**
     * Listen for Events on the NodeList
     * @param {string} string indicating the type of event to listen for
     * @param {function} func - handler function for the event
     * @returns handler (Off,Once,On)
     */
    elements.On = function(eventType, func) {
      return On(eventType, elements, func);
    };
    /**
     * add CSS style rules to NodeList
     * @param {object} styles - should contain all the styles you wish to add example { borderWidth : '5px solid red' , float : 'right'}...
     */
    elements.css = function(styles) {
      if (styles != ud) {
        elements.forEach(function(el) {
          forEach(styles, function(prop, key) {
            el.style[key] = prop;
          });
        });
      } else throw new Error('styles unefined');
      return elements;
    };
    elements.addClass = function(Class) {
      elements.forEach(function(el) {
        el.classList.add(Class);
      });
      return elements;
    };
    elements.gotClass = function() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      return elements.every(function(el) {
        return args.every(function(Class) {
          return el.classList.contains(Class);
        });
      });
    };
    elements.someGotClass = function() {
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return elements.some(function(el) {
        return args.every(function(Class) {
          return el.classList.contains(Class);
        });
      });
    };
    elements.stripClass = function(Class) {
      elements.forEach(function(el) {
        el.classList.remove(Class);
      });
      return elements;
    };
    elements.toggleClass = function(Class, state) {
      forEach(elements, function(el) {
        (is.Bool(state) ? state : el.classList.contains(Class)) ? el.classList.remove(Class): el.classList.add(Class);
      });
      return elements;
    };
    /**
     * removes a specific Attribute from the this.element
     * @memberof dom
     * @param {...string} name of the Attribute/s to strip
     */
    elements.stripAttr = function() {
      for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      elements.forEach(function(el) {
        args.forEach(function(attr) {
          el.removeAttribute(attr);
        });
      });
      return elements;
    };
    /**
     * checks if the element has a specific Attribute or Attributes
     * @memberof dom
     * @param {string|boolean} name of the Attribute or if true checks that it has some (||) of the attributes or if false checks that it has all of the attributes (&&)
     * @param {...string} names of attributes to check for
     */
    elements.hasAttr = function(attr) {
      var _arguments = arguments;
      if (is.String(attr)) return elements.every(function(el) {
        return el.hasAttribute(attr);
      });
      return elements.every(function(el) {
        return Craft.flatten(_arguments).every(function(a) {
          return el.hasAttribute(a);
        });
      });
    };
    /**
     * Toggles an attribute on element , optionally add value when toggle is adding attribute
     * @param {string} name - name of the attribute to toggle
     * @param {string} val - value to set attribute to
     * @param {boolean=} rtst - optionally return a bool witht the toggle state otherwise returns the element
     */
    elements.toggleAttr = function(name, val, rtst) {
      forEach(elements, function(el) {
        el[W(is.Bool(val) ? !val : el.hasAttr(name), 'strip', 'set', 'Attr')](name, val);
      });
      return rtst ? elements.every(function(el) {
        return el.hasAttr(name);
      }) : elements;
    };
    /**
     * Sets or adds an Attribute on the element
     * @memberof dom
     * @param {string} Name of the Attribute to add/set
     * @param {string} Value of the Attribute to add/set
     */
    elements.setAttr = function(attr, val) {
      forEach(elements, function(el) {
        if (!is.Def(val)) {
          if (is.String(attr)) attr.includes('=') || attr.includes('&') ? attr.split('&').forEach(function(Attr) {
            var attribs = Attr.split('=');
            is.Def(attribs[1]) ? element.setAttribute(attribs[0], attribs[1]) : element.setAttribute(attribs[0], '');
          }) : element.setAttribute(attr, '');
          else if (is.Object(attr)) forEach(attr, function(value, Attr) {
            element.setAttribute(Attr, value);
          });
        } else element.setAttribute(attr, val || '');
      });
      return elements;
    };
    elements.append = function() {
      var args = toArr(arguments);
      args.forEach(function(arg) {
        forEach(elements, function(el) {
          el.appendChild((is.Node(val) ? val : dffstr(val)).cloneNode(!0));
        });
      });
      return elements;
    };
    elements.appendTo = function(val, within) {
      forEach(elements, function(el) {
        if (is.String(el)) el = query(val, within);
        if (is.Node(el)) el.appendChild(el);
      });
      return elements;
    };
    elements.prepend = function() {
      var args = toArr(arguments);
      args.forEach(function(val) {
        forEach(elements, function(el) {
          el.insertBefore(W(is.Node(val), val, dffstr(val)).cloneNode(!0), el.firstChild);
        });
      });
      return elements;
    };
    elements.hide = function() {
      return elements.css({
        display: 'none'
      });
    };
    elements.show = function() {
      return elements.css({
        display: ''
      });
    };
    elements.pick = function(i) {
      if (is.int(i) && is.Def(elements[i])) return dom(elements[i]);
      else if (elements.includes(i)) return dom(i);
    };
    return elements;
  }

  function Inner(type, el) {
    type = el.isInput ? 'value' : type;
    return function() {
      var args = toArr(arguments);
      if (args.length == 0) return el[type];
      args.length == 1 ? is.Node(args[0]) ? el.append(args[0]) : el[type] = args[0] : el[type] = args.map(function(val) {
        if (is.Node(val)) el.append(val);
        else return val;
      }).join('');
      return el;
    };
  } // evlt - Event Listener Type (On or Once)
  var evlt = function evlt(type) {
    return root[type ? 'Once' : 'On'];
  };

  function domManip(element, within) {
    if (is.String(element)) element = query(element, within);
    if (element._DOMM == !0) return element;
    element._DOMM = !0;
    element.isInput = is.Input(element);
    element.newSetGet = function(key, set, get) {
      Object.defineProperty(this, key, {
        set: set,
        get: get
      });
    };
    element.newSetGet('colorAccent', function(func) {
      if (element.hasAttr('color-accent')) {
        func(element.getAttr('color-accent'));
        element._cah = {
          fn: func,
          dw: !0
        };
      } else {
        element._cah = {
          fn: func,
          dw: false
        };
      }
    }, function() {
      return element._cah;
    });
    /**
     * changes or returns the innerHTML value of a Node
     * @memberof dom
     * @param {string=} sets the innerHTML value or when undefined gets the innerHTML value
     */
    element.html = Inner('innerHTML', element);
    /**
     * changes or returns the textContent value of a Node
     * @memberof dom
     * @param {string=} sets the textContent value or when undefined gets the textContent value
     */
    element.Text = Inner('textContent', element);
    /**
     * replaces a Node with another node provided as a parameter/argument
     * @memberof dom
     * @param {Node} Node to replace with
     */
    element.replace = function(val) {
      element.parentNode.replaceChild(val, element);
      return element;
    };
    /**
     * replaces a Node with another node provided as a parameter/argument
     * @memberof dom
     * @param {Node} Node to replace with
     */
    element.clone = function(val) {
      return domManip(element.cloneNode(val == ud ? !0 : val));
    };
    /**
     * append the Element to another node using either a CSS selector or a Node
     * @memberof dom
     * @param {Node|string} CSS selector or Node to append the this.element to
     */
    element.appendTo = function(val, within) {
      if (is.String(val)) val = query(val, within);
      if (is.Node(val)) val.appendChild(element);
      return element;
    };
    /**
     * append text or a Node to the element
     * @memberof dom
     * @param {Node|string} String or Node to append to the this.element
     */
    element.append = function() {
      for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }
      var domfrag = dom.frag();
      args.forEach(function(val) {
        domfrag.appendChild(is.Node(val) ? val : dffstr(val));
      });
      element.appendChild(domfrag);
      return element;
    };
    /**
     * prepend text or a Node to the element
     * @memberof dom
     * @param {Node|string} String or Node to prepend to the this.element
     */
    element.prepend = function() {
      for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      args.forEach(function(val) {
        element.insertBefore(is.Node(val) ? val : dffstr(val), element.firstChild);
      });
      return element;
    };
    element.bind = function(bind) {
      function attemptBind() {
        var _Craft$getPath = Craft.getPath(bind, !0, !0),
          cutbind = _Craft$getPath.cutbind,
          prop = _Craft$getPath.prop,
          obj = _Craft$getPath.obj,
          val = _Craft$getPath.val;
        is.Def(val) ? element.html(val) : Craft.setDeep(obj, prop, element.html());
        if (obj.isObservable) {
          element._BoundObservable = obj.$set(prop, function(k, v, o) {
            setTimeout(function() {
              element.html(obj.get(k));
            }, 1);
          });
        }
        if (element.isInput) element.SyncInput(obj, cutbind.length == 1 ? cutbind[0] : joindot(Craft.omit(cutbind, cutbind[0])));
      }
      try {
        attemptBind();
      } catch (e) {
        Craft.Models.$set(cutdot(bind)[0], function() {
          setTimeout(attemptBind, 20);
        });
      }
      return element;
    };
    /**
     * Listen for Events on the element or on all the elements in the NodeList
     * @memberof dom
     * @param {string} string indicating the type of event to listen for
     * @param {function} func - handler function for the event
     * @returns handler (Off,Once,On)
     */
    element.On = function(eventType, func) {
      return On(eventType, element, func);
    };
    element.newSetGet('ondestroy', function(fn) {
      if (is.Func(fn)) element.On('destroy', fn);
    });
    element.Click = function(fn, type) {
      return evlt(type)('click', element, fn);
    };
    element.Input = function(fn, type) {
      return evlt(type)('input', element, fn);
    };
    element.DoubleClick = function(fn, type) {
      return evlt(type)('dblclick', element, fn);
    };
    element.Focus = function(fn, type) {
      return evlt(type)('focus', element, fn);
    };
    element.Blur = function(fn, type) {
      return evlt(type)('blur', element, fn);
    };
    element.Keydown = function(fn, type) {
      return evlt(type)('keydown', element, fn);
    };
    element.Mousemove = function(fn, type) {
      return evlt(type)('mousemove', element, fn);
    };
    element.Mousedown = function(fn, type) {
      return evlt(type)('mousedown', element, fn);
    };
    element.Mouseup = function(fn, type) {
      return evlt(type)('mouseup', element, fn);
    };
    element.Mouseover = function(fn, type) {
      return evlt(type)('mouseover', element, fn);
    };
    element.Mouseout = function(fn, type) {
      return evlt(type)('mouseout', element, fn);
    };
    element.Mouseenter = function(fn, type) {
      return evlt(type)('mouseenter', element, fn);
    };
    element.Mouseleave = function(fn, type) {
      return evlt(type)('mouseleave', element, fn);
    };
    element.Wheel = function(fn, type) {
      return evlt(type)('wheel', element, fn);
    };
    element.OnScroll = function(func, pd) {
      return Craft.OnScroll(element, func, pd);
    };
    var keypress = function keypress(code) {
      return function(fn, type) {
        return evlt(type)('keydown', element, function(e) {
          if (e.which == code || e.keyCode == code) fn(e, element);
        });
      };
    };
    element.Enter = keypress(13);
    element.Escape = keypress(27);
    element.Delete = keypress(46);
    element.Space = keypress(32);
    element.UpArrow = keypress(38);
    element.DownArrow = keypress(40);
    element.LeftArrow = keypress(37);
    element.RightArrow = keypress(39);
    /**
     * add CSS style rules to the Element or NodeList
     * @memberof dom
     * @param {object} styles - should contain all the styles you wish to add example { borderWidth : '5px solid red' , float : 'right'}...
     */
    element.css = function(styles, prop) {
      if (styles == ud) throw new Error('Style properties undefined');
      if (is.String(styles, prop)) element.style[styles] = prop;
      else
        for (var style in styles) {
          element.style[style] = styles[style];
        }
      return element;
    };
    /**
     * check if the element has got a specific CSS class
     * @memberof dom
     * @param {...string} name of the class to check for
     */
    element.gotClass = function() {
      for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }
      return args.every(function(Class) {
        return element.classList.contains(Class);
      });
    };
    /**
     * Add a CSS class to the element
     * @memberof dom
     * @param {string} name of the class to add
     */
    element.addClass = function() {
      for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }
      args.forEach(function(Class) {
        element.classList.add(Class);
      });
      return element;
    };
    /**
     * removes a specific CSS class from the element
     * @memberof dom
     * @param {...string} name of the class to strip
     */
    element.stripClass = function() {
      for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        args[_key10] = arguments[_key10];
      }
      args.forEach(function(Class) {
        element.classList.remove(Class);
      });
      return element;
    };
    /**
     * Toggle a CSS class to the element
     * @memberof dom
     * @param {string} name of the class to add
     * @param {boolean=} state - optionally toggle class either on or off with bool
     */
    element.toggleClass = function(Class, state) {
      if (!is.Bool(state)) state = element.gotClass(Class);
      element[W(state, 'strip', 'add', 'Class')](Class);
      return element;
    };
    /**
     * removes a specific Attribute from the this.element
     * @memberof dom
     * @param {...string} name of the Attribute/s to strip
     */
    element.stripAttr = function() {
      for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
        args[_key11] = arguments[_key11];
      }
      args.forEach(function(attr) {
        element.removeAttribute(attr);
      });
      return element;
    };
    /**
     * checks if the element has a specific Attribute or Attributes
     * @memberof dom
     * @param {string|boolean} name of the Attribute or if true checks that it has some (||) of the attributes or if false checks that it has all of the attributes (&&)
     * @param {...string} names of attributes to check for
     */
    element.hasAttr = function() {
      for (var _len12 = arguments.length, args = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
        args[_key12] = arguments[_key12];
      }
      if (is.String(args[0]) && args.length == 1) return element.hasAttribute(args[0]);
      return args.every(function(a) {
        return element.hasAttribute(a);
      });
    };
    /**
     * Toggles an attribute on element , optionally add value when toggle is adding attribute
     * @param {string} name - name of the attribute to toggle
     * @param {string} val - value to set attribute to
     * @param {boolean=} rtst - optionally return a bool witht the toggle state otherwise returns the element
     */
    element.toggleAttr = function(name, val, rtst) {
      element[W(is.Bool(val) ? !val : element.hasAttr(name), 'strip', 'set', 'Attr')](name, val);
      return rtst ? element.hasAttr(name) : element;
    };
    /**
     * Sets or adds an Attribute on the element
     * @memberof dom
     * @param {string} Name of the Attribute to add/set
     * @param {string} Value of the Attribute to add/set
     */
    element.setAttr = function(attr, val) {
      if (!is.Def(val)) {
        if (is.String(attr)) attr.includes('=') || attr.includes('&') ? attr.split('&').forEach(function(Attr) {
          is.Def(Attr.split('=')[1]) ? element.setAttribute(Attr.split('=')[0], Attr.split('=')[1]) : element.setAttribute(Attr.split('=')[0], '');
        }) : element.setAttribute(attr, '');
        else if (is.Object(attr)) forEach(attr, function(value, Attr) {
          return element.setAttribute(Attr, value);
        });
      } else element.setAttribute(attr, val || '');
      return element;
    };
    /**
     * Gets the value of an attribute , short alias for element.getAttribute
     * {string} attr - name of attribute to get
     */
    element.getAttr = element.getAttribute;
    /**
     * Hides and element by setting display none
     * @todo : Smooth animation
     */
    element.hide = function() {
      return element.css({
        display: 'none'
      });
    };
    /**
     * Shows and element by setting display none
     * @todo : Smooth animation
     */
    element.show = function(mode) {
      return element.css({
        display: mode || ''
      });
    };
    /**
     * Remove the element after a time in milliseconds
     * @param {number=} time - time to wait before self destructing the element
     */
    element.removeAfter = function(time) {
      setTimeout(function() {
        element.remove();
      }, time || 5000);
      return element;
    };
    Object.defineProperty(element, 'Siblings', {
      get: function get() {
        return Craft.omit(element.parentNode.children, element).filter(function(el) {
          if (is.Element(el)) return el;
        });
      }
    });
    /**
     * gets all the element's dimentions (width,height,left,top,bottom,right)
     * @memberof dom
     */
    element.getRect = element.getBoundingClientRect;
    /**
     * sets or gets the element's pixel width
     * @memberof dom
     * @param {string|number=} pixel value to set
     */
    element.newSetGet('Width', function(pixels) {
      if (is.Def(pixels)) element.style.width = pixels;
    }, function() {
      return element.getRect().with;
    });
    /**
     * sets or gets the element's pixel height
     * @memberof dom
     * @param {string|number=} pixel value to set
     */
    element.newSetGet('Height', function(pixels) {
      if (pixels != ud) element.style.height = pixels;
    }, function() {
      return element.getRect().height;
    });
    /**
     * move the element using either css transforms or plain css possitioning
     * @param {string|num} x - x-axis position in pixels
     * @param {string|num} y - y-axis position in pixels
     * @param {boolean=} transform - should move set the position using css transforms or not
     * @param {string=} position - set the position style of the element absolute/fixed...
     * @param {boolean=} chainable - should this method be chainable defaults to false for performance reasons
     */
    element.move = function(x, y, transform, position, chainable) {
      if (is.Bool(position)) chainable = position;
      if (is.String(transform)) position = transfrom;
      if (is.String(position)) element.style.position = position;
      element.css(transform == !0 ? {
        transform: "translateX(" + x + "px) translateY(" + y + "px)"
      } : {
        left: x + 'px',
        top: y + 'px'
      });
      if (chainable) return element;
    };
    /**
     * performs a query inside the element
     * @memberof dom
     * @param {string} CSS selector
     * @returns {Node|Null}
     */
    element.query = function(selector) {
      return query(selector, element);
    };
    element.next = function(reset, dm) {
      var sb = toArr(element.parentNode.children),
        nextnode = sb.indexOf(element) + 1;
      if (!sb[nextnode]) return reset ? dm ? dom(sb[0]) : sb[0] : null;
      return dm ? dom(sb[nextnode]) : sb[nextnode];
    };
    element.previous = function(reset, dm) {
      var sb = toArr(element.parentNode.children),
        nextnode = sb.indexOf(element) - 1;
      if (!sb[nextnode]) return reset ? dm ? dom(sb[sb.length - 1]) : sb[sb.length - 1] : null;
      return dm ? dom(sb[nextnode]) : sb[nextnode];
    };
    /**
     * performs a queryAll inside the element
     * @memberof dom
     * @param {string} CSS selector
     * @returns {NodeList|Null}
     */
    element.queryAll = function(selector) {
      return queryAll(selector, element);
    };
    if (element.isInput) {
      element.SyncInput = function(obj, key) {
        element[sI] = On(element).Input(function(e) {
          Craft.setDeep(obj, key, element.value);
        });
        return element;
      };
      element.disconectInputSync = function() {
        if (is.Def(element[sI])) {
          element[sI].Off;
          delete element[sI];
        }
        return element;
      };
    }
    element.observe = function(func, options, name) {
      if (!is.String(name)) name = 'MutObserver';
      element[name] = new MutationObserver(function(muts) {
        muts.forEach(function(mut) {
          func(mut, mut.type, mut.target, mut.addedNodes, mut.removedNodes);
        });
      });
      element[name].observe(element, options || {
        attributes: !0,
        childList: !0,
        subtree: !0
      });
      return element;
    };
    element.unobserve = function(name) {
      if (!is.String(name)) name = 'MutObserver';
      if (is.Def(element[name])) {
        element[name].disconnect();
        delete element[name];
      }
      return element;
    };
    return element;
  };
  /**
   * Function that returns many useful methods for interacting with and manipulating the DOM or creating elements
   * in the absence of parameters the function will return methods for created elements
   * @function dom
   * @param {Node|NodeList|string=} element - optional Node, NodeList or CSS Selector that will be affected by the methods returned
   * @param {Node|string=} within - optional Node, NodeList or CSS Selector to search in for the element similar to query(element,within)
   * @param {boolean=} one - even if there are more than one elements matching a selector only return the first one
   */
  root.dom = function(element, within, one) {
    if (within == !0) {
      one = within;
      within = null;
    }
    if (!one) {
      if (is.String(element)) element = queryAll(element, within);
      if (is.NodeList(element)) {
        element = toArr(element).filter(function(el) {
          return is.Def(el.setAttribute);
        });
        if (element.length != 1) return domNodeList(element);
        else element = element[0];
      }
    } else if (is.String(element)) element = query(element, within);
    if (is.Node(element)) return !element['_DOMM'] ? domManip(element) : element;
    return Dom;
  };
  for (var _key13 in Dom) {
    Object.defineProperty(dom, _key13, Object.getOwnPropertyDescriptor(Dom, _key13));
  }
  if (root.Proxy) dom = new Proxy(dom, {
    get: function get(obj, key) {
      if (!obj.hasOwnProperty(key)) {
        if (Dom.hasOwnProperty(key)) return Dom[key];
        return function(inner, attr, eattr, str) {
          return Dom.element(key, inner, attr, eattr, str);
        };
      }
      return obj[key];
    }
  });

  function observable(obj) {
    if (!is.Def(obj)) obj = {};
    Object.defineProperty(obj, 'listeners', {
      value: {
        Get: new Set(),
        Set: new Set()
      },
      enumerable: !1,
      writable: !0
    });
    Object.defineProperty(obj, 'isObservable', {
      value: !0,
      enumerable: !1,
      writable: !1
    });
    ['$get', '$set'].forEach(function(t) {
      var Type = 'Set';
      if (t == '$get') Type = 'Get';
      Object.defineProperty(obj, t, {
        value: function value(prop, func) {
          if (is.Func(prop)) {
            func = prop;
            prop = '*';
          }
          if (!is.Func(func)) throw new Error('no function');
          var listener = {
              prop: is.String(prop) ? prop : '*',
              fn: func
            },
            options = {get on() {
                obj.listeners[Type].add(listener);
                return options;
              },
              get off() {
                obj.listeners[Type].delete(listener);
                return options;
              }
            };
          return options.on;
        },
        enumerable: !1,
        writable: !0
      });
    });
    Object.defineProperty(obj, '$change', {
      value: function value(prop, func) {
        if (!is.Func(func)) throw new Error('no function');
        var listener = {
            prop: is.String(prop) ? prop : '*',
            fn: func,
            multi: !0
          },
          options = {get on() {
              obj.listeners.Get.add(listener);
              obj.listeners.Set.add(listener);
              return options;
            },
            get off() {
              obj.listeners.Get.delete(listener);
              obj.listeners.Set.delete(listener);
              return options;
            }
          };
        return options.on;
      },
      enumerable: !1,
      writable: !0
    });
    Object.defineProperty(obj, 'get', {
      value: function value(key) {
        var val = void 0;
        obj.listeners.Get.forEach(function(ln) {
          if (ln.prop === '*' || ln.prop === key) val = ln.multi ? ln.fn('get', key, obj) : ln.fn(key, obj);
        });
        return obj[key];
      },
      writable: !1,
      enumerable: !1
    });
    Object.defineProperty(obj, 'set', {
      value: function value(key, _value) {
        var val = void 0;
        obj.listeners.Set.forEach(function(ln) {
          if (ln.prop === '*' || ln.prop === key) val = ln.multi ? ln.fn('set', key, _value, obj, !is.Def(obj[key])) : ln.fn(key, _value, obj, !is.Def(obj[key]));
        });
        obj[key] = is.Def(val) ? val : _value;
      },
      writable: !1,
      enumerable: !1
    });
    if (Proxy) return new Proxy(obj, {
      get: function get(target, key) {
        var val = void 0;
        target.listeners.Get.forEach(function(ln) {
          if (ln.prop === '*' || ln.prop === key) val = ln.multi ? ln.fn('get', key, target) : ln.fn(key, target);
        });
        return is.Def(val) ? val : Reflect.get(target, key);
      },
      set: function set(target, key, value) {
        var val = void 0;
        target.listeners.Set.forEach(function(ln) {
          if (ln.prop === '*' || ln.prop === key) val = ln.multi ? ln.fn('set', key, value, target, !Reflect.has(target, key)) : ln.fn(key, value, target, !Reflect.has(target, key));
        });
        return is.Def(val) ? val : Reflect.set(target, key, value);
      }
    });
    else return obj;
  }
  /**
   * Craft is Crafter.js's Core containing most functionality.
   * @namespace Craft
   */
  root.Craft = {
    /**
     * Returns an object or calls a function with all the differences between two arrays
     * @method arrDiff
     * @memberof Craft
     * @param {Array} arr - array to be compared
     * @param {Array} newArr - second array to be compared
     * @param {function=} func - optional function that recieves all the info as parameters
     */
    arrDiff: function arrDiff(arr, newArr, func) {
      var added = newArr.filter(function(item) {
          if (!arr.includes(item)) return item;
        }),
        removed = arr.filter(function(item) {
          if (newArr.includes(item)) return item;
        }),
        diff = Craft.omit(added.concat(removed), ud);
      if (is.Func(func) && !is.empty(diff)) func(arr, newArr, added, removed, diff);
      else return {
        arr: arr,
        newArr: newArr,
        diff: diff,
        added: added,
        removed: removed
      };
    },
    deglove: function deglove(arr) {
      return is.Arraylike(arr) && arr.length == 1 ? arr[0] : arr;
    },
    last: last,
    /**
     * Splits a string at dots "."
     * @method cutdot
     * @memberof Craft
     * @param {string} str - string to split at the dots
     */
    cutdot: cutdot,
    /**
     * joins a string array with dots "."
     * @method joindot
     * @memberof Craft
     * @param {Array|Arraylike} arr - array to join with dots
     */
    joindot: joindot,
    dffstr: dffstr,
    /**
     * Convert Arraylike variables to Array
     * {...*} val - arraylike variable to convert to array
     */
    toArr: toArr,
    /**
     * Convert numbers to integers
     * {number|string} val - number to convert to an integer
     */
    toInt: toInt,
    /**
     * Compares two arrays and determines if they are the same array
     * @method sameArray
     * @memberof Craft
     * @param {Array} arr1 - array one
     * @param {Array} arr2 - array two
     */
    sameArray: function sameArray(arr1, arr2) {
      var i = arr1.length;
      if (i !== arr2.length) return !1;
      while (i--) {
        if (arr1[i] !== arr2[i]) return !1;
      }
      return !0;
    },
    /**
     * Generates arrays of a set length , with values or values generated from functions
     * @method array
     * @memberof Craft
     * @param {Number} len - the integer length of the array to be generated
     * @param {...function|*} val - value to set at each index , multiple value params after lenth will generate nested 2d arrays
     */
    array: function array(len) {
      var arr = [],
        val = Craft.omit(arguments, len);
      if (val.length == 1)
        for (; len > 0; len--) {
          arr.push(is.Func(val[0]) ? val[0]() : val[0]);
        } else
          for (; len > 0; len--) {
            arr.push(Craft.array(val.length, val));
          }
      return arr;
    },
    /**
     * Gets all the property keys in any object even the hiden ones
     * @method getAllKeys
     * @memberof Craft
     * @param {*} obj - object to list keys fromModel
     * @returns {Array} - array containing all the property keys
     */
    getAllKeys: function getAllKeys(obj) {
      var props = [];
      do {
        props = props.concat(Object.getOwnPropertyNames(obj));
      } while (obj = Object.getPrototypeOf(obj));
      return props;
    },
    unique: function unique(arr) {
      return toArr(new Set(Craft.flatten(arr)));
    },
    /**
     * Flattens any multidimentional array or arraylike object
     * @method flatten
     * @memberof Craft
     * @param {Array|Arraylike} arr - multidimentional array(like) object to flatten
     */
    flatten: function flatten(arr) {
      return (!is.Arr(arr) && is.Arraylike(arr) ? Arrat.from(arr) : is.Arr(arr) ? arr : []).reduce(function(flat, toFlatten) {
        return flat.concat(is.Arr(toFlatten) ? Craft.flatten(toFlatten) : toFlatten);
      }, []);
    },
    /**
     * Gets a value from inside an object using a reference string
     * @method getDeep
     * @memberof Craft
     * @example Craft.getDeep(myObj,'Company.employees[16].person.name') -> Mr Smithers or Craft.getDeep(anObj,'Colony.Queen.brood') -> [...ants]
     * @param {Object} obj - the object to extract values from
     * @param {string} path - string to reference value by simple dot notation or array refference example Craft.getDeep({ a : { b : [1,2,3] }},"a.b[2]") -> 3
     */
    getDeep: function getDeep(obj, path) {
      path = path.replace(/\[(\w+)\]/g, '.$1');
      path = cutdot(path.replace(/^\./, ''));
      try {
        for (var i = 0; i < path.length; ++i) {
          path[i] in obj ? obj = obj[path[i]] : obj = ud;
        }
      } catch (e) {
        obj = ud;
      }
      return obj;
    },
    /**
     * Craft.setDeep  is similar to getDeep it uses a string to reference to a value
     * @method setDeep
     * @memberof Craft
     * @param {Object} obj - the object to set values on
     * @param {string} path - string to reference value by simple dot notation
     * @param {*} value - value to set
     * @param {boolean} robj - should the function return the object
     */
    setDeep: function setDeep(obj, path, val, robj) {
      path = cutdot(path);
      var temp = obj;
      for (var i = 0, n; i < path.length - 1; i++) {
        n = path[i];
        if (n in temp) temp = temp[n];
        else {
          temp[n] = {};
          temp = temp[n];
        }
      }
      temp[path[path.length - 1]] = val;
      if (robj) return obj;
    },
    /**
     * forEachDeep is used to loop through any multi layered object - (flattens and loops through all enumerable properties in a given object)
     * @method forEachDeep
     * @memberof Craft
     * @param {Object} obj - the object to loop through
     * @param {function} fn - function to handle each iteration
     * @param {string=} path - string to reference value by simple dot notation
     * @example Craft.forEachDeep({ a : 1 , b : { c : 2}}, (value , key , object, currentPath) => { console.log(key) })
     */
    forEachDeep: function forEachDeep(object, fn, path) {
      path = path || '';
      var currentPath = path,
        nestable = void 0,
        val = void 0,
        key = void 0;
      for (key in object) {
        if (object.hasOwnProperty(key)) val = object[key];
        currentPath = path;
        nestable = !1;
        is.Arr(object) ? currentPath += "[" + key + "]" : !currentPath ? currentPath = key : currentPath += '.' + key;
        nestable = fn(val, key, object, currentPath) == !1;
        if (nestable && (is.Arr(val) || is.Object(val))) Craft.forEachDeep(val, fn, currentPath);
      }
    },
    /**
     * Converts any text to an inline URL code (good for images , svg , scripts or css)
     * @param {string} - content to convert to an inline URL
     **/
    URLfrom: function URLfrom(text, type) {
      return URL.createObjectURL(new Blob([text], type));
    },
    /**
     * Method to merge the properties of multiple objects , it can handle getters or setters without breaking them
     * @method concatObjects
     * @memberof Craft
     * @param {Object} host - main object to merge with all subsequent objects
     * @param {...Object} objs - other objects to be merged with host object
     * @returns {Object} resulting object after merges
     */
    concatObjects: function concatObjects(host) {
      for (var _len13 = arguments.length, objs = Array(_len13 > 1 ? _len13 - 1 : 0), _key14 = 1; _key14 < _len13; _key14++) {
        objs[_key14 - 1] = arguments[_key14];
      }
      objs.forEach(function(obj) {
        for (var _key15 in obj) {
          Object.defineProperty(host, _key15, Object.getOwnPropertyDescriptor(obj, _key15));
        }
      });
      return host;
    },
    isObservable: function isObservable(obj) {
      return obj.isObservable || !1;
    },
    /**
     * Simply clones/duplicates any object or array/arraylike object
     * @method clone
     * @memberof Craft
     * @param {Array|Object} val - array or object to be cloned
     * @returns {Array|Object} cloned result
     */
    clone: function clone(val) {
      return is.Object(val) ? Object.create(val) : toArr(val);
    },
    omitFrom: function omitFrom(Arr) {
      for (var _len14 = arguments.length, args = Array(_len14 > 1 ? _len14 - 1 : 0), _key16 = 1; _key16 < _len14; _key16++) {
        args[_key16 - 1] = arguments[_key16];
      }
      if (is.String(Arr)) args.forEach(function(a) {
        Craft.tco(function replace() {
          if (Arr.includes(a)) {
            Arr = Arr.replace(a, '');
            replace();
          }
        })();
      });
      else Arr = (is.Arraylike(Arr) ? toArr(Arr) : Arr).filter(function(e) {
        return rif(!args.some(function(v) {
          return v == e;
        }), e);
      });
      return Arr;
    },
    has: function has(str) {
      for (var _len15 = arguments.length, args = Array(_len15 > 1 ? _len15 - 1 : 0), _key17 = 1; _key17 < _len15; _key17++) {
        args[_key17 - 1] = arguments[_key17];
      }
      return args.some(function(e) {
        return str.includes(e);
      });
    },
    /**
     * Omits values from Objects or Arrays
     * @method omit
     * @memberof Craft
     * @param {Object|Array} val - object from which things may be omitted
     * @param {...*} args - things to omit from Object or Array
     * @returns {Object|Array}
     */
    omit: function omit(val) {
      for (var _len16 = arguments.length, args = Array(_len16 > 1 ? _len16 - 1 : 0), _key18 = 1; _key18 < _len16; _key18++) {
        args[_key18 - 1] = arguments[_key18];
      }
      if (is.Arraylike(val)) val = Craft.omitFrom.apply(this, arguments);
      if (is.Object(val) && !args.some(function(v) {
          return v == val;
        })) forEach(val, function(prop, key) {
        if (args.some(function(v) {
            return v == prop || v == key;
          })) delete val[key];
      });
      return val;
    },
    addCSS: function addCSS(css) {
      query('[crafterstyles]', head).textContent += "@import url(\"" + Craft.URLfrom(css, {
        type: 'text/css'
      }) + "\");\n";
    },
    Browser: {
      is: function is(browser) {
        return Br.toLowerCase().includes(browser.toLowerCase());
      },
      browser: Br
    },
    dom: Dom,
    loader: {
      pre: 'craft:',
      fetchImport: function fetchImport(obj) {
        obj.key = obj.key || obj.url;
        var now = +new Date(),
          src = Craft.loader.get(obj.key);
        if (src || src.expire - now > 0) return new Promise(function(pass) {
          return pass(src);
        });
        return new Promise(function(pass, fail) {
          return fetch(obj.url).then(function(res) {
            res.text().then(function(data) {
              obj.data = data;
              obj.stamp = now;
              obj.expire = now + Craft.millis.hours(obj.expire || 400);
              if (obj.cache) localStorage.setItem(Craft.loader.pre + obj.key, JSON.stringify(obj));
              pass(obj);
            });
          }).catch(function(err) {
            fail("error importing -> " + err);
          });
        });
      },
      set prekey(str) {
        Craft.loader.pre = str + ':';
      },
      get: function get(key) {
        return JSON.parse(localStorage.getItem(key.includes(Craft.loader.pre) ? key : Craft.loader.pre + key) || !1);
      },
      remove: function remove(key) {
        localStorage.removeItem(key.includes(Craft.loader.pre) ? key : Craft.loader.pre + key);
      },
      removeAll: function removeAll(expired) {
        for (var i in localStorage) {
          if (!expired || is.past(Craft.loader.get(i).expire)) Craft.loader.remove(i);
        }
      }
    },
    /**
     * Crafter.js resource loader for Scripts and Style sheets,
     * each import option is an object with properties like 'script/css/wc : "location" ' for resource url
     * other options include 'cache' - determines wether to cache the resource or not , 'test' : usefull for conditional imports if test is false the resource won't load or execute ,
     * 'key' custom name to cache the resource in localStorage with instead of the resource location, 'defer' optionally load the script when the dom is loaded or load when it's ready,
     * {...object} args - Objects containing options for Script/CSS/WebComponent import
     * @method import
     * @param {...Object} Imports - Objects containing the properties neccesarry to import a resource
     * @returns {Promise} returns a promise after importing the resource
     */
    Import: function Import() {
      var promises = [];
      forEach(arguments, function(arg) {
        arg.test ? Craft.loader.remove(arg.css || arg.script) : promises.push(Craft.loader.fetchImport({
          url: arg.css || arg.script,
          type: arg.css ? 'css' : 'script',
          exec: arg.execute != !1,
          cache: arg.cache != !1,
          defer: arg.defer || ud,
          key: arg.key,
          expire: arg.expire
        }));
      });
      return Promise.all(promises).then(function(src) {
        return src.map(function(obj) {
          if (obj.exec) obj.type === 'css' ? Craft.addCSS('\n' + obj.data) : head.appendChild(dom.script(obj.data, 'key=' + obj.key, obj.defer));
        });
      });
    },
    router: {
      addHandle: function addHandle(link, func) {
        Craft.router.handlers.push({
          link: link,
          func: func
        });
      },
      handle: function handle(route, func) {
        if (is.String(route)) {
          if (Locs(function(l) {
              return l == route;
            })) func(route);
          Craft.router.addHandle(route, func);
        } else if (is.Arr(route)) route.forEach(function(link) {
          if (Locs(function(l) {
              return l == link;
            })) func(link);
          Craft.router.addHandle(link, func);
        });
      },
      handlers: [],
      links: [],
      link: function link(Selector, _link, newtab, eventType) {
        if (is.String(newtab)) eventType = newtab;
        Craft.router.links.push(function() {
          On(eventType || 'click', Selector, function(e) {
            Craft.router.open(_link, newtab);
          });
        });
      },
      open: function(_open) {
        function open(_x3, _x4) {
          return _open.apply(this, arguments);
        }
        open.toString = function() {
          return _open.toString();
        };
        return open;
      }(function(link, newtab) {
        !newtab ? location = link : open(link);
      }),
      set title(title) {
        doc.title = title;
      },
      get title() {
        return doc.title;
      },
      fetchView: function fetchView(selector, src, cache) {
        var vh = dom(selector, !0),
          srcpre = "Cr:" + src,
          view = localStorage.getItem(srcpre);
        is.Null(view) ? fetch(src).then(function(res) {
          return res.text();
        }).then(function(txt) {
          if (is.True(cache, nil(view))) localStorage.setItem(srcpre, txt);
          vh.html(txt);
        }).catch(function(err) {
          console.error("fetchView: " + err);
        }) : vh.html(view);
      },
      clearViews: function clearViews() {
        for (var i in localStorage) {
          localStorage.removeItem(localStorage.key(i).includes("Cr:"));
        }
      }
    },
    Cookies: {
      get: function get(key) {
        return key ? decodeURIComponent(doc.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null : null;
      },
      set: function set(key, val, expires, path, domain, secure) {
        if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) return !1;
        var expiry = "";
        if (expires) {
          if (is.Num(expires)) expiry = expires == Infinity ? "; expires=Fri, 11 April 9997 23:59:59 UTC" : "; max-age=" + expires;
          if (is.String(expires)) expiry = "; expires=" + expires;
          if (is.Date(expires)) expiry = "; expires=" + expires.toUTCString();
        }
        doc.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(val) + expiry + (domain ? "; domain=" + domain : "") + (path ? "; path=" + path : "") + (secure ? "; secure" : "");
        return !0;
      },
      remove: function remove(key, path, domain) {
        if (!Craft.Cookies.has(key)) return !1;
        doc.cookie = encodeURIComponent(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (domain ? "; domain=" + domain : "") + (path ? "; path=" + path : "");
        return !0;
      },
      has: function has(key) {
        return key ? new RegExp("(?:^|;\\s*)" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(doc.cookie) : false;
      },
      keys: function keys() {
        return doc.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/).map(function(c) {
          decodeURIComponent(c);
          return c;
        });
      }
    },
    /**
     * Handles WebSockets in a contained manner with send and recieve methods
     * @param {string} address - the WebSocket address example "ws://localhost:3000/" but the ws:// or wss:// is optional
     * @param {Array=} protocols - the protocols to pass to the WebSocket Connection
     */
    Socket: function Socket(address, protocols) {
      if (!is.URL(address)) {
        var match = address.match(/^(\/.*?)?$/);
        if (is.empty(match)) throw new Error('invalid url');
        address = location.host + match[0];
      }
      if (!address.includes('ws://') || !address.includes('wss://')) address = (location.protocol === 'http:' ? 'ws://' : 'wss://') + address;
      if (is.URL(address)) {
        var _ret = function() {
          var newSock = function newSock() {
              return protocols ? new WebSocket(address, protocols) : new WebSocket(address);
            },
            Options = {
              socket: null,
              open: !1,
              recievers: [],
              message: '',
              set send(msg) {
                if (Options.socket['readyState'] == 1) Options.socket.send(is.Object(msg) ? JSON.stringify(msg) : msg);
                else {
                  (function() {
                    var poll = setInterval(function() {
                      if (Options.socket['readyState'] == 1) {
                        Options.socket.send(is.Object(msg) ? JSON.stringify(msg) : msg);
                        clearInterval(poll);
                      }
                    }, 10);
                    setTimeout(clearInterval.bind(null, poll), 2000);
                  })();
                }
              },
              set recieve(func) {
                if (is.Func(func)) Options.recievers.push(func);
              },
              get recieve() {
                return Options.message;
              },
              close: function close() {
                Options.socket.close();
              },
              reopen: function reopen() {
                OpenSock(Options.open ? Options.socket : Options.socket = newSock());
              }
            },
            OpenSock = function OpenSock(sock) {
              sock.onopen = function() {
                Options.open = !0;
                sock.onmessage = function(e) {
                  Options.message = e.data;
                  Options.recievers.forEach(function(fn) {
                    fn(e.data, e);
                  });
                };
              };
              sock.onclose = function() {
                Options.open = !1;
              };
              sock.onerror = function(e) {
                console.error(e);
              };
            };
          OpenSock(Options.socket = newSock());
          return {
            v: Options
          };
        }();
        if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
      }
    },
    curry: function curry(fn) {
      return makeFn(fn, [], fn.length);
    },
    after: function after(n, func) {
      !is.Func(func) && is.Func(n) ? func = n : console.error("after: no function");
      n = Number.isFinite(n = +n) ? n : 0;
      if (--n < 1) return function() {
        return func.apply(this, arguments);
      };
    },
    debounce: function debounce(wait, func, immediate) {
      var timeout = void 0;
      return function() {
        var args = arguments,
          scope = this,
          later = function later() {
            timeout = null;
            if (!immediate) func.apply(scope, args);
          },
          callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(scope, args);
      };
    },
    throttle: function throttle(wait, func, options) {
      var context = void 0,
        args = void 0,
        result = void 0,
        timeout = null,
        previous = 0;
      if (!options) options = {};
      var later = function later() {
        previous = !options.leading ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      };
      return function() {
        var now = Date.now();
        if (is.False(previous, options.leading)) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
          if (timeout) {
            clearTimeout(timeout);
            timeout = null;
          }
          previous = now;
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        } else if (!timeout && options.trailing == !0) timeout = setTimeout(later, remaining);
        return result;
      };
    },
    once: function once(func, context) {
      var res = void 0;
      return function() {
        if (is.Func(func)) {
          res = func.apply(context || this, arguments);
          func = null;
        }
        return res;
      };
    },
    css: function css(el, styles) {
      if (is.Object(styles) && is.Element(el)) forEach(styles, function(prop, key) {
        el.style[key] = prop;
      });
    },
    hasCapitals: function hasCapitals(string) {
      return toArr(string).some(function(c) {
        return is.Uppercase(c);
      });
    },
    OverrideFunction: function OverrideFunction(funcName, Func, ContextObject) {
      funcName.split(".").forEach(function(i) {
        ContextObject = ContextObject[i];
      });
      ContextObject[funcName.split(".").pop()] = Func;
    },
    len: function len(val) {
      try {
        return is.Object(val) ? Object.keys(val).length : is.Map(val) || is.Set(val) ? val.size : val.length;
      } catch (e) {}
      return -1;
    },
    indexOfDate: function indexOfDate(Collection, date) {
      for (var i = 0; i < Collection.length; i++) {
        if (+Collection[i] === +date) return i;
      }
      return -1;
    },
    type: function type() {
      var types = toArr(arguments).map(function(t) {
        return typeof t === "undefined" ? "undefined" : _typeof(t);
      });
      return types.length < 2 ? types[0] : types;
    },
    memoize: function memoize(func, resolver) {
      if (!is.Func(func) || resolver && !is.Func(resolver)) throw new TypeError("no function");
      var cache = new WeakMap(),
        memoized = function memoized() {
          var args = arguments,
            key = resolver ? resolver.apply(this, args) : args[0];
          if (cache.has(key)) return cache.get(key);
          var result = func.apply(this, args);
          memoized.cache = cache.set(key, result);
          return result;
        };
      return memoized;
    },
    millis: {
      min: 60000,
      sec: 1000,
      hour: 3600000,
      day: 86400000,
      seconds: function seconds(n) {
        return (n || 1) * 1000;
      },
      minutes: function minutes(n) {
        return (n || 1) * 60000;
      },
      hours: function hours(n) {
        return (n || 1) * 3600000;
      },
      days: function days(n) {
        return (n || 1) * 86400000;
      },
      weeks: function weeks(n) {
        return (n || 1) * 604800000;
      },
      months: function months(n, daysInMonth) {
        return n * Craft.millis.days(daysInMonth || 30);
      },
      years: function years(n) {
        return n * Craft.millis.days(365);
      }
    },
    observable: observable,
    CustomAttributes: [],
    Models: observable(),
    tabActive: !0,
    /**
     * Tail Call Optimization for recursive functional functions
     * @param fn - function that uses recursion inside
     */
    tco: function tco(fn) {
      var active = void 0,
        nextArgs = void 0;
      return function() {
        var result = void 0;
        nextArgs = arguments;
        if (!active) {
          active = !0;
          while (nextArgs) {
            result = fn.apply(this, [nextArgs, nextArgs = null][0]);
          }
          active = !1;
        }
        return result;
      };
    },
    animFrame: function animFrame(func) {
      var interval = void 0,
        options = {
          start: function start() {
            func();
            interval = requestAnimationFrame(options.start);
            return options;
          },
          stop: function stop() {
            if (is.int(interval)) cancelAnimationFrame(interval);
            return options;
          },
          reset: function reset(fn) {
            options.stop();
            if (is.Func(fn)) func = fn;
            return options.start();
          }
        };
      return options;
    },
    JumpTo: function JumpTo(target, options) {
      options = options || {};
      options.duration = options.duration || 400;
      options.offset = options.offset || 0;
      var startTime = void 0,
        elapsedTime = void 0,
        start = root.pageYOffset,
        distance = is.String(target) ? options.offset + dom(target, !0).getRect().top : target,
        loopIteration = 0,
        loop = function loop(time) {
          if (loopIteration == 0) startTime = time;
          loopIteration++;
          elapsedTime = time - startTime;
          scrollTo(0, function(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
          }(elapsedTime, start, distance, options.duration));
          if (elapsedTime < options.duration) requestAnimationFrame(loop);
          else {
            scrollTo(0, start + distance);
            if (is.Func(options.func)) options.func.call();
            startTime = ud;
          }
        };
      requestAnimationFrame(loop);
    },
    /**
     * converts Objects or URL variable strings to a FormData object
     * @param {object|string} val - values to convert
     */
    toFormData: function toFormData(val) {
      var formData = new FormData();
      if (is.String(val)) val = val.split('&');
      forEach(val, function(v) {
        if (is.String(v)) {
          v = v.split('=');
          if (v.length == 1) v[1] = '';
          formData.append(v[0], v[1]);
        } else formData.append(key, v);
      });
      return formData;
    },
    OnScroll: function OnScroll(element, func, pd) {
      return On('wheel', element, function(e) {
        if (pd) e.preventDefault();
        func(e.deltaY < 1, e);
      });
    },
    /**
     * returns a promise when the DOM and WebComponents are all finished loading
     * @returns {promise} - when everything is done loading WhenReady will return a promise
     */
    get WhenReady() {
      return new Promise(function(pass, fail) {
        if (Ready || doc.readyState === "complete") return pass();
        var check = setInterval(function() {
          if (Ready || doc.readyState === "complete") {
            pass();
            clearInterval(check);
          }
        }, 20);
        setTimeout(function() {
          clearInterval(check);
          if (!Ready || doc.readyState === "complete") fail('loading took too long loaded with errors :(');
        }, 5500);
      });
    },
    model: function model(name, func) {
      if (is.Func(func) && is.String(name)) {
        if (!is.Def(Craft.Models[name])) {
          var _ret3 = function() {
            var scope = observable();
            Craft.Models[name] = {
              func: func.bind(scope),
              scope: scope
            };
            return {
              v: {
                view: function view(fn) {
                  Craft.WhenReady.then(fn.bind(scope, scope));
                }
              }
            };
          }();
          if ((typeof _ret3 === "undefined" ? "undefined" : _typeof(_ret3)) === "object") return _ret3.v;
        }
        throw new Error('Craft Model already exists');
      }
    },
    fromModel: function fromModel(key, val) {
      var cutkey = cutdot(key),
        ck = cutkey[0];
      if (is.Def(Craft.Models[ck])) {
        var vd = is.Def(val),
          _type2 = (vd ? 'set' : 'get') + 'Deep';
        return cutkey.length == 1 && !vd ? Craft.Models[ck].scope : Craft[_type2](Craft.Models[ck].scope, joindot(Craft.omit(cutkey, ck)), val);
      }
    },
    getPath: function getPath(path, full) {
      try {
        var cutbind = cutdot(path),
          prop = last(cutbind),
          first = cutbind[0],
          obj = is.Def(Craft.Models[first]) ? Craft.Models[first].scope : Craft.getDeep(root, joindot(Craft.omit(cutbind, prop))),
          _val = Craft.getDeep(obj, cutbind.length > 1 ? joindot(Craft.omit(cutbind, first)) : prop);
        if (full) return {
          cutbind: cutbind,
          prop: prop,
          obj: obj,
          val: _val
        };
        if (is.Def(_val)) return _val;
        if (!full && first === prop && is.Def(obj)) return obj;
      } catch (e) {
        throw new Error(e);
      }
    },
    /**
     * defines custom attributes
     * @param {string} name - the name of your custom attribute
     * @param {function} handle - a function to handle how your custom attribute behaves
     * @example Craft.customAttr('turngreen', element => element.css({ background : 'green'}));
     **/
    customAttr: function customAttr(name, handle) {
      if (is.Func(handle)) {
        (function() {
          var apply = function apply() {
            queryEach("[" + name + "]", function(el) {
              el = dom(el);
              if (el.hasAttr(name)) {
                if (!is.Arr(el.customAttr)) el.customAttr = [];
                if (!el.customAttr.includes(name)) {
                  el.customAttr.push(name);
                  handle(el, el.getAttr(name));
                }
              }
            });
          };
          Craft.CustomAttributes.push({
            name: name,
            handle: handle
          });
          Ready ? apply() : Craft.WhenReady.then(function() {
            setTimeout(apply, 20);
          });
        })();
      }
    },
    poll: function poll(test, interval, timeout) {
      return new Promise(function(pass, fail) {
        if (!is.Def(timeout)) interval = timeout;
        var isfn = is.Func(test),
          Interval = setInterval(function() {
            if (test || isfn && !test()) {
              pass();
              clearInterval(Interval);
            }
          }, interval || 20);
        if (is.Num(timeout)) setTimeout(function() {
          if (test || isfn && !test()) fail();
          clearInterval(Interval);
        }, timeout);
      });
    },
    /**
     * Usefull method for validating passwords , example Craft.strongPassword('#MyFancyPassword18',8,true,true,"#") -> true requirements met
     * @param {string} pass - string containing the password
     * @param {Number} length - Character length in numbers (Minimum password length)
     * @param {Boolean} caps - Should the password contains Capital Letters
     * @param {Boolean} number - should the password contain Numbers
     * @param {Boolean} reasons - should the function return a short string explaining the reason exept when it's a pass then it gives a bool;
     * @param {...string} includeChars - every extra argument should be a string containing a character you want the password to include
     */
    strongPassword: function strongPassword(pass, length, caps, number, reasons) {
      var pw = 'Password ';
      if (pass.length <= length - 1) return reasons ? pw + 'too short' : !1;
      if (caps === !0 && Craft.hasCapitals(pass) === !1) return reasons ? pw + 'should have a Capital letter' : !1;
      if (number === !0 && /\d/g.test(pass) === !1) return reasons ? pw + 'should have a number' : !1;
      for (var _len17 = arguments.length, includeChars = Array(_len17 > 5 ? _len17 - 5 : 0), _key19 = 5; _key19 < _len17; _key19++) {
        includeChars[_key19 - 5] = arguments[_key19];
      }
      if (includeChars.length) {
        var hasChars = !0;
        includeChars.forEach(function(ch) {
          hasChars = pass.includes(ch);
        });
        if (!hasChars) return reasons ? '' : !1;
      }
      return !1;
    },
    formatBytes: function formatBytes(bytes, decimals) {
      if (bytes == 0) return '0 Byte';
      var k = 1000,
        i = Math.floor(Math.log(bytes) / Math.log(k));
      return (bytes / Math.pow(k, i)).toPrecision(decimals + 1 || 3) + ' ' + ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][i];
    },
    /** method for generating random alphanumeric strings*/ randomString: function randomString() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    },
    /**
     * similar to Craft.randomString in that it generates a unique string , in this case a Unique ID with random alphanumeric strings separated by hyphens
     * example 0ebf-c7d2-ef81-2667-08ef-4cde
     * @param {number=} len - optional length of uid sections
     */
    GenUID: function GenUID(len) {
      return Craft.array(len || 6, Craft.randomString).join('-');
    },
    /**
     * method for creating custom elements configuring their lifecycle's and inheritance
     * the config Object has 7 distinct options ( created , inserted , destroyed , attr, css, set_X and get_X )
     * @param {string} tag - a hyphenated custom HTML tagname for the new element -> "custom-element"
     * @param {object} config - Object containing all the element's lifecycle methods / extends and attached methods or properties
     */
    newComponent: function newComponent(tag, config) {
      if (!is.Def(config)) throw new Error(tag + ' : config undefined');
      var element = Object.create(HTMLElement.prototype),
        settings = {},
        dm = void 0;
      element.createdCallback = function() {
        var el = dom(this),
          dealtWith = [];
        for (var _key20 in config) {
          if (!dealtWith.includes(_key20)) {
            if (_key20.includes("set_")) {
              var sgKey = _key20.split("_")[1];
              dealtWith.push(_key20, "get_" + sgKey);
              el.newSetGet(sgKey, config[_key20], config["get_" + sgKey]);
            } else if (_key20.includes("get_")) {
              var _sgKey = _key20.split("_")[1];
              dealtWith.push(_key20, "set_" + _sgKey);
              el.newSetGet(_sgKey, is.Func(config["set_" + _sgKey]) ? config["set_" + _sgKey] : function(x) {}, config[_key20]);
            }
          }
        }
        if (is.Func(config['created'])) return config['created'].call(el);
      };
      var _loop = function _loop(_key21) {
        if (_key21 == 'created' || _key21.includes('set_') || _key21.includes('get_')) return "continue";
        if (is.Func(config[_key21])) dm = function dm() { // Adds dom methods to element
          return config[_key21].call(dom(this));
        };
        _key21 == 'inserted' ? element.attachedCallback = dm : _key21 == 'destroyed' ? element.detachedCallback = dm : _key21 == 'attr' ? element.attributeChangedCallback = dm : _key21.includes('css') && _key21.length == 3 ? Craft.addCSS(config[_key21]) : is.Func(config[_key21]) ? element[_key21] = dm : Object.defineProperty(element, _key21, Object.getOwnPropertyDescriptor(config, _key21));
      };
      for (var _key21 in config) {
        var _ret5 = _loop(_key21);
        if (_ret5 === "continue") continue;
      }
      settings['prototype'] = element;
      doc.registerElement(tag, settings);
    },
    SyncInput: function SyncInput(input, obj, key) {
      if (is.String(input)) input = query(input);
      if (is.Input(input)) input[sI] = On(input).Input(function(e) {
        Craft.setDeep(obj, key, input.value);
      });
    },
    disconectInputSync: function disconectInputSync(input) {
      if (is.String(input)) input = query(input);
      if (is.Node(input) && is.Def(input[sI])) {
        input[sI].Off;
        delete input[sI];
      }
    },
    onTabChange: function onTabChange(fn) {
      var options = {get Off() {
          tabListners = Craft.omit(tabListeners, fn);
          return options;
        },
        get On() {
          tabListeners.push(fn);
          return options;
        }
      };
      return options.On;
    }
  };
  head.appendChild(dom.style('', 'crafterstyles'));
  var TabChange = function TabChange(ta) {
    return function() {
      tabActive = ta;
      forEach(tabListeners, function(tl) {
        tl(tabActive);
      });
    };
  };
  Object.defineProperty(Craft, 'tabActive', {
    get: function get() {
      return tabActive;
    }
  });
  On('blur', TabChange(!1));
  On('focus', TabChange(!0));
  Craft.ForEach = Craft.tco(function ForEach(collection, func, i) {
    if (is.Undef(i)) i = 0;
    if (collection.length != i) {
      func(collection[i], i);
      ForEach(collection, func, i + 1);
    }
  });
  Craft.loader.removeAll(!0);
  Craft.curry.to = Craft.curry(function(arity, fn) {
    return makeFn(fn, [], arity);
  });
  Craft.curry.adaptTo = Craft.curry(function(num, fn) {
    return Craft.curry.to(num, function(context) {
      fn.apply(null, Craft.omit(arguments, context).slice(1).concat(context));
    });
  });
  Craft.curry.adapt = function(fn) {
    return Craft.curry.adaptTo(fn.length, fn);
  };
  Craft.customAttr('bind', function(element, bind) {
    element.bind(bind);
  });
  Craft.customAttr('link', function(el, link) {
    el.linkevt = On(el).Click(function(e) {
      (el.hasAttr('newtab') ? open : Craft.router.open)(link);
    });
  });
  Craft.customAttr('color-accent', function(element, color) {
    if (is.Func(element.colorAccent)) element.colorAccent(color);
    else if (is.Object(element.colorAccent)) {
      if (!element._cah.dw) {
        element._cah.fn(color);
        element._cah.dw = !1;
      }
    }
  });

  function manageAttr(el) {
    for (var attr, i = 0; i < Craft.CustomAttributes.length; i++) {
      attr = Craft.CustomAttributes[i];
      if (el.hasAttribute(attr.name)) {
        if (!is.Array(el.customAttr)) el.customAttr = [];
        if (!el.customAttr.includes(attr.name)) {
          el.customAttr.push(attr.name);
          attr.handle(dom(el), el.getAttribute(attr.name));
        }
        break;
      }
    }
  }
  Craft.Models.$set(function(key, model) {
    model.func(model.scope);
  });
  var DestructionEvent = new Event('destroy');

  function init() {
    Craft.router.links.forEach(function(link) {
      link();
    });
    Craft.DomObserver = new MutationObserver(function(muts) {
      forEach(muts, function(mut) {
        mut.removedNodes.forEach(function(el) {
          el.dispatchEvent(DestructionEvent);
        });
        mut.addedNodes.forEach(function(el) {
          if (el['hasAttribute']) manageAttr(el);
        });
        if (mut.type == 'attributes' && mut.target.hasAttribute(mut.attributeName)) manageAttr(mut.target);
      });
    });
    Craft.DomObserver.observe(doc.body, {
      attributes: !0,
      childList: !0,
      characterData: !0,
      characterDataOldValue: !0,
      subtree: !0
    });
    Ready = !0;
  }
  doc.readyState != "complete" ? Once("DOMContentLoaded", doc, init) : init();
  On('hashchange', function() {
    Craft.router.handlers.forEach(function(handle) {
      if (Locs(function(l) {
          return l == handle.link;
        })) handle.func(location.hash);
    });
  });
})(document, self);