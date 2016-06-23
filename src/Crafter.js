/**
 *  @overview Crafter.js , minimalist front-end library
 *  @author Saul van der Walt - https://github.com/SaulDoesCode/
 *  @license MIT
 */
//var perf = performance.now();
(function (doc, root) {
    "use strict";
    let Ready = false,
        tabActive = true,
        ready = () => Ready || doc.readyState == "complete",
        ua = navigator.userAgent,
        tabListeners = new Set,
        tem, Br = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);

    // tests arguments with Array.prototype.every;
    function ta(test) {
        return function () {
            return arguments.length && toArr(arguments).every(test)
        }
    }

    function has(str, strings, or) {
        if (isStr(strings)) return strings.split('')[(!or ? 'every' : 'some')](str.includes.bind(str));
    }

    function degloveStr(str) {
        return isStr(str) && (str.includes('"') || str.includes("'")) ? str.substring(1, str.length - 1) : str;
    }

    const sI = 'Isync',
        DestructionEvent = new Event('destroy'),
        toArr = Array.from,
        undef = void 0,
        defineprop = Object.defineProperty,
        getpropdescriptor = Object.getOwnPropertyDescriptor,
        def = ta(o => typeof o !== 'undefined'),
        nil = ta(o => o === null),
        isFunc = o => typeof o === 'function',
        isStr = o => typeof o === 'string',
        isObj = o => toString.call(o) === '[object Object]',
        head = doc.head,
        RegExps = {
            email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
            timeString: /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/,
            dateString: /^(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/(?:[0-9]{2})?[0-9]{2}$/,
            hexadecimal: /^[0-9a-fA-F]+$/,
            hexColor: /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
        }

    if (Br && (tem = ua.match(/version\/([\.\d]+)/i)) !== null) Br[2] = tem[1];
    Br = (Br ? [Br[1], Br[2]] : [navigator.appName, navigator.appVersion, '-?']).join(' ');

    function promise(func) {
        return new Promise(func)
    }

    function Locs(test) {
        return [location.hash, location.href, location.pathname].some(test)
    }

    // get the last item in an array
    function last(arr) {
        return arr[arr.length - 1]
    }

    // document , fragment , from , string -   dffstr
    function dffstr(html) {
        return doc.createRange().createContextualFragment(html || '')
    }

    // get the string form of any object
    // then compare it to a given string
    function type(obj, str) {
        return toString.call(obj) === str
    }

    function rif(b, e) {
        if (b) return e
    }


    function exec(fn, context, ...args) {
        return fn.apply(context, args);
    }

    // if x then return y else return z
    function W(x, y, z, a) {
        return a ? (x ? y : z) + a : x ? y : z
    }

    function toInt(num) {
        if (isStr(num)) num = Number(num);
        if (isNaN(num)) return 0;
        if (num === 0 || !isFinite(num)) return num;
        return (num > 0 ? 1 : -1) * Math.floor(Math.abs(num));
    }

    function makeFn(fn, Args, totalArity) {
        let remainingArity = totalArity - Args.length;
        return is.between(remainingArity, 10, 0) ? function () {
            return doInvok(fn, Args.concat(toArr(arguments)), totalArity);
        } : ((fn, args, arity) => {
            let a = [];
            for (let i = arity; 0 > i; i--) a.push('a' + i.toString());
            return function () {
                return doInvok(fn, toArr(arguments).concat(a))
            }
        })(fn, args, remainingArity);
    }

    function doInvok(fn, argsArr, totalArity) {
        if (argsArr.length > totalArity) argsArr = argsArr.slice(0, totalArity);
        return argsArr.length == totalArity ? fn.apply(null, argsArr) : makeFn(fn, argsArr, totalArity);
    }

    function cutdot(str) {
        return str.split('.')
    }

    function joindot(arr) {
        if (!is.Arr(arr) && is.Arraylike(arr)) arr = toArr(arr);
        return arr.join('.')
    }

    /**
     * is - Type Testing / Assertion *
     *
     */

    let is = {
        /**
         * @method Bool
         * Test if something is a boolean type
         * @param val - value to test
         */
        Bool: ta(o => typeof o === 'boolean'),
        /**
         * Test if something is a String
         * @param args - value/values to test
         */
        String: ta(isStr),
        /**
         * Test if something is an Array
         * @param {...*} args - value/values to test
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
        Arraylike: ta(o => {
            try {
                return def(o.length)
            } catch (e) {}
            return false;
        }),
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
        Null: ta(o => o === null),
        /**
         * Determine whether a variable is a DOM Node
         * @param args - value/values to test
         */
        Node: ta(o => o instanceof Node),
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
        NodeList: ta(nl => nl instanceof NodeList || is.Arraylike(nl) ? ta(n => n instanceof Node).apply(null, nl) : false),
        /**
         * Determine if a variable is a Number
         * @param {...*} args - value/values to test
         */
        Num: ta(o => !isNaN(Number(o))),
        /**
         * Determine if a variable is an Object
         * @param args - value/values to test
         */
        Object: ta(isObj),
        /**
         * Determine if a sring is JSON
         * @param args - value/values to test
         */
        Json: ta(str => {
            try {
                JSON.parse(str);
                return true;
            } catch (e) {}
            return false;
        }),
        /**
         * Determine if a variable is a HTMLElement
         * @param args - value/values to test
         */
        Element: ta(o => o.toString().includes('HTML')),
        /**
         * Determine if a variable is a File Object
         * @param args - value/values to test
         */
        File: ta(o => type(o, '[object File]')),
        /**
         * Determine if a variable is of a FormData type
         * @param args - value/values to test
         */
        FormData: ta(o => type(o, '[object FormData]')),
        /**
         * Determine if a variable is a Map
         * @param args - value/values to test
         */
        Map: ta(o => type(o, '[object Map]')),
        /**
         * Determine if a variable is a function
         * @param args - value/values to test
         */
        Func: ta(isFunc),
        /**
         * Determine if a variable/s are true
         * @param args - value/values to test
         */
        True: ta(o => o === true),
        /**
         * Determine if a variable/s are false
         * @param args - value/values to test
         */
        False: ta(o => !o),
        /**
         * Determine if a variable is of Blob type
         * @param obj - variable to test
         */
        Blob: ta(o => type(o, '[object Blob]')),
        /**
         * Determine if a variable is a Regular Expression
         * @param obj - variable to test
         */
        RegExp: ta(o => type(o, '[object RegExp]')),
        /**
         * Determine if a variable is a Date type
         * @param {...*} variable to test
         */
        Date: ta(o => type(o, '[object Date]')),
        /**
         * Determine if a variable is a Set
         * @param obj - variable to test
         */
        Set: ta(o => type(o, '[object Set]')),
        /**
         * Determine if a variable is of an arguments type
         * @param obj - variables to test
         */
        Args: val => !nil(val) && type(val, '[object Arguments]'),
        /**
         * Determine if a variable is a Symbol
         * @param obj - variables to test
         */
        Symbol: ta(obj => type(obj, '[object Symbol]')),
        /**
         * tests if a value is a single character
         * @param {...string} values to test
         */
        char: ta(val => isStr(val) && val.length == 1),
        /**
         * tests if a value is a space character
         * @param {...string} values to test
         */
        space: val => is.char(val) && (val.charCodeAt(0) > 8 && val.charCodeAt(0) < 14) || val.charCodeAt(0) === 32,
        /**
         * Determine if a String is UPPERCASE
         * @param {string} char - variable to test
         */
        Uppercase: str => isStr(str) && !is.Num(str) && str === str.toUpperCase(),
        /**
         * Determine if a String is LOWERCASE
         * @param {string} char - variable to test
         */
        Lowercase: str => isStr(str) && str === str.toLowerCase(),
        /**
         * Determine if a String contains only characters and numbers (alphanumeric)
         * @param {string} str - variable to test
         */
        Alphanumeric: str => /^[0-9a-zA-Z]+$/.test(str),
        /**
         * Determines whether a String is a valid email
         * @param {string} email - variable to test
         */
        email: email => RegExps.email.test(email),
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
        past(obj) {
            try {
                if (!is.Date(obj)) obj = isStr(obj) ? new Date(is.Num(obj) ? Number(obj) : obj) : new Date(obj);
            } catch (e) {}
            return is.Date(obj) && obj.getTime() < new Date().getTime();
        },
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
        between: (val, max, min) => (val <= max && val >= min),
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
         * tests that all parameters following the first are not the same as the first
         * @param {*} value - inital value to compare all other params with
         * @param {...*} arguments to compare with value
         */
        neither(value) {
            return toArr(arguments).slice(1).every(val => value !== val)
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
        empty: ta(val => {
            try {
                return !(isObj(val) ? Object.keys(val).length : is.Map(val) || is.Set(val) ? val.size : val.length) || val === ''
            } catch (e) {}
            return false
        }),
        /**
         * Test if something is a Native JavaScript feature
         * @param val - value to test
         */
        Native(val) {
            let type = typeof val;
            return isFunc(val) ? RegExp('^' + String(Object.prototype.toString).replace(/[.*+?^${}()|[\]\/\\]/g, '\\$&').replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$').test(Function.prototype.toString.call(val)) : (val && type == 'object' && /^\[object .+?Constructor\]$/.test(val.toString)) || false;
        },
        /**
         * Tests where a dom element is an input of some sort
         * @param {Element|Node} - element to test
         */
        Input: element => is.Element(element) && ['INPUT', 'TEXTAREA'].some(i => element.tagName.includes(i)),
    };

    /**
     * Easy way to loop through Collections and Objects and Numbers as well
     * @param {Array|Object|NodeList|Number} iterable - any collection that is either an Object or has a .length value
     * @param {function} func - function called on each iteration -> "function( value , indexOrKey ) {...}"
     */
    function forEach(iterable, func) {
        if (isFunc(func)) {
            let i = 0;
            if (is.Arraylike(iterable) && !localStorage)
                for (; i < iterable.length; i++) func(iterable[i], i);
            else if (is.int(iterable) && !isStr(iterable))
                while (iterable != i) func(i++);
            else
                for (i in iterable)
                    if (iterable.hasOwnProperty(i)) func(iterable[i], i);
        }
    }

    /**
     * Converts any Query/QueryAll to an Array of Nodes even if there is only one Node , this is error proof when no arguments are present it returns an empty array
     * @param {Node|NodeList|Array|String} val - pass either a CSS Selector string , Node/NodeList or Array of Nodes
     * @param {Node|NodeList|Array|String} within - pass either a CSS Selector string , Node/NodeList or Array of Nodes to search for val in
     */
    function NodeOrQuerytoArr(val, within) {
        if (isStr(val)) val = queryAll(val, within);
        return is.Node(val) ? [val] : is.NodeList(val) ? toArr(val) : [];
    }

    function eventemitter(obj) {
        let options = {
            evtlisteners: new Set,
            stop: false,
            on(type, func) {
                if (!isFunc(func)) throw new TypeError(`.on(${type},func) : func is not a function`);
                func.etype = type;
                options.evtlisteners.add(func);
                return {
                    on: () => {
                        func.etype = type;
                        options.evtlisteners.add(func);
                        return options;
                    },
                    off: () => options.off(func),
                }
            },
            once(type, func) {
                function funcwrapper() {
                    func.apply(obj, arguments);
                    options.off(funcwrapper);
                }
                options.on(type, funcwrapper);
            },
            off(func) {
                if (options.evtlisteners.has(func)) options.evtlisteners.delete(func);
                return options;
            },
            emit(type) {
                if (!options.stop) {
                    let args = toArr(arguments).slice(1);
                    options.evtlisteners.forEach(ln => {
                        if (ln.etype == type && !options.stop) ln.apply(obj, args);
                    });
                }
                return options;
            },
            stopall(stop) {
                if (!is.Bool(stop)) stop = true;
                options.stop = stop;
            },
            defineHandle(name, type) {
                if (!type) type = name;
                this[name] = (fn, once) => options[once == true ? 'once' : 'on'](type, fn);
                return options;
            },
        };
        forEach(options, (val, key) => {
            defineprop(obj, key, {
                value: val,
                enumerable: false,
                writable: false,
            })
        });
        return obj;
    }

    /**
     * Event Handler
     * @param {string} EventType - set the type of event to listen for example "click" or "scroll"
     * @param {Node|NodeList|window|document} Target - the Event Listener's target , can also be a NodeList to listen on multiple Nodes
     * @param {function} Func - Handler function that will be called when the event is triggered -> "function( event , event.srcElement ) {...}"
     * @returns Interface on,off,once
     */
    function EventHandler(EventType, Target, func, Within) {
        return new function () {
            EventType = EventType || 'click';
            this.state = false;
            Target = (Target !== root && Target !== doc) ? NodeOrQuerytoArr(Target, Within) : [Target];
            if (isStr(EventType) && EventType.includes(',')) EventType = EventType.split(',');
            if (!is.Arr(EventType)) EventType = [EventType];

            let FuncWrapper = e => {
                    func(e, e.target, Craft.deglove(Target))
                }
                /**
                 * Change the Event type to listen for
                 * {string} type - the name of the event/s to listen for
                 */
            defineprop(this, 'Type', {
                    set(type) {
                        let ehdl = this;
                        //  have you tried turning it on and off again? - THE IT CROWD
                        ehdl.off;
                        EventType = type.includes(',') ? type.split(',') : type;
                        if (!is.Arr(EventType)) EventType = [EventType];
                        ehdl.on;
                        return ehdl
                    },
                    get() {
                        return EventType
                    },
                    enumerable: true
                })
                /**
                 * Activates the EventHandler to start listening for the EventType on the Target/Targets
                 */
            defineprop(this, 'on', {
                get() {
                    let ehdl = this;
                    Target.forEach(target => {
                        EventType.forEach(evt => {
                            target.addEventListener(evt, FuncWrapper)
                        });
                    });
                    ehdl.state = true;
                    return ehdl
                },
                enumerable: true
            });
            /**
             * De-activates / turns off the EventHandler to stop listening for the EventType on the Target/Targets
             * can still optionally be re-activated with on again
             */
            defineprop(this, 'off', {
                get() {
                    let ehdl = this;
                    Target.forEach(target => {
                        EventType.forEach(evt => {
                            target.removeEventListener(evt, FuncWrapper)
                        });
                    });
                    ehdl.state = false;
                    return ehdl
                },
                enumerable: true
            });

            /**
             * once the the Event has been triggered the EventHandler will stop listening for the EventType on the Target/Targets
             * the Handler function will be called only once
             */
            defineprop(this, 'once', {
                get() {
                    let ehdl = this;
                    FuncWrapper = e => {
                        func(e, e.target, Craft.deglove(Target));
                        ehdl.off.state = false;
                    }
                    return ehdl.on;
                },
                enumerable: true
            });
        }
    }

    /**
     * Easy way to get a DOM Node or Node within another DOM Node using CSS selectors
     * @param {string} selector - CSS selector to query the DOM Node with
     * @param {Node|string=} element - Optional Node or CSS selector to search within insead of document
     */
    let query = (selector, element) => {
        if (isStr(element)) element = doc.querySelector(element);
        return is.Node(element) ? element.querySelector(selector) : doc.querySelector(selector);
    }

    /**
     * Easy way to get a DOM NodeList or NodeList within another DOM Node using CSS selectors
     * @param {string} selector - CSS selector to query the DOM Nodes with
     * @param {Node|NodeList|string=} element - Optional Node or CSS selector to search within insead of document
     */
    let queryAll = (selector, element) => {
            if (isStr(element)) element = queryAll(element);
            let list;
            if (Craft.len(element) !== 1 && (is.Arr(element) || is.NodeList(element))) {
                list = [];
                forEach(element, el => {
                    if (isStr(el)) el = query(el);
                    if (is.Node(el)) {
                        el = queryAll(selector, el);
                        if (is.NodeList(el)) list.concat(toArr(el));
                    }
                })
            } else list = is.NodeList(element) ? element[0].querySelectorAll(selector) : is.Node(element) ? element.querySelectorAll(selector) : doc.querySelectorAll(selector);
            return is.Null(list) ? list : is.Arr(list) ? list : toArr(list);
        }
        /**
         * Easy way to loop through Nodes in the DOM using a CSS Selector or a NodeList
         * @param {string|NodeList|Node} selector - CSS selector to query the DOM Nodes with or NodeList to iterate through
         * @param {Node|string=} element - Optional Node or CSS selector to search within insead of document
         * @param {function} func - function called on each iteration -> "function( Element , index ) {...}"
         * @param {boolean=} returnList - should queryEach also return the list of nodes
         */
    let queryEach = (selector, element, func, returnList) => {
        if (isFunc(element)) func = element;
        let list = NodeOrQuerytoArr(selector, element);
        forEach(list, func);
        if (returnList) return list;
    }

    function EventTypes(Target, within, listen) {
        listen = listen || 'on';
        let etype = type => fn => EventHandler(type, Target, fn, within)[listen];
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
        };
    }

    function keyhandle(keycode) {
        return (fn, context) => function (evt) {
            if (evt.keyCode === keycode) fn.apply(context || this, arguments);
        }
    }

    function EvtLT(ListenType) {
        return function (EventType, Target, element, func) {
            let args = toArr(arguments);
            return isFunc(Target) ? EventHandler(EventType, root, Target)[ListenType] :
                args.length < 3 && !args.some(isFunc) ? EventTypes(EventType, Target, ListenType) :
                isFunc(element) ? EventHandler(EventType, Target, element)[ListenType] :
                EventHandler(EventType, Target, func, element)[ListenType];
        }
    }

    /**
     * Starts listening for an EventType on the Target/Targets
     * @param {string} EventType - set the type of event to listen for example "click" or "scroll"
     * @param {Node|NodeList|window|document} Target - the Event Listener's target , can be a NodeList to listen on multiple Nodes
     * @param {function} Func - Handler function that will be called when the event is triggered -> "function( event , event.srcElement ) {...}"
     * @returns off - when on is defined as a variable "var x = on(...)" it allows you to access all the EventHandler interfaces off,once,on
     */
    let on = EvtLT('on');

    /**
     * Starts listening for an EventType on the Target/Targets ONCE after triggering the once event Listener will stop listening
     * @param {string} EventType - set the type of event to listen for example "click" or "scroll"
     * @param {Node|NodeList|window|document} Target - the Event Listener's target , can be a NodeList to listen on multiple Nodes
     * @param {function} Func - Handler function that will be called when the event is triggered -> "function( event , event.srcElement ) {...}"
     * @returns on,off,once - when once is defined as a variable "var x = once(...)" it allows you to access all the EventHandler interfaces off,once,on
     */
    let once = EvtLT('once'),
        eventoptions = 'Click,Input,DoubleClick,Focus,Blur,Keydown,Mousemove,Mousedown,Mouseup,Mouseover,Mouseout'.split(',');


    function craftElement(name, inner, attributes, extraAttr, stringForm) {
        let element = domManip(doc.createElement(name));
        if (isObj(inner)) {
            attributes = inner;
            inner = undef;
        }
        if (inner != undef) element.html(inner);
        if (isObj(attributes) || isStr(attributes)) {
            if (isObj(attributes)) Object.keys(attributes).forEach(key => {
                if (eventoptions.some(evo => evo == key) && isFunc(attributes[key])) {
                    let func = attributes[key];
                    key == 'DoubleClick' ? key = 'dblclick' : key = key.toLowerCase();
                    element[key + 'handle'] = on(key, element, func);
                    delete attributes[key];
                }
            });
            element.setAttr(attributes);
        }
        if (extraAttr != undef) is.Bool(extraAttr) ? stringForm = extraAttr : element.setAttr(extraAttr);
        if (stringForm) element = element.outerHTML;
        return element
    }

    /**
     * Contains several methods for Element Creation
     * @namespace dom
     */
    let Dom = {
        element: craftElement,
        frag(inner) {
            let dfrag = doc.createDocumentFragment();
            if (isStr(inner)) inner = dffstr(inner);
            if (is.Node(inner)) dfrag.appendChild(dfrag);
            return dfrag;
        },
        br: () => Dom.element('br'),
        /**
         * creates an img element with the options provided
         * @method img
         * @memberof dom
         * @param {string} sets src of the img
         * @param {string} sets alt of the img
         * @param {string|Object=} sets p attributes with URL variable style string ("id=123&class=big-header") or Object with properties {id : 123 , class : 'big-header'}
         */
        img: (src, alt, attr) => Dom.element('img', '', attr, {
            src: src,
            alt: alt
        }),
        input(type, attr) {
            if (isObj(type)) {
                attributes = type;
                type = 'text';
            }
            return Dom.element('input', '', attr, {
                type: type || 'text'
            });
        },
        list(type, items, attr) {
            let list = ``;
            if (is.Arrylike(items))
                forEach(items, item => {
                    if (isStr(item)) list += Dom.element('li', item).outerHTML;
                    else if (isObj(items)) list += Dom.element('li', item.inner, item.attr).outerHTML;
                });
            return Dom.element(type, list, attr);
        },
        a: (link, inner, attr) => Dom.element('a', inner, attr, 'href' + link),
        script(code, attr, defer, onload, nosrc) {
            let script = Dom.element('script', '', attr, {
                type: 'text/javascript'
            });
            if (isFunc(onload)) {
                script.onload = () => {
                    script.removeAttribute('initx');
                    onload();
                };
                let random = Craft.randomInt(1000);
                script.setAttribute('initx', random);
                code += `\ndocument.head.querySelector('script[initx="${random}"]').dispatchEvent(new UIEvent('load'));\n`
            }
            if (defer == true) script.defer = defer != false;
            if (nosrc == true) script.text = code;
            else script.src = Craft.URLfrom(code, {
                type: 'text/javascript'
            });
            return script;
        }
    }
    'table,td,th,tr,article,aside,ul,ol,li,h1,h2,h3,h4,h5,h6,div,span,section,button,br,label,header,i,style,nav,menu,main,menuitem'.split(',').forEach(tag => {
        Dom[tag] = (inner, attr, ea) => Dom.element(tag, inner, attr, ea);
    });

    function domNodeList(elements) {

        Craft.omit(Object.getOwnPropertyNames(Array.prototype), "length").forEach(method => {
            elements[method] = Array.prototype[method];
        });

        /**
         * Listen for Events on the NodeList
         * @param {string} string indicating the type of event to listen for
         * @param {function} func - handler function for the event
         * @returns handler (off,once,on)
         */
        elements.on = (eventType, func) => on(eventType, elements, func);
        /**
         * add CSS style rules to NodeList
         * @param {object} styles - should contain all the styles you wish to add example { borderWidth : '5px solid red' , float : 'right'}...
         */
        elements.css = styles => Craft.css(elements, styles);
        elements.addClass = function (Class) {
            elements.forEach(el => {
                el.classList.add(Class)
            });
            return elements
        }
        elements.gotClass = function () {
            return elements.every(el => toArr(arguments).every(Class => el.classList.contains(Class)))
        }

        elements.GotSomeClass = function () {
            return elements.some(el => toArr(arguments).every(Class => el.classList.contains(Class)))
        }

        elements.stripClass = Class => {
            elements.forEach(el => {
                el.classList.remove(Class)
            });
            return elements
        }
        elements.toggleClass = (Class, state) => {
            forEach(elements, el => {
                (is.Bool(state) ? state : el.classList.contains(Class)) ? el.classList.remove(Class): el.classList.add(Class);
            });
            return elements
        }

        /**
         * removes a specific Attribute from the this.element
         * @memberof dom
         * @param {...string} name of the Attribute/s to strip
         */
        elements.stripAttr = function () {
                elements.forEach(el => {
                    forEach(arguments, attr => {
                        el.removeAttribute(attr)
                    })
                });
                return elements
            }
            /**
             * checks if the element has a specific Attribute or Attributes
             * @memberof dom
             * @param {string|boolean} name of the Attribute or if true checks that it has some (||) of the attributes or if false checks that it has all of the attributes (&&)
             * @param {...string} names of attributes to check for
             */
        elements.hasAttr = function (attr) {
                if (isStr(attr)) return elements.every(el => el.hasAttribute(attr));
                return elements.every(el => Craft.flatten(arguments).every(a => el.hasAttribute(a)))
            }
            /**
             * Toggles an attribute on element , optionally add value when toggle is adding attribute
             * @param {string} name - name of the attribute to toggle
             * @param {string} val - value to set attribute to
             * @param {boolean=} rtst - optionally return a bool witht the toggle state otherwise returns the element
             */
        elements.toggleAttr = function (name, val, rtst) {
                forEach(elements, el => {
                    el[W(is.Bool(val) ? !val : el.hasAttr(name), 'strip', 'set', 'Attr')](name, val);
                });
                return rtst ? elements.every(el => el.hasAttr(name)) : elements
            }
            /**
             * Sets or adds an Attribute on the element
             * @memberof dom
             * @param {string} Name of the Attribute to add/set
             * @param {string} Value of the Attribute to add/set
             */
        elements.setAttr = function (attr, val) {
            forEach(elements, el => {
                if (!def(val)) {
                    if (isStr(attr)) attr.includes('=') || attr.includes('&') ? attr.split('&').forEach(Attr => {
                            let attribs = Attr.split('=');
                            def(attribs[1]) ? element.setAttribute(attribs[0], attribs[1]) : element.setAttribute(attribs[0], '')
                        }) :
                        element.setAttribute(attr, '');
                    else if (isObj(attr)) forEach(attr, (value, Attr) => {
                        element.setAttribute(Attr, value)
                    });
                } else element.setAttribute(attr, val || '');
            });
            return elements
        }

        elements.append = function () {
            forEach(arguments, arg => {
                forEach(elements, el => {
                    el.appendChild((is.Node(val) ? val : dffstr(val)).cloneNode(true));
                });
            });
            return elements
        }
        elements.appendTo = (val, within) => {
            forEach(elements, el => {
                if (isStr(el)) el = query(val, within);
                if (is.Node(el)) el.appendChild(el);
            });
            return elements
        }
        elements.prepend = function () {
            forEach(arguments, val => {
                forEach(elements, el => {
                    el.insertBefore(W(is.Node(val), val, dffstr(val)).cloneNode(true), el.firstChild);
                });
            });
            return elements
        }
        elements.hide = () => elements.css({
            display: 'none'
        });
        elements.show = () => elements.css({
            display: ''
        });

        elements.pick = i => {
            if (is.int(i) && def(elements[i])) return dom(elements[i]);
            else if (elements.includes(i)) return dom(i);
        }

        return elements
    }

    function Inner(type, el) {
        type = el.isInput ? 'value' : type;
        return function () {
            if (!arguments.length) return el[type];
            el[type] = '';
            forEach(arguments, val => {
                if (is.Arraylike(val)) forEach(val, v => {
                    is.Node(v) ? el.append(v) : el[type] += isFunc(v) ? v.call(el) : v;
                });
                else is.Node(val) || is.Element(val) ? el.append(val) : el[type] += isFunc(val) ? val.call(el) : val;
            });
            return el;
        }
    }

    function newSetGet(key, set, get) {
        defineprop(this, key, {
            set: set,
            get: get
        })
    }

    function domManip(element, within) {
        if (isStr(element)) element = query(element, within);
        if (element._DOMM == true) return element;
        element._DOMM = true;
        element.isInput = is.Input(element);

        element.newSetGet = newSetGet;

        element.newSetGet('colorAccent', func => {
            if (element.hasAttr('color-accent')) {
                func(element.getAttr('color-accent'));
                element._cah = {
                    fn: func,
                    dw: true
                }
            } else {
                element._cah = {
                    fn: func,
                    dw: false
                }
            }
        }, () => element._cah);

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
        element.replace = val => {
                element.parentNode.replaceChild(val, element);
                return element
            }
            /**
             * replaces a Node with another node provided as a parameter/argument
             * @memberof dom
             * @param {Node} Node to replace with
             */
        element.clone = val => domManip(element.cloneNode(val == undef ? true : val));

        /**
         * element.importview - imports a file and renders it on to the node
         * @param (string) src - url to fetch from
         */
        element.importview = (src, fetchoptions) => {
            let cache = element.hasAttr('cache-view');
            if (cache) {
                let view = localStorage.getItem(src);
                if (!nil(view)) {
                    element.html(view);
                    return;
                }
            }
            fetch(src, fetchoptions || {
                mode: 'cors',
                credentials: 'same-origin',
            }).then(res => {
                if (!res.ok) console.warn(`<${element.localName}> : unable to import view - ${src}`);
                else res.text().then(view => {
                    if (cache) localStorage.setItem(src, view);
                    element.html(view)
                });
            });
        }

        /**
         * append the Element to another node using either a CSS selector or a Node
         * @memberof dom
         * @param {Node|string} CSS selector or Node to append the this.element to
         */
        element.appendTo = function (val, within) {
                if (isStr(val)) val = query(val, within);
                if (is.Node(val)) val.appendChild(element);
                return element
            }
            /**
             * append text or a Node to the element
             * @memberof dom
             * @param {Node|string} String or Node to append to the this.element
             */
        element.append = function () {
                let domfrag = dom.frag();
                forEach(arguments, val => {
                    domfrag.appendChild(is.Node(val) ? val : dffstr(val))
                });
                element.appendChild(domfrag);
                return element
            }
            /**
             * prepend text or a Node to the element
             * @memberof dom
             * @param {Node|string} String or Node to prepend to the this.element
             */
        element.prepend = function () {
            let domfrag = dom.frag();
            forEach(arguments, val => {
                domfrag.appendChild(is.Node(val) ? val : dffstr(val))
            });
            element.insertBefore(domfrag, element.firstChild);
            return element
        }

        /**
         * element.bind is what drives data-binding in Crafter.js
         * it binds to values in models and objects
         * @param (string) bind - path to bind to
         * @example element.bind('myModel.value');
         */
        element.bind = bind => {
            function attemptBind() {
                let path = Craft.getPath(bind, true),
                    cutbind = path.cutbind,
                    prop = path.prop,
                    obj = path.obj,
                    val = path.val;

                if (def(val)) element.html(val);
                else {
                    let getval = element.html();
                    if (getval) Craft.setDeep(obj, prop, getval);
                }
                if (obj.isObservable) {
                    if (!is.Set(element.__binds)) element.__binds = {};
                    if (!element.isInput) element.__binds[bind] = obj.on('$uberset:' + prop, element.html);
                }
                if (element.isInput) element.SyncInput(obj, cutbind.length == 1 ? cutbind[0] : joindot(Craft.omit(cutbind, cutbind[0])))
            }

            try {
                attemptBind()
            } catch (e) {
                let modelListener = Craft.Models.$set(cutdot(bind)[0], () => {
                    setTimeout(attemptBind, 20)
                    modelListener.off;
                })
            }

            return element
        }

        element.unbind = bind => {
            if (element.__binds && element.__binds[bind] != undef) {
                element.__binds[bind].off;
                delete element.__binds[bind];
            }
        }

        /**
         * @func element.modify - used to do things with your element without breaking scope
         * @param (function) func - callback to execute
         * @returns (element) to make it chainable
         */
        element.modify = func => {
                func.call(element, element);
                return element;
            }
            /**
             * Listen for Events on the element or on all the elements in the NodeList
             * @memberof dom
             * @param {string} string indicating the type of event to listen for
             * @param {function} func - handler function for the event
             * @returns handler (off,once,on)
             */
        element.on = (eventType, func) => on(eventType, element, func);

        element.emit = (evt, detail) => {
            if (!isStr(evt)) throw new TypeError("element.emit : event name needs to be a string");
            element.dispatchEvent(new CustomEvent(evt, {
                detail: def(detail) || null
            }))
        }

        element.newSetGet('ondestroy', fn => {
            if (isFunc(fn)) element.on('destroy', fn)
        });

        function evlt(type) {
            return (fn, ltype) => (ltype ? once : on)(type, element, fn)
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

        element.onScroll = (func, pd) => Craft.onScroll(element, func, pd);

        /*let keypress = code => (fn, type) => evlt('keydown')(element, e => {
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
         * @memberof dom
         * @param {object} styles - should contain all the styles you wish to add
         * @example element.css({ borderWidth : '5px solid red' , float : 'right'});
         */
        element.css = (styles, prop) => Craft.css(element, styles, prop);
        /**
         * check if the element has got a specific CSS class
         * @memberof dom
         * @param {...string} name of the class to check for
         */
        element.gotClass = function () {
            return toArr(arguments).every(Class => element.classList.contains(Class));
        }


        /**
         * Add a CSS class to the element
         * @memberof dom
         * @param {string} name of the class to add
         */
        element.addClass = function () {
                forEach(arguments, Class => {
                    element.classList.add(Class)
                });
                return element
            }
            /**
             * removes a specific CSS class from the element
             * @memberof dom
             * @param {...string} name of the class to strip
             */
        element.stripClass = function () {
                forEach(arguments, Class => {
                    element.classList.remove(Class)
                });
                return element
            }
            /**
             * Toggle a CSS class to the element
             * @memberof dom
             * @param {string} name of the class to add
             * @param {boolean=} state - optionally toggle class either on or off with bool
             */
        element.toggleClass = function (Class, state) {
                if (!is.Bool(state)) state = element.gotClass(Class);
                element[W(state, 'strip', 'add', 'Class')](Class);
                return element
            }
            /**
             * removes a specific Attribute from the this.element
             * @memberof dom
             * @param {...string} name of the Attribute/s to strip
             */
        element.stripAttr = function () {
                forEach(arguments, element.removeAttribute.bind(element));
                return element
            }
            /**
             * checks if the element has a specific Attribute or Attributes
             * @memberof dom
             * @param {string|boolean} name of the Attribute or if true checks that it has some (||) of the attributes or if false checks that it has all of the attributes (&&)
             * @param {...string} names of attributes to check for
             */
        element.hasAttr = function () {
                let args = toArr(arguments);
                if (isStr(args[0]) && args.length == 1) return element.hasAttribute(args[0]);
                return args.every(a => element.hasAttribute(a))
            }
            /**
             * Sets or adds an Attribute on the element
             * @memberof dom
             * @param {string} Name of the Attribute to add/set
             * @param {string} Value of the Attribute to add/set
             */
        element.setAttr = (attr, val) => {
                if (!def(val)) {
                    if (isStr(attr)) attr.includes('=') || attr.includes('&') ? attr.split('&').forEach(Attr => {
                        def(Attr.split('=')[1]) ? element.setAttribute(Attr.split('=')[0], Attr.split('=')[1]) : element.setAttribute(Attr.split('=')[0], '')
                    }) : element.setAttribute(attr, '');
                    else if (isObj(attr)) forEach(attr, (value, Attr) => {
                        element.setAttribute(Attr, value)
                    });
                } else element.setAttribute(attr, val || '');
                return element
            }
            /**
             * Gets the value of an attribute , short alias for element.getAttribute
             * {string} attr - name of attribute to get
             */
        element.getAttr = element.getAttribute;
        element.attr = (attr, val) => {
            if (isStr(val) || isObj(attr)) return element.setAttr(attr, val);
            if (isStr(attr) && !def(val)) return element.getAttr(attr);
        }
        element.prop = element.hasAttr;
        /**
         * Toggles an attribute on element , optionally add value when toggle is adding attribute
         * @param {string} name - name of the attribute to toggle
         * @param {string} val - value to set attribute to
         * @param {boolean=} rtst - optionally return a bool witht the toggle state otherwise returns the element
         */
        element.toggleAttr = (name, val, rtst) => {
                element[W(is.Bool(val) ? !val : element.hasAttr(name), 'strip', 'set', 'Attr')](name, val);
                return rtst ? element.hasAttr(name) : element
            }
            /**
             * Hides and element by setting display none
             * @todo : Smooth animation
             */
        element.hide = () => element.css({
            display: 'none'
        });
        /**
         * Shows and element by setting display none
         * @todo : Smooth animation
         */
        element.show = mode => element.css({
            display: mode || ''
        });

        /**
         * Remove the element after a time in milliseconds
         * @param {number=} time - time to wait before self destructing the element
         */
        element.removeAfter = time => {
            setTimeout(() => {
                element.remove()
            }, time || 5000);
            return element
        }

        defineprop(element, 'Siblings', {
            get() {
                return Craft.omit(element.parentNode.children, element).filter(el => {
                    if (is.Element(el)) return el
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
        element.newSetGet('Width', pixels => {
            element.style.width = pixels
        }, () => element.getRect().with);


        /**
         * sets or gets the element's pixel height
         * @memberof dom
         * @param {string|number=} pixel value to set
         */
        element.newSetGet('Height', pixels => {
            element.style.height = pixels
        }, () => element.getRect().height);
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
                if (isStr(transform)) position = transfrom;
                if (isStr(position)) element.style.position = position;
                element.css(transform == true ? {
                    transform: `translateX(${x}px) translateY(${y}px)`
                } : {
                    left: x + 'px',
                    top: y + 'px'
                });
                if (chainable) return element
            }
            /**
             * performs a query inside the element
             * @memberof dom
             * @param {string} CSS selector
             * @returns {Node|Null}
             */
        element.query = selector => query(selector, element);

        element.next = (reset, dm) => {
            let sb = toArr(element.parentNode.children),
                nextnode = sb.indexOf(element) + 1;
            if (!sb[nextnode]) return reset ? (dm ? dom(sb[0]) : sb[0]) : null;
            return dm ? dom(sb[nextnode]) : sb[nextnode];
        }
        element.previous = (reset, dm) => {
            let sb = toArr(element.parentNode.children),
                nextnode = sb.indexOf(element) - 1;
            if (!sb[nextnode]) return reset ? (dm ? dom(sb[sb.length - 1]) : sb[sb.length - 1]) : null;
            return dm ? dom(sb[nextnode]) : sb[nextnode];
        }

        /**
         * performs a queryAll inside the element
         * @memberof dom
         * @param {string} CSS selector
         * @returns {NodeList|Null}
         */
        element.queryAll = selector => queryAll(selector, element);

        if (element.isInput) {
            element.SyncInput = (obj, key) => Craft.SyncInput(element, obj, key)
            element.disconectInputSync = () => Craft.disconectInputSync(element)
        }

        element.observe = (func, options, name) => {
            if (!isStr(name)) name = 'MutObserver';
            element[name] = new MutationObserver(muts => {
                muts.forEach(mut => {
                    func(mut, mut.type, mut.target, mut.addedNodes, mut.removedNodes)
                });
            });
            element[name].observe(element, options || {
                attributes: true,
                childList: true,
                subtree: true
            });
            return element
        }
        element.unobserve = name => {
            if (!isStr(name)) name = 'MutObserver';
            if (def(element[name])) {
                element[name].disconnect();
                delete element[name]
            }
            return element
        }

        element.observeAttrs = func => {
            if (!isObj(element.attrX)) element.attrX = eventemitter({});
            element.attrX.on('attr', function (attr) {
                if (func) func.apply(element, arguments);
                element.attrX.emit.apply(null, ['attr:' + attr].concat(arguments));
            });
        }
        element.stopAttrObserve = state => {
            if (element.attrX) element.attrX.stopall(state);
        }
        return element
    };


    /**
     * Function that returns many useful methods for interacting with and manipulating the DOM or creating elements
     * in the absence of parameters the function will return methods for created elements
     * @function dom
     * @param {Node|NodeList|string=} element - optional Node, NodeList or CSS Selector that will be affected by the methods returned
     * @param {Node|string=} within - optional Node, NodeList or CSS Selector to search in for the element similar to query(element,within)
     * @param {boolean=} one - even if there are more than one elements matching a selector only return the first one
     */
    function dom(element, within, one) {
        if (within == true) {
            one = within;
            within = null;
        }
        if (!one) {
            if (isStr(element)) element = queryAll(element, within);
            if (is.NodeList(element)) {
                element = toArr(element).filter(is.Element);
                if (element.length != 1) return domNodeList(element);
                else element = element[0]
            }
        } else if (isStr(element)) element = query(element, within);
        if (is.Node(element)) return !element['_DOMM'] ? domManip(element) : element;
        return Dom
    }
    for (let key in Dom) defineprop(dom, key, getpropdescriptor(Dom, key));
    if (root.Proxy) dom = new Proxy(dom, {
        get(obj, key) {
            if (!obj.hasOwnProperty(key)) {
                if (Dom.hasOwnProperty(key)) return Dom[key];
                return (inner, attr, eattr, str) => Dom.element(key, inner, attr, eattr, str);
            }
            return obj[key]
        }
    });


    function observable(obj) {
        if (obj == undefined) obj = {};
        defineprop(obj, 'listeners', {
            value: {
                Get: new Set,
                Set: new Set,
            },
            enumerable: false,
            writable: false,
        });
        defineprop(obj, 'isObservable', {
            value: true,
            enumerable: false,
            writable: false,
        });
        ['$get', '$set'].forEach(t => {
            let Type = 'Set';
            if (t == '$get') Type = 'Get';
            defineprop(obj, t, {
                value(prop, func) {
                    if (isFunc(prop)) {
                        func = prop;
                        prop = '*';
                    }
                    if (!isFunc(func)) throw new Error('no function');
                    let listener = {
                        prop: isStr(prop) ? prop : '*',
                        fn: func,
                    }
                    let options = {
                        get on() {
                            obj.listeners[Type].add(listener);
                            return options
                        },
                        get off() {
                            obj.listeners[Type].delete(listener);
                            return options
                        },
                    };
                    return options.on;
                },
                enumerable: false,
                writable: false,
            });
        });

        defineprop(obj, '$change', {
            value(prop, func) {
                if (!isFunc(func)) throw new Error('no function');
                let listener = {
                    prop: isStr(prop) ? prop : '*',
                    fn: func,
                    multi: true,
                }
                let options = {
                    get on() {
                        obj.listeners.Get.add(listener);
                        obj.listeners.Set.add(listener);
                        return options
                    },
                    get off() {
                        obj.listeners.Get.delete(listener);
                        obj.listeners.Set.delete(listener);
                        return options
                    },
                };
                return options.on;
            },
            enumerable: false,
            writable: false,
        });
        defineprop(obj, 'get', {
            value(key) {
                if (key != 'get' && key != 'set') {
                    let val;
                    obj.listeners.Get.forEach(ln => {
                        if (ln.prop === '*' || ln.prop === key) val = ln.multi ? ln.fn('get', key, obj) : ln.fn(key, obj);
                    });
                    return val != undefined ? val : obj[key];
                } else return obj[key];
            },
            enumerable: false,
        });
        defineprop(obj, 'set', {
            value(key, value) {
                let val;
                obj.listeners.Set.forEach(ln => {
                    if (ln.prop === '*' || ln.prop === key) val = ln.multi ? ln.fn('set', key, value, obj, Object.hasOwnProperty(obj, key)) :
                        ln.fn(key, value, obj, Object.hasOwnProperty(obj, key));
                });
                val = val != undef ? val : value;
                if (isObj(val) && !val.isObservable) val = observable(val);
                target.emit('$uberset:' + key, val);
                obj[key] = val;
            },
            enumerable: false,
        });
        obj = eventemitter(obj);
        forEach(obj, (val, key) => {
            if (isObj(val) && !val.isObservable) obj[key] = observable(val);
        });
        if (root.Proxy) return new Proxy(obj, {
            get(target, key) {
                if (key != 'get' && key != 'set') {
                    let val;
                    target.listeners.Get.forEach(ln => {
                        if (ln.prop === '*' || ln.prop === key) val = ln.multi ? ln.fn('get', key, target) : ln.fn(key, target);
                    });
                    return val != undef ? val : Reflect.get(target, key);
                } else return Reflect.get(target, key);
            },
            set(target, key, value) {
                let val, onetime = false;
                target.listeners.Set.forEach(ln => {
                    if (ln.prop === '*' || ln.prop === key) {
                        if (onetime) {
                            value = val;
                            onetime = false;
                        } else onetime = true;
                        val = ln.multi ? ln.fn('set', key, value, target, !Reflect.has(target, key)) :
                            ln.fn(key, value, target, !Reflect.has(target, key));
                    }
                });
                val = val != undef ? val : value;
                if (isObj(val) && !val.isObservable) val = observable(val);
                target.emit('$uberset:' + key, val);
                return Reflect.set(target, key, val);
            }
        });
        else {
            console.warn('This Browser does not support Proxy, observables need to use the .set and .get accessors to work');
            return obj;
        }
    }

    /**
     * Craft is Crafter.js's Core containing most functionality.
     * @namespace Craft
     */
    var Craft = {
        /**
         * Returns an object or calls a function with all the differences between two arrays
         * @method arrDiff
         * @memberof Craft
         * @param {Array} arr - array to be compared
         * @param {Array} newArr - second array to be compared
         * @param {function=} func - optional function that recieves all the info as parameters
         */
        arrDiff(arr, newArr, func) {
            let added = newArr.filter(item => {
                    if (!arr.includes(item)) return item
                }),
                removed = arr.filter(item => {
                    if (newArr.includes(item)) return item
                }),
                diff = Craft.omit(added.concat(removed), undef);
            if (isFunc(func) && !is.empty(diff)) func(arr, newArr, added, removed, diff);
            else return {
                arr: arr,
                newArr: newArr,
                diff: diff,
                added: added,
                removed: removed
            }
        },
        deglove: arr => is.Arraylike(arr) && arr.length == 1 ? arr[0] : arr,
        degloveStr,
        last,
        /**
         * Splits a string at dots "."
         * @method cutdot
         * @memberof Craft
         * @param {string} str - string to split at the dots
         */
        cutdot,
        /**
         * joins a string array with dots "."
         * @method joindot
         * @memberof Craft
         * @param {Array|Arraylike} arr - array to join with dots
         */
        joindot,
        dffstr,
        /**
         * Convert Arraylike variables to Array
         * {...*} val - arraylike variable to convert to array
         */
        toArr,
        /**
         * Convert numbers to integers
         * {number|string} val - number to convert to an integer
         */
        toInt,
        promise,
        eventemitter,
        // dom methods and stuff
        dom,
        query,
        queryAll,
        queryEach,
        forEach,
        on,
        once,
        is,
        exec,
        UnHTML(html) {
            return html
                .replace(/<script[^>]*?>.*?<\/script>/gi, '')
                .replace(/<style[^>]*?>.*?<\/style>/gi, '')
                .replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');
        },
        init(func) {
            return func.apply(Craft, toArr(arguments).slice(1));
        },
        /**
         * Compares two arrays and determines if they are the same array
         * @method sameArray
         * @memberof Craft
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
        /**
         * Generates arrays of a set length , with values or values generated from functions
         * @method array
         * @memberof Craft
         * @param {Number} len - the integer length of the array to be generated
         * @param {...function|*} val - value to set at each index , multiple value params after lenth will generate nested 2d arrays
         */
        array(len) {
            let arr = [],
                val = Craft.omit(arguments, len);
            if (val.length == 1)
                for (; len > 0; len--) arr.push(isFunc(val[0]) ? val[0]() : val[0]);
            else
                for (; len > 0; len--) arr.push(Craft.array(val.length, val));
            return arr
        },
        /**
         * Gets all the property keys in any object even the hiden ones
         * @method getAllKeys
         * @memberof Craft
         * @param {*} obj - object to list keys fromModel
         * @returns {Array} - array containing all the property keys
         */
        getAllKeys(obj) {
            let props = [];
            do {
                props = props.concat(Object.getOwnPropertyNames(obj))
            } while (obj = Object.getPrototypeOf(obj));
            return props
        },
        unique: arr => toArr(new Set(Craft.flatten(arr))),
        /**
         * Flattens any multidimentional array or arraylike object
         * @method flatten
         * @memberof Craft
         * @param {Array|Arraylike} arr - multidimentional array(like) object to flatten
         */
        flatten: arr => (!is.Arr(arr) && is.Arraylike(arr) ? toArr(arr) : is.Arr(arr) ? arr : []).reduce((flat, toFlatten) => flat.concat(is.Arr(toFlatten) ? Craft.flatten(toFlatten) : toFlatten), []),
        /**
         * Gets a value from inside an object using a reference string
         * @method getDeep
         * @memberof Craft
         * @example Craft.getDeep(myObj,'Company.employees[16].person.name') -> Mr Smithers or Craft.getDeep(anObj,'Colony.Queen.brood') -> [...ants]
         * @param {Object} obj - the object to extract values from
         * @param {string} path - string to reference value by simple dot notation or array refference example Craft.getDeep({ a : { b : [1,2,3] }},"a.b[2]") -> 3
         */
        getDeep(obj, path) {
            path = path.replace(/\[(\w+)\]/g, '.$1');
            path = cutdot(path.replace(/^\./, ''));
            try {
                for (let i = 0; i < path.length; ++i) path[i] in obj ? obj = obj[path[i]] : obj = undef
                return obj
            } catch (e) {}
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
        setDeep(obj, path, val, robj) {
            path = cutdot(path);
            let temp = obj;
            for (let i = 0, n; i < path.length - 1; i++) {
                n = path[i];
                if (n in temp) temp = temp[n];
                else {
                    temp[n] = {};
                    temp = temp[n];
                }
            }
            temp[path[path.length - 1]] = val;
            if (robj) return obj
        },
        /**
         * forEachDeep is used to loop through any multi layered object - (flattens and loops through all enumerable properties in a given object)
         * @method forEachDeep
         * @memberof Craft
         * @param {Object} obj - the object to loop through
         * @param {function} func - function to handle each iteration
         * @param {string=} path - string to reference value by simple dot notation
         * @example Craft.forEachDeep({ a : 1 , b : { c : 2}}, (value , key , object, currentPath) => { console.log(key) })
         */
        forEachDeep(object, func, path) {
            path = path || '';
            let currentPath = path,
                nestable, val, key;
            for (key in object) {
                if (object.hasOwnProperty(key)) val = object[key];
                currentPath = path;
                nestable = false;
                is.Arr(object) ? currentPath += `[${key}]` : !currentPath ? currentPath = key : currentPath += '.' + key;
                nestable = func(val, key, object, currentPath) == false;
                if (nestable && (is.Arr(val) || isObj(val))) Craft.forEachDeep(val, func, currentPath);
            }
        },
        /**
         * Converts any text to an inline URL code (good for images , svg , scripts or css)
         * @param {string} - content to convert to an inline URL
         **/
        URLfrom: (text, type) => URL.createObjectURL(new Blob([text], type)),
        checkStatus(response) {
            if (response.status >= 200 && response.status < 300) return response;
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
        },
        /**
         * Method to merge the properties of multiple objects , it can handle getters or setters without breaking them
         * @method concatObjects
         * @memberof Craft
         * @param {Object} host - main object to merge with all subsequent objects
         * @param {...Object} objs - other objects to be merged with host object
         * @returns {Object} resulting object after merges
         */
        concatObjects(host) {
            Craft.omit(arguments, host).forEach(obj => {
                for (let key in obj) defineprop(host, key, getpropdescriptor(obj, key));
            });
            return host
        },
        completeAssign(host) {
            Craft.omit(arguments, host).forEach(source => {
                let descriptors = Object.keys(source).reduce((descriptors, key) => {
                    descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
                    return descriptors;
                }, {});
                // by default, Object.assign copies enumerable Symbols too
                Object.getOwnPropertySymbols(source).forEach(sym => {
                    let descriptor = Object.getOwnPropertyDescriptor(source, sym);
                    if (descriptor.enumerable) {
                        descriptors[sym] = descriptor;
                    }
                });
                Object.defineProperties(target, descriptors);
            });
            return target;
        },
        isObservable: obj => obj.isObservable || false,
        /**
         * Simply clones/duplicates any object or array/arraylike object
         * @method clone
         * @memberof Craft
         * @param {Array|Object} val - array or object to be cloned
         * @returns {Array|Object} cloned result
         */
        clone(val) {
            return isObj(val) ? Object.create(val) : toArr(val)
        },
        /**
         * Craft.omitFrom will omit values from any arraylike object or string
         * @param (arraylike|string) Arr - arraylike object from which values will be omitted
         * @param (...*) values - values to omit from the arraylike object
         * @return (array|string)
         */
        omitFrom(Arr) {
            let args = toArr(arguments).slice(1);
            if (isStr(Arr))
                args.forEach(a => {
                    while (Arr.includes(a)) Arr = Arr.replace(a, '');
                });
            else Arr = (is.Arraylike(Arr) ? toArr(Arr) : Arr).filter(e => {
                if (!args.some(v => v == e)) return e
            });
            return Arr
        },
        /**
         * Craft.has checks whether or not strings or arrays contains
         * certain values
         * @param (string|array) str - collection to check
         * @param (string|array) values - values to check for in the collection
         * @param (=string) or - some or every
         */
        has,
        /**
         * Omits values from Objects, Strings and Arraylike objects
         * @method omit
         * @memberof Craft
         * @param {Object|Array} val - object from which things may be omitted
         * @param {...*} args - things to omit from Object or Array
         * @returns {Object|Array}
         */
        omit(val) {
            if (is.Arraylike(val)) val = Craft.omitFrom.apply(this, arguments);
            let args = toArr(arguments).slice(1);
            if (isObj(val) && !args.some(v => v == val)) forEach(val, (prop, key) => {
                if (args.some(v => v == prop || v == key)) delete val[key];
            });
            return val;
        },
        browser: {
            /**
             * Craft.browser.is - checks which browser you're running
             * @param (string) browser - string containing a browser name like 'chrome','firefox'...
             * @returns (boolean) - returns whether or not this is the browser you checked for
             */
            is: browser => Br.toLowerCase().includes(browser.toLowerCase()),
            // name of browser and version
            browser: Br
        },
        router: {
            addHandle(link, func) {
                Craft.router.handlers.push({
                    link: link,
                    func: func
                })
            },
            handle(route, func) {
                if (isStr(route)) {
                    if (Locs(l => l == route)) func(route);
                    Craft.router.addHandle(route, func)
                } else if (is.Arr(route))
                    forEach(route, link => {
                        if (Locs(l => l == link)) func(link);
                        Craft.router.addHandle(link, func)
                    });
            },
            handlers: [],
            links: [],
            link(Selector, link, newtab, eventType) {
                if (isStr(newtab)) eventType = newtab
                Craft.router.links.push(() => {
                    on(eventType || 'click', Selector, e => {
                        Craft.router.open(link, newtab)
                    })
                })
            },
            open(link, newtab) {
                !newtab ? location = link : open(link)
            },
            set title(title) {
                doc.title = title
            },
            get title() {
                return doc.title
            },
            clearViews() {
                for (let i in localStorage) localStorage.removeItem(localStorage.key(i).includes("Cr:"))
            }
        },
        Cookies: {
            get(key) {
                return decodeURIComponent(doc.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null
            },
            set(key, val, expires, path, domain, secure) {
                if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) return false;
                let expiry = "";
                if (expires) {
                    if (is.Num(expires)) expiry = expires == Infinity ? "; expires=Fri, 11 April 9997 23:59:59 UTC" : "; max-age=" + expires;
                    if (isStr(expires)) expiry = "; expires=" + expires;
                    if (is.Date(expires)) expiry = "; expires=" + expires.toUTCString();
                }
                doc.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(val) + expiry + (domain ? "; domain=" + domain : "") + (path ? "; path=" + path : "") + (secure ? "; secure" : "");
                return true
            },
            has: key => key != undef && new RegExp("(?:^|;\\s*)" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(doc.cookie),
            remove(key, path, domain) {
                if (!Craft.Cookies.has(key)) return false;
                doc.cookie = encodeURIComponent(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (domain ? "; domain=" + domain : "") + (path ? "; path=" + path : "");
                return true
            },
            keys() {
                return doc.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/).map(c => {
                    decodeURIComponent(c);
                    return c
                })
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
                if (is.empty(match)) throw new Error('invalid url');
                address = location.host + match[0];
            }
            if (!address.includes('ws://') && !address.includes('wss://')) address = (location.protocol === 'http:' ? 'ws://' : 'wss://') + address;
            if (is.URL(address)) {
                function newSock() {
                    return protocols ? new WebSocket(address, protocols) : new WebSocket(address)
                }

                let Options = {
                    socket: null,
                    open: false,
                    recievers: [],
                    message: '',
                    set send(msg) {
                        if (Options.socket['readyState'] == 1) Options.socket.send(isObj(msg) ? JSON.stringify(msg) : msg);
                        else {
                            let poll = setInterval(() => {
                                if (Options.socket['readyState'] == 1) {
                                    Options.socket.send(isObj(msg) ? JSON.stringify(msg) : msg);
                                    clearInterval(poll);
                                }
                            }, 10);
                            setTimeout(clearInterval.bind(null, poll), 2000);
                        }
                    },
                    set recieve(func) {
                        if (isFunc(func)) Options.recievers.push(func);
                    },
                    get recieve() {
                        return Options.message;
                    },
                    close() {
                        Options.socket.close()
                    },
                    reopen() {
                        OpenSock(Options.open ? Options.socket : (Options.socket = newSock()))
                    }
                }

                function OpenSock(sock) {
                    sock.onopen = () => {
                        Options.open = true;
                        sock.onmessage = e => {
                            Options.message = e.data;
                            Options.recievers.forEach(fn => {
                                fn(e.data, e)
                            })
                        }
                    }
                    sock.onclose = () => {
                        Options.open = false
                    }
                    sock.onerror = e => {
                        throw e
                    }
                }
                OpenSock((Options.socket = newSock()));
                return Options;
            }
        },
        keyhandles: {
            base: keyhandle,
            enter: keyhandle(13),
            delete: keyhandle(8),
            escape: keyhandle(27),
            spacebar: keyhandle(32),
        },
        curry: fn => makeFn(fn, [], fn.length),
        after(n, func) {
            !isFunc(func) && isFunc(n) ? func = n : console.error("after: no function");
            n = Number.isFinite(n = +n) ? n : 0;
            if (--n < 1) return function () {
                return func.apply(this, arguments)
            }
        },
        debounce(wait, func, immediate) {
            let timeout;
            return function () {
                const args = arguments,
                    scope = this,
                    later = () => {
                        timeout = null;
                        if (!immediate) func.apply(scope, args);
                    },
                    callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(scope, args)
            }
        },
        throttle(wait, func, options) {
            let context, args, result,
                timeout = null,
                previous = 0;
            if (!options) options = {};

            function later() {
                previous = !options.leading ? 0 : Date.now();
                timeout = null;
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            }
            return function () {
                let now = Date.now();
                if (is.False(previous, options.leading)) previous = now;
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
                } else if (!timeout && options.trailing == true) timeout = setTimeout(later, remaining);
                return result
            }
        },
        once(func, context) {
            let result;
            return function () {
                if (isFunc(func)) {
                    result = func.apply(context || this, arguments);
                    func = null;
                }
                return result
            }
        },
        css(element, styles, prop) {
            if (isObj(styles))
                forEach(styles, (prop, key) => {
                    if (is.Element(element)) element.style[key] = prop;
                    else if (is.NodeList(element)) forEach(element, el => {
                        el.style[key] = prop;
                    });
                });
            else if (isStr(styles, prop)) element.style[styles] = prop;
            else throw new Error('CSS : Styles Object is not an object');
            return element;
        },
        fixURL(url) {
            if (!is.URL(url)) {
                let match = url.match(/^(\/.*?)?$/);
                if (is.empty(match)) throw new Error('invalid src');
                url = location.host + match[0];
            }
            if (!url.includes('http://') && !url.includes('https://')) url = location.protocol + '//' + url;
            return url;
        },
        /**
         * Craft.addCSS takes in any string of valid css code and executes it
         * @param (string) css - css code to execute
         */
        addCSS(css, noimport) {
            query('style[crafterstyles]', head).textContent += noimport ? css : `@import url("${Craft.URLfrom(css,{type : 'text/css'})}");\n`;
        },
        /**
         * Craft.importCSS takes in a source then attempts to fetch and execute it
         * @param (src) css - css code to execute
         */
        importCSS(src, gofetch) {
            if (gofetch) fetch(Craft.fixURL(src), {
                mode: 'cors'
            }).then(res => {
                if (!res.ok) console.warn(`loading css failed - ${src}`);
                else res.text().then(css => Craft.addCSS('\n' + css, true));
            });
            else Craft.addCSS(`@import url("${Craft.fixURL(src)}");\n`, true);
        },
        importFont(name, src) {
            Craft.addCSS(`@font-face {font-family:${name};src:url("${Craft.fixURL(src)}");}`, true);
        },
        loadScript(src, funcexec, fetchattr) {
            let fetchAttr = {
                mode: 'cors'
            };
            if (isObj(fetchattr)) fetchAttr = Object.assign(fetchAttr, fetchattr);
            return promise((pass, fail) => {
                fetch(Craft.fixURL(src), fetchAttr).then(res => {
                    if (!res.ok) console.warn(`loading script failed - ${src}`);
                    else res.text().then(code => {
                        if (funcexec) {
                            try {
                                pass(new Function(code).call(root));
                            } catch (e) {
                                fail(e);
                            }
                        } else
                            head.appendChild(dom.script(code, {}, false, pass, true));
                    });
                });
            })
        },
        loadScripts(urls, funcexec, fetchattr) {
            return promise((pass, fail) => {
                let len = 0;
                urls.forEach(src => {
                    Craft.loadScript(src, funcexec, fetchattr).then(() => {
                        len++;
                        if (len == urls.length) pass();
                    }).catch(fail);
                });
            });
        },
        hasCaps: str => toArr(str).some(is.Uppercase),
        hasNums: str => /\d/g.test(str),
        len(val) {
            try {
                return isObj(val) ? Object.keys(val).length : is.Map(val) || is.Set(val) ? val.size : val.length
            } catch (e) {}
            return -1
        },
        DateIndex(Collection, date) {
            for (let i = 0; i < Collection.length; i++)
                if (+Collection[i] === +date) return i;
            return -1;
        },
        type() {
            return Craft.deglove(toArr(arguments).map(t => typeof t))
        },
        memoize(func, resolver) {
            if (!isFunc(func) || (resolver && !isFunc(resolver))) throw new TypeError("no function");
            let cache = new WeakMap,
                memoized = function () {
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
            hours: n => (n || 1) * 3600000,
            days: n => (n || 1) * 86400000,
            weeks: n => (n || 1) * 604800000,
            months: (n, daysInMonth) => n * Craft.millis.days((daysInMonth || 30)),
            years: n => n * Craft.millis.year,
            sec: 1000,
            min: 60000,
            hour: 3600000,
            day: 86400000,
            year: 365 * 86400000,
        },
        observable,
        CustomAttributes: [],
        Models: observable(),
        tabActive: true,
        /**
         * Tail Call Optimization for recursive functions
         * @param fn - function that uses recursion inside
         */
        tco(fn) {
            let active, nextArgs;
            return function () {
                let result;
                nextArgs = arguments;
                if (!active) {
                    active = true;
                    while (nextArgs) result = fn.apply(this, [nextArgs, nextArgs = null][0]);
                    active = false;
                }
                return result
            }
        },
        animFrame(func) {
            let interval, options = {
                start() {
                    func();
                    interval = requestAnimationFrame(options.start);
                    return options
                },
                stop() {
                    cancelAnimationFrame(interval);
                    return options
                },
                reset(fn) {
                    options.stop();
                    if (isFunc(fn)) func = fn;
                    return options.start();
                }
            }
            return options;
        },
        JumpTo(target, options) {
            options = options || {};
            options.duration = options.duration || 400;
            options.offset = options.offset || 0;

            let startTime, elapsedTime, start = root.pageYoffset,
                distance = isStr(target) ? options.offset + dom(target, true).getRect().top : target,
                loopIteration = 0,
                loop = time => {
                    if (loopIteration == 0) startTime = time;
                    loopIteration++;
                    elapsedTime = time - startTime;
                    scrollTo(0, ((t, b, c, d) => {
                        t /= d / 2;
                        if (t < 1) return c / 2 * t * t + b;
                        t--;
                        return -c / 2 * (t * (t - 2) - 1) + b;
                    })(elapsedTime, start, distance, options.duration));
                    if (elapsedTime < options.duration) requestAnimationFrame(loop)
                    else {
                        scrollTo(0, start + distance);
                        if (isFunc(options.func)) options.func();
                        startTime = undef;
                    }
                }
            requestAnimationFrame(loop)
        },
        /**
         * converts Objects or URL variable strings to a FormData object
         * @param {object|string} val - values to convert
         */
        toFormData(val) {
            let formData = new FormData();
            if (isStr(val)) val = val.split('&');
            forEach(val, v => {
                if (isStr(v)) {
                    v = v.split('=');
                    if (v.length == 1) v[1] = '';
                    formData.append(v[0], v[1])
                } else formData.append(key, v)
            });
            return formData
        },
        /**
         * handles scrolling events
         * @param {Node} element - target of listener
         * @param {function} func - callback to handle the event
         * @param {boolean=} preventDefault - event.preventDefault() or not
         */
        onScroll(element, func, preventDefault) {
            return on('wheel', element, e => {
                if (preventDefault) e.preventDefault();
                func(e.deltaY < 1, e)
            })
        },
        /**
         * returns a promise when the DOM and WebComponents are all finished loading
         * @returns {promise} - when everything is done loading WhenReady will return a promise
         */
        get WhenReady() {
            return promise((pass, fail) => {
                if (ready()) return pass();
                let check = setInterval(() => {
                    if (ready()) {
                        pass();
                        clearInterval(check);
                    }
                }, 20);
                setTimeout(() => {
                    clearInterval(check);
                    if (!Ready || doc.readyState === "complete") fail('loading took too long loaded with errors :(')
                }, 5500)
            })
        },
        model(name, func) {
            if (isFunc(func) && isStr(name)) {
                if (!def(Craft.Models[name])) {
                    let scope = observable();
                    Craft.Models[name] = {
                        func: func.bind(scope),
                        scope,
                    }
                    return {
                        view(fn) {
                            Craft.WhenReady.then(fn.bind(scope, scope))
                        }
                    }
                }
                throw new Error('Craft Model already exists');
            }
        },
        modelInit(name, func) {
            if (Craft.Models[name] != undef) func.call(Craft, Craft.Models[name].scope);
            else Craft.Models.once(name, model => {
                func.call(Craft, model.scope);
            });
        },
        fromModel(key, val) {
            let cutkey = cutdot(key),
                IsValDefined = def(val),
                ck = cutkey[0],
                type = (IsValDefined ? 'set' : 'get') + 'Deep';
            if (def(Craft.Models[ck])) {
                return cutkey.length == 1 && !IsValDefined ? Craft.Models[ck].scope : Craft[type](Craft.Models[ck].scope, joindot(Craft.omit(cutkey, ck)), val)
            }
        },
        getPath(path, full) {
            try {
                if (has(path, `'"`, true)) return degloveStr(path);
                else if (path == 'true') return true;
                else if (path == 'false') return false;
                else if (is.Num(path)) return Number(path);
                let cutbind = cutdot(path),
                    prop = last(cutbind),
                    first = cutbind[0],
                    obj = def(Craft.Models[first]) ? Craft.Models[first].scope : Craft.getDeep(root, joindot(Craft.omit(cutbind, prop))),
                    val = Craft.getDeep(obj, cutbind.length > 1 ? joindot(Craft.omit(cutbind, first)) : prop);
                if (full) return {
                    cutbind,
                    prop,
                    obj,
                    val
                };
                if (def(val)) return val;
                if (first === prop && def(obj)) return obj;
            } catch (e) {
                return {}
            }
        },
        /**
         * defines custom attributes
         * @param {string} name - the name of your custom attribute
         * @param {function} handle - a function to handle how your custom attribute behaves
         * @example Craft.customAttr('turngreen', element => element.css({ background : 'green'}));
         **/
        customAttr(name, handle) {
            if (isFunc(handle)) {
                Craft.CustomAttributes.push({
                    name,
                    handle
                });

                function apply() {
                    queryEach(`[${name}]`, el => {
                        el = dom(el);
                        if (el.hasAttr(name)) {
                            if (!is.Arr(el.customAttr)) el.customAttr = [];
                            if (!el.customAttr.includes(name)) {
                                el.customAttr.push(name);
                                handle(el, el.getAttr(name));
                            }
                        }
                    });
                }
                ready() ? apply() : Craft.WhenReady.then(() => {
                    setTimeout(apply, 20)
                });
            }
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
        strongPassword(pass, length, caps, number, reasons) {
            let pw = 'Password ',
                includeChars = toArr(arguments).slice(5);
            if (pass.length <= length - 1) return reasons ? pw + 'too short' : false;
            if (caps && !Craft.hasCaps(pass)) return reasons ? pw + 'should have a Capital letter' : false;
            if (number && !Craft.hasNums(pass)) return reasons ? pw + 'should have a number' : false;
            if (includeChars.length) {
                if (!includeChars.some(ch => pass.includes(ch))) return reasons ? '' : false
            }
            return false
        },
        /**
         * converts camel case strings to dashed strings
         * usefull for css properties and such
         * @example Craft.camelDash('MyCamelCaseName') // -> my-camel-case-name
         * @param (string) val - string to convert
         */
        camelDash(val) {
            return val.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        },
        formatBytes(bytes, decimals) {
            if (bytes == 0) return '0 Bytes';
            let k = 1000,
                i = Math.floor(Math.log(bytes) / Math.log(k));
            return (bytes / Math.pow(k, i)).toPrecision(decimals + 1 || 3) + ' ' + 'Bytes,KB,MB,GB,TB,PB,EB,ZB,YB'.split(',')[i]
        },
        randomNum(max, min) {
            min = min || 0;
            max = max || 100;
            return Math.random() * (max - min) + min;
        },
        randomInt(max, min) {
            min = min || 0;
            max = max || 100;
            return Math.floor(Math.random() * (max - min)) + min;
        },
        /**
         * method for generating random alphanumeric strings
         * @return (string)
         */
        randomString: () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1),
        /**
         * similar to Craft.randomString in that it generates a unique string , in this case a Unique ID with random alphanumeric strings separated by hyphens
         * example 0ebf-c7d2-ef81-2667-08ef-4cde
         * @param {number=} len - optional length of uid sections
         */
        GenUID: len => Craft.array(len || 6, Craft.randomString).join('-'),
        /**
         * method for creating custom elements configuring their lifecycle's and inheritance
         * the config Object has 7 distinct options ( created , inserted , destroyed , attr, css, set_X and get_X )
         * @param {string} tag - a hyphenated custom HTML tagname for the new element -> "custom-element"
         * @param {object} config - Object containing all the element's lifecycle methods / extends and attached methods or properties
         */
        newComponent(tag, config) {
            if (!def(config)) throw new Error(tag + ' : config undefined');
            let element = Object.create(HTMLElement.prototype),
                settings = {},
                dm;

            element.createdCallback = function () {
                let el = dom(this),
                    dealtWith = [];
                for (let key in config) {
                    if (!dealtWith.includes(key)) {
                        if (key.includes("set_")) {
                            let sgKey = key.split("_")[1];
                            dealtWith.push(key, "get_" + sgKey);
                            el.newSetGet(sgKey, config[key], config["get_" + sgKey]);
                        } else if (key.includes("get_")) {
                            let sgKey = key.split("_")[1];
                            dealtWith.push(key, "set_" + sgKey);
                            el.newSetGet(sgKey, (isFunc(config["set_" + sgKey]) ? config["set_" + sgKey] : x => {}), config[key]);
                        }
                    }
                }
                if (isFunc(config['attr'])) el.observeAttrs(config['attr']);
                if (isFunc(config['created'])) return config['created'].call(el)
            }

            for (let key in config) {
                if (key == 'created' || key == 'attr' || (key.includes('set_') || key.includes('get_'))) continue;

                if (isFunc(config[key]) && key != 'attr') dm = function () { // Adds dom methods to element
                    return config[key].apply(dom(this), arguments)
                }
                key == 'inserted' ? element.attachedCallback = dm :
                    key == 'destroyed' ? element.detachedCallback = dm :
                    key.toLowerCase() == 'css' ? Craft.addCSS(config[key]) :
                    isFunc(config[key]) ? element[key] = dm :
                    defineprop(element, key, getpropdescriptor(config, key));
            }

            settings['prototype'] = element;
            doc.registerElement(tag, settings);
        },
        SyncInput(input, obj, key) {
            if (isStr(input)) input = query(input);
            if (is.Input(input)) {
                let oldval = input.value;
                input[sI] = on('input,blur,keydown', input, e => {
                    setTimeout(() => {
                        let val = input.value;
                        if (!(Craft.getDeep(obj, key) == "" && val == "") && val != oldval) {
                            oldval = val;
                            Craft.setDeep(obj, key, input.value);
                        }
                    }, 0);
                });
            }
        },
        disconectInputSync(input) {
            if (isStr(input)) input = query(input);
            if (is.Node(input) && def(input[sI])) {
                input[sI].off;
                delete input[sI]
            }
        },
        onTabChange(fn) {
            let options = {
                get off() {
                    tabListeners.delete(fn);
                    return options;
                },
                get on() {
                    tabListeners.add(fn);
                    return options;
                }
            }
            return options.on;
        },
    }
    head.appendChild(dom.style('', 'crafterstyles'));
    let TabChange = ta => () => {
        tabActive = ta;
        tabListeners.forEach(listener => {
            listener(tabActive)
        })
    }

    defineprop(Craft, 'tabActive', {
        get: () => tabActive
    });

    on('blur', TabChange(false));
    on('focus', TabChange(true));

    Craft.curry.to = Craft.curry((arity, fn) => makeFn(fn, [], arity));
    Craft.curry.adaptTo = Craft.curry((num, fn) => Craft.curry.to(num, function (context) {
        fn.apply(null, Craft.omit(arguments, context).slice(1).concat(context))
    }));
    Craft.curry.adapt = fn => Craft.curry.adaptTo(fn.length, fn);
    Craft.customAttr('bind', (element, bind) => {
        element.bind(bind)
        element.observeAttrs();
        element.attrX.on('attr:bind', () => {
            if (!element.hasAttr('bind') || element.getAttr('bind') != bind) element.unbind(bind);
        });
    });

    Craft.customAttr('bind-for', (element, bind) => {
        let data = Craft.fromModel(bind);
        if (is.Arr(data) || is.Set(data)) {
            let domfrag = dom.frag();
            element = element.stripAttr('bind-for');
            data.forEach(item => {
                domfrag.appendChild(element.html(item).clone(true));
            });
            element.replace(domfrag);
        } else element.remove();
    });

    Craft.customAttr('toggle-parent', element => {
        let visible = true,
            parent = dom(element.parentNode);
        element.Click(() => {
            visible = !visible;
            parent[visible ? 'show' : 'hide']()
        })
    });

    Craft.customAttr('toggle-element', (element, selector) => {
        let visible = true,
            toggleElement = dom(selector, true);
        if (!is.Element(toggleElement)) console.warn(`${element.localName} - toggle-element : "${selector}" is an invalid selector`);
        else element.Click(() => {
            visible = !visible;
            toggleElement[visible ? 'show' : 'hide']()
        })
    });

    Craft.customAttr('import-view', (element, src) => {
        element.importview(src)
    });

    Craft.customAttr('link', (element, link) => {
        element.linkevt = element.Click(e => {
            (element.hasAttr('newtab') ? open : Craft.router.open)(link)
            if (isFunc(element.linkhandle)) element.linkhandle(link);
        });
        if (isFunc(element.linkhandle)) Craft.router.handle(link, element.linkhandle);
    });

    Craft.customAttr('color-accent', (element, color) => {
        if (isFunc(element.colorAccent)) element.colorAccent(color);
        else if (isObj(element.colorAccent)) {
            if (!element._cah.dw) {
                element._cah.fn(color);
                element._cah.dw = false;
            }
        }
    });

    // takes in an affected element and scans it for custom attributes
    // then handles the custom attribute if it was registered with Craft.customAttr
    function manageAttr(el, attr) {
        for (let attr, i = 0; i < Craft.CustomAttributes.length; i++) {
            attr = Craft.CustomAttributes[i];
            if (el.hasAttribute(attr.name)) {
                if (!is.Array(el.customAttr)) el.customAttr = [];
                if (!el.customAttr.includes(attr.name)) {
                    el.customAttr.push(attr.name);
                    attr.handle(dom(el), el.getAttribute(attr.name));
                }
                break
            }
        }
    }

    Craft.Models.$set((key, model) => {
        Craft.Models.emit(key, model);
        model.func(model.scope)
    });

    Craft.DomObserver = new MutationObserver(muts => {
        muts.forEach(mut => {
            mut.removedNodes.forEach(el => {
                el.dispatchEvent(DestructionEvent);
            });
            mut.addedNodes.forEach(el => {
                if (el.hasAttribute) manageAttr(el);
            });
            if (mut.type == 'attributes') {
                manageAttr(mut.target, mut.attributeName);
                if (mut.target.attrX) mut.target.attrX.emit('attr',
                    mut.attributeName,
                    mut.target.getAttribute(mut.attributeName),
                    mut.oldValue,
                    mut.target.hasAttribute(mut.attributeName)
                );
            }
        });
    });
    Craft.DomObserver.observe(doc, {
        attributes: true,
        childList: true,
        characterData: true,
        characterDataOldValue: true,
        subtree: true
    });

    function init() {
        Craft.router.links.forEach(exec);
        Ready = true
    }

    !ready() ? once("DOMContentLoaded", doc, init) : init();

    on('hashchange', () => {
        Craft.router.handlers.forEach(handle => {
            if (Locs(l => l == handle.link)) handle.func(location.hash)
        });
    });

    root.Craft = Craft;
    //console.log(performance.now() - perf, 'Crafter.js');
})(document, self)
