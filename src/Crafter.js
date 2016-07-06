/**
 *  @version 0.0.8
 *  @overview Crafter.js , minimalist front-end library
 *  @author Saul van der Walt - https://github.com/SaulDoesCode/
 *  @license MIT  Licence (c) Copyright 2016 Saul van der Walt
 */
(function (doc, root) {
    'use strict';
    let Ready = false,
        tabActive = true,
        ua = navigator.userAgent,
        tabListeners = new Set,
        tem, Br = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);

    /**
     * @summary Slices any arraylike object.
     * @method slice
     * @memberof Craft
     * @param {arraylike} ctx - object to slice
     * @param {int|String} i - value to slice defaults to 0
     */
    const slice = (ctx, i) => Array.prototype.slice.call(ctx, i || 0);

    /**
     * @summary curry takes a function as a parameter and returns another function until all the arguments of the initializer function has been provided.
     * @method curry
     * @memberof Craft
     * @param {Function} fn - function to curry
     * @param {Class|Function|Object} ctx - context to bind the function to
     * @returns {Function|*}
     */
    function curry(fn, ctx) {
        const arity = fn.length;

        function curried() {
            const args = slice(arguments);
            return args.length < arity ? function () {
                const more = slice(arguments);
                return curried.apply(null, args.concat(more))
            } : fn.apply(ctx || this, args);
        }
        return curried;
    }
    // tests arguments with Array.prototype.every;
    function ta(test) {
        return (...args) => args.length == 1 ? test(args[0]) : args.length && args.every(test);
    }

    /**
     * @summary Checks whether a collection or object contains a certain value.
     * @method has
     * @memberof Craft
     * @param {object|arraylike|set|map} host - collection or object to search in
     * @param {*} value - the value to look for
     */
    function has(host, value, or) {
        if (is.Arraylike(host)) return (isStr(value) ? value.split('') : is.Arr(value) ? value : slice(value))[(!or ? 'every' : 'some')](host.includes.bind(host));
        if (isObj(host)) return Object.prototype.hasOwnProperty.call(host, value);
        if (is.Set(host) || is.Map(host)) return host.has(value);
    }

    const sI = 'InputSync',
        DestructionEvent = new Event('destroy'),
        possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        toArr = Array.from,
        undef = void 0,
        defineprop = Object.defineProperty,
        getpropdescriptor = Object.getOwnPropertyDescriptor,
        def = ta(o => typeof o !== 'undefined'),
        nil = ta(o => o === null),
        isFunc = o => typeof o === 'function',
        isStr = o => typeof o === 'string',
        isObj = o => toString.call(o) === '[object Object]',
        isEl = o => o.toString().includes('HTML'),
        isArr = Array.isArray,
        ready = () => Ready || doc.readyState == 'complete',
        head = doc.head,
        RegExps = {
            email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
            timeString: /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/,
            dateString: /^(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/(?:[0-9]{2})?[0-9]{2}$/,
            hexadecimal: /^[0-9a-fA-F]+$/,
            hexColor: /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/
        },
        desc = (value, write, enumerable) => ({
            value,
            write: is.Bool(write) ? write : false,
            enumerable: is.Bool(enumerable) ? enumerable : false
        });

    if (Br && (tem = ua.match(/version\/([\.\d]+)/i)) !== null) Br[2] = tem[1];
    Br = (Br ? [Br[1], Br[2]] : [navigator.appName, navigator.appVersion, '-?']).join(' ');

    function promise(func) {
        return new Promise(func);
    }

    function Locs(test) {
        return [location.hash, location.href, location.pathname].some(test);
    }

    // get the last item in an array
    function last(arr) {
        return arr[arr.length - 1];
    }


    /**
     * @method dffstr
     * @memberof Craft
     * @summary creates a document fragment from a string (document, fragment, from, String} - dffstr
     * @param {String} html - text to convert to html
     */
    function dffstr(html) {
        return doc.createRange().createContextualFragment(html || '');
    }

    // get the string form of any object
    // then compare it to a given string
    function type(obj, str) {
        return toString.call(obj) === str;
    }

    /**
     * @method exec
     * @summary imediately executes a function or optionally returns internal callback that executes and returns the function.
     * @memberof Craft
     * @param {Function|Boolean} noreturn - if function imediately returns and executes if bool func doesn't get returned in callback
     * @param {*} [context] - context to bind the funcion to
     * @returns {Function|*} conditionally returns closure and executes func or returns executed func
     */
    function exec(noreturn, context) {
        if (isFunc(noreturn)) return noreturn.apply(context || this, slice(arguments, 2));
        return function () {
            if (noreturn) fn.apply(context, arguments);
            return fn.apply(context || this, arguments);
        }
    }

    // if x then return y else return z
    function W(x, y, z, a) {
        return a ? (x ? y : z) + a : x ? y : z;
    }


    /**
     * @method toInt
     * @summary converts a number or string value to an integer
     * @memberof Craft
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
     * @summary Splits a string at dots ".".
     * @method cutdot
     * @memberof Craft
     * @param {String} str - string to split at the dots
     */
    function cutdot(str) {
        return str.split('.');
    }
    /**
     * @summary joins a string array with dots "."
     * @method joindot
     * @memberof Craft
     * @param {Array|Arraylike} arr - array to join with dots
     */
    function joindot(arr) {
        if (!isArr(arr) && is.Arraylike(arr)) arr = toArr(arr);
        return arr.join('.');
    }

    /**
     * @summary is - Type Testing / Assertion
     * @namespace is
     */
    const is = {
        /**
         * @memberof is
         * @summary Test if something is a boolean type
         * @method Bool
         * @param {...*} args - value/values to test
         */
        Bool: ta(o => typeof o === 'boolean'),
        /**
         * @memberof is
         * @summary Test if something is a String
         * @method Str
         * @param {*} val - value to test
         */
        Str: isStr,
        /**
         * @memberof is
         * @summary Test if values are strings
         * @method Str
         * @param {...*} args - value/values to test
         */
        String: ta(isStr),
        /**
         * @memberof is
         * @summary Test if something is an Array
         * @method Arr
         * @param {...*} args - value/values to test
         */
        Arr: ta(isArr),
        /**
         * @memberof is
         * @summary Array.isArray alias for convenience and performance when only one argument is present
         * @method Array
         * @param {*} val - value to test
         */
        Array: isArr,
        /**
         * @memberof is
         * @summary Test if a value or multiple values are Array-Like
         * @method Arraylike
         * @param {...*} args - value/values to test
         */
        Arraylike: ta(o => {
            try {
                return def(o.length);
            } catch (e) {}
            return false;
        }),
        /**
         * @memberof is
         * @summary Determine whether a value is undefined
         * @method Undef
         * @param {...*} args - value/values to test
         */
        Undef() {
            return !def.apply(this, arguments);
        },
        /**
         * @memberof is
         * @summary Determine whether a value is in fact defined
         * @method Def
         * @param {...*} args - value/values to test
         */
        Def: def,
        /**
         * @memberof is
         * @summary Determine whether a value is null
         * @method Null
         * @param {...*} args - value/values to test
         */
        Null: ta(o => o === null),
        /**
         * @memberof is
         * @summary Determine whether a value is a DOM Node
         * @method Node
         * @param {...*} args - value/values to test
         */
        Node: ta(o => o instanceof Node),
        /**
         * @memberof is
         * @summary Test an element's tagname
         * @method Tag
         * @param {Node} element - node to test
         * @param {String} tag - tag to test node for
         */
        Tag: (element, tag) => isEl(element) ? element.tagName === tag.toUpperCase() : false,
        /**
         * @memberof is
         * @summary Determine whether a value is a DOM NodeList or Collection of Nodes
         * @method NodeList
         * @param {...*} args - value/values to test
         */
        NodeList: ta(nl => nl instanceof NodeList || is.Arraylike(nl) ? ta(n => n instanceof Node).apply(null, nl) : false),
        /**
         * @memberof is
         * @method Num
         * @summary Determine if a value is a Number
         * @param {...*} args - value/values to test
         */
        Num: ta(o => !isNaN(Number(o))),
        /**
         * @memberof is
         * @method Object
         * @summary Determine if a value is an Object
         * @param {...*} args - value/values to test
         */
        Object: ta(isObj),
        /**
         * @memberof is
         * @method Obj
         * @summary Determine if a value is an Object
         * @param {...*} args - value/values to test
         */
        Obj: isObj,
        /**
         * @memberof is
         * @method Json
         * @summary Determine if a sring is JSON
         * @param {...*} args - value/values to test
         */
        Json: ta(str => {
            try {
                JSON.parse(str);
                return true;
            } catch (e) {}
            return false;
        }),
        /**
         * @memberof is
         * @method Element
         * @summary Determine if a value is a HTMLElement
         * @param {...*} args - value/values to test
         */
        Element: ta(isEl),
        /**
         * @memberof is
         * @method File
         * @summary Determine if a value is a File Object
         * @param {...*} args - value/values to test
         */
        File: ta(o => type(o, '[object File]')),
        /**
         * @memberof is
         * @method FormData
         * @summary Determine if a value is of a FormData type
         * @param {...*} args - value/values to test
         */
        FormData: ta(o => type(o, '[object FormData]')),
        /**
         * @memberof is
         * @method Map
         * @summary Determine if a value is a Map
         * @param {...*} args - value/values to test
         */
        Map: ta(o => type(o, '[object Map]')),
        /**
         * @memberof is
         * @method Func
         * @summary Determine if a value is a function
         * @param {...*} args - value/values to test
         */
        Func: ta(isFunc),
        /**
         * @memberof is
         * @method True
         * @summary Determine if a variable/s are true
         * @param {...*} args - value/values to test
         */
        True: ta(o => o === true),
        /**
         * @memberof is
         * @method False
         * @summary Determine if a variable/s are false
         * @param {...*} args - value/values to test
         */
        False: ta(o => !o),
        /**
         * @memberof is
         * @method Blob
         * @summary Determine if a value is of Blob type
         * @param {...*} args - value/values to test
         */
        Blob: ta(o => type(o, '[object Blob]')),
        /**
         * @memberof is
         * @method RegExp
         * @summary Determine if a value is a Regular Expression
         * @param {...*} args - value/values to test
         */
        RegExp: ta(o => type(o, '[object RegExp]')),
        /**
         * @memberof is
         * @method Date
         * @summary Determine if a value is a Date type
         * @param {...*} args - value/values to test
         */
        Date: ta(o => type(o, '[object Date]')),
        /**
         * @memberof is
         * @method Set
         * @summary Determine if a value is a Set.
         * @param {...*} args - value/values to test
         */
        Set: ta(o => type(o, '[object Set]')),
        /**
         * @memberof is
         * @method Args
         * @summary Determine if a value is of type Arguments
         * @param {*} val - value/values to test
         */
        Args: val => !nil(val) && type(val, '[object Arguments]'),
        /**
         * @memberof is
         * @method Symbol
         * @summary Determine if a value is a Symbol
         * @param {...*} args - value/values to test
         */
        Symbol: ta(obj => type(obj, '[object Symbol]')),
        /**
         * @memberof is
         * @method char
         * @summary tests if a value is a single character
         * @param {...String} values to test
         */
        char: ta(val => isStr(val) && val.length == 1),
        /**
         * @memberof is
         * @method space
         * @summary tests if a value is a space character
         * @param {...String} values to test
         */
        space: ta(val => is.char(val) && (val.charCodeAt(0) > 8 && val.charCodeAt(0) < 14) || val.charCodeAt(0) === 32),
        /**
         * @memberof is
         * @method Uppercase
         * @summary Determine if a String is UPPERCASE
         * @param {String} char - value to test
         */
        Uppercase: str => isStr(str) && !is.Num(str) && str === str.toUpperCase(),
        /**
         * @memberof is
         * @method Lowercase
         * @summary Determine if a String is LOWERCASE
         * @param {String} char - value to test
         */
        Lowercase: str => isStr(str) && str === str.toLowerCase(),
        /**
         * @memberof is
         * @method Alphanumeric
         * @summary Determine if a String contains only characters and numbers (alphanumeric)
         * @param {String} str - value to test
         */
        Alphanumeric: str => /^[0-9a-zA-Z]+$/.test(str),
        /**
         * @memberof is
         * @method email
         * @summary Determines whether a String is a valid email
         * @param {String} email - value to test
         */
        email: email => RegExps.email.test(email),
        /**
         * @memberof is
         * @method URL
         * @summary Determines whether a String is a URL
         * @param {String} url - value to test
         */
        URL(url) {
            try {
                new URL(url);
                return true;
            } catch (e) {}
            return false;
        },
        /**
         * @memberof is
         * @method HexColor
         * @summary Determines whether a String is a HEX-COLOR (#fff123)
         * @param {String} HexColor - value to test
         */
        HexColor: hexColor => RegExps.hexColor.test(hexColor),
        /**
         * @memberof is
         * @method hexadecimal
         * @summary Determines whether a String is hexadecimal
         * @param {String} hexadecimal - value to test
         */
        hexadecimal: hexadecimal => RegExps.hexadecimal.test(hexadecimal),
        /**
         * @memberof is
         * @summary checks wether a date is today
         * @method today
         * @param {Date} obj - Date to test
         */
        today: obj => is.Date(obj) && obj.toDateString() === new Date().toDateString(),
        /**
         * @memberof is
         * @summary checks wether a date is yesterday
         * @method yesterday
         * @param {Date} obj - Date to test
         */
        yesterday(obj) {
            if (is.Date(obj)) {
                let now = new Date();
                return obj.toDateString() === new Date(now.setDate(now.getDate() - 1)).toDateString();
            }
            return false;
        },
        /**
         * @memberof is
         * @summary checks wether a date is tommorow
         * @method tomorrow
         * @param {Date} obj - Date to test
         */
        tomorrow(obj) {
            if (is.Date(obj)) {
                let now = new Date();
                return is.Date(obj) && obj.toDateString() === new Date(now.setDate(now.getDate() + 1)).toDateString();
            }
            return false;
        },
        /**
         * @memberof is
         * @summary Determines if a date is in the past
         * @method past
         * @param {String|Date} obj - Date to test
         */
        past(obj) {
            try {
                if (!is.Date(obj)) obj = isStr(obj) ? new Date(is.Num(obj) ? Number(obj) : obj) : new Date(obj);
            } catch (e) {}
            return is.Date(obj) && obj.getTime() < new Date().getTime();
        },
        /**
         * @memberof is
         * @method future
         * @summary Determines if a date is in the future
         * @param {String|Date} obj - Date to test
         */
        future: obj => !is.past(obj),
        /**
         * @memberof is
         * @method time
         * @summary Determines whether a String is a timeString
         * @param {String} time - value to test
         */
        time: time => RegExps.timeString.test(time),
        /**
         * @memberof is
         * @method dateString
         * @summary Determines whether a String is a dateString
         * @param {String} dateString - value to test
         */
        dateString: dateString => RegExps.dateString.test(dateString),
        /**
         * @memberof is
         * @method between
         * @summary Determines whether a Number is between a maximum and a minimum
         * @param {Number} val - number value to test
         * @param {Number} max - maximum to compare the value with
         * @param {Number} min - minimum to compare the value with
         * @returns {Boolean} wether or not the value is between the max and min
         */
        between: curry((val, max, min) => (val <= max && val >= min)),
        /**
         * @memberof is
         * @summary checks if a number is an integer
         * @method int
         * @param {*} val - value to test
         */
        int: val => is.Num(val) && val % 1 === 0,
        /**
         * @memberof is
         * @summary checks if a number is an even number
         * @method even
         * @param {*} val - value to test
         */
        even: val => is.Num(val) && val % 2 === 0,
        /**
         * @memberof is
         * @summary checks if a number is an odd number
         * @method odd
         * @param {*} val - value to test
         */
        odd: val => is.Num(val) && val % 2 !== 0,
        /**
         * @memberof is
         * @method positive
         * @summary checks if a number is positive
         * @param {*} val - value to test
         */
        positive: val => is.Num(val) && val > 0,
        /**
         * @memberof is
         * @method negative
         * @summary checks if a number is positive
         * @param {*} val - value to test
         */
        negative: val => is.Num(val) && val < 0,
        /**
         * @memberof is
         * @method neither
         * @summary tests that all parameters following the first are not the same as the first
         * @param {*} value - inital value to compare all other params with
         * @param {...*} arguments to compare with value
         */
        neither(value) {
            return slice(arguments, 1).every(val => value !== val);
        },
        /**
         * @memberof is
         * @method eq
         * @summary Determines if two variables are equal
         * @param a - first value to compare
         * @param b - second value to compare
         */
        eq: curry((a, b) => a === b),
        /**
         * @memberof is
         * @method or
         * @summary Returns the a || b
         * @param a - first value to compare
         * @param b - second value to compare
         */
        or: curry((a, b) => a || b),
        /**
         * @memberof is
         * @method lt
         * @summary Determines if a number is LOWER than another
         * @param {Number} val - value to test
         * @param {Number} other - num to test with value
         */
        lt: curry((val, other) => val < other),
        /**
         * @memberof is
         * @method lte
         * @summary Determines if a number is LOWER than or equal to another
         * @param {Number} val - value to test
         * @param {Number} other - num to test with value
         */
        lte: curry((val, other) => val <= other),
        /**
         * @memberof is
         * @method bt
         * @summary Determines if a number is BIGGER than another
         * @param {Number} val - value to test
         * @param {Number} other - num to test with value
         */
        bt: curry((val, other) => val > other),
        /**
         * @memberof is
         * @method bte
         * @summary Determines if a number is BIGGER than or equal to another
         * @param {Number} val - value to test
         * @param {Number} other - num to test with value
         */
        bte: curry((val, other) => val >= other),
        /**
         * @memberof is
         * @method empty
         * @summary Determines if a given collection or string is empty
         * @param {Object|Array|String} val - value to test if empty
         */
        empty: ta(val => {
            try {
                return !(isObj(val) ? Object.keys(val).length : is.Map(val) || is.Set(val) ? val.size : val.length) || val === '';
            } catch (e) {}
            return false;
        }),
        /**
         * @memberof is
         * @method Native
         * @summary Tests if something is a Native JavaScript feature
         * @param {*} val - value to test
         */
        Native(val) {
            let type = typeof val;
            return isFunc(val) ? RegExp('^' + String(Object.prototype.toString).replace(/[.*+?^${}()|[\]\/\\]/g, '\\$&').replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$').test(Function.prototype.toString.call(val)) : (val && type == 'object' && /^\[object .+?Constructor\]$/.test(val.toString)) || false;
        },
        /**
         * @memberof is
         * @method Input
         * @summary Tests where a dom element is an input of some sort
         * @param {Element|Node} - element to test
         */
        Input: element => isEl(element) && ['INPUT', 'TEXTAREA'].some(i => element.tagName.includes(i))
    };

    /**
     * @method forEach
     * @summary Easy way to loop through Collections, Objects and Numbers
     * @memberof Craft
     * @param {Array|Object|NodeList|Number|Arguments} iterable - any collection that is either an Object or has a .length value
     * @param {Function} func - function called on each iteration -> "function( value , indexOrKey ) {...}"
     */
    function forEach(iterable, func) {
        if (isFunc(func)) {
            let i = 0;
            if (is.Arraylike(iterable) && !localStorage)
                for (; i < iterable.length; i++) func(iterable[i], i, iterable);
            else if (is.int(iterable) && !isStr(iterable))
                while (iterable != i) func(i++);
            else
                for (i in iterable)
                    if (iterable.hasOwnProperty(i)) func(iterable[i], i, iterable);
        }
    }

    /**
     * @private
     * @summary Converts any Query/QueryAll to an Array of Nodes even if there is only one Node , this is error proof when no arguments are present it returns an empty array.
     * @param {Node|NodeList|Array|String} val - pass either a CSS Selector string , Node/NodeList or Array of Nodes
     * @param {Node|NodeList|Array|String} within - pass either a CSS Selector string , Node/NodeList or Array of Nodes to search for val in
     */
    function NodeOrQuerytoArr(val, within) {
        if (isStr(val)) val = queryAll(val, within);
        return is.Node(val) ? [val] : is.NodeList(val) ? toArr(val) : [];
    }

    /**
     * @method eventsys
     * @memberof Craft
     * @summary Adds an Event System to Arbitrary Objects and Classes.
     * @param {Object|Function|Class} obj - object to convert
     */
    function eventsys(obj) {
        if (!obj) obj = {};
        let listeners = new Set,
            stop = false;
        return Object.assign(obj, {
            on(type, func) {
                if (!isFunc(func)) throw new TypeError('.on() needs a function');
                func.type = type;
                listeners.add(func);
                func.handle = {
                    on() {
                        listeners.add(func);
                        return func.handle;
                    },
                    once: () => obj.once(type, func),
                    off() {
                        obj.off(func);
                        return func.handle;
                    }
                };
                return func.handle;
            },
            once(type, func) {
                obj.off(func);

                function funcwrapper() {
                    func.apply(obj, arguments);
                    obj.off(funcwrapper);
                }
                return obj.on(type, funcwrapper);
            },
            off(func) {
                if (listeners.has(func)) listeners.delete(func);
            },
            emit(type) {
                if (!stop && listeners.size > 0) {
                    let args = [].slice.call(arguments, 1),
                        ctx = this;
                    listeners.forEach(ln => {
                        if (ln.type == type && !stop) ln.apply(ctx, args);
                    });
                }
            },
            stopall(state) {
                stop = isBool(state) ? state : true;
            },
            defineHandle(name, type) {
                if (!type) type = name;
                obj[name] = (fn, useOnce) => obj[useOnce ? 'once' : 'on'](type, fn);
            }
        });
    }
    /**
     * @method observable
     * @memberof Craft
     * @summary Creates observables.
     * @param {Object|Function|Class} obj - object to convert
     */
    function observable(obj) {
        if (!obj) obj = {};
        obj = eventsys(obj);
        let listeners = {
            Get: new Set,
            Set: new Set,
        };
        defineprop(obj, 'isObservable', desc(true));
        ['$get', '$set'].forEach(prop => {
            let accessor = prop == '$get' ? 'Get' : 'Set';
            defineprop(obj, prop, desc((prop, func) => {
                if (isFunc(prop)) {
                    func = prop;
                    prop = '*';
                }
                if (!isFunc(func)) throw new Error('.' + prop + ' no function');
                let listener = {
                    prop: isStr(prop) ? prop : '*',
                    fn: func,
                }
                let options = {
                    on() {
                        listeners[accessor].add(listener);
                        return options
                    },
                    off() {
                        listeners[accessor].delete(listener);
                        return options
                    },
                };
                return options.on();
            }));
        });

        defineprop(obj, '$change', desc((prop, func) => {
            if (isFunc(prop)) {
                func = prop;
                prop = '*';
            }
            if (!isFunc(func)) throw new Error('.$change : no function');
            let listener = {
                prop: isStr(prop) ? prop : '*',
                fn: func,
                multi: true,
            }
            let options = {
                on() {
                    listeners.Get.add(listener);
                    listeners.Set.add(listener);
                    return options
                },
                off() {
                    listeners.Get.delete(listener);
                    listeners.Set.delete(listener);
                    return options
                },
            };
            return options.on();
        }));
        defineprop(obj, 'get', desc(key => {
            if (key != 'get' && key != 'set') {
                let val;
                listeners.Get.forEach(ln => {
                    if (ln.prop === '*' || ln.prop === key) val = ln.multi ? ln.fn('get', key, obj) : ln.fn(key, obj);
                });
                return val != undef ? val : obj[key];
            } else return obj[key];
        }));
        defineprop(obj, 'set', desc((key, value) => {
            let val;
            listeners.Set.forEach(ln => {
                if (ln.prop === '*' || ln.prop === key) val = ln.multi ? ln.fn('set', key, value, obj, Object.hasOwnProperty(obj, key)) :
                    ln.fn(key, value, obj, Object.hasOwnProperty(obj, key));
            });
            val = val != undef ? val : value;
            if (isObj(val) && !val.isObservable) val = observable(val);
            obj.emit('$uberset:' + key, val);
            obj[key] = val;
        }));

        for (let key in obj)
            if (isObj(obj[key]) && !obj[key].isObservable) obj[key] = observable(obj[key]);
        if (typeof Proxy != "undefined") return new Proxy(obj, {
            get(target, key) {
                if (key != 'get' && key != 'set') {
                    let val;
                    listeners.Get.forEach(ln => {
                        if (ln.prop === '*' || ln.prop === key) val = ln.multi ? ln.fn('get', key, target) : ln.fn(key, target);
                    });
                    return val != undef ? val : Reflect.get(target, key);
                } else return Reflect.get(target, key);
            },
            set(target, key, value) {
                let val, onetime = false;
                listeners.Set.forEach(ln => {
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

        console.warn('This JavaScript Environment does not support Proxy, observables need to use the .set and .get accessors to work');
        return obj;
    }

    /**
     * Event Handler
     * @method EventHandler
     * @memberof Craft
     * @namespace EventHandler
     * @param {String} EventType - set the type of event to listen for example "click" or "scroll"
     * @param {Node|NodeList|window|document} Target - the Event Listener's target , can also be a NodeList to listen on multiple Nodes
     * @param {Function} Func - Handler function that will be called when the event is triggered -> "function( event , event.srcElement ) {...}"
     * @returns Interface on,off,once
     */
    function EventHandler(EventType, Target, func, Within) {
        return new function () {
            EventType = EventType || 'click';
            this.state = false;
            Target = (Target !== root && Target !== doc) ? NodeOrQuerytoArr(Target, Within) : [Target];
            if (isStr(EventType) && EventType.includes(',')) EventType = EventType.split(',');
            if (!isArr(EventType)) EventType = [EventType];

            let FuncWrapper = e => func(e, e.target, Craft.deglove(Target));

            /**
             * @summary Change the Event type to listen for
             * @return {String} type - the name of the event/s to listen for
             */
            defineprop(this, 'Type', {
                set(type) {
                    let ehdl = this;
                    //  have you tried turning it on and off again? - THE IT CROWD
                    ehdl.off();
                    EventType = type.includes(',') ? type.split(',') : type;
                    if (!isArr(EventType)) EventType = [EventType];
                    ehdl.on();
                    return ehdl;
                },
                get() {
                    return EventType;
                },
                enumerable: true
            });
            /**
             * @summary Activates the EventHandler to start listening for the EventType on the Target/Targets
             */
            this.on = function () {
                let ehdl = this;
                Target.forEach(target => {
                    EventType.forEach(evt => {
                        target.addEventListener(evt, FuncWrapper);
                    });
                });
                ehdl.state = true;
                return ehdl;
            }

            /**
             * @summary De-activates / turns off the EventHandler to stop listening for the EventType on the Target/Targets
             * can still optionally be re-activated with on again
             */
            this.off = function () {
                let ehdl = this;
                Target.forEach(target => {
                    EventType.forEach(evt => {
                        target.removeEventListener(evt, FuncWrapper);
                    });
                });
                ehdl.state = false;
                return ehdl;
            }

            /**
             * @summary once the the Event has been triggered the EventHandler will stop listening for the EventType on the Target/Targets
             * the Handler function will be called only once
             */
            this.once = () => {
                let ehdl = this;
                FuncWrapper = e => {
                    func(e, e.target, Craft.deglove(Target));
                    ehdl.off.state = false;
                };
                return ehdl.on();
            }


        }
    }

    /**
     * @summary Easy way to get a DOM Node or Node within another DOM Node using CSS selectors.
     * @method query
     * @memberof Craft
     * @param {String} selector - CSS selector to query the DOM Node with
     * @param {Node|string=} element - Optional Node or CSS selector to search within insead of document
     */
    function query(selector, element) {
        if (isStr(element)) element = doc.querySelector(element);
        return is.Node(element) ? element.querySelector(selector) : doc.querySelector(selector);
    };

    /**
     * @method queryAll
     * @memberof Craft
     * @summary Easy way to get a DOM NodeList or NodeList within another DOM Node using CSS selectors
     * @param {String} selector - CSS selector to query the DOM Nodes with
     * @param {Node|NodeList|string=} element - Optional Node or CSS selector to search within insead of document
     */
    function queryAll(selector, element) {
        if (isStr(element)) element = queryAll(element);
        let list;
        if (Craft.len(element) !== 1 && (isArr(element) || is.NodeList(element))) {
            list = [];
            forEach(element, el => {
                if (isStr(el)) el = query(el);
                if (is.Node(el)) {
                    el = queryAll(selector, el);
                    if (is.NodeList(el)) list.concat(toArr(el));
                }
            });
        } else list = is.NodeList(element) ? element[0].querySelectorAll(selector) : is.Node(element) ? element.querySelectorAll(selector) : doc.querySelectorAll(selector);
        return is.Null(list) ? list : isArr(list) ? list : toArr(list);
    };
    /**
     * @method queryEach
     * @memberof Craft
     * @summary Easy way to loop through Nodes in the DOM using a CSS Selector or a NodeList
     * @param {String|NodeList|Node} selector - CSS selector to query the DOM Nodes with or NodeList to iterate through
     * @param {Node|String=} element - Optional Node or CSS selector to search within insead of document
     * @param {Function} func - function called on each iteration -> "function( Element , index ) {...}"
     * @param {boolean=} returnList - should queryEach also return the list of nodes
     */
    function queryEach(selector, element, func, returnList) {
        if (isFunc(element)) func = element;
        let list = NodeOrQuerytoArr(selector, element);
        forEach(list, func);
        if (returnList) return list;
    };

    function EventTypes(Target, within, listen) {
        let etype = type => fn => EventHandler(type, Target, fn, within)[listen || 'on']();
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
        return (fn, context) => function (evt) {
            if (evt.keyCode === keycode) fn.apply(context || this, arguments);
        };
    }

    function EvtLT(ListenType) {
        return function (EventType, Target, element, func) {
            let args = toArr(arguments);
            return isFunc(Target) ? EventHandler(EventType, root, Target)[ListenType]() :
                args.length < 3 && !args.some(isFunc) ? EventTypes(EventType, Target, ListenType) :
                isFunc(element) ? EventHandler(EventType, Target, element)[ListenType]() :
                EventHandler(EventType, Target, func, element)[ListenType]();
        };
    }

    /**
     * @method on
     * @memberof Craft
     * @summary Starts listening for an EventType on the Target/Targets
     * @param {String} EventType - set the type of event to listen for example "click" or "scroll"
     * @param {Node|NodeList|window|document} Target - the Event Listener's target , can be a NodeList to listen on multiple Nodes
     * @param {Function} Func - Handler function that will be called when the event is triggered -> "function( event , event.srcElement ) {...}"
     * @returns off - when on is defined as a variable "var x = on(...)" it allows you to access all the EventHandler interfaces off,once,on
     */
    const on = EvtLT('on');
    /**
     * @method once
     * @memberof Craft
     * @summary Starts listening for an EventType on the Target/Targets ONCE after triggering the once event Listener will stop listening
     * @param {String} EventType - set the type of event to listen for example "click" or "scroll"
     * @param {Node|NodeList|window|document} Target - the Event Listener's target , can be a NodeList to listen on multiple Nodes
     * @param {Function} Func - Handler function that will be called when the event is triggered -> "function( event , event.srcElement ) {...}"
     * @returns on,off,once - when once is defined as a variable "var x = once(...)" it allows you to access all the EventHandler interfaces off,once,on
     */
    const once = EvtLT('once');

    const eventoptions = 'Click,Input,DoubleClick,Focus,Blur,Keydown,Mousemove,Mousedown,Mouseup,Mouseover,Mouseout'.split(',');

    /**
     * @summary craft elements on the fly using this nifty method
     * @method craftElement
     * @memberof Craft
     * @param {String} name - tag name of element to be created
     * @param {String|NodeList|Array|Node} inner - inner value(s) of element
     * @param {Object|String} attributes - Key value pair object defining element attributes or URI variable style string
     * @returns {Element} newly created element
     */
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
        return element;
    }

    /**
     * @summary Contains several methods for Element Creation
     * @namespace dom
     */
    let Dom = {
        element: craftElement,
        /**
         * @memberof dom
         * @summary Makes document fragments also allows attaching nodes or strings that get converted to html.
         * @method frag
         * @param {String|Node} [inner] - node or string to convert to html
         * @returns {DocumentFragment}
         */
        frag(inner) {
            let dfrag = doc.createDocumentFragment();
            if (isStr(inner)) dfrag = dffstr(inner);
            if (is.Node(inner)) dfrag.appendChild(inner);
            return dfrag;
        },
        /**
         * @summary creates an img element with the options provided
         * @method img
         * @memberof dom
         * @param {String} sets src of the img
         * @param {String} sets alt of the img
         * @param {String|Object} [attr] Key value pair object defining element attributes or URI variable style string
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
        a: (link, inner, attr) => Dom.element('a', inner, attr, 'href=' + link),
        script(code, attr, defer, onload, nosrc) {
            let script = Dom.element('script', '', attr, {
                type: 'text/javascript'
            });
            if (code.slice(0, 4) === 'src=') return script.setAttr(code);
            if (isFunc(onload)) {
                script.onload = () => {
                    script.removeAttribute('initx');
                    onload();
                };
                let random = Craft.randomInt(1000);
                script.setAttribute('initx', random);
                code += `\ndocument.head.querySelector('script[initx="${random}"]').dispatchEvent(new UIEvent('load'));\n`;
            }
            if (defer == true) script.defer = defer != false;
            if (nosrc == true) script.text = code;
            else script.src = Craft.URLfrom(code, {
                type: 'text/javascript'
            });
            return script;
        }
    };
    'table,td,th,tr,article,aside,ul,ol,li,h1,h2,h3,h4,h5,h6,div,span,pre,code,section,button,br,label,header,i,style,nav,menu,main,menuitem'.split(',').forEach(tag => {
        Dom[tag] = (inner, attr, ea) => Dom.element(tag, inner, attr, ea);
    });

    function domNodeList(elements) {
        Craft.omit(Object.getOwnPropertyNames(Array.prototype), 'length').forEach(method => {
            elements[method] = Array.prototype[method];
        });

        /**
         * @summary Listen for Events on the NodeList
         * @param {String} string indicating the type of event to listen for
         * @param {Function} func - handler function for the event
         * @returns handler (off,once,on)
         */
        elements.on = (eventType, func) => on(eventType, elements, func);
        /**
         * @summary add CSS style rules to NodeList
         * @param {object} styles - should contain all the styles you wish to add example { borderWidth : '5px solid red' , float : 'right'}...
         */
        elements.css = styles => Craft.css(elements, styles);
        elements.addClass = function (Class) {
            elements.forEach(el => {
                el.classList.add(Class);
            });
            return elements;
        };
        elements.gotClass = function () {
            return elements.every(el => toArr(arguments).every(Class => el.classList.contains(Class)));
        };

        elements.GotSomeClass = function () {
            return elements.some(el => toArr(arguments).every(Class => el.classList.contains(Class)));
        };

        elements.stripClass = Class => {
            elements.forEach(el => {
                el.classList.remove(Class);
            });
            return elements;
        };
        elements.toggleClass = (Class, state) => {
            forEach(elements, el => {
                (is.Bool(state) ? state : el.classList.contains(Class)) ? el.classList.remove(Class): el.classList.add(Class);
            });
            return elements;
        };

        /**
         * @summary removes a specific Attribute from the this.element
         * @memberof dom
         * @param {...String} name of the Attribute/s to strip
         */
        elements.stripAttr = function () {
            elements.forEach(el => {
                forEach(arguments, attr => {
                    el.removeAttribute(attr);
                });
            });
            return elements;
        };
        /**
         * @method hasAttr
         * @summary checks if the element has a specific Attribute or Attributes
         * @memberof dom
         * @param {String|boolean} name of the Attribute or if true checks that it has some (||) of the attributes or if false checks that it has all of the attributes (&&)
         * @param {...String} names of attributes to check for
         */
        elements.hasAttr = function (attr) {
            if (isStr(attr) && arguments.length == 1) return elements.every(el => el.hasAttribute(attr));
            const args = Craft.flatten(arguments);
            return elements.every(el => args.every(a => el.hasAttribute(a)));
        };
        /**
         * @method toggleAttr
         * @memberof dom
         * @summary Toggles an attribute on element , optionally add value when toggle is adding attribute.
         * @param {String} name - name of the attribute to toggle
         * @param {String} val - value to set attribute to
         * @param {boolean=} rtst - optionally return a bool witht the toggle state otherwise returns the element
         */
        elements.toggleAttr = function (name, val, rtst) {
            elements.map(el => {
                el[W(is.Bool(val) ? !val : el.hasAttr(name), 'strip', 'set', 'Attr')](name, val);
            });
            return rtst ? elements.every(el => el.hasAttr(name)) : elements;
        };
        /**
         * @method setAttr
         * @summary Sets or adds an Attribute on elements of a NodeList
         * @memberof dom
         * @param {String} Name of the Attribute to add/set
         * @param {String} Value of the Attribute to add/set
         */
        elements.setAttr = function (attr, val) {
            forEach(elements, el => {
                if (!def(val)) {
                    if (isStr(attr)) attr.includes('=') || attr.includes('&') ? attr.split('&').forEach(Attr => {
                            let attribs = Attr.split('=');
                            def(attribs[1]) ? element.setAttribute(attribs[0], attribs[1]) : element.setAttribute(attribs[0], '');
                        }) :
                        element.setAttribute(attr, '');
                    else if (isObj(attr)) forEach(attr, (value, Attr) => {
                        element.setAttribute(Attr, value);
                    });
                } else element.setAttribute(attr, val || '');
            });
            return elements;
        };

        elements.append = function () {
            forEach(arguments, arg => {
                forEach(elements, el => {
                    el.appendChild((is.Node(val) ? val : dffstr(val)).cloneNode(true));
                });
            });
            return elements;
        };
        elements.appendTo = (val, within) => {
            forEach(elements, el => {
                if (isStr(el)) el = query(val, within);
                if (is.Node(el)) el.appendChild(el);
            });
            return elements;
        };
        elements.prepend = function () {
            forEach(arguments, val => {
                forEach(elements, el => {
                    el.insertBefore(W(is.Node(val), val, dffstr(val)).cloneNode(true), el.firstChild);
                });
            });
            return elements;
        };
        elements.hide = () => elements.css({
            display: 'none'
        });
        elements.show = () => elements.css({
            display: ''
        });

        elements.pick = i => {
            if (is.int(i) && def(elements[i])) return dom(elements[i]);
            else if (elements.includes(i)) return dom(i);
        };

        return elements;
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
                else is.Node(val) || isEl(val) ? el.append(val) : el[type] += isFunc(val) ? val.call(el) : val;
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
        element.state = eventsys();
        element.state.on('attr', function (attr) {
            element.state.emit.apply(element, ['attr:' + attr].concat(arguments));
        });


        element.newSetGet = newSetGet;

        element.newSetGet('colorAccent', func => {
            if (element.hasAttr('color-accent') && isFunc(func)) func(element.getAttr('color-accent'));
        });

        /**
         * @method Text
         * @summary changes or returns the innerHTML value of a Node
         * @memberof dom
         * @param {String=} sets the innerHTML value or when undefined gets the innerHTML value
         */
        element.html = Inner('innerHTML', element);

        /**
         * @method Text
         * @summary changes or returns the textContent value of a Node
         * @memberof dom
         * @param {String=} sets the textContent value or when undefined gets the textContent value
         */
        element.Text = Inner('textContent', element);

        /**
         * @method bind
         * @memberof dom
         * @summary element.bind is what drives data-binding in Crafter.js it binds to values in models and objects
         * @param {String} bind - path to bind to
         * @example element.bind('myModel.value');
         */
        element.bind = bind => {
            if (!bind.includes('.')) {
                if (!def(root[bind])) {
                    let getval = element.html();
                    if (getval) Craft.setDeep(root, bind, getval);
                } else element.html(root[bind]);
                if (element.isInput) element.SyncInput(root, bind, val => {
                    queryEach(`[bind=${bind}]`, el => {
                        if (val != undef) el.html(val);
                    });
                });
                return element;
            }

            let {
                obj,
                cutbind,
                prop,
                val
            } = Craft.getPath(bind, true);

            function bindval() {
                let alt, path = joindot(Craft.omit(cutbind, cutbind[0]));
                if (!def(val)) val = Craft.getDeep(obj, path);
                def(val) ? element.html(val) : Craft.setDeep(obj, path, element.html());
                if (obj.isObservable) obj.on('$uberset:' + prop, element.html);
                else alt = val => {
                    queryEach(`[bind=${bind}]`, el => {
                        if (val != undef) el.html(val);
                    });
                };
                if (element.isInput) element.SyncInput(obj, cutbind.length == 1 ? cutbind[0] : path, alt);
            }

            if (!obj) Craft.modelInit(cutbind[0], scope => {
                if (scope) {
                    obj = scope;
                    bindval();
                }
            });
            else bindval();
            return element;
        };

        element.unbind = bind => {

        };
        /**
         * @method replace
         * @summary replaces a Node with another node provided as a parameter/argument
         * @memberof dom
         * @param {Node} Node to replace with
         */
        element.replace = val => {
            element.parentNode.replaceChild(val, element);
            return element;
        };
        /**
         * @method clone
         * @memberof dom
         * @summary clones an element it's children, optionally
         * @param {Boolean} val - defaults to true if set to false children of element won't be cloned
         */
        element.clone = val => domManip(element.cloneNode(val == undef ? true : val));

        /**
         * @method importview
         * @memberof dom
         * @summary imports a file and renders it on to the node
         * @param {String) src - url to fetch from
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
                credentials: 'same-origin'
            }).then(res => {
                if (!res.ok) console.warn(`<${element.localName}> : unable to import view - ${src}`);
                else res.text().then(view => {
                    if (cache) localStorage.setItem(src, view);
                    element.html(view);
                });
            });
        };

        /**
         * append the Element to another node using either a CSS selector or a Node
         * @memberof dom
         * @param {Node|String} CSS selector or Node to append the this.element to
         */
        element.appendTo = function (val, within) {
            if (isStr(val)) val = query(val, within);
            if (is.Node(val)) val.appendChild(element);
            return element;
        };
        /**
         * prepend the Element to another node using either a CSS selector or a Node
         * @memberof dom
         * @param {Node|String} CSS selector or Node to append the this.element to
         */
        element.prependTo = function (val, within) {
            if (isStr(val)) val = query(val, within);
            if (is.Node(val)) val.insertBefore(element, val.firstChild);
            return element;
        };
        /**
         * append text or a Node to the element
         * @memberof dom
         * @param {Node|String} String or Node to append to the this.element
         */
        element.append = function () {
            let domfrag = dom.frag();
            forEach(arguments, val => {
                domfrag.appendChild(is.Node(val) ? val : dffstr(val));
            });
            element.appendChild(domfrag);
            return element;
        };
        /**
         * prepend text or a Node to the element
         * @memberof dom
         * @param {Node|String} String or Node to prepend to the this.element
         */
        element.prepend = function () {
            let domfrag = dom.frag();
            forEach(arguments, val => {
                domfrag.appendChild(is.Node(val) ? val : dffstr(val));
            });
            element.insertBefore(domfrag, element.firstChild);
            return element;
        };

        /**
         * @func element.modify - used to do things with your element without breaking scope
         * @param {function) func - callback to execute
         * @returns (element) to make it chainable
         */
        element.modify = func => {
            func.call(element, element);
            return element;
        };
        /**
         * Listen for Events on the element or on all the elements in the NodeList
         * @memberof dom
         * @param {String} string indicating the type of event to listen for
         * @param {Function} func - handler function for the event
         * @returns handler (off,once,on)
         */
        element.on = (eventType, func) => on(eventType, element, func);

        element.emit = (evt, detail) => {
            if (!isStr(evt)) throw new TypeError('element.emit : event name needs to be a string');
            element.dispatchEvent(new CustomEvent(evt, {
                detail: def(detail) || null
            }));
        };

        element.newSetGet('ondestroy', fn => {
            if (isFunc(fn)) element.on('destroy', fn);
        });

        function evlt(type) {
            return (fn, ltype) => (ltype ? once : on)(type, element, fn);
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
         * @memberof dom
         * @param {object} styles - should contain all the styles you wish to add
         * @example element.css({ borderWidth : '5px solid red' , float : 'right'});
         */
        element.css = (styles, prop) => Craft.css(element, styles, prop);
        /**
         * check if the element has got a specific CSS class
         * @memberof dom
         * @param {...String} name of the class to check for
         */
        element.gotClass = function () {
            return slice(arguments).every(Class => element.classList.contains(Class));
        };

        /**
         * Add a CSS class to the element
         * @memberof dom
         * @param {String} name of the class to add
         */
        element.addClass = function () {
            forEach(arguments, Class => {
                element.classList.add(Class);
            });
            return element;
        };
        /**
         * removes a specific CSS class from the element
         * @memberof dom
         * @param {...String} name of the class to strip
         */
        element.stripClass = function () {
            forEach(arguments, Class => {
                element.classList.remove(Class);
            });
            return element;
        };
        /**
         * Toggle a CSS class to the element
         * @memberof dom
         * @param {String} name of the class to add
         * @param {boolean=} state - optionally toggle class either on or off with bool
         */
        element.toggleClass = function (Class, state) {
            if (!is.Bool(state)) state = element.gotClass(Class);
            element[W(state, 'strip', 'add', 'Class')](Class);
            return element;
        };
        /**
         * removes a specific Attribute from the this.element
         * @memberof dom
         * @param {...String} name of the Attribute/s to strip
         */
        element.stripAttr = function () {
            forEach(arguments, element.removeAttribute.bind(element));
            return element;
        };
        /**
         * checks if the element has a specific Attribute or Attributes
         * @memberof dom
         * @param {String|boolean} name of the Attribute or if true checks that it has some (||) of the attributes or if false checks that it has all of the attributes (&&)
         * @param {...String} names of attributes to check for
         */
        element.hasAttr = function () {
            if (isStr(arguments[0])) return element.hasAttribute(arguments[0]);
            return toArr(arguments).every(a => element.hasAttribute(a));
        };
        /**
         * Sets or adds an Attribute on the element
         * @memberof dom
         * @param {String} Name of the Attribute to add/set
         * @param {String} Value of the Attribute to add/set
         */
        element.setAttr = (attr, val) => {
            if (!def(val)) {
                if (isStr(attr)) attr.includes('=') || attr.includes('&') ? attr.split('&').forEach(Attr => {
                    def(Attr.split('=')[1]) ? element.setAttribute(Attr.split('=')[0], Attr.split('=')[1]) : element.setAttribute(Attr.split('=')[0], '');
                }) : element.setAttribute(attr, '');
                else if (isObj(attr)) forEach(attr, (value, Attr) => {
                    element.setAttribute(Attr, value);
                });
            } else element.setAttribute(attr, val || '');
            return element;
        };
        /**
         * Gets the value of an attribute , short alias for element.getAttribute
         * {String} attr - name of attribute to get
         */
        element.getAttr = element.getAttribute;
        element.attr = (attr, val) => isStr(attr) && !def(val) ? element.getAttr(attr) : element.setAttr(attr, val);

        element.prop = element.hasAttr;
        /**
         * Toggles an attribute on element , optionally add value when toggle is adding attribute
         * @param {String} name - name of the attribute to toggle
         * @param {String} val - value to set attribute to
         * @param {boolean=} rtst - optionally return a bool witht the toggle state otherwise returns the element
         */
        element.toggleAttr = (name, val, rtst) => {
            element[W(is.Bool(val) ? !val : element.hasAttr(name), 'strip', 'set', 'Attr')](name, val);
            return rtst ? element.hasAttr(name) : element;
        };

        /**
         * Remove the element after a time in milliseconds
         * @param {number=} time - time to wait before self destructing the element
         */
        element.removeAfter = time => {
            setTimeout(element.remove.bind(element), time || 5000);
            return element;
        };

        defineprop(element, 'Siblings', {
            get() {
                return Craft.omit(element.parentNode.children, element).filter(el => isEl(el));
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
         * @param {String|number=} pixel value to set
         */
        element.newSetGet('Width', pixels => {
            element.style.width = pixels;
        }, () => element.getRect().with);

        /**
         * sets or gets the element's pixel height
         * @memberof dom
         * @param {String|number=} pixel value to set
         */
        element.newSetGet('Height', pixels => {
            element.style.height = pixels;
        }, () => element.getRect().height);
        /**
         * move the element using either css transforms or plain css possitioning
         * @param {String|num} x - x-axis position in pixels
         * @param {String|num} y - y-axis position in pixels
         * @param {boolean=} transform - should move set the position using css transforms or not
         * @param {String=} position - set the position style of the element absolute/fixed...
         * @param {boolean=} chainable - should this method be chainable defaults to false for performance reasons
         */
        element.move = function (x, y, transform) {
            if (transform === true) {
                //element.style.willChange = 'transform';
                element.style.transform = `translateX(${x}px) translateY(${y}px)`;
            } else {
                element.top = y + 'px';
                element.left = x + 'px';
            }
        };
        /**
         * performs a query inside the element
         * @memberof dom
         * @param {String} CSS selector
         * @returns {Node|Null}
         */
        element.query = selector => query(selector, element);

        element.next = (reset, dm) => {
            let sb = toArr(element.parentNode.children),
                nextnode = sb.indexOf(element) + 1;
            if (!sb[nextnode]) return reset ? (dm ? dom(sb[0]) : sb[0]) : null;
            return dm ? dom(sb[nextnode]) : sb[nextnode];
        };
        element.previous = (reset, dm) => {
            let sb = toArr(element.parentNode.children),
                nextnode = sb.indexOf(element) - 1;
            if (!sb[nextnode]) return reset ? (dm ? dom(sb[sb.length - 1]) : sb[sb.length - 1]) : null;
            return dm ? dom(sb[nextnode]) : sb[nextnode];
        };

        /**
         * performs a queryAll inside the element
         * @memberof dom
         * @param {String} CSS selector
         * @returns {NodeList|Null}
         */
        element.queryAll = selector => queryAll(selector, element);

        if (element.isInput) {
            element.SyncInput = (obj, key, onset) => Craft.SyncInput(element, obj, key, onset);
            element.disconectInputSync = () => Craft.disconectInputSync(element);
        }

        element.observe = (func, options, name) => {
            if (!isStr(name)) name = 'MutObserver';
            element[name] = new MutationObserver(muts => {
                muts.forEach(mut => {
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
        element.unobserve = name => {
            if (!isStr(name)) name = 'MutObserver';
            if (def(element[name])) {
                element[name].disconnect();
                delete element[name];
            }
            return element;
        };
        element.observeAttrs = func => {
            if (isFunc(func)) return element.state.on('attr', function (attr) {
                func.apply(element, arguments);
            });
        };
        return element;
    }

    /**
     * @method dom
     * @summary returns many useful methods for interacting with and manipulating the DOM or creating elements
     * @memberof dom
     * @param {Node|NodeList|string=} element - optional Node, NodeList or CSS Selector that will be affected by the methods returned
     * @param {Node|string=} within - optional Node, NodeList or CSS Selector to search in for the element similar to query(element,within)
     * @param {Boolean=} one - even if there are more than one elements matching a selector only return the first one
     */
    function dom(element, within, one) {
        if (within == true) {
            one = within;
            within = null;
        }
        if (!one) {
            if (isStr(element)) element = queryAll(element, within);
            if (is.NodeList(element)) {
                element = toArr(element).filter(isEl);
                if (element.length != 1) return domNodeList(element);
                else element = element[0];
            }
        } else if (isStr(element)) element = query(element, within);
        if (is.Node(element)) return !element['_DOMM'] ? domManip(element) : element;
        return Dom;
    }
    for (let key in Dom) defineprop(dom, key, getpropdescriptor(Dom, key));
    if (root.Proxy) dom = new Proxy(dom, {
        get(obj, key) {
            if (!obj.hasOwnProperty(key)) {
                if (Dom.hasOwnProperty(key)) return Dom[key];
                return (inner, attr, eattr, str) => Dom.element(key, inner, attr, eattr, str);
            }
            return obj[key];
        }
    });

    /**
     * @global
     * @namespace Craft
     * @summary Craft is Crafter.js's Core containing most functionality.
     */
    var Craft = {
        /**
         * @memberof Craft
         * @summary general Crafter notification event system
         */
        notifier: eventsys(),
        /**
         * @method arrDiff
         * @memberof Craft
         * @summary Returns an object or calls a function with all the differences between two arrays
         * @param {Array} arr - array to be compared
         * @param {Array} newArr - second array to be compared
         * @param {Function=} func - optional function that recieves all the info as parameters
         */
        arrDiff(arr, arrb, func) {
            let added = arrb.filter(item => {
                    if (!arr.includes(item)) return item;
                }),
                same = arr.filter(item => {
                    if (arrb.includes(item)) return item;
                }),
                diff = Craft.omit(same.concat(added), undef);
            if (isFunc(func) && !is.empty(diff)) func(arr, arrb, added, same, diff);
            else return {
                added,
                same,
                diff,
                arr,
                arrb,
            };
        },
        /**
         * @method deglove
         * @summary Checks an array's length if the array contains only a single item it is returned.
         * @memberof Craft
         * @param {array|arraylike) arr - collection to deglove
         * @returns (array|*)
         */
        deglove: arr => is.Arraylike(arr) && arr.length == 1 ? arr[0] : arr,
        last,
        cutdot,

        joindot,
        dffstr,
        /**
         * Convert Arraylike variables to Array
         * {...*} val - arraylike value to convert to array
         */
        toArr,
        /**
         * Convert numbers to integers
         * {number|String} val - number to convert to an integer
         */
        toInt,
        promise,
        eventsys,
        // dom methods and stuff
        dom,
        query,
        queryAll,
        queryEach,
        craftElement,
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
            return arr;
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
                props = props.concat(Object.getOwnPropertyNames(obj));
            } while (obj = Object.getPrototypeOf(obj));
            return props;
        },
        unique: arr => toArr(new Set(Craft.flatten(arr))),
        /**
         * Flattens any multidimentional array or arraylike object
         * @method flatten
         * @memberof Craft
         * @param {Array|Arraylike} arr - multidimentional array(like) object to flatten
         */
        flatten: arr => (!isArr(arr) && is.Arraylike(arr) ? toArr(arr) : isArr(arr) ? arr : []).reduce((flat, toFlatten) => flat.concat(isArr(toFlatten) ? Craft.flatten(toFlatten) : toFlatten), []),
        /**
         * Gets a value from inside an object using a reference string
         * @method getDeep
         * @memberof Craft
         * @example Craft.getDeep(myObj,'Company.employees[16].person.name') -> Mr Smithers or Craft.getDeep(anObj,'Colony.Queen.brood') -> [...ants]
         * @param {Object} obj - the object to extract values from
         * @param {String} path - string to reference value by simple dot notation or array refference example Craft.getDeep({ a : { b : [1,2,3] }},"a.b[2]") -> 3
         */
        getDeep(obj, path) {
            try {
                cutdot(path.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '')).map(step => {
                    return step in obj || (root.Reflect && Reflect.has(obj, step)) ? obj = (obj.isObservable ? obj.get(step) : obj[step]) : obj = undef
                });
                return obj;
            } catch (e) {}
        },
        /**
         * Craft.setDeep  is similar to getDeep it uses a string to reference to a value
         * @method setDeep
         * @memberof Craft
         * @param {Object} obj - the object to set values on
         * @param {String} path - string to reference value by simple dot notation
         * @param {*} value - value to set
         * @param {boolean} robj - should the function return the object
         */
        setDeep(obj, path, val, robj) {
            try {
                if (!path.includes('.')) obj.isObservable ? obj.set(path, val) : obj[path] = val;
                else {
                    path = cutdot(path);
                    for (let i = 0, temp = obj, plen = path.length - 1; i < plen; i++) {
                        if (path[i] in temp) temp = temp[path[i]];
                        else if (i != plen) temp = (temp.isObservable ? temp.set(path[i], {}) : temp[path[i]] = {});
                        else temp.isObservable ? temp.set(path[plen], val) : temp[path[plen]] = val;
                    }
                }
                if (robj) return obj;
            } catch (e) {
                console.warn(`Craft.setDeep : ran into some trouble setting ${path}`);
            }
        },
        /**
         * forEachDeep is used to loop through any multi layered object - (flattens and loops through all enumerable properties in a given object)
         * @method forEachDeep
         * @memberof Craft
         * @param {Object} obj - the object to loop through
         * @param {Function} func - function to handle each iteration
         * @param {String=} path - string to reference value by simple dot notation
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
                isArr(object) ? currentPath += `[${key}]` : !currentPath ? currentPath = key : currentPath += '.' + key;
                nestable = func(val, key, object, currentPath) == false;
                if (nestable && (isArr(val) || isObj(val))) Craft.forEachDeep(val, func, currentPath);
            }
        },
        /**
         * Converts any text to an inline URL code (good for images , svg , scripts or css)
         * @param {String} - content to convert to an inline URL
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
            Craft.omit(arguments, host).map(obj => {
                for (let key in obj) defineprop(host, key, getpropdescriptor(obj, key));
            });
            return host;
        },
        completeAssign(host) {
            Craft.omit(arguments, host).map(source => {
                let descriptors = Object.keys(source).reduce((descriptors, key) => {
                    descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
                    return descriptors;
                }, {});
                // by default, Object.assign copies enumerable Symbols too
                Object.getOwnPropertySymbols(source).map(sym => {
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
            return isObj(val) ? Object.create(val) : toArr(val);
        },
        /**
         * @method omitFrom
         * @memberof Craft
         * @summary omits values from any arraylike object or string
         * @param {arraylike|String} Arr - arraylike object from which values will be omitted
         * @param {...*} values - values to omit from the arraylike object
         * @return {Array|String}
         */
        omitFrom(Arr) {
            let args = toArr(arguments).slice(1);
            if (isStr(Arr))
                args.map(a => {
                    while (Arr.includes(a)) Arr = Arr.replace(a, '');
                });
            else Arr = (is.Arraylike(Arr) ? toArr(Arr) : Arr).filter(e => {
                if (!args.some(v => v == e)) return e;
            });
            return Arr;
        },
        /**
         * Craft.has checks whether or not strings or arrays contains
         * certain values
         * @param {String|Array} str - collection to check
         * @param {String|Array} values - values to check for in the collection
         * @param {String} or - some or every
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
             * @summary Craft.browser.is - checks which browser you're running
             * @param {String) browser - string containing a browser name like 'chrome','firefox'...
             * @returns (boolean) - returns whether or not this is the browser you checked for
             */
            is: browser => Br.toLowerCase().includes(browser.toLowerCase()),
            // name of browser and version
            browser: Br
        },
        router: {
            addHandle(link, func) {
                let handler = {
                    link,
                    func
                };
                let options = {
                    off(fn) {
                        if (fn) fn(link);
                        Craft.router.handlers.delete(handler);
                        return options;
                    },
                    on(wrap) {
                        if (isFunc(wrap)) handler.func = () => {
                            handler.func(link);
                            wrap(link, handler.func);
                        };
                        Craft.router.handlers.add(handler);
                        return options;
                    },
                    once: () => options.off().on(options.off),
                };
                return options.on();
            },
            handle(route, func) {
                if (isStr(route)) {
                    if (Locs(l => l == route)) func(route);
                    return Craft.router.addHandle(route, func);
                } else if (isArr(route)) {
                    let handlers = new Map;
                    route.forEach(link => {
                        handlers.set(route, Craft.router.addHandle(route, func));
                    });
                    return handlers;
                }
            },
            handlers: new Set,
            links: [],
            link(Selector, link, newtab) {
                let target = dom(Selector);
                if (is.NodeList(target) || is.Node(target)) {
                    let attr = {
                        link
                    };
                    if (newtab) attr.newtab = true;
                    target.setAttr(attr);
                }
            },
            open(link, newtab) {
                !newtab ? location = link : open(link);
            },
            set title(title) {
                doc.title = title;
            },
            get title() {
                return doc.title;
            }
        },
        Cookies: {
            get(key) {
                return decodeURIComponent(doc.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
            },
            set(key, val, expires, path, domain, secure) {
                if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) return false;
                let expiry = '';
                if (expires) {
                    if (is.Num(expires)) expiry = expires == Infinity ? '; expires=Fri, 11 April 9997 23:59:59 UTC' : '; max-age=' + expires;
                    if (isStr(expires)) expiry = '; expires=' + expires;
                    if (is.Date(expires)) expiry = '; expires=' + expires.toUTCString();
                }
                doc.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(val) + expiry + (domain ? '; domain=' + domain : '') + (path ? '; path=' + path : '') + (secure ? '; secure' : '');
                return true;
            },
            has: key => key != undef && new RegExp('(?:^|;\\s*)' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=').test(doc.cookie),
            remove(key, path, domain) {
                if (!Craft.Cookies.has(key)) return false;
                doc.cookie = encodeURIComponent(key) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (domain ? '; domain=' + domain : '') + (path ? '; path=' + path : '');
                return true;
            },
            keys() {
                return doc.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/).map(c => {
                    decodeURIComponent(c);
                    return c;
                });
            }
        },
        /**
         * @summary Handles WebSockets in a contained manner with send and recieve methods
         * @param {String} address - the WebSocket address example "ws://localhost:3000/" but the ws:// or wss:// is optional
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
                    return protocols ? new WebSocket(address, protocols) : new WebSocket(address);
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
                        Options.socket.close();
                    },
                    reopen() {
                        OpenSock(Options.open ? Options.socket : (Options.socket = newSock()));
                    }
                };

                function OpenSock(sock) {
                    sock.onopen = () => {
                        Options.open = true;
                        sock.onmessage = e => {
                            Options.message = e.data;
                            Options.recievers.forEach(fn => {
                                fn(e.data, e);
                            });
                        };
                    };
                    sock.onclose = () => {
                        Options.open = false;
                    };
                    sock.onerror = e => {
                        throw e;
                    };
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
            spacebar: keyhandle(32)
        },
        after(n, func) {
            !isFunc(func) && isFunc(n) ? func = n : console.error('after: no function');
            n = Number.isFinite(n = +n) ? n : 0;
            if (--n < 1) return function () {
                return func.apply(this, arguments);
            };
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
                if (callNow) func.apply(scope, args);
            };
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
                return result;
            };
        },
        curry,
        memoize(func, resolver) {
            if (!isFunc(func) || (resolver && !isFunc(resolver))) throw new TypeError('no function');
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
        Once(func, context) {
            let result;
            return function () {
                if (isFunc(func)) {
                    result = func.apply(context || this, arguments);
                    func = null;
                }
                return result;
            };
        },
        css(element, styles, prop) {
            if (isObj(styles))
                forEach(styles, (prop, key) => {
                    if (isEl(element)) element.style[key] = prop;
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
         * @method addCSS
         * @memberof Craft
         * @summary takes in any string of valid css code and executes it
         * @param {String} css - css code to execute
         */
        addCSS(css, noimport) {
            query('style[crafterstyles]', head).textContent += noimport ? css : `@import url("${Craft.URLfrom(css, {type: 'text/css'})}");\n`;
        },
        /**
         * @method importCSS
         * @memberof Craft
         * @summary imports css and executes it
         * @param {String} src - source to fetch from
         * @param {Booleans} gofetch - should fetch instead of @import statement
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
        /**
         * @method importFont
         * @memberof Craft
         * @summary imports fonts and loads them
         * @param {String} name - name of font as used in css
         * @param {String} src - source to fetch from
         */
        importFont(name, src) {
            Craft.addCSS(`@font-face {font-family:${name};src:url("${src.slice(0,2) === './' ? src : Craft.fixURL(src)}");}`, true);
        },
        /**
         * @method loadScript
         * @memberof Craft
         * @summary takes in a source then attempts to fetch and execute it
         * @param {String} src - source to fetch from
         * @param {Boolean} [funcexec] - execute code from inside a new Function() object
         * @param {Object} [fetchAttr] - fetch request options
         */
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
            });
        },
        /**
         * @method loadScripts
         * @memberof Craft
         * @summary fetches and executes multiple scripts and returns a promise when they are loaded
         * @param {Array} urls - array of string urls (sources) to fetch from
         * @param {Boolean} [funcexec] - execute code from inside a new Function() object
         * @param {Object} [fetchAttr] - fetch request options
         */
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
                return isObj(val) ? Object.keys(val).length : is.Map(val) || is.Set(val) ? val.size : val.length;
            } catch (e) {}
            return -1;
        },
        DateIndex(Collection, date) {
            for (let i = 0; i < Collection.length; i++)
                if (+Collection[i] === +date) return i;
            return -1;
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
            year: 365 * 86400000
        },
        observable,
        Directives: new Map,
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
                return result;
            };
        },
        animFrame(func) {
            const options = {
                start() {
                    func();
                    options.interval = requestAnimationFrame(options.start);
                    return options;
                },
                stop() {
                    cancelAnimationFrame(options.interval);
                    options.interval = 0;
                    return options;
                },
                reset(fn) {
                    options.stop();
                    if (isFunc(fn)) func = fn;
                    return options.start();
                }
            };
            return options;
        },
        /**
         * converts Objects or URL variable strings to a FormData object
         * @param {object|String} val - values to convert
         */
        toFormData(val) {
            let formData = new FormData();
            if (isStr(val)) val = val.split('&');
            forEach(val, v => {
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
         * @param {Node} element - target of listener
         * @param {Function} func - callback to handle the event
         * @param {boolean=} preventDefault - event.preventDefault() or not
         */
        onScroll(element, func, preventDefault) {
            return on('wheel', element, e => {
                if (preventDefault) e.preventDefault();
                func(e.deltaY < 1, e);
            });
        },
        /**
         * returns a promise when the DOM and WebComponents are all finished loading
         * @returns {promise} - when everything is done loading WhenReady will return a promise
         */
        get WhenReady() {
            return promise((pass, fail) => {
                if (ready()) return pass();
                let readytimeout = setTimeout(() => {
                    if (!ready()) fail('loading took too long loaded with errors :(');
                }, 5500);
                Craft.notifier.once('ready', () => {
                    clearTimeout(readytimeout);
                    pass();
                });
            });
        },
        model(name, modelclass) {
            if (isStr(name) && !def(Craft.Models[name])) {
                if (isFunc(modelclass)) {
                    const scope = Object.create(Craft.observable(modelclass.prototype)),
                        model = new scope.constructor();
                    Craft.Models.set(name, model);
                    Craft.Models.emit(name, scope);
                    if (model.init) Craft.WhenReady.then(() => {
                        model.init();
                    });
                    return model;
                }
            }
            throw new Error('Crafter : Model already exists');
        },
        modelInit(name, func) {
            Craft.Models[name] != undef ? func.call(Craft, Craft.Models[name]) :
                Craft.Models.once(name, scope => {
                    func.call(Craft, scope);
                });
        },
        fromModel(key, val) {
            let cutkey = cutdot(key),
                IsValDefined = def(val),
                ck = cutkey[0],
                type = (IsValDefined ? 'set' : 'get') + 'Deep';
            if (def(Craft.Models[ck])) {
                const model = Craft.Models[ck];
                return cutkey.length == 1 && !IsValDefined ? Craft.Models[ck] : Craft[type](Craft.Models[ck], joindot(Craft.omit(cutkey, ck)), val);
            }
        },
        getPath(path, full) {
            try {
                let cutbind = cutdot(path),
                    prop = last(cutbind),
                    objaccessor = cutbind[0],
                    obj = def(Craft.Models[objaccessor]) ? Craft.Models[objaccessor] : Craft.getDeep(root, joindot(Craft.omit(cutbind, prop))),
                    val = Craft.getDeep(obj, cutbind.length > 1 ? joindot(Craft.omit(cutbind, objaccessor)) : prop);
                if (full) return {
                    cutbind,
                    objaccessor,
                    path,
                    prop,
                    obj,
                    val
                };
                if (def(val)) return val;
                if (objaccessor === prop && def(obj)) return obj;
            } catch (e) {
                return {};
            }
        },
        /**
         * defines custom attributes/directives
         * @param {String} name - the name of your custom attribute
         * @param {Function} handle - a function to handle how your custom attribute behaves
         * @example Craft.directive('turngreen', element => element.css({ background : 'green'}));
         **/
        directive(name, handle) {
            if (!Craft.Directives.has(name) && isObj(handle) && isFunc(handle.bind)) {
                Craft.Directives.set(name, handle);
                Craft.WhenReady.then(() => {
                    queryEach(`[${name}]`, el => {
                        el = dom(el);
                        if (el.hasAttr(name)) {
                            if (!is.Set(el.directives)) el.directives = new Set;
                            if (!el.directives.has(name)) {
                                el.directives.add(name);
                                el.observeAttrs();
                                let directiveChangeDetetor = el.state.on(`attr:${name}`, (name, val, oldval, hasAttr) => {
                                    if (hasAttr || !def(oldval)) {
                                        if (isFunc(handle.update)) handle.update.call(el, el, val, oldval, hasAttr);
                                    } else if (isFunc(handle.unbind)) {
                                        handle.unbind.call(el, el, val, oldval);
                                        directiveChangeDetetor.off();
                                    }
                                });
                                handle.bind.call(el, el, el.getAttr(name));
                            }
                        }
                    });
                });
            }
        },
        /**
         * converts camel case strings to dashed strings
         * usefull for css properties and such
         * @example Craft.camelDash('MyCamelCaseName') // -> my-camel-case-name
         * @param {String) val - string to convert
         */
        camelDash(val) {
            return val.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        },
        formatBytes(bytes, decimals) {
            if (bytes == 0) return '0 Bytes';
            let k = 1000,
                i = Math.floor(Math.log(bytes) / Math.log(k));
            return (bytes / Math.pow(k, i)).toPrecision(decimals + 1 || 3) + ' ' + 'Bytes,KB,MB,GB,TB,PB,EB,ZB,YB'.split(',')[i];
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
         * @method randomStr
         * @memberof Craft
         * @summary Generates random alphanumeric strings. default length of 6 characters
         * @param {int} max - max length of string
         * @param {int} min - min length of string
         * @return {String}
         */
        randomStr(max, min) {
            let text = '';
            min = min || 0;
            max = max || 6;

            for (; min < max; min++) text += possibleText.charAt(Math.floor(Math.random() * possibleText.length));
            return text;
        },
        /**
         * similar to Craft.randomStr in that it generates a unique string , in this case a Unique ID with random alphanumeric strings separated by hyphens
         * example 0ebf-c7d2-ef81-2667-08ef-4cde
         * @param {number=} len - optional length of uid sections
         */
        GenUID: len => Craft.array(len || 6, () => Craft.randomStr(4)).join('-'),
        /**
         * method for creating custom elements configuring their lifecycle's and inheritance
         * the config Object has 7 distinct options ( created , inserted , destroyed , attr, css, set_X and get_X )
         * @param {String} tag - a hyphenated custom HTML tagname for the new element -> "custom-element"
         * @param {object} config - Object containing all the element's lifecycle methods / extends and attached methods or properties
         */
        newComponent(tag, config) {
            if (!def(config)) throw new Error(`Crafter : ${tag} - component config undefined`);
            if (isFunc(config)) {
                const componentclass = Object.create(config.prototype);
                config = {};
                Craft.omit.apply(null, [Craft.getAllKeys(componentclass)].concat(Craft.getAllKeys(Object.prototype))).map(key => {
                    if (!key.includes('__')) config[key] = componentclass[key];
                });
            }
            let element = Object.create(HTMLElement.prototype),
                settings = {},
                dm;
            element.createdCallback = function () {
                let el = dom(this),
                    dealtWith = [];
                el.observeAttrs();
                for (let key in config) {
                    if (!dealtWith.includes(key)) {
                        if (key.includes('set_')) {
                            let sgKey = key.split('_')[1];
                            dealtWith.push(key, 'get_' + sgKey);
                            el.newSetGet(sgKey, config[key], config['get_' + sgKey]);
                        } else if (key.includes('get_')) {
                            let sgKey = key.split('_')[1];
                            dealtWith.push(key, 'set_' + sgKey);
                            el.newSetGet(sgKey, (isFunc(config['set_' + sgKey]) ? config['set_' + sgKey] : x => {}), config[key]);
                        }
                    }
                }

                if (isFunc(config['attr'])) el.observeAttrs(config['attr']);
                if (isFunc(config['created'])) return config['created'].call(el);
            };

            for (let key in config) {
                if (key == 'created' || key == 'attr' || (key.includes('set_') || key.includes('get_'))) continue;

                if (isFunc(config[key]) && key != 'attr') dm = function () { // Adds dom methods to element
                    return config[key].apply(dom(this), arguments);
                };
                key == 'inserted' ? element.attachedCallback = dm :
                    key == 'destroyed' ? element.detachedCallback = dm :
                    key.toLowerCase() == 'css' ? Craft.addCSS(config[key]) :
                    isFunc(config[key]) ? element[key] = dm :
                    defineprop(element, key, getpropdescriptor(config, key));
            }

            settings['prototype'] = element;
            doc.registerElement(tag, settings);
        },
        SyncInput(input, obj, key, onset) {
            if (isStr(input)) input = query(input);
            if (is.Input(input)) {
                let oldval = input.value,
                    onsetfn = isFunc(onset);
                input[sI] = on('input,blur,keydown', input, e => {
                    setTimeout(() => {
                        let val = input.value;
                        if (!(Craft.getDeep(obj, key) == '' && val == '') && val != oldval) {
                            oldval = val;
                            Craft.setDeep(obj, key, input.value);
                            if (onsetfn) onset(input.value);
                        }
                    }, 0);
                });
            }
        },
        disconectInputSync(input) {
            if (isStr(input)) input = query(input);
            if (is.Node(input) && def(input[sI])) {
                input[sI].off();
                delete input[sI];
            }
        },
        onTabChange(fn) {
            let options = {
                off() {
                    tabListeners.delete(fn);
                    return options;
                },
                on() {
                    tabListeners.add(fn);
                    return options;
                }
            };
            return options.on();
        },
        tabpause(state, options) {
            if (state) options.tablistener = Craft.onTabChange(focused => {
                options[focused ? 'on' : 'off']();
            });
            else {
                if (options.tablistner) options.tablistener.off();
            }
            return options;
        },
        every(time, fn, context, pauseondefocus) {
            if (isFunc(fn)) {
                let options = {
                    interval: undef,
                    set tabpause(state) {
                        if (is.Bool(state)) Craft.tabpause(state, options);
                    },
                    on() {
                        if (def(options.interval)) options.off();
                        options.interval = setInterval(fn.bind(is.Bool(context) || !def(context) ? options : context), (isFunc(time) ? time() : time));
                        return options;
                    },
                    off() {
                        clearInterval(options.interval);
                        return options;
                    },
                };
                if (context === true || pauseondefocus === true) options.tabpause = true;
                return options.on();
            }
        },
    };

    head.appendChild(dom.style('', 'crafterstyles'));
    let TabChange = ta => () => {
        tabActive = ta;
        tabListeners.forEach(listener => {
            listener(tabActive);
        });
    };

    defineprop(Craft, 'tabActive', {
        get: () => tabActive
    });

    on('blur', TabChange(false));
    on('focus', TabChange(true));


    Craft.directive('bind', {
        bind(element, bind) {
            element.bind(bind);
        },
        update(element, bind, oldbind) {
            if (bind != bind) {
                element.unbind(oldbind);
                element.bind(bind);
            }
        },
        unbind(element, bind) {
            element.unbind(bind);
        }
    });

    Craft.directive('bind-for', {
        bind(element, bind) {
            let data = Craft.fromModel(bind);
            if (def(data) && data.forEach) {
                let domfrag = dom.frag();
                element = element.stripAttr('bind-for');
                data.forEach(item => {
                    domfrag.appendChild(element.html(item).clone(true));
                });
                element.replace(domfrag);
            } else element.remove();
        }
    });

    Craft.directive('import-view', {
        bind(element, src) {
            element.importview(src);
        },
        update(element, src) {
            element.importview(src);
        }
    });

    Craft.directive('link', {
        bind(element, link) {
            if (isFunc(element.onlink)) element.linkhandle = Craft.router.handle(link, element.onlink);
            element.newSetGet('onlink', fn => {
                if (element.linkhandle) element.linkhandle.off();
                if (isFunc(fn)) element.linkhandle = Craft.router.handle(link, fn);
            });
        },
        update(element, link, oldlink) {
            if (link != oldlink) {
                if (isObj(element.linkhandle)) element.linkhandle.off(() => {
                    if (isFunc(element.onunlink)) element.onunlink(link);
                });
            }
        },
        unbind(element, link) {
            if (isObj(element.linkhandle)) element.linkhandle.off(() => {
                if (isFunc(element.onunlink)) element.onunlink(link);
            });
        }
    });


    Craft.directive('color-accent', {
        bind(element, color) {
            if (isFunc(element.colorAccent)) element.colorAccent(color);
        }
    });

    // takes in an affected element and scans it for custom attributes
    // then handles the custom attribute if it was registered with Craft.directive
    function manageAttr(el, name, val, oldval, hasAttr) {
        if (Craft.Directives.has(name)) {
            let handle = Craft.Directives.get(name);
            if (hasAttr && val != oldval) {
                if (!is.Set(el.directives)) el.directives = new Set;
                if (!el.directives.has(name)) {
                    el.directives.add(name);
                    el = dom(el);
                    handle.bind.call(el, el, val);
                } else if (handle.update) handle.update.call(el, el, val, hasAttr);
            } else if (!hasAttr && handle.unbind) handle.unbind.call(el, el, val, oldval);
        }
        if (el.state) el.state.emit('attr', name, val, oldval, hasAttr);
    }

    new MutationObserver(muts => {
        muts.map(mut => {
            forEach(mut.removedNodes, el => {
                el.dispatchEvent(DestructionEvent);
            });
            forEach(mut.addedNodes, el => {
                if (el.attributes) forEach(el.attributes, attr => {
                    if (Craft.Directives.has(attr.name)) manageAttr(el, attr, attr.textContent, '', true);
                });
            });
            if (mut.type == 'attributes' && isEl(mut.target) && mut.attributeName != 'style')
                manageAttr(mut.target, mut.attributeName, mut.target.getAttribute(mut.attributeName), mut.oldValue, mut.target.hasAttribute(mut.attributeName));
        });
    }).observe(doc, {
        attributes: true,
        childList: true,
        //characterData: true,
        subtree: true
    });

    function init() {
        Craft.router.links.forEach(exec(true));
        Craft.notifier.emit('ready');
        Ready = true;
    }

    !ready() ? once('DOMContentLoaded', doc, init) : init();

    on('hashchange', () => {
        Craft.router.handlers.forEach(handle => {
            if (Locs(l => l == handle.link)) handle.func(location.hash);
        });
    });

    on('click', (e, target) => {
        if (target.attributes) {
            forEach(target.attributes, attr => {
                if (attr.name == 'link')(target.hasAttr('newtab') ? open : Craft.router.open)(attr.value);
            });
        }
    })


    if (typeof define === 'function' && define.amd) define(['Craft', 'craft'], Craft);
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    else if (typeof module === 'object' && module.exports) module.exports = Craft;
    // Browser globals (root is window)
    else root.Craft = Craft;

    // console.log(performance.now() - perf, 'Crafter.js');
})(document, self);
