/**
 *  @overview Crafter.js , minimalist front-end library
 *  @author Saul van der Walt - https://github.com/SaulDoesCode/
 *  @license MIT
 */

((doc, root) => {
  "use strict ";

  let RegExps = {
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
    w = 'webcomponent',
    fw = 'fetch-' + w,
    sI = 'Isync',
    head = doc.head,
    Locs = (test) => [location.hash, location.href, location.pathname].some(test),
    CrafterStyles = doc.createElement('style'),
    ua = navigator.userAgent,
    tem, _br = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
  if (_br && (tem = ua.match(/version\/([\.\d]+)/i)) !== null) _br[2] = tem[1];
  _br ? [_br[1], _br[2]] : [navigator.appName, navigator.appVersion, '-?'];

  CrafterStyles.setAttribute('crafterstyles', '');
  head.appendChild(CrafterStyles);

  function toInt(num) {
    num = Number(num);
    if (isNaN(num)) return 0;
    if (num === 0 || !isFinite(num)) return num;
    return (num > 0 ? 1 : -1) * Math.floor(Math.abs(num));
  }


  root.docfragFromString = html => doc.createRange().createContextualFragment(html);


  function toArr(val) {
    return Array.prototype.slice.call(val);
  }

  function type(obj, str) {
    return toString.call(obj) === str;
  }

  function doInvok(fn, argsArr, totalArity) {
    if (argsArr.length > totalArity) argsArr = argsArr.slice(0, totalArity);
    return argsArr.length == totalArity ? fn.apply(null, argsArr) : makeFn(fn, argsArr, totalArity);
  }

  function makeFn(fn, Args, totalArity) {
    let remainingArity = totalArity - Args.length;
    return is.Between(remainingArity, 10, 0) ? function () {
      let args = toArr(arguments);
      return doInvok(fn, Args.concat(args), totalArity);
    } : ((fn, args, arity) => {
      let a = [];
      forEach(arity, (v, i) => a.push('a' + i.toString()));
      return (...args) => doInvok(fn, args.concat(a));
    })(fn, args, remainingArity);
  }

  function def(...args) {
    return args.length && args.every(o => typeof o !== 'undefined');
  }

  function nil(...args) {
    return args.length && args.every(o => o === null);
  }

  function cutdot(str) {
    return str.split('.');
  }

  /** is - Type Testing / Assertion */
  root.is = {
    /**
     * Test if something is a boolean type
     * @param val - value to test
     */
    Bool: (...args) => args.length && args.every(o => typeof o === 'boolean'),
    /**
     * Test if something is a String
     * @param args - value/values to test
     */
    String: (...args) => args.length && args.every(o => typeof o === 'string'),
    /**
     * Test if something is an Array
     * @param args - value/values to test
     */
    Arr: (...args) => args.length && args.every(Array.isArray),
    /**
     * Array.isArray alias for convenience and performance when only one argument is present
     * @param {*} val - value to test
     */
    Array: Array.isArray,
    /**
     * Test if something is an Array-Like
     * @param args - value/values to test
     */
    Arraylike(...args) {
      try {
        return args.length && args.every(o => def(o.length));
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
    Null: (...args) => args.length && args.every(o => o === null),
    /**
     * Determine whether a variable is a DOM Node
     * @param args - value/values to test
     */
    Node: (...args) => args.length && args.every(o => o instanceof Node),
    /**
     * Test an element's tagname
     * @param {Node} element - node to test
     * @param {string} tag - tag to test node for
     */
    Tag: (element, tag) => is.Node(element) ? element.tagName === tag.toUpperCase() : false,
    /**
     * Determine whether a variable is a DOM NodeList or Collection of Nodes
     * @param args - value/values to test
     */
    NodeList: (...args) => args.length && args.every(nl => nl instanceof NodeList || is.Arraylike(nl) ? nl.length && toArr(nl).every(n => n instanceof Node) : false),
    /**
     * Determine if a variable is a Number
     * @param {...*} args - value/values to test
     */
    Num: (...args) => args.length && args.every(o => !isNaN(Number(o))),
    /**
     * Determine if a variable is an Object
     * @param args - value/values to test
     */
    Object: (...args) => args.length && args.every(o => toString.call(o) === '[object Object]'),
    /**
     * Determine if a sring is JSON
     * @param args - value/values to test
     */
    Json(...args) {
      return args.length && args.every(str => {
        try {
          JSON.parse(str);
          return !0;
        } catch (e) {}
        return !1;
      });
    },
    /**
     * Determine if a variable is a HTMLElement
     * @param args - value/values to test
     */
    Element: (...args) => args.length && args.every(o => type(o, '[object HTMLElement]')),
    /**
     * Determine if a variable is a File Object
     * @param args - value/values to test
     */
    File: (...args) => args.length && args.every(o => type(o, '[object File]')),
    /**
     * Determine if a variable is of a FormData type
     * @param args - value/values to test
     */
    FormData: (...args) => args.length && args.every(o => type(o, '[object FormData]')),
    /**
     * Determine if a variable is a Map
     * @param args - value/values to test
     */
    Map: (...args) => args.length && args.every(o => type(o, '[object Map]')),
    /**
     * Determine if a variable is a function
     * @param args - value/values to test
     */
    Func: (...args) => args.length && args.every(o => typeof o === 'function'),
    /**
     * Determine if a variable/s are true
     * @param args - value/values to test
     */
    True: (...args) => args.length && args.every(o => o === true),
    /**
     * Determine if a variable/s are false
     * @param args - value/values to test
     */
    False: (...args) => args.length && args.every(o => o !== true),
    /**
     * Determine if a variable is of Blob type
     * @param obj - variable to test
     */
    Blob: (...args) => args.length && args.every(o => type(o, '[object Blob]')),
    /**
     * Determine if a variable is a Regular Expression
     * @param obj - variable to test
     */
    RegExp: (...args) => args.length && args.every(o => type(o, '[object RegExp]')),
    /**
     * Determine if a variable is a Date type
     * @param {...*} variable to test
     */
    Date: (...args) => args.length && args.every(o => type(o, '[object Date]')),
    /**
     * Determine if a variable is a Set
     * @param obj - variable to test
     */
    Set: (...args) => args.length && args.every(o => type(o, '[object Set]')),
    Args: val => !nil(val) && type(val, '[object Arguments]'),
    /**
     * Determine if a variable is a Symbol
     * @param obj - variable to test
     */
    Symbol: obj => type(obj, '[object Symbol]'),
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
    Email: email => RegExps.email.test(email),
    /**
     * Determines whether a String is a URL
     * @param {string} url - variable to test
     */
    URL(url) {
      try {
        new URL(url);
        return true;
      } catch (e) {}
      return false;
    },
    /**
     * Determines whether a String is a HEX-COLOR (#fff123)
     * @param {string} HexColor - variable to test
     */
    HexColor: hexColor => RegExps.hexColor.test(hexColor),
    /**
     * Determines whether a String is a ip
     * @param {string} ip - variable to test
     */
    ip: ip => RegExps.ip.test(ip),
    /**
     * Determines whether a String is a ipv4
     * @param {string} ipv4 - variable to test
     */
    ipv4: ipv4 => RegExps.ipv4.test(ipv4),
    /**
     * Determines whether a String is a ipv6
     * @param {string} ipv6 - variable to test
     */
    ipv6: ipv6 => RegExps.ipv6.test(ipv6),
    /**
     * Determines whether a String is hexadecimal
     * @param {string} hexadecimal - variable to test
     */
    hexadecimal: hexadecimal => RegExps.hexadecimal.test(hexadecimal),
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
    time: time => RegExps.timeString.test(time),
    /**
     * Determines whether a String is a dateString
     * @param {string} dateString - variable to test
     */
    dateString: dateString => RegExps.dateString.test(dateString),
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
    neither(value) {
      let args = toArr(arguments).slice(1);
      return args.every(val => value !== val);
    },
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
      return Craft.len(val) === 0 || val === ''
    },
    /**
     * Test if something is a Native JavaScript feature
     * @param val - value to test
     */
    Native(val) {
      let type = typeof val;
      return is.Func(val) ? RegExp('^' + String(Object.prototype.toString).replace(/[.*+?^${}()|[\]\/\\]/g, '\\$&').replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$').test(Function.prototype.toString.call(val)) : (val && type == 'object' && /^\[object .+?Constructor\]$/.test(val.toString)) || false;
    },
    Input: element => ['INPUT', 'TEXTAREA'].some(i => element.tagName === i),
  };

  /**
   * Converts any Query/QueryAll to an Array of Nodes even if there is only one Node , this is error proof when no arguments are present it returns an empty array
   * @param {Node|NodeList|Array|String} val - pass either a CSS Selector string , Node/NodeList or Array of Nodes
   * @param {Node|NodeList|Array|String} within - pass either a CSS Selector string , Node/NodeList or Array of Nodes to search for val in
   */
  function NodeOrQuerytoArr(val, within) {
    if (is.String(val) && (is.String(within) || is.Node(within))) val = queryAll(val, within);
    else if (is.String(val)) val = queryAll(val)
    return is.Node(val) ? [val] : is.NodeList(val) ? toArr(val) : [];
  }

  /**
   * Event Handling Class
   * @param {string} EventType - set the type of event to listen for example "click" or "scroll"
   * @param {Node|NodeList|window|document} Target - the Event Listener's target , can also be a NodeList to listen on multiple Nodes
   * @param {function} Func - Handler function that will be called when the event is triggered -> "function( event , event.srcElement ) {...}"
   * @param {...*} args - extra optional arguments/parameters to pass to the handler function
   * @returns Interface On,Off,Once
   */
  function EventHandler(EventType, Target, func, Within) {
    this.EventType = EventType || 'click';
    this.Target = (Target !== root && Target !== doc) ? NodeOrQuerytoArr(Target, Within) : [Target];
    this.FuncWrapper = e => func(e, e.srcElement);
    if (EventType.includes(',')) this.EventType = EventType.split(',');
  }
  /**
   * Activates the EventHandler to start listening for the EventType on the Target/Targets
   */
  EventHandler.prototype.On = function () {
      is.Arr(this.EventType) ? this.Target.forEach(target => this.EventType.forEach(evt => target.addEventListener(evt, this.FuncWrapper))) :
        this.Target.forEach(target => target.addEventListener(this.EventType, this.FuncWrapper));
      return this;
    }
    /**
     * Change the Event type to listen for
     * {string} type - the name of the event/s to listen for
     */
  EventHandler.prototype.ChangeType = function (type) {
      //  have you tried turning it on and off again? - THE IT CROWD
      this.Off();
      this.EventType = type.includes(',') ? type.split(',') : type;
      this.On();
      return this;
    }
    /**
     * De-activates / turns off the EventHandler to stop listening for the EventType on the Target/Targets
     * can still optionally be re-activated with On again
     */
  EventHandler.prototype.Off = function () {
      is.Arr(this.EventType) ? this.Target.forEach(target => this.EventType.forEach(evt => target.removeEventListener(evt, this.FuncWrapper))) :
        this.Target.forEach(target => target.removeEventListener(this.EventType, this.FuncWrapper));
      return this;
    }
    /**
     * Once the the Event has been triggered the EventHandler will stop listening for the EventType on the Target/Targets
     * the Handler function will be called only Once
     */
  EventHandler.prototype.Once = function () {
    let func = this.FuncWrapper,
      target = this.Target;
    if (is.Arr(this.EventType)) this.EventType.forEach(etype => {
      let listenOnce = e => {
        func(e);
        target.forEach(t => t.removeEventListener(etype, listenOnce));
      }
      target.forEach(t => t.addEventListener(etype, listenOnce));
    });
    else {
      let listenOnce = e => {
        func(e);
        target.forEach(t => t.removeEventListener(this.EventType, listenOnce));
      }
      target.forEach(t => t.addEventListener(this.EventType, listenOnce));
    }
    return this;
  }

  /**
   * Easy way to loop through Collections and Objects
   * @param {Array|Object|NodeList} iterable - any collection that is either an Object or has a .length value
   * @param {function} func - function called on each iteration -> "function( value , indexOrKey ) {...}"
   */
  function forEach(iterable, func) {
    if (!is.empty(iterable) && is.Func(func)) {
      let i = 0;
      if (is.Array(iterable) || is.Arraylike(iterable) && !localStorage) {
        for (; i < iterable.length; i++) func(iterable[i], i);
      } else if (is.int(iterable)) {
        iterable = toInt(iterable);
        for (; i < iterable; iterable--) func(iterable);
      } else
        for (i in iterable)
          if (iterable.hasOwnProperty(i)) func(iterable[i], i);
    }
  }

  /**
   * Easy way to get a DOM Node or Node within another DOM Node using CSS selectors
   * @param {string} selector - CSS selector to query the DOM Node with
   * @param {Node|string=} element - Optional Node or CSS selector to search within insead of document
   */
  root.query = (selector, element) => {
    if (is.String(element)) element = doc.querySelector(element);
    return is.Node(element) ? element.querySelector(selector) : doc.querySelector(selector);
  }

  /**
   * Easy way to get a DOM NodeList or NodeList within another DOM Node using CSS selectors
   * @param {string} selector - CSS selector to query the DOM Nodes with
   * @param {Node|string=} element - Optional Node or CSS selector to search within insead of document
   */
  root.queryAll = (selector, element) => {
      if (is.String(element)) element = query(element);
      let list = is.Node(element) ? element.querySelectorAll(selector) : doc.querySelectorAll(selector);
      return nil(list) ? list : toArr(list);
    }
    /**
     * Easy way to loop through Nodes in the DOM using a CSS Selector or a NodeList
     * @param {string|NodeList|Node} selector - CSS selector to query the DOM Nodes with or NodeList to iterate through
     * @param {Node|string=} element - Optional Node or CSS selector to search within insead of document
     * @param {function} func - function called on each iteration -> "function( Element , index ) {...}"
     * @param {boolean=} returnList - should queryEach also return the list of nodes
     */
  root.queryEach = (selector, element, func, returnList) => {
    if (is.Func(element)) func = element;
    let list = NodeOrQuerytoArr(selector, element);
    forEach(list, func);
    if (returnList) return list;
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
      Enter: fn => etype('keydown', (e, srcElement) => {
        if (event.which == 13 || event.keyCode == 13) fn(e, srcElement);
      }),
      Escape: fn => etype('keydown', (e, srcElement) => {
        if (event.which == 27 || event.keyCode == 27) fn(e, srcElement);
      }),
      Delete: fn => etype('keydown', (e, srcElement) => {
        if (event.which == 46 || event.keyCode == 46) fn(e, srcElement);
      }),
      Space: fn => etype('keydown', (e, srcElement) => {
        if (event.which == 32 || event.keyCode == 32) fn(e, srcElement);
      }),
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
    return is.Func(Target) ? new EventHandler(EventType, root, Target).On() :
      arguments.length < 3 && !toArr(arguments).some(i => is.Func(i)) ? EventTypes(EventType, Target) :
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
    return is.Func(Target) ? new EventHandler(EventType, root, Target).Once() :
      arguments.length < 3 && !toArr(arguments).some(i => is.Func(i)) ? EventTypes(EventType, Target, 'Once') :
      is.Func(element) ? new EventHandler(EventType, Target, element).Once() :
      new EventHandler(EventType, Target, func, element).Once();
  }

  function craftElement(name, inner, attributes, extraAttr, stringForm) {
    if (is.False(is.String(inner), is.Node(inner), is.Num(inner), is.Array(inner))) is.Object(inner) ? attributes = inner : inner = is.Func(inner) ? inner() : '';
    let newEl = dom(doc.createElement(name));
    is.Array(inner) ? newEl.html(...inner) : newEl.html(inner);
    if (is.Object(attributes) || is.String(attributes)) newEl.setAttr(attributes);
    if (def(extraAttr)) newEl.setAttr(extraAttr);
    if (is.Bool(extraAttr)) stringForm = extraAttr;
    if (stringForm === true) newEl = newEl.outerHTML;
    return newEl;
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
      includes(selector) {
        if (is.String(selector)) selector = query(selector);
        return elements.length && toArr(elements).some(e => elements[i] === selector);
      },
      /**
       * add CSS style rules to NodeList
       * @param {object} styles - should contain all the styles you wish to add example { borderWidth : '5px solid red' , float : 'right'}...
       */
      css: styles => def(styles) ? forEach(elements, el => forEach(styles, (prop, key) => el.style[key] = prop)) : console.error('styles unefined'),

      addClass: (Class) => forEach(elements, el => el.classList.add(Class)),
      stripClass: (Class) => forEach(elements, el => el.classList.remove(Class)),
      toggleClass: (Class, state) => forEach(elements, el => (is.Bool(state) ? state : el.classList.contains(Class)) ? el.classList.remove(Class) : el.classList.add(Class)),
      append() {
        forEach(arguments, val => forEach(elements, el => el.appendChild((is.Node(val) ? val : docfragFromString(val)).cloneNode(true))));
        return this;
      },
      prepend() {
        forEach(arguments, val => forEach(elements, el => el.insertBefore((is.Node(val) ? val : docfragFromString(val)).cloneNode(true), el.firstChild)));
        return this;
      },
      hide() {
        this.css({
          display: 'none'
        });
      },
      show() {
        this.css({
          display: ''
        });
      },
    }
  }

  function Inner(type, el, args) {
    type = is.Input(el) ? 'value' : type;
    if (is.empty(args)) return el[type];
    if (args.length === 1) {
      args = args[0];
      el[type] = '';
      is.Node(args) ? el.append(args) : el[type] = args;
    } else el[type] = args.map(val => is.Node(val) ? val.outerHTML : val).join('');
    if (is.Node(el)) return el;
  }

  function domManip(element, within) {
    if (is.String(element)) element = query(element, within);
    if(element.hasDOMmethods === true) return element;
    element.hasDOMmethods = true;
    /**
     * changes or returns the innerHTML value of a Node
     * @memberof dom
     * @param {string=} sets the innerHTML value or when undefined gets the innerHTML value
     */
    element.html = function () {
      return Inner('innerHTML', element, toArr(arguments));
    }

    /**
     * changes or returns the textContent value of a Node
     * @memberof dom
     * @param {string=} sets the textContent value or when undefined gets the textContent value
     */
    element.Text = function () {
        return Inner('textContent', element, toArr(arguments));
      }
      /**
       * replaces a Node with another node provided as a parameter/argument
       * @memberof dom
       * @param {Node} Node to replace with
       */
    element.replace = function (val) {
        this.parentNode.replaceChild(val, this);
        return this;
      }
      /**
       * append the Element to another node using either a CSS selector or a Node
       * @memberof dom
       * @param {Node|string} CSS selector or Node to append the this.element to
       */
    element.appendTo = function (val, within) {
        if (is.String(val)) val = query(val, within);
        if (is.Node(val)) val.appendChild(this);
        return this;
      }
      /**
       * append text or a Node to the element
       * @memberof dom
       * @param {Node|string} String or Node to append to the this.element
       */
    element.append = function (...args) {
        args.forEach(val => element.appendChild(is.Node(val) ? val : docfragFromString(val)));
        return this;
      }
      /**
       * prepend text or a Node to the element
       * @memberof dom
       * @param {Node|string} String or Node to prepend to the this.element
       */
    element.prepend = function (val) {
        this.insertBefore(is.Node(val) ? val : docfragFromString(val), this.firstChild);
        return this;
      }
      /**
       * Listen for Events on the element or on all the elements in the NodeList
       * @memberof dom
       * @param {string} string indicating the type of event to listen for
       * @param {function} func - handler function for the event
       * @returns handler (Off,Once,On)
       */
    element.On = (eventType, func) => On(eventType, element, func);
    /**
     * add CSS style rules to the Element or NodeList
     * @memberof dom
     * @param {object} styles - should contain all the styles you wish to add example { borderWidth : '5px solid red' , float : 'right'}...
     */
    element.css = function (styles) {
        def(styles) ? forEach(styles, (prop, key) => this.style[key] = prop) : console.error('Styles Object undefined');
        return this;
      }
      /**
       * check if the element has got a specific CSS class
       * @memberof dom
       * @param {...string} name of the class to check for
       */
    element.gotClass = function () {
        return toArr(arguments).every(Class => this.classList.contains(Class));
      }
      /**
       * Add a CSS class to the element
       * @memberof dom
       * @param {string} name of the class to add
       */
    element.addClass = function () {
        forEach(arguments, Class => this.classList.add(Class));
        return this;
      }
      /**
       * removes a specific CSS class from the element
       * @memberof dom
       * @param {...string} name of the class to strip
       */
    element.stripClass = function () {
        forEach(arguments, Class => this.classList.remove(Class));
        return this;
      }
      /**
       * Toggle a CSS class to the element
       * @memberof dom
       * @param {string} name of the class to add
       * @param {boolean=} state - optionally toggle class either on or off with bool
       */
    element.toggleClass = function (Class, state) {
        if (!is.Bool(state)) state = this.gotClass(Class);
        state ? this.stripClass(Class) : this.addClass(Class);
        return this;
      }
      /**
       * removes a specific Attribute from the this.element
       * @memberof dom
       * @param {...string} name of the Attribute/s to strip
       */
    element.stripAttr = function () {
        forEach(arguments, attr => this.removeAttribute(attr));
        return element;
      }
      /**
       * checks if the element has a specific Attribute or Attributes
       * @memberof dom
       * @param {string|boolean} name of the Attribute or if true checks that it has some (||) of the attributes or if false checks that it has all of the attributes (&&)
       * @param {...string} names of attributes to check for
       */
    element.hasAttr = function (attr, ...attributes) {
        if (is.String(attr)) return this.hasAttribute(attr);
        if (attr === false) return attributes.every(a => this.hasAttribute(a));
        if (attr === true) return attributes.some(a => this.hasAttribute(a));
      }
      /**
       * Toggles an attribute on element , optionally add value when toggle is adding attribute
       * @param {string} name - name of the attribute to toggle
       * @param {string} val - value to set attribute to
       * @param {boolean=} returnState - optionally return a bool witht the toggle state otherwise returns the element
       */
    element.toggleAttr = function (name, val, returnState) {
        if (is.Bool(val)) !val ? this.stripAttr(name) : this.setAttr(name);
        else this.hasAttr(name) ? this.stripAttr(name) : this.setAttr(name, val);
        return returnState ? this.hasAttr(name) : this;
      }
      /**
       * Sets or adds an Attribute on the element
       * @memberof dom
       * @param {string} Name of the Attribute to add/set
       * @param {string} Value of the Attribute to add/set
       */
    element.setAttr = function (attr, val) {
        if (!def(val)) {
          if (is.String(attr)) {
            attr.includes('=') || attr.includes('&') ? attr.split('&').forEach(Attr => def(Attr.split('=')[1]) ? this.setAttribute(Attr.split('=')[0], Attr.split('=')[1]) : this.setAttribute(Attr.split('=')[0], '')) :
              this.setAttribute(attr, '');
          } else if (is.Object(attr)) forEach(attr, (value, Attr) => this.setAttribute(Attr, value));
        } else this.setAttribute(attr, val);
        return this;
      }
      /**
       * Gets the value of an attribute , short alias for element.getAttribute
       * {string} attr - name of attribute to get
       */
    element.getAttr = element.getAttribute;

    element.hide = () => element.css({
      display: 'none'
    });

    element.show = () => element.css({
      display: ''
    });

    /**
     * Remove the element after a time in milliseconds
     * @param {number=} time - time to wait before self destructing the element
     */
    element.removeAfter = time => {
      setTimeout(() => element.remove(), time || 5000);
      return element;
    }

    /**
     * gets all the elements siblings within it's parentNode
     * @memberof dom
     */
    element.getSiblings = () => Craft.omit(toArr(element.parentNode.childNodes), element);
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
    element.Width = function (pixels) {
        let dp = def(pixels);
        if (dp) this.style.width = pixels;
        return dp ? this : this.getRect().width;
      }
      /**
       * sets or gets the element's pixel height
       * @memberof dom
       * @param {string|number=} pixel value to set
       */
    element.Height = function (pixels) {
        let dp = def(pixels);
        if (dp) this.style.height = pixels;
        return dp ? this : this.getRect().height;
      }
      /**
       * move the element using either css transforms or plain css possitioning
       * @param {string|num} x - x-axis position in pixels
       * @param {string|num} y - y-axis position in pixels
       * @param {boolean=} transform - should move set the position using css transforms or not
       * @param {string=} position - set the position style of the element absolute/fixed...
       * @param {boolean=} chainable - should this method be chainable defaults to false for performance reasons
       */
    element.move = function (x, y, transform, position, chainable) {
        if (is.Bool(position)) chainable = position;
        if (is.String(transform)) position = transfrom;
        if (is.String(position)) this.style.position = position;
        this.css(!!transform ? {
          transform: `translateX(${x}px) translateY(${y}px)`
        } : {
          left: x + 'px',
          top: y + 'px'
        });
        if (chainable) return this;
      }
      /**
       * performs a query inside the element
       * @memberof dom
       * @param {string} CSS selector
       * @returns {Node|Null}
       */
    element.query = selector => query(selector, element);
    /**
     * performs a queryAll inside the element
     * @memberof dom
     * @param {string} CSS selector
     * @returns {NodeList|Null}
     */
    element.queryAll = selector => queryAll(selector, element);

    if (is.Input(element)) {
      element.SyncInput = (obj, key) => element[sI] = On(element).Input(e => Craft.setDeep(obj, key, element.value));
      element.disconectInputSync = () => {
        if (def(element[sI])) {
          element[sI].Off();
          delete element[sI];
        }
      }
    }
    element.observe = function (func, options) {
      this.MutObserver = new MutationObserver(muts => muts.forEach(mut => func(mut, mut.type, mut.target, mut.addedNodes, mut.removedNodes)));
      this.MutObserver.observe(this, options || {
        attributes: true,
        childList: true,
        subtree: true
      });
    }
    element.unobserve = function () {
      if (def(this['MutObserver'])) {
        this.MutObserver.disconnect();
        delete this.MutObserver;
      }
    }

    return element;
  }


  /**
   * Function that returns many useful methods for interacting with and manipulating the DOM or creating elements
   * in the absence of parameters the function will return methods for created elements
   * @name dom
   * @param {Node|NodeList|string=} element - optional Node, NodeList or CSS Selector that will be affected by the methods returned
   * @param {Node|string=} within - optional Node, NodeList or CSS Selector to search in for the element similar to query(element,within)
   */
  root.dom = (element, within, one) => {
    if (within === true) {
      one = within;
      within = null;
    }
    if (one !== true) {
      if (is.String(element)) element = queryAll(element, within);
      if (is.NodeList(element)) {
        if (element.length === 1) element = element[0];
        else return domNodeList(element);
      }
    } else if (is.String(element)) element = query(element, within);
    if (is.Node(element)) return element['hasDOMmethods'] !== true ? domManip(element) : element;
    return Craft.dom;
  }

  CrafterStyles = query('[crafterstyles]', head);

  /**
   * Craft is Crafter.js's Core containing most functionality.
   */
  root.Craft = {
    /** Converts an Array to an Object
     * @param {Array} arr - array to be converted
     */
    arrDiff(arr, newArr, func) {
        let added = newArr.filter(item => {
            if (!arr.includes(item)) return item;
          }),
          removed = arr.filter(item => {
            if (!newArr.includes(item)) return item;
          }),
          diff = Craft.omit(added.concat(removed), undefined);
        if (is.Func(func)) func(arr, newArr, added, removed, diff);
        else return {
          arr: arr,
          newArr: newArr,
          diff: diff,
          added: added,
          removed: removed
        }
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
      array(len, val) {
        let arr = [];
        forEach(len, i => arr.push(is.Func(val) ? val() : val));
        return arr;
      },
      getDeep(obj, keychain) {
        keychain = keychain.replace(/\[(\w+)\]/g, '.$1');
        keychain = keychain.replace(/^\./, '');
        try {
          for (let i = 0, a = keychain.split('.'); i < a.length; ++i) a[i] in obj ? obj = obj[a[i]] : obj = undefined;
        } catch (e) {}
        return obj;
      },
      setDeep(obj, path, value, returnObj) {
        path = path.split('.');
        let temp = obj;
        for (let i = 0, n; i < path.length - 1; i++) {
          n = path[i];
          if (n in temp) temp = temp[n];
          else {
            temp[n] = {};
            temp = temp[n];
          }
        }
        temp[path[path.length - 1]] = value;
        if (returnObj === true) return obj;
      },
      forEachDeep(object, fn, path) {
        path = path || '';
        let currentPath = path,
          nestable, val, key;
        for (key in object) {
          if (object.hasOwnProperty(key)) val = object[key];
          currentPath = path;
          nestable = false;
          is.Array(object) ? currentPath += `[${key}]` : !currentPath ? currentPath = key : currentPath += '.' + key;
          nestable = fn(val, key, object, currentPath) !== false;
          if (nestable && (is.Arr(val) || is.Object(val))) Craft.forEachDeep(val, fn, currentPath);
        }
      },
      concatObjects(host) {
        for (let obj of Craft.omit(arguments, host)) forEach(Object.keys(obj), key => Object.defineProperty(host, key, Object.getOwnPropertyDescriptor(obj, key)));
        return host;
      },
      cloneArr: arr => Array(...arr),
      clone: val => is.Object(val) ? Object.create(val) : Array(val),
      omitFrom(Arr) {
        let string = is.String(Arr),
          values = toArr(arguments).slice(1);
        string ? forEach(values, e => {
            let replace = () => {
              if (Arr.includes(e)) {
                Arr = Arr.replace(e, '');
                if (Arr.includes(e)) replace();
              }
            }
            replace();
          }) :
          Arr = (is.Arraylike(Arr) && !string ? toArr(Arr) : Arr).filter(e => {
            if (!values.some(v => is.eq(v, e))) return e;
          });
        return Arr;
      },
      omit(val) {
        if (is.Arraylike(val)) val = Craft.omitFrom(...arguments);
        let values = toArr(arguments).slice(1);
        if (is.Object(val) && !values.some(v => v === val)) forEach(val, (prop, key) => {
          if (values.some(v => is.eq(v, prop) || is.eq(v, key))) delete val[key];
        });
        return val;
      },
      dom: {
        element: craftElement,
        /**
         * creates a div element with the options provided
         * @memberof dom
         * @param {string} sets innerHTML of the div
         * @param {string|Object=} sets div attributes with URL variable style string ("id=123&class=big-header") or Object with properties {id : 123 , class : 'big-header'}
         */
        div: (inner, attr) => craftElement('div', inner, attr),
        /**
         * creates a span element with the options provided
         * @memberof dom
         * @param {string} sets innerHTML of the span
         * @param {string|Object=} sets span attributes with URL variable style string ("id=123&class=big-header") or Object with properties {id : 123 , class : 'big-header'}
         */
        span: (inner, attr) => craftElement('span', inner, attr),
        /**
         * creates a label element with the options provided
         * @memberof dom
         * @param {string} sets innerHTML of the label
         * @param {string|Object=} sets label attributes with URL variable style string ("id=123&class=big-header") or Object with properties {id : 123 , class : 'big-header'}
         */
        label: (inner, attr) => craftElement('label', inner, attr),
        /**
         * creates a p (paragraph) element with the options provided
         * @memberof dom
         * @param {string} sets innerHTML of the p
         * @param {string|Object=} sets p attributes with URL variable style string ("id=123&class=big-header") or Object with properties {id : 123 , class : 'big-header'}
         */
        p: (inner, attr) => craftElement('p', inner, attr),
        /**
         * creates an img element with the options provided
         * @memberof dom
         * @param {string} sets src of the img
         * @param {string} sets alt of the img
         * @param {string|Object=} sets p attributes with URL variable style string ("id=123&class=big-header") or Object with properties {id : 123 , class : 'big-header'}
         */
        img: (src, alt, attr) => craftElement('img', '', attr, {
          src: src,
          alt: alt
        }),
        input(type, attributes) {
          if (is.Object(type)) {
            attributes = type;
            type = 'text';
          }
          return craftElement('input', '', attributes, {
            type: type || 'text'
          });
        },
        button: (inner, attr) => craftElement('button', inner, attr),
        list(type, items, attr) {
          let list = ``;
          if (is.Arrylike(items)) forEach(items, item => {
            if (is.String(item)) list += craftElement('li', item).outerHTML;
            else if (is.Object(items)) list += craftElement('li', item.inner, item.attr).outerHTML;
          });
          return craftElement(type, list, attr)
        },
        ul: (items, attr) => Craft.dom.list('ul', items, attr),
        ol: (items, attr) => Craft.dom.list('ol', items, attr),
        li: (inner, attr) => craftElement('li', inner, attr),
        h: (level, inner, attr) => craftElement('h' + level, inner, attr),
        a: (link, inner, attr) => craftElement('a', inner, attr, {
          href: link
        }),
        script(code, attr, defer) {
          let script = craftElement('script', '', attr, {
            type: 'text/javascript',
            src: Craft.URLfrom(code)
          });
          script.defer = defer !== false;
          return script;
        },
        td: (inner, attr) => craftElement('td', inner, attr),
        th: (inner, attr) => craftElement('th', inner, attr),
        tr: (inner, attr) => craftElement('tr', inner, attr),
        table: (rows, attr) => craftElement('table', rows, attr),
        SafeHTML(html, node) {
          html = html.replace(/<script[^>]*?>.*?<\/script>/gi, '').replace(/<style[^>]*?>.*?<\/style>/gi, '').replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');
          return !node ? html : docfragFromString(html);
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
          })).catch(err => failed(`error importing -> ${err}`)));
        },
        setPrekey: str => Craft.loader.pre = str + ':',
        get: key => JSON.parse(localStorage.getItem(key.includes(Craft.loader.pre) ? key : Craft.loader.pre + key) || false),
        remove: key => localStorage.removeItem(key.includes(Craft.loader.pre) ? key : Craft.loader.pre + key),
        removeAll(expired) {
          for (let i in localStorage)
            if (!expired || Craft.loader.get(i).expire <= +new Date()) Craft.loader.remove(i)
        },
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
        forEach(arguments, arg => arg.test === false ? Craft.loader.remove(arg.css || arg.script) : promises.push(Craft.loader.fetchImport({
          url: arg.css || arg.script,
          type: arg.css ? 'css' : 'script',
          exec: arg.execute !== false,
          cache: arg.cache !== false,
          defer: arg.defer ? 'defer' : null,
          key: arg.key,
          expire: arg.expire
        })));
        return Promise.all(promises).then(src => src.map(obj => {
          if (obj.exec) obj.type === 'css' ? CrafterStyles.innerHTML += '\n' + obj.data : head.appendChild(dom().script('', {
            src: Craft.URLfrom(obj.data),
            key: obj.key
          }, obj.defer))
        }));
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
              if (Locs(l => l === route)) func(route);
              Craft.router.addHandle(route, func);
            } else if (is.Arr(route)) route.forEach(link => {
              if (Locs(l => l === link)) func(link);
              Craft.router.addHandle(link, func);
            });
          },
          handlers: [],
          links: [],
          link: (Selector, link, newtab, eventType) => Craft.router.links.push(() => On(is.String(eventType) ? eventType : 'click', Selector, e => newtab ? open(link) : location = link)),
          open(link, newtab) {
            newtab ? open(link) : location = link
          },
          setTitle: title => doc.title = title,
          setView(selector, view, position) {
            dom(selector, true).html(view, position)
          },
          fetchView(selector, src, cache, position) {
            let vh = dom(selector, true),
              srcpre = (`Cr:${src}`),
              view = localStorage.getItem(srcpre);
            if (!def(vh.element)) return;
            nil(view) ? fetch(src).then(res => res.text().then(txt => {
              if (is.True(cache, nil(view))) localStorage.setItem(srcpre, txt);
              vh.html(txt, position);
            })).catch(err => console.error("fetchView: " + err)) : vh.html(view, position);
          },
          clearViews() {
            for (let i in localStorage) localStorage.removeItem(localStorage.key(i).includes("Cr:"))
          }
      },
      Cookies: {
        get: key => key ? decodeURIComponent(doc.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null : null,
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
      /**
       * Handles WebSockets in a contained manner with send and recieve methods
       * @param {string} address - the WebSocket address example "ws://localhost:3000/" but the ws:// or wss:// is optional
       * @param {Array=} protocols - the protocols to pass to the WebSocket Connection
       */
      Socket(address, protocols) {
        if (!is.URL(address)) {
          let match = address.match(/^(\/.*?)?$/);
          if(is.empty(match)) throw new Error('invalid url');
          address = location.host + match[0];
        }
        if (!address.includes('ws://')) address = (location.protocol === 'http:' ? 'ws://' : 'wss://') + address;
        if (is.URL(address)) {
          let Options = {
            socket: null,
            open: false,
            recievers: [],
            message: '',
            set send(msg) {
              if (this.socket['readyState'] === 1) this.socket.send(is.Object(msg) ? JSON.stringify(msg) : msg);
              else {
                let poll = setInterval(() => {
                  if (this.socket['readyState'] === 1) {
                    this.socket.send(is.Object(msg) ? JSON.stringify(msg) : msg);
                    clearInterval(poll);
                  }
                }, 20);
                setTimeout(() => clearInterval(poll), 2000);
              }
            },
            set recieve(func) {
              if (is.Func(func)) this.recievers.push(func);
            },
            get recieve() {
              return this.message;
            },
            close() {
              this.socket.close();
            },
            reopen() {
              if (this.open === false) this.socket = protocols ? new WebSocket(address, protocols) : new WebSocket(address);
              socket.onopen = e => Options.open = !0;
              socket.onclose = e => Options.open = !1;
              socket.onmessage = e => {
                Options.message = e.data;
                forEach(Options.recievers,fn => fn(e.data, e));
              }
            }
          }
          let socket = protocols ? new WebSocket(address, protocols) : new WebSocket(address);
          socket.onopen = e => Options.open = !0;

          socket.onclose = e => Options.open = !1;

          socket.onmessage = e => {
            Options.message = e.data;
            forEach(Options.recievers,fn => fn(e.data, e));
          }
          Options.socket = socket;

          return Options;
        }
      },
      observable(obj) {
        Object.defineProperty(obj, 'listeners', {
          value: [],
          enumerable: false,
        });
        Object.defineProperty(obj, 'removeListener', {
          value: fn => obj.listeners = obj.listeners.filter(l => {
            if (l.fn !== fn) return l;
          }),
          enumerable: false,
        });
        Object.defineProperty(obj, 'addListener', {
          value: function (prop, func) {
            if (is.Func(prop) || is.Node(prop)) {
              func = prop;
              prop = '*';
            }
            let listner = {
              prop: is.String(prop) ? prop : '*'
            }
            if (is.Node(func)) {
              if (!is.Func(func['BindListener'])) throw Error('BindListener is not a function');
              listner.node = func;
              listner.fn = func['BindListener'];
            } else if (is.Func(func)) listner.fn = func;
            else throw new Error('no function');
            obj.listeners.push(listner);
          },
          enumerable: false,
        });
        try {
          return new Proxy(obj, {
            get: function (target, key, reciever) {
              return Reflect.get(target, key);
            },
            set: function (target, key, value, reciever) {
              target.listeners.forEach(l => {
                if (l.prop === '*' || l.prop === key) l.fn(target, key, value, !(key in target));
              });
              return Reflect.set(target, key, value);
            }
          });
        } catch (e) {
          try {
            Object.observe(obj, changes => changes.forEach(change => {
              if (change.type === 'add' || change.type === 'update') obj.listeners.forEach(l => {
                if (l.prop === '*' || l.prop === change.name) l.fn(obj, change.name, obj[change.name], change.type === 'add');
              });
            }));
            return obj;
          } catch (e2) {
            console.warn('Your Browser is Old Update it');
          }
        }
      },
      curry: fn => makeFn(fn, [], fn.length),
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
          let later = () => {
              timeout = null;
              if (!immediate) func.apply(this, arguments);
            },
            callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(this, arguments);
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
          } else if (!timeout && options.trailing === true) timeout = setTimeout(later, remaining);
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
      css: (el, styles) => def(styles) && is.Node(el) ? forEach(styles, (prop, key) => el.style[key] = prop) : console.error('invalid args'),
      hasCapitals: string => toArr(string).some(c => is.Uppercase(c)),
      OverrideFunction(funcName, Func, ContextObject) {
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
        forEach(arguments, arg => types.push(typeof arg));
        return types.length < 2 ? types[0] : types;
      },
      toggle: bool => !bool,
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
      WebComponents: [],
      CustomAttributes: [],
      tabActive: true,
      toArr: toArr,
      toInt: toInt,
      /**
       * Tail Call Optimization for recursive functional functions
       * @param fn - function that uses recursion inside
       */
      tco(fn) {
        let active, nextArgs;
        return function () {
          let result;
          nextArgs = arguments;
          if (!active) {
            active = !0;
            while (nextArgs) result = fn.apply(this, [nextArgs, nextArgs = null][0]);
            active = !1;
          }
          return result;
        }
      },
      mouse: {
        x: 0,
        y: 0,
        over: null,
        track: false,
        observe(val) {
          if (is.Bool(val)) {
            Craft.mouse.track = val;
            Craft.mouse.track ? Craft.mouse.eventhandler.On() : Craft.mouse.eventhandler.Off();
          } else return Craft.mouse.track;
        },
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

        let startTime, elapsedTime, start = root.pageYOffset,
          distance = is.String(target) ? options.offset + query(target).getBoundingClientRect().top : target,
          loopIteration = 0,
          loop = time => {
            if (loopIteration === 0) startTime = time;
            loopIteration++;
            elapsedTime = time - startTime;
            root.scrollTo(0, Craft.easing.inOutQuad(elapsedTime, start, distance, options.duration));
            if (elapsedTime < options.duration) requestAnimationFrame(loop)
            else {
              root.scrollTo(0, start + distance);
              if (is.Func(options.func)) options.func.call();
              startTime = undefined;
            }
          };
        requestAnimationFrame(loop)
      },
      /**
       * converts Objects or URL variable strings to a FormData object
       * @param {object|string} val - values to convert
       */
      toFormData(val) {
        let formData = new FormData();
        if (is.String(val)) val = val.split('&');
        forEach(val, v => {
          if (is.String(v)) {
            v = v.split('=');
            if (v.length === 1) v[1] = '';
            formData.append(v[0], v[1]);
          } else formData.append(key, v);
        });
        return formData;
      },
      CSSRule(selector, rules, index, sheet) {
        if (is.Object(rules)) {
          let temp = '';
          forEach(rules, (val, key) => temp += key + ': ' + (val.includes(';') ? val : val + ';\n'));
          rules = temp;
        }
        console.log(rules);
        if (!sheet) sheet = CrafterStyles.sheet;
        sheet.insertRule(selector + "{" + rules + "}", index);
      },
      revokeCSSRule(index) {
        if (is.int(index)) CrafterStyles.sheet.deleteRule(index);
      },
      URLfrom: text => URL.createObjectURL(new Blob([text])),
      OnScroll: (element, func) => is.Func(func) ? On('scroll', element, e => func(e.deltaY < 1, e)) : console.error('no function'),
      OnResize: func => is.Func(func) ? Craft.ResizeHandlers.add(func) : console.error("Craft.OnResize -> no function"),
      OnScrolledTo: Scroll => new Promise((pass, fail) => {
        let ev = On('scroll', e => pageYOffset >= Scroll ? pass(e, ev) : fail(e, ev));
      }),
      WhenScrolledTo: Scroll => new Promise((pass, fail) => Once('scroll', e => pageYOffset >= Scroll || pageYOffset <= Scroll ? pass(e) : fail(e))),
      /**
       * returns a promise when the DOM and WebComponents are all finished loading
       * @param {function} func - function to execute when the DOM and webcomponents are ready
       */
      get WhenReady() {
        return new Promise((pass, fail) => {
          if (Ready) return pass();
          let check = setInterval(() => {
            if (Ready) {
              pass();
              clearInterval(check);
            }
          }, 30);
          setTimeout(() => {
            clearInterval(check);
            if (!Ready) fail('loading took too long loaded with errors :(');
          }, 5500);
        });
      },
      model(name, func) {
        if (is.Func(func) && is.String(name)) {
          if (!def(Craft.Models[name])) Craft.Models[name] = {
            func: func,
            scope: Craft.observable({})
          }
        }
      },
      fromModel(key, val) {
        let cutkey = cutdot(key);
        if (def(Craft.Models[cutkey[0]])) {
          let type = (def(val) ? 'set' : 'get') + 'Deep';
          return cutkey.length === 1 && !def(val) ? Craft.Models[cutkey[0]].scope : Craft[type](Craft.Models[cutkey[0]].scope, Craft.omit(cutkey, cutkey[0]).join('.'), val);
        }
      },
      customAttribute(name, handle) {
        if (is.Func(handle)) {
          Craft.CustomAttributes.push({
            name: name,
            handle: handle
          });

          function apply() {
            queryEach(`[${name}]`, el => {
              el = el.hasDOMmethods ? el : dom(el);
              if (el.hasAttr(name)) {
                if (!is.Array(el.customAttr)) el.customAttr = [];
                if (!el.customAttr.includes(name)) {
                  el.customAttr.push(name);
                  handle(el, el.getAttr(name));
                }
              }
            });
          }
          Ready ? apply() : Craft.WhenReady.then(() => setTimeout(apply, 80));
        }
      },
      poll: (test, interval, timeout) => new Promise((pass, fail) => {
        if (!def(timeout)) interval = timeout;
        let bool = is.Bool(test) && test === true;
        let Interval = setInterval(() => {
          if (bool || (is.Func(test) && test() === true)) {
            pass();
            clearInterval(Interval);
          }
        }, interval || 20);
        if (is.Num(timeout)) setTimeout(() => {
          if (bool || (is.Func(test) && test() === false)) fail();
          clearInterval(Interval);
        }, timeout);
      }),
      /**
       * Usefull method for validating passwords , example Craft.strongPassword('#MyFancyPassword18',8,true,true,"#") -> true requirements met
       * @param {string} pass - string containing the password
       * @param {Number} length - Character length in numbers (Minimum password length)
       * @param {Boolean} caps - Should the password contains Capital Letters
       * @param {Boolean} number - should the password contain Numbers
       * @param {Boolean} reasons - should the function return a short string explaining the reason exept when it's a pass then it gives a bool;
       * @param {...string} includeChars - every extra argument should be a string containing a character you want the password to include
       */
      strongPassword(pass, length, caps, number, reasons) {
        let includeChars = toArr(arguments).slice(5);
        if (pass.length <= length - 1) return reasons ? 'Password too short' : false;
        if (caps === true && Craft.hasCapitals(pass) === false) return reasons ? 'Password should have a Capital letter' : false;
        if (number === true && /\d/g.test(pass) === false) return reasons ? 'Password should have a number' : false;
        if (includeChars.length) {
          let hasChars = true,
            reason = includeChars.join();
          forEach(includeChars, ch => hasChars = pass.includes(ch));
          if (!hasChars) return reasons ? '' : false
        }
        return true;
      },
      /** method for generating random alphanumeric strings*/
      randomString: () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1),
      /**
       * similar to Craft.randomString in that it generates a unique string , in this case a Unique ID with random alphanumeric strings separated by hyphens
       * example 0ebf-c7d2-ef81-2667-08ef-4cde
       * @param {number=} len - optional length of uid sections
       */
      GenUID: (len) => Craft.array(len || 6, Craft.randomString).join('-'),
      /**
       * Part of Crafter.js's own WebComponent format (.wc) it takes a json object that contains .css and .js values then imports and executes them
       * @param {string} webcomponent - JSON string from Crafter.js's (.wc) WebComponent format
       */
      createWebComponent(wc, src) {
        wc = JSON.parse(wc);
        CrafterStyles.textComponent += wc.css;
        head.appendChild(dom().script(wc.js + `\nCraft.WebComponents.push('${src}')`, `${w}=${wc.name}`));
      },
      /**
       * method for creating custom elements configuring their lifecycle's and inheritance
       * the config Object has 5 distinct options ( created , inserted , destroyed , attr and extends )
       * Craft.newComponent('custom-element',{
       * // note : inside each lifecycle method the "this" is a reference to the element being created -> this === element
       *    created() { ... }, // this method gets called when the custom-element is first instanciated
       *    inserted() { ... }, // this method gets called when the custom-element is first inserted into the DOM
       *    destroyed() { ... }, // this method gets called when the custom-element removed from the DOM (AKA. destroyed)
       *    attr(attributeChangedName , oldValue , newValue) { ... }, // attr method gets called when attributes are changed on the element
       *    extends : 'button' //tagName of element being inherited from should you want to
       * });
       * @param {string} tag - a hyphenated custom HTML tagname for the new element -> "custom-element"
       * @param {object} config - Object containing all the element's lifecycle methods / extends and attached methods or properties
       */
      newComponent(tag, config) {
        if (!def(config)) throw new Error(tag + ' : config undefined');
        let element = Object.create(HTMLElement.prototype),
          settings = {};

        forEach(config, (prop, key) => {
          if (key === 'created') element.createdCallback = prop;
          else if (key === 'inserted') element.attachedCallback = prop;
          else if (key === 'destroyed') element.detachedCallback = prop;
          else if (key === 'attr') element.attributeChangedCallback = prop;
          else key === 'extends' ? settings.extends = prop : Object.defineProperty(element, key, Object.getOwnPropertyDescriptor(config, key));
        });

        settings['prototype'] = element;
        doc.registerElement(tag, settings);
      },
      SyncInput(input, obj, key) {
        if (is.String(input)) input = query(input);
        if (is.Input(input)) input[sI] = On(input).Input(e => Craft.setDeep(obj, key, input.value));
      },
      disconectInputSync(input) {
        if (is.String(input)) input = query(input);
        if (is.Node(input) && def(input[sI])) {
          input[sI].Off();
          delete input[sI];
        }
      },
  };

  Craft.ForEach = Craft.tco((collection, func, i = 0) => {
    if (collection.length !== i) {
      func(collection[i], i);
      ForEach(collection, func, i + 1);
    }
  });

  root.CraftScope = Craft.observable({});

  On('blur', e => Craft.tabActive = !1);
  On('focus', e => Craft.tabActive = !0);

  Craft.Models = Craft.observable({});

  Craft.Models.addListener((o, key, model, New) => {
    if (New) Ready ? model.func(model.scope) : Craft.WhenReady.then(() => model.func(model.scope));
  });

  Craft.curry.to = Craft.curry((arity, fn) => makeFn(fn, [], arity));
  Craft.curry.adaptTo = Craft.curry((num, fn) => Craft.curry.to(num, (context, ...args) => fn.apply(null, args.slice(1).concat(context))));
  Craft.curry.adapt = fn => Craft.curry.adaptTo(fn.length, fn);
  Craft.loader.removeAll(true);
  Craft.mouse.eventhandler = On('mousemove', e => {
    if (Craft.mouse.track === true) {
      Craft.mouse.x = e.clientX;
      Craft.mouse.y = e.clientY;
      Craft.mouse.over = e.target;
    }
  });

  Craft.newComponent(fw, {
    inserted() {
      let src = this.getAttribute('src');
      if (!nil(src)) {
        let wc = null,
          el = dom(this),
          cc = 'cache-component';
        if (!Craft.WebComponents.includes(src)) {
          if (el.hasAttr(cc)) {
            wc = localStorage.getItem(src);
            if (!nil(wc)) Craft.createWebComponent(wc, src);
          }
          if (nil(wc)) fetch(src).then(res => res.json().then(webcomponent => {
            CrafterStyles.innerHTML += webcomponent.css;
            head.appendChild(dom().script(webcomponent.js + `\nCraft.WebComponents.push('${src}')`, w + `=${webcomponent.name}`));
            if (el.getAttr(cc) == 'true') localStorage.setItem(src, JSON.stringify(webcomponent));
          })).catch(err => console.error(err + " couldn't load " + w));
        }
        el.removeAfter(3500);
      }
    }
  });


  Craft.customAttribute('link', (el, link) => On(el).Click(e => (el.hasAttr('newtab') ? open : Craft.router.open)(link)));

  Craft.customAttribute('bind', (el, bind) => {
    try {
      let cutbind = cutdot(bind),
        prop = cutbind[cutbind.length - 1],
        obj = def(Craft.Models[cutbind[0]]) ? Craft.Models[cutbind[0]].scope : Craft.getDeep(root, Craft.omit(cutbind, prop).join('.')) || CraftScope,
        val = Craft.getDeep(obj, cutbind.length > 1 ? Craft.omit(cutbind, cutbind[0]).join('.') : prop);

      def(val) ? el.html(val) : Craft.setDeep(obj, prop, el.html());

      if (def(Object.getOwnPropertyDescriptor(obj, 'addListener')) && !is.Func(el['BindListener'])) {
        el.BindListener = (o, n, v) => el.html(v);
        obj.addListener(prop, el);
      }
      if (is.Input(el)) el.SyncInput(obj, cutbind.length == 1 ? cutbind[0] : Craft.omit(cutbind, cutbind[0]).join('.'));
    } catch (e) {
      console.log(e);
      console.warn("couldn't bind :", el);
    }
  });

  function manageAttr(el) {
    dom(el);
    for (let attr of Craft.CustomAttributes) {
      if (el.hasAttr(attr.name)) {
        if (!is.Array(el.customAttr)) el.customAttr = [];
        if (!el.customAttr.includes(attr.name)) {
          el.customAttr.push(attr.name);
          attr.handle(el, el.getAttr(attr.name));
        }
        break;
      }
    }
  }


  Once('DOMContentLoaded', () => {
    Craft.router.links.forEach(link => link());
    Craft.WebComponents.length === queryAll(fw).length ? Ready = true :
      Craft.poll(() => Craft.WebComponents.length === queryAll(fw).length, 35, 5035)
      .then(() => {
        Ready = true;
        Craft.DomObserver = new MutationObserver(muts => {
          for (let mut of muts) {
            forEach(mut.addedNodes, el => {
              if (def(el['hasAttribute'])) manageAttr(el);
            });
            manageAttr(mut.target);
          }
        });
        Craft.DomObserver.observe(doc.body, {
          attributes: true,
          childList: true,
          subtree: true,
        });
      }).catch(() => {
        Ready = true;
        console.warn('loading took too long loaded with errors :(');
      });
  });

  On('hashchange',() => {
    for (let handle of Craft.router.handlers)
      if (Locs(l => l === handle.link)) handle.func(location.hash);
  });

  root.forEach = forEach;
})(document, self);
