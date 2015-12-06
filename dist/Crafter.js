/** @license MIT
 *  @overview Crafter.js , minimalist front-end library
 *  @author Saul van der Walt - https://github.com/SaulDoesCode/
 *   /[^{}]+(?=\})/g    find between curly braces
 */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

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
      Ready = false,
      head = doc.getElementsByTagName('head')[0],
      CrafterStyles = doc.createElement('style'),
      ua = navigator.userAgent,
      tem = undefined,
      Br = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
  if (Br && (tem = ua.match(/version\/([\.\d]+)/i)) !== null) Br[2] = tem[1];
  Br ? [Br[1], Br[2]] : [navigator.appName, navigator.appVersion, '-?'];

  root.CurrentBrowser = {
    is: function is(browser) {
      if (CurrentBrowser.browser.toLowerCase().includes(browser.toLowerCase())) return true;
      return false;
    },
    browser: Br.join(' ')
  };

  CrafterStyles.setAttribute('crafterstyles', '');
  CrafterStyles.innerHTML = '\n@keyframes NodeInserted {from {opacity:.99;}to {opacity: 1;}}[view-bind] {animation-duration: 0.001s;animation-name: NodeInserted;}';
  head.appendChild(CrafterStyles);
  CrafterStyles = doc.querySelector('[crafterstyles]', head);

  root.is = {
    Bool: function Bool(val) {
      return typeof val === 'boolean';
    },
    Arr: function Arr(val) {
      return Array.isArray(val);
    },
    Arraylike: function Arraylike(val) {
      if ('length' in val && val !== window && !is.Func(val)) {
        if (is.Num(val.length)) return true;
      }
      return false;
    },
    String: function String(val) {
      return isT(val, 'string');
    },
    Num: function Num(val) {
      return isT(val, 'number');
    },
    Undef: function Undef() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return args.every(function (o) {
        return isT(o, 'undefined');
      });
    },
    Def: function Def() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return args.every(function (o) {
        return nT(o, 'undefined');
      });
    },
    Null: function Null() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return args.every(function (o) {
        return o === null;
      });
    },
    Node: (function (_Node) {
      function Node() {
        return _Node.apply(this, arguments);
      }

      Node.toString = function () {
        return _Node.toString();
      };

      return Node;
    })(function () {
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return args.every(function (o) {
        return o instanceof Node;
      });
    }),
    NodeList: function NodeList() {
      for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      for (var i = 0; i < args.length; i++) if (Array.from(args[i]).every(function (n) {
        return is.Node(n);
      })) return true;
      return false;
    },
    Object: function Object() {
      for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      return args.every(function (o) {
        return type(o, '[object Object]');
      });
    },
    Element: function Element() {
      for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      return args.every(function (o) {
        return type(o, '[object HTMLElement]');
      });
    },
    File: function File() {
      for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }

      return args.every(function (o) {
        return type(o, '[object File]');
      });
    },
    FormData: function FormData() {
      for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }

      return args.every(function (o) {
        return type(o, '[object FormData]');
      });
    },
    Map: function Map() {
      for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        args[_key10] = arguments[_key10];
      }

      return args.every(function (o) {
        return type(o, '[object Map]');
      });
    },
    Func: function Func() {
      for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
        args[_key11] = arguments[_key11];
      }

      return args.every(function (o) {
        return typeof o === 'function';
      });
    },
    Blob: function Blob(obj) {
      return type(obj, '[object Blob]');
    },
    RegExp: function RegExp(obj) {
      return type(obj, '[object RegExp]');
    },
    Date: function Date(obj) {
      return type(obj, '[object Date]');
    },
    Set: function Set(obj) {
      return type(obj, '[object Set]');
    },
    Symbol: function Symbol(obj) {
      return type(obj, '[object Symbol]');
    },
    UpperCase: function UpperCase(char) {
      return char >= 'A' && char <= 'Z';
    },
    Email: function Email(email) {
      return (/(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/.test(email)
      );
    },
    Between: function Between(val, max, min) {
      return val <= max && val >= min;
    },
    lt: function lt(val, other) {
      return val < other;
    },
    lte: function lte(val, other) {
      return val <= other;
    },
    bt: function bt(val, other) {
      return val > other;
    },
    bte: function bte(val, other) {
      return val >= other;
    },
    Native: function Native(val) {
      var type = typeof val === 'undefined' ? 'undefined' : _typeof(val);
      return type === 'function' ? RegExp('^' + String(Object.prototype.toString).replace(/[.*+?^${}()|[\]\/\\]/g, '\\$&').replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$').test(Function.prototype.toString.call(val)) : val && type == 'object' && /^\[object .+?Constructor\]$/.test(val.toString) || false;
    }
  };

  root.forEach = function (iterable, func) {
    if (is.Func(func)) {
      var _i = 0;
      if (!is.Object(iterable)) {
        for (; _i < iterable.length; _i++) func(iterable[_i], _i);
      } else {
        for (_i in iterable) if (iterable.hasOwnProperty(_i)) func(iterable[_i], _i);
      }
    } else throw new Error("forEach : invalid or undefined function provided");
  };

  root.QueryOrNodetoNodeArray = function (val) {
    if (is.String(val)) val = queryAll(val);
    if (is.Null(val)) return null;
    if (is.Node(val)) return [val];
    if (is.NodeList(val)) return Array.from(val);
  };

  root.query = function (selector, element) {
    if (is.String(element)) return doc.querySelector(element).querySelector(selector);
    if (is.Node(element)) return element.querySelector(selector);
    return doc.querySelector(selector);
  };
  root.queryAll = function (selector, element) {
    if (is.String(element)) return doc.querySelector(element).querySelectorAll(selector);
    if (is.Node(element)) return element.querySelectorAll(selector);
    return doc.querySelectorAll(selector);
  };

  root.queryEach = function (selector, element, func) {
    if (is.Func(element)) {
      func = element;
      element = doc;
    }
    var elements = undefined;
    if (is.String(element)) elements = doc.querySelector(element).querySelectorAll(selector);
    elements = element.querySelectorAll(selector);
    for (var _i2 = 0; _i2 < elements.length; _i2++) {
      func(elements[_i2], _i2);
    }
  };

  root.log = function (Type, msg) {
    switch (Type) {
      case 'err' || 'e':
        console.error(msg);
        break;
      case 'warn' || 'w':
        console.warn(msg);
        break;
      case 'success' || 's':
        console.log('%c' + msg, 'color:green;');
        break;
      case 'info' || 'i':
        console.info(msg);
        break;
      default:
        console.log(Type);
    }
  };

  root.EventHandler = (function () {
    function EventHandler(EventType, Target, Func) {
      var _this = this;

      _classCallCheck(this, EventHandler);

      this.EventType = EventType;
      this.Func = Func;
      this.Target = Target !== window && Target !== document ? QueryOrNodetoNodeArray(Target) : Target;
      this.FuncWrapper = function (e) {
        return Func.apply(undefined, [e, e.srcElement].concat(_toConsumableArray(_this.args || [])));
      };
    }

    _createClass(EventHandler, [{
      key: 'On',
      value: function On() {
        var _this2 = this;

        is.Arr(this.Target) ? this.Target.forEach(function (target) {
          return target.addEventListener(_this2.EventType, _this2.FuncWrapper);
        }) : this.Target.addEventListener(this.EventType, this.FuncWrapper);
      }
    }, {
      key: 'Off',
      value: function Off() {
        var _this3 = this;

        is.Arr(this.Target) ? this.Target.forEach(function (target) {
          return target.removeEventListener(_this3.EventType, _this3.FuncWrapper);
        }) : this.Target.removeEventListener(this.EventType, this.FuncWrapper);
      }
    }, {
      key: 'Once',
      value: function Once() {
        var Func = this.FuncWrapper,
            Target = this.Target,
            EventType = this.EventType,
            ListenOnce = function ListenOnce(e) {
          Func(e);
          is.Arr(Target) ? Target.forEach(function (target) {
            return target.removeEventListener(EventType, ListenOnce);
          }) : Target.removeEventListener(EventType, ListenOnce);
        };
        is.Arr(Target) ? Target.forEach(function (target) {
          return target.addEventListener(EventType, ListenOnce);
        }) : Target.addEventListener(EventType, ListenOnce);
      }
    }]);

    return EventHandler;
  })();

  root.On = function (eventType, SelectorNode, func) {
    if (is.Func(SelectorNode)) {
      func = SelectorNode;
      SelectorNode = window;
    }
    var handle = new EventHandler(eventType, SelectorNode, func);
    handle.On();
    return handle;
  };

  root.Once = function (eventType, SelectorNode, func) {
    if (is.Func(SelectorNode)) {
      func = SelectorNode;
      SelectorNode = window;
    }
    var handle = new EventHandler(eventType, SelectorNode, func);
    handle.Once();
    return handle;
  };

  root.make_element = function (name, inner, attributes, NodeForm) {
    if (is.Bool(attributes)) {
      NodeForm = attributes;
      attributes = undefined;
    }
    if (NodeForm === true) {
      var _ret = (function () {
        var newEl = doc.createElement(name);
        if (is.String(inner)) newEl.innerHTML = inner;
        if (is.Def(attributes)) {
          if (is.Object(attributes)) forEach(attributes, function (val, attr) {
            return newEl.setAttribute(attr, val);
          });
          if (is.String(attributes)) newEl.setAttribute(attributes, '');
        }
        return {
          v: newEl
        };
      })();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    } else {
      if (is.Def(attributes) && is.String(attributes)) {
        return '<' + name + ' ' + attributes + '>' + inner + '</' + name + '>';
      } else {
        var _ret2 = (function () {
          var attrString = '';
          if (is.Def(attributes) && is.Object(attributes)) forEach(attributes, function (val, attr) {
            return attrString = attrString + (' ' + attr + '="' + val + '" ');
          });
          return {
            v: '<' + name + ' ' + attrString + '>' + inner + '</' + name + '>'
          };
        })();

        if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
      }
    }
  };

  root.dom = function (element) {
    if (is.String(element)) {
      var elements = queryAll(element);
      elements.length > 1 ? element = elements : element = elements[0];
    }
    if (is.Node(element)) return {
      html: function html(val) {
        return val ? element.innerHTML = val : element.innerHTML;
      },
      text: function text(val) {
        return val ? element.textContent = val : element.textContent;
      },
      replace: function replace(val) {
        return element.parentNode.replaceChild(el, element);
      },
      remove: function remove() {
        return element.parentNode.removeChild(element);
      },
      appendTo: function appendTo(val) {
        var el = undefined;
        is.Node(val) ? el = val : el = query(val);
        if (el !== null) el.appendChild(element);
      },
      append: function append(val) {
        return is.String(val) ? element.innerHTML += val : element.appendChild(element);
      },
      prepend: function prepend(val) {
        return is.String(val) ? element.innerHTML = val + element.innerHTML : element.insertBefore(val, element.firstChild);
      },
      On: (function (_On) {
        function On(_x, _x2) {
          return _On.apply(this, arguments);
        }

        On.toString = function () {
          return _On.toString();
        };

        return On;
      })(function (eventType, func) {
        return On(eventType, element, func);
      }),
      css: function css(styles) {
        return is.Def(styles) ? forEach(styles, function (prop, key) {
          return element.style[key] = prop;
        }) : console.error('Styles Object undefined');
      },
      getSiblings: function getSiblings() {
        var siblings = [],
            AllChildren = element.parentNode.childNodes;
        for (var _i3 = 0; _i3 < AllChildren.length; _i3++) {
          if (AllChildren[_i3] !== element) siblings.push(AllChildren[_i3]);
        }return siblings;
      },
      Width: function Width() {
        return element.getBoundingClientRect().width;
      },
      Height: function Height() {
        return element.getBoundingClientRect().height;
      },
      getRect: function getRect() {
        return element.getBoundingClientRect();
      },
      setWidth: function setWidth(Width) {
        return element.style.width = Width;
      },
      setHeight: function setHeight(Height) {
        return element.style.height = Height;
      },
      find: function find(selector, forceSelectAll, returncraft) {
        var Localelement = queryAll(selector, element);
        if (Localelement.length > 1 || forceSelectAll === true && !is.Null(Localelement)) return Localelement;
        if (!is.Null(Localelement)) return Localelement[0];
        return null;
      }
    };
    if (is.NodeList(element)) return {
      On: (function (_On2) {
        function On(_x3, _x4) {
          return _On2.apply(this, arguments);
        }

        On.toString = function () {
          return _On2.toString();
        };

        return On;
      })(function (eventType, func) {
        return On(eventType, element, func);
      }),
      find: function find(selector, forceSelectAll, returncraft) {
        var Localelement = queryAll(selector, element);
        if (Localelement.length > 1 || forceSelectAll === true && !is.Null(Localelement)) return Localelement;
        if (!is.Null(Localelement)) return Localelement[0];
        return null;
      },
      includes: function includes(SelectorNode) {
        if (!is.Node(SelectorNode)) SelectorNode = query(SelectorNode);
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
      div: function div(inner, attr) {
        return make_element('div', inner, attr);
      },
      span: function span(inner, attr) {
        return make_element('span', inner, attr);
      },
      label: function label(inner, attr) {
        return make_element('label', inner, attr);
      }
    };
  };

  root.Craft = {
    ArraytoObject: function ArraytoObject(arr) {
      var NewObject = {};
      for (var _i4 in arr) {
        if (is.Def(arr[_i4])) NewObject[_i4] = arr[_i4];
      }return NewObject;
    },
    toArray: function toArray(obj) {
      return slice.call(obj);
    },
    IndexOfArrayInArray: function IndexOfArrayInArray(Arr, searchArr) {
      for (var _i5 = 0; _i5 < searchArr.length; _i5++) {
        if (Arr[0] === searchArr[_i5]) {
          for (var c = 0; c < Arr.length; c++) {
            if (Arr[c] === searchArr[_i5 + c]) {
              if (c == Arr.length - 1) {
                return _i5;
              } else continue;
            } else break;
          }
        }
      }
      return -1;
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
        for (var _len12 = arguments.length, args = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
          args[_key12] = arguments[_key12];
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
            if (obj.type === 'css') {
              CrafterStyles.innerHTML += ' \n' + obj.data;
            } else {
              var _el = make_element('script', obj.data, { type: 'text/javascript' }, true);
              _el.defer = obj.defer || undefined;
              if (obj.exec) head.appendChild(_el);
            }
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
        for (var _i6 in localStorage) {
          if (!expired || Craft.loader.get(_i6).expire <= +new Date()) Craft.loader.remove(_i6);
        }
      }
    },
    Router: {
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
        function open(_x5, _x6) {
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
        if (is.Null(localStorage.getItem("RT_" + id))) {
          fetch(viewURL).then(function (res) {
            res.text().then(function (txt) {
              if (cache && is.Def(id) && is.String(id) && is.Null(localStorage.getItem("RT_" + id))) localStorage.setItem("RT_" + id, txt);
              query(viewHostSelector).innerHTML = txt;
            });
          }).catch(function (msg) {
            return log('warn', 'Could not fetch view -> ' + msg);
          });
        } else if (cache) query(viewHostSelector).innerHTML = localStorage.getItem("RT_" + id);
      },
      clearCache: function clearCache() {
        for (var _i7 in localStorage) {
          if (localStorage.key(_i7).includes("RT_")) localStorage.removeItem(localStorage.key(_i7));
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
        var all = doc.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/),
            i = 0;
        for (; i < all.length; i++) all[i] = decodeURIComponent(all[i]);
        return all;
      }
    },
    trim: function trim(text) {
      return is.Null(text) ? "" : (text + "").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    },
    after: function after(n, func) {
      var _this4 = this;

      if (!is.Func(func)) {
        if (is.Func(n)) {
          var temp = n;
          n = func;
          func = temp;
        } else log("err", "after : func is not a function");
      }
      n = Number.isFinite(n = +n) ? n : 0;
      return function () {
        for (var _len13 = arguments.length, args = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
          args[_key13] = arguments[_key13];
        }

        if (--n < 1) return func.apply(_this4, args);
      };
    },
    debounce: function debounce(wait, func, immediate) {
      var timeout = undefined;
      return function () {
        var context = this,
            args = arguments,
            later = function later() {
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
      }) : log('err', 'invalid args');
    },
    hasCapitals: function hasCapitals(string) {
      for (var _i8 = 0; _i8 < string.length; _i8++) {
        if (is.UpperCase(string[_i8])) return true;
      }return false;
    },
    OverrideFunction: function OverrideFunction(funcName, Func, ContextObject) {
      var namespaces = funcName.split("."),
          func = namespaces.pop();
      for (var _i9 = 0; _i9 < namespaces.length; _i9++) {
        ContextObject = ContextObject[namespaces[_i9]];
      }ContextObject[func] = Func;
    },
    concatObjects: function concatObjects(hostobj) {
      for (var _len14 = arguments.length, Objs = Array(_len14 > 1 ? _len14 - 1 : 0), _key14 = 1; _key14 < _len14; _key14++) {
        Objs[_key14 - 1] = arguments[_key14];
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
      for (var _len15 = arguments.length, Objs = Array(_len15 > 1 ? _len15 - 1 : 0), _key15 = 1; _key15 < _len15; _key15++) {
        Objs[_key15 - 1] = arguments[_key15];
      }

      return Object.assign(hostobj, Objs);
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
    type: function type() {
      for (var _len16 = arguments.length, args = Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
        args[_key16] = arguments[_key16];
      }

      var types = [];
      args.forEach(function (arg) {
        return types.push(typeof arg === 'undefined' ? 'undefined' : _typeof(arg));
      });
      if (types.length < 2) return types[0];
      return types;
    },
    indexOfDate: function indexOfDate(Collection, date) {
      for (var _i10 = 0; _i10 < Collection.length; _i10++) {
        if (+Collection[_i10] === +date) return _i10;
      }return -1;
    },
    removeArrItem: function removeArrItem(Arr, val) {
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
        if (val.IndexOf(i) !== -1) console.error('couldn\'t omit ' + val + ' from Array or String');
      }
      return obj;
    },
    Scope: {},
    WebComponents: [],
    mouse: {
      x: 0,
      y: 0,
      over: null
    },
    nodeExists: function nodeExists(selector, within) {
      return queryAll(selector, is.Node(within) ? within = within : within = query(within)) !== null;
    },
    ObjToFormData: function ObjToFormData(obj) {
      var formData = new FormData(),
          key = undefined;
      for (key in obj) formData.append(key, obj[key]);
      return formData;
    },
    URLfrom: function URLfrom(text) {
      return URL.createObjectURL(new Blob([text]));
    },
    OnScroll: function OnScroll(element, func) {
      var up = false;
      if (is.Func(func)) {
        On(element, function (e) {
          e.deltaY < 1 ? up = false : up = true;
          func(up, e);
        });
      } else console.error('second param needs to be a function');
    },
    OnResize: function OnResize(func) {
      return is.Func(func) ? Craft.ResizeHandlers.add(func) : cerr("TypeError : Craft.OnResize -> func is not a function");
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
    randomString: function randomString() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    },
    GenUID: function GenUID() {
      return Craft.randomString() + Craft.randomString() + '-' + Craft.randomString() + '-' + Craft.randomString() + '-' + Craft.randomString() + '-' + Craft.randomString() + Craft.randomString() + Craft.randomString();
    },
    newComponent: function newComponent(tag, config) {
      if (is.Undef(config)) {
        console.error("Invalid Component Configuration");
      } else {
        (function () {
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
            doc.registerElement(tag, {
              prototype: element,
              extends: config.extends
            });
          } else doc.registerElement(tag, {
            prototype: element
          });
        })();
      }
    }
  };

  Craft.loader.removeAll(true);

  root.FunctionIterator = (function () {
    function FunctionIterator() {
      _classCallCheck(this, FunctionIterator);

      this.functions = {};
      this.length = Object.keys(this.functions).length;
    }

    _createClass(FunctionIterator, [{
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
        for (var _i11 in this.functions) {
          this.functions[_i11].apply(this, arguments);
        }
      }
    }, {
      key: 'runOne',
      value: function runOne(funcName, arg) {
        this.functions.hasOwnProperty(funcName) ? this.functions[funcName].apply(this, arg, arguments) : log("warn", "No Such Function Entry in FunctionIterator");
      }
    }]);

    return FunctionIterator;
  })();

  root.ReactiveVariable = (function () {
    function ReactiveVariable(val, handle) {
      _classCallCheck(this, ReactiveVariable);

      if (is.Func(handle)) {
        this.val = val;
        this.Handle = handle;
      } else log('err', 'ReactiveVariable needs a handler function after the value');
      return this.val;
    }

    _createClass(ReactiveVariable, [{
      key: 'set',
      value: function set(val) {
        if (this.val !== val) {
          this.Oldval = this.val;
          this.val = val;
          this.Handle(this.Oldval, val);
        }
        return this.val;
      }
    }, {
      key: 'get',
      value: function get() {
        return this.val;
      }
    }, {
      key: 'reset',
      value: function reset(handle) {
        if (is.Func(handle)) {
          this.Handle = handle;
        } else log('err', 'ReactiveVariable.Reset only takes a function');
      }
    }]);

    return ReactiveVariable;
  })();

  Craft.Binds = new Map();
  Craft.newBind = function (key, val, handle) {
    is.Func(handle) ? Craft.Binds.set(key, new ReactiveVariable(val, handle)) : Craft.Binds.set(key, val);
    queryEach('[view-bind]', function (el) {
      if (Craft.Binds.has(el.getAttribute('view-bind'))) el.innerHTML = is.Func(handle) ? Craft.Binds.get(el.getAttribute('view-bind')).get() : Craft.Binds.get(el.getAttribute('view-bind'));
    });
  };
  Craft.setBind = function (key, val) {
    Craft.Binds.get(key).set(val);
    queryEach('[view-bind]', function (el) {
      if (Craft.Binds.has(el.getAttribute('view-bind'))) el.innerHTML = Craft.Binds.get(el.getAttribute('view-bind')).get();
    });
  };

  On('animationstart', document, function (e) {
    if (e.animationName === 'NodeInserted' && is.Node(e.target)) {
      if (e.target.hasAttribute('[view-bind]')) {
        if (Craft.Binds.has(e.target.getAttribute('view-bind'))) e.target.innerHTML = Craft.Binds.get(e.target.getAttribute('view-bind')).get();
      }
    }
  });

  Craft.ResizeHandlers = new FunctionIterator();

  root.onresize = Craft.throttle(450, function (e) {
    return Craft.ResizeHandlers.runEach(e);
  });
  root.onmousemove = function (e) {
    Craft.mouse.x = e.clientX;
    Craft.mouse.y = e.clientY;
    Craft.mouse.over = e.target;
  };

  Craft.newComponent('fetch-webcomponent', {
    created: function created() {
      var _this5 = this;

      if (this.hasAttribute('src')) {
        var wc = null;
        if (this.hasAttribute('cache-component') && this.getAttribute('cache-component') === 'true') {
          wc = localStorage.getItem(this.getAttribute('src'));
          if (wc !== null) {
            (function () {
              var webcomponent = JSON.parse(wc);
              CrafterStyles.innerHTML += webcomponent.css;
              var wcJS = make_element('script', '', {
                src: Craft.URLfrom(webcomponent.js),
                type: 'text/javascript',
                webcomponent: webcomponent.name
              }, true);
              wcJS.setAttribute('webcomponent', webcomponent.name);
              wcJS.onload = function (e) {
                return Craft.WebComponents.push(webcomponent.name);
              };
              head.appendChild(wcJS);
            })();
          }
        }
        if (wc === null) fetch(this.getAttribute('src')).then(function (res) {
          res.json().then(function (webcomponent) {
            CrafterStyles.innerHTML += webcomponent.css;
            var wcJS = make_element('script', '', {
              src: Craft.URLfrom(webcomponent.js),
              type: 'text/javascript',
              webcomponent: webcomponent.name
            }, true);
            wcJS.onload = function (e) {
              Craft.WebComponents.push(webcomponent.name);
              wcJS = null;
              webcomponent = null;
            };
            head.appendChild(wcJS);
            if (_this5.hasAttribute('cache-component') && _this5.getAttribute('cache-component') === 'true') localStorage.setItem(_this5.getAttribute('src'), JSON.stringify(webcomponent));
          });
        }).catch(function (err) {
          return console.error(err + ': could not load webcomponent');
        });
      }
    }
  });

  Once('DOMContentLoaded', function () {
    queryEach('[link]', function (el) {
      return On('click', el, function (e) {
        return el.hasAttribute('newtab') ? open(el.getAttribute('link')) : Craft.Router.open(el.getAttribute('link'));
      });
    });
    Craft.Router.links.forEach(function (link) {
      return link();
    });
    if (Craft.WebComponents.length === queryAll('fetch-webcomponent').length) {
      Ready = true;
    } else Craft.poll(function () {
      return Craft.WebComponents.length === queryAll('fetch-webcomponent').length;
    }, 35, 2000, function () {
      return Ready = true;
    }, function () {
      console.log('loading is taking longer than usual :(');
      Ready = true;
    });
  });

  Craft.WhenReady = function (Scope) {
    return new Promise(function (resolve, reject) {
      var waitIncase = CurrentBrowser.is("Firefox") || CurrentBrowser.is("msie");
      Scope = Scope || Craft.Scope;
      if (Ready) {
        waitIncase ? setTimeout(function () {
          return resolve(Scope);
        }, 500) : resolve(Scope);
      } else {
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
  };

  On('hashchange', function (e) {
    return CraftRouter.handlers.forEach(function (handler) {
      return location.hash === handler.link || location === handler.link ? handler.func() : null;
    });
  });
})(document, self);