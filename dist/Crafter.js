/**
 *  @overview Crafter.js , minimalist front-end library
 *  @author Saul van der Walt - https://github.com/SaulDoesCode/
 *  @license MIT
 */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

(function (doc, root) {

  var type = function type(obj, str) {
    return toString.call(obj) === str;
  },
      isT = function isT(val, str) {
    return (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === str;
  },
      nT = function nT(val, str) {
    return !isT(val, str);
  },
      eachisInstanceof = function eachisInstanceof(test, collection) {
    if (isT(collection, 'string') || collection === undefined || collection === null) return false;
    var i = 0,
        allgood = true;
    for (; i < collection.length; i++) {
      if (collection[i] instanceof test) {
        allgood = false;
        break;
      }
    }
    return allgood;
  },
      regexps = {
    // Thanks to github.com/arasatasaygin for these RegExps
    url: /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i,
    email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
    timeString: /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/,
    dateString: /^(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/(?:[0-9]{2})?[0-9]{2}$/,
    hexadecimal: /^[0-9a-fA-F]+$/,
    hexColor: /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
    ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
    ipv6: /^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,
    ip: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/
  },
      Ready = false,
      head = doc.getElementsByTagName('head')[0],
      CrafterStyles = doc.createElement('style'),
      ua = navigator.userAgent,
      tem = undefined,
      _br = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
  if (_br && (tem = ua.match(/version\/([\.\d]+)/i)) !== null) _br[2] = tem[1];
  _br ? [_br[1], _br[2]] : [navigator.appName, navigator.appVersion, '-?'];

  CrafterStyles.setAttribute('crafterstyles', '');
  CrafterStyles.innerHTML = '\n@keyframes NodeInserted {from {opacity:.99;}to {opacity: 1;}} [view-bind] {animation-duration: 0.001s;animation-name: NodeInserted;}';
  head.appendChild(CrafterStyles);
  CrafterStyles = doc.querySelector('[crafterstyles]', head);

  /** is - Type Testing / Assertion */
  var is = {
    /**
     * Test if something is a boolean type
     * @param val - value to test
     */
    Bool: function Bool(val) {
      return typeof val === 'boolean';
    },
    /**
     * Test if something is a String
     * @param args - value/values to test
     */
    String: function String() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return args.length && args.every(function (o) {
        return isT(o, 'string');
      });
    },
    /**
     * Test if something is a Number
     * @param args - value/values to test
     */
    Num: function Num() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return args.length && args.every(function (o) {
        return isT(o, 'number');
      });
    },
    /**
     * Test if something is an Array
     * @param args - value/values to test
     */
    Arr: function Arr() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return args.length && args.every(function (o) {
        return Array.isArray(o);
      });
    },
    /**
     * Test if something is an Array-Like
     * @param args - value/values to test
     */
    Arraylike: function Arraylike() {
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return args.length && args.every(function (o) {
        return is.Def(o.length) ? true : false;
      });
    },
    /**
     * Determine whether a variable is undefined
     * @param args - value/values to test
     */
    Undef: function Undef() {
      for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return args.length && args.every(function (o) {
        return isT(o, 'undefined');
      });
    },
    /**
     * Determine whether a variable is in fact defined
     * @param args - value/values to test
     */
    Def: function Def() {
      for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      return args.length && args.every(function (o) {
        return nT(o, 'undefined');
      });
    },
    /**
     * Determine whether a variable is null
     * @param args - value/values to test
     */
    Null: function Null() {
      for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      return args.length && args.every(function (o) {
        return o === null;
      });
    },
    /**
     * Determine whether a variable is a DOM Node
     * @param args - value/values to test
     */
    Node: (function (_Node) {
      function Node() {
        return _Node.apply(this, arguments);
      }

      Node.toString = function () {
        return _Node.toString();
      };

      return Node;
    })(function () {
      for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }

      return args.length && args.every(function (o) {
        return o instanceof Node;
      });
    }),
    /**
     * Determine whether a variable is a DOM NodeList or Collection of Nodes
     * @param args - value/values to test
     */
    NodeList: (function (_NodeList) {
      function NodeList() {
        return _NodeList.apply(this, arguments);
      }

      NodeList.toString = function () {
        return _NodeList.toString();
      };

      return NodeList;
    })(function () {
      for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }

      return args.length ? args.every(function (n) {
        return n === null ? false : n instanceof NodeList || eachisInstanceof(Node, n);
      }) : false;
    }),
    /**
     * Determine if a variable is a Number
     * @param {...*} args - value/values to test
     */
    Num: function Num() {
      for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        args[_key10] = arguments[_key10];
      }

      return args.length && args.every(function (o) {
        return type(o, '[object Number]');
      });
    },
    /**
     * Determine if a variable is an Object
     * @param args - value/values to test
     */
    Object: function Object() {
      for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
        args[_key11] = arguments[_key11];
      }

      return args.length && args.every(function (o) {
        return type(o, '[object Object]');
      });
    },
    /**
     * Determine if a variable is a HTMLElement
     * @param args - value/values to test
     */
    Element: function Element() {
      for (var _len12 = arguments.length, args = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
        args[_key12] = arguments[_key12];
      }

      return args.length && args.every(function (o) {
        return type(o, '[object HTMLElement]');
      });
    },
    /**
     * Determine if a variable is a File Object
     * @param args - value/values to test
     */
    File: function File() {
      for (var _len13 = arguments.length, args = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
        args[_key13] = arguments[_key13];
      }

      return args.length && args.every(function (o) {
        return type(o, '[object File]');
      });
    },
    /**
     * Determine if a variable is of a FormData type
     * @param args - value/values to test
     */
    FormData: function FormData() {
      for (var _len14 = arguments.length, args = Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
        args[_key14] = arguments[_key14];
      }

      return args.length && args.every(function (o) {
        return type(o, '[object FormData]');
      });
    },
    /**
     * Determine if a variable is a Map
     * @param args - value/values to test
     */
    Map: function Map() {
      for (var _len15 = arguments.length, args = Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
        args[_key15] = arguments[_key15];
      }

      return args.length && args.every(function (o) {
        return type(o, '[object Map]');
      });
    },
    /**
     * Determine if a variable is a function
     * @param args - value/values to test
     */
    Func: function Func() {
      for (var _len16 = arguments.length, args = Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
        args[_key16] = arguments[_key16];
      }

      return args.length && args.every(function (o) {
        return typeof o === 'function';
      });
    },
    /**
     * Determine if a variable is of Blob type
     * @param obj - variable to test
     */
    Blob: function Blob(obj) {
      return type(obj, '[object Blob]');
    },
    /**
     * Determine if a variable is a Regular Expression
     * @param obj - variable to test
     */
    RegExp: function RegExp(obj) {
      return type(obj, '[object RegExp]');
    },
    /**
     * Determine if a variable is a Date type
     * @param obj - variable to test
     */
    Date: function Date(obj) {
      return type(obj, '[object Date]');
    },
    /**
     * Determine if a variable is a Set
     * @param obj - variable to test
     */
    Set: function Set(obj) {
      return type(obj, '[object Set]');
    },
    /**
     * Determine if a variable is a Symbol
     * @param obj - variable to test
     */
    Symbol: function Symbol(obj) {
      return type(obj, '[object Symbol]');
    },
    char: function char(val) {
      return is.String(val) && val.length === 1;
    },
    space: function space(val) {
      return is.char(val) ? val.charCodeAt(0) > 8 && val.charCodeAt(0) < 14 || val.charCodeAt(0) === 32 : false;
    },
    /**
     * Determine if a String is UPPERCASE
     * @param {string} char - variable to test
     */
    Uppercase: function Uppercase(str) {
      return is.String(str) && str === str.toUpperCase();
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
      return (/^[0-9a-zA-Z]+$/.test(str)
      );
    },
    /**
     * Determines whether a String is a valid Email
     * @param {string} email - variable to test
     */
    Email: function Email(email) {
      return regexps.email.test(email);
    },
    /**
     * Determines whether a String is a URL
     * @param {string} url - variable to test
     */
    URL: function URL(url) {
      return regexps.url.test(url);
    },
    /**
     * Determines whether a String is a HEX-COLOR (#fff123)
     * @param {string} HexColor - variable to test
     */
    HexColor: function HexColor(hexColor) {
      return regexps.hexColor.test(hexColor);
    },
    /**
     * Determines whether a String is a ip
     * @param {string} ip - variable to test
     */
    ip: function ip(_ip) {
      return regexps.ip.test(_ip);
    },
    /**
     * Determines whether a String is a ipv4
     * @param {string} ipv4 - variable to test
     */
    ipv4: function ipv4(_ipv) {
      return regexps.ipv4.test(_ipv);
    },
    /**
     * Determines whether a String is a ipv6
     * @param {string} ipv6 - variable to test
     */
    ipv6: function ipv6(_ipv2) {
      return regexps.ipv6.test(_ipv2);
    },
    /**
     * Determines whether a String is hexadecimal
     * @param {string} hexadecimal - variable to test
     */
    hexadecimal: function hexadecimal(_hexadecimal) {
      return regexps.hexadecimal.test(_hexadecimal);
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
      return regexps.timeString.test(_time);
    },
    /**
     * Determines whether a String is a dateString
     * @param {string} dateString - variable to test
     */
    dateString: function dateString(_dateString) {
      return regexps.dateString.test(_dateString);
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
    empty: function empty(val) {
      if (is.Object(val)) {
        var num = Object.getOwnPropertyNames(val).length;
        if (num === 0 || num === 1 && is.array(val) || num === 2 && is.arguments(val)) return true;
        return false;
      } else if (is.Arr(val)) return val.length <= 0;
      return val === '';
    },
    /**
     * Determines if a value is an instance of the ReactiveVariable class
     * @param args - value/values to test
     */
    ReactiveVariable: function ReactiveVariable() {
      for (var _len17 = arguments.length, args = Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {
        args[_key17] = arguments[_key17];
      }

      return args.length && args.every(function (o) {
        return o instanceof _ReactiveVariable ? true : false;
      });
    },
    /**
     * Test if something is a Native JavaScript feature
     * @param val - value to test
     */
    Native: function Native(val) {
      var type = typeof val === 'undefined' ? 'undefined' : _typeof(val);
      return type === 'function' ? RegExp('^' + String(Object.prototype.toString).replace(/[.*+?^${}()|[\]\/\\]/g, '\\$&').replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$').test(Function.prototype.toString.call(val)) : val && type == 'object' && /^\[object .+?Constructor\]$/.test(val.toString) || false;
    }
  };

  /**
   * Converts any Query/QueryAll to an Array of Nodes even if there is only one Node
   * @param {Node|NodeList|Array|String} val - pass either a CSS Selector string , Node/NodeList or Array of Nodes
   */
  function QueryOrNodetoNodeArray(val) {
    if (is.String(val)) val = _queryAll(val);
    if (is.Node(val)) return [val];else if (is.NodeList(val)) return Array.from(val);
  }

  /**
   * associative collection of functions
   * that can be added,removed or iterated through
   */

  var FunctionIterator = (function () {
    function FunctionIterator() {
      _classCallCheck(this, FunctionIterator);

      this.functions = {};
      this.length = Object.keys(this.functions).length;
    }
    /**
     * Check if the FunctionIterator Collection contains a certain function
     * @param {string} funcName - name to identify the function with
     */

    _createClass(FunctionIterator, [{
      key: 'has',
      value: function has(funcName) {
        if (this.functions.has(funcName)) return true;
        return false;
      }
      /**
       * Add a function to the collection
       * @param {string} funcName - name to identify the function with
       * @param {Function} func - function to be stored in the FunctionIterator Collection
       */

    }, {
      key: 'add',
      value: function add(funcName, func) {
        if (is.Func(func)) {
          this.functions[funcName] = func;
        } else if (is.Func(funcName)) {
          this.functions[Craft.randomString()] = funcName;
        } else console.error("Invalid function parameter in FunctionIterator.add(funcName , _function_ )");
        this.length = Object.keys(this.functions).length;
      }
      /**
       * Remove a function from the collection
       * @param {string} funcName - name to identify the function with
       */

    }, {
      key: 'remove',
      value: function remove(funcName) {
        if (this.functions.has(funcName)) {
          this.functions[funcName] = null;
          delete this.functions[funcName];
        } else console.warn("No Such Function Entry in FunctionIterator");
        this.length = Object.keys(this.functions).length;
      }
      /**
       * Remove all functions from the collection
       * @param {string} funcName - name to identify the function with
       */

    }, {
      key: 'removeAll',
      value: function removeAll() {
        delete this.functions;
        this.functions = null;
        this.functions = {};
        this.length = Object.keys(this.functions).length;
      }
      /**
       * Execute each function in the Collection
       * all arguments passed will be applied to each function in the collection
       * usefull for centralizing an Event Listener such as a Window Resize event
       */

    }, {
      key: 'runEach',
      value: function runEach() {
        for (var _i in this.functions) {
          this.functions[_i].apply(this, arguments);
        }
      }
      /**
       * Execute a single function in the collection
       * @param {string} funcName - name to identify the function with
       * @param {...*=} args - arguments/parameters to pass to the function
       */

    }, {
      key: 'runOne',
      value: function runOne(funcName) {
        this.functions.hasOwnProperty(funcName) ? this.functions[funcName].apply(this, args) : console.warn("No Such Function Entry in FunctionIterator");
      }
    }]);

    return FunctionIterator;
  })();

  /**
   * Handles WebSockets in a contained manner with send and recieve methods
   * @param {string} wsAddress - the WebSocket address example "ws://localhost:3000/"
   * @param {Array=} protocols - the protocols to pass to the WebSocket Connection
   */

  var CraftSocket = (function () {
    function CraftSocket(wsAddress, protocols) {
      var _this = this;

      _classCallCheck(this, CraftSocket);

      is.Arr(protocols) ? this.Socket = new WebSocket(wsAddress, protocols) : this.Socket = new WebSocket(wsAddress);
      this.messageCalls = [];
      this.RecieveCalls = [];
      this.Socket.onmessage = function (e) {
        return _this.RecieveCalls.forEach(function (call) {
          return call(e);
        });
      };
    }
    /**
     * Sends a message along the WebSocket Connection
     * @param {string} message - the WebSocket address example "ws://localhost:3000/"
     * @param {function=} func - optional function to recieve the response with -> "function ( response , event ) { ... } or response => ..."
     */

    _createClass(CraftSocket, [{
      key: 'send',
      value: function send(message, func) {
        var _this2 = this;

        this.messageCalls.push(function () {
          _this2.Socket.send(message);
          if (is.Def(func) && is.Func(func)) _this2.recieve(function (data, e) {
            return func(data, e);
          });
        });
        this.Socket.onopen = function (e) {
          return _this2.messageCalls[_this2.messageCalls.length - 1]();
        };
      }
      /**
       * Recieves messages from the WebSocket Server
       * @param {function} func - function to recieve the response and event with -> "function ( response , event ) { ... } or response => ..."
       */

    }, {
      key: 'recieve',
      value: function recieve(func) {
        is.Func(func) ? this.RecieveCalls.push(function (e) {
          return func(e.data, e);
        }) : console.error("callback is not a function or is not defined");
      }
      /** Closes the WebSocket Connection */

    }, {
      key: 'close',
      value: function close() {
        this.Socket.close();
      }
    }]);

    return CraftSocket;
  })();

  /**
   * Variable that is used for Data Binding and other reactive processes
   * @param {*} val - value you'd liek the ReactiveVariable to Store
   * @param {function} handle - function that gets called whenever the ReactiveVariable changes -> "function( OldValue , newValue ) {...}"
   * @returns {*} Returns the value assigned to the ReactiveVariable
   */

  var _ReactiveVariable = (function () {
    function _ReactiveVariable(val, handle) {
      _classCallCheck(this, _ReactiveVariable);

      if (is.Func(handle)) {
        this.val = val;
        this.Handle = handle;
      } else console.error('ReactiveVariable needs a handler function after the value');
      return this.val;
    }
    /**
     * Sets the new value of the ReactiveVariable , this will also call the handle function
     * @param {*} val - new value to assign the ReactiveVariable
     */

    _createClass(_ReactiveVariable, [{
      key: 'set',
      value: function set(val) {
        if (this.val !== val) {
          this.Oldval = this.val;
          this.val = val;
          this.Handle(this.Oldval, val);
        }
        return this.val;
      }
      /**
       * Gets the value of the ReactiveVariable , ReactiveVariable.val also does this
       */

    }, {
      key: 'get',
      value: function get() {
        return this.val;
      }
      /**
       * Redefine the handle function of the ReactiveVariable
       * @param {function} handle - function that gets called whenever the ReactiveVariable changes -> "function( OldValue , newValue ) {...}"
       */

    }, {
      key: 'reset',
      value: function reset(handle) {
        is.Func(handle) ? this.Handle = handle : console.error('ReactiveVariable.Reset only takes a function');
      }
    }]);

    return _ReactiveVariable;
  })();

  /**
   * Event Handling Class
   * @param {string} EventType - set the type of event to listen for example "click" or "scroll"
   * @param {Node|NodeList|window|document} Target - the Event Listener's target , can also be a NodeList to listen on multiple Nodes
   * @param {function} Func - Handler function that will be called when the event is triggered -> "function( event , event.srcElement ) {...}"
   * @param {...*} args - extra optional arguments/parameters to pass to the handler function
   * @returns Interface On,Off,Once
   */

  var EventHandler = (function () {
    function EventHandler(EventType, Target, Func) {
      for (var _len18 = arguments.length, args = Array(_len18 > 3 ? _len18 - 3 : 0), _key18 = 3; _key18 < _len18; _key18++) {
        args[_key18 - 3] = arguments[_key18];
      }

      _classCallCheck(this, EventHandler);

      this.EventType = EventType;
      this.Target = Target !== window && Target !== document ? QueryOrNodetoNodeArray(Target) : Target;
      this.FuncWrapper = function (e) {
        return Func(e, e.srcElement, args || []);
      };
    }
    /**
     * Activates the EventHandler to start listening for the EventType on the Target/Targets
     */

    _createClass(EventHandler, [{
      key: 'On',
      value: function On() {
        var _this3 = this;

        is.Arr(this.Target) ? this.Target.forEach(function (target) {
          return target.addEventListener(_this3.EventType, _this3.FuncWrapper);
        }) : this.Target.addEventListener(this.EventType, this.FuncWrapper);
      }
      /**
       * De-activates / turns off the EventHandler to stop listening for the EventType on the Target/Targets
       * can still optionally be re-activated with On again
       */

    }, {
      key: 'Off',
      value: function Off() {
        var _this4 = this;

        is.Arr(this.Target) ? this.Target.forEach(function (target) {
          return target.removeEventListener(_this4.EventType, _this4.FuncWrapper);
        }) : this.Target.removeEventListener(this.EventType, this.FuncWrapper);
      }
      /**
       * Once the the Event has been triggered the EventHandler will stop listening for the EventType on the Target/Targets
       * the Handler function will be called only Once
       */

    }, {
      key: 'Once',
      value: function Once() {
        var func = this.FuncWrapper,
            target = this.Target,
            etype = this.EventType,
            listenOnce = function listenOnce(e) {
          func(e);
          is.Arr(target) ? target.forEach(function (t) {
            return t.removeEventListener(etype, listenOnce);
          }) : target.removeEventListener(etype, listenOnce);
        };
        is.Arr(target) ? target.forEach(function (t) {
          return t.addEventListener(etype, listenOnce);
        }) : target.addEventListener(etype, listenOnce);
      }
    }]);

    return EventHandler;
  })();

  /**
   * Easy way to loop through Collections and Objects
   * @param {Array|Object|NodeList} iterable - any collection that is either an Object or has a .length value
   * @param {function} func - function called on each iteration -> "function( value , indexOrKey ) {...}"
   */

  function forEach(iterable, func) {
    if (is.Undef(iterable)) throw new Error("forEach -> cannot iterate through undefined");
    if (!is.Func(func)) throw new Error("forEach -> invalid or undefined function provided");
    var i = 0;
    if (is.Def(iterable.length)) for (; i < iterable.length; i++) func(iterable[i], i);else for (i in iterable) if (iterable.hasOwnProperty(i)) func(iterable[i], i);
  }

  /**
   * Easy way to get a DOM Node or Node within another DOM Node using CSS selectors
   * @param {string} selector - CSS selector to query the DOM Node with
   * @param {Node|string=} element - Optional Node or CSS selector to search within insead of document
   */
  function _query(selector, element) {
    if (is.String(element)) return doc.querySelector(element).querySelector(selector);
    if (is.Node(element)) return element.querySelector(selector);
    return doc.querySelector(selector);
  }
  /**
   * Easy way to get a DOM NodeList or NodeList within another DOM Node using CSS selectors
   * @param {string} selector - CSS selector to query the DOM Nodes with
   * @param {Node|string=} element - Optional Node or CSS selector to search within insead of document
   */
  function _queryAll(selector, element) {
    if (is.String(element)) return doc.querySelector(element).querySelectorAll(selector);
    if (is.Node(element)) return element.querySelectorAll(selector);
    return doc.querySelectorAll(selector);
  }
  /**
   * Easy way to loop through Nodes in the DOM using a CSS Selector or a NodeList
   * @param {string|NodeList} selector - CSS selector to query the DOM Nodes with or NodeList to iterate through
   * @param {Node|string=} element - Optional Node or CSS selector to search within insead of document
   * @param {function} func - function called on each iteration -> "function( Element , index ) {...}"
   */
  function queryEach(selector, element, func) {
    if (is.Func(element)) {
      func = element;
      element = doc;
    }
    var elements = undefined,
        i = 0;
    if (is.String(element, selector)) elements = doc.querySelector(element).querySelectorAll(selector);
    if (is.String(selector)) elements = element.querySelectorAll(selector);
    if (is.NodeList(selector) || is.Element(selector)) elements = [selector];
    for (; i < elements.length; i++) func(elements[i], i);
  }

  /**
   * Starts listening for an EventType on the Target/Targets
   * @param {string} EventType - set the type of event to listen for example "click" or "scroll"
   * @param {Node|NodeList|window|document} Target - the Event Listener's target , can be a NodeList to listen on multiple Nodes
   * @param {function} Func - Handler function that will be called when the event is triggered -> "function( event , event.srcElement ) {...}"
   * @returns Off - when On is defined as a variable "var x = On(...)" it allows you to access all the EventHandler interfaces Off,Once,On
   */
  function _On(EventType, Target, func) {
    if (is.Func(Target)) {
      func = Target;
      Target = root;
    }
    var handle = new EventHandler(EventType, Target, func);
    handle.On();
    return handle;
  }

  /**
   * Starts listening for an EventType on the Target/Targets ONCE after triggering the Once event Listener will stop listening
   * @param {string} EventType - set the type of event to listen for example "click" or "scroll"
   * @param {Node|NodeList|window|document} Target - the Event Listener's target , can be a NodeList to listen on multiple Nodes
   * @param {function} Func - Handler function that will be called when the event is triggered -> "function( event , event.srcElement ) {...}"
   * @returns On,Off,Once - when Once is defined as a variable "var x = Once(...)" it allows you to access all the EventHandler interfaces Off,Once,On
   */
  function Once(EventType, Target, func) {
    if (is.Func(Target)) {
      func = Target;
      Target = root;
    }
    var handle = new EventHandler(EventType, Target, func);
    handle.Once();
    return handle;
  }

  function make_element(name, inner, attributes, NodeForm, extraAttr) {
    if (is.Bool(attributes)) {
      NodeForm = attributes;
      attributes = undefined;
    }
    if (is.Bool(inner)) {
      NodeForm = inner;
      attributes = undefined;
    }
    if (NodeForm === true) {
      var _ret = (function () {
        var newEl = doc.createElement(name);
        newEl.innerHTML = inner;
        if (is.Object(attributes)) forEach(attributes, function (val, attr) {
          return newEl.setAttribute(attr, val);
        });
        if (is.String(attributes)) attributes.split('&').forEach(function (attr) {
          return is.Def(attr.split('=')[1]) ? newEl.setAttribute(attr.split('=')[0], attr.split('=')[1]) : newEl.setAttribute(attr.split('=')[0], '');
        });
        if (is.Def(extraAttr) && is.Object(extraAttr)) forEach(extraAttr, function (val, attr) {
          return newEl.setAttribute(attr, val);
        });
        return {
          v: newEl
        };
      })();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }
    var attrString = '';
    if (is.String(attributes)) attributes.split('&').forEach(function (attr) {
      return attrString += is.Def(attr.split('=')[1]) ? attr.split('=')[0] + '="' + attr.split('=')[1] + '" ' : attr.split('=')[0] + ' ';
    });
    if (is.Object(attributes)) forEach(attributes, function (val, attr) {
      return attrString += ' ' + attr + '="' + val + '" ';
    });
    if (is.Def(extraAttr) && is.Object(extraAttr)) forEach(extraAttr, function (val, attr) {
      return attrString += ' ' + attr + '="' + val + '" ';
    });
    return '<' + name + ' ' + attrString + '>' + inner + '</' + name + '>';
  }

  /**
   * Function that returns many useful methods for interacting with and manipulating the DOM or creating elements
   * @param {Node|NodeList|string=} element - optional Node, NodeList or CSS Selector that will be affected by the methods returned
   */
  var dom = function dom(element) {
    if (is.String(element)) {
      var elements = _queryAll(element);
      elements.length > 1 ? element = elements : element = elements[0];
    }
    if (is.Node(element)) return {
      /**
       * changes or returns the innerHTML value of a Node
       * @param {string=} sets the innerHTML value or when undefined gets the innerHTML value
       * @namespace dom()
       */
      html: function html(val) {
        return is.Def(val) ? element.innerHTML = val : element.innerHTML;
      },
      /**
       * changes or returns the textContent value of a Node
       * @param {string=} sets the textContent value or when undefined gets the textContent value
       * @namespace dom()
       */
      text: function text(val) {
        return is.Def(val) ? element.textContent = val : element.textContent;
      },
      /**
       * replaces a Node with another node provided as a parameter/argument
       * @param {Node} Node to replace with
       * @namespace dom()
       */
      replace: function replace(val) {
        return element.parentNode.replaceChild(el, element);
      },
      /**
       * append the Element to another node using either a CSS selector or a Node
       * @param {Node|string} CSS selector or Node to append the element to
       * @namespace dom()
       */
      appendTo: function appendTo(val) {
        var el = undefined;
        is.Node(val) ? el = val : el = _query(val);
        if (el !== null) el.appendChild(element);
      },
      /**
       * append text or a Node to the element
       * @param {Node|string} String or Node to append to the element
       * @namespace dom()
       */
      append: function append(val) {
        return is.String(val) ? element.innerHTML += val : element.parentNode.appendChild(element);
      },
      /**
       * prepend text or a Node to the element
       * @param {Node|string} String or Node to prepend to the element
       * @namespace dom()
       */
      prepend: function prepend(val) {
        return is.String(val) ? element.innerHTML = val + element.innerHTML : element.insertBefore(val, element.firstChild);
      },
      /**
       * Listen for Events on the element
       * @param {string} string indicating the type of event to listen for
       * @param {function} func - handler function for the event
       * @returns handler (Off,Once,On)
       * @namespace dom()
       */
      On: function On(eventType, func) {
        return _On(eventType, element, func);
      },
      /**
       * add CSS style rules to the Element or NodeList
       * @param {object} styles - should contain all the styles you wish to add example { borderWidth : '5px solid red' , float : 'right'}...
       */
      css: function css(styles) {
        return is.Def(styles) ? forEach(styles, function (prop, key) {
          return element.style[key] = prop;
        }) : console.error('Styles Object undefined');
      },
      /**
       * check if the element has got a specific CSS class
       * @param {string} name of the class to check for
       */
      gotClass: function gotClass(Class) {
        return element.classList.contains(Class);
      },
      /**
       * Add a CSS class to the element
       * @param {string} name of the class to add
       */
      addClass: function addClass(Class) {
        return element.classList.add(Class);
      },
      /**
       * removes a specific CSS class from the element
       * @param {string} name of the class to strip
       */
      stripClass: function stripClass(Class) {
        return element.classList.remove(Class);
      },
      /**
       * removes a specific Attribute from the element
       * @param {string} name of the Attribute to strip
       */
      stripAttr: function stripAttr(Attr) {
        return element.removeAttribute(Attr);
      },
      /**
       * checks if the element has a specific Attribute
       * @param {string} name of the Attribute to check for
       */
      hasAttr: function hasAttr(Attr) {
        return element.hasAttribute(Attr);
      },
      /**
       * Sets or adds an Attribute on the element
       * @param {string} Name of the Attribute to add/set
       * @param {string} Value of the Attribute to add/set
       */
      setAttr: function setAttr(Attr, val) {
        return element.setAttribute(Attr, val);
      },
      getAttr: function getAttr(Attr) {
        return element.getAttribute(Attr);
      },
      /** gets all the elements siblings within it's parentNode */
      getSiblings: function getSiblings() {
        var siblings = [],
            AllChildren = element.parentNode.childNodes;
        for (var _i2 = 0; _i2 < AllChildren.length; _i2++) {
          if (AllChildren[_i2] !== element) siblings.push(AllChildren[_i2]);
        }return siblings;
      },
      /** gets all the element's pixel width */
      Width: function Width() {
        return element.getBoundingClientRect().width;
      },
      /** gets all the element's pixel height */
      Height: function Height() {
        return element.getBoundingClientRect().height;
      },
      /** gets all the element's dimentions (width,height,left,top,bottom,right)*/
      getRect: function getRect() {
        return element.getBoundingClientRect();
      },
      /**
       * sets all the element's pixel width
       * @param {string} pixel value to set
       */
      setWidth: function setWidth(Width) {
        return element.style.width = Width;
      },
      /**
       * sets all the element's pixel height
       * @param {string} pixel value to set
       */
      setHeight: function setHeight(Height) {
        return element.style.height = Height;
      },
      /**
       * performs a query inside the element
       * @param {string} CSS selector
       * @returns {Node|Null}
       */
      query: function query(selector) {
        return _query(selector, element);
      },
      /**
       * performs a queryAll inside the element
       * @param {string} CSS selector
       * @returns {NodeList|Null}
       */
      queryAll: function queryAll(selctor) {
        return _queryAll(selector, element);
      }
    };else if (is.NodeList(element)) return {
      /**
       * Listen for Events on all the elements in the NodeList
       * @param {string} string indicating the type of event to listen for
       * @param {function} func - handler function for the event
       * @returns handler (Off,Once,On)
       */
      On: function On(eventType, func) {
        return _On(eventType, element, func);
      },
      /**
       * Checks wether a Node is in the NodeList with either a refference to the Node or a CSS selector
       * @param {Node|string} Node or CSS selector
       */
      includes: function includes(SelectorNode) {
        if (!is.Node(SelectorNode)) SelectorNode = _query(SelectorNode);
        for (var index = 0; index < element.length; index++) {
          if (element[index] === SelectorNode) return true;
        }return false;
      },
      css: function css(styles) {
        return is.Def(styles) ? forEach(element, function (el) {
          return forEach(styles, function (prop, key) {
            return el.style[key] = prop;
          });
        }) : console.error('styles unefined');
      }
    };
    return {
      /**
       * creates a div element with the options provided
       * @param {string} sets innerHTML of the div
       * @param {string|Object=} sets div attributes with URL variable style string ("id=123&class=big-header") or Object with properties {id : 123 , class : 'big-header'}
       * @param {Boolean=} should the div be a plain String or a Node defaults to string
       */
      div: function div(inner, attr, node) {
        return make_element('div', inner, attr, node);
      },
      /**
       * creates a span element with the options provided
       * @param {string} sets innerHTML of the span
       * @param {string|Object=} sets span attributes with URL variable style string ("id=123&class=big-header") or Object with properties {id : 123 , class : 'big-header'}
       * @param {Boolean=} should the span be a plain String or a Node defaults to string
       */
      span: function span(inner, attr, node) {
        return make_element('span', inner, attr, node);
      },
      /**
       * creates a label element with the options provided
       * @param {string} sets innerHTML of the label
       * @param {string|Object=} sets label attributes with URL variable style string ("id=123&class=big-header") or Object with properties {id : 123 , class : 'big-header'}
       * @param {Boolean=} should the label be a plain String or a Node defaults to string
       */
      label: function label(inner, attr, node) {
        return make_element('label', inner, attr, node);
      },
      /**
       * creates a p (paragraph) element with the options provided
       * @param {string} sets innerHTML of the p
       * @param {string|Object=} sets p attributes with URL variable style string ("id=123&class=big-header") or Object with properties {id : 123 , class : 'big-header'}
       * @param {Boolean=} should the p be a plain String or a Node defaults to string
       */
      p: function p(inner, attr, node) {
        return make_element('p', inner, attr, node);
      },
      /**
       * creates an img element with the options provided
       * @param {string} sets src of the img
       * @param {string} sets alt of the img
       * @param {string|Object=} sets p attributes with URL variable style string ("id=123&class=big-header") or Object with properties {id : 123 , class : 'big-header'}
       * @param {Boolean=} should the p be a plain String or a Node defaults to string
       */
      img: function img(src, alt, attr, node) {
        return make_element('img', '', attr, node, {
          src: src,
          alt: alt
        });
      },
      ul: function ul(items, attr, node) {
        var list = '';
        if (is.Arr(items)) items.forEach(function (item) {
          if (is.String(item)) list += make_element('li', item);else if (is.Object(items)) list += make_element('li', item.inner, item.attr);
        });
        return make_element('ul', list, attr, node);
      },
      ol: function ol(items, attr, node) {
        var list = '';
        if (is.Arr(items)) items.forEach(function (item) {
          if (is.String(item)) list += make_element('li', item);else if (is.Object(items)) list += make_element('li', item.inner, item.attr);
        });
        return make_element('ol', list, attr, node);
      },
      h: function h(level, inner, attr, node) {
        return make_element('h' + level, inner, attr, node);
      },
      a: function a(link, inner, attr, node) {
        return make_element('a', inner, attr, node, {
          href: link
        });
      },
      script: function script(code, attr, node) {
        return make_element('script', code, attr, node, {
          type: 'text/javascript'
        });
      },
      table: function table(rows, attr, node) {
        if (!is.Arr(rows)) return is.String(rows) ? make_element('table', rows, attr, node) : make_element('table', '', attr, node);
        if (!rows.every(function (o) {
          return is.Object(o);
        })) throw new TypeError('dom.table -> rows : all entries need to be objects');
        var tableInner = '';
        forEach(rows, function (row) {
          return forEach(row, function (val, key) {
            var row = '<tr>';
            if (key === 'cell' || key === 'td' || key === 'data') {
              if (is.String(val)) row += '<td>' + val + '</td>';else if (is.Object(val)) row += make_element('tr', val.inner, val.attr);
            } else if (key === 'head' || key === 'th') {
              if (is.String(val)) row += '<th>' + val + '</th>';else if (is.Object(val)) row += make_element('th', val.inner, val.attr);
            }
            row += '</tr>';
            tableInner += row;
          });
        });
        return make_element('table', tableInner, attr, node);
      }
    };
  };

  /**
   * Craft is Crafter.js's Core containing most functionality.
   * @namespace
   */
  var Craft = {

    /** Converts an Array to an Object
     * @param {Array} arr - array to be converted
     */
    ArraytoObject: function ArraytoObject(arr) {
      var i = undefined,
          NewObject = {};
      for (i in arr) if (is.Def(arr[i])) NewObject[i] = arr[i];
      return NewObject;
    },
    filterArr: function filterArr(arr, func) {
      var i = -1,
          x = -1,
          result = [];
      while (++i < arr.length) if (func(arr[i], i, arr)) result[++x] = arr[i];
      return result;
    },
    removeFromArr: function removeFromArr(Arr, val) {
      var index = Arr.IndexOf(val),
          temp = [],
          string = false,
          i = 0;
      if (is.String(Arr)) {
        Arr = Array.from(Arr);
        string = true;
      }
      for (; i < Arr.length; i++) if (i !== index) temp.push(Arr[i]);
      return string ? temp : temp;
    },
    sameArray: function sameArray(arr1, arr2) {
      var i = arr1.length;
      if (i !== arr2.length) return false;
      while (i--) if (arr1[i] !== arr2[i]) return false;
      return true;
    },
    concatObjects: function concatObjects(hostobj) {
      for (var _len19 = arguments.length, Objs = Array(_len19 > 1 ? _len19 - 1 : 0), _key19 = 1; _key19 < _len19; _key19++) {
        Objs[_key19 - 1] = arguments[_key19];
      }

      forEach(hostobj, function () {
        Objs.forEach(function (obj) {
          forEach(obj, function (prop, key) {
            if (key in hostobj) {
              if (is.Arr(hostobj[key])) {
                if (!hostobj[key].includes(prop)) hostobj[key].push(prop);
              } else if (prop !== hostobj[key]) hostobj[key] = [prop, hostobj[key]];
            } else hostobj[key] = prop;
          });
        });
      });
      return hostobj;
    },
    mergeObjects: function mergeObjects(hostobj) {
      for (var _len20 = arguments.length, Objs = Array(_len20 > 1 ? _len20 - 1 : 0), _key20 = 1; _key20 < _len20; _key20++) {
        Objs[_key20 - 1] = arguments[_key20];
      }

      return Object.assign(hostobj, Objs);
    },
    omit: function omit(obj, val) {
      if (is.Object(obj) && obj !== val) {
        forEach(obj, function (prop, key) {
          if (val === key || val === prop) delete obj[key];
        });
        if (obj.hasOwnProperty(val)) console.error('couldn\'t omit ' + val + ' from Object');
      } else if (is.Arr(obj) || is.String(obj)) {
        obj.forEach(function (i) {
          if (val === i) obj = Craft.removeArrItem(obj, i);
        });
        if (val.IndexOf(i) !== -1) console.error('couldn\'t omit ' + val + ' from Array or String');
      }
      return obj;
    },
    CurrentBrowser: {
      is: function is(browser) {
        return _br.join(' ').toLowerCase().includes(browser.toLowerCase()) ? true : false;
      },
      browser: _br.join(' ')
    },
    loader: {
      pre: 'craft:',
      CraftImport: function CraftImport(obj) {
        var now = +new Date(),
            key = obj.key || obj.url,
            src = Craft.loader.get(key);
        if (src || src.expire - now > 0) return new Promise(function (resolve) {
          return resolve(src);
        });
        return new Promise(function (success, failed) {
          return fetch(obj.url).then(function (res) {
            return res.text().then(function (data) {
              obj.data = data;
              obj.stamp = now;
              obj.expire = now + (obj.expire || 4000) * 60 * 60 * 1000;
              if (obj.cache) localStorage.setItem(Craft.loader.pre + key, JSON.stringify(obj));
              success(obj);
            });
          }).catch(function (err) {
            return failed('Craft.loader: problem fetching import -> ' + err);
          });
        });
      },
      Import: function Import() {
        for (var _len21 = arguments.length, args = Array(_len21), _key21 = 0; _key21 < _len21; _key21++) {
          args[_key21] = arguments[_key21];
        }

        var obj = undefined,
            promises = [];
        args.forEach(function (arg) {
          obj = {
            url: arg.css || arg.script,
            type: arg.css ? 'css' : 'script',
            exec: arg.execute !== false,
            cache: arg.cache !== false
          };
          if (is.Def(arg.key)) obj.key = arg.key;
          if (is.Def(arg.defer)) obj.defer = arg.defer;
          if (is.Def(arg.expire)) obj.expire = arg.expire;
          arg.test === false ? Craft.loader.remove(obj.url) : promises.push(Craft.loader.CraftImport(obj));
        });
        return Promise.all(promises).then(function (src) {
          return src.map(function (obj) {
            return obj.exec ? obj.type === 'css' ? CrafterStyles.innerHTML += '\n' + obj.data : head.appendChild(dom().script(obj.data, {
              defer: obj.defer || undefined
            }, true)) : undefined;
          });
        });
      },
      setPrekey: function setPrekey(str) {
        return Craft.loader.pre = str + ':';
      },
      get: function get(key) {
        return JSON.parse(localStorage.getItem(key.includes(Craft.loader.pre) ? key : Craft.loader.pre + key) || false);
      },
      remove: function remove(key) {
        return localStorage.removeItem(key.includes(Craft.loader.pre) ? key : Craft.loader.pre + key);
      },
      removeAll: function removeAll(expired) {
        for (var _i3 in localStorage) {
          if (!expired || Craft.loader.get(_i3).expire <= +new Date()) Craft.loader.remove(_i3);
        }
      }
    },
    router: {
      handle: function handle(RouteLink, func) {
        if (location.hash === RouteLink || location === RouteLink) func();
        Craft.router.handlers.push({
          link: RouteLink,
          func: func
        });
      },
      handlers: [],
      links: [],
      link: function link(Selector, _link, newtab, eventType) {
        return Craft.router.links.push(function () {
          return _On(is.Def(eventType) ? eventType : 'click', _query(Selector), function (e) {
            return newtab ? open(_link) : location = _link;
          });
        });
      },
      open: (function (_open) {
        function open(_x, _x2) {
          return _open.apply(this, arguments);
        }

        open.toString = function () {
          return _open.toString();
        };

        return open;
      })(function (link, newtab) {
        return newtab ? open(link) : location = link;
      }),
      setTitle: function setTitle(title) {
        return doc.title = title;
      },
      setView: function setView(viewHostSelector, view) {
        return _query(viewHostSelector).innerHTML = view;
      },
      fetchView: function fetchView(viewHostSelector, viewURL, cache, id) {
        if (is.Null(localStorage.getItem("RT_" + id))) fetch(viewURL).then(function (res) {
          res.text().then(function (txt) {
            if (cache && is.Def(id) && is.String(id) && is.Null(localStorage.getItem("RT_" + id))) localStorage.setItem("RT_" + id, txt);
            _query(viewHostSelector).innerHTML = txt;
          });
        }).catch(function (msg) {
          return console.warn('Could not fetch view -> ' + msg);
        });else if (cache) _query(viewHostSelector).innerHTML = localStorage.getItem("RT_" + id);
      },
      clearCache: function clearCache() {
        for (var _i4 in localStorage) {
          if (localStorage.key(_i4).includes("RT_")) localStorage.removeItem(localStorage.key(_i4));
        }
      }
    },
    Cookies: {
      get: function get(key) {
        return key ? decodeURIComponent(doc.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null : null;
      },
      set: function set(key, val, expires, path, domain, secure) {
        if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) return false;
        var expiry = "";
        if (expires) {
          if (is.Num(expires)) expiry = expires === Infinity ? "; expires=Fri, 11 April 9997 23:59:59 UTC" : "; max-age=" + expires;
          if (is.String(expires)) expiry = "; expires=" + expires;
          if (is.Date(expires)) expiry = "; expires=" + expires.toUTCString();
        }
        doc.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(val) + expiry + (domain ? "; domain=" + domain : "") + (path ? "; path=" + path : "") + (secure ? "; secure" : "");
        return true;
      },
      remove: function remove(key, path, domain) {
        if (!Craft.Cookies.has(key)) return false;
        doc.cookie = encodeURIComponent(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (domain ? "; domain=" + domain : "") + (path ? "; path=" + path : "");
        return true;
      },
      has: function has(key) {
        return key ? new RegExp("(?:^|;\\s*)" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(doc.cookie) : false;
      },
      keys: function keys() {
        var all = doc.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        all.forEach(function (c) {
          return decodeURIComponent(c);
        });
        return all;
      }
    },
    after: function after(n, func) {
      var _this5 = this;

      if (!is.Func(func)) is.Func(n) ? func = n : console.error("after : func is not a function");
      n = Number.isFinite(n = +n) ? n : 0;
      return function () {
        for (var _len22 = arguments.length, args = Array(_len22), _key22 = 0; _key22 < _len22; _key22++) {
          args[_key22] = arguments[_key22];
        }

        return --n < 1 ? func.apply(_this5, args) : function () {
          return null;
        };
      };
    },
    debounce: function debounce(wait, func, immediate) {
      var timeout = undefined;
      return function () {
        var _this6 = this;

        var args = arguments,
            later = function later() {
          timeout = null;
          if (!immediate) func.apply(_this6, args);
        },
            callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(this, args);
      };
    },
    throttle: function throttle(wait, func, options) {
      var context = undefined,
          args = undefined,
          result = undefined,
          timeout = null,
          previous = 0;
      if (!options) options = {};
      var later = function later() {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      };
      return function () {
        var now = Date.now();
        if (!previous && options.leading === false) previous = now;
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
        } else if (!timeout && options.trailing !== false) timeout = setTimeout(later, remaining);
        return result;
      };
    },
    once: function once(func, context) {
      var res = undefined;
      return function () {
        if (is.Func(func)) {
          res = func.apply(context || this, arguments);
          func = null;
        }
        return res;
      };
    },
    css: function css(el, styles) {
      return is.Def(styles, el) && is.Node(el) ? forEach(styles, function (prop, key) {
        return el.style[key] = prop;
      }) : console.error('invalid args');
    },
    hasCapitals: function hasCapitals(string) {
      for (var _i5 = 0; _i5 < string.length; _i5++) {
        if (is.Uppercase(string[_i5])) return true;
      }return false;
    },
    OverrideFunction: function OverrideFunction(funcName, Func, ContextObject) {
      var namespaces = funcName.split("."),
          func = namespaces.pop();
      for (var _i6 = 0; _i6 < namespaces.length; _i6++) {
        ContextObject = ContextObject[namespaces[_i6]];
      }ContextObject[func] = Func;
    },
    len: function len(val) {
      if (is.Object(val)) return Object.keys(val).length;
      if (is.Map(val) || is.Set(val)) return val.size;
      try {
        return val.length;
      } catch (e) {
        console.error('could not find length of value');
      }
    },
    indexOfDate: function indexOfDate(Collection, date) {
      for (var _i7 = 0; _i7 < Collection.length; _i7++) {
        if (+Collection[_i7] === +date) return _i7;
      }return -1;
    },
    type: function type() {
      for (var _len23 = arguments.length, args = Array(_len23), _key23 = 0; _key23 < _len23; _key23++) {
        args[_key23] = arguments[_key23];
      }

      var types = [];
      args.forEach(function (arg) {
        return types.push(typeof arg === 'undefined' ? 'undefined' : _typeof(arg));
      });
      if (types.length < 2) return types[0];
      return types;
    },
    memoize: function memoize(func, resolver) {
      if (!is.Func(func) || resolver && !is.Func(resolver)) throw new TypeError("arg provided is not a function");
      var cache = new WeakMap();
      var memoized = function memoized() {
        for (var _len24 = arguments.length, args = Array(_len24), _key24 = 0; _key24 < _len24; _key24++) {
          args[_key24] = arguments[_key24];
        }

        var key = resolver ? resolver.apply(this, args) : args[0];
        if (cache.has(key)) return cache.get(key);
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result);
        return result;
      };
      return memoized;
    },
    Scope: {},
    WebComponents: [],
    ResizeHandlers: new FunctionIterator(),
    Binds: new Map(),
    mouse: {
      x: 0,
      y: 0,
      over: null
    },
    nodeExists: function nodeExists(selector, within) {
      return _queryAll(selector, is.Node(within) ? within = within : within = _query(within)) !== null;
    },
    ObjToFormData: function ObjToFormData(obj) {
      var key = undefined,
          formData = new FormData();
      for (key in obj) formData.append(key, obj[key]);
      return formData;
    },
    URLfrom: function URLfrom(text) {
      return URL.createObjectURL(new Blob([text]));
    },
    OnScroll: function OnScroll(element, func) {
      return is.Func(func) ? _On('scroll', element, function (e) {
        return func(e.deltaY < 1 ? false : true, e);
      }) : console.error('second param needs to be a function');
    },
    OnResize: function OnResize(func) {
      return is.Func(func) ? Craft.ResizeHandlers.add(func) : console.error("Craft.OnResize -> func is not a function");
    },
    OnScrolledTo: function OnScrolledTo(Scroll, ifFunc, elseFunc) {
      return _On('scroll', function (e) {
        if (pageYOffset >= Scroll) ifFunc(e);else if (is.Def(elseFunc)) elseFunc(e);
      });
    },
    WhenScrolledTo: function WhenScrolledTo(Scroll) {
      return new Promise(function (resolve, reject) {
        var scrollEvent = _On('scroll', function (e) {
          if (pageYOffset >= Scroll || pageYOffset <= Scroll) {
            scrollEvent.Off();
            resolve(e);
          }
        });
      });
    },
    /**
     * function that returns a promise when the DOM and WebComponents are finished loading
     * @param {Object=} Scope - Optional overide to the default Craft.Scope passed to the promise
     */
    WhenReady: function WhenReady(Scope) {
      return new Promise(function (resolve, reject) {
        var waitIncase = Craft.CurrentBrowser.is("Firefox") || Craft.CurrentBrowser.is("msie");
        Scope = Scope || Craft.Scope;
        if (Ready) waitIncase ? setTimeout(function () {
          return resolve(Scope);
        }, 500) : resolve(Scope);else {
          (function () {
            var ReadyYet = setInterval(function () {
              if (Ready) {
                waitIncase ? setTimeout(function () {
                  return resolve(Scope);
                }, 500) : resolve(Scope);
                clearInterval(ReadyYet);
              }
            }, 20);
            setTimeout(function () {
              clearInterval(ReadyYet);
              if (!Ready) reject("Things didn't load correctly/intime -> load failed");
            }, 4500);
          })();
        }
      });
    },
    poll: function poll(test, interval, timeout, success, fail) {
      return (function () {
        if (is.Func(timeout)) {
          if (is.Func(success)) fail = success;
          success = timeout;
          timeout = undefined;
        }
        var Interval = setInterval(function () {
          if (is.Bool(test) && test === true || is.Func(test) && test() === true) {
            success();
            clearInterval(Interval);
          }
        }, interval || 20);
        if (is.Num(timeout)) setTimeout(function () {
          clearInterval(Interval);
          if (is.Bool(test) && test === false || is.Func(test) && test() === false) fail();
        }, timeout);
      })();
    },
    /**
     * Usefull method for validating passwords , example Craft.strongPassword('#MyFancyPassword18',8,true,true,"#") -> true requirements met
     * @param {string} pass - string containing the password
     * @param {Number} length - Character length in numbers (Minimum password length)
     * @param {Boolean} caps - Should the password contains Capital Letters
     * @param {Boolean} number - should the password contain Numbers
     * @param {...string} includeChars - every extra argument should be a string containing a character you want the password to include
     */
    strongPassword: function strongPassword(pass, length, caps, number) {
      for (var _len25 = arguments.length, includeChars = Array(_len25 > 4 ? _len25 - 4 : 0), _key25 = 4; _key25 < _len25; _key25++) {
        includeChars[_key25 - 4] = arguments[_key25];
      }

      if (pass.length <= length) return false;
      if (caps === true && Craft.hasCapitals(pass) === false) return false;
      if (number === true && /\d/g.test(pass) === false) return false;
      if (includeChars.length !== 0) {
        var hasChars = true;
        includeChars.forEach(function (ch) {
          if (!pass.includes(ch)) hasChars = false;
        });
        if (!hasChars) return false;
      }
      return true;
    },
    /** method for generating random alphanumeric strings*/
    randomString: function randomString() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    },
    /**
     * similar to Craft.randomString in that it generates a unique string , in this case a Unique ID with random alphanumeric strings separated by hyphens
     * example 0ebf-c7d2-ef81-2667-08ef-4cde
     */
    GenUID: function GenUID() {
      return Craft.randomString() + '-' + Craft.randomString() + '-' + Craft.randomString() + '-' + Craft.randomString() + '-' + Craft.randomString() + '-' + Craft.randomString();
    },
    /**
     * Part of Crafter.js's own WebComponent format (.wc) it takes a json object that contains .css and .js values then imports and executes them
     * @param {string} webcomponent - JSON string from Crafter.js's (.wc) WebComponent format
     */
    createWebComponent: function createWebComponent(webcomponent) {
      if (is.String) webcomponent = JSON.parse(webcomponent);
      CrafterStyles.innerHTML += webcomponent.css;
      var wcJS = dom().script('', {
        src: Craft.URLfrom(webcomponent.js),
        webcomponent: webcomponent.name
      }, true);
      wcJS.onload = function (e) {
        return Craft.WebComponents.push(webcomponent.name);
      };
      head.appendChild(wcJS);
    },
    /**
     * method for creating custom elements configuring their lifecycle's and inheritance
     * the config Object has 5 distinct options ( created , inserted , destroyed , attr and extends )
     * Craft.newComponent('custom-element',{
     * // note : inside each lifecycle method the "this" is a reference to the element being created -> this === element
     *    created : function () { ... }, // this method gets called when the custom-element is first instanciated
     *    inserted : function () { ... }, // this method gets called when the custom-element is first inserted into the DOM
     *    destroyed : function () { ... }, // this method gets called when the custom-element removed from the DOM (AKA. destroyed)
     *    attr : function (attributeChangedName , oldValue , newValue) { ... }, // attr method gets called when attributes are changed on the element
     *    extends : 'button' //tagName of element being inherited from should you want to
     * });
     * @param {string} tag - a hyphenated custom HTML tagname for the new element -> "custom-element"
     * @param {object} config - Object containing all the element's lifecycle methods / extends and attached methods or properties
     */
    newComponent: function newComponent(tag, config) {
      if (is.Undef(config)) console.error("Invalid Component Configuration");else {
        (function () {
          var element = Object.create(HTMLElement.prototype),
              settings = {};
          forEach(config, function (prop, key) {
            if (key === 'created') element.createdCallback = prop;else if (key === 'inserted') element.attachedCallback = prop;else if (key === 'destroyed') element.detachedCallback = prop;else if (key === 'attr') element.attributeChangedCallback = prop;else if (key === 'extends') settings.extends = prop;else if (is.Func(prop)) element[key] = prop;else if (key !== 'extends' && !is.Func(prop)) element[key] = prop;
          });
          settings['prototype'] = element;
          doc.registerElement(tag, settings);
        })();
      }
    },
    /** creates a new bound variable , part of Crafter.js's Data Binding System */
    newBind: function newBind(key, val, handle) {
      is.Func(handle) ? Craft.Binds.set(key, new _ReactiveVariable(val, handle)) : Craft.Binds.set(key, val);
      queryEach('[view-bind]', function (el) {
        if (Craft.Binds.has(el.getAttribute('view-bind'))) el.innerHTML = is.Func(handle) ? Craft.Binds.get(el.getAttribute('view-bind')).val : Craft.Binds.get(el.getAttribute('view-bind'));
      });
    },
    /** sets the value of a bound variable */
    setBind: function setBind(key, val) {
      is.ReactiveVariable(Craft.Binds.get(key)) ? Craft.Binds.get(key).set(val) : Craft.Binds.set(key, val);
      queryEach('[view-bind]', function (el) {
        if (Craft.Binds.has(el.getAttribute('view-bind'))) el.innerHTML = is.ReactiveVariable(Craft.Binds.get(key)) ? Craft.Binds.get(el.getAttribute('view-bind')).val : Craft.Binds.get(el.getAttribute('view-bind'));
      });
    }
  };

  Craft.loader.removeAll(true);

  _On('animationstart', doc, function (e) {
    if (e.animationName === 'NodeInserted' && is.Node(e.target)) {
      if (e.target.hasAttribute('[view-bind]') && Craft.Binds.has(e.target.getAttribute('view-bind'))) e.target.innerHTML = is.ReactiveVariable(Craft.Binds.get(key)) ? Craft.Binds.get(e.target.getAttribute('view-bind')).val : Craft.Binds.get(e.target.getAttribute('view-bind'));
    }
  });

  root.onresize = Craft.throttle(450, function (e) {
    return Craft.ResizeHandlers.runEach(e);
  });
  root.onmousemove = function (e) {
    Craft.mouse.x = e.clientX;
    Craft.mouse.y = e.clientY;
    Craft.mouse.over = e.target;
  };
  root.onblur = function (e) {
    return Craft.tabActive = false;
  };
  root.onfocus = function (e) {
    return Craft.tabActive = true;
  };

  Craft.newComponent('fetch-webcomponent', {
    created: function created() {
      var _this7 = this;

      if (this.hasAttribute('src')) {
        var wc = null;
        if (this.hasAttribute('cache-component')) {
          wc = localStorage.getItem(this.getAttribute('src'));
          if (wc !== null) Craft.createWebComponent(wc);
        }
        if (wc === null) fetch(this.getAttribute('src')).then(function (res) {
          return res.json().then(function (webcomponent) {
            CrafterStyles.innerHTML += webcomponent.css;
            var wcJS = dom().script('', {
              src: Craft.URLfrom(webcomponent.js),
              webcomponent: webcomponent.name
            }, true);
            wcJS.onload = function (e) {
              Craft.WebComponents.push(webcomponent.name);
              wcJS = null;
              webcomponent = null;
            };
            head.appendChild(wcJS);
            if (_this7.getAttribute('cache-component') === 'true') localStorage.setItem(_this7.getAttribute('src'), JSON.stringify(webcomponent));
          });
        }).catch(function (err) {
          return console.error(err + ': could not load webcomponent');
        });
      }
    }
  });

  Once('DOMContentLoaded', function (e) {
    queryEach('[link]', function (el) {
      return _On('click', el, function (e) {
        return el.hasAttribute('newtab') ? open(el.getAttribute('link')) : Craft.router.open(el.getAttribute('link'));
      });
    });
    Craft.router.links.forEach(function (link) {
      return link();
    });
    if (Craft.WebComponents.length === _queryAll('fetch-webcomponent').length) Ready = true;else Craft.poll(function () {
      return Craft.WebComponents.length === _queryAll('fetch-webcomponent').length;
    }, 35, 2000, function () {
      return Ready = true;
    }, function () {
      console.log('loading is taking longer than usual :(');
      Ready = true;
    });
  });

  _On('hashchange', function (e) {
    return Craft.router.handlers.forEach(function (handler) {
      return location.hash === handler.link || location === handler.link ? handler.func() : null;
    });
  });

  root.is = is;
  root.dom = dom;
  root.Craft = Craft;
  root.On = _On;
  root.Once = Once;
  root.forEach = forEach;
  root.QueryOrNodetoNodeArray = QueryOrNodetoNodeArray;
  root.make_element = make_element;
  root.FunctionIterator = FunctionIterator;
  root.CraftSocket = CraftSocket;
  root.EventHandler = EventHandler;
  root.ReactiveVariable = _ReactiveVariable;
  root.query = _query;
  root.queryAll = _queryAll;
  root.queryEach = queryEach;
})(document, self);