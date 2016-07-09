var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
  return typeof obj;
} : function(obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
/*
 *  @version 0.0.9
 *  @overview Crafter.js , minimalist front-end library
 *  @author Saul van der Walt - https://github.com/SaulDoesCode/
 *  @license MIT  Licence (c) Copyright 2016 Saul van der Walt
 */
(function(doc, root) {
  'use strict';
  var Ready = false,
    ua = navigator.userAgent,
    tem = void 0,
    Br = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
  if (Br && (tem = ua.match(/version\/([\.\d]+)/i)) !== null) Br[2] = tem[1];
  Br = (Br ? [Br[1], Br[2]] : [navigator.appName, navigator.appVersion, '-?']).join(' ');
  var newMap = function() {
      return new Map();
    },
    newSet = function() {
      return new Set();
    },
    slice = function(ctx, i) {
      return ctx.slice ? ctx.slice(i || 0) : Array.prototype.slice.call(ctx, i || 0);
    };
  /**
   * Slices any arraylike object.
   * @method slice
   * @for Craft
   * @param {arraylike} ctx - object to slice
   * @param {int|String} i - value to slice defaults to 0
   */
  /**
   * curry takes a function as a parameter and returns another function until all the arguments of the initializer function has been provided.
   * @method curry
   * @for Craft
   * @param {Function} fn - function to curry
   * @param {Class|Function|Object} ctx - context to bind the function to
   * @return {Function|*}
   */
  function curry(fn, ctx) {
    var arity = fn.length;

    function curried() {
      var args = slice(arguments);
      return args.length < arity ? function() {
        for (var _len = arguments.length, more = Array(_len), _key = 0; _key < _len; _key++) {
          more[_key] = arguments[_key];
        }
        return curried.apply(null, args.concat(more));
      } : fn.apply(ctx || this, args);
    }
    return curried;
  } // tests arguments with Array.prototype.every;
  var ta = function(test) {
      return function() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        return args.length >= 1 && args.every(test);
      };
    },
    last = function(arr) {
      return arr[arr.length - 1];
    },
    first = function(arr) {
      return arr[0];
    },
    removeFrom = function(arr, i) {
      var index = arr.indexOf(i);
      return index > -1 ? arr.splice(index, 1) : arr;
    },
    toArr = function(arr) {
      return Array.isArray(arr) ? arr : typeof arr.length != "undefined" ? Array.from(arr) : [arr];
    },
    sI = 'InputSync',
    DestructionEvent = new Event('destroy'),
    possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    undef = void 0,
    defineprop = Object.defineProperty,
    getpropdescriptor = Object.getOwnPropertyDescriptor,
    def = ta(function(o) {
      return typeof o !== 'undefined';
    }),
    nil = ta(function(o) {
      return o === null;
    }),
    isFunc = function(o) {
      return typeof o === 'function';
    },
    isStr = function(o) {
      return typeof o === 'string';
    },
    isObj = function(o) {
      return toString.call(o) === '[object Object]';
    },
    isEl = function(o) {
      return o.toString().includes('HTML');
    },
    isArr = Array.isArray,
    ready = function() {
      return Ready || doc.readyState == 'complete';
    },
    promise = function(func) {
      return new Promise(func);
    },
    noop = function() {},
    head = doc.head,
    RegExps = {
      email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
      timeString: /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/,
      dateString: /^(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/(?:[0-9]{2})?[0-9]{2}$/,
      hexadecimal: /^[0-9a-fA-F]+$/,
      hexColor: /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/
    },
    desc = function(value, write, enumerable) {
      return {
        value: value,
        write: is.Bool(write) ? write : false,
        enumerable: is.Bool(enumerable) ? enumerable : false
      };
    };
  /**
   *  get the last item in an array or arraylike collection
   *  @method last
   *  @for Craft
   *  @param {Array|Arraylike} arr - array or arraylike collection
   *  @return {*} last item in collection
   */
  /**
   *  get the first item in an array or arraylike collection
   *  @method first
   *  @for Craft
   *  @param {Array|Arraylike} arr - array or arraylike collection
   *  @return {*} first item in collection
   */
  /**
   * Convert Arraylike variables to Array synonym for Array.from
   * @method toArr
   * @pram {Arraylike} val - arraylike value to convert to array
   * @return {Array}
   */
  /**
   * creates a document fragment from a string (document, fragment, from, String} - dffstr
   * @method dffstr
   * @for Craft
   * @param {String} html - text to convert to html
   */
  function dffstr(html) {
    return doc.createRange().createContextualFragment(html || '');
  } // get the string form of any object
  // then compare it to a given string
  function type(obj, str) {
    return toString.call(obj) === str;
  }
  /**
   * Checks whether a collection or object contains a certain value.
   * @method has
   * @for Craft
   * @param {object|arraylike|set|map} host - collection or object to search in
   * @param {*} value - the value to look for
   * @param {Boolean} or - some or every, some by default
   */
  function has(host, value, or) {
    if (is.Arraylike(host)) return slice(host)[!or ? 'every' : 'some'](host.includes.bind(host));
    if (isObj(host)) return Object.prototype.hasOwnProperty.call(host, value);
    if (is.Set(host) || is.Map(host)) return host.has(value);
  }
  /**
   * maps through arraylike and object values;
   * @method map
   * @for Craft
   * @param {Arraylike|Object} collection
   * @param {Function} func - mapping function
   */
  var map = curry(function(collection, func) {
    if (is.Arraylike(collection)) return Array.prototype.map.call(collection, func);
    Object.keys(collection).map(function(key) {
      var val = collection.isObservable ? collection.get(key) : collection[key],
        mappee = func(val, key, collection);
      if (val != undef && val != mappee) collection.isObservable ? collection.set(key, mappee) : collection[key] = mappee;
    });
    return collection;
  });
  /**
   * converts a number or string value to an integer
   * @method toInt
   * @for Craft
   * @param {Number|String} num - number to convert
   * @return {Number} integer number
   */
  function toInt(num) {
    if (isStr(num)) num = Number(num);
    if (isNaN(num)) return 0;
    if (num === 0 || !isFinite(num)) return num;
    return (num > 0 ? 1 : -1) * Math.floor(Math.abs(num));
  }
  /**
   * Splits a string at dots ".".
   * @method cutdot
   * @for Craft
   * @param {String} str - string to split at the dots
   */
  var cutdot = function(str) {
      return str.split('.');
    },
    joindot = function(arr) {
      return slice(arr).join('.');
    },
    is = {
      /**
       * Test if something is a Boolean type
       * @method Bool
       * @for is
       * @param {...*} args - value/values to test
       */
      Bool: ta(function(o) {
        return typeof o === 'Boolean';
      }),
      /**
       * Test if something is a String
       * @method Str
       * @for is
       * @param {*} val - value to test
       */
      Str: isStr,
      /**
       * Test if values are strings
       * @method Str
       * @for is
       * @param {...*} args - value/values to test
       */
      String: ta(isStr),
      /**
       * Test if something is an Array
       * @method Arr
       * @for is
       * @param {...*} args - value/values to test
       */
      Arr: ta(isArr),
      /**
       * Array.isArray alias for convenience and performance when only one argument is present
       * @method Array
       * @for is
       * @param {*} val - value to test
       */
      Array: isArr,
      /**
       * Test if a value or multiple values are Array-Like
       * @method Arraylike
       * @for is
       * @param {...*} args - value/values to test
       */
      Arraylike: ta(function(o) {
        try {
          return def(o.length);
        } catch (e) {}
        return false;
      }),
      /**
       * Determine whether a value is undefined
       * @method Undef
       * @for is
       * @param {...*} args - value/values to test
       */
      Undef: function() {
        return !def.apply(this, arguments);
      },
      /**
       * Determine whether a value is in fact defined
       * @method Def
       * @for is
       * @param {...*} args - value/values to test
       */
      Def: def,
      /**
       * Determine whether a value is null
       * @method Null
       * @for is
       * @param {...*} args - value/values to test
       */
      Null: ta(function(o) {
        return o === null;
      }),
      /**
       * Determine whether a value is a DOM Node
       * @method Node
       * @for is
       * @param {...*} args - value/values to test
       */
      Node: ta(function(o) {
        return o instanceof Node;
      }),
      /**
       * Test an element's tagname
       * @method Tag
       * @for is
       * @param {Node} element - node to test
       * @param {String} tag - tag to test node for
       */
      Tag: function(element, tag) {
        return isEl(element) ? element.tagName === tag.toUpperCase() : false;
      },
      /**
       * Determine whether a value is a DOM NodeList or Collection of Nodes
       * @method NodeList
       * @for is
       * @param {...*} args - value/values to test
       */
      NodeList: ta(function(nl) {
        return nl instanceof NodeList || is.Arraylike(nl) && !is.empty(nl) ? Array.prototype.every.call(nl, function(n) {
          return n instanceof Node;
        }) : false;
      }),
      /**
       * Determine if a value is a Number
       * @method Num
       * @for is
       * @param {...*} args - value/values to test
       */
      Num: ta(function(o) {
        return !isNaN(Number(o));
      }),
      /**
       * Determine if a value is an Object
       * @method Object
       * @for is
       * @param {...*} args - value/values to test
       */
      Object: ta(isObj),
      /**
       * Determine if a value is an Object
       * @method Obj
       * @for is
       * @param {...*} args - value/values to test
       */
      Obj: isObj,
      /**
       * Determine if a sring is JSON
       * @method Json
       * @for is
       * @param {...*} args - value/values to test
       */
      Json: ta(function(str) {
        try {
          JSON.parse(str);
          return true;
        } catch (e) {}
        return false;
      }),
      /**
       * Determine if a value is a HTMLElement
       * @method Element
       * @for is
       * @param {...*} args - value/values to test
       */
      Element: ta(isEl),
      /**
       * Determine if a value is a File Object
       * @method File
       * @for is
       * @param {...*} args - value/values to test
       */
      File: ta(function(o) {
        return type(o, '[object File]');
      }),
      /**
       * Determine if a value is of a FormData type
       * @method FormData
       * @for is
       * @param {...*} args - value/values to test
       */
      FormData: ta(function(o) {
        return type(o, '[object FormData]');
      }),
      /**
       * Determine if a value is a Map
       * @method Map
       * @for is
       * @param {...*} args - value/values to test
       */
      Map: ta(function(o) {
        return type(o, '[object Map]');
      }),
      /**
       * Determine if a value is a function
       * @method Func
       * @for is
       * @param {...*} args - value/values to test
       */
      Func: ta(isFunc),
      /**
       * Determine if a variable/s are true
       * @method True
       * @for is
       * @param {...*} args - value/values to test
       */
      True: ta(function(o) {
        return o === true;
      }),
      /**
       * Determine if a variable/s are false
       * @method False
       * @for is
       * @param {...*} args - value/values to test
       */
      False: ta(function(o) {
        return !o;
      }),
      /**
       * Determine if a value is of Blob type
       * @method Blob
       * @for is
       * @param {...*} args - value/values to test
       */
      Blob: ta(function(o) {
        return type(o, '[object Blob]');
      }),
      /**
       * Determine if a value is a Regular Expression
       * @method RegExp
       * @for is
       * @param {...*} args - value/values to test
       */
      RegExp: ta(function(o) {
        return type(o, '[object RegExp]');
      }),
      /**
       * Determine if a value is a Date type
       * @method Date
       * @for is
       * @param {...*} args - value/values to test
       */
      Date: ta(function(o) {
        return type(o, '[object Date]');
      }),
      /**
       * Determine if a value is a Set.
       * @method Set
       * @for is
       * @param {...*} args - value/values to test
       */
      Set: ta(function(o) {
        return type(o, '[object Set]');
      }),
      /**
       * Determine if a value is of type Arguments
       * @method Args
       * @for is
       * @param {*} val - value/values to test
       */
      Args: function(val) {
        return !nil(val) && type(val, '[object Arguments]');
      },
      /**
       * Determine if a value is a Symbol
       * @method Symbol
       * @for is
       * @param {...*} args - value/values to test
       */
      Symbol: ta(function(obj) {
        return type(obj, '[object Symbol]');
      }),
      /**
       * tests if a value is a single character
       * @method char
       * @for is
       * @param {...String} values to test
       */
      char: ta(function(val) {
        return isStr(val) && val.length == 1;
      }),
      /**
       * tests if a value is a space character
       * @method space
       * @for is
       * @param {...String} values to test
       */
      space: ta(function(val) {
        return is.char(val) && val.charCodeAt(0) > 8 && val.charCodeAt(0) < 14 || val.charCodeAt(0) === 32;
      }),
      /**
       * Determine if a String is UPPERCASE
       * @method Uppercase
       * @for is
       * @param {String} char - value to test
       */
      Uppercase: function(str) {
        return isStr(str) && !is.Num(str) && str === str.toUpperCase();
      },
      /**
       * Determine if a String is LOWERCASE
       * @method Lowercase
       * @for is
       * @param {String} char - value to test
       */
      Lowercase: function(str) {
        return isStr(str) && str === str.toLowerCase();
      },
      /**
       * Determine if a String contains only characters and numbers (alphanumeric)
       * @method Alphanumeric
       * @for is
       * @param {String} str - value to test
       */
      Alphanumeric: function(str) {
        return (/^[0-9a-zA-Z]+$/.test(str));
      },
      /**
       * Determines whether a String is a valid email
       * @method email
       * @for is
       * @param {String} email - value to test
       */
      email: function(email) {
        return RegExps.email.test(email);
      },
      /**
       * Determines whether a String is a URL
       * @method URL
       * @for is
       * @param {String} url - value to test
       */
      URL: function(url) {
        try {
          new URL(url);
          return true;
        } catch (e) {}
        return false;
      },
      /**
       * Determines whether a String is a HEX-COLOR (#fff123)
       * @method HexColor
       * @for is
       * @param {String} HexColor - value to test
       */
      HexColor: function(hexColor) {
        return RegExps.hexColor.test(hexColor);
      },
      /**
       * Determines whether a String is hexadecimal
       * @method hexadecimal
       * @for is
       * @param {String} hexadecimal - value to test
       */
      hexadecimal: function(hexadecimal) {
        return RegExps.hexadecimal.test(hexadecimal);
      },
      /**
       * checks wether a date is today
       * @method today
       * @for is
       * @param {Date} obj - Date to test
       */
      today: function(obj) {
        return is.Date(obj) && obj.toDateString() === new Date().toDateString();
      },
      /**
       * checks wether a date is yesterday
       * @method yesterday
       * @for is
       * @param {Date} obj - Date to test
       */
      yesterday: function(obj) {
        if (is.Date(obj)) {
          var now = new Date();
          return obj.toDateString() === new Date(now.setDate(now.getDate() - 1)).toDateString();
        }
        return false;
      },
      /**
       * checks wether a date is tommorow
       * @method tomorrow
       * @for is
       * @param {Date} obj - Date to test
       */
      tomorrow: function(obj) {
        if (is.Date(obj)) {
          var now = new Date();
          return is.Date(obj) && obj.toDateString() === new Date(now.setDate(now.getDate() + 1)).toDateString();
        }
        return false;
      },
      /**
       * Determines if a date is in the past
       * @method past
       * @for is
       * @param {String|Date} obj - Date to test
       */
      past: function(obj) {
        try {
          if (!is.Date(obj)) obj = isStr(obj) ? new Date(is.Num(obj) ? Number(obj) : obj) : new Date(obj);
        } catch (e) {}
        return is.Date(obj) && obj.getTime() < new Date().getTime();
      },
      /**
       * Determines if a date is in the future
       * @method future
       * @for is
       * @param {String|Date} obj - Date to test
       */
      future: function(obj) {
        return !is.past(obj);
      },
      /**
       * Determines whether a String is a timeString
       * @method time
       * @for is
       * @param {String} time - value to test
       */
      time: function(time) {
        return RegExps.timeString.test(time);
      },
      /**
       * Determines whether a String is a dateString
       * @method dateString
       * @for is
       * @param {String} dateString - value to test
       */
      dateString: function(dateString) {
        return RegExps.dateString.test(dateString);
      },
      /**
       * Determines whether a Number is between a maximum and a minimum
       * @method between
       * @for is
       * @param {Number} val - number value to test
       * @param {Number} max - maximum to compare the value with
       * @param {Number} min - minimum to compare the value with
       * @return {Boolean} wether or not the value is between the max and min
       */
      between: curry(function(val, max, min) {
        return val <= max && val >= min;
      }),
      /**
       * checks if a number is an integer
       * @method int
       * @for is
       * @param {*} val - value to test
       */
      int: function(val) {
        return is.Num(val) && val % 1 === 0;
      },
      /**
       * checks if a number is an even number
       * @method even
       * @for is
       * @param {*} val - value to test
       */
      even: function(val) {
        return is.Num(val) && val % 2 === 0;
      },
      /**
       * checks if a number is an odd number
       * @method odd
       * @for is
       * @param {*} val - value to test
       */
      odd: function(val) {
        return is.Num(val) && val % 2 !== 0;
      },
      /**
       * @method positive
       * checks if a number is positive
       * @for is
       * @param {*} val - value to test
       */
      positive: function(val) {
        return is.Num(val) && val > 0;
      },
      /**
       * checks if a number is positive
       * @method negative
       * @for is
       * @param {*} val - value to test
       */
      negative: function(val) {
        return is.Num(val) && val < 0;
      },
      /**
       * tests that all parameters following the first are not the same as the first
       * @method neither
       * @for is
       * @param {*} value - inital value to compare all other params with
       * @param {...*} arguments to compare with value
       */
      neither: function(value) {
        return slice(arguments, 1).every(function(val) {
          return value !== val;
        });
      },
      /**
       * Determines if two variables are equal
       * @method eq
       * @for is
       * @param a - first value to compare
       * @param b - second value to compare
       */
      eq: curry(function(a, b) {
        return a === b;
      }),
      /**
       * Returns the a || b
       * @method or
       * @for is
       * @param a - first value to compare
       * @param b - second value to compare
       */
      or: curry(function(a, b) {
        return a || b;
      }),
      /**
       * Determines if a number is LOWER than another
       * @method lt
       * @for is
       * @param {Number} val - value to test
       * @param {Number} other - num to test with value
       */
      lt: curry(function(val, other) {
        return val < other;
      }),
      /**
       * Determines if a number is LOWER than or equal to another
       * @method lte
       * @for is
       * @param {Number} val - value to test
       * @param {Number} other - num to test with value
       */
      lte: curry(function(val, other) {
        return val <= other;
      }),
      /**
       * Determines if a number is BIGGER than another
       * @method bt
       * @for is
       * @param {Number} val - value to test
       * @param {Number} other - num to test with value
       */
      bt: curry(function(val, other) {
        return val > other;
      }),
      /**
       * Determines if a number is BIGGER than or equal to another
       * @method bte
       * @for is
       * @param {Number} val - value to test
       * @param {Number} other - num to test with value
       */
      bte: curry(function(val, other) {
        return val >= other;
      }),
      /**
       * Determines if a given collection or string is empty
       * @method empty
       * @for is
       * @param {Object|Array|String} val - value to test if empty
       */
      empty: ta(function(val) {
        try {
          return !(isObj(val) ? Object.keys(val).length : is.Map(val) || is.Set(val) ? val.size : val.length) || val === '';
        } catch (e) {}
        return false;
      }),
      /**
       * Tests if something is a Native JavaScript feature
       * @method Native
       * @for is
       * @param {*} val - value to test
       */
      Native: function(val) {
        var type = typeof val === 'undefined' ? 'undefined' : _typeof(val);
        return isFunc(val) ? RegExp('^' + String(Object.prototype.toString).replace(/[.*+?^${}()|[\]\/\\]/g, '\\$&').replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$').test(Function.prototype.toString.call(val)) : val && type == 'object' && /^\[object .+?Constructor\]$/.test(val.toString) || false;
      },
      /**
       * Tests where a dom element is an input of some sort
       * @method Input
       * @for is
       * @param {Element|Node} - element to test
       */
      Input: function(element) {
        return isEl(element) && ['INPUT', 'TEXTAREA'].some(function(i) {
          return element.tagName.includes(i);
        });
      }
    };
  /**
   * joins a string array with dots "."
   * @method joindot
   * @for Craft
   * @param {Array|Arraylike} arr - array to join with dots
   */
  /**
   * is - Type Testing / Assertion
   * @class is
   */
  /**
   * Easy way to loop through Collections, Objects and Numbers
   * @method forEach
   * @for Craft
   * @param {Array|Object|NodeList|Number|Arguments} iterable - any collection that is either an Object or has a .length value
   * @param {Function} func - function called on each iteration -> "function( value , indexOrKey ) {...}"
   */
  function forEach(iterable, func) {
    if (isFunc(func)) {
      var i = 0;
      if (is.Arraylike(iterable) && !localStorage)
        for (; i < iterable.length; i++) {
          func(iterable[i], i, iterable);
        } else if (is.int(iterable) && !isStr(iterable))
          while (iterable != i) {
            func(i++);
          } else
            for (i in iterable) {
              if (iterable.hasOwnProperty(i)) func(iterable[i], i, iterable);
            }
    }
  }
  /**
   * Checks an array's length if the array contains only a single item it is returned.
   * @method deglove
   * @for Craft
   * @param {array|arraylike) arr - collection to deglove
   * @return (array|*)
   */
  var deglove = function(arr) {
    return is.Arraylike(arr) && arr.length == 1 ? arr[0] : arr;
  };
  /**
   * Method to merge the properties of multiple objects , it can handle getters or setters without breaking them
   * @method concatObjects
   * @for Craft
   * @param {Object} host - main object to merge with all subsequent objects
   * @param {...Object} objs - other objects to be merged with host object
   * @return {Object} resulting object after merges
   */
  function concatObjects(host) {
    slice(arguments, 1).map(function(obj) {
      for (var _key3 in obj) {
        defineprop(host, _key3, getpropdescriptor(obj, _key3));
      }
    });
    return host;
  }

  function listener() {
    var container = newMap(),
      actions = {
        delete: function(type, func) {
          if (actions.has(type, func)) {
            var handlers = container.get(type);
            if (!handlers.size) container.delete(type);
            if (handlers.has(func)) handlers.delete(func);
          }
        },
        set: function(type, func, once) {
          if (isFunc(func)) {
            if (!container.has(type)) container.set(type, newSet());
            if (once === true) func.__isOnce = true;
            container.get(type).add(func);
          }
        },
        get: function(type) {
          return container.get(type);
        },
        has: function(type, func) {
          return container.size > 0 && container.has(type) && container.get(type).has(func);
        },
        loop: function(type, fn) {
          if (container.size > 0 && container.has(type)) {
            (function() {
              var handlers = container.get(type);
              handlers.forEach(function(handler) {
                fn(handler);
                if (handler.__isOnce === true) handlers.delete(handler);
              });
            })();
          }
        },
        makeHandle: function(type, func) {
          if (!isFunc(func)) throw new TypeError('eventsys : listener needs a function');
          return {
            on: function() {
              isArr(type) ? type.map(function(t) {
                actions.set(t, func);
              }) : actions.set(type, func);
              return this;
            },
            once: function() {
              isArr(type) ? type.map(function(t) {
                actions.set(t, func, true);
              }) : actions.set(type, func, true);
              return this;
            },
            off: function() {
              isArr(type) ? type.map(function(t) {
                actions.delete(t, func);
              }) : actions.delete(type, func);
              return this;
            }
          };
        }
      };
    return actions;
  }
  /**
   * Adds an Event System to Arbitrary Objects and Classes.
   * @method eventsys
   * @for Craft
   * @param {Object|Function|Class} obj - object to convert
   */
  function eventsys(obj) {
    if (!obj) obj = {};
    var listeners = listener(),
      stop = false;
    obj.on = function(type, func) {
      return listeners.makeHandle(type, func).on();
    };
    obj.once = function(type, func) {
      return listeners.makeHandle(type, func).once();
    };
    obj.off = function(type, func) {
      return listeners.makeHandle(type, func).off();
    };
    obj.emit = function(type) {
      var _arguments = arguments;
      if (!stop && isStr(type)) {
        (function() {
          var args = slice(_arguments, 1);
          listeners.loop(type, function(handle) {
            handle.apply(obj, args);
          });
        })();
      } else throw new TypeError('eventsys : you cannot emit that! ' + type);
    };
    obj.stopall = function(state) {
      return stop = isBool(state) ? state : true;
    };
    obj.defineHandle = function(name, type) {
      if (!type) type = name;
      obj[name] = function(fn, useOnce) {
        return obj[useOnce ? 'once' : 'on'](type, fn);
      };
    };
    return obj;
  }
  /**
   * Creates observables.
   * @method observable
   * @for Craft
   * @param {Object|Function|Class} obj - object to convert
   */
  function observable(obj) {
    if (!obj) obj = {};
    obj = eventsys(obj);
    var listeners = listener();
    defineprop(obj, 'isObservable', desc(true));
    ['$get', '$set'].map(function(prop) {
      var accessor = prop == '$get' ? 'Get' : 'Set';
      defineprop(obj, prop, desc(function(prop, func) {
        if (isFunc(prop)) {
          func = prop;
          prop = '*';
        }
        if (!isFunc(func)) throw new Error('.' + prop + ' no function');
        func.prop = isStr(prop) ? prop : '*';
        return listeners.makeHandle(accessor, func).on();
      }));
    });
    defineprop(obj, 'get', desc(function(key) {
      if (key != 'get' && key != 'set') {
        var _val = void 0;
        listeners.loop('Get', function(ln) {
          if (ln.prop === '*' || ln.prop === key) _val = ln(key, obj);
        });
        return _val != undef ? _val : obj[key];
      } else return obj[key];
    }));
    defineprop(obj, 'set', desc(curry(function(key, value) {
      var val = void 0;
      listeners.loop('Set', function(ln) {
        if (ln.prop === '*' || ln.prop === key) ln(key, value, obj, Object.hasOwnProperty(obj, key));
      });
      val = val != undef ? val : value;
      if (isObj(val) && !val.isObservable) val = observable(val);
      obj[key] = val;
      obj.emit('$uberset:' + key, val);
    })));
    for (var _key4 in obj) {
      if (isObj(obj[_key4]) && !obj[_key4].isObservable) obj[_key4] = observable(obj[_key4]);
    }
    if (typeof Proxy != 'undefined') return new Proxy(obj, {
      get: function(target, key) {
        if (key != 'get' && key != 'set') {
          var _val2 = void 0;
          listeners.loop('Get', function(ln) {
            if (ln.prop === '*' || ln.prop === key) _val2 = ln(key, target);
          });
          return _val2 != undef ? _val2 : Reflect.get(target, key);
        }
        return Reflect.get(target, key);
      },
      set: function(target, key, value) {
        var val = void 0,
          onetime = false;
        listeners.loop('Set', function(ln) {
          if (ln.prop === '*' || ln.prop === key) {
            if (onetime) {
              value = val;
              onetime = false;
            } else onetime = true;
            val = ln(key, value, target, !Reflect.has(target, key));
          }
        });
        val = val != undef ? val : value;
        if (isObj(val) && !val.isObservable) val = observable(val);
        target.emit('$uberset:' + key, val);
        return Reflect.set(target, key, val);
      }
    });
    console.warn('This JavaScript Environment does not support Proxy, observables need to use the .set and .get accessors to work');
    return obj;
  }
  /**
   * Easy way to get a DOM Node or Node within another DOM Node using CSS selectors.
   * @method query
   * @for Craft
   * @param {String} selector - CSS selector to query the DOM Node with
   * @param {Node|String=} element - Optional Node or CSS selector to search within insead of document
   */
  function query(selector, element) {
    if (isStr(element)) element = doc.querySelector(element);
    return is.Node(element) ? element.querySelector(selector) : doc.querySelector(selector);
  }
  /**
   * Easy way to get a DOM NodeList or NodeList within another DOM Node using CSS selectors
   * @method queryAll
   * @for Craft
   * @param {String} selector - CSS selector to query the DOM Nodes with
   * @param {Node|NodeList|String=} element - Optional Node or CSS selector to search within insead of document
   * @return {Array} array containing Nodes and/or Elements
   */
  function queryAll(selector, element) {
    if (isStr(element)) element = queryAll(element);
    var list = void 0;
    if (is.Arraylike(element) && element.length > 1) {
      list = [];
      map(element, function(el) {
        if (isStr(el)) el = query(el);
        if (is.Node(el)) {
          el = queryAll(selector, el);
          if (is.NodeList(el)) list.concat(el);
        }
      });
    } else {
      list = is.Node(element) ? element : is.NodeList(element) ? element[0] : doc;
      if (list) {
        list = list.querySelectorAll(selector);
        if (list != null) return slice(list);
      }
    }
    return null;
  }
  /**
   * Easy way to loop through Nodes in the DOM using a CSS Selector or a NodeList
   * @method queryEach
   * @for Craft
   * @param {String|NodeList|Node} selector - CSS selector to query the DOM Nodes with or NodeList to iterate through
   * @param {Node|String} [element] - Optional Node or CSS selector to search within insead of document
   * @param {Function} func - function called on each iteration -> "function( Element , index ) {...}"
   * @param {Boolean} [returnList] - should queryEach also return the list of nodes
   */
  function queryEach(selector, element, func, returnList) {
    if (isFunc(element)) func = element;
    var list = queryAll(selector, element);
    if (list) list.forEach(func);
    if (returnList) return list;
  }
  /**
   * Event Handler
   * @class EventHandler
   * @for Craft
   * @param {String} EventType - set the type of event to listen for example "click" or "scroll"
   * @param {Node|NodeList|window|document} Target - the Event Listener's target , can also be a NodeList to listen on multiple Nodes
   * @param {Function} Func - Handler function that will be called when the event is triggered -> "function( event , event.srcElement ) {...}"
   * @return Interface on,off,once
   */
  var EventHandler = function(EventType, Target, func, Within) {
    return new function() {
      var evthandler = this;
      evthandler.state = false;
      Target = Target !== root && Target !== doc && isStr(Target) ? queryAll(Target, Within) : isArr(Target) ? Craft.flatten(Target) : [Target];
      if (isStr(EventType) && EventType.includes(',')) EventType = EventType.split(',');
      if (!isArr(EventType)) EventType = [EventType];
      var FuncWrapper = function(e) {
        return func(e, e.target, Target);
      };
      /**
       * Get or Set the Event type to listen for
       * @property Type
       * @type {String}
       * @for EventHandler
       * @return {String} type - the name of the event/s to listen for
       */
      defineprop(evthandler, 'Type', {
        set: function(type) { //  have you tried turning it on and off again? - THE IT CROWD
          ehdl.off();
          EventType = type.includes(',') ? type.split(',') : type;
          if (!isArr(EventType)) EventType = [EventType];
          ehdl.on();
        },
        get: function() {
          return EventType;
        },
        enumerable: true
      });
      /**
       * Activates the EventHandler to start listening for the EventType on the Target/Targets
       * @method on
       * @for EventHandler
       * @chainable
       */
      evthandler.on = function() {
        Target.map(function(target) {
          EventType.map(function(evt) {
            target.addEventListener(evt, FuncWrapper);
          });
        });
        evthandler.state = true;
        return evthandler;
      };
      /**
       * De-activates / turns off the EventHandler to stop listening for the EventType on the Target/Targets can still optionally be re-activated with on again
       * @method off
       * @for EventHandler
       * @chainable
       */
      evthandler.off = function() {
        Target.map(function(target) {
          EventType.map(function(evt) {
            target.removeEventListener(evt, FuncWrapper);
          });
        });
        evthandler.state = false;
        return evthandler;
      };
      /**
       * once the the Event has been triggered the EventHandler will stop listening for the EventType on the Target/Targets the Handler function will be called only once
       * @method once
       * @for EventHandler
       * @chainable
       */
      evthandler.once = function() {
        FuncWrapper = function(e) {
          func(e, e.target, Target);
          evthandler.off();
          evthandler.state = false;
        };
        return evthandler.on();
      };
    }();
  };

  function EventTypes(Target, within, listen) {
    var etype = function(type) {
      return function(fn) {
        return EventHandler(type, Target, fn, within)[listen || 'on']();
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
      Scroll: etype('scroll')
    };
  }

  function keyhandle(keycode) {
    return function(fn, context) {
      return function(evt) {
        if (evt.keyCode === keycode) fn.apply(context || this, arguments);
      };
    };
  }

  function EvtLT(ListenType) {
    return function(EventType, Target, element, func) {
      var args = slice(arguments);
      return isFunc(Target) ? EventHandler(EventType, root, Target)[ListenType]() : args.length < 3 && !args.some(isFunc) ? EventTypes(EventType, Target, ListenType) : isFunc(element) ? EventHandler(EventType, Target, element)[ListenType]() : EventHandler(EventType, Target, func, element)[ListenType]();
    };
  }
  /**
   * Starts listening for an EventType on the Target/Targets
   * @method on
   * @for Craft
   * @param {String} EventType - set the type of event to listen for example "click" or "scroll"
   * @param {Node|NodeList|window|document} Target - the Event Listener's target , can be a NodeList to listen on multiple Nodes
   * @param {Function} Func - Handler function that will be called when the event is triggered -> "function( event , event.srcElement ) {...}"
   * @return off - when on is defined as a variable "var x = on(...)" it allows you to access all the EventHandler interfaces off,once,on
   */
  var on = EvtLT('on'),
    once = EvtLT('once'),
    eventoptions = 'Click,Input,DoubleClick,Focus,Blur,Keydown,Mousemove,Mousedown,Mouseup,Mouseover,Mouseout'.split(','),
    domLifecycle = {
      handles: newMap(),
      events: eventsys(),
      hasTag: function(tag) {
        return domLifecycle.handles.has(tag.toLowerCase());
      },
      attached: function(element) {
        var handle = domLifecycle.handles.get(element.tagName.toLowerCase());
        if (handle.attached) handle.attached.call(element, element);
      },
      destroyed: function() {
        var handle = domLifecycle.handles.get(element.tagName.toLowerCase());
        if (handle.destroyed) handle.destroyed.call(element, element);
      },
      created: function() {
        var handle = domLifecycle.handles.get(element.tagName.toLowerCase());
        if (handle.created) handle.created.call(element, element);
      }
    };
  /**
   * Starts listening for an EventType on the Target/Targets ONCE after triggering the once event Listener will stop listening
   * @method once
   * @for Craft
   * @param {String} EventType - set the type of event to listen for example "click" or "scroll"
   * @param {Node|NodeList|window|document} Target - the Event Listener's target , can be a NodeList to listen on multiple Nodes
   * @param {Function} Func - Handler function that will be called when the event is triggered -> "function( event , event.srcElement ) {...}"
   * @return on,off,once - when once is defined as a variable "var x = once(...)" it allows you to access all the EventHandler interfaces off,once,on
   */
  function craftElement(name, inner, attributes, extraAttr, stringForm) {
    var element = domManip(doc.createElement(name));
    if (isObj(inner)) {
      attributes = inner;
      inner = undef;
    }
    if (inner != undef) element.html(inner);
    if (isObj(attributes) || isStr(attributes)) {
      if (isObj(attributes)) Object.keys(attributes).forEach(function(key) {
        if (isFunc(attributes[key])) {
          if (eventoptions.some(is.eq(key))) {
            var func = attributes[key];
            key == 'DoubleClick' ? key = 'dblclick' : key = key.toLowerCase();
            element[key + 'handle'] = on(key, element, func);
            delete attributes[key];
          } else if (key === 'created') {
            domLifecycle.once('created', attributes[key].bind(element));
            delete attributes[key];
          }
        }
      });
      element.setAttr(attributes);
    }
    if (extraAttr != undef) is.Bool(extraAttr) ? stringForm = extraAttr : element.setAttr(extraAttr);
    if (stringForm) element = element.outerHTML;
    if (is.Node(element) && domLifecycle.hasTag(element.tagName)) domLifecycle.emit('created', element);
    return element;
  }
  /**
   * Contains several methods for Element Creation
   * @class dom
   */
  var Dom = {
    /**
     * craft elements on the fly using this nifty method
     * @method element
     * @for dom
     * @param {String} name - tag name of element to be created
     * @param {String|NodeList|Array|Node} inner - inner value(s) of element
     * @param {Object|String} attributes - Key value pair object defining element attributes or URI variable style string
     * @return {Element} newly created element
     */
    element: craftElement,
    /**
     * Makes document fragments also allows attaching nodes or strings that get converted to html.
     * @for dom
     * @method frag
     * @param {String|Node} [inner] - node or string to convert to html
     * @return {DocumentFragment}
     */
    frag: function(inner) {
      var dfrag = void 0;
      if (isStr(inner)) dfrag = dffstr(inner);
      if (!is.Node(dfrag)) dfrag = doc.createDocumentFragment();
      if (is.Node(inner)) dfrag.appendChild(inner);
      return dfrag;
    },
    /**
     * creates an img element with the options provided
     * @method img
     * @for dom
     * @param {String} sets src of the img
     * @param {String} sets alt of the img
     * @param {String|Object} [attr] Key value pair object defining element attributes or URI variable style string
     */
    img: function(src, alt, attr) {
      return Dom.element('img', '', attr, {
        src: src,
        alt: alt
      });
    },
    input: function(type, attr) {
      if (isObj(type)) {
        attributes = type;
        type = 'text';
      }
      return Dom.element('input', '', attr, {
        type: type || 'text'
      });
    },
    list: function(type, items, attr) {
      var list = '';
      if (is.Arrylike(items)) map(items, function(item) {
        if (isStr(item)) list += Dom.element('li', item).outerHTML;
        else if (isObj(items)) list += Dom.element('li', item.inner, item.attr).outerHTML;
      });
      return Dom.element(type, list, attr);
    },
    a: function(link, inner, attr) {
      return Dom.element('a', inner, attr, 'href=' + link);
    },
    script: function(code, attr, defer, onload, nosrc) {
      var script = Dom.element('script', '', attr, {
        type: 'text/javascript'
      });
      if (code.slice(0, 4) === 'src=') return script.setAttr(code);
      if (isFunc(onload)) {
        script.onload = function() {
          script.removeAttribute('initx');
          onload();
        };
        var random = Craft.randomInt(1000);
        script.setAttribute('initx', random);
        code += '\ndocument.head.querySelector(\'script[initx="' + random + '"]\').dispatchEvent(new UIEvent(\'load\'));\n';
      }
      if (defer == true) script.defer = defer != false;
      if (nosrc == true) script.text = code;
      else script.src = Craft.URLfrom(code, {
        type: 'text/javascript'
      });
      return script;
    }
  };
  'table,td,th,tr,article,aside,ul,ol,li,h1,h2,h3,h4,h5,h6,div,span,pre,code,section,button,br,label,header,i,style,nav,menu,main,menuitem'.split(',').map(function(tag) {
    Dom[tag] = function(inner, attr, ea) {
      return Dom.element(tag, inner, attr, ea);
    };
  });

  function domNodeList(elements) {
    if (!isArr(elements)) removeFrom(Object.getOwnPropertyNames(Array.prototype), 'length').map(function(method) {
      elements[method] = Array.prototype[method];
    });
    /**
     * Listen for Events on the NodeList
     * @method elements.on
     * @for dom
     * @param {String} string indicating the type of event to listen for
     * @param {Function} func - handler function for the event
     * @return handler (off,once,on)
     */
    elements.on = function(eventType, func) {
      return on(eventType, elements, func);
    };
    /**
     * add CSS style rules to NodeList
     * @method elements.css
     * @param {object} styles - should contain all the styles you wish to add example { borderWidth : '5px solid red' , float : 'right'}...
     */
    elements.css = function(styles) {
      return Craft.css(elements, styles);
    };
    elements.addClass = function(Class) {
      elements.map(function(el) {
        el.classList.add(Class);
      });
      return elements;
    };
    elements.gotClass = function() {
      var args = slice(arguments);
      return elements.every(function(el) {
        return args.every(function(Class) {
          return el.classList.contains(Class);
        });
      });
    };
    elements.gotSomeClass = function() {
      var args = slice(arguments);
      return elements.some(function(el) {
        return args.every(function(Class) {
          return el.classList.contains(Class);
        });
      });
    };
    elements.stripClass = function(Class) {
      elements.map(function(el) {
        el.classList.remove(Class);
      });
      return elements;
    };
    elements.toggleClass = function(Class, state) {
      elements.map(function(el) {
        (is.Bool(state) ? state : el.classList.contains(Class)) ? el.classList.remove(Class): el.classList.add(Class);
      });
      return elements;
    };
    /**
     * removes a specific Attribute from the this.element
     * @method elements.stripAttr
     * @for dom
     * @param {...String} name of the Attribute/s to strip
     */
    elements.stripAttr = function() {
      var _arguments2 = arguments;
      elements.map(function(el) {
        map(_arguments2, function(attr) {
          el.removeAttribute(attr);
        });
      });
      return elements;
    };
    /**
     * checks if the element has a specific Attribute or Attributes
     * @method hasAttr
     * @for dom
     * @param {String|Boolean} name of the Attribute or if true checks that it has some (||) of the attributes or if false checks that it has all of the attributes (&&)
     * @param {...String} names of attributes to check for
     */
    elements.hasAttr = function(attr) {
      if (isStr(attr) && arguments.length == 1) return elements.every(function(el) {
        return el.hasAttribute(attr);
      });
      var args = Craft.flatten(arguments);
      return elements.every(function(el) {
        return args.every(function(a) {
          return el.hasAttribute(a);
        });
      });
    };
    /**
     * Toggles an attribute on element , optionally add value when toggle is adding attribute.
     * @method toggleAttr
     * @for dom
     * @param {String} name - name of the attribute to toggle
     * @param {String} val - value to set attribute to
     * @param {Boolean=} rtst - optionally return a bool witht the toggle state otherwise returns the element
     */
    elements.toggleAttr = function(name, val, rtst) {
      elements.map(function(el) {
        el[((is.Bool(val) ? !val : el.hasAttr(name)) ? 'strip' : 'set') + 'Attr'](name, val);
      });
      return rtst ? elements.every(function(el) {
        return el.hasAttr(name);
      }) : elements;
    };
    /**
     * Sets or adds an Attribute on elements of a NodeList
     * @method setAttr
     * @for dom
     * @param {String} Name of the Attribute to add/set
     * @param {String} Value of the Attribute to add/set
     */
    elements.setAttr = function(attr, val) {
      elements.map(function(el) {
        if (!def(val)) {
          if (isStr(attr)) attr.includes('=') || attr.includes('&') ? attr.split('&').forEach(function(Attr) {
            var attribs = Attr.split('=');
            def(attribs[1]) ? element.setAttribute(attribs[0], attribs[1]) : element.setAttribute(attribs[0], '');
          }) : element.setAttribute(attr, '');
          else if (isObj(attr)) forEach(attr, function(value, Attr) {
            element.setAttribute(Attr, value);
          });
        } else element.setAttribute(attr, val || '');
      });
      return elements;
    };
    elements.append = function() {
      map(arguments, function(arg) {
        elements.map(function(el) {
          el.appendChild((is.Node(val) ? val : dffstr(val)).cloneNode(true));
        });
      });
      return elements;
    };
    elements.appendTo = function(val, within) {
      elements.map(function(el) {
        if (isStr(el)) el = query(val, within);
        if (is.Node(el)) el.appendChild(el);
      });
      return elements;
    };
    elements.prepend = function() {
      map(arguments, function(val) {
        elements.map(function(el) {
          el.insertBefore((is.Node(val) ? val : dffstr(val)).cloneNode(true), el.firstChild);
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
      if (is.int(i) && def(elements[i])) return dom(elements[i]);
      else if (elements.includes(i)) return dom(i);
    };
    return elements;
  }

  function Inner(type, el) {
    type = el.isInput ? 'value' : type;
    return function() {
      if (!arguments.length) return el[type];
      if (el[type].length) el[type] = '';
      Craft.flatten(arguments).map(function(val) {
        is.Node(val) ? el.append(val) : el[type] += isFunc(val) ? val.call(el) : val;
      });
      return el;
    };
  }

  function newSetGet(key, set, get) {
    defineprop(this, key, {
      set: set,
      get: get
    });
  }

  function domManip(element, within) {
    if (isStr(element)) element = query(element, within);
    if (element._DOMM == true) return element;
    element._DOMM = true;
    element.isInput = is.Input(element);
    if (!element.state) element.state = eventsys();
    element.newSetGet = newSetGet;
    element.newSetGet('colorAccent', function(func) {
      if (element.hasAttr('color-accent') && isFunc(func)) func(element.getAttr('color-accent'));
    });
    /**
     * changes or returns the innerHTML value of a Node
     * @method element.html
     * @for dom
     * @param {String=} sets the innerHTML value or when undefined gets the innerHTML value
     */
    element.html = Inner('innerHTML', element);
    /**
     * changes or returns the textContent value of a Node
     * @method element.Text
     * @for dom
     * @param {String=} sets the textContent value or when undefined gets the textContent value
     */
    element.Text = Inner('textContent', element);
    /**
     * element.bind is what drives data-binding in Crafter.js it binds to values in models and objects
     * @method element.bind
     * @for dom
     * @param {String} bind - path to bind to
     * @example element.bind('myModel.value');
     */
    element.bind = function(bind) {
      if (!bind.includes('.')) {
        if (!def(root[bind])) {
          var getval = element.html();
          if (getval) Craft.setDeep(root, bind, getval);
        } else element.html(root[bind]);
        if (element.isInput) element.SyncInput(root, bind, function(val) {
          queryEach('[bind=' + bind + ']', function(el) {
            if (val != undef) el.html(val);
          });
        });
        return element;
      }
      var _Craft$getPath = Craft.getPath(bind, true),
        obj = _Craft$getPath.obj,
        cutbind = _Craft$getPath.cutbind,
        prop = _Craft$getPath.prop,
        val = _Craft$getPath.val;

      function bindval() {
        var alt = void 0,
          path = joindot(Craft.omit(cutbind, cutbind[0]));
        if (!def(val)) val = Craft.getDeep(obj, path);
        def(val) ? element.html(val) : Craft.setDeep(obj, path, element.html());
        if (obj.isObservable) element.state.binder = obj.on('$uberset:' + prop, element.html);
        else alt = function(val) {
          queryEach('[bind=' + bind + ']', function(el) {
            if (val != undef) el.html(val);
          });
        };
        if (element.isInput) element.SyncInput(obj, cutbind.length == 1 ? cutbind[0] : path, alt);
      }
      if (!obj) Craft.modelInit(cutbind[0], function(scope) {
        if (scope) {
          obj = scope;
          bindval();
        }
      });
      else bindval();
      return element;
    };
    element.unbind = function(bind) {
      if (element.state.binder) {
        element.state.binder.off();
        delete element.state.binder;
      }
    };
    element.lifecycle = {
      inserted: function(func) {
        return domLifecycle.once('attached', function(el) {
          if (el === element) func.call(element, element);
        });
      },
      created: function(func) {
        return domLifecycle.once('created', function(el) {
          if (el === element) func.call(element, element);
        });
      },
      destroyed: function(func) {
        return domLifecycle.once('destroyed', function(el) {
          if (el === element) func.call(element, element);
        });
      },
      attr: function(name, func) {
        if (isFunc(name)) func = name;
        return element.state.on('attr' + (isStr(name) ? ':' + name : ''), func.bind(element));
      }
    };
    /**
     *
     * replaces a Node with another node provided as a parameter/argument
     * @method replace
     * @for dom
     * @param {Node} Node to replace with
     */
    element.replace = function(val) {
      element.parentNode.replaceChild(val, element);
      return element;
    };
    /**
     * clones an element it's children, optionally
     * @method clone
     * @for dom
     * @param {Boolean} val - defaults to true if set to false children of element won't be cloned
     */
    element.clone = function(val) {
      return domManip(element.cloneNode(val == undef ? true : val));
    };
    /**
     * imports a file and renders it on to the node
     * @method importview
     * @for dom
     * @param {String) src - url to fetch from
     */
    element.importview = function(src, fetchoptions) {
      var cache = element.hasAttr('cache-view');
      if (cache) {
        var view = localStorage.getItem(src);
        if (!nil(view)) {
          element.html(view);
          return;
        }
      }
      fetch(src, fetchoptions || {
        mode: 'cors',
        credentials: 'same-origin'
      }).then(function(res) {
        if (!res.ok) console.warn('<' + element.localName + '> : unable to import view - ' + src);
        else res.text().then(function(view) {
          if (cache) localStorage.setItem(src, view);
          element.html(view);
        });
      });
    };
    element.append = function() {
      var domfrag = dom.frag();
      Craft.flatten(arguments).map(function(val) {
        is.Node(val) ? domfrag.appendChild(val) : domfrag.innerHTML += val;
      });
      element.appendChild(domfrag);
      return element;
    };
    var prepend = element.prepend.bind(element);
    element.prepend = function() {
      var domfrag = dom.frag();
      Craft.flatten(arguments).map(function(val) { //domfrag.appendChild(is.Node(val) ? val : dffstr(val));
        is.Node(val) ? domfrag.appendChild(val) : domfrag.innerHTML += val;
      });
      isFunc(prepend) ? prepend(domfrag) : element.insertBefore(domfrag, element.firstChild);
      return element;
    };
    /**
     * append the Element to another node using either a CSS selector or a Node
     * @method element.appendTo
     * @for dom
     * @param {Node|String} CSS selector or Node to append the this.element to
     * @chainable
     */
    element.appendTo = function(val, within) {
      if (isStr(val)) val = query(val, within);
      if (is.Node(val)) val.appendChild(element);
      return element;
    };
    /**
     * prepend the Element to another node using either a CSS selector or a Node
     * @method element.prependTo
     * @for dom
     * @param {Node|String} CSS selector or Node to append the this.element to
     * @chainable
     */
    element.prependTo = function(val, within) {
      if (isStr(val)) val = query(val, within);
      if (is.Node(val)) val.insertBefore(element, val.firstChild);
      return element;
    };
    /**
     * used to do things with your element without breaking scope
     * @method element.modify
     * @for dom
     * @param {function} func - callback to execute
     * @chainable
     */
    element.modify = function(func) {
      func.call(element, element);
      return element;
    };
    /**
     * Listen for Events on the element or on all the elements in the NodeList
     * @method element.on
     * @for dom
     * @param {String} string indicating the type of event to listen for
     * @param {Function} func - handler function for the event
     * @return handler (off,once,on)
     */
    element.on = function(eventType, func) {
      return on(eventType, element, func);
    };
    element.emit = element.state.emit;

    function evlt(type) {
      return function(fn, ltype) {
        return (ltype ? once : on)(type, element, fn);
      };
    }
    element.Click = evlt('click');
    element.Input = evlt('input');
    element.DoubleClick = evlt('dblclick');
    element.Focus = evlt('focus');
    element.Blur = evlt('blur');
    element.Keydown = evlt('keydown');
    element.Mousemove = evlt('mousemove');
    element.Mousedown = evlt('mousedown');
    element.Mouseup = evlt('mouseup');
    element.Mouseover = evlt('mouseover');
    element.Mouseout = evlt('mouseout');
    element.Mouseenter = evlt('mouseenter');
    element.Mouseleave = evlt('mouseleave');
    element.onScroll = function(func, pd) {
      return Craft.onScroll(element, func, pd);
    };
    /* let keypress = code => (fn, type) => evlt('keydown')(element, e => {
                if (e.which == code || e.keyCode == code) fn(e, element)
            }, type);
            element.Enter = keypress(13);
            element.Escape = keypress(27);
            element.Delete = keypress(46);
            element.Space = keypress(32);
            element.UpArrow = keypress(38);
            element.DownArrow = keypress(40);
            element.LeftArrow = keypress(37);
            element.RightArrow = keypress(39);

            */
    /**
     * add CSS style rules to the Element or NodeList
     * @method element.css
     * @for dom
     * @param {object} styles - should contain all the styles you wish to add
     * @example element.css({ borderWidth : '5px solid red' , float : 'right'});
     */
    element.css = function(styles, prop) {
      return Craft.css(element, styles, prop);
    };
    /**
     * check if the element has got a specific CSS class
     * @method element.gotClass
     * @for dom
     * @param {...String} name of the class to check for
     */
    element.gotClass = function() {
      return slice(arguments).every(function(Class) {
        return element.classList.contains(Class);
      });
    };
    /**
     * Add a CSS class to the element
     * @method element.addClass
     * @for dom
     * @param {String} name of the class to add
     */
    element.addClass = function() {
      map(arguments, function(Class) {
        element.classList.add(Class);
      });
      return element;
    };
    /**
     * removes a specific CSS class from the element
     * @method element.stripClass
     * @for dom
     * @param {...String} name of the class to strip
     */
    element.stripClass = function() {
      map(arguments, function(Class) {
        element.classList.remove(Class);
      });
      return element;
    };
    /**
     * Toggle a CSS class to the element
     * @method element.toggleClass
     * @for dom
     * @param {String} name of the class to add
     * @param {Boolean=} state - optionally toggle class either on or off with bool
     * @chainable
     */
    element.toggleClass = function(Class, state) {
      if (!is.Bool(state)) state = element.gotClass(Class);
      element[(state ? 'strip' : 'add') + 'Class'](Class);
      return element;
    };
    /**
     * removes a specific Attribute from the element
     * @method element.stripAttr
     * @for dom
     * @param {...String} name of the Attribute/s to strip
     * @chainable
     */
    element.stripAttr = function() {
      map(arguments, element.removeAttribute.bind(element));
      return element;
    };
    /**
     * checks if the element has a specific Attribute or Attributes
     * @method element.hasAttr
     * @for dom
     * @param {String|Boolean} name of the Attribute or if true checks that it has some (||) of the attributes or if false checks that it has all of the attributes (&&)
     * @param {...String} names of attributes to check for
     */
    element.hasAttr = function() {
      if (isStr(arguments[0])) return element.hasAttribute(arguments[0]);
      return slice(arguments).every(element.hasAttribute);
    };
    /**
     * Sets or adds an Attribute on the element
     * @method element.setAttr
     * @for dom
     * @param {String} Name of the Attribute to add/set
     * @param {String} Value of the Attribute to add/set
     * @chainable
     */
    element.setAttr = function(attr, val) {
      if (!def(val)) {
        if (isStr(attr)) attr.includes('=') || attr.includes('&') ? attr.split('&').forEach(function(Attr) {
          def(Attr.split('=')[1]) ? element.setAttribute(Attr.split('=')[0], Attr.split('=')[1]) : element.setAttribute(Attr.split('=')[0], '');
        }) : element.setAttribute(attr, '');
        else if (isObj(attr)) forEach(attr, function(value, Attr) {
          element.setAttribute(Attr, value);
        });
      } else element.setAttribute(attr, val || '');
      return element;
    };
    /**
     * Gets the value of an attribute , short alias for element.getAttribute
     * @method element.getAttr
     * @for dom
     * @param {String} attr - name of attribute to get
     */
    element.getAttr = element.getAttribute;
    element.attr = function(attr, val) {
      return isStr(attr) && !def(val) ? element.getAttr(attr) : element.setAttr(attr, val);
    };
    element.prop = element.hasAttr;
    /**
     * Toggles an attribute on element , optionally add value when toggle is adding attribute
     * @method element.toggleAttr
     * @for dom
     * @param {String} name - name of the attribute to toggle
     * @param {String} val - value to set attribute to
     * @param {Boolean=} rtst - optionally return a bool witht the toggle state otherwise returns the element
     */
    element.toggleAttr = function(name, val, rtst) {
      element[((is.Bool(val) ? !val : element.hasAttr(name)) ? 'strip' : 'set') + 'Attr'](name, val);
      return rtst ? element.hasAttr(name) : element;
    };
    if (!element.remove) element.remove = function() {
      element.parentNode.removeChild(element);
    };
    /**
     * Remove the element after a time in milliseconds
     * @method element.removeAfter
     * @for dom
     * @param {Number=} time - time to wait before self destructing the element
     */
    element.removeAfter = function(time) {
      setTimeout(element.remove.bind(element), time || 5000);
      return element;
    };
    /**
     * gets all the sibling elements of the element
     * @property element.Siblings - array of elements
     * @type {Array}
     * @for dom
     */
    defineprop(element, 'Siblings', {
      get: function() {
        return removeFrom(element.parentNode.children, element).filter(isEl);
      }
    });
    /**
     * gets all the element's dimentions (width,height,left,top,bottom,right)
     * @method element.getRect
     * @for dom
     * @return {Object}
     */
    element.getRect = element.getBoundingClientRect;
    /**
     * sets or gets the element's pixel width
     * @property element.newSetGet
     * @type {String}
     * @for dom
     * @param {String|Number=} pixel value to set
     */
    element.newSetGet('Width', function(pixels) {
      element.style.width = pixels;
    }, function() {
      return element.getRect().with;
    });
    /**
     * sets or gets the element's pixel height
     * @property element.Height
     * @type {Number}
     * @for dom
     * @param {String|number=} pixel value to set
     */
    element.newSetGet('Height', function(pixels) {
      element.style.height = pixels;
    }, function() {
      return element.getRect().height;
    });
    /**
     * move the element using either css transforms or plain css possitioning
     * @method element.move
     * @for dom
     * @param {String|Number} x - x-axis position in pixels
     * @param {String|Number} y - y-axis position in pixels
     * @param {Boolean=} transform - should move set the position using css transforms or not
     */
    element.move = function(x, y, transform) {
      if (transform === true) { // element.style.willChange = 'transform';
        element.style.transform = 'translateX(' + x + 'px) translateY(' + y + 'px)';
      } else {
        element.top = y + 'px';
        element.left = x + 'px';
      }
    };
    /**
     * performs a query inside the element
     * @method element.query
     * @for dom
     * @param {String} CSS selector
     * @return {Node|Null}
     */
    element.query = function(selector) {
      return query(selector, element);
    };
    /**
     * performs a queryAll inside the element
     * @method element.queryAll
     * @for dom
     * @param {String} CSS selector
     * @return {NodeList|Null}
     */
    element.queryAll = function(selector) {
      return queryAll(selector, element);
    };
    element.next = function(reset, dm) {
      var sb = slice(element.parentNode.children),
        nextnode = sb.indexOf(element) + 1;
      if (!sb[nextnode]) return reset ? dm ? dom(sb[0]) : sb[0] : null;
      return dm ? dom(sb[nextnode]) : sb[nextnode];
    };
    element.previous = function(reset, dm) {
      var sb = slice(element.parentNode.children),
        nextnode = sb.indexOf(element) - 1;
      if (!sb[nextnode]) return reset ? dm ? dom(sb[sb.length - 1]) : sb[sb.length - 1] : null;
      return dm ? dom(sb[nextnode]) : sb[nextnode];
    };
    if (element.isInput) {
      element.SyncInput = function(obj, key, onset) {
        return Craft.SyncInput(element, obj, key, onset);
      };
      element.disconectInputSync = function() {
        return Craft.disconectInputSync(element);
      };
    }
    element.observe = function(func, options, name) {
      if (!isStr(name)) name = 'MutObserver';
      element[name] = new MutationObserver(function(muts) {
        muts.map(function(mut) {
          func(mut, mut.type, mut.target, mut.addedNodes, mut.removedNodes);
        });
      });
      element[name].observe(element, options || {
        attributes: true,
        childList: true,
        subtree: true
      });
      return element;
    };
    element.unobserve = function(name) {
      if (!isStr(name)) name = 'MutObserver';
      if (def(element[name])) {
        element[name].disconnect();
        delete element[name];
      }
      return element;
    };
    return element;
  }
  /**
   * returns many useful methods for interacting with and manipulating the DOM or creating elements
   * @method dom
   * @for Craft
   * @param {Node|NodeList|String=} element - optional Node, NodeList or CSS Selector that will be affected by the methods returned
   * @param {Node|String=} within - optional Node, NodeList or CSS Selector to search in for the element similar to query(element,within)
   * @param {Boolean=} one - even if there are more than one elements matching a selector only return the first one
   */
  function dom(element, within, one) {
    if (isStr(element)) {
      element = !one ? queryAll(element, within) : query(element, within);
      if (is.NodeList(element)) {
        if (element.length > 1) return domNodeList(element);
        else if (element.length == 1) element = element[0];
      }
    }
    if (is.Node(element)) return element['_DOMM'] ? element : domManip(element);
    if (is.NodeList(element)) return domNodeList(element);
    return Dom;
  }
  dom = concatObjects(dom, Dom);
  if (root.Proxy) dom = new Proxy(dom, {
    get: function(obj, key) {
      if (!obj.hasOwnProperty(key)) {
        if (Dom.hasOwnProperty(key)) return Dom[key];
        return function(inner, attr, eattr, str) {
          return Dom.element(key, inner, attr, eattr, str);
        };
      }
      return obj[key];
    }
  });
  /**
   * Craft is Crafter.js's Core containing most functionality.
   * @class Craft
   */
  var Craft = {
    /**
     * general Crafter notification event system
     * @type {Object}
     * @property notifier
     * @for Craft
     */
    notifier: eventsys(),
    /**
     * Returns an object or calls a function with all the differences between two arrays
     * @method arrDiff
     * @for Craft
     * @param {Array} arr - array to be compared
     * @param {Array} newArr - second array to be compared
     * @param {Function=} func - optional function that recieves all the info as parameters
     * @return {Object}
     */
    arrDiff: function(arr, arrb, func) {
      var added = arrb.filter(function(item) {
          if (!arr.includes(item)) return item;
        }),
        same = arr.filter(function(item) {
          if (arrb.includes(item)) return item;
        }),
        diff = Craft.omit(same.concat(added), undef);
      if (isFunc(func) && !is.empty(diff)) func(arr, arrb, added, same, diff);
      else return {
        added: added,
        same: same,
        diff: diff,
        arr: arr,
        arrb: arrb
      };
    },
    deglove: deglove,
    last: last,
    first: first,
    removeFrom: removeFrom,
    slice: slice,
    cutdot: cutdot,
    joindot: joindot,
    dffstr: dffstr,
    toArr: toArr,
    toInt: toInt,
    observable: observable,
    eventsys: eventsys,
    dom: dom,
    query: query,
    queryAll: queryAll,
    queryEach: queryEach,
    forEach: forEach,
    map: map,
    on: on,
    once: once,
    is: is,
    UnHTML: function(html) {
      return html.replace(/<script[^>]*?>.*?<\/script>/gi, '').replace(/<style[^>]*?>.*?<\/style>/gi, '').replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');
    },
    /**
     * Compares two arrays and determines if they are the same array
     * @method sameArray
     * @for Craft
     * @param {Array} arr1 - array one
     * @param {Array} arr2 - array two
     */
    sameArray: function(arr1, arr2) {
      var i = arr1.length;
      if (i !== arr2.length) return false;
      while (i--) {
        if (arr1[i] !== arr2[i]) return false;
      }
      return true;
    },
    /**
     * Generates arrays of a set length , with values or values generated from functions
     * @method array
     * @for Craft
     * @param {Number} len - the integer length of the array to be generated
     * @param {...function|*} val - value to set at each index , multiple value params after lenth will generate nested 2d arrays
     * @return {Array}
     */
    array: function(len) {
      var arr = [],
        val = slice(arguments, 1);
      if (val.length == 1)
        for (; len > 0; len--) {
          arr.push(isFunc(val[0]) ? val[0]() : val[0]);
        } else
          for (; len > 0; len--) {
            arr.push(Craft.array(val.length, val));
          }
      return arr;
    },
    /**
     * Gets all the property keys in any object even the hiden ones
     * @method getAllKeys
     * @for Craft
     * @param {*} obj - object to list keys
     * @return {Array} - array containing all the property keys
     */
    getAllKeys: function(obj) {
      var props = [];
      do {
        props = props.concat(Object.getOwnPropertyNames(obj));
      } while (obj = Object.getPrototypeOf(obj));
      return props;
    },
    /**
     * flattens, sorts and eliminates doubles from arraylike collections
     * @method unique
     * @for Craft
     * @param {Array|Arraylike} arr
     * @return {Array}
     */
    unique: function(arr) {
      return toArr(newSet()(Craft.flatten(arr)));
    },
    /**
     * Flattens any multidimentional array or arraylike object
     * @method flatten
     * @for Craft
     * @param {Array|Arraylike} arr - multidimentional array(like) object to flatten
     * @return {Array}
     */
    flatten: function(arr) {
      return Array.prototype.reduce.call(arr, function(flat, toFlatten) {
        return flat.concat(isArr(toFlatten) ? Craft.flatten(toFlatten) : toFlatten);
      }, []);
    },
    /**
     * Gets a value from inside an object using a reference string
     * @method getDeep
     * @for Craft
     * @example Craft.getDeep(myObj,'Company.employees[16].person.name') -> Mr Smithers or Craft.getDeep(anObj,'Colony.Queen.brood') -> [...ants]
     * @param {Object} obj - the object to extract values from
     * @param {String} path - string to reference value by simple dot notation or array refference example Craft.getDeep({ a : { b : [1,2,3] }},"a.b[2]") -> 3
     */
    getDeep: function(obj, path) {
      try {
        cutdot(path.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '')).map(function(step) {
          step in obj ? obj = obj.isObservable ? obj.get(step) : obj[step] : obj = undef;
        });
        return obj;
      } catch (e) {}
    },
    /**
     * Craft.setDeep  is similar to getDeep it uses a string to reference to a value
     * @method setDeep
     * @for Craft
     * @param {Object} obj - the object to set values on
     * @param {String} path - string to reference value by simple dot notation
     * @param {*} value - value to set
     * @param {Boolean} robj - should the function return the object
     */
    setDeep: function(obj, path, val, robj) {
      try {
        if (!path.includes('.')) obj.isObservable ? obj.set(path, val) : obj[path] = val;
        else {
          path = cutdot(path);
          for (var i = 0, temp = obj, plen = path.length - 1; i < plen; i++) {
            if (path[i] in temp) temp = temp[path[i]];
            else if (i != plen) temp = temp.isObservable ? temp.set(path[i], {}) : temp[path[i]] = {};
            else temp.isObservable ? temp.set(path[plen], val) : temp[path[plen]] = val;
          }
        }
        if (robj) return obj;
      } catch (e) {
        console.warn('Craft.setDeep : ran into some trouble setting ' + path);
      }
    },
    /**
     * forEachDeep is used to loop through any multi layered object - (flattens and loops through all enumerable properties in a given object)
     * @method forEachDeep
     * @for Craft
     * @param {Object} obj - the object to loop through
     * @param {Function} func - function to handle each iteration
     * @param {String=} path - string to reference value by simple dot notation
     * @example Craft.forEachDeep({ a : 1 , b : { c : 2}}, (value , key , object, currentPath) => { console.log(key) })
     */
    forEachDeep: function(object, func, path) {
      path = path || '';
      var currentPath = path,
        nestable = void 0,
        val = void 0,
        key = void 0;
      for (key in object) {
        if (object.hasOwnProperty(key)) val = object[key];
        currentPath = path;
        nestable = false;
        isArr(object) ? currentPath += '[' + key + ']' : !currentPath ? currentPath = key : currentPath += '.' + key;
        nestable = func(val, key, object, currentPath) == false;
        if (nestable && (isArr(val) || isObj(val))) Craft.forEachDeep(val, func, currentPath);
      }
    },
    /**
     * Converts any text to an inline URL code (good for images , svg , scripts or css)
     * @method URLfrom
     * @for Craft
     * @param {String} text - content to convert to an inline URL
     * @param {Object} [type] - additional info to create blob url with
     **/
    URLfrom: function(text, type) {
      return URL.createObjectURL(new Blob([text], type));
    },
    checkStatus: function(response) {
      if (response.status >= 200 && response.status < 300) return response;
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    },
    concatObjects: concatObjects,
    completeAssign: function(host) {
      slice(arguments, 1).map(function(source) {
        var descriptors = Object.keys(source).reduce(function(descriptors, key) {
          descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
          return descriptors;
        }, {}); // by default, Object.assign copies enumerable Symbols too
        Object.getOwnPropertySymbols(source).map(function(sym) {
          var descriptor = Object.getOwnPropertyDescriptor(source, sym);
          if (descriptor.enumerable) descriptors[sym] = descriptor;
        });
        Object.defineProperties(target, descriptors);
      });
      return target;
    },
    isObservable: function(obj) {
      return obj.isObservable || false;
    },
    /**
     * Simply clones/duplicates any object or array/arraylike object
     * @method clone
     * @for Craft
     * @param {Array|Object} val - array or object to be cloned
     * @return {Array|Object} cloned result
     */
    clone: function(val) {
      return isObj(val) ? Object.create(val) : Array.from(val);
    },
    /**
     * omits values from any arraylike object or string
     * @method omitFrom
     * @for Craft
     * @param {arraylike|String} Arr - arraylike object from which values will be omitted
     * @param {...*} values - values to omit from the arraylike object
     * @return {Array|String}
     */
    omitFrom: function(Arr) {
      var args = slice(arguments, 1);
      if (isStr(Arr)) args.map(function(a) {
        while (Arr.includes(a)) {
          Arr = Arr.replace(a, '');
        }
      });
      else args.map(function(a) {
        return Arr = removeFrom(Arr, a);
      });
      return Arr;
    },
    has: has,
    /**
     * Omits values from Objects, Strings and Arraylike objects
     * @method omit
     * @for Craft
     * @param {Object|Array} val - object from which things may be omitted
     * @param {...*} args - things to omit from Object or Array
     * @return {Object|Array}
     */
    omit: function(val) {
      if (is.Arraylike(val)) val = Craft.omitFrom.apply(this, arguments);
      var args = slice(arguments, 1);
      if (isObj(val) && !args.includes(val)) forEach(val, function(prop, key) {
        if (args.some(function(v) {
            return v == prop || v == key;
          })) delete val[key];
      });
      return val;
    },
    dropDupes: function(arr) {
      return arr.filter(function(item, pos, context) {
        return context.indexOf(item) === pos;
      });
    },
    /**
     * checks which browser you're running
     * @method isBrowser
     * @for Craft
     * @param {String} browser - string containing a browser name like 'chrome','firefox'...
     * @return {Boolean} - returns whether or not this is the browser you checked for
     */
    isBrowser: function(browser) {
      return Br.toLowerCase().includes(browser.toLowerCase());
    },
    /**
     * name of browser and version
     * @type {String}
     * @property browser
     * @for Craft
     */
    browser: Br,
    /**
     * Crafter.js' router system
     * @class router
     * @for Craft
     * @type Object
     * @property router
     */
    router: {
      handle: function(event, func) {
        var hash = location.hash;
        if (hash === event) func(event, hash);
        return Craft.notifier.on(event, func);
      },
      open: function(link, newtab) {
        !newtab ? location = link : open(link);
      },
      set title(title) {
        doc.title = title;
      },
      get title() {
        return doc.title;
      }
    },
    /**
     * Create, remove and manage cookies.
     * @class Cookies
     */
    Cookies: {
      get: function(key) {
        return decodeURIComponent(doc.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
      },
      set: function(key, val, expires, path, domain, secure) {
        if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) return false;
        var expiry = '';
        if (expires) {
          if (is.Num(expires)) expiry = expires == Infinity ? '; expires=Fri, 11 April 9997 23:59:59 UTC' : '; max-age=' + expires;
          if (isStr(expires)) expiry = '; expires=' + expires;
          if (is.Date(expires)) expiry = '; expires=' + expires.toUTCString();
        }
        doc.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(val) + expiry + (domain ? '; domain=' + domain : '') + (path ? '; path=' + path : '') + (secure ? '; secure' : '');
        return true;
      },
      has: function(key) {
        return key != undef && new RegExp('(?:^|;\\s*)' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=').test(doc.cookie);
      },
      remove: function(key, path, domain) {
        if (!Craft.Cookies.has(key)) return false;
        doc.cookie = encodeURIComponent(key) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (domain ? '; domain=' + domain : '') + (path ? '; path=' + path : '');
        return true;
      },
      keys: function() {
        return doc.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/).map(decodeURIComponent);
      }
    },
    /**
     * Handles WebSockets in a contained manner with send and recieve methods
     * @class Socket
     * @for Craft
     * @constructor
     * @param {String} address - the WebSocket address example "ws://localhost:3000/" but the ws:// or wss:// is optional
     * @param {Array=} protocols - the protocols to pass to the WebSocket Connection
     */
    Socket: function(address, protocols) {
      if (!is.URL(address)) {
        var match = address.match(/^(\/.*?)?$/);
        if (is.empty(match)) throw new Error('invalid url');
        address = location.host + match[0];
      }
      if (!address.includes('ws://') && !address.includes('wss://')) address = (location.protocol === 'http:' ? 'ws://' : 'wss://') + address;
      if (is.URL(address)) {
        var _ret3 = function() {
          var newSock = function() {
              return protocols ? new WebSocket(address, protocols) : new WebSocket(address);
            },
            Options = {
              socket: null,
              open: false,
              recievers: [],
              message: '',
              set send(msg) {
                if (Options.socket['readyState'] == 1) Options.socket.send(isObj(msg) ? JSON.stringify(msg) : msg);
                else {
                  (function() {
                    var poll = setInterval(function() {
                      if (Options.socket['readyState'] == 1) {
                        Options.socket.send(isObj(msg) ? JSON.stringify(msg) : msg);
                        clearInterval(poll);
                      }
                    }, 10);
                    setTimeout(clearInterval.bind(null, poll), 2000);
                  })();
                }
              },
              set recieve(func) {
                if (isFunc(func)) Options.recievers.push(func);
              },
              get recieve() {
                return Options.message;
              },
              close: function() {
                Options.socket.close();
              },
              reopen: function() {
                OpenSock(Options.open ? Options.socket : Options.socket = newSock());
              }
            },
            OpenSock = function(sock) {
              sock.onopen = function() {
                Options.open = true;
                sock.onmessage = function(e) {
                  Options.message = e.data;
                  Options.recievers.forEach(function(fn) {
                    fn(e.data, e);
                  });
                };
              };
              sock.onclose = function() {
                Options.open = false;
              };
              sock.onerror = function(e) {
                throw e;
              };
            };
          OpenSock(Options.socket = newSock());
          return {
            v: Options
          };
        }();
        if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
      }
    },
    keyhandles: {
      base: keyhandle,
      enter: keyhandle(13),
      delete: keyhandle(8),
      escape: keyhandle(27),
      spacebar: keyhandle(32)
    },
    after: function(n, func, ctx) {
      !isFunc(func) && isFunc(n) ? func = n : console.error('Craft.after: no function');
      n = Number.isFinite(n = +n) ? n : 0;
      if (--n < 1) return function() {
        return func.apply(ctx || this, arguments);
      };
    },
    debounce: function(wait, func, immediate) {
      var timeout = void 0;
      return function() {
        var args = arguments,
          scope = this,
          later = function() {
            timeout = null;
            if (!immediate) func.apply(scope, args);
          },
          callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(scope, args);
      };
    },
    throttle: function(wait, func, options) {
      var context = void 0,
        args = void 0,
        result = void 0,
        timeout = null,
        previous = 0;
      if (!options) options = {};

      function later() {
        previous = !options.leading ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
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
        } else if (!timeout && options.trailing == true) timeout = setTimeout(later, remaining);
        return result;
      };
    },
    curry: curry,
    memoize: function(func, resolver) {
      if (!isFunc(func) || resolver && !isFunc(resolver)) throw new TypeError('no function');
      var cache = new WeakMap(),
        memoized = function() {
          var args = arguments,
            key = resolver ? resolver.apply(this, args) : args[0];
          if (cache.has(key)) return cache.get(key);
          var result = func.apply(this, args);
          memoized.cache = cache.set(key, result);
          return result;
        };
      return memoized;
    },
    Once: function(func, context) {
      var result = void 0;
      return function() {
        if (isFunc(func)) {
          result = func.apply(context || this, arguments);
          func = null;
        }
        return result;
      };
    },
    css: function(element, styles, prop) {
      if (isObj(styles)) forEach(styles, function(prop, key) {
        if (isEl(element)) element.style[key] = prop;
        else if (is.NodeList(element)) forEach(element, function(el) {
          el.style[key] = prop;
        });
      });
      else if (isStr(styles, prop)) element.style[styles] = prop;
      else throw new Error('CSS : Styles Object is not an object');
      return element;
    },
    fixURL: function(url) {
      if (!is.URL(url)) {
        var match = url.match(/^(\/.*?)?$/);
        if (is.empty(match)) throw new Error('invalid src');
        url = location.host + match[0];
      }
      if (!url.includes('http://') && !url.includes('https://')) url = location.protocol + '//' + url;
      return url;
    },
    /**
     * takes in any string of valid css code and executes it
     * @method addCSS
     * @for Craft
     * @param {String} css - css code to execute
     */
    addCSS: function(css, noimport) {
      query('style[crafterstyles]', head).textContent += noimport ? css : '@import url("' + Craft.URLfrom(css, {
        type: 'text/css'
      }) + '");\n';
    },
    /**
     * imports css and executes it
     * @method importCSS
     * @for Craft
     * @param {String} src - source to fetch from
     * @param {Booleans} gofetch - should fetch instead of @import statement
     */
    importCSS: function(src, gofetch) {
      if (gofetch) fetch(Craft.fixURL(src), {
        mode: 'cors'
      }).then(function(res) {
        if (!res.ok) console.warn('loading css failed - ' + src);
        else res.text().then(function(css) {
          return Craft.addCSS('\n' + css, true);
        });
      });
      else Craft.addCSS('@import url("' + Craft.fixURL(src) + '");\n', true);
    },
    /**
     * imports fonts and loads them
     * @method importFont
     * @for Craft
     * @param {String} name - name of font as used in css
     * @param {String} src - source to fetch from
     */
    importFont: function(name, src) {
      Craft.addCSS('@font-face {font-family:' + name + ';src:url("' + (src.slice(0, 2) === './' ? src : Craft.fixURL(src)) + '");}', true);
    },
    /**
     * takes in a source then attempts to fetch and execute it
     * @method loadScript
     * @for Craft
     * @param {String} src - source to fetch from
     * @param {Boolean} [funcexec] - execute code from inside a new Function() object
     * @param {Object} [fetchAttr] - fetch request options
     */
    loadScript: function(src, funcexec, fetchattr) {
      var fetchAttr = {
        mode: 'cors'
      };
      if (isObj(fetchattr)) fetchAttr = concatObjects(fetchAttr, fetchattr);
      return promise(function(pass, fail) {
        fetch(Craft.fixURL(src), fetchAttr).then(function(res) {
          if (!res.ok) console.warn('loading script failed - ' + src);
          else res.text().then(function(code) {
            if (funcexec) {
              try {
                pass(new Function(code).call(root));
              } catch (e) {
                fail(e);
              }
            } else head.appendChild(dom.script(code, {}, false, pass, true));
          });
        });
      });
    },
    /**
     * fetches and executes multiple scripts
     * @method loadScripts
     * @for Craft
     * @param {Array} urls - array of string urls (sources) to fetch from
     * @param {Boolean} [funcexec] - execute code from inside a new Function() object
     * @param {Object} [fetchAttr] - fetch request options
     * @return {Promise}
     */
    loadScripts: function(urls, funcexec, fetchattr) {
      return promise(function(pass, fail) {
        var len = 0;
        urls.forEach(function(src) {
          Craft.loadScript(src, funcexec, fetchattr).then(function() {
            len++;
            if (len == urls.length) pass();
          }).catch(fail);
        });
      });
    },
    /**
     * determines if string contains capital letters
     * @method hasCaps
     * @for Craft
     * @param {String} str
     * @return {Boolean}
     */
    hasCaps: function(str) {
      return slice(str).some(is.Uppercase);
    },
    /**
     * determines if string contains numbers
     * @method hasNums
     * @for Craft
     * @param {String} str
     * @return {Boolean}
     */
    hasNums: function(str) {
      return (/\d/g.test(str));
    },
    len: function(val) {
      try {
        return isObj(val) ? Object.keys(val).length : is.Map(val) || is.Set(val) ? val.size : val.length;
      } catch (e) {}
      return -1;
    },
    DateIndex: function(Collection, date) {
      for (var i = 0; i < Collection.length; i++) {
        if (+Collection[i] === +date) return i;
      }
      return -1;
    },
    millis: {
      seconds: function(n) {
        return (n || 1) * 1000;
      },
      minutes: function(n) {
        return (n || 1) * 60000;
      },
      hours: function(n) {
        return (n || 1) * 3600000;
      },
      days: function(n) {
        return (n || 1) * 86400000;
      },
      weeks: function(n) {
        return (n || 1) * 604800000;
      },
      months: function(n, daysInMonth) {
        return n * Craft.millis.days(daysInMonth || 30);
      },
      years: function(n) {
        return n * Craft.millis.year;
      },
      sec: 1000,
      min: 60000,
      hour: 3600000,
      day: 86400000,
      year: 365 * 86400000
    },
    Directives: newMap(),
    Models: observable(),
    /**
     * Tail Call Optimization for recursive functions
     * @method tco
     * @for Craft
     * @param {Function} fn - function that uses recursion inside
     * @return {Function}
     */
    tco: function(fn) {
      var active = void 0,
        nextArgs = void 0;
      return function() {
        var result = void 0;
        nextArgs = arguments;
        if (!active) {
          active = true;
          while (nextArgs) {
            result = fn.apply(this, [nextArgs, nextArgs = null][0]);
          }
          active = false;
        }
        return result;
      };
    },
    /**
     * converts Objects or URL variable strings to a FormData object
     * @method toFormData
     * @for Craft
     * @param {object|String} val - values to convert
     */
    toFormData: function(val) {
      var formData = new FormData();
      if (isStr(val)) val = val.split('&');
      forEach(val, function(v) {
        if (isStr(v)) {
          v = v.split('=');
          if (v.length == 1) v[1] = '';
          formData.append(v[0], v[1]);
        } else formData.append(key, v);
      });
      return formData;
    },
    /**
     * handles scrolling events
     * @method onScroll
     * @param {Node} element - target of listener
     * @param {Function} func - callback to handle the event
     * @param {Boolean=} preventDefault - event.preventDefault() or not
     */
    onScroll: function(element, func, preventDefault) {
      return on('wheel', element, function(e) {
        if (preventDefault) e.preventDefault();
        func(e.deltaY < 1, e);
      });
    },
    /**
     * Promise that resolves when the DOM and WebdomLifecycle are all finished loading
     * @property WhenReady
     * @type {Promise}
     * @for Craft
     * @return {Promise} - when everything is done loading WhenReady will return a promise
     */
    get WhenReady() {
      return promise(function(pass, fail) {
        if (ready()) return pass();
        var readytimeout = setTimeout(function() {
          if (!ready()) fail('loading took too long loaded with errors :(');
        }, 5500);
        Craft.notifier.once('ready', function() {
          clearTimeout(readytimeout);
          pass();
        });
      });
    },
    /**
     * Create's Crafter.js models
     * @method model
     * @for Craft
     * @param {String} name - give a name to the model
     * @param {Class} modelclass - Class with constructor to instantiate model
     * @return {Object}
     */
    model: function(name, model) {
      if (isStr(name) && isObj(model) && isFunc(model.init) && !def(Craft.Models[name])) {
        model = observable(model);
        model.init.call(model, model);
        Craft.Models.set(name, model);
        Craft.Models.emit(name, model);
        if (model.load) Craft.WhenReady.then(model.load.bind(model));
        return model;
      }
      throw new Error('Crafter : Model already exists');
    },
    modelInit: function(name, func) {
      Craft.Models[name] != undef ? func.call(Craft, Craft.Models[name]) : Craft.Models.once(name, function(scope) {
        func.call(Craft, scope);
      });
    },
    M: function(key, val) {
      var cutkey = cutdot(key),
        IsValDefined = def(val),
        modelname = cutkey[0],
        type = (IsValDefined ? 'set' : 'get') + 'Deep';
      if (def(Craft.Models[modelname])) {
        var model = Craft.Models[modelname];
        return cutkey.length == 1 && !IsValDefined ? model : Craft[type](model, joindot(Craft.omit(cutkey, modelname)), val);
      }
    },
    getPath: function(path, full) {
      try {
        var cutbind = cutdot(path),
          prop = last(cutbind),
          objaccessor = cutbind[0],
          obj = def(Craft.Models[objaccessor]) ? Craft.Models[objaccessor] : Craft.getDeep(root, joindot(Craft.omit(cutbind, prop))),
          _val3 = Craft.getDeep(obj, cutbind.length > 1 ? joindot(Craft.omit(cutbind, objaccessor)) : prop);
        if (full) return {
          cutbind: cutbind,
          objaccessor: objaccessor,
          path: path,
          prop: prop,
          obj: obj,
          val: _val3
        };
        if (def(_val3)) return _val3;
        if (objaccessor === prop && def(obj)) return obj;
      } catch (e) {
        return {};
      }
    },
    /**
     * Defines custom attributes aka directives.
     * @method directive
     * @for Craft
     * @param {String} name - the name of your custom attribute
     * @param {Function} handle - a function to handle how your custom attribute behaves
     * @example Craft.directive('turngreen', element => element.css({ background : 'green'}));
     **/
    directive: function(name, handle) {
      if (!Craft.Directives.has(name) && isObj(handle) && isFunc(handle.bind)) {
        Craft.Directives.set(name, handle);
        Craft.WhenReady.then(function() {
          queryEach('[' + name + ']', function(el) {
            el = dom(el);
            if (el.hasAttr(name)) {
              if (!is.Set(el.state.directives)) el.state.directives = newSet();
              if (!el.state.directives.has(name)) {
                (function() {
                  el.state.directives.add(name);
                  var directiveChangeDetetor = el.state.on('attr:' + name, function(name, val, oldval, hasAttr) {
                    if (hasAttr || !def(oldval)) {
                      if (isFunc(handle.update)) handle.update.call(el, el, val, oldval, hasAttr);
                    } else if (isFunc(handle.unbind)) {
                      handle.unbind.call(el, el, val, oldval);
                      directiveChangeDetetor.off();
                    }
                  });
                  handle.bind.call(el, el, el.getAttr(name));
                })();
              }
            }
          });
        });
      }
    },
    /**
     * converts camel case strings to dashed strings usefull for css properties and such
     * @method camelDash
     * @for Craft
     * @example Craft.camelDash('MyCamelCaseName') // -> my-camel-case-name
     * @param {String) val - string to convert
     */
    camelDash: function(val) {
      return val.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    },
    /**
     * formats a number into a measurement of data size (Bytes,KB,GB,TB...)
     * @method formatBytes
     * @for Craft
     * @param {Nuber} bytes - number to convert
     * @param {Number} [decimals] - limit decimals to number
     * @return {String}
     */
    formatBytes: function(bytes, decimals) {
      if (bytes == 0) return '0 Bytes';
      var k = 1000,
        i = Math.floor(Math.log(bytes) / Math.log(k));
      return (bytes / Math.pow(k, i)).toPrecision(decimals + 1 || 3) + ' ' + 'Bytes,KB,MB,GB,TB,PB,EB,ZB,YB'.split(',')[i];
    },
    randomNum: function(max, min) {
      min = min || 0;
      max = max || 100;
      return Math.random() * (max - min) + min;
    },
    randomInt: function(max, min) {
      min = min || 0;
      max = max || 100;
      return Math.floor(Math.random() * (max - min)) + min;
    },
    /**
     * Generates random alphanumeric strings. default length of 6 characters
     * @method randomStr
     * @for Craft
     * @param {int} max - max length of string
     * @param {int} min - min length of string
     * @return {String}
     */
    randomStr: function(max, min) {
      var text = '';
      min = min || 0;
      max = max || 6;
      for (; min < max; min++) {
        text += possibleText.charAt(Math.floor(Math.random() * possibleText.length));
      }
      return text;
    },
    /**
     * similar to Craft.randomStr in that it generates a unique string , in this case a Unique ID with random alphanumeric strings separated by hyphens
     * @method GenUID
     * @for Craft
     * @example Craft.GenUID(); // -> "0ebf-c7d2-ef81-2667-08ef-4cde"
     * @param {Number=} len - optional length of uid sections
     * @return {String}
     */
    GenUID: function(len) {
      return Craft.array(len || 6, function() {
        return Craft.randomStr(4);
      }).join('-');
    },
    /**
     * method for creating custom elements configuring their lifecycle's and inheritance
     * the config Object has 7 distinct options ( created , inserted , destroyed , attr, css, set_X and get_X )
     * @method newComponent
     * @for Craft
     * @param {String} tag - a hyphenated custom HTML tagname for the new element -> "custom-element"
     * @param {object} config - Object containing all the element's lifecycle methods / extends and attached methods or properties
     */
    newComponent: function(tag, config) {
      if (!def(config)) throw new Error('Crafter : ' + tag + ' - component config undefined');
      if (isFunc(config)) {
        (function() {
          var componentclass = Object.create(config.prototype);
          config = {};
          Craft.omit.apply(null, [Craft.getAllKeys(componentclass)].concat(Craft.getAllKeys(Object.prototype))).map(function(key) {
            if (!key.includes('__')) config[key] = componentclass[key];
          });
        })();
      }
      var settings = {
        Instantiated: false,
        created: function(el) {
          var dealtWith = [];
          for (var _key5 in config) {
            if (!dealtWith.includes(_key5)) {
              if (_key5.includes('set_')) {
                var sgKey = _key5.split('_')[1];
                dealtWith.push(_key5, 'get_' + sgKey);
                el.newSetGet(sgKey, config[_key5], config['get_' + sgKey]);
              } else if (_key5.includes('get_')) {
                var _sgKey = _key5.split('_')[1];
                dealtWith.push(_key5, 'set_' + _sgKey);
                el.newSetGet(_sgKey, isFunc(config['set_' + _sgKey]) ? config['set_' + _sgKey] : noop, config[_key5]);
              } else if (['inserted', 'created', 'destroyed', 'attr'].every(is.eq(_key5))) {
                _key5.toLowerCase() == 'css' ? Craft.addCSS(config[_key5]) : defineprop(el, _key5, getpropdescriptor(config, _key5));
              }
            }
          }
          if (isFunc(config['attr'])) el.lifecycle.attr(config['attr']);
          settings.Instantiated = true;
        },
        attached: function(el) {
          if (!el.__DOMM) el = dom(el);
          if (!settings.Instantiated) settings.created.call(el, el);
          if (isFunc(config['inserted'])) config['inserted'].call(el, el);
        },
        destroyed: function(el) {
          if (isFunc(config['destroyed'])) config['destroyed'].call(el, el);
        }
      };
      domLifecycle.handles.set(tag, settings);
    },
    SyncInput: function(input, obj, key, onset) {
      if (isStr(input)) input = query(input);
      if (is.Input(input)) {
        (function() {
          var oldval = input.value,
            onsetfn = isFunc(onset);
          input[sI] = on('input,blur,keydown', input, function(e) {
            setTimeout(function() {
              var val = input.value;
              if (!(Craft.getDeep(obj, key) == '' && val == '') && val != oldval) {
                oldval = val;
                Craft.setDeep(obj, key, input.value);
                if (onsetfn) onset(input.value);
              }
            }, 0);
          });
        })();
      }
    },
    disconectInputSync: function(input) {
      if (isStr(input)) input = query(input);
      if (is.Node(input) && def(input[sI])) {
        input[sI].off();
        delete input[sI];
      }
    },
    onTabChange: function(fn) {
      return Craft.notifier.on('tabChange', fn);
    },
    every: function(time, fn, context, pauseondefocus) {
      if (isFunc(fn)) {
        var _ret8 = function() {
          var options = {
            interval: undef,
            on: function() {
              options.interval = setInterval(fn.bind(is.Bool(context) || !def(context) ? options : context), isFunc(time) ? time() : time);
              return options;
            },
            off: function() {
              clearInterval(options.interval);
              return options;
            }
          };
          if (pauseondefocus === true || context === true) Craft.onTabChange(function(state) {
            options[state ? 'on' : 'off']();
          });
          return {
            v: options.on()
          };
        }();
        if ((typeof _ret8 === 'undefined' ? 'undefined' : _typeof(_ret8)) === "object") return _ret8.v;
      }
    }
  }; // takes in an affected element and scans it for custom attributes
  // then handles the custom attribute if it was registered with Craft.directive
  function manageAttr(el, name, val, oldval, hasAttr) {
    if (Craft.Directives.has(name)) {
      var handle = Craft.Directives.get(name);
      if (hasAttr && val != oldval) {
        el = dom(el);
        if (!is.Set(el.state.directives)) el.state.directives = newSet();
        if (!el.state.directives.has(name)) {
          el.state.directives.add(name);
          handle.bind.call(el, el, val);
        } else if (handle.update) handle.update.call(el, el, val, hasAttr);
      } else if (!hasAttr && handle.unbind) handle.unbind.call(el, el, val, oldval);
    }
    if (el.state) {
      el.state.emit('attr', name, val, oldval, hasAttr);
      el.state.emit('attr:' + name, name, val, oldval, hasAttr);
    }
  }
  new MutationObserver(function(muts) {
    muts.map(function(mut) {
      if (mut.removedNodes.length > 0) map(mut.removedNodes, function(el) {
        if (isEl(el)) {
          if (domLifecycle.hasTag(el.tagName)) domLifecycle.destroyed(el);
          domLifecycle.events.emit('destroyed', el);
        }
      });
      if (mut.addedNodes.length > 0) map(mut.addedNodes, function(el) {
        if (isEl(el)) {
          if (domLifecycle.hasTag(el.tagName)) domLifecycle.attached(el);
          domLifecycle.events.emit('attatched', el);
        }
        if (el.attributes) map(el.attributes, function(attr) {
          if (Craft.Directives.has(attr.name)) manageAttr(el, attr.name, attr.value, '', true);
        });
      });
      if (mut.type == 'attributes' && isEl(mut.target) && mut.attributeName != 'style') manageAttr(mut.target, mut.attributeName, mut.target.getAttribute(mut.attributeName), mut.oldValue, mut.target.hasAttribute(mut.attributeName));
    });
  }).observe(doc, {
    attributes: true,
    childList: true, // characterData: true,
    subtree: true
  });
  head.appendChild(dom.style('', 'crafterstyles'));
  var TabChange = function(ta) {
    return function() {
      Craft.tabActive = ta;
      Craft.notifier.emit('tabChange', ta);
    };
  };
  on('blur', TabChange(false));
  on('focus', TabChange(true));
  Craft.directive('link', {
    bind: function(element, link) {
      if (isFunc(element.onlink)) element.state.linkhandle = Craft.router.handle(link, element.onlink.bind(element));

      function makeLinkHandler(fn) {
        if (isFunc(fn)) {
          if (element.state.linkhandle) element.state.linkhandle.off();
          return element.state.linkhandle = Craft.router.handle(link, fn);
        }
      }
      element.newSetGet('onlink', makeLinkHandler, function() {
        return makeLinkHandler;
      });
    },
    update: function(element, link, oldlink) {
      if (link != oldlink) {
        if (isObj(element.state.linkhandle)) element.state.linkhandle.off();
        if (isFunc(element.onunlink)) element.onunlink(link);
      }
    },
    unbind: function(element, link) {
      if (isObj(element.state.linkhandle)) element.state.linkhandle.off();
      if (isFunc(element.onunlink)) element.onunlink(link);
    }
  });
  Craft.directive('bind', {
    bind: function(element, bind) {
      element.bind(bind);
    },
    update: function(element, bind, oldbind) {
      if (bind != oldbind) {
        element.unbind(oldbind);
        element.bind(bind);
      }
    },
    unbind: function(element, bind) {
      element.unbind(bind);
    }
  });
  Craft.directive('bind-for', {
    bind: function(element, bind) {
      var data = Craft.M(bind);
      if (def(data) && data.forEach) {
        (function() {
          var domfrag = dom.frag();
          element = element.stripAttr('bind-for');
          data.forEach(function(item) {
            domfrag.appendChild(element.html(item).clone(true));
          });
          element.replace(domfrag);
        })();
      } else element.remove();
    }
  });
  Craft.directive('import-view', {
    bind: function(element, src) {
      element.importview(src);
    },
    update: function(element, src) {
      element.importview(src);
    }
  });
  Craft.directive('color-accent', {
    bind: function(element, color) {
      if (isFunc(element.colorAccent)) element.colorAccent(color);
    }
  });

  function init() {
    Ready = true;
    Craft.notifier.emit('ready');
  }!ready() ? once('DOMContentLoaded', doc, init) : init();
  on('hashchange', function() {
    var hash = location.hash;
    Craft.notifier.emit(hash, hash);
  });
  on('click', function(e, target) {
    if (target.hasAttribute('link')) {
      (target.hasAttribute('newtab') ? root.open : Craft.router.open)(target.getAttribute('link'));
    }
  }); // Node. Does not work with strict CommonJS, but
  // only CommonJS-like environments that support module.exports,
  // like Node.
  if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) module.exports = Craft; // Browser globals (root is window)
  else root.Craft = Craft; // console.log(performance.now() - perf, 'Crafter.js');
})(document, self);