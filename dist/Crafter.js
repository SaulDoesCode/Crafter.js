/*
 *  Saul's Crafter JS
 *  License MIT
 *   /[^{}]+(?=\})/g    find between curly braces
 */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var ua = navigator.userAgent,
    tem,
    M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) M[2] = tem[1];
M ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];

window.CurrentBrowser = {
  is: function is(browser) {
    if (CurrentBrowser.browser.toLowerCase().includes(browser.toLowerCase())) return true;
    return false;
  },
  browser: M.join(' ')
};

(function () {

  var isStr = function isStr(obj, str) {
    return toString.call(obj) === str;
  },
      isT = function isT(val, str) {
    return (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === str;
  },
      nT = function nT(val, str) {
    return (typeof val === 'undefined' ? 'undefined' : _typeof(val)) !== str;
  };

  window.is = {
    Func: function Func(func) {
      return typeof func === 'function';
    },
    Bool: function Bool(val) {
      return typeof val === 'boolean';
    },
    Undef: function Undef() {
      if (arguments.length > 1) {
        for (var i = 0; i < arguments.length; i++) if (typeof arguments[i] === 'undefined') return false;
        return true;
      }
      return isT(arguments[0], 'undefined');
    },
    Def: function Def() {
      if (arguments.length > 1) {
        for (var i = 0; i < arguments.length; i++) if (nT(arguments[i], 'undefined')) return false;
        return true;
      }
      return nT(arguments[0], 'undefined');
    },
    Arr: function Arr(val) {
      return Array.isArray(val);
    },
    String: function String(val) {
      return isT(val, 'string');
    },
    Num: function Num(val) {
      return isT(val, 'number');
    },
    Null: function Null(val) {
      if (arguments.length > 1) {
        for (var i = 0; i < arguments.length; i++) if (arguments[i] === null) return true;
        return false;
      }
      return val === null;
    },
    Node: (function (_Node) {
      function Node(_x) {
        return _Node.apply(this, arguments);
      }

      Node.toString = function () {
        return _Node.toString();
      };

      return Node;
    })(function (val) {
      if (arguments.length > 1) {
        for (var i = 0; i < arguments.length; i++) if (is.Null(arguments[i]) || !(arguments[i] instanceof Node)) return false;
        return true;
      }
      return !is.Null(val) && val instanceof Node;
    }),
    NodeList: (function (_NodeList) {
      function NodeList(_x2) {
        return _NodeList.apply(this, arguments);
      }

      NodeList.toString = function () {
        return _NodeList.toString();
      };

      return NodeList;
    })(function (val) {
      if (arguments.length > 1) {
        for (var i = 0; i < arguments.length; i++) if (arguments[i] === null || !(arguments[i] instanceof NodeList)) return false;
        return true;
      }
      return !is.Null(val) && val instanceof NodeList;
    }),
    File: function File(obj) {
      return isStr(obj, '[object File]');
    },
    FormData: function FormData(obj) {
      return isStr(obj, '[object FormData]');
    },
    Blob: function Blob(obj) {
      return isStr(obj, '[object Blob]');
    },
    Object: function Object(obj) {
      return isStr(obj, '[object Object]');
    },
    RegExp: function RegExp(obj) {
      return isStr(obj, '[object RegExp]');
    },
    Date: function Date(obj) {
      return isStr(obj, '[object Date]');
    },
    Map: function Map(obj) {
      return isStr(obj, '[object Map]');
    },
    Set: function Set(obj) {
      return isStr(obj, '[object Set]');
    },
    Symbol: function Symbol(obj) {
      return isStr(obj, '[object Symbol]');
    },
    Element: function Element(obj) {
      return isStr(obj, '[object HTMLElement]');
    },
    UpperCase: function UpperCase(char) {
      return char >= 'A' && char <= 'Z';
    },
    Email: function Email(email) {
      return (/(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/.test(email)
      );
    },
    Native: function Native(val) {
      var type = typeof val === 'undefined' ? 'undefined' : _typeof(val);
      return type === 'function' ? RegExp('^' + String(Object.prototype.toString).replace(/[.*+?^${}()|[\]\/\\]/g, '\\$&').replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$').test(Function.prototype.toString.call(val)) : val && type == 'object' && /^\[object .+?Constructor\]$/.test(val.toString) || false;
    },
    Between: function Between(val, max, min) {
      return val <= max && val >= min;
    },
    lt: function lt(val, other) {
      return val < other;
    },
    lte: function lte(val, other) {
      return val <= other;
    }
  };

  window.forEach = function (iterable, func) {
    if (is.Func(func)) {
      var index = 0;
      if (is.Arr(iterable) || is.NodeList(iterable) || is.String(iterable)) {
        for (; index < iterable.length; index++) func(iterable[index], index);
      } else if (is.Object(iterable)) {
        for (index in iterable) if (iterable.hasOwnProperty(index)) func(iterable[index], index);
      }
    } else log("err", "No Function Provided for forEach");
  };

  window.query = function (selector, element) {
    if (is.Undef(element)) return document.querySelector(selector);
    return element.querySelector(selector);
  };

  window.queryAll = function (selector, element) {
    if (is.Undef(element)) return document.querySelectorAll(selector);
    return element.querySelectorAll(selector);
  };

  window.$ = function (selector, forceSelectAll, noCraft) {
    var element = queryAll(selector);
    if (!is.Null(element)) {
      if (element.length > 1 || forceSelectAll === true && is.NodeList(element)) {
        return noCraft ? element : craft(element);
      } else if (is.Node(element[0]) || forceSelectAll === false) return noCraft ? element[0] : craft(element[0]);
    }
    return null;
  };

  window.log = function (type, msg) {
    switch (type) {
      case 'err':
        console.error(msg);
        break;
      case 'warn':
        console.warn(msg);
        break;
      case 'success':
        console.log('%c' + msg, 'color:green;');
        break;
      case 'info':
        console.info(msg);
        break;
      default:
        console.log(type);
    }
  };

  window.On = function (eventType, SelectorNode, func) {
    if (is.Def(SelectorNode)) {
      if (is.String(SelectorNode)) {
        forEach(queryAll(SelectorNode), function (el) {
          return el.addEventListener(eventType, function (e) {
            return func(e, e.target);
          });
        });
      } else if (is.Node(SelectorNode) || SelectorNode === window || SelectorNode === document) {
        SelectorNode.addEventListener(eventType, function (e) {
          return func(e, e.target);
        });
      } else if (is.NodeList(SelectorNode)) {
        forEach(SelectorNode, function (el) {
          return el.addEventListener(eventType, function (e) {
            return func(e, e.target);
          });
        });
      } else if (is.Func(SelectorNode)) window.addEventListener(eventType, function (e) {
        return SelectorNode(e, e.target);
      });
    }
  };

  window.Off = function (eventType, SelectorNode, func) {
    if (SelectorNode !== undefined) {
      if (is.String(SelectorNode)) {
        forEach(queryAll(SelectorNode), function (el) {
          return el.removeEventListener(eventType, function (e) {
            return func(e, e.target);
          });
        });
      } else if (is.Node(SelectorNode) || SelectorNode === window || SelectorNode === document) {
        SelectorNode.removeEventListener(eventType, function (e) {
          return func(e, e.target);
        });
      } else if (is.NodeList(SelectorNode)) {
        forEach(SelectorNode, function (el) {
          return el.removeEventListener(eventType, function (e) {
            return func(e, e.target);
          });
        });
      } else if (is.Func(SelectorNode)) window.removeEventListener(eventType, function (e) {
        return SelectorNode(e, e.target);
      });
    }
  };

  window.craft = function (element) {
    if (is.NodeList(element)) {
      element.forEach = function (func) {
        if (is.Func(func)) {
          for (var index = 0; index < element.length; index++) func(craft(element[index]), index);
        } else log("err", "No function Provided for NodeList.forEach");
      };
      element.On = function (eventType, func) {
        On(eventType, element, func);
        return element;
      };
      element.Off = function (eventType, func) {
        element.forEach(function (element, i) {
          return element.removeEventListener(eventType, function (e) {
            return is.Def(e.target) && is.Node(e.target) ? func(e, craft(e.target), i) : func(e, e.target, i);
          });
        });
        return element;
      };
      element.includes = function (SelectorNode) {
        if (is.String(SelectorNode)) SelectorNode = query(SelectorNode);
        if (is.Node(SelectorNode)) for (var index = 0; index < element.length; index++) if (element[index] === SelectorNode) return true;
        return false;
      };
      element.css = function (styles) {
        return is.Def(styles) ? forEach(element, function (el) {
          return forEach(styles, function (prop, key) {
            return el.style[key] = prop;
          });
        }) : log("err", 'invalid styles');
      };
    } else if (is.Node(element)) {
      element.getSiblings = function () {
        var siblings = [];
        var AllChildren = element.parentNode.childNodes;
        for (var i = 0; i < AllChildren.length; i++) {
          if (AllChildren[i] !== element) siblings.push(AllChildren[i]);
        }
        return siblings;
      };
      element.getWidth = function () {
        return element.getBoundingClientRect().width;
      };
      element.getHeight = function () {
        return element.getBoundingClientRect().height;
      };
      element.getRect = function () {
        return element.getBoundingClientRect();
      };
      element.On = function (eventType, func) {
        On(eventType, element, func);
        return element;
      };
      element.find = function (selector, forceSelectAll, returncraft) {
        var Localelement = queryAll(selector, element);
        if (Localelement.length > 1 || forceSelectAll === true && !is.Null(Localelement) && is.NodeList(Localelement)) {
          return craft(Localelement);
        } else if (!is.Null(Localelement) && is.Node(Localelement[0])) {
          if (returncraft === false) return Localelement[0];
          return craft(Localelement[0]);
        }
        return null;
      };
      element.replace = function (el) {
        return element.parentNode.replaceChild(el, element);
      };
      element.remove = function () {
        return element.parentNode.removeChild(element);
      };
      element.append = function (val) {
        is.String(val) ? element.innerHTML += val : element.appendChild(element);
        return element;
      };
      element.prepend = function (val) {
        is.String(val) ? element.innerHTML = val + element.innerHTML : element.insertBefore(val, element.firstChild);
        return element;
      };
      element.hasChild = function (SelectorNode) {
        if (is.String(SelectorNode)) SelectorNode = query(SelectorNode, element);
        if (is.Node(SelectorNode) && !is.Null(SelectorNode)) return true;
        return false;
      };
      element.hasClass = function (className, func) {
        var has = false;
        element.classList.contains(className) ? has = true : has = false;
        if (is.Def(func) && is.Func(func)) func(has);
        return has;
      };
      element.isTag = function (Tagname, func) {
        if (element.tagName === Tagname.toUpperCase()) {
          if (is.Def(func) && is.Func(func)) func(craft(element));
          return true;
        }
        return false;
      };
      element.css = function (styles) {
        return is.Def(styles) ? forEach(styles, function (prop, key) {
          return element.style[key] = prop;
        }) : log('err', 'Styles Object undefined');
      };
      element.hide = function (speed, timingFunction) {
        if (is.Undef(timingFunction)) timingFunction = 'linear';
        if (is.Undef(speed)) speed = 0;

        function HideElement() {
          element.style.transition = 'opacity ' + speed + 'ms ' + timingFunction;
          element.style.opacity = '0';
          element.effectInProgress = {
            status: true,
            type: 'hide'
          };
          setTimeout(function () {
            element.style.display = 'none';
            element.style.transition = '';
            element.effectInProgress = {
              status: false,
              type: 'none'
            };
          }, speed);
        }

        if (is.Def(element.effectInProgress) && element.effectInProgress.status === true) {
          var CheckDone = setInterval(function () {
            if (element.effectInProgress.status === false) {
              HideElement();
              clearInterval(CheckDone);
            }
          }, 10);
        } else HideElement();
        return element;
      };
      element.show = function (speed, timingFunction) {
        if (is.Undef(timingFunction)) timingFunction = 'linear';
        if (is.Undef(speed)) speed = 0;

        function ShowElement() {
          element.style.transition = 'opacity ' + speed + 'ms ' + timingFunction;
          element.style.display = '';
          element.style.opacity = '1';
          element.effectInProgress = {
            status: true,
            type: 'show'
          };
          setTimeout(function () {
            element.style.opacity = '';
            element.style.transition = '';
            element.effectInProgress = {
              status: false,
              type: 'none'
            };
          }, speed);
        }
        if (is.Def(element.effectInProgress) && element.effectInProgress.status === true) {
          var CheckDone = setInterval(function () {
            if (element.effectInProgress.status === false) {
              ShowElement();
              clearInterval(CheckDone);
            }
          }, 10);
        } else ShowElement();
        return element;
      };
    }
    if (is.String(element)) return $(element);
    return element;
  };

  window.Craft = {
    ArraytoObject: function ArraytoObject(arr) {
      var NewObject = {};
      for (var i in arr) if (is.Def(arr[i])) NewObject[i] = arr[i];
      return NewObject;
    },
    IndexOfArrInArr: function IndexOfArrInArr(Arr, searchArr) {
      for (var i = 0; i < searchArr.length; i++) {
        if (Arr[0] === searchArr[i]) {
          for (var c = 0; c < Arr.length; c++) {
            if (Arr[c] === searchArr[i + c]) {
              if (c == Arr.length - 1) {
                return i;
              } else continue;
            } else break;
          }
        }
      }
      return -1;
    },
    bindNode: function bindNode(SelectorNode, ContextObject, func) {
      var element = is.Node(SelectorNode) ? SelectorNode : query(SelectorNode),
          Changes;
      if (is.Func(ContextObject)) {
        func = ContextObject;
        ContextObject = Craft.Scope;
      }
      if (!is.Null(element) && is.Def(func) && is.Func(func)) {
        element.isbound = true;
        Object.observe(ContextObject, function (changes) {
          if (element.isbound) {
            changes.forEach(function (ch) {
              Changes = ch;
              func(element, ch);
            });
          }
        });
        func(element, Changes);
      } else log("err", "No matching element");
    },
    unbindNode: function unbindNode(SelectorNode, func) {
      var element = is.Node(SelectorNode) ? SelectorNode : query(SelectorNode);
      if (!is.Null(element)) {
        element.isbound = false;
        func(element);
      } else log("err", "No matching element");
    },
    after: function after(n, func) {
      if (!is.Func(func)) {
        if (is.Func(n)) {
          var temp = n;
          n = func;
          func = temp;
        } else log("err", "after : func is not a function");
      }
      n = Number.isFinite(n = +n) ? n : 0;
      return function () {
        if (--n < 1) return func.apply(this, arguments);
      };
    },
    debounce: function debounce(wait, func, immediate) {
      var timeout;
      return function () {
        var context = this,
            args = arguments;
        var later = function later() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    },
    throttle: function throttle(wait, func, options) {
      var context,
          args,
          result,
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
      var res;
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
      }) : log('err', 'invalid args');
    },
    hasCapitals: function hasCapitals(string) {
      for (var i = 0; i < string.length; i++) if (is.UpperCase(string[i])) return true;
      return false;
    },
    OverrideFunction: function OverrideFunction(funcName, Func, ContextObject) {
      var namespaces = funcName.split("."),
          func = namespaces.pop();
      for (var _i = 0; _i < namespaces.length; _i++) {
        ContextObject = ContextObject[namespaces[_i]];
      }ContextObject[func] = Func;
    },
    concatObjects: function concatObjects(hostobj) {
      for (var _len = arguments.length, Objs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        Objs[_key - 1] = arguments[_key];
      }

      forEach(hostobj, function () {
        Objs.forEach(function (obj) {
          forEach(obj, function (prop, key) {
            if (key in hostobj) {
              if (is.Arr(hostobj[key])) {
                if (!hostobj[key].includes(prop)) hostobj[key].push(prop);
              } else if (prop !== hostobj[key]) {
                hostobj[key] = [prop, hostobj[key]];
              }
            } else {
              hostobj[key] = prop;
            }
          });
        });
      });
      return hostobj;
    },
    mergeObjects: function mergeObjects(hostobj) {
      for (var _len2 = arguments.length, Objs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        Objs[_key2 - 1] = arguments[_key2];
      }

      return Object.assign(hostobj, Objs);
    },
    len: function len(val) {
      if (is.Object(val)) return Object.keys(val).length;
      if (is.Map(val) || is.Set(val)) return val.size;
      var val_length = undefined;
      try {
        val_length = val.length;
      } catch (e) {
        try {
          val_length = val.size;
        } catch (err) {
          log('err', 'could not find length of value');
        }
      }
      return val_length;
    },
    indexOfDate: function indexOfDate(Collection, date) {
      for (var _i2 = 0; _i2 < undefined.length; _i2++) {
        if (+undefined[_i2] === +date) return _i2;
      }return -1;
    },
    removeArrItem: function removeArrItem(Arr, val) {
      var index = Arr.IndexOf(val),
          temp = [],
          i = 0;
      for (; i < Arr.length; i++) if (i !== index) temp.push(Arr[i]);
      return temp;
    },
    omit: function omit(obj, val) {
      if (is.Object(obj)) {
        if (obj !== val) {
          forEach(obj, function (prop, key) {
            if (val === key || val === prop) delete obj[key];
          });
        }
        if (obj.hasOwnProperty(val)) log('err', 'couldn\'t omit ' + val + 'from Object');
      } else if (is.Arr(obj) || is.String(obj)) {
        obj.forEach(function (i) {
          if (val === i) obj = Craft.removeArrItem(obj, i);
        });
        if (val.IndexOf(i) !== -1) log('err', 'couldn\'t omit ' + val + 'from Array or String');
      }
      return obj;
    },
    Scope: {},
    mouse: {
      x: 0,
      y: 0
    },
    nodeExists: function nodeExists(selector, within) {
      if (is.Node(within)) return queryAll(selector, within) !== null;
      return queryAll(selector) !== null;
    },
    ObjToFormData: function ObjToFormData(obj) {
      var formData = new FormData(),
          key;
      for (key in obj) formData.append(key, obj[key]);
      return formData;
    },
    URLfrom: function URLfrom(text) {
      return URL.createObjectURL(new Blob([text]));
    },
    cookie: {
      getItem: function getItem(item) {
        if (!item) return null;
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(item).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
      },
      setItem: function setItem(item, itemValue, EndOfLife, Path, Domain, isSecure) {
        if (!item || /^(?:expires|max\-age|path|domain|secure)$/i.test(item)) return false;
        var EOLdate = "";
        if (EndOfLife) {
          if (is.Num(EndOfLife)) {
            EOLdate = EndOfLife === Infinity ? "; expires=Fri, 11 April 9997 23:59:59 GMT" : "; max-age=" + EndOfLife;
          } else if (is.String(EndOfLife)) {
            EOLdate = "; expires=" + EndOfLife;
          } else if (is.Date(EndOfLife)) {
            EOLdate = "; expires=" + EndOfLife.toUTCString();
          } else log("err", "Expiry date is not a Number/String/Date");
        }
        document.cookie = encodeURIComponent(item) + "=" + encodeURIComponent(itemValue) + EOLdate + (Domain ? "; domain=" + Domain : "") + (Path ? "; path=" + Path : "") + (isSecure ? "; secure" : "");
        return true;
      },
      removeItem: function removeItem(item, Path, Domain) {
        if (!Craft.cookie.itemExists(item)) return false;
        document.cookie = encodeURIComponent(item) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (Domain ? "; domain=" + Domain : "") + (Path ? "; path=" + Path : "");
        return true;
      },
      itemExists: function itemExists(item) {
        if (!item) return false;
        return new RegExp("(?:^|;\\s*)" + encodeURIComponent(item).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie);
      },
      CookieKeys: function CookieKeys() {
        var Keys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (var KeysLength = Keys.length, IDx = 0; IDx < KeysLength; IDx = IDx + 1) Keys[IDx] = decodeURIComponent(Keys[IDx]);
        return Keys;
      }
    },
    OnResize: function OnResize(func) {
      return is.Func(func) ? Craft.ResizeHandlers.add(func) : log("err", "TypeError : Craft.OnResize -> func is not a function");
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
      makeLink: function makeLink(Selector, link, newtab, eventType) {
        return Craft.router.links.push(function () {
          return On(is.Undef(eventType) ? 'click' : eventType, query(Selector), function (e) {
            return Craft.router.open(link, newtab);
          });
        });
      },
      open: (function (_open) {
        function open(_x3, _x4) {
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
        return document.title = title;
      },
      setView: function setView(viewHostSelector, view) {
        return query(viewHostSelector).innerHTML = view;
      },
      fetchView: function fetchView(viewHostSelector, viewURL, cache, id) {
        if (is.Null(localStorage.getItem("RT_" + id)) || is.Undef(localStorage.getItem("RT_" + id))) {
          fetch(viewURL).then(function (res) {
            res.text().then(function (txt) {
              if (cache && is.Def(id) && is.String(id) && (is.Null(localStorage.getItem("RT_" + id)) || is.Undef(localStorage.getItem("RT_" + id)))) localStorage.setItem("RT_" + id, txt);
              query(viewHostSelector).innerHTML = txt;
            });
          }).catch(function (msg) {
            return log('warn', 'Could not fetch view -> ' + msg);
          });
        } else if (cache) query(viewHostSelector).innerHTML = localStorage.getItem("RT_" + id);
      },
      clearCache: function clearCache() {
        for (var i in localStorage) if (localStorage.key(i).includes("RT_")) localStorage.removeItem(localStorage.key(i));
      }
    },
    randomString: function randomString() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    },
    GenUID: function GenUID() {
      return Craft.randomString() + Craft.randomString() + '-' + Craft.randomString() + '-' + Craft.randomString() + '-' + Craft.randomString() + '-' + Craft.randomString() + Craft.randomString() + Craft.randomString();
    },
    newComponent: function newComponent(Name, config) {
      if (is.Undef(config)) {
        log("err", "Invalid Component Configuration");
      } else {
        var element = Object.create(HTMLElement.prototype);
        forEach(config, function (prop, key) {
          if (key === 'created') {
            element.createdCallback = prop;
          } else if (key === 'inserted') {
            element.attachedCallback = prop;
          } else if (key === 'destroyed') {
            element.detachedCallback = prop;
          } else if (key === 'attr') {
            element.attributeChangedCallback = prop;
          } else if (is.Func(prop)) {
            element[key] = prop;
          } else if (key !== 'extends' && !is.Func(prop)) element[key] = prop;
        });
        if ('extends' in config) {
          document.registerElement(Name, {
            prototype: element,
            extends: config.extends
          });
        } else {
          document.registerElement(Name, {
            prototype: element
          });
        }
      }
    }
  };

  window.FunctionIterator = (function () {
    function FuncIterator() {
      _classCallCheck(this, FuncIterator);

      this.functions = {};
      this.length = Object.keys(this.functions).length;
    }

    _createClass(FuncIterator, [{
      key: 'has',
      value: function has(funcName) {
        if (this.functions.has(funcName)) return true;
        return false;
      }
    }, {
      key: 'add',
      value: function add(funcName, func) {
        if (is.Func(func)) {
          this.functions[funcName] = func;
        } else if (is.Func(funcName)) {
          this.functions[Craft.randomString()] = funcName;
        } else log("err", "Invalid function parameter in FunctionIterator.add(funcName , _function_ )");
        this.length = Object.keys(this.functions).length;
      }
    }, {
      key: 'remove',
      value: function remove(funcName) {
        if (this.functions.has(funcName)) {
          this.functions[funcName] = null;
          delete this.functions[funcName];
        } else log("warn", "No Such Function Entry in FunctionIterator");
        this.length = Object.keys(this.functions).length;
      }
    }, {
      key: 'removeAll',
      value: function removeAll() {
        delete this.functions;
        this.functions = null;
        this.functions = {};
        this.length = Object.keys(this.functions).length;
      }
    }, {
      key: 'runEach',
      value: function runEach() {
        for (var i in this.functions) this.functions[i].apply(this, arguments);
      }
    }, {
      key: 'runOne',
      value: function runOne(funcName, arg) {
        this.functions.hasOwnProperty(funcName) ? this.functions[funcName].apply(this, arg, arguments) : log("warn", "No Such Function Entry in FunctionIterator");
      }
    }]);

    return FuncIterator;
  })();

  Craft.ResizeHandlers = new FunctionIterator();

  window.onresize = Craft.throttle(450, function (e) {
    return Craft.ResizeHandlers.runEach(e);
  });
  window.onmousemove = function (ev) {
    Craft.mouse.x = ev.clientX;
    Craft.mouse.y = ev.clientY;
  };
  var DomReady = false,
      Ready = false && DomReady;

  On('DOMContentLoaded', function () {
    forEach(queryAll('[link]'), function (el) {
      return On('click', el, function (e) {
        return el.hasAttribute('newtab') ? open(el.getAttribute('link')) : Craft.router.open(el.getAttribute('link'));
      });
    });
    Craft.router.links.forEach(function (link) {
      return link();
    });
    DomReady = true;
  });

  On('WebComponentsReady', function (e) {
    Ready = true && DomReady;
    setTimeout(function () {
      if (!Ready) Ready = true;
    }, 3500);
  });
  window.WhenReady = function () {
    return new Promise(function (resolve, reject) {
      if (Ready) {
        if (Current.browser.includes("Firefox")) {
          setTimeout(function () {
            return resolve(Craft.Scope);
          }, 600);
        } else resolve(Craft.Scope);
      } else {
        var ReadyYet = setInterval(function () {
          if (Ready) {
            if (CurrentBrowser.browser.includes("Firefox") || CurrentBrowser.browser.includes("msie")) {
              setTimeout(function () {
                return resolve(Craft.Scope);
              }, 650);
              resolve(Craft.Scope);
            } else resolve(Craft.Scope);
            clearInterval(ReadyYet);
          }
        }, 50);
        setTimeout(function () {
          if (!Ready) reject("WebComponents didn't load correctly/intime -> load failed");
        }, 4500);
      }
    });
  };

  On('hashchange', function (e) {
    return Craft.router.handlers.forEach(function (handler) {
      return location.hash === handler.link || location === handler.link ? handler.func() : null;
    });
  });

  Object.observe(Craft.Scope, function (changes) {
    changes.forEach(function (change) {
      forEach(queryAll('[view-bind]'), function (el) {
        if (is.Def(Craft.Scope[el.getAttribute('view-bind')])) el.innerHTML = Craft.Scope[el.getAttribute('view-bind')];
      });
    });
  });
})();