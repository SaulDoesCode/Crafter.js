/*
 *  Saul's Crafter JS
 *  License MIT
 *   /[^{}]+(?=\})/g    find between curly braces
 */
"use strict";

var ua = navigator.userAgent,
  tem, M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) M[2] = tem[1];
M ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];

window.CurrentBrowser = {
  is: browser => {
    if (CurrentBrowser.browser.toLowerCase().includes(browser.toLowerCase())) return true;
    return false;
  },
  browser: M.join(' ')
};

(() => {

  var isStr = (obj, str) => toString.call(obj) === str,
    isT = (val, str) => typeof val === str,
    nT = (val, str) => typeof val !== str;

  window.is = {
    Func: func => typeof func === 'function',
    Bool: val => typeof val === 'boolean',
    Undef: function () {
      if (arguments.length > 1) {
        for (var i = 0; i < arguments.length; i++)
          if (typeof arguments[i] === 'undefined') return false;
        return true;
      }
      return isT(arguments[0], 'undefined');
    },
    Def: function () {
      if (arguments.length > 1) {
        for (var i = 0; i < arguments.length; i++)
          if (nT(arguments[i], 'undefined')) return false;
        return true;
      }
      return nT(arguments[0], 'undefined');
    },
    Arr: val => Array.isArray(val),
    String: val => isT(val, 'string'),
    Num: val => isT(val, 'number'),
    Null: function (val) {
      if (arguments.length > 1) {
        for (var i = 0; i < arguments.length; i++)
          if (arguments[i] === null) return true;
        return false;
      }
      return val === null;
    },
    Node: function (val) {
      if (arguments.length > 1) {
        for (var i = 0; i < arguments.length; i++)
          if (is.Null(arguments[i]) || !(arguments[i] instanceof Node)) return false;
        return true;
      }
      return (!is.Null(val) && val instanceof Node);
    },
    NodeList: function (val) {
      if (arguments.length > 1) {
        for (var i = 0; i < arguments.length; i++)
          if (arguments[i] === null || !(arguments[i] instanceof NodeList)) return false;
        return true;
      }
      return (!is.Null(val) && val instanceof NodeList);
    },
    File: obj => isStr(obj, '[object File]'),
    FormData: obj => isStr(obj, '[object FormData]'),
    Blob: obj => isStr(obj, '[object Blob]'),
    Object: obj => isStr(obj, '[object Object]'),
    RegExp: obj => isStr(obj, '[object RegExp]'),
    Date: obj => isStr(obj, '[object Date]'),
    Map: obj => isStr(obj, '[object Map]'),
    Set: obj => isStr(obj, '[object Set]'),
    Symbol: obj => isStr(obj, '[object Symbol]'),
    Element: obj => isStr(obj, '[object HTMLElement]'),
    UpperCase: char => (char >= 'A') && (char <= 'Z'),
    Email: email => {
      return /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/.test(email);
    },
    Native: val => {
      var type = typeof val;
      return type === 'function' ? RegExp('^' + String(Object.prototype.toString).replace(/[.*+?^${}()|[\]\/\\]/g, '\\$&').replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$').test(Function.prototype.toString.call(val)) : (val && type == 'object' && /^\[object .+?Constructor\]$/.test(val.toString)) || false;
    },
    Between: (val, max, min) => (val <= max && val >= min),
    lt: (val, other) => val < other,
    lte: (val, other) => val <= other
  };


  window.forEach = (iterable, func) => {
    if (is.Func(func)) {
      var index = 0;
      if (is.Arr(iterable) || is.NodeList(iterable) || is.String(iterable)) {
        for (; index < iterable.length; index++) func(iterable[index], index);
      } else if (is.Object(iterable)) {
        for (index in iterable)
          if (iterable.hasOwnProperty(index)) func(iterable[index], index);
      }
    } else log("err", "No Function Provided for forEach");
  }

  window.query = (selector, element) => {
    if (is.Undef(element)) return document.querySelector(selector);
    return element.querySelector(selector);
  }

  window.queryAll = (selector, element) => {
    if (is.Undef(element)) return document.querySelectorAll(selector);
    return element.querySelectorAll(selector);
  }

  window.$ = (selector, forceSelectAll, noCraft) => {
    var element = queryAll(selector);
    if (!is.Null(element)) {
      if (element.length > 1 || forceSelectAll === true && is.NodeList(element)) {
        return noCraft ? element : craft(element);
      } else if (is.Node(element[0]) || forceSelectAll === false) return noCraft ? element[0] : craft(element[0]);
    }
    return null;
  }

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
  }

  window.On = (eventType, SelectorNode, func) => {
    if (is.Def(SelectorNode)) {
      if (is.String(SelectorNode)) {
        forEach(queryAll(SelectorNode), el => el.addEventListener(eventType, e => func(e, e.target)));
      } else if (is.Node(SelectorNode) || SelectorNode === window || SelectorNode === document) {
        SelectorNode.addEventListener(eventType, e => func(e, e.target));
      } else if (is.NodeList(SelectorNode)) {
        forEach(SelectorNode, el => el.addEventListener(eventType, e => func(e, e.target)));
      } else if (is.Func(SelectorNode)) window.addEventListener(eventType, e => SelectorNode(e, e.target));
    }
  }

  window.Off = (eventType, SelectorNode, func) => {
    if (SelectorNode !== undefined) {
      if (is.String(SelectorNode)) {
        forEach(queryAll(SelectorNode), el => el.removeEventListener(eventType, e => func(e, e.target)));
      } else if (is.Node(SelectorNode) || SelectorNode === window || SelectorNode === document) {
        SelectorNode.removeEventListener(eventType, e => func(e, e.target));
      } else if (is.NodeList(SelectorNode)) {
        forEach(SelectorNode, el => el.removeEventListener(eventType, e => func(e, e.target)));
      } else if (is.Func(SelectorNode)) window.removeEventListener(eventType, e => SelectorNode(e, e.target));
    }
  }

  window.craft = element => {
    if (is.NodeList(element)) {
      element.forEach = func => {
        if (is.Func(func)) {
          for (var index = 0; index < element.length; index++) func(craft(element[index]), index);
        } else log("err", "No function Provided for NodeList.forEach");
      }
      element.On = (eventType, func) => {
        On(eventType, element, func);
        return element;
      }
      element.Off = (eventType, func) => {
        element.forEach((element, i) => element.removeEventListener(eventType, e => (is.Def(e.target) && is.Node(e.target)) ? func(e, craft(e.target), i) : func(e, e.target, i)));
        return element;
      }
      element.includes = SelectorNode => {
        if (is.String(SelectorNode)) SelectorNode = query(SelectorNode);
        if (is.Node(SelectorNode))
          for (var index = 0; index < element.length; index++)
            if (element[index] === SelectorNode) return true;
        return false;
      }
      element.css = styles => (is.Def(styles)) ? forEach(element, el => forEach(styles, (prop, key) => el.style[key] = prop)) : log("err", 'invalid styles');
    } else if (is.Node(element)) {
      element.getSiblings = () => {
        var siblings = [];
        var AllChildren = element.parentNode.childNodes;
        for (var i = 0; i < AllChildren.length; i++) {
          if (AllChildren[i] !== element) siblings.push(AllChildren[i]);
        }
        return siblings;
      }
      element.getWidth = () => element.getBoundingClientRect().width;
      element.getHeight = () => element.getBoundingClientRect().height;
      element.getRect = () => element.getBoundingClientRect();
      element.On = (eventType, func) => {
        On(eventType, element, func);
        return element;
      }
      element.find = (selector, forceSelectAll, returncraft) => {
        var Localelement = queryAll(selector, element);
        if (Localelement.length > 1 || forceSelectAll === true && !is.Null(Localelement) && is.NodeList(Localelement)) {
          return craft(Localelement);
        } else if (!is.Null(Localelement) && is.Node(Localelement[0])) {
          if (returncraft === false) return Localelement[0];
          return craft(Localelement[0]);
        }
        return null;
      }
      element.replace = el => element.parentNode.replaceChild(el, element);
      element.remove = () => element.parentNode.removeChild(element);
      element.append = val => {
        is.String(val) ? element.innerHTML += val : element.appendChild(element);
        return element;
      }
      element.prepend = val => {
        is.String(val) ? element.innerHTML = val + element.innerHTML : element.insertBefore(val, element.firstChild);
        return element;
      }
      element.hasChild = (SelectorNode) => {
        if (is.String(SelectorNode)) SelectorNode = query(SelectorNode, element);
        if (is.Node(SelectorNode) && !is.Null(SelectorNode)) return true;
        return false;
      }
      element.hasClass = (className, func) => {
        var has = false;
        element.classList.contains(className) ? has = true : has = false;
        if (is.Def(func) && is.Func(func)) func(has);
        return has;
      }
      element.isTag = (Tagname, func) => {
        if (element.tagName === Tagname.toUpperCase()) {
          if (is.Def(func) && is.Func(func)) func(craft(element));
          return true;
        }
        return false;
      }
      element.css = styles => (is.Def(styles)) ? forEach(styles, (prop, key) => element.style[key] = prop) : log('err', 'Styles Object undefined');
      element.hide = (speed, timingFunction) => {
        if (is.Undef(timingFunction)) timingFunction = 'linear';
        if (is.Undef(speed)) speed = 0;

        function HideElement() {
          element.style.transition = 'opacity ' + speed + 'ms ' + timingFunction;
          element.style.opacity = '0';
          element.effectInProgress = {
            status: true,
            type: 'hide'
          };
          setTimeout(() => {
            element.style.display = 'none';
            element.style.transition = '';
            element.effectInProgress = {
              status: false,
              type: 'none',
            };
          }, speed);
        }

        if (is.Def(element.effectInProgress) && element.effectInProgress.status === true) {
          var CheckDone = setInterval(() => {
            if (element.effectInProgress.status === false) {
              HideElement();
              clearInterval(CheckDone);
            }
          }, 10);
        } else HideElement();
        return element;
      }
      element.show = (speed, timingFunction) => {
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
          setTimeout(() => {
            element.style.opacity = '';
            element.style.transition = '';
            element.effectInProgress = {
              status: false,
              type: 'none'
            };
          }, speed);

        }
        if (is.Def(element.effectInProgress) && element.effectInProgress.status === true) {
          var CheckDone = setInterval(() => {
            if (element.effectInProgress.status === false) {
              ShowElement();
              clearInterval(CheckDone);
            }
          }, 10);
        } else ShowElement();
        return element;
      }

    }
    if (is.String(element)) return $(element);
    return element;
  }

  window.Craft = {
    ArraytoObject: arr => {
      var NewObject = {};
      for (var i in arr)
        if (is.Def(arr[i])) NewObject[i] = arr[i];
      return NewObject;
    },
    IndexOfArrInArr: (Arr, searchArr) => {
      for (var i = 0; i < searchArr.length; i++) {
        if (Arr[0] === searchArr[i]) {
          for (var c = 0; c < Arr.length; c++) {
            if (Arr[c] === searchArr[i + c]) {
              if (c == (Arr.length - 1)) {
                return i
              } else continue
            } else break
          }
        }
      }
      return -1
    },
    bindNode: (SelectorNode, ContextObject, func) => {
      var element = is.Node(SelectorNode) ? SelectorNode : query(SelectorNode),
        Changes;
      if (is.Func(ContextObject)) {
        func = ContextObject;
        ContextObject = Craft.Scope;
      }
      if (!is.Null(element) && is.Def(func) && is.Func(func)) {
        element.isbound = true;
        Object.observe(ContextObject, changes => {
          if (element.isbound) {
            changes.forEach(ch => {
              Changes = ch;
              func(element, ch);
            });
          }
        });
        func(element, Changes);
      } else log("err", "No matching element");
    },
    unbindNode: (SelectorNode, func) => {
      var element = is.Node(SelectorNode) ? SelectorNode : query(SelectorNode);
      if (!is.Null(element)) {
        element.isbound = false;
        func(element);
      } else log("err", "No matching element");
    },
    after: function (n, func) {
      if (!is.Func(func)) {
        if (is.Func(n)) {
          var temp = n;
          n = func;
          func = temp;
        } else log("err", "after : func is not a function");
      }
      n = Number.isFinite(n = +n) ? n : 0;
      return function () {
        if (--n < 1) return func.apply(this, arguments)
      }
    },
    debounce: function (wait, func, immediate) {
      var timeout;
      return function () {
        var context = this,
          args = arguments;
        var later = () => {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    },
    throttle: function (wait, func, options) {
      var context, args, result,
        timeout = null,
        previous = 0;
      if (!options) options = {};
      var later = function () {
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
    once: function (func, context) {
      var res;
      return function () {
        if (is.Func(func)) {
          res = func.apply(context || this, arguments);
          func = null;
        }
        return res;
      }
    },
    css: (el, styles) => (is.Def(styles, el) && is.Node(el)) ? forEach(styles, (prop, key) => el.style[key] = prop) : log('err', 'invalid args'),
    hasCapitals: string => {
      for (var i = 0; i < string.length; i++)
        if (is.UpperCase(string[i])) return true;
      return false;
    },
    OverrideFunction: (funcName, Func, ContextObject) => {
      let namespaces = funcName.split("."),
        func = namespaces.pop();
      for (let i = 0; i < namespaces.length; i++) ContextObject = ContextObject[namespaces[i]];
      ContextObject[func] = Func;
    },
    concatObjects: (hostobj, ...Objs) => {
      forEach(hostobj, () => {
        Objs.forEach(obj => {
          forEach(obj, (prop, key) => {
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
    mergeObjects: (hostobj, ...Objs) => Object.assign(hostobj, Objs),
    len: val => {
      if (is.Object(val)) return Object.keys(val).length;
      if (is.Map(val) || is.Set(val)) return val.size;
      let val_length;
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
    indexOfDate: (Collection, date) => {
      for (let i = 0; i < this.length; i++)
        if (+this[i] === +date) return i;
      return -1;
    },
    removeArrItem: (Arr, val) => {
      let index = Arr.IndexOf(val),
        temp = [],
        i = 0;
      for (; i < Arr.length; i++)
        if (i !== index) temp.push(Arr[i]);
      return temp;
    },
    omit: (obj, val) => {
      if (is.Object(obj)) {
        if (obj !== val) {
          forEach(obj, (prop, key) => {
            if (val === key || val === prop) delete obj[key];
          });
        }
        if (obj.hasOwnProperty(val)) log('err', 'couldn\'t omit ' + val + 'from Object');
      } else if (is.Arr(obj) || is.String(obj)) {
        obj.forEach(i => {
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
    nodeExists: (selector, within) => {
      if (is.Node(within)) return queryAll(selector, within) !== null;
      return queryAll(selector) !== null;
    },
    ObjToFormData: obj => {
      var formData = new FormData(),
        key;
      for (key in obj) formData.append(key, obj[key]);
      return formData;
    },
    URLfrom: text => URL.createObjectURL(new Blob([text])),
    cookie: {
      getItem: item => {
        if (!item) return null;
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(item).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
      },
      setItem: (item, itemValue, EndOfLife, Path, Domain, isSecure) => {
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
      removeItem: (item, Path, Domain) => {
        if (!Craft.cookie.itemExists(item)) return false;
        document.cookie = encodeURIComponent(item) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (Domain ? "; domain=" + Domain : "") + (Path ? "; path=" + Path : "");
        return true;
      },
      itemExists: item => {
        if (!item) return false;
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(item).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
      },
      CookieKeys: () => {
        var Keys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (var KeysLength = Keys.length, IDx = 0; IDx < KeysLength; IDx = IDx + 1) Keys[IDx] = decodeURIComponent(Keys[IDx]);
        return Keys;
      }
    },
    OnResize: func => is.Func(func) ? Craft.ResizeHandlers.add(func) : log("err", "TypeError : Craft.OnResize -> func is not a function"),
    router: {
      handle: (RouteLink, func) => {
        if (location.hash === RouteLink || location === RouteLink) func();
        Craft.router.handlers.push({
          link: RouteLink,
          func: func
        });
      },
      handlers: [],
      links: [],
      makeLink: (Selector, link, newtab, eventType) => Craft.router.links.push(() => On((is.Undef(eventType) ? 'click' : eventType), query(Selector), e => Craft.router.open(link, newtab))),
      open: (link, newtab) => newtab ? open(link) : location = link,
      setTitle: title => document.title = title,
      setView: (viewHostSelector, view) => query(viewHostSelector).innerHTML = view,
      fetchView: (viewHostSelector, viewURL, cache, id) => {
        if (is.Null(localStorage.getItem("RT_" + id)) || is.Undef(localStorage.getItem("RT_" + id))) {
          fetch(viewURL).then(res => {
            res.text().then(txt => {
              if (cache && is.Def(id) && is.String(id) && (is.Null(localStorage.getItem("RT_" + id)) || is.Undef(localStorage.getItem("RT_" + id)))) localStorage.setItem(("RT_" + id), txt);
              query(viewHostSelector).innerHTML = txt;
            });
          }).catch(msg => log('warn', 'Could not fetch view -> ' + msg));
        } else if (cache) query(viewHostSelector).innerHTML = localStorage.getItem("RT_" + id);
      },
      clearCache: () => {
        for (var i in localStorage)
          if (localStorage.key(i).includes("RT_")) localStorage.removeItem(localStorage.key(i));
      },
    },
    randomString: () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1),
    GenUID: () => Craft.randomString() + Craft.randomString() + '-' + Craft.randomString() + '-' + Craft.randomString() + '-' + Craft.randomString() + '-' + Craft.randomString() + Craft.randomString() + Craft.randomString(),
    newComponent: function (Name, config) {
      if (is.Undef(config)) {
        log("err", "Invalid Component Configuration");
      } else {
        var element = Object.create(HTMLElement.prototype);
        forEach(config, (prop, key) => {
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

  window.FunctionIterator = class FuncIterator {
    constructor() {
      this.functions = {};
      this.length = Object.keys(this.functions).length;
    }
    has(funcName) {
      if (this.functions.has(funcName)) return true;
      return false;
    }
    add(funcName, func) {
      if (is.Func(func)) {
        this.functions[funcName] = func;
      } else if (is.Func(funcName)) {
        this.functions[Craft.randomString()] = funcName;
      } else log("err", "Invalid function parameter in FunctionIterator.add(funcName , _function_ )");
      this.length = Object.keys(this.functions).length;
    }
    remove(funcName) {
      if (this.functions.has(funcName)) {
        this.functions[funcName] = null;
        delete this.functions[funcName];
      } else log("warn", "No Such Function Entry in FunctionIterator");
      this.length = Object.keys(this.functions).length;
    }
    removeAll() {
      delete this.functions;
      this.functions = null;
      this.functions = {};
      this.length = Object.keys(this.functions).length;
    }
    runEach() {
      for (var i in this.functions) this.functions[i].apply(this, arguments);
    }
    runOne(funcName, arg) {
      this.functions.hasOwnProperty(funcName) ? this.functions[funcName].apply(this, arg, arguments) : log("warn", "No Such Function Entry in FunctionIterator");
    }
  }

  Craft.ResizeHandlers = new FunctionIterator;

  window.onresize = Craft.throttle(450, e => Craft.ResizeHandlers.runEach(e));
  window.onmousemove = ev => {
    Craft.mouse.x = ev.clientX;
    Craft.mouse.y = ev.clientY;
  }
  var DomReady = false,
    Ready = (false && DomReady);

  On('DOMContentLoaded', () => {
    forEach(queryAll('[link]'), el => On('click', el, e => el.hasAttribute('newtab') ? open(el.getAttribute('link')) : Craft.router.open(el.getAttribute('link'))));
    Craft.router.links.forEach(link => link());
    DomReady = true;
  });

  On('WebComponentsReady', e => {
    Ready = (true && DomReady);
    setTimeout(() => {
      if(!Ready) Ready = true;
    }, 3500);
  });
  window.WhenReady = function () {
    return new Promise((resolve, reject) => {
      if (Ready) {
        if (Current.browser.includes("Firefox")) {
          setTimeout(() => resolve(Craft.Scope), 600);
        } else resolve(Craft.Scope);
      } else {
        var ReadyYet = setInterval(() => {
          if (Ready) {
            if (CurrentBrowser.browser.includes("Firefox") || CurrentBrowser.browser.includes("msie")) {
              setTimeout(() => resolve(Craft.Scope), 650);
              resolve(Craft.Scope);
            } else resolve(Craft.Scope);
            clearInterval(ReadyYet);
          }
        }, 50);
        setTimeout(() => {
          if (!Ready) reject("WebComponents didn't load correctly/intime -> load failed");
        }, 4500);
      }
    });
  }

  On('hashchange', e => Craft.router.handlers.forEach(handler => (location.hash === handler.link || location === handler.link) ? handler.func() : null));

  Object.observe(Craft.Scope, changes => {
    changes.forEach(change => {
      forEach(queryAll('[view-bind]'), el => {
        if (is.Def(Craft.Scope[el.getAttribute('view-bind')])) el.innerHTML = Craft.Scope[el.getAttribute('view-bind')];
      });
    });
  });
})();
