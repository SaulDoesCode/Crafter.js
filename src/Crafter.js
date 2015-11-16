/*
 *  Saul's Crafter JS
 *  License MIT
 *   /[^{}]+(?=\})/g    find between curly braces
 */
"use strict";
(() => {

  let type = (obj, str) => toString.call(obj) === str,
    isT = (val, str) => typeof val === str,
    nT = (val, str) => typeof val !== str,
    root = window,
    doc = document;

  let ua = navigator.userAgent,
    tem, Br = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
  if (Br && (tem = ua.match(/version\/([\.\d]+)/i)) !== null) Br[2] = tem[1];
  Br ? [Br[1], Br[2]] : [navigator.appName, navigator.appVersion, '-?'];

  root.CurrentBrowser = {
    is: browser => {
      if (CurrentBrowser.browser.toLowerCase().includes(browser.toLowerCase())) return true;
      return false
    },
    browser: Br.join(' ')
  };

  root.is = {
    Bool: val => typeof val === 'boolean',
    Arr: val => Array.isArray(val),
    Arrlike: val => {
      if ('length' in val && val !== window && !is.Func(val)) {
        if (is.Num(val.length)) return true;
      }
      return false;
    },
    String: val => isT(val, 'string'),
    Num: val => isT(val, 'number'),
    Undef: (...args) => args.every(o => isT(o, 'undefined')),
    Def: (...args) => args.every(o => nT(o, 'undefined')),
    Null: (...args) => args.every(o => o === null),
    Node: (...args) => args.every(o => o instanceof Node),
    NodeList: (...args) => {
      for (var i = 0; i < args.length; i++)
        if (Array.from(args[i]).every(n => is.Node(n))) return true;
      return false;
    },
    Object: (...args) => args.every(o => type(o, '[object Object]')),
    Element: (...args) => args.every(o => type(o, '[object HTMLElement]')),
    File: (...args) => args.every(o => type(o, '[object File]')),
    FormData: (...args) => args.every(o => type(o, '[object FormData]')),
    Map: (...args) => args.every(o => type(o, '[object Map]')),
    Func: (...args) => args.every(o => typeof o === 'function'),
    Blob: obj => type(obj, '[object Blob]'),
    RegExp: obj => type(obj, '[object RegExp]'),
    Date: obj => type(obj, '[object Date]'),
    Set: obj => type(obj, '[object Set]'),
    Symbol: obj => type(obj, '[object Symbol]'),
    UpperCase: char => (char >= 'A') && (char <= 'Z'),
    Email: email => /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/.test(email),
    Between: (val, max, min) => (val <= max && val >= min),
    lt: (val, other) => val < other,
    lte: (val, other) => val <= other,
    bt: (val, other) => val > other,
    bte: (val, other) => val >= other,
    Native: val => {
      let type = typeof val;
      return type === 'function' ? RegExp('^' + String(Object.prototype.toString).replace(/[.*+?^${}()|[\]\/\\]/g, '\\$&').replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$').test(Function.prototype.toString.call(val)) : (val && type == 'object' && /^\[object .+?Constructor\]$/.test(val.toString)) || false;
    },
  };


  root.forEach = (iterable, func) => {
    if (is.Func(func)) {
      let index = 0;
      if (!is.Object(iterable)) {
        for (; index < iterable.length; index++) func(iterable[index], index);
      } else {
        for (index in iterable)
          if (iterable.hasOwnProperty(index)) func(iterable[index], index);
      }
    } else log("err", "No Function Provided for forEach");
  }

  root.query = (selector, element) => {
    if (is.String(element)) return doc.querySelector(element).querySelector(selector);
    if (is.Node(element)) return element.querySelector(selector);
    return doc.querySelector(selector);
  }
  root.queryAll = (selector, element) => {
    if (is.String(element)) return doc.querySelector(element).querySelectorAll(selector);
    if (is.Node(element)) return element.querySelectorAll(selector);
    return doc.querySelectorAll(selector);
  }

  root.queryEach = (selector, element, func) => {
    if (is.Func(element)) {
      func = element;
      element = doc;
    }
    let elements;
    if (is.String(element)) elements = doc.querySelector(element).querySelectorAll(selector);
    elements = element.querySelectorAll(selector);
    for (let i = 0; i < elements.length; i++) func(elements[i], i);
  }

  root.$ = (selector, forceSelectAll) => {
    let element = queryAll(selector);
    if (element.length > 1 || forceSelectAll === true || forceSelectAll === '*') return craft(element);
    if (is.Node(element[0]) && forceSelectAll === false) return craft(element[0]);
    return null;
  }

  root.log = function (type, msg) {
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

  root.On = (eventType, SelectorNode, func) => {
    if (is.Def(SelectorNode)) {
      if (is.String(SelectorNode)) {
        queryEach(SelectorNode, el => el.addEventListener(eventType, e => func(e, el)));
      } else if (is.Node(SelectorNode) || SelectorNode === root || SelectorNode === doc) {
        SelectorNode.addEventListener(eventType, e => func(e, SelectorNode));
      } else if (is.NodeList(SelectorNode)) {
        forEach(SelectorNode, el => el.addEventListener(eventType, e => func(e, el)));
      } else if (is.Func(SelectorNode)) root.addEventListener(eventType, e => SelectorNode(e, e.target));
    }
  }

  root.Off = (eventType, SelectorNode, func) => {
    if (SelectorNode !== undefined) {
      if (is.String(SelectorNode)) {
        queryEach(SelectorNode, el => el.removeEventListener(eventType, e => func(e, e.target)));
      } else if (is.Node(SelectorNode) || SelectorNode === root || SelectorNode === doc) {
        SelectorNode.removeEventListener(eventType, e => func(e, e.target));
      } else if (is.NodeList(SelectorNode)) {
        forEach(SelectorNode, el => el.removeEventListener(eventType, e => func(e, e.target)));
      } else if (is.Func(SelectorNode)) root.removeEventListener(eventType, e => SelectorNode(e, e.target));
    }
  }

  var CraftImport = obj => {
      let now = +new Date(),
        key = (obj.key || obj.url),
        src = Craftloader.get(key);
      if (src || src.expire - now > 0) return new Promise(resolve => resolve(src));
      return new Promise((success, failed) => fetch(obj.url).then(res => res.text().then(data => {
        obj.data = data;
        obj.stamp = now;
        obj.expire = now + ((obj.expire || 4000) * 60 * 60 * 1000);
        if (obj.cache) localStorage.setItem(Craftloader.pre + key, JSON.stringify(obj));
        success(obj);
      })).catch(err => failed(`Craftloader: problem fetching import -> ${err}`)));
    },
    execute = src => src.map(obj => {
      let el = (obj.type === 'css') ? doc.createElement('style') : doc.createElement('script');
      el.defer = obj.defer || undefined;
      el.innerHTML = obj.data;
      if (obj.exec) doc.head.appendChild(el);
    }),
    preOrKey = key => key.includes(Craftloader.pre) ? key : Craftloader.pre + key;
  root.Craftloader = {
    pre: 'craft:',
    Import: (...args) => {
      let obj, promises = [];
      args.forEach(arg => {
        obj = {
          url: (arg.css || arg.script),
          type: arg.css ? 'css' : 'script',
          exec: arg.execute !== false,
          cache: arg.cache !== false
        };
        if (is.Def(arg.key)) obj.key = arg.key;
        if (is.Def(arg.defer)) obj.defer = arg.defer;
        if (is.Def(arg.expire)) obj.expire = arg.expire;
        arg.test === false ? Craftloader.remove(obj.url) : promises.push(CraftImport(obj));
      });
      return Promise.all(promises).then(execute);
    },
    setPrekey: str => Craftloader.pre = str + ':',
    get: key => JSON.parse(localStorage.getItem(preOrKey(key)) || false),
    remove: key => localStorage.removeItem(preOrKey(key)),
    removeAll: expired => {
      for (let i in localStorage)
        if (!expired || Craftloader.get(i).expire <= +new Date()) Craftloader.remove(i)
    }
  };
  Craftloader.removeAll(true);

  root.CraftRouter = {
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
      for (let i in localStorage)
        if (localStorage.key(i).includes("RT_")) localStorage.removeItem(localStorage.key(i));
    },
  };



  root.craft = element => {
    if (is.NodeList(element)) {
      element.forEach = func => {
        if (is.Func(func)) {
          for (let index = 0; index < element.length; index++) func(craft(element[index]), index);
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
        if (!is.Node(SelectorNode)) SelectorNode = query(SelectorNode);
        for (let index = 0; index < element.length; index++)
          if (element[index] === SelectorNode) return true;
        return false;
      }
      element.css = styles => (is.Def(styles)) ? forEach(element, el => forEach(styles, (prop, key) => el.style[key] = prop)) : log("err", 'invalid styles');
    } else if (is.Node(element)) {
      element.getSiblings = () => {
        let siblings = [],
          AllChildren = element.parentNode.childNodes;
        for (let i = 0; i < AllChildren.length; i++)
          if (AllChildren[i] !== element) siblings.push(AllChildren[i]);
        return siblings;
      }
      element.getWidth = () => element.getBoundingClientRect().width;
      element.getHeight = () => element.getBoundingClientRect().height;
      element.getRect = () => element.getBoundingClientRect();
      element.setWidth = Width => {
        element.style.width = Height;
        return element;
      }
      element.setHeight = Height => {
        element.style.height = Height;
        return element;
      }
      element.On = (eventType, func) => {
        On(eventType, element, func);
        return element;
      }
      element.find = (selector, forceSelectAll, returncraft) => {
        let Localelement = queryAll(selector, element);
        if (Localelement.length > 1 || forceSelectAll === true && !is.Null(Localelement)) return craft(Localelement);
        if (!is.Null(Localelement)) return craft(Localelement[0]);
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
        if (!is.Node(SelectorNode)) SelectorNode = query(SelectorNode, element);
        if (!is.Null(SelectorNode)) return true;
        return false;
      }
      element.hasClass = (className, func) => {
        if (is.Func(func)) func(element.classList.contains(className));
        return element.classList.contains(className);
      }
      element.isTag = (tagName, func) => {
        if (element.tagName === tagName.toUpperCase()) {
          if (is.Func(func)) func(craft(element));
          return true;
        }
        return false;
      }
      element.css = styles => {
        (is.Def(styles)) ? forEach(styles, (prop, key) => element.style[key] = prop): log('err', 'Styles Object undefined');
        return element;
      }
      element.hide = (speed, timing) => {
        timing = timing || 'linear';
        speed = speed || 0;

        function HideElement() {
          element.style.transition = 'opacity ' + speed + 'ms ' + timing;
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
          let CheckDone = setInterval(() => {
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
          let CheckDone = setInterval(() => {
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

  root.Craft = {
    ArraytoObject: arr => {
      let NewObject = {};
      for (let i in arr)
        if (is.Def(arr[i])) NewObject[i] = arr[i];
      return NewObject;
    },
    toArray: obj => slice.call(obj),
    IndexOfArrayInArray: (Arr, searchArr) => {
      for (let i = 0; i < searchArr.length; i++) {
        if (Arr[0] === searchArr[i]) {
          for (let c = 0; c < Arr.length; c++) {
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
    ifthen: (bools, func, ...args) => new Promise((resolve, reject) => bools ? resolve(args) : reject('ifthen -> bolean logic returned false')),
    trim: text => is.Null(text) ? "" : (text + "").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""),
    bindNode: (SelectorNode, ContextObject, func) => {
      let Changes, element = is.Node(SelectorNode) ? SelectorNode : query(SelectorNode);
      if (is.Func(ContextObject)) {
        func = ContextObject;
        ContextObject = Craft.Scope;
      }
      if (!is.Null(element) && is.Def(func) && is.Func(func)) {
        element.isbound = true;
        Object.observe(ContextObject, changes => {
          if (element.isbound) changes.forEach(ch => {
            Changes = ch;
            func(element, ch);
          });
        });
        func(element, Changes);
      } else log("err", "No matching element");
    },
    unbindNode: (SelectorNode, func) => {
      let element = is.Node(SelectorNode) ? SelectorNode : query(SelectorNode);
      if (!is.Null(element)) {
        element.isbound = false;
        func(element);
      } else log("err", "No matching element");
    },
    after: function (n, func) {
      if (!is.Func(func)) {
        if (is.Func(n)) {
          let temp = n;
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
      let timeout;
      return function () {
        let context = this,
          args = arguments,
          later = () => {
            timeout = null;
            if (!immediate) func.apply(context, args);
          };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    },
    throttle: function (wait, func, options) {
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
    once: function (func, context) {
      let res;
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
      for (let i = 0; i < string.length; i++)
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
              } else if (prop !== hostobj[key]) hostobj[key] = [prop, hostobj[key]];
            } else hostobj[key] = prop;
          });
        });
      });
      return hostobj;
    },
    mergeObjects: (hostobj, ...Objs) => Object.assign(hostobj, Objs),
    len: val => {
      if (is.Object(val)) return Object.keys(val).length;
      if (is.Map(val) || is.Set(val)) return val.size;
      try {
        return val.length;
      } catch (e) {
        log('err', 'could not find length of value');
      }
    },
    type: (...args) => {
      let types = [];
      args.forEach(arg => types.push(typeof arg));
      if (types.length < 2) return types[0];
      return types;
    },
    indexOfDate: (Collection, date) => {
      for (let i = 0; i < Collection.length; i++)
        if (+Collection[i] === +date) return i;
      return -1;
    },
    removeArrItem: (Arr, val) => {
      let index = Arr.IndexOf(val),
        temp = [],
        string = false,
        i = 0;
      if (is.String(Arr)) {
        Arr = Array.from(Arr);
        string = true;
      }
      for (; i < Arr.length; i++)
        if (i !== index) temp.push(Arr[i]);
      return string ? temp : temp;
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
    resolveQueryOrNode: (val) => {
      if (is.String(val)) {
        val = query(val);
        if (val !== null) {
          return val;
        } else {
          log('query returns null');
          return null;
        }
      }
      if (is.Node(val)) return val;
      log('warn', 'value is of incorrect Type  string/node');
    },
    Scope: {},
    mouse: {
      x: 0,
      y: 0
    },
    nodeExists: (selector, within) => queryAll(selector, (is.Node(within) ? within = within : within = query(within))) !== null,
    ObjToFormData: obj => {
      let formData = new FormData(),
        key;
      for (key in obj) formData.append(key, obj[key]);
      return formData;
    },
    URLfrom: text => URL.createObjectURL(new Blob([text])),
    OnScroll: (element, func) => {
      let up = false;
      if (is.Func(func)) {
        On(element, e => {
          (e.deltaY < 1) ? up = false: up = true;
          func(up, e);
        });
      } else log('err', 'second param needs to be a function');
    },
    OnResize: func => is.Func(func) ? Craft.ResizeHandlers.add(func) : log("err", "TypeError : Craft.OnResize -> func is not a function"),
    randomString: () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1),
    GenUID: () => Craft.randomString() + Craft.randomString() + '-' + Craft.randomString() + '-' + Craft.randomString() + '-' + Craft.randomString() + '-' + Craft.randomString() + Craft.randomString() + Craft.randomString(),
    newComponent: function (Name, config) {
      if (is.Undef(config)) {
        log("err", "Invalid Component Configuration");
      } else {
        let element = Object.create(HTMLElement.prototype);
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
          doc.registerElement(Name, {
            prototype: element,
            extends: config.extends
          });
        } else {
          doc.registerElement(Name, {
            prototype: element
          });
        }
      }
    }
  };

  root.FunctionIterator = class FuncIterator {
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
      for (let i in this.functions) this.functions[i].apply(this, arguments);
    }
    runOne(funcName, arg) {
      this.functions.hasOwnProperty(funcName) ? this.functions[funcName].apply(this, arg, arguments) : log("warn", "No Such Function Entry in FunctionIterator");
    }
  }

  root.ReactiveVar = class ReactiveVariable {
    constructor(val, handle) {
      if (is.Func(handle)) {
        this.Value = val;
        this.Handle = handle;
      } else log('err', 'ReactiveVariable needs a handler function after the value');
      return this.Value;
    }
    set(val) {
      if (this.Value !== val) {
        this.Oldval = this.Value;
        this.Value = val;
        this.Handle(this.Oldval, val);
      }
      return this.Value;
    }
    get() {
      return this.Value;
    }
    Reset(handle) {
      if (is.Func(handle)) {
        this.Handle = handle;
      } else log('err', 'ReactiveVariable.Reset only takes a function');
    }
  }

  Craft.Binds = new Map;
  var CrafterStyles = document.createElement('style');
  CrafterStyles.setAttribute('CrafterStyles', '');
  CrafterStyles.innerHTML = `
  @keyframes NodeInserted {
    from {opacity: 0.99;}
    to {opacity: 1;}
  }
  [view-bind] {
    animation-duration: 0.001s;
    animation-name: NodeInserted;
  }`;
  doc.head.appendChild(CrafterStyles);

  On('animationstart', document, e => {
    if (e.animationName === 'NodeInserted' && is.Node(e.target)) {
      if (e.target.hasAttribute('[view-bind]')) {
        if (Craft.Binds.has(e.target.getAttribute('view-bind'))) e.target.innerHTML = Craft.Binds.get(e.target.getAttribute('view-bind')).get();
      }
    }
  });

  forEach(queryAll('[view-bind]'), el => {
    if (Craft.DataBindScope.has(el.getAttribute('view-bind'))) el.innerHTML = Craft.DataBindScope.get(el.getAttribute('view-bind'));
  });

  Craft.ResizeHandlers = new FunctionIterator;

  root.onresize = Craft.throttle(450, e => Craft.ResizeHandlers.runEach(e));
  root.onmousemove = ev => {
    Craft.mouse.x = ev.clientX;
    Craft.mouse.y = ev.clientY;
  }
  let Ready = 0;

  On('DOMContentLoaded', () => {
    queryEach('[link]', el => On('click', el, e => el.hasAttribute('newtab') ? open(el.getAttribute('link')) : CraftRouter.open(el.getAttribute('link'))));
    CraftRouter.links.forEach(link => link());
    Ready++;
  });

  On('WebComponentsReady', e => {
    Ready++;
    if(Ready === 2) {
      Ready = true;
    } else {
      setTimeout(function () {
        if(Ready === 2) Ready = true;
      }, 200);
    }
    setTimeout(() => {
      if (!Ready) {
        Ready = true;
        log('warn', 'loading took longer than expected');
      }
    }, 3500);
  });

  root.WhenReady = () => new Promise((resolve, reject) => {
    if (Ready) {
      if (Current.browser.includes("Firefox") || CurrentBrowser.browser.includes("msie")) {
        setTimeout(() => resolve(Craft.Scope), 600);
      } else resolve(Craft.Scope);
    } else {
      let ReadyYet = setInterval(() => {
        if (Ready) {
          if (CurrentBrowser.browser.includes("Firefox") || CurrentBrowser.browser.includes("msie")) {
            setTimeout(() => resolve(Craft.Scope), 650);
          } else resolve(Craft.Scope);
          clearInterval(ReadyYet);
        }
      }, 50);
      setTimeout(() => {
        clearInterval(ReadyYet);
        if (!Ready) reject("WebComponents didn't load correctly/intime -> load failed");
      }, 4500);
    }
  });

  On('hashchange', e => CraftRouter.handlers.forEach(handler => (location.hash === handler.link || location === handler.link) ? handler.func() : null));
})();
