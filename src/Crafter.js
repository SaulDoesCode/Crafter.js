/**
 *  @overview Crafter.js , minimalist front-end library
 *  @author Saul van der Walt - https://github.com/SaulDoesCode/
 *  @license MIT
 */
"use strict";
((doc, root) => {

  let regexps = {
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
    i = 'input',
    b = '-bind',
    ib = i + b,
    vb = 'view' + b,
    head = doc.getElementsByTagName('head')[0],
    CrafterStyles = doc.createElement('style'),
    ua = navigator.userAgent,
    tem, _br = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
  if (_br && (tem = ua.match(/version\/([\.\d]+)/i)) !== null) _br[2] = tem[1];
  _br ? [_br[1], _br[2]] : [navigator.appName, navigator.appVersion, '-?'];

  CrafterStyles.setAttribute('crafterstyles', '');
  CrafterStyles.innerHTML = `\n@keyframes NodeInserted {from {opacity:.99;}to {opacity: 1;}} [view-bind],[input-bind] {animation-duration: 0.001s;animation-name: NodeInserted;}`;
  head.appendChild(CrafterStyles);

  function toArr(val) {
    return Array.from(val);
  }
  // ta = TestArgs : convert arguments to array then tests it
  function ta(args, test) {
    return args.length === 0 ? false : Array.from(args).every(test);
  }

  function type(obj, str) {
    return toString.call(obj) === str;
  }

  function isT(val, str) {
    return typeof val === str;
  }

  function manageInvoke(fn, argsArr, totalArity) {
    argsArr = argsArr.length > totalArity ? argsArr.slice(0, totalArity) : argsArr;
    return argsArr.length === totalArity ? fn.apply(null, argsArr) : createFn(fn, argsArr, totalArity);
  }


  function createFn(fn, Args, totalArity) {
    let remainingArity = totalArity - Args.length;
    return is.Between(remainingArity, 10, 0) ? function () {
      let args = toArr(arguments);
      return manageInvoke(fn, Args.concat(args), totalArity);
    } : (function (fn, args, arity) {
      let a = [];
      forEach(arity, (v, i) => a.push('a' + i.toString()));
      return eval(`false||function(${a.join(',')}){ return manageInvoke(fn, args.concat(toArr(arguments)));}`);
    })(fn, args, remainingArity);
  }

  function def() {
    return ta(arguments, o => !isT(o, 'undefined'));
  }

  function nil() {
    return ta(arguments, o => o === null);
  }

  /** is - Type Testing / Assertion */
  root.is = {
    /**
     * Test if something is a boolean type
     * @param val - value to test
     */
    Bool() {
        return ta(arguments, o => typeof val === 'boolean');
      },
      /**
       * Test if something is a String
       * @param args - value/values to test
       */
      String() {
        return ta(arguments, o => isT(o, 'string'));
      },
      /**
       * Test if something is an Array
       * @param args - value/values to test
       */
      Arr() {
        return ta(arguments, o => Array.isArray(o))
      },
      /**
       * Test if something is an Array-Like
       * @param args - value/values to test
       */
      Arraylike() {
        try {
          return ta(arguments, o => def(o.length));
        } catch (e) {}
        return false;
      },
      /**
       * Determine whether a variable is undefined
       * @param args - value/values to test
       */
      Undef() {
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
      Null() {
        return ta(arguments, o => o === null);
      },
      /**
       * Determine whether a variable is a DOM Node
       * @param args - value/values to test
       */
      Node() {
        return ta(arguments, o => o instanceof Node);
      },
      /**
       * Determine whether a variable is a DOM NodeList or Collection of Nodes
       * @param args - value/values to test
       */
      NodeList() {
        return ta(arguments, nl => is.Arraylike(nl) ? ta(nl, n => n instanceof Node) : false);
      },
      /**
       * Determine if a variable is a Number
       * @param {...*} args - value/values to test
       */
      Num() {
        return ta(arguments, o => !isNaN(Number(o)));
      },
      /**
       * Determine if a variable is an Object
       * @param args - value/values to test
       */
      Object() {
        return ta(arguments, o => type(o, '[object Object]'));
      },
      /**
       * Determine if a variable is a HTMLElement
       * @param args - value/values to test
       */
      Element() {
        return ta(arguments, o => type(o, '[object HTMLElement]'));
      },
      /**
       * Determine if a variable is a File Object
       * @param args - value/values to test
       */
      File() {
        return ta(arguments, o => type(o, '[object File]'));
      },
      /**
       * Determine if a variable is of a FormData type
       * @param args - value/values to test
       */
      FormData() {
        return ta(arguments, o => type(o, '[object FormData]'));
      },
      /**
       * Determine if a variable is a Map
       * @param args - value/values to test
       */
      Map() {
        return ta(arguments, o => type(o, '[object Map]'));
      },
      /**
       * Determine if a variable is a function
       * @param args - value/values to test
       */
      Func() {
        return ta(arguments, o => typeof o === 'function');
      },
      /**
       * Determine if a variable/s are true
       * @param args - value/values to test
       */
      True() {
        return ta(arguments, o => o === true);
      },
      /**
       * Determine if a variable/s are false
       * @param args - value/values to test
       */
      False() {
        return ta(arguments, o => o !== true);
      },
      /**
       * Determine if a variable is of Blob type
       * @param obj - variable to test
       */
      Blob() {
        return ta(arguments, o => type(o, '[object Blob]'));
      },
      /**
       * Determine if a variable is a Regular Expression
       * @param obj - variable to test
       */
      RegExp() {
        return ta(arguments, o => type(o, '[object RegExp]'));
      },
      /**
       * Determine if a variable is a Date type
       * @param {...*} variable to test
       */
      Date() {
        return ta(arguments, o => type(o, '[object Date]'));
      },
      /**
       * Determine if a variable is a Set
       * @param obj - variable to test
       */
      Set() {
        return ta(arguments, o => type(o, '[object Set]'));
      },
      Args: val => !nill(val) && (type(val, '[object Arguments]') || (typeof val === 'object' && 'callee' in val)),
      /**
       * Determine if a variable is a Symbol
       * @param obj - variable to test
       */
      symbol: obj => type(obj, '[object Symbol]'),
      char: val => is.String(val) && val.length === 1,
      space: val => is.char(val) && (val.charCodeAt(0) > 8 && val.charCodeAt(0) < 14) || val.charCodeAt(0) === 32,
      /**
       * Determine if a String is UPPERCASE
       * @param {string} char - variable to test
       */
      Uppercase: str => is.String(str) && !is.Num(str) && str === str.toUpperCase(),
      /**
       * Determine if a String is LOWERCASE
       * @param {string} char - variable to test
       */
      Lowercase: str => is.String(str) && str === str.toLowerCase(),
      /**
       * Determine if a String contains only characters and numbers (alphanumeric)
       * @param {string} str - variable to test
       */
      Alphanumeric: str => /^[0-9a-zA-Z]+$/.test(str),
      /**
       * Determines whether a String is a valid Email
       * @param {string} email - variable to test
       */
      Email: email => regexps.email.test(email),
      /**
       * Determines whether a String is a URL
       * @param {string} url - variable to test
       */
      URL: url => regexps.url.test(url),
      /**
       * Determines whether a String is a HEX-COLOR (#fff123)
       * @param {string} HexColor - variable to test
       */
      HexColor: hexColor => regexps.hexColor.test(hexColor),
      /**
       * Determines whether a String is a ip
       * @param {string} ip - variable to test
       */
      ip: ip => regexps.ip.test(ip),
      /**
       * Determines whether a String is a ipv4
       * @param {string} ipv4 - variable to test
       */
      ipv4: ipv4 => regexps.ipv4.test(ipv4),
      /**
       * Determines whether a String is a ipv6
       * @param {string} ipv6 - variable to test
       */
      ipv6: ipv6 => regexps.ipv6.test(ipv6),
      /**
       * Determines whether a String is hexadecimal
       * @param {string} hexadecimal - variable to test
       */
      hexadecimal: hexadecimal => regexps.hexadecimal.test(hexadecimal),
      /**
       * checks wether a date is today
       * @param obj - Date to test
       */
      today: obj => is.Date(obj) && obj.toDateString() === new Date().toDateString(),
      /**
       * checks wether a date is yesterday
       * @param obj - Date to test
       */
      yesterday(obj) {
        let now = new Date();
        return is.Date(obj) && obj.toDateString() === new Date(now.setDate(now.getDate() - 1)).toDateString();
      },
      /**
       * checks wether a date is tommorow
       * @param obj - Date to test
       */
      tomorrow(obj) {
        let now = new Date();
        return is.Date(obj) && obj.toDateString() === new Date(now.setDate(now.getDate() + 1)).toDateString();
      },
      /**
       * Determines if a date is in the past
       * @param obj - Date to test
       */
      past: obj => is.Date(obj) && obj.getTime() < new Date().getTime(),
      /**
       * Determines if a date is in the future
       * @param obj - Date to test
       */
      future: obj => !is.past(obj),
      /**
       * Determines whether a String is a timeString
       * @param time - variable to test
       */
      time: time => regexps.timeString.test(time),
      /**
       * Determines whether a String is a dateString
       * @param {string} dateString - variable to test
       */
      dateString: dateString => regexps.dateString.test(dateString),
      /**
       * Determines whether a Number is between a maximum and a minimum
       * @param {Number} val - number value to test
       * @param {Number} max - maximum to compare the value with
       * @param {Number} min - minimum to compare the value with
       * @returns {Boolean} wether or not the value is between the max and min
       */
      Between: (val, max, min) => (val <= max && val >= min),
      /**
       * checks if a number is an integer
       * @param val - variable / value to test
       */
      int: val => is.Num(val) && val % 1 === 0,
      /**
       * checks if a number is an even number
       * @param val - variable / value to test
       */
      even: val => is.Num(val) && val % 2 === 0,
      /**
       * checks if a number is an odd number
       * @param val - variable / value to test
       */
      odd: val => is.Num(val) && val % 2 !== 0,
      /**
       * checks if a number is positive
       * @param val - variable / value to test
       */
      positive: val => is.Num(val) && val > 0,
      /**
       * checks if a number is positive
       * @param val - variable / value to test
       */
      negative: val => is.Num(val) && val < 0,
      /**
       * Determines if two variables are equal
       * @param a - first value to compare
       * @param b - second value to compare
       */
      eq: (a, b) => a === b,
      /**
       * Determines if a number is LOWER than another
       * @param {Number} val - value to test
       * @param {Number} other - num to test with value
       */
      lt: (val, other) => val < other,
      /**
       * Determines if a number is LOWER than or equal to another
       * @param {Number} val - value to test
       * @param {Number} other - num to test with value
       */
      lte: (val, other) => val <= other,
      /**
       * Determines if a number is BIGGER than another
       * @param {Number} val - value to test
       * @param {Number} other - num to test with value
       */
      bt: (val, other) => val > other,
      /**
       * Determines if a number is BIGGER than or equal to another
       * @param {Number} val - value to test
       * @param {Number} other - num to test with value
       */
      bte: (val, other) => val >= other,
      /**
       * Determine if a given collection or string is empty
       * @param {Object|Array|string} val - value to test if empty
       */
      empty(val) {
        if (is.Object(val)) {
          let num = Object.getOwnPropertyNames(val).length;
          return (num === 0 || (num === 1 && is.Arr(val)) || (num === 2 && is.Args(val))) ? true : false
        } else return is.Arr(val) ? val.length <= 0 : val === ''
      },
      /**
       * Determines if a value is an instance of the ReactiveVariable class
       * @param args - value/values to test
       */
      ReactiveVariable() {
        let args = toArr(arguments);
        return args.length && args.every(o => o instanceof ReactiveVariable);
      },
      /**
       * Test if something is a Native JavaScript feature
       * @param val - value to test
       */
      Native(val) {
        let type = typeof val;
        return type === 'function' ? RegExp('^' + String(Object.prototype.toString).replace(/[.*+?^${}()|[\]\/\\]/g, '\\$&').replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$').test(Function.prototype.toString.call(val)) : (val && type == 'object' && /^\[object .+?Constructor\]$/.test(val.toString)) || false;
      },
      Input: element => element.tagName === 'INPUT' || element.tagName === 'TEXTAREA',
  };

  let rv = is.ReactiveVariable;
  /**
   * Converts any Query/QueryAll to an Array of Nodes even if there is only one Node , this is error proof when no arguments are present it returns an empty array
   * @param {Node|NodeList|Array|String} val - pass either a CSS Selector string , Node/NodeList or Array of Nodes
   * @param {Node|NodeList|Array|String} within - pass either a CSS Selector string , Node/NodeList or Array of Nodes to search for val in
   */
  root.QueryOrNodetoNodeArray = (val, within) => {
    if (is.String(val) && (is.String(within) || is.Node(within))) val = queryAll(val, within);
    else if (is.String(val)) val = queryAll(val)
    return is.Node(val) ? [val] : is.NodeList(val) ? toArr(val) : [];
  }

  /**
   * Handles WebSockets in a contained manner with send and recieve methods
   * @param {string} wsAddress - the WebSocket address example "ws://localhost:3000/"
   * @param {Array=} protocols - the protocols to pass to the WebSocket Connection
   */
  function CraftSocket(address, protocols) {
    try {
      is.Arr(protocols) ? this.Socket = new WebSocket(address, protocols) : this.Socket = new WebSocket(address);
      let Self = this;
      this.open = true;
      this.address = address;
      if (def(protocols)) this.protocols = protocols;
      this.messageCalls = [];
      this.RecieveCalls = [];
      this.Socket.onmessage = e => Self.RecieveCalls.forEach(call => call(e));
      this.Socket.onclose = e => this.open = false;
    } catch (e) {
      throw new Error(err);
    }
  }
  /**
   * Sends a message along the WebSocket Connection
   * @param {string} message - the WebSocket address example "ws://localhost:3000/"
   * @param {function=} func - optional function to recieve the response with -> "function ( response , event ) { ... } or response => ..."
   */
  CraftSocket.prototype.send = function (message, func) {
      let Self = this;
      Self.messageCalls.push(() => {
        Self.Socket.send(message);
        if (is.Func(func) && Self.open) Self.recieve((data, e) => func(data, e));
      });
      Self.Socket.onopen = e => Self.messageCalls[Self.messageCalls.length - 1]();
      return this;
    }
    /**
     * Recieves messages from the WebSocket Server
     * @param {function} func - function to recieve the response and event with -> "function ( response , event ) { ... } or response => ..."
     */
  CraftSocket.prototype.recieve = function (func) {
      is.Func(func) && this.open ? this.RecieveCalls.push(e => func(e.data, e)) : console.error("no function or connection closed");
      return this;
    }
    /** Closes the WebSocket Connection */
  CraftSocket.prototype.close = function () {
    this.Socket.close()
  }

  /**
   * Variable that is used for Data Binding and other reactive processes
   * @param {*} val - value you'd liek the ReactiveVariable to Store
   * @param {function} handle - function that gets called whenever the ReactiveVariable changes -> "function( OldValue , newValue ) {...}"
   * @returns {*} Returns the value assigned to the ReactiveVariable
   */
  function ReactiveVariable(val, handle) {
    if (is.Func(handle)) {
      this.val = val;
      this.Handle = handle;
    } else console.error('ReactiveVariable needs function');
  }
  /**
   * Sets the new value of the ReactiveVariable , this will also call the handle function
   * @param {*} val - new value to assign the ReactiveVariable
   */
  ReactiveVariable.prototype.set = function (val) {
      if (this.val !== val) {
        this.Oldval = this.val;
        this.val = val;
        this.Handle(this.Oldval, val);
        return this.val;
      }
    }
    /**
     * Gets the value of the ReactiveVariable , ReactiveVariable.val also does this
     */
  ReactiveVariable.prototype.get = function () {
      return this.val
    }
    /**
     * Redefine the handle function of the ReactiveVariable
     * @param {function} handle - function that gets called whenever the ReactiveVariable changes -> "function( OldValue , newValue ) {...}"
     */
  ReactiveVariable.prototype.reset = function (handle) {
    is.Func(handle) ? this.Handle = handle : console.error('ReactiveVariable.Reset only takes a function');
    return this;
  }

  /**
   * Event Handling Class
   * @param {string} EventType - set the type of event to listen for example "click" or "scroll"
   * @param {Node|NodeList|window|document} Target - the Event Listener's target , can also be a NodeList to listen on multiple Nodes
   * @param {function} Func - Handler function that will be called when the event is triggered -> "function( event , event.srcElement ) {...}"
   * @param {...*} args - extra optional arguments/parameters to pass to the handler function
   * @returns Interface On,Off,Once
   */
  function EventHandler(EventType, Target, Func, Within, ...args) {
    this.EventType = EventType || 'click';
    this.Target = (Target !== root && Target !== doc) ? QueryOrNodetoNodeArray(Target, Within) : Target;
    this.FuncWrapper = e => Func(e, e.srcElement, args);
  }
  /**
   * Activates the EventHandler to start listening for the EventType on the Target/Targets
   */
  EventHandler.prototype.On = function () {
    is.Arr(this.Target) ? this.Target.forEach(target => target.addEventListener(this.EventType, this.FuncWrapper)) : this.Target.addEventListener(this.EventType, this.FuncWrapper);
    return this;
  }

  EventHandler.prototype.ChangeType = function (type) {
      this.Off();
      this.EventType = type;
      this.On();
      return this;
    }
    /**
     * De-activates / turns off the EventHandler to stop listening for the EventType on the Target/Targets
     * can still optionally be re-activated with On again
     */
  EventHandler.prototype.Off = function () {
      is.Arr(this.Target) ? this.Target.forEach(target => target.removeEventListener(this.EventType, this.FuncWrapper)) : this.Target.removeEventListener(this.EventType, this.FuncWrapper);
      return this;
    }
    /**
     * Once the the Event has been triggered the EventHandler will stop listening for the EventType on the Target/Targets
     * the Handler function will be called only Once
     */
  EventHandler.prototype.Once = function () {
    let func = this.FuncWrapper,
      target = this.Target,
      etype = this.EventType,
      listenOnce = e => {
        func(e);
        is.Arr(target) ? target.forEach(t => t.removeEventListener(etype, listenOnce)) : target.removeEventListener(etype, listenOnce);
      }
    is.Arr(target) ? target.forEach(t => t.addEventListener(etype, listenOnce)) : target.addEventListener(etype, listenOnce);
    return this;
  }

  /**
   * Easy way to loop through Collections and Objects
   * @param {Array|Object|NodeList} iterable - any collection that is either an Object or has a .length value
   * @param {function} func - function called on each iteration -> "function( value , indexOrKey ) {...}"
   */
  root.forEach = (iterable, func) => {
    if (!def(iterable)) throw new Error("forEach -> iterable undefined");
    if (!is.Func(func)) throw new Error("forEach -> function invalid or undefined");
    let i = 0;
    if (def(iterable.length))
      for (; i < iterable.length; i++) func(iterable[i], i);
    else
      for (i in iterable)
        if (iterable.hasOwnProperty(i)) func(iterable[i], i)
  }

  /**
   * Easy way to get a DOM Node or Node within another DOM Node using CSS selectors
   * @param {string} selector - CSS selector to query the DOM Node with
   * @param {Node|string=} element - Optional Node or CSS selector to search within insead of document
   */
  root.query = (selector, element) => def(element) ? is.String(element) ? doc.querySelector(element).querySelector(selector) : element.querySelector(selector) : doc.querySelector(selector);

  /**
   * Easy way to get a DOM NodeList or NodeList within another DOM Node using CSS selectors
   * @param {string} selector - CSS selector to query the DOM Nodes with
   * @param {Node|string=} element - Optional Node or CSS selector to search within insead of document
   */
  root.queryAll = (selector, element) => def(element) ? is.Node(element) || element === doc ? element.querySelectorAll(selector) : query(element).querySelectorAll(selector) : doc.querySelectorAll(selector);
  /**
   * Easy way to loop through Nodes in the DOM using a CSS Selector or a NodeList
   * @param {string|NodeList} selector - CSS selector to query the DOM Nodes with or NodeList to iterate through
   * @param {Node|string=} element - Optional Node or CSS selector to search within insead of document
   * @param {function} func - function called on each iteration -> "function( Element , index ) {...}"
   */
  root.queryEach = (selector, element, func) => {
    if (is.Func(element)) func = element;
    let elements, i = 0;
    is.Node(selector) ? elements = [selector] : elements = is.Func(element) ? queryAll(selector) : queryAll(selector, element);
    for (; i < elements.length; i++) func(elements[i], i);
  }

  function EventTypes(Target, within, listen) {
    let etype = (type, fn) => new EventHandler(type, Target, fn, within)[listen || 'On']();
    return {
      Click: fn => etype('click', fn),
      Input: fn => etype('input', fn),
      DoubleClick: fn => etype('dblclick', fn),
      Focus: fn => etype('focus', fn),
      Blur: fn => etype('blur', fn),
      Keydown: fn => etype('keydown', fn),
      Mousemove: fn => etype('mousemove', fn),
      Mousedown: fn => etype('mousedown', fn),
      Mouseup: fn => etype('mouseup', fn),
      Mouseover: fn => etype('mouseover', fn),
      Mouseout: fn => etype('mouseout', fn),
      Mouseenter: fn => etype('mouseenter', fn),
      Mouseleave: fn => etype('mouseleave', fn),
      Scroll: fn => etype('scroll', fn),
    };
  }

  /**
   * Starts listening for an EventType on the Target/Targets
   * @param {string} EventType - set the type of event to listen for example "click" or "scroll"
   * @param {Node|NodeList|window|document} Target - the Event Listener's target , can be a NodeList to listen on multiple Nodes
   * @param {function} Func - Handler function that will be called when the event is triggered -> "function( event , event.srcElement ) {...}"
   * @returns Off - when On is defined as a variable "var x = On(...)" it allows you to access all the EventHandler interfaces Off,Once,On
   */
  root.On = function (EventType, Target, element, func) {
    let args = toArr(arguments),
      types = args.length < 3 && !args.some(i => is.Func(i));

    return is.Func(Target) ? new EventHandler(EventType, root, Target).On() :
      types ? EventTypes(EventType, Target) :
      is.Func(element) ? new EventHandler(EventType, Target, element).On() :
      new EventHandler(EventType, Target, func, element).On();
  }

  /**
   * Starts listening for an EventType on the Target/Targets ONCE after triggering the Once event Listener will stop listening
   * @param {string} EventType - set the type of event to listen for example "click" or "scroll"
   * @param {Node|NodeList|window|document} Target - the Event Listener's target , can be a NodeList to listen on multiple Nodes
   * @param {function} Func - Handler function that will be called when the event is triggered -> "function( event , event.srcElement ) {...}"
   * @returns On,Off,Once - when Once is defined as a variable "var x = Once(...)" it allows you to access all the EventHandler interfaces Off,Once,On
   */
  root.Once = function (EventType, Target, element, func) {
    let args = toArr(arguments),
      types = args.length < 3 && !args.some(i => is.Func(i));

    return is.Func(Target) ? new EventHandler(EventType, root, Target).Once() :
      types ? EventTypes(EventType, Target, 'Once') :
      is.Func(element) ? new EventHandler(EventType, Target, element).Once() :
      new EventHandler(EventType, Target, func, element).Once();
  }

  function make_element(name, inner, attributes, NodeForm, extraAttr) {
    if (is.Bool(inner) && inner === true) {
      NodeForm = inner;
      inner = '';
    }
    if (is.Bool(attributes)) NodeForm = attributes;
    if (!def(inner, attributes, NodeForm)) {
      inner = '';
      NodeForm = true;
    }
    if (NodeForm === true) {
      let newEl = doc.createElement(name);
      newEl.innerHTML = inner;
      if (is.Object(attributes)) forEach(attributes, (val, attr) => newEl.setAttribute(attr, val));
      if (is.String(attributes)) attributes.split('&').forEach(attr => def(attr.split('=')[1]) ? newEl.setAttribute(attr.split('=')[0], attr.split('=')[1]) : newEl.setAttribute(attr.split('=')[0], ''));
      if (def(extraAttr) && is.Object(extraAttr)) forEach(extraAttr, (val, attr) => newEl.setAttribute(attr, val));
      return newEl;
    }
    let attrString = ``;
    if (is.String(attributes)) attributes.split('&').forEach(attr => attrString += def(attr.split('=')[1]) ? `${attr.split('=')[0]}="${attr.split('=')[1]}" ` : `${attr.split('=')[0]} `);
    if (is.Object(attributes)) forEach(attributes, (val, attr) => attrString += ` ${attr}="${val}" `);
    if (def(extraAttr) && is.Object(extraAttr)) forEach(extraAttr, (val, attr) => attrString += ` ${attr}="${val}" `);
    return `<${name} ${attrString}>${inner}</${name}>`;
  }

  function domNodeList(elements) {
    return {
      /**
       * Listen for Events on the NodeList
       * @param {string} string indicating the type of event to listen for
       * @param {function} func - handler function for the event
       * @returns handler (Off,Once,On)
       */
      On: (eventType, func) => On(eventType, elements, func),
      /**
       * Checks wether a Node is in the NodeList with either a refference to the Node or a CSS selector
       * @param {Node|string} Node or CSS selector
       */
      includes(SelectorNode) {
        for (let i = 0; i < elements.length; i++)
          if (elements[i] === SelectorNode) return true;
        return false;
      },
      /**
       * add CSS style rules to NodeList
       * @param {object} styles - should contain all the styles you wish to add example { borderWidth : '5px solid red' , float : 'right'}...
       */
      css: styles => def(styles) ? forEach(elements, el => forEach(styles, (prop, key) => el.style[key] = prop)) : console.error('styles unefined'),

    }
  }

  function domManip(element, within) {
    if (is.String(element)) def(within) ? element = query(element, within) : element = query(element);
    this.element = element;
  }
  /**
   * changes or returns the innerHTML value of a Node
   * @memberof dom
   * @param {string=} sets the innerHTML value or when undefined gets the innerHTML value
   */
  domManip.prototype.html = function (val) {
      let el = this.element;
      if (!def(val)) return is.Input(el) ? el.value : el.innerHTML;
      is.Input(el) ? el.value = val : el.innerHTML = val;
      return this;
    }
    /**
     * changes or returns the textContent value of a Node
     * @memberof dom
     * @param {string=} sets the textContent value or when undefined gets the textContent value
     */
  domManip.prototype.text = function (val) {
      let el = this.element,
        input = is.Input(el);
      if (!def(val)) return input ? el.value : el.textContent;
      input ? el.value = val : el.textContent = val;
      return this;
    }
    /**
     * replaces a Node with another node provided as a parameter/argument
     * @memberof dom
     * @param {Node} Node to replace with
     */
  domManip.prototype.replace = function (val) {
      this.element.parentNode.replaceChild(el, this.element);
      return this;
    }
    /**
     * append the Element to another node using either a CSS selector or a Node
     * @memberof dom
     * @param {Node|string} CSS selector or Node to append the this.element to
     */
  domManip.prototype.appendTo = function (val) {
      if (is.String(val)) val = query(val);
      if (val !== null) val.appendChild(this.element);
      return this;
    }
    /**
     * append text or a Node to the element
     * @memberof dom
     * @param {Node|string} String or Node to append to the this.element
     */
  domManip.prototype.append = function (val) {
      is.String(val) ? this.element.innerHTML += val : this.element.appendChild(val);
      return this;
    }
    /**
     * prepend text or a Node to the element
     * @memberof dom
     * @param {Node|string} String or Node to prepend to the this.element
     */
  domManip.prototype.prepend = function (val) {
      is.String(val) ? this.element.innerHTML = val + this.element.innerHTML : this.element.insertBefore(val, this.element.firstChild);
      return this;
    }
    /**
     * Listen for Events on the element or on all the elements in the NodeList
     * @memberof dom
     * @param {string} string indicating the type of event to listen for
     * @param {function} func - handler function for the event
     * @returns handler (Off,Once,On)
     */
  domManip.prototype.On = function (eventType, func) {
      return On(eventType, this.element, func);
    }
    /**
     * add CSS style rules to the Element or NodeList
     * @memberof dom
     * @param {object} styles - should contain all the styles you wish to add example { borderWidth : '5px solid red' , float : 'right'}...
     */
  domManip.prototype.css = function (styles) {
      def(styles) ? forEach(styles, (prop, key) => this.element.style[key] = prop) : console.error('Styles Object undefined');
      return this;
    }
    /**
     * check if the element has got a specific CSS class
     * @memberof dom
     * @param {string} name of the class to check for
     */
  domManip.prototype.gotClass = function (Class) {
      return this.element.classList.contains(Class);
    }
    /**
     * Add a CSS class to the element
     * @memberof dom
     * @param {string} name of the class to add
     */
  domManip.prototype.addClass = function (Class) {
      this.element.classList.add(Class);
      return this;
    }
    /**
     * removes a specific CSS class from the element
     * @memberof dom
     * @param {string} name of the class to strip
     */
  domManip.prototype.stripClass = function (Class) {
      this.element.classList.remove(Class);
      return this;
    }
    /**
     * removes a specific Attribute from the this.element
     * @memberof dom
     * @param {string} name of the Attribute to strip
     */
  domManip.prototype.stripAttr = function (Attr) {
      this.element.removeAttribute(Attr);
      return this;
    }
    /**
     * checks if the element has a specific Attribute
     * @memberof dom
     * @param {string} name of the Attribute to check for
     */
  domManip.prototype.hasAttr = function (Attr) {
      return this.element.hasAttribute(Attr);
    }
    /**
     * Sets or adds an Attribute on the element
     * @memberof dom
     * @param {string} Name of the Attribute to add/set
     * @param {string} Value of the Attribute to add/set
     */
  domManip.prototype.setAttr = function (Attr, val) {
    this.element.setAttribute(Attr, val);
    return this;
  }
  domManip.prototype.getAttr = function (Attr) {
      return this.element.getAttribute(Attr);
    }
    /**
     * gets all the elements siblings within it's parentNode
     * @memberof dom
     */
  domManip.prototype.getSiblings = function () {
      let siblings = [],
        AllChildren = this.element.parentNode.childNodes;
      for (let i = 0; i < AllChildren.length; i++)
        if (AllChildren[i] !== this.element) siblings.push(AllChildren[i]);
      return siblings;
    }
    /**
     * sets or gets the element's pixel width
     * @memberof dom
     * @param {string|number=} pixel value to set
     */
  domManip.prototype.Width = function (pixels) {
      let haspixels = def(pixels);
      if (haspixels) this.element.style.width = pixels;
      return haspixels ? this : this.element.getBoundingClientRect().width;
    }
    /**
     * sets or gets the element's pixel height
     * @memberof dom
     * @param {string|number=} pixel value to set
     */
  domManip.prototype.Height = function (pixels) {
      let haspixels = def(pixels);
      if (haspixels) this.element.style.height = pixels;
      return haspixels ? this : this.element.getBoundingClientRect().height;
    }
    /**
     * gets all the element's dimentions (width,height,left,top,bottom,right)
     * @memberof dom
     */
  domManip.prototype.getRect = function () {
      return this.element.getBoundingClientRect();
    }
    /**
     * move the element using either css transforms or plain css possitioning
     * @param {string|num} x - x-axis position in pixels
     * @param {string|num} y - y-axis position in pixels
     * @param {boolean=} transform - should move set the position using css transforms or not
     * @param {string=} position - set the position style of the element absolute/fixed...
     * @param {boolean=} chainable - should this method be chainable defaults to false for performance reasons
     */
  domManip.prototype.move = function (x, y, transform, position, chainable) {
      if (is.Bool(position)) chainable = position;
      if (is.String(transform)) position = transfrom;
      transform === true ? this.element.style.transform = `translateX(${x}px) translateY(${y}px)` : this.css({
        position: is.String(position) ? position : '',
        left: `${x}px`,
        top: `${y}px`
      });
      if (chainable) return this;
    }
    /**
     * performs a query inside the element
     * @memberof dom
     * @param {string} CSS selector
     * @returns {Node|Null}
     */
  domManip.prototype.query = function (selector) {
      return query(selector, this.element);
    }
    /**
     * performs a queryAll inside the element
     * @memberof dom
     * @param {string} CSS selector
     * @returns {NodeList|Null}
     */
  domManip.prototype.queryAll = function (selector) {
    return queryAll(selector, this.element);
  }

  /**
   * Function that returns many useful methods for interacting with and manipulating the DOM or creating elements
   * in the absence of parameters the function will return methods for created elements
   * @name dom
   * @param {Node|NodeList|string=} element - optional Node, NodeList or CSS Selector that will be affected by the methods returned
   * @param {Node|string=} within - optional Node, NodeList or CSS Selector to search in for the element similar to query(element,within)
   */
  root.dom = (element, within) => {
    let elements = QueryOrNodetoNodeArray(element, within);
    return is.NodeList(elements) ? elements.length === 1 ? new domManip(elements[0]) : domNodeList(elements) : Craft.dom;
  }

  CrafterStyles = query('[crafterstyles]', head);

  /**
   * Craft is Crafter.js's Core containing most functionality.
   */
  root.Craft = {
    /** Converts an Array to an Object
     * @param {Array} arr - array to be converted
     */
    ArrtoObj(arr) {
        let i, NewObject = {};
        for (i in arr)
          if (def(arr[i])) NewObject[i] = arr[i];
        return NewObject;
      },
      toArr: toArr,
      omitFrom(Arr, val) {
        let index = Arr.indexOf(val),
          temp = [],
          string = false,
          i = 0;
        if (is.String(Arr)) {
          Arr = toArr(Arr);
          string = true;
        }
        if (is.NodeList(Arr)) Arr = toArr(Arr);
        for (; i < Arr.length; i++)
          if (i !== index) temp.push(Arr[i]);
        return string ? temp.join('') : temp;
      },
      /**
       * Compares two arrays and determines if they are the same array
       * @param {Array} arr1 - array one
       * @param {Array} arr2 - array two
       */
      sameArray(arr1, arr2) {
        let i = arr1.length;
        if (i !== arr2.length) return false;
        while (i--)
          if (arr1[i] !== arr2[i]) return false;
        return true;
      },
      getDeep(obj, propString) {
        if (!def(propString)) return obj;

        let prop, val, props = propString.split('.'),
          candidate, i = 0,
          iLen = props.length - 1;

        for (; i < iLen; i++) {
          prop = props[i];
          candidate = obj[prop];
          if (def(candidate)) obj = candidate;
          else break;
        }
        try {
          val = obj[props[i]];
        } catch (e) {}
        return val;
      },
      setDeep(obj, prop, value, returnObj) {
        if (is.String(prop)) prop = prop.split(".");
        if (prop.length > 1) {
          let e = prop.shift();
          Craft.setDeep(obj[e] = is.Object(obj[e]) ? obj[e] : {}, prop, value);
        } else if (!rv(obj[prop[0]]) && def(value)) obj[prop[0]] = value;
        else if (value === undefined) delete obj[prop[0]];
        else obj[prop[0]].set(value);
        if (returnObj === true) return obj;
      },
      forEachDeep(object, fn, path) {
        path = path || '';
        let currentPath = path,
          nestable;
        forEach(object, (val, key) => {
          currentPath = path;
          nestable = false;
          is.Arr(object) ? currentPath += `[${key}]` : !currentPath ? currentPath = key : currentPath += `.${key}`;
          nestable = fn(val, key, object, currentPath) !== false;
          if (nestable && (is.Arr(val) || is.Object(val))) Craft.forEachDeep(val, fn, currentPath);
        });
      },
      concatObjects(hostobj, ...Objs) {
        forEach(hostobj, o => Objs.forEach(obj => forEach(obj, (prop, key) => {
          if (key in hostobj) {
            if (is.Arr(hostobj[key])) {
              if (!hostobj[key].includes(prop)) hostobj[key].push(prop);
            } else if (prop !== hostobj[key]) hostobj[key] = [prop, hostobj[key]];
          } else hostobj[key] = prop;
        })));
        return hostobj;
      },
      clone(obj) {
        if (obj === null || typeof (obj) !== 'object' || 'isActiveClone' in obj) return obj;
        var temp = obj.constructor();
        forEach(obj, (val, key) => {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            obj['isActiveClone'] = null;
            temp[key] = clone(obj[key]);
            delete obj['isActiveClone'];
          }
        });
        return temp;
      },
      omit(obj, val) {
        if (is.Object(obj) && obj !== val) forEach(obj, (prop, key) => {
          if (val === key || val === prop) delete obj[key];
        });
        else if (is.ArrayLike(obj)) obj.forEach(i => {
          if (val === i) obj = Craft.omitFrom(obj, i);
        });
        if ((is.Object(obj) && obj.hasOwnProperty(val)) || obj.includes(val)) throw new Error(`couldn't omit ${val} from Collection`);
        return obj;
      },
      dom: {
        /**
         * creates a div element with the options provided
         * @memberof dom
         * @param {string} sets innerHTML of the div
         * @param {string|Object=} sets div attributes with URL variable style string ("id=123&class=big-header") or Object with properties {id : 123 , class : 'big-header'}
         * @param {Boolean=} should the div be a plain String or a Node defaults to string
         */
        div: (inner, attr, node) => make_element('div', inner, attr, node),
        /**
         * creates a span element with the options provided
         * @memberof dom
         * @param {string} sets innerHTML of the span
         * @param {string|Object=} sets span attributes with URL variable style string ("id=123&class=big-header") or Object with properties {id : 123 , class : 'big-header'}
         * @param {Boolean=} should the span be a plain String or a Node defaults to string
         */
        span: (inner, attr, node) => make_element('span', inner, attr, node),
        /**
         * creates a label element with the options provided
         * @memberof dom
         * @param {string} sets innerHTML of the label
         * @param {string|Object=} sets label attributes with URL variable style string ("id=123&class=big-header") or Object with properties {id : 123 , class : 'big-header'}
         * @param {Boolean=} should the label be a plain String or a Node defaults to string
         */
        label: (inner, attr, node) => make_element('label', inner, attr, node),
        /**
         * creates a p (paragraph) element with the options provided
         * @memberof dom
         * @param {string} sets innerHTML of the p
         * @param {string|Object=} sets p attributes with URL variable style string ("id=123&class=big-header") or Object with properties {id : 123 , class : 'big-header'}
         * @param {Boolean=} should the p be a plain String or a Node defaults to string
         */
        p: (inner, attr, node) => make_element('p', inner, attr, node),
        /**
         * creates an img element with the options provided
         * @memberof dom
         * @param {string} sets src of the img
         * @param {string} sets alt of the img
         * @param {string|Object=} sets p attributes with URL variable style string ("id=123&class=big-header") or Object with properties {id : 123 , class : 'big-header'}
         * @param {Boolean=} should the p be a plain String or a Node defaults to string
         */
        img: (src, alt, attr, node) => make_element('img', '', attr, node, {
          src: src,
          alt: alt
        }),
        ul(items, attr, node) {
          let list = ``;
          if (is.Arr(items)) items.forEach(item => {
            if (is.String(item)) list += make_element('li', item);
            else if (is.Object(items)) list += make_element('li', item.inner, item.attr);
          });
          return make_element('ul', list, attr, node)
        },
        ol(items, attr, node) {
          let list = ``;
          if (is.Arr(items)) items.forEach(item => {
            if (is.String(item)) list += make_element('li', item);
            if (is.Object(items)) list += make_element('li', item.inner, item.attr);
          });
          return make_element('ol', list, attr, node)
        },
        h: (level, inner, attr, node) => make_element('h' + level, inner, attr, node),
        a: (link, inner, attr, node) => make_element('a', inner, attr, node, {
          href: link
        }),
        script(code, attr, defer) {
          let script = make_element('script', code, attr, true, {
            type: 'text/javascript'
          });
          script.defer = defer !== false;
          return script;
        },
        table(rows, attr, node) {
          if (!is.Arr(rows)) return is.String(rows) ? make_element('table', rows, attr, node) : make_element('table', '', attr, node);
          if (!rows.every(o => is.Object(o))) throw new TypeError('dom.table -> rows : all entries need to be objects');
          let tableInner = ``;
          forEach(rows, row => forEach(row, (val, key) => {
            let row = `<tr>`;
            if (key === 'cell' || key === 'td' || key === 'data') {
              if (is.String(val)) row += `<td>${val}</td>`;
              if (is.Object(val)) row += make_element('tr', val.inner, val.attr)
            } else if (key === 'head' || key === 'th') {
              if (is.String(val)) row += `<th>${val}</th>`;
              if (is.Object(val)) row += make_element('th', val.inner, val.attr)
            }
            row += '</tr>'
            tableInner += row;
          }));
          return make_element('table', tableInner, attr, node);
        },
      },
      CurrentBrowser: {
        is: browser => _br.join(' ').toLowerCase().includes(browser.toLowerCase()),
        browser: _br.join(' ')
      },
      loader: {
        pre: 'craft:',
        fetchImport(obj) {
          obj.key = obj.key || obj.url;
          let now = +new Date(),
            src = Craft.loader.get(obj.key);
          if (src || src.expire - now > 0) return new Promise(resolve => resolve(src));
          return new Promise((success, failed) => fetch(obj.url).then(res => res.text().then(data => {
            obj.data = data;
            obj.stamp = now;
            obj.expire = now + ((obj.expire || 4000) * 60 * 60 * 1000);
            if (obj.cache) localStorage.setItem(Craft.loader.pre + obj.key, JSON.stringify(obj));
            success(obj);
          })).catch(err => failed(`problem importing -> ${err}`)));
        },
        setPrekey: str => Craft.loader.pre = str + ':',
        get: key => JSON.parse(localStorage.getItem(key.includes(Craft.loader.pre) ? key : Craft.loader.pre + key) || false),
        remove: key => localStorage.removeItem(key.includes(Craft.loader.pre) ? key : Craft.loader.pre + key),
        removeAll(expired) {
          for (let i in localStorage)
            if (!expired || Craft.loader.get(i).expire <= +new Date()) Craft.loader.remove(i)
        }
      },
      /**
       * Crafter.js resource loader for Scripts and Style sheets,
       * each import option is an object with properties like 'script/css/wc : "location" ' for resource url
       * other options include 'cache' - determines wether to cache the resource or not , 'test' : usefull for conditional imports if test is false the resource won't load or execute ,
       * 'key' custom name to cache the resource in localStorage with instead of the resource location, 'defer' optionally load the script when the dom is loaded or load when it's ready,
       * {...object} args - Objects containing options for Script/CSS/WebComponent import
       */
      Import() {
        let promises = [];
        toArr(arguments).forEach(arg => arg.test === false ? Craft.loader.remove(arg.css || arg.script) : promises.push(Craft.loader.fetchImport({
          url: arg.css || arg.script,
          type: arg.css ? 'css' : 'script',
          exec: arg.execute !== false,
          cache: arg.cache !== false,
          defer: arg.defer ? 'defer' : null,
          key: arg.key,
          expire: arg.expire
        })));
        return Promise.all(promises).then(src => src.map(obj => obj.exec ? obj.type === 'css' ? CrafterStyles.innerHTML += '\n' + obj.data : head.appendChild(dom().script(obj.data, 'key=' + obj.key, obj.defer)) : undefined));
      },
      router: {
        addHandle(link, func) {
            Craft.router.handlers.push({
              link: link,
              func: func
            })
          },
          handle(route, func) {
            if (is.String(route)) {
              if (location.href.includes(route)) func(route);
              Craft.router.addHandle(route, func);
            } else if (is.Arr(route)) route.forEach(link => {
              if (location.href.includes(link)) func(link);
              Craft.router.addHandle(link, func);
            });
          },
          handlers: [],
          links: [],
          link: (Selector, link, newtab, eventType) => Craft.router.links.push(() => On(is.String(eventType) ? eventType : 'click', Selector, e => newtab ? open(link) : location = link)),
          open: (link, newtab) => newtab ? open(link) : location = link,
          setTitle: title => doc.title = title,
          setView(selector, view, position) {
            let vh = is.String(selector) ? query(selector) : selector;
            vh.insertAdjacentHTML(is.String(position) ? position : 'beforeend', view);
          },
          fetchView(selector, src, cache, position) {
            let vh = is.String(selector) ? query(selector) : selector,
              prefixedSRC = (`Cr:${src}`),
              view = localStorage.getItem(prefixedSRC);
            if (!is.String(position)) position = 'beforeend';
            if (!nil(vh) && nil(view)) fetch(src).then(res => res.text().then(txt => {
              if (is.True(cache, nil(view))) localStorage.setItem(prefixedSRC, txt);
              vh.insertAdjacentHTML(position, txt);
            })).catch(err => console.error("Couldn't get view ->" + err));
            else vh.insertAdjacentHTML(position, view);
          },
          clearCache() {
            for (let i in localStorage)
              if (localStorage.key(i).includes("Cr:")) localStorage.removeItem(localStorage.key(i));
          },
      },
      Cookies: {
        get: (key) => key ? decodeURIComponent(doc.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null : null,
        set(key, val, expires, path, domain, secure) {
          if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) return false;
          let expiry = "";
          if (expires) {
            if (is.Num(expires)) expiry = expires === Infinity ? "; expires=Fri, 11 April 9997 23:59:59 UTC" : "; max-age=" + expires;
            if (is.String(expires)) expiry = "; expires=" + expires;
            if (is.Date(expires)) expiry = "; expires=" + expires.toUTCString();
          }
          doc.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(val) + expiry + (domain ? "; domain=" + domain : "") + (path ? "; path=" + path : "") + (secure ? "; secure" : "");
          return true;
        },
        remove(key, path, domain) {
          if (!Craft.Cookies.has(key)) return false;
          doc.cookie = encodeURIComponent(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (domain ? "; domain=" + domain : "") + (path ? "; path=" + path : "");
          return true;
        },
        has: key => key ? (new RegExp("(?:^|;\\s*)" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(doc.cookie) : false,
        keys() {
          let all = doc.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
          all.forEach(c => decodeURIComponent(c));
          return all;
        }
      },
      curry: fn => createFn(fn, [], fn.length),
      delay: (func, ms) => setTimeout(func, ms),
      after(n, func) {
        !is.Func(func) && is.Func(n) ? func = n : console.error("after: no function");
        n = Number.isFinite(n = +n) ? n : 0;
        if (--n < 1) return function () {
          return func.apply(this, arguments);
        }
      },
      debounce(wait, func, immediate) {
        let timeout;
        return function () {
          let args = arguments,
            later = () => {
              timeout = null;
              if (!immediate) func.apply(this, args);
            },
            callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(this, args);
        };
      },
      throttle(wait, func, options) {
        let context, args, result,
          timeout = null,
          previous = 0;
        if (!options) options = {};
        let later = function () {
          previous = options.leading === false ? 0 : Date.now();
          timeout = null;
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        };
        return function () {
          let now = Date.now();
          if (!previous && options.leading === false) previous = now;
          let remaining = wait - (now - previous);
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
      once(func, context) {
        let res;
        return function () {
          if (is.Func(func)) {
            res = func.apply(context || this, arguments);
            func = null;
          }
          return res;
        }
      },
      css: (el, styles) => def(styles, el) && is.Node(el) ? forEach(styles, (prop, key) => el.style[key] = prop) : console.error('invalid args'),
      hasCapitals: string => toArr(string).some(c => is.Uppercase(c)),
      OverrideFunction: (funcName, Func, ContextObject) => {
        let func = funcName.split(".").pop(),
          ns = funcName.split(".");
        for (let i = 0; i < ns.length; i++) ContextObject = ContextObject[ns[i]];
        ContextObject[func] = Func;
      },
      len(val) {
        try {
          return is.Object(val) ? Object.keys(val).length : is.Map(val) || is.Set(val) ? val.size : val.length;
        } catch (e) {}
        return -1;
      },
      indexOfDate(Collection, date) {
        for (let i = 0; i < Collection.length; i++)
          if (+Collection[i] === +date) return i;
        return -1;
      },
      type() {
        let types = [];
        toArr(arguments).forEach(arg => types.push(typeof arg));
        return types.length < 2 ? types[0] : types;
      },
      memoize(func, resolver) {
        if (!is.Func(func) || (resolver && !is.Func(resolver))) throw new TypeError("no function");
        let cache = new WeakMap;
        let memoized = function () {
          let args = arguments,
            key = resolver ? resolver.apply(this, args) : args[0];
          if (cache.has(key)) return cache.get(key);
          let result = func.apply(this, args);
          memoized.cache = cache.set(key, result);
          return result;
        };
        return memoized;
      },
      millis: {
        seconds: n => (n || 1) * 1000,
        minutes: n => (n || 1) * 60000,
        hours: n => (n || 1) * 60000 * 60,
        days: n => (n || 1) * 60000 * 60 * 24,
        months: (n, daysInMonth) => n * Craft.millis.days((daysInMonth || 30)),
        years: (n) => n * Craft.millis.days(365),
      },
      Scope: {},
      WebComponents: [],
      tabActive: true,
      make_element: make_element,
      Binds: new Map,
      mouse: {
        x: 0,
        y: 0,
        over: null,
        observe: new ReactiveVariable(false, (o, n) => n ? Craft.mouse.eventhandler.On() : Craft.mouse.eventhandler.Off())
      },
      easing: {
        inOutQuad(t, b, c, d) {
          t /= d / 2;
          if (t < 1) return c / 2 * t * t + b;
          t--;
          return -c / 2 * (t * (t - 2) - 1) + b;
        }
      },
      JumpTo(target, options) {
        options = options || {};
        options.duration = options.duration || 400;
        options.offset = options.offset || 0;
        options.func = options.func || undefined;

        let startTime, elapsedTime, start = root.pageYOffset,
          distance = is.String(target) ? options.offset + query(target).getBoundingClientRect().top : target,
          loopIteration = 0,
          loop = time => {
            if (loopIteration === 0) startTime = time;
            loopIteration++;
            elapsedTime = time - startTime;
            root.scrollTo(0, Craft.easing.inOutQuad(elapsedTime, start, distance, options.duration));
            elapsedTime < options.duration ? requestAnimationFrame(time => loop(time)) : (() => {
              root.scrollTo(0, start + distance);
              if (is.Func(options.func)) options.func.call();
              startTime = undefined;
            })();
          };
        requestAnimationFrame(time => loop(time))
      },
      nodeExists: (selector, within) => queryAll(selector, (is.Node(within) ? within = within : within = query(within))) !== null,
      ObjToFormData(obj) {
        let key, formData = new FormData();
        for (key in obj) formData.append(key, obj[key]);
        return formData;
      },
      URLfrom: text => URL.createObjectURL(new Blob([text])),
      OnScroll: (element, func) => is.Func(func) ? On('scroll', element, e => func(e.deltaY < 1 ? false : true, e)) : console.error('second param needs to be a function'),
      OnResize: func => is.Func(func) ? Craft.ResizeHandlers.add(func) : console.error("Craft.OnResize -> func is not a function"),
      OnScrolledTo: Scroll => new Promise((pass, fail) => {
        let evl = On('scroll', e => pageYOffset >= Scroll ? pass(e, evl) : fail(e, evl));
      }),
      WhenScrolledTo: Scroll => new Promise((pass, fail) => Once('scroll', e => pageYOffset >= Scroll || pageYOffset <= Scroll ? pass(e) : fail(e))),
      /**
       * function that returns a promise when the DOM and WebComponents are finished loading
       * @param {Object=} Scope - Optional overide to the default Craft.Scope passed to the promise
       */
      WhenReady: Scope => new Promise((resolve, reject) => {
        Scope = Scope || Craft.Scope;
        if (Ready) resolve(Scope);
        else {
          let ReadyYet = setInterval(() => {
            if (Ready) {
              resolve(Scope);
              clearInterval(ReadyYet);
            }
          }, 25);
          setTimeout(() => {
            clearInterval(ReadyYet);
            if (!Ready) reject("Things didn't load correctly -> load failed");
          }, 4500)
        }
      }),
      poll: (test, interval, timeout, success, fail) => (() => {
        if (is.Func(timeout)) {
          if (is.Func(success)) fail = success;
          success = timeout;
          timeout = undefined;
        }
        let Interval = setInterval(() => {
          if ((is.Bool(test) && test === true) || (is.Func(test) && test() === true)) {
            success();
            clearInterval(Interval);
          }
        }, interval || 20);
        if (is.Num(timeout)) setTimeout(() => {
          clearInterval(Interval);
          if ((is.Bool(test) && test === false) || (is.Func(test) && test() === false)) fail();
        }, timeout);
      })(),
      /**
       * Usefull method for validating passwords , example Craft.strongPassword('#MyFancyPassword18',8,true,true,"#") -> true requirements met
       * @param {string} pass - string containing the password
       * @param {Number} length - Character length in numbers (Minimum password length)
       * @param {Boolean} caps - Should the password contains Capital Letters
       * @param {Boolean} number - should the password contain Numbers
       * @param {Boolean} reasons - should the function return a short string explaining the reason exept when it's a pass then it gives a bool;
       * @param {...string} includeChars - every extra argument should be a string containing a character you want the password to include
       */
      strongPassword(pass, length, caps, number, reasons, ...includeChars) {
        if (pass.length <= length - 1) return reasons ? 'Password too short' : false;
        if (caps === true && Craft.hasCapitals(pass) === false) return reasons ? 'Password should contain Capital letters' : false;
        if (number === true && /\d/g.test(pass) === false) return reasons ? 'Password should contain a number' : false;
        if (includeChars.length !== 0) {
          let hasChars = true,
            reason = includeChars.join();
          includeChars.forEach(ch => {
            if (!pass.includes(ch)) hasChars = false;
          });
          if (!hasChars) return reasons ? '' : false
        }
        return true;
      },
      /** method for generating random alphanumeric strings*/
      randomString: () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1),
      /**
       * similar to Craft.randomString in that it generates a unique string , in this case a Unique ID with random alphanumeric strings separated by hyphens
       * example 0ebf-c7d2-ef81-2667-08ef-4cde
       */
      GenUID: () => Craft.randomString() + '-' + Craft.randomString() + '-' + Craft.randomString() + '-' + Craft.randomString() + '-' + Craft.randomString() + '-' + Craft.randomString(),
      /**
       * Part of Crafter.js's own WebComponent format (.wc) it takes a json object that contains .css and .js values then imports and executes them
       * @param {string} webcomponent - JSON string from Crafter.js's (.wc) WebComponent format
       */
      createWebComponent(webcomponent, src) {
        webcomponent = JSON.parse(webcomponent);
        CrafterStyles.innerHTML += webcomponent.css;
        head.appendChild(dom().script(webcomponent.js + `\nCraft.WebComponents.push('${src}')`, `webcomponent=${webcomponent.name}`, true));
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
      newComponent(tag, config) {
        if (!def(config)) throw new Error(tag + ': config undefined');
        let element = Object.create(HTMLElement.prototype),
          settings = {};
        forEach(config, (prop, key) => {
          if (key === 'created') element.createdCallback = prop;
          else if (key === 'inserted') element.attachedCallback = prop;
          else if (key === 'destroyed') element.detachedCallback = prop;
          else if (key === 'attr') element.attributeChangedCallback = prop;
          else if (key === 'extends') settings.extends = prop;
          else element[key] = prop;
        });
        settings['prototype'] = element;
        doc.registerElement(tag, settings)
      },
      applyBinds(key, bindScope) {
        let bind, val = Craft.getBind(key, bindScope);
        if (!def(val)) val = '';
        is.Object(val) && !rv(val) ? Craft.applyObjectProps(key, val) : queryEach(`[${ib}="${key}"],[${vb}="${key}"]`, el => is.Input(el) ? el.value = val : el.innerHTML = val);
      },
      applyObjectProps(okey, oval) {
        if (!okey.includes('.') && is.Object(oval) && !rv(oval)) Craft.forEachDeep(oval, (prop, key, obj, path) => {
          if (rv(prop)) prop = prop.val;
          let p = `${okey}.${path}`;
          queryEach(`[${ib}="${p}"],[${vb}="${p}"]`, el => is.Input(el) ? el.value = prop : el.innerHTML = prop);
        });
      },
      /** creates a new bound variable , part of Crafter.js's Data Binding System */
      newBind(key, val, handle, Scope) {
        if (is.Map(handle)) Scope = handle;
        if (!is.Map(Scope)) Scope = Craft.Binds;
        if (is.Func(handle)) val = new ReactiveVariable(val, handle);
        key.includes('.') ? Craft.setBind(key, val, Scope) : Scope.set(key, val);
        Craft.applyBinds(key, Scope);
      },
      /** sets the value of a bound variable */
      setBind(key, val, Scope, parentignore) {
        let bind;
        if (is.Bool(Scope)) parentignore = Scope;
        if (!is.Map(Scope)) Scope = Craft.Binds;
        if (!key.includes('.')) {
          bind = Scope.get(key);
          rv(bind) ? bind.set(val) : Scope.set(key, val);
        } else {
          let obj, okey = key.split('.'),
            oldval = Craft.getBind(key, Scope, true),
            bind = Scope.get(okey[0]);
          if (rv(bind) && !parentignore) bind.Handle(rv(oldval) ? oldval.val : oldval, val, rv(bind) ? bind.val : bind);
          if (rv(oldval)) {
            oldval.set(val);
            val = oldval.val;
          }
          obj = Craft.setDeep(rv(bind) ? bind.val : bind || {}, Craft.omitFrom(okey, okey[0]).join('.'), val, true);
          rv(bind) ? bind.set(obj) : Scope.set(okey[0], obj);
        }
        queryEach(`[${ib}="${key}"],[${vb}="${key}"]`, el => is.Input(el) ? el.value = val : el.innerHTML = val);
      },
      /** gets the value of a bound variable */
      getBind(key, Scope, returnReactiveVars) {
        if (!is.Map(Scope)) Scope = Craft.Binds;
        if (is.Bool(Scope)) returnReactiveVars = Scope;
        if (!Craft.BindExists(key, Scope)) return undefined;
        if (!key.includes('.')) {
          let bind = Scope.get(key);
          if (returnReactiveVars === true) return bind;
          return rv(bind) ? bind.val : bind;
        } else {
          let okey = key.split('.'),
            bind = Scope.get(okey[0]),
            val = Craft.getDeep(rv(bind) ? bind.val : bind, Craft.omitFrom(okey, okey[0]).join('.'));
          if (returnReactiveVars === true) return val;
          return rv(val) ? val.val : val;
        }
      },
      /**
       *
       */
      deleteBind(key, Scope) {
        let bind, val;
        if (!is.Map(Scope) || Scope === Craft.Binds) Scope = Craft.Binds;
        if (!key.includes('.')) Scope.delete(key);
        else {
          let obj, okey = key.split('.');
          bind = Craft.getBind(okey[0], Scope, true);
          rv(bind) ? obj = bind.val : obj = bind;
          val = Craft.setDeep(obj, Craft.omitFrom(okey, okey[0]).join('.'), undefined, true);
          if (rv(bind)) {
            bind.set(val);
            val = bind;
          }
          Scope.set(okey[0], val);
        }
        Craft.applyBinds(key);
      },
      BindExists(key, Scope) {
        if (!is.Map(Scope)) Scope = Craft.Binds;
        if (!key.includes('.')) return Scope.has(key);
        try {
          let okey = key.split('.'),
            bind = Craft.getBind(okey[0], Scope);
          return def(Craft.getDeep(bind, Craft.omitFrom(okey, okey[0]).join('.')));
        } catch (e) {}
        return false;
      },
  };

  On('animationstart', doc, e => {
    if (e.animationName === 'NodeInserted' && is.Node(e.target)) {
      let element = e.target,
        mnp = dom(element),
        isInput = is.Input(element);
      if (mnp.hasAttr(ib)) {
        let key = mnp.getAttr(ib),
          OnInput = On(i, element, e => Craft.setBind(key, mnp.html())),
          observer = new MutationObserver(mutations => mutations.forEach(mut => {
            if (mut.type === 'attributes') {
              if (mut.attributeName === ib && !mnp.hasAttr(ib)) {
                OnInput.Off();
                observer.disconnect();
              }
            }
          }));
        observer.observe(element, {
          attributes: true
        });
        Craft.BindExists(key) ? mnp.html(Craft.getBind(key)) : Craft.newBind(key, mnp.html());
      }
      if (mnp.hasAttr(vb)) {
        let key = mnp.getAttr(vb);
        Craft.BindExists(key) ? Craft.applyBinds(key) : Craft.newBind(key, mnp.html());
      }
      if (mnp.hasAttr('link')) On('click', element, e => mnp.hasAttr('newtab') ? open(mnp.getAttr('link')) : Craft.router.open(mnp.getAttr('link')));
    }
  });

  Craft.curry.to = Craft.curry((arity, fn) => createFn(fn, [], arity));
  Craft.curry.adaptTo = Craft.curry((num, fn) => Craft.curry.to(num, (context, ...args) => fn.apply(null, args.slice(1).concat(context))));
  Craft.curry.adapt = fn => Craft.curry.adaptTo(fn.length, fn);
  Craft.loader.removeAll(true);
  Craft.mouse.eventhandler = On('mousemove', e => {
    if (Craft.mouse.observe.val === true) {
      Craft.mouse.x = e.clientX;
      Craft.mouse.y = e.clientY;
      Craft.mouse.over = e.target;
    }
  });
  On('blur', e => Craft.tabActive = false);
  On('focus', e => Craft.tabActive = true);

  Craft.newComponent('fetch-webcomponent', {
    inserted() {
      let src = this.getAttribute('src');
      if (src !== null) {
        let wc = null,
          el = dom(this),
          cc = 'cache-component';
        if (Craft.WebComponents.includes(src)) return false;
        if (el.hasAttr(cc)) {
          wc = localStorage.getItem(src);
          if (wc !== null) Craft.createWebComponent(wc, src);
        }
        if (wc === null) fetch(src).then(res => res.json().then(webcomponent => {
          CrafterStyles.innerHTML += webcomponent.css;
          head.appendChild(dom().script(webcomponent.js + `\nCraft.WebComponents.push('${src}')`, `webcomponent=${webcomponent.name}`, true));
          if (el.getAttr(cc) == 'true') localStorage.setItem(src, JSON.stringify(webcomponent));
        })).catch(err => console.error(err + ': could not load webcomponent'))
      }
    }
  });

  Once('DOMContentLoaded', e => {
    Craft.router.links.forEach(link => link());
    Craft.WebComponents.length === queryAll('fetch-webcomponent').length ? Ready = true : Craft.poll(() => Craft.WebComponents.length === queryAll('fetch-webcomponent').length, 35, 2000, () => Ready = true, () => {
      console.warn('loading is taking longer than usual :(');
      Ready = true
    });
  });

  On('hashchange', e => Craft.router.handlers.forEach(handler => (location.hash === handler.link || location === handler.link) ? handler.func(location.hash) : null));

  root.CraftSocket = CraftSocket;
  root.EventHandler = EventHandler;
  root.ReactiveVariable = ReactiveVariable;
})(document, self);
