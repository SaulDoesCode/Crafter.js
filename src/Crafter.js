/*
 *  Saul's Crafter JS
 *  License MIT
 *   /[^{}]+(?=\})/g    find between curly braces
 */
"use strict";
((doc, root) => {

  let type = (obj, str) => toString.call(obj) === str,
    isT = (val, str) => typeof val === str,
    nT = (val, str) => typeof val !== str;

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
  }

  root.is = {
    Bool: val => typeof val === 'boolean',
    Arr: val => Array.isArray(val),
    Arraylike: val => {
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
    } else throw new Error("No Function Provided for forEach");
  }

  root.QueryOrNodetoNodeArray = (val) => {
    if (is.String(val)) val = queryAll(val);
    if (is.Null(val)) return null;
    if (is.Node(val)) return [val];
    if (is.NodeList(val)) return Array.from(val);
  };

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

  root.log = (Type, msg) => {
    switch (Type) {
      case 'err' || 'e':
        console.error(msg)
        break;
      case 'warn' || 'w':
        console.warn(msg)
        break;
      case 'success' || 's':
        console.log('%c' + msg, 'color:green;')
        break;
      case 'info' || 'i':
        console.info(msg)
        break;
      default:
        console.log(Type)
    }
  };

  root.EventHandler = class EventHandler {
    constructor(EventType, Target, Func, ...args) {
      this.EventType = EventType;
      this.Func = Func;
      this.Target = (Target !== window && Target !== document) ? QueryOrNodetoNodeArray(Target) : Target;
      this.args = args || [];
      this.FuncWrapper = e => Func(e, e.srcElement, ...this.args);
    }
    On() {
      if (is.Arr(this.Target)) {
        this.Target.forEach(target => target.addEventListener(this.EventType, this.FuncWrapper));
      } else this.Target.addEventListener(this.EventType, this.FuncWrapper);
    }
    Off() {
      if (is.Arr(this.Target)) {
        this.Target.forEach(target => target.removeEventListener(this.EventType, this.FuncWrapper));
      } else this.Target.removeEventListener(this.EventType, this.FuncWrapper);
    }
    Once() {
      let Func = this.FuncWrapper,
        Target = this.Target,
        EventType = this.EventType,
        ListenOnce = e => {
          Func(e);
          if (is.Arr(Target)) {
            Target.forEach(target => target.removeEventListener(EventType, ListenOnce));
          } else Target.removeEventListener(EventType, ListenOnce);
        }
      if (is.Arr(Target)) {
        Target.forEach(target => target.addEventListener(EventType, ListenOnce));
      } else Target.addEventListener(EventType, ListenOnce);
    }
  }

  root.On = (eventType, SelectorNode, func) => {
    if (is.Func(SelectorNode)) {
      func = SelectorNode;
      SelectorNode = window;
    }
    let handle = new EventHandler(eventType, SelectorNode, func);
    handle.On();
    return handle;
  }

  root.Once = (eventType, SelectorNode, func) => {
    if (is.Func(SelectorNode)) {
      func = SelectorNode;
      SelectorNode = window;
    }
    let handle = new EventHandler(eventType, SelectorNode, func);
    handle.Once();
    return handle;
  }

  root.make_element = (name, inner, attributes, NodeForm) => {
    if (is.Bool(attributes)) {
      NodeForm = attributes;
      attributes = undefined;
    }
    if (NodeForm === true) {
      let newEl = doc.createElement(name);
      if (is.String(inner)) newEl.innerHTML = inner;
      if (is.Def(attributes)) {
        if (is.Object(attributes)) forEach(attributes, (val, attr) => newEl.setAttribute(attr, val));
        if (is.String(attributes)) newEl.setAttribute(attributes, '');
      }
      return newEl;
    } else {
      if (is.Def(attributes) && is.String(attributes)) {
        return `<${name} ${attributes}>${inner}</${name}>`;
      } else {
        let attrString = ``;
        if (is.Def(attributes) && is.Object(attributes)) forEach(attributes, (val, attr) => attrString = attrString + ` ${attr}="${val}" `);
        return `<${name} ${attrString}>${inner}</${name}>`;
      }
    }
  }

  root.dom = element => {
    if (is.String(element)) {
      let elements = resolveQueryOrNode(element);
    }
    if (is.Node(element)) return {
      html: val => val ? element.innerHTML = val : element.innerHTML,
      text: val => val ? element.textContent = val : element.textContent,
      replace: val => element.parentNode.replaceChild(el, element),
      remove: () => element.parentNode.removeChild(element),
      appendTo: val => {
        let el;
        is.Node(val) ? el = val : el = query(val);
        if (el !== null) el.appendChild(element);
      },
      append: val => is.String(val) ? element.innerHTML += val : element.appendChild(element),
      prepend: val => is.String(val) ? element.innerHTML = val + element.innerHTML : element.insertBefore(val, element.firstChild),
      On: (eventType, func) => On(eventType, element, func),
      css: styles => is.Def(styles) ? forEach(styles, (prop, key) => element.style[key] = prop) : console.error('Styles Object undefined'),
      getSiblings: () => {
        let siblings = [],
          AllChildren = element.parentNode.childNodes;
        for (let i = 0; i < AllChildren.length; i++)
          if (AllChildren[i] !== element) siblings.push(AllChildren[i]);
        return siblings;
      },
      Width: () => element.getBoundingClientRect().width,
      Height: () => element.getBoundingClientRect().height,
      getRect: () => element.getBoundingClientRect(),
      setWidth: Width => element.style.width = Width,
      setHeight: Height => element.style.height = Height,
      find: (selector, forceSelectAll, returncraft) => {
        let Localelement = queryAll(selector, element);
        if (Localelement.length > 1 || forceSelectAll === true && !is.Null(Localelement)) return Localelement;
        if (!is.Null(Localelement)) return Localelement[0];
        return null;
      }
    }
    if (is.NodeList(element)) return {
      On: (eventType, func) => On(eventType, element, func),
      find: (selector, forceSelectAll, returncraft) => {
        let Localelement = queryAll(selector, element);
        if (Localelement.length > 1 || forceSelectAll === true && !is.Null(Localelement)) return Localelement;
        if (!is.Null(Localelement)) return Localelement[0];
        return null;
      },
      includes: SelectorNode => {
        if (!is.Node(SelectorNode)) SelectorNode = query(SelectorNode);
        for (let index = 0; index < element.length; index++)
          if (element[index] === SelectorNode) return true;
        return false;
      },
      css: styles => is.Def(styles) ? forEach(element, el => forEach(styles, (prop, key) => el.style[key] = prop)) : console.error('styles unefined'),
    }
    return {
      div: (inner, attr) => make_element('div', inner, attr),
      span: (inner, attr) => make_element('span', inner, attr),
      label: (inner, attr) => make_element('label', inner, attr),
    }
  };


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
    loader: {
      pre: 'craft:',
      CraftImport: obj => {
        let now = +new Date(),
          key = (obj.key || obj.url),
          src = Craft.loader.get(key);
        if (src || src.expire - now > 0) return new Promise(resolve => resolve(src));
        return new Promise((success, failed) => fetch(obj.url).then(res => res.text().then(data => {
          obj.data = data;
          obj.stamp = now;
          obj.expire = now + ((obj.expire || 4000) * 60 * 60 * 1000);
          if (obj.cache) localStorage.setItem(Craft.loader.pre + key, JSON.stringify(obj));
          success(obj);
        })).catch(err => failed(`Craft.loader: problem fetching import -> ${err}`)));
      },
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
          arg.test === false ? Craft.loader.remove(obj.url) : promises.push(Craft.loader.CraftImport(obj));
        });
        return Promise.all(promises).then(src => src.map(obj => {
          let el = (obj.type === 'css') ? doc.createElement('style') : doc.createElement('script');
          el.defer = obj.defer || undefined;
          el.innerHTML = obj.data;
          if (obj.exec) doc.head.appendChild(el);
        }));
      },
      setPrekey: str => Craft.loader.pre = str + ':',
      get: key => JSON.parse(localStorage.getItem(key.includes(Craft.loader.pre) ? key : Craft.loader.pre + key) || false),
      remove: key => localStorage.removeItem(key.includes(Craft.loader.pre) ? key : Craft.loader.pre + key),
      removeAll: expired => {
        for (let i in localStorage)
          if (!expired || Craft.loader.get(i).expire <= +new Date()) Craft.loader.remove(i)
      }
    },
    Router: {
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
    },
    trim: text => is.Null(text) ? "" : (text + "").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""),
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
        console.error('could not find length of value');
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
        if (val.IndexOf(i) !== -1) console.error(`couldn't omit ${val} from Array or String`);
      }
      return obj;
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
      } else console.error('second param needs to be a function');
    },
    OnResize: func => is.Func(func) ? Craft.ResizeHandlers.add(func) : cerr("TypeError : Craft.OnResize -> func is not a function"),
    poll: (test, interval, timeout, success, fail) => {
      return (() => {
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
      })();
    },
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
        } else doc.registerElement(Name, {
          prototype: element
        });
      }
    }
  };

  Craft.loader.removeAll(true);

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

  root.ReactiveVariable = class ReactiveVariable {
    constructor(val, handle) {
      if (is.Func(handle)) {
        this.val = val;
        this.Handle = handle;
      } else log('err', 'ReactiveVariable needs a handler function after the value');
      return this.val;
    }
    set(val) {
      if (this.val !== val) {
        this.Oldval = this.val;
        this.val = val;
        this.Handle(this.Oldval, val);
      }
      return this.val;
    }
    get() {
      return this.val;
    }
    reset(handle) {
      if (is.Func(handle)) {
        this.Handle = handle;
      } else log('err', 'ReactiveVariable.Reset only takes a function');
    }
  }

  Craft.Binds = new Map;
  Craft.newBind = (key, val, handle) => {
    is.Func(handle) ? Craft.Binds.set(key, new ReactiveVariable(val, handle)) : Craft.Binds.set(key, val);
    queryEach('[view-bind]', el => {
      if (Craft.Binds.has(el.getAttribute('view-bind'))) el.innerHTML = is.Func(handle) ? Craft.Binds.get(el.getAttribute('view-bind')).get() : Craft.Binds.get(el.getAttribute('view-bind'));
    });
  };
  Craft.setBind = (key, val) => {
    Craft.Binds.get(key).set(val);
    queryEach('[view-bind]', el => {
      if (Craft.Binds.has(el.getAttribute('view-bind'))) el.innerHTML = Craft.Binds.get(el.getAttribute('view-bind')).get();
    });
  };

  doc.head.innerHTML += make_element('style', `  @keyframes NodeInserted {from {opacity:.99;} to {opacity: 1;}}[view-bind] {animation-duration: 0.001s;animation-name: NodeInserted;}`, 'crafterstyles');

  On('animationstart', document, e => {
    if (e.animationName === 'NodeInserted' && is.Node(e.target)) {
      if (e.target.hasAttribute('[view-bind]')) {
        if (Craft.Binds.has(e.target.getAttribute('view-bind'))) e.target.innerHTML = Craft.Binds.get(e.target.getAttribute('view-bind')).get();
      }
    }
  });

  Craft.ResizeHandlers = new FunctionIterator;

  root.onresize = Craft.throttle(450, e => Craft.ResizeHandlers.runEach(e));
  root.onmousemove = ev => {
    Craft.mouse.x = ev.clientX;
    Craft.mouse.y = ev.clientY;
  }
  let Ready = false,
    ReadyStage = 0;

  Once('DOMContentLoaded', () => {
    queryEach('[link]', el => On('click', el, e => el.hasAttribute('newtab') ? open(el.getAttribute('link')) : Craft.Router.open(el.getAttribute('link'))));
    Craft.Router.links.forEach(link => link());
      ReadyStage++;
  });

  Once('WebComponentsReady', e => {
    ReadyStage++;
    ReadyStage === 2 ? Ready = true : Craft.poll(() => ReadyStage === 2, 20 , 1500, () => Ready = true, () => {
      console.warn('loading took longer than expected');
      Ready = true;
    });
  });

  Craft.WhenReady = () => {
    return new Promise((resolve, reject) => {
      if (Ready) {
        if (Current.browser.includes("Firefox") || CurrentBrowser.browser.includes("msie")) {
          setTimeout(() => resolve(Craft.Scope), 500);
        } else resolve(Craft.Scope);
      } else {
        let ReadyYet = setInterval(() => {
          if (Ready) {
            if (CurrentBrowser.browser.includes("Firefox") || CurrentBrowser.browser.includes("msie")) {
              setTimeout(() => resolve(Craft.Scope), 500);
            } else resolve(Craft.Scope);
            clearInterval(ReadyYet);
          }
        }, 50);
        setTimeout(() => {
          clearInterval(ReadyYet);
          if (!Ready) reject("Things didn't load correctly/intime -> load failed");
        }, 3500);
      }
    })
  }

  On('hashchange', e => CraftRouter.handlers.forEach(handler => (location.hash === handler.link || location === handler.link) ? handler.func() : null));
})(document, self);
