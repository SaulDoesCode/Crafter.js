/*
 *  @version 0.0.9
 *  @overview Crafter.js , minimalist front-end library
 *  @author Saul van der Walt - https://github.com/SaulDoesCode/
 *  @license MIT  Licence (c) Copyright 2016 Saul van der Walt
 */
(function (doc, root) {
    'use strict';
    let Ready = false,
        ua = navigator.userAgent,
        tem, Br = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);

    if (Br && (tem = ua.match(/version\/([\.\d]+)/i)) !== null) Br[2] = tem[1];
    Br = (Br ? [Br[1], Br[2]] : [navigator.appName, navigator.appVersion, '-?']).join(' ');

    const newMap = () => new Map;
    const newSet = () => new Set;

    /**
     * Slices any arraylike object.
     * @method slice
     * @for Craft
     * @param {arraylike} ctx - object to slice
     * @param {int|String} i - value to slice defaults to 0
     */
    const slice = (ctx, i) => ctx.slice ? ctx.slice(i || 0) : Array.prototype.slice.call(ctx, i || 0);
    /**
     * curry takes a function as a parameter and returns another function until all the arguments of the initializer function has been provided.
     * @method curry
     * @for Craft
     * @param {Function} fn - function to curry
     * @param {Class|Function|Object} ctx - context to bind the function to
     * @return {Function|*}
     */
    function curry(fn, ctx) {
        const arity = fn.length;

        function curried() {
            const args = slice(arguments);
            return args.length < arity ? (...more) => curried.apply(null, args.concat(more)) : fn.apply(ctx || this, args);
        }
        return curried;
    }

    // tests arguments with Array.prototype.every;
    const ta = test => (...args) => args.length == 1 ? test(args[0]) : args.length && args.every(test);

    /**
     *  get the last item in an array or arraylike collection
     *  @method last
     *  @for Craft
     *  @param {Array|Arraylike} arr - array or arraylike collection
     *  @return {*} last item in collection
     */
    const last = arr => arr[arr.length - 1];
    /**
     *  get the first item in an array or arraylike collection
     *  @method last
     *  @for Craft
     *  @param {Array|Arraylike} arr - array or arraylike collection
     *  @return {*} first item in collection
     */
    const first = arr => arr[0];

    const removeFrom = (arr, i) => {
            const index = arr.indexOf(i);
            return index > -1 ? arr.splice(index, 1) : arr;
        }
        /**
         * Convert Arraylike variables to Array synonym for Array.from
         * @method toArr
         * @pram {Arraylike} val - arraylike value to convert to array
         * @return {Array}
         */
    const toArr = arr => Array.isArray(arr) ? arr : typeof arr.length != "undefined" ? Array.from(arr) : [arr];

    const sI = 'InputSync',
        DestructionEvent = new Event('destroy'),
        possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
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
        promise = func => new Promise(func),
        Locs = test => [location.hash, location.href, location.pathname].some(test),
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


    /**
     * creates a document fragment from a string (document, fragment, from, String} - dffstr
     * @method dffstr
     * @for Craft
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
     * Checks whether a collection or object contains a certain value.
     * @method has
     * @for Craft
     * @param {object|arraylike|set|map} host - collection or object to search in
     * @param {*} value - the value to look for
     * @param {Boolean} or - some or every, some by default
     */
    function has(host, value, or) {
        if (is.Arraylike(host)) return toArr(host)[(!or ? 'every' : 'some')](host.includes.bind(host));
        if (isObj(host)) return Object.prototype.hasOwnProperty.call(host, value);
        if (is.Set(host) || is.Map(host)) return host.has(value);
    }

    /**
     * maps through arraylike and object values;
     * @method map
     * @for Craft
     * @param {Arraylike|Object} collection
     * @param {Function} func - mapping function
     */
    const map = curry((collection, func) => {
        if (is.Arraylike(collection)) return Array.prototype.map.call(collection, func);
        Object.keys(collection).map(key => {
            const val = collection.isObservable ? collection.get(key) : collection[key];
            const mappee = func(val, key, collection);
            if (val != undef && val != mappee) collection.isObservable ? collection.set(key, mappee) : collection[key] = mappee;
        });
        return collection;
    });


    /**
     * converts a number or string value to an integer
     * @method toInt
     * @for Craft
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
     * Splits a string at dots ".".
     * @method cutdot
     * @for Craft
     * @param {String} str - string to split at the dots
     */
    const cutdot = str => str.split('.');
    /**
     * joins a string array with dots "."
     * @method joindot
     * @for Craft
     * @param {Array|Arraylike} arr - array to join with dots
     */
    const joindot = arr => toArr(arr).join('.');


    /**
     * is - Type Testing / Assertion
     * @class is
     */
    const is = {
        /**
         * Test if something is a Boolean type
         * @method Bool
         * @for is
         * @param {...*} args - value/values to test
         */
        Bool: ta(o => typeof o === 'Boolean'),
        /**
         * Test if something is a String
         * @method Str
         * @for is
         * @param {*} val - value to test
         */
        Str: isStr,
        /**
         * Test if values are strings
         * @method Str
         * @for is
         * @param {...*} args - value/values to test
         */
        String: ta(isStr),
        /**
         * Test if something is an Array
         * @method Arr
         * @for is
         * @param {...*} args - value/values to test
         */
        Arr: ta(isArr),
        /**
         * Array.isArray alias for convenience and performance when only one argument is present
         * @method Array
         * @for is
         * @param {*} val - value to test
         */
        Array: isArr,
        /**
         * Test if a value or multiple values are Array-Like
         * @method Arraylike
         * @for is
         * @param {...*} args - value/values to test
         */
        Arraylike: ta(o => {
            try {
                return def(o.length);
            } catch (e) {}
            return false;
        }),
        /**
         * Determine whether a value is undefined
         * @method Undef
         * @for is
         * @param {...*} args - value/values to test
         */
        Undef() {
            return !def.apply(this, arguments);
        },
        /**
         * Determine whether a value is in fact defined
         * @method Def
         * @for is
         * @param {...*} args - value/values to test
         */
        Def: def,
        /**
         * Determine whether a value is null
         * @method Null
         * @for is
         * @param {...*} args - value/values to test
         */
        Null: ta(o => o === null),
        /**
         * Determine whether a value is a DOM Node
         * @method Node
         * @for is
         * @param {...*} args - value/values to test
         */
        Node: ta(o => o instanceof Node),
        /**
         * Test an element's tagname
         * @method Tag
         * @for is
         * @param {Node} element - node to test
         * @param {String} tag - tag to test node for
         */
        Tag: (element, tag) => isEl(element) ? element.tagName === tag.toUpperCase() : false,
        /**
         * Determine whether a value is a DOM NodeList or Collection of Nodes
         * @method NodeList
         * @for is
         * @param {...*} args - value/values to test
         */
        NodeList: ta(nl => nl instanceof NodeList || is.Arraylike(nl) ? ta(n => n instanceof Node).apply(null, nl) : false),
        /**
         * Determine if a value is a Number
         * @method Num
         * @for is
         * @param {...*} args - value/values to test
         */
        Num: ta(o => !isNaN(Number(o))),
        /**
         * Determine if a value is an Object
         * @method Object
         * @for is
         * @param {...*} args - value/values to test
         */
        Object: ta(isObj),
        /**
         * Determine if a value is an Object
         * @method Obj
         * @for is
         * @param {...*} args - value/values to test
         */
        Obj: isObj,
        /**
         * Determine if a sring is JSON
         * @method Json
         * @for is
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
         * Determine if a value is a HTMLElement
         * @method Element
         * @for is
         * @param {...*} args - value/values to test
         */
        Element: ta(isEl),
        /**
         * Determine if a value is a File Object
         * @method File
         * @for is
         * @param {...*} args - value/values to test
         */
        File: ta(o => type(o, '[object File]')),
        /**
         * Determine if a value is of a FormData type
         * @method FormData
         * @for is
         * @param {...*} args - value/values to test
         */
        FormData: ta(o => type(o, '[object FormData]')),
        /**
         * Determine if a value is a Map
         * @method Map
         * @for is
         * @param {...*} args - value/values to test
         */
        Map: ta(o => type(o, '[object Map]')),
        /**
         * Determine if a value is a function
         * @method Func
         * @for is
         * @param {...*} args - value/values to test
         */
        Func: ta(isFunc),
        /**
         * Determine if a variable/s are true
         * @method True
         * @for is
         * @param {...*} args - value/values to test
         */
        True: ta(o => o === true),
        /**
         * Determine if a variable/s are false
         * @method False
         * @for is
         * @param {...*} args - value/values to test
         */
        False: ta(o => !o),
        /**
         * Determine if a value is of Blob type
         * @method Blob
         * @for is
         * @param {...*} args - value/values to test
         */
        Blob: ta(o => type(o, '[object Blob]')),
        /**
         * Determine if a value is a Regular Expression
         * @method RegExp
         * @for is
         * @param {...*} args - value/values to test
         */
        RegExp: ta(o => type(o, '[object RegExp]')),
        /**
         * Determine if a value is a Date type
         * @method Date
         * @for is
         * @param {...*} args - value/values to test
         */
        Date: ta(o => type(o, '[object Date]')),
        /**
         * Determine if a value is a Set.
         * @method Set
         * @for is
         * @param {...*} args - value/values to test
         */
        Set: ta(o => type(o, '[object Set]')),
        /**
         * Determine if a value is of type Arguments
         * @method Args
         * @for is
         * @param {*} val - value/values to test
         */
        Args: val => !nil(val) && type(val, '[object Arguments]'),
        /**
         * Determine if a value is a Symbol
         * @method Symbol
         * @for is
         * @param {...*} args - value/values to test
         */
        Symbol: ta(obj => type(obj, '[object Symbol]')),
        /**
         * tests if a value is a single character
         * @method char
         * @for is
         * @param {...String} values to test
         */
        char: ta(val => isStr(val) && val.length == 1),
        /**
         * tests if a value is a space character
         * @method space
         * @for is
         * @param {...String} values to test
         */
        space: ta(val => is.char(val) && (val.charCodeAt(0) > 8 && val.charCodeAt(0) < 14) || val.charCodeAt(0) === 32),
        /**
         * Determine if a String is UPPERCASE
         * @method Uppercase
         * @for is
         * @param {String} char - value to test
         */
        Uppercase: str => isStr(str) && !is.Num(str) && str === str.toUpperCase(),
        /**
         * Determine if a String is LOWERCASE
         * @method Lowercase
         * @for is
         * @param {String} char - value to test
         */
        Lowercase: str => isStr(str) && str === str.toLowerCase(),
        /**
         * Determine if a String contains only characters and numbers (alphanumeric)
         * @method Alphanumeric
         * @for is
         * @param {String} str - value to test
         */
        Alphanumeric: str => /^[0-9a-zA-Z]+$/.test(str),
        /**
         * Determines whether a String is a valid email
         * @method email
         * @for is
         * @param {String} email - value to test
         */
        email: email => RegExps.email.test(email),
        /**
         * Determines whether a String is a URL
         * @method URL
         * @for is
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
         * Determines whether a String is a HEX-COLOR (#fff123)
         * @method HexColor
         * @for is
         * @param {String} HexColor - value to test
         */
        HexColor: hexColor => RegExps.hexColor.test(hexColor),
        /**
         * Determines whether a String is hexadecimal
         * @method hexadecimal
         * @for is
         * @param {String} hexadecimal - value to test
         */
        hexadecimal: hexadecimal => RegExps.hexadecimal.test(hexadecimal),
        /**
         * checks wether a date is today
         * @method today
         * @for is
         * @param {Date} obj - Date to test
         */
        today: obj => is.Date(obj) && obj.toDateString() === new Date().toDateString(),
        /**
         * checks wether a date is yesterday
         * @method yesterday
         * @for is
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
         * checks wether a date is tommorow
         * @method tomorrow
         * @for is
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
         * Determines if a date is in the past
         * @method past
         * @for is
         * @param {String|Date} obj - Date to test
         */
        past(obj) {
            try {
                if (!is.Date(obj)) obj = isStr(obj) ? new Date(is.Num(obj) ? Number(obj) : obj) : new Date(obj);
            } catch (e) {}
            return is.Date(obj) && obj.getTime() < new Date().getTime();
        },
        /**
         * Determines if a date is in the future
         * @method future
         * @for is
         * @param {String|Date} obj - Date to test
         */
        future: obj => !is.past(obj),
        /**
         * Determines whether a String is a timeString
         * @method time
         * @for is
         * @param {String} time - value to test
         */
        time: time => RegExps.timeString.test(time),
        /**
         * Determines whether a String is a dateString
         * @method dateString
         * @for is
         * @param {String} dateString - value to test
         */
        dateString: dateString => RegExps.dateString.test(dateString),
        /**
         * Determines whether a Number is between a maximum and a minimum
         * @method between
         * @for is
         * @param {Number} val - number value to test
         * @param {Number} max - maximum to compare the value with
         * @param {Number} min - minimum to compare the value with
         * @return {Boolean} wether or not the value is between the max and min
         */
        between: curry((val, max, min) => (val <= max && val >= min)),
        /**
         * checks if a number is an integer
         * @method int
         * @for is
         * @param {*} val - value to test
         */
        int: val => is.Num(val) && val % 1 === 0,
        /**
         * checks if a number is an even number
         * @method even
         * @for is
         * @param {*} val - value to test
         */
        even: val => is.Num(val) && val % 2 === 0,
        /**
         * checks if a number is an odd number
         * @method odd
         * @for is
         * @param {*} val - value to test
         */
        odd: val => is.Num(val) && val % 2 !== 0,
        /**
         * @method positive
         * checks if a number is positive
         * @for is
         * @param {*} val - value to test
         */
        positive: val => is.Num(val) && val > 0,
        /**
         * checks if a number is positive
         * @method negative
         * @for is
         * @param {*} val - value to test
         */
        negative: val => is.Num(val) && val < 0,
        /**
         * tests that all parameters following the first are not the same as the first
         * @method neither
         * @for is
         * @param {*} value - inital value to compare all other params with
         * @param {...*} arguments to compare with value
         */
        neither(value) {
            return slice(arguments, 1).every(val => value !== val);
        },
        /**
         * Determines if two variables are equal
         * @method eq
         * @for is
         * @param a - first value to compare
         * @param b - second value to compare
         */
        eq: curry((a, b) => a === b),
        /**
         * Returns the a || b
         * @method or
         * @for is
         * @param a - first value to compare
         * @param b - second value to compare
         */
        or: curry((a, b) => a || b),
        /**
         * Determines if a number is LOWER than another
         * @method lt
         * @for is
         * @param {Number} val - value to test
         * @param {Number} other - num to test with value
         */
        lt: curry((val, other) => val < other),
        /**
         * Determines if a number is LOWER than or equal to another
         * @method lte
         * @for is
         * @param {Number} val - value to test
         * @param {Number} other - num to test with value
         */
        lte: curry((val, other) => val <= other),
        /**
         * Determines if a number is BIGGER than another
         * @method bt
         * @for is
         * @param {Number} val - value to test
         * @param {Number} other - num to test with value
         */
        bt: curry((val, other) => val > other),
        /**
         * Determines if a number is BIGGER than or equal to another
         * @method bte
         * @for is
         * @param {Number} val - value to test
         * @param {Number} other - num to test with value
         */
        bte: curry((val, other) => val >= other),
        /**
         * Determines if a given collection or string is empty
         * @method empty
         * @for is
         * @param {Object|Array|String} val - value to test if empty
         */
        empty: ta(val => {
            try {
                return !(isObj(val) ? Object.keys(val).length : is.Map(val) || is.Set(val) ? val.size : val.length) || val === '';
            } catch (e) {}
            return false;
        }),
        /**
         * Tests if something is a Native JavaScript feature
         * @method Native
         * @for is
         * @param {*} val - value to test
         */
        Native(val) {
            let type = typeof val;
            return isFunc(val) ? RegExp('^' + String(Object.prototype.toString).replace(/[.*+?^${}()|[\]\/\\]/g, '\\$&').replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$').test(Function.prototype.toString.call(val)) : (val && type == 'object' && /^\[object .+?Constructor\]$/.test(val.toString)) || false;
        },
        /**
         * Tests where a dom element is an input of some sort
         * @method Input
         * @for is
         * @param {Element|Node} - element to test
         */
        Input: element => isEl(element) && ['INPUT', 'TEXTAREA'].some(i => element.tagName.includes(i))
    };

    /**
     * Easy way to loop through Collections, Objects and Numbers
     * @method forEach
     * @for Craft
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
     * Method to merge the properties of multiple objects , it can handle getters or setters without breaking them
     * @method concatObjects
     * @for Craft
     * @param {Object} host - main object to merge with all subsequent objects
     * @param {...Object} objs - other objects to be merged with host object
     * @return {Object} resulting object after merges
     */
    function concatObjects(host) {
        slice(arguments, 1).map(obj => {
            for (let key in obj) defineprop(host, key, getpropdescriptor(obj, key));
        });
        return host;
    }

    /*
     * Converts any Query/QueryAll to an Array of Nodes even if there is only one Node , this is error proof when no arguments are present it returns an empty array.
     * method NodeOrQuerytoArr
     * param {Node|NodeList|Array|String} val - pass either a CSS Selector string , Node/NodeList or Array of Nodes
     * param {Node|NodeList|Array|String} within - pass either a CSS Selector string , Node/NodeList or Array of Nodes to search for val in
     * return {Array}
     */
    function NodeOrQuerytoArr(val, within) {
        if (isStr(val)) val = queryAll(val, within);
        return is.Node(val) ? [val] : is.NodeList(val) ? toArr(val) : [];
    }


    function listener() {
        const container = newMap(),
            actions = {
                delete(type, func) {
                    if (actions.has(type, func)) {
                        const handlers = container.get(type);
                        if (!handlers.size) container.delete(type);
                        if (handlers.has(func)) handlers.delete(func);
                    }
                },
                set(type, func, once) {
                    if (isFunc(func)) {
                        if (!container.has(type)) container.set(type, newSet());
                        if (once === true) func.__isOnce = true;
                        container.get(type).add(func);
                    }
                },
                get(type) {
                    return container.get(type);
                },
                has(type, func) {
                    return container.size > 0 && container.has(type) && container.get(type).has(func);
                },
                loop(type, fn) {
                    if (container.size > 0 && container.has(type)) {
                        const handlers = container.get(type);
                        handlers.forEach(handler => {
                            fn(handler);
                            if (handler.__isOnce === true) handlers.delete(handler);
                        });
                    }

                },
                makeHandle(type, func) {
                    if (!isFunc(func)) throw new TypeError('eventsys : listener needs a function');
                    return {
                        on() {
                            isArr(type) ? type.map(t => {
                                actions.set(t, func);
                            }) : actions.set(type, func);
                            return this;
                        },
                        once() {
                            isArr(type) ? type.map(t => {
                                actions.set(t, func, true);
                            }) : actions.set(type, func, true);
                            return this;
                        },
                        off() {
                            isArr(type) ? type.map(t => {
                                actions.delete(t, func);
                            }) : actions.delete(type, func);
                            return this;
                        }
                    };
                }
            };
        return actions;
    }

    /**
     * Adds an Event System to Arbitrary Objects and Classes.
     * @method eventsys
     * @for Craft
     * @param {Object|Function|Class} obj - object to convert
     */
    function eventsys(obj) {
        if (!obj) obj = {};
        const listeners = listener();
        let stop = false;
        return concatObjects(obj, {
            on: (type, func) => listeners.makeHandle(type, func).on(),
            once: (type, func) => listeners.makeHandle(type, func).once(),
            off: (type, func) => listeners.makeHandle(type, func).off(),
            emit(type) {
                if (!stop && isStr(type)) {
                    const args = slice(arguments, 1);
                    listeners.loop(type, handle => {
                        handle.apply(obj, args);
                    });
                } else throw new TypeError('eventsys : you cannot emit that! ' + type);
            },
            stopall: state => stop = isBool(state) ? state : true,
            defineHandle(name, type) {
                if (!type) type = name;
                obj[name] = (fn, useOnce) => obj[useOnce ? 'once' : 'on'](type, fn);
            }
        });
    }
    /**
     * Creates observables.
     * @method observable
     * @for Craft
     * @param {Object|Function|Class} obj - object to convert
     */
    function observable(obj, noEventSys) {
        if (!obj) obj = {};
        if (!noEventSys) obj = eventsys(obj);
        const listeners = listener();
        defineprop(obj, 'isObservable', desc(true));
        ['$get', '$set'].map(prop => {
            const accessor = prop == '$get' ? 'Get' : 'Set';
            defineprop(obj, prop, desc((prop, func) => {
                if (isFunc(prop)) {
                    func = prop;
                    prop = '*';
                }
                if (!isFunc(func)) throw new Error('.' + prop + ' no function');
                func.prop = isStr(prop) ? prop : '*';
                return listeners.makeHandle(accessor, func).on();
            }));
        });
        defineprop(obj, 'get', desc(key => {
            if (key != 'get' && key != 'set') {
                let val;
                listeners.loop('Get', ln => {
                    if (ln.prop === '*' || ln.prop === key) ln.fn(key, obj);
                });
                return val != undef ? val : obj[key];
            } else return obj[key];
        }));
        defineprop(obj, 'set', desc((key, value) => {
            let val;
            listeners.loop('Set', ln => {
                if (ln.prop === '*' || ln.prop === key) ln.fn(key, value, obj, Object.hasOwnProperty(obj, key));
            });
            val = val != undef ? val : value;
            if (isObj(val) && !val.isObservable) val = observable(val);
            obj.emit('$uberset:' + key, val);
            obj[key] = val;
        }));
        for (let key in obj)
            if (isObj(obj[key]) && !obj[key].isObservable) obj[key] = observable(obj[key]);
        if (typeof Proxy != 'undefined') return new Proxy(obj, {
            get(target, key) {
                if (key != 'get' && key != 'set') {
                    let val;
                    listeners.loop('Get', ln => {
                        if (ln.prop === '*' || ln.prop === key) val = ln.fn(key, target);
                    });
                    return val != undef ? val : Reflect.get(target, key);
                } else return Reflect.get(target, key);
            },
            set(target, key, value) {
                let val, onetime = false;
                listeners.loop('Set', ln => {
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
     * @class EventHandler
     * @for Craft
     * @param {String} EventType - set the type of event to listen for example "click" or "scroll"
     * @param {Node|NodeList|window|document} Target - the Event Listener's target , can also be a NodeList to listen on multiple Nodes
     * @param {Function} Func - Handler function that will be called when the event is triggered -> "function( event , event.srcElement ) {...}"
     * @return Interface on,off,once
     */
    const EventHandler = (EventType, Target, func, Within) => new function () {
        const evthandler = this;
        evthandler.state = false;
        Target = (Target !== root && Target !== doc) ? NodeOrQuerytoArr(Target, Within) : isArr(Target) ? Craft.flatten(Target) : [Target];
        if (isStr(EventType) && EventType.includes(',')) EventType = EventType.split(',');
        if (!isArr(EventType)) EventType = [EventType];

        let FuncWrapper = e => func(e, e.target, Target);

        /**
         * Get or Set the Event type to listen for
         * @property Type
         * @type {String}
         * @for EventHandler
         * @return {String} type - the name of the event/s to listen for
         */
        defineprop(evthandler, 'Type', {
            set(type) {
                //  have you tried turning it on and off again? - THE IT CROWD
                ehdl.off();
                EventType = type.includes(',') ? type.split(',') : type;
                if (!isArr(EventType)) EventType = [EventType];
                ehdl.on();
            },
            get() {
                return EventType;
            },
            enumerable: true
        });
        /**
         * Activates the EventHandler to start listening for the EventType on the Target/Targets
         * @method on
         * @for EventHandler
         * @chainable
         */
        evthandler.on = function () {
            Target.map(target => {
                EventType.map(evt => {
                    target.addEventListener(evt, FuncWrapper);
                });
            });
            evthandler.state = true;
            return evthandler;
        };

        /**
         * De-activates / turns off the EventHandler to stop listening for the EventType on the Target/Targets can still optionally be re-activated with on again
         * @method off
         * @for EventHandler
         * @chainable
         */
        evthandler.off = function () {
            Target.map(target => {
                EventType.map(evt => {
                    target.removeEventListener(evt, FuncWrapper);
                });
            });
            evthandler.state = false;
            return evthandler;
        };

        /**
         * once the the Event has been triggered the EventHandler will stop listening for the EventType on the Target/Targets the Handler function will be called only once
         * @method once
         * @for EventHandler
         * @chainable
         */
        evthandler.once = () => {
            FuncWrapper = e => {
                func(e, e.target, Target);
                evthandler.off();
                evthandler.state = false;
            };
            return evthandler.on();
        };
    };

    /**
     * Easy way to get a DOM Node or Node within another DOM Node using CSS selectors.
     * @method query
     * @for Craft
     * @param {String} selector - CSS selector to query the DOM Node with
     * @param {Node|string=} element - Optional Node or CSS selector to search within insead of document
     */
    function query(selector, element) {
        if (isStr(element)) element = doc.querySelector(element);
        return is.Node(element) ? element.querySelector(selector) : doc.querySelector(selector);
    }

    /**
     * Easy way to get a DOM NodeList or NodeList within another DOM Node using CSS selectors
     * @method queryAll
     * @for Craft
     * @param {String} selector - CSS selector to query the DOM Nodes with
     * @param {Node|NodeList|string=} element - Optional Node or CSS selector to search within insead of document
     * @return {Array} array containing Nodes and/or Elements
     */
    function queryAll(selector, element) {
        if (isStr(element)) element = queryAll(element);
        let list;
        if (Craft.len(element) !== 1 && (isArr(element) || is.NodeList(element))) {
            list = [];
            map(element, el => {
                if (isStr(el)) el = query(el);
                if (is.Node(el)) {
                    el = queryAll(selector, el);
                    if (is.NodeList(el)) list.concat(toArr(el));
                }
            });
        } else list = is.NodeList(element) ? element[0].querySelectorAll(selector) : is.Node(element) ? element.querySelectorAll(selector) : doc.querySelectorAll(selector);
        return is.Null(list) ? list : isArr(list) ? list : toArr(list);
    }
    /**
     * Easy way to loop through Nodes in the DOM using a CSS Selector or a NodeList
     * @method queryEach
     * @for Craft
     * @param {String|NodeList|Node} selector - CSS selector to query the DOM Nodes with or NodeList to iterate through
     * @param {Node|String} [element] - Optional Node or CSS selector to search within insead of document
     * @param {Function} func - function called on each iteration -> "function( Element , index ) {...}"
     * @param {Boolean} [returnList] - should queryEach also return the list of nodes
     */
    function queryEach(selector, element, func, returnList) {
        if (isFunc(element)) func = element;
        const list = NodeOrQuerytoArr(selector, element);
        list.forEach(func);
        if (returnList) return list;
    }

    function EventTypes(Target, within, listen) {
        const etype = type => fn => EventHandler(type, Target, fn, within)[listen || 'on']();
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
            let args = slice(arguments);
            return isFunc(Target) ? EventHandler(EventType, root, Target)[ListenType]() :
                args.length < 3 && !args.some(isFunc) ? EventTypes(EventType, Target, ListenType) :
                isFunc(element) ? EventHandler(EventType, Target, element)[ListenType]() :
                EventHandler(EventType, Target, func, element)[ListenType]();
        };
    }

    /**
     * Starts listening for an EventType on the Target/Targets
     * @method on
     * @for Craft
     * @param {String} EventType - set the type of event to listen for example "click" or "scroll"
     * @param {Node|NodeList|window|document} Target - the Event Listener's target , can be a NodeList to listen on multiple Nodes
     * @param {Function} Func - Handler function that will be called when the event is triggered -> "function( event , event.srcElement ) {...}"
     * @return off - when on is defined as a variable "var x = on(...)" it allows you to access all the EventHandler interfaces off,once,on
     */
    const on = EvtLT('on');
    /**
     * Starts listening for an EventType on the Target/Targets ONCE after triggering the once event Listener will stop listening
     * @method once
     * @for Craft
     * @param {String} EventType - set the type of event to listen for example "click" or "scroll"
     * @param {Node|NodeList|window|document} Target - the Event Listener's target , can be a NodeList to listen on multiple Nodes
     * @param {Function} Func - Handler function that will be called when the event is triggered -> "function( event , event.srcElement ) {...}"
     * @return on,off,once - when once is defined as a variable "var x = once(...)" it allows you to access all the EventHandler interfaces off,once,on
     */
    const once = EvtLT('once');

    const eventoptions = 'Click,Input,DoubleClick,Focus,Blur,Keydown,Mousemove,Mousedown,Mouseup,Mouseover,Mouseout'.split(',');

    function craftElement(name, inner, attributes, extraAttr, stringForm) {
        let element = domManip(doc.createElement(name));
        if (isObj(inner)) {
            attributes = inner;
            inner = undef;
        }
        if (inner != undef) element.html(inner);
        if (isObj(attributes) || isStr(attributes)) {
            if (isObj(attributes)) Object.keys(attributes).forEach(key => {
                if (eventoptions.some(is.eq(key)) && isFunc(attributes[key])) {
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
        /*
          // start handling directives early on element lifecycle
          if (element.attributes) map(element.attributes, attr => {
              if (Craft.Directives.has(attr.name)) {
                  manageAttr(element, attr, attr.textContent, '', true);
              }
          });
        */

        return element;
    }

    /**
     * Contains several methods for Element Creation
     * @class dom
     */
    let Dom = {
        /**
         * craft elements on the fly using this nifty method
         * @method element
         * @for dom
         * @param {String} name - tag name of element to be created
         * @param {String|NodeList|Array|Node} inner - inner value(s) of element
         * @param {Object|String} attributes - Key value pair object defining element attributes or URI variable style string
         * @return {Element} newly created element
         */
        element: craftElement,
        /**
         * Makes document fragments also allows attaching nodes or strings that get converted to html.
         * @for dom
         * @method frag
         * @param {String|Node} [inner] - node or string to convert to html
         * @return {DocumentFragment}
         */
        frag(inner) {
            let dfrag;
            if (isStr(inner)) dfrag = dffstr(inner);
            if (!is.Node(dfrag)) dfrag = doc.createDocumentFragment();
            if (is.Node(inner)) dfrag.appendChild(inner);
            return dfrag;
        },
        /**
         * creates an img element with the options provided
         * @method img
         * @for dom
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
                map(items, item => {
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
    'table,td,th,tr,article,aside,ul,ol,li,h1,h2,h3,h4,h5,h6,div,span,pre,code,section,button,br,label,header,i,style,nav,menu,main,menuitem'.split(',').map(tag => {
        Dom[tag] = (inner, attr, ea) => Dom.element(tag, inner, attr, ea);
    });

    function domNodeList(elements) {
        Craft.omit(Object.getOwnPropertyNames(Array.prototype), 'length').map(method => {
            elements[method] = Array.prototype[method];
        });

        /**
         * Listen for Events on the NodeList
         * @method elements.on
         * @for dom
         * @param {String} string indicating the type of event to listen for
         * @param {Function} func - handler function for the event
         * @return handler (off,once,on)
         */
        elements.on = (eventType, func) => on(eventType, elements, func);
        /**
         * add CSS style rules to NodeList
         * @method elements.css
         * @param {object} styles - should contain all the styles you wish to add example { borderWidth : '5px solid red' , float : 'right'}...
         */
        elements.css = styles => Craft.css(elements, styles);
        elements.addClass = function (Class) {
            elements.map(el => {
                el.classList.add(Class);
            });
            return elements;
        };
        elements.gotClass = function () {
            const args = slice(arguments);
            return elements.every(el => args.every(Class => el.classList.contains(Class)));
        };

        elements.gotSomeClass = function () {
            const args = slice(arguments);
            return elements.some(el => args.every(Class => el.classList.contains(Class)));
        };

        elements.stripClass = Class => {
            elements.map(el => {
                el.classList.remove(Class);
            });
            return elements;
        };
        elements.toggleClass = (Class, state) => {
            elements.map(el => {
                (is.Bool(state) ? state : el.classList.contains(Class)) ? el.classList.remove(Class): el.classList.add(Class);
            });
            return elements;
        };

        /**
         * removes a specific Attribute from the this.element
         * @method elements.stripAttr
         * @for dom
         * @param {...String} name of the Attribute/s to strip
         */
        elements.stripAttr = function () {
            elements.map(el => {
                map(arguments, attr => {
                    el.removeAttribute(attr);
                });
            });
            return elements;
        };
        /**
         * checks if the element has a specific Attribute or Attributes
         * @method hasAttr
         * @for dom
         * @param {String|Boolean} name of the Attribute or if true checks that it has some (||) of the attributes or if false checks that it has all of the attributes (&&)
         * @param {...String} names of attributes to check for
         */
        elements.hasAttr = function (attr) {
            if (isStr(attr) && arguments.length == 1) return elements.every(el => el.hasAttribute(attr));
            const args = Craft.flatten(arguments);
            return elements.every(el => args.every(a => el.hasAttribute(a)));
        };
        /**
         * Toggles an attribute on element , optionally add value when toggle is adding attribute.
         * @method toggleAttr
         * @for dom
         * @param {String} name - name of the attribute to toggle
         * @param {String} val - value to set attribute to
         * @param {Boolean=} rtst - optionally return a bool witht the toggle state otherwise returns the element
         */
        elements.toggleAttr = function (name, val, rtst) {
            elements.map(el => {
                el[((is.Bool(val) ? !val : el.hasAttr(name)) ? 'strip' : 'set') + 'Attr'](name, val);
            });
            return rtst ? elements.every(el => el.hasAttr(name)) : elements;
        };
        /**
         * Sets or adds an Attribute on elements of a NodeList
         * @method setAttr
         * @for dom
         * @param {String} Name of the Attribute to add/set
         * @param {String} Value of the Attribute to add/set
         */
        elements.setAttr = function (attr, val) {
            elements.map(el => {
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
            map(arguments, arg => {
                elements.map(el => {
                    el.appendChild((is.Node(val) ? val : dffstr(val)).cloneNode(true));
                });
            });
            return elements;
        };
        elements.appendTo = (val, within) => {
            elements.map(el => {
                if (isStr(el)) el = query(val, within);
                if (is.Node(el)) el.appendChild(el);
            });
            return elements;
        };
        elements.prepend = function () {
            map(arguments, val => {
                elements.map(el => {
                    el.insertBefore((is.Node(val) ? val : dffstr(val)).cloneNode(true), el.firstChild);
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
            if (el[type].length) el[type] = '';
            Craft.flatten(arguments).map(val => {
                is.Node(val) ? el.append(val) : el[type] += isFunc(val) ? val.call(el) : val;
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
        if (!element.state) element.state = eventsys();

        element.newSetGet = newSetGet;

        element.newSetGet('colorAccent', func => {
            if (element.hasAttr('color-accent') && isFunc(func)) func(element.getAttr('color-accent'));
        });

        /**
         * changes or returns the innerHTML value of a Node
         * @method element.html
         * @for dom
         * @param {String=} sets the innerHTML value or when undefined gets the innerHTML value
         */
        element.html = Inner('innerHTML', element);

        /**
         * changes or returns the textContent value of a Node
         * @method element.Text
         * @for dom
         * @param {String=} sets the textContent value or when undefined gets the textContent value
         */
        element.Text = Inner('textContent', element);

        /**
         * element.bind is what drives data-binding in Crafter.js it binds to values in models and objects
         * @method element.bind
         * @for dom
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
                if (obj.isObservable) element.state.binder = obj.on('$uberset:' + prop, element.html);
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
            if (element.state.binder) {
                element.state.binder.off();
                element.state.binder = undef;
            }
        };
        /**
         * replaces a Node with another node provided as a parameter/argument
         * @method replace
         * @for dom
         * @param {Node} Node to replace with
         */
        element.replace = val => {
            element.parentNode.replaceChild(val, element);
            return element;
        };
        /**
         * clones an element it's children, optionally
         * @method clone
         * @for dom
         * @param {Boolean} val - defaults to true if set to false children of element won't be cloned
         */
        element.clone = val => domManip(element.cloneNode(val == undef ? true : val));

        /**
         * imports a file and renders it on to the node
         * @method importview
         * @for dom
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


        element.append = function () {
            const domfrag = dom.frag();
            Craft.flatten(arguments).map(val => {
                is.Node(val) ? domfrag.appendChild(val) : domfrag.innerHTML += val;
            });
            element.appendChild(domfrag);
            return element;
        };

        const prepend = element.prepend.bind(element);
        element.prepend = function () {
            const domfrag = dom.frag();
            Craft.flatten(arguments).map(val => {
                //domfrag.appendChild(is.Node(val) ? val : dffstr(val));
                is.Node(val) ? domfrag.appendChild(val) : domfrag.innerHTML += val;
            });
            isFunc(prepend) ? prepend(domfrag) : element.insertBefore(domfrag, element.firstChild);
            return element;
        };

        /**
         * append the Element to another node using either a CSS selector or a Node
         * @method element.appendTo
         * @for dom
         * @param {Node|String} CSS selector or Node to append the this.element to
         * @chainable
         */
        element.appendTo = function (val, within) {
            if (isStr(val)) val = query(val, within);
            if (is.Node(val)) val.appendChild(element);
            return element;
        };
        /**
         * prepend the Element to another node using either a CSS selector or a Node
         * @method element.prependTo
         * @for dom
         * @param {Node|String} CSS selector or Node to append the this.element to
         * @chainable
         */
        element.prependTo = function (val, within) {
            if (isStr(val)) val = query(val, within);
            if (is.Node(val)) val.insertBefore(element, val.firstChild);
            return element;
        };

        /**
         * used to do things with your element without breaking scope
         * @method element.modify
         * @for dom
         * @param {function} func - callback to execute
         * @chainable
         */
        element.modify = func => {
            func.call(element, element);
            return element;
        };
        /**
         * Listen for Events on the element or on all the elements in the NodeList
         * @method element.on
         * @for dom
         * @param {String} string indicating the type of event to listen for
         * @param {Function} func - handler function for the event
         * @return handler (off,once,on)
         */
        element.on = (eventType, func) => on(eventType, element, func);

        element.emit = element.state.emit;

        element.newSetGet('ondestroy', fn => {
            if (isFunc(fn)) element.state.on('destroy', fn);
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
         * @method element.css
         * @for dom
         * @param {object} styles - should contain all the styles you wish to add
         * @example element.css({ borderWidth : '5px solid red' , float : 'right'});
         */
        element.css = (styles, prop) => Craft.css(element, styles, prop);
        /**
         * check if the element has got a specific CSS class
         * @method element.gotClass
         * @for dom
         * @param {...String} name of the class to check for
         */
        element.gotClass = function () {
            return slice(arguments).every(Class => element.classList.contains(Class));
        };

        /**
         * Add a CSS class to the element
         * @method element.addClass
         * @for dom
         * @param {String} name of the class to add
         */
        element.addClass = function () {
            map(arguments, Class => {
                element.classList.add(Class);
            });
            return element;
        };
        /**
         * removes a specific CSS class from the element
         * @method element.stripClass
         * @for dom
         * @param {...String} name of the class to strip
         */
        element.stripClass = function () {
            map(arguments, Class => {
                element.classList.remove(Class);
            });
            return element;
        };
        /**
         * Toggle a CSS class to the element
         * @method element.toggleClass
         * @for dom
         * @param {String} name of the class to add
         * @param {Boolean=} state - optionally toggle class either on or off with bool
         * @chainable
         */
        element.toggleClass = function (Class, state) {
            if (!is.Bool(state)) state = element.gotClass(Class);
            element[(state ? 'strip' : 'add') + 'Class'](Class);
            return element;
        };
        /**
         * removes a specific Attribute from the element
         * @method element.stripAttr
         * @for dom
         * @param {...String} name of the Attribute/s to strip
         * @chainable
         */
        element.stripAttr = function () {
            map(arguments, element.removeAttribute.bind(element));
            return element;
        };
        /**
         * checks if the element has a specific Attribute or Attributes
         * @method element.hasAttr
         * @for dom
         * @param {String|Boolean} name of the Attribute or if true checks that it has some (||) of the attributes or if false checks that it has all of the attributes (&&)
         * @param {...String} names of attributes to check for
         */
        element.hasAttr = function () {
            if (isStr(arguments[0])) return element.hasAttribute(arguments[0]);
            return slice(arguments).every(element.hasAttribute);
        };
        /**
         * Sets or adds an Attribute on the element
         * @method element.setAttr
         * @for dom
         * @param {String} Name of the Attribute to add/set
         * @param {String} Value of the Attribute to add/set
         * @chainable
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
         * @method element.getAttr
         * @for dom
         * @param {String} attr - name of attribute to get
         */
        element.getAttr = element.getAttribute;
        element.attr = (attr, val) => isStr(attr) && !def(val) ? element.getAttr(attr) : element.setAttr(attr, val);

        element.prop = element.hasAttr;
        /**
         * Toggles an attribute on element , optionally add value when toggle is adding attribute
         * @method element.toggleAttr
         * @for dom
         * @param {String} name - name of the attribute to toggle
         * @param {String} val - value to set attribute to
         * @param {Boolean=} rtst - optionally return a bool witht the toggle state otherwise returns the element
         */
        element.toggleAttr = (name, val, rtst) => {
            element[((is.Bool(val) ? !val : element.hasAttr(name)) ? 'strip' : 'set') + 'Attr'](name, val);
            return rtst ? element.hasAttr(name) : element;
        };
        if (!element.remove) element.remove = () => {
            element.parentNode.removeChild(element);
        };

        /**
         * Remove the element after a time in milliseconds
         * @method element.removeAfter
         * @for dom
         * @param {Number=} time - time to wait before self destructing the element
         */
        element.removeAfter = time => {
            setTimeout(element.remove.bind(element), time || 5000);
            return element;
        };

        /**
         * gets all the sibling elements of the element
         * @property element.Siblings - array of elements
         * @type {Array}
         * @for dom
         */
        defineprop(element, 'Siblings', {
            get() {
                return Craft.omit(element.parentNode.children, element).filter(isEl);
            }
        });

        /**
         * gets all the element's dimentions (width,height,left,top,bottom,right)
         * @method element.getRect
         * @for dom
         * @return {Object}
         */
        element.getRect = element.getBoundingClientRect;
        /**
         * sets or gets the element's pixel width
         * @property element.newSetGet
         * @type {String}
         * @for dom
         * @param {String|Number=} pixel value to set
         */
        element.newSetGet('Width', pixels => {
            element.style.width = pixels;
        }, () => element.getRect().with);

        /**
         * sets or gets the element's pixel height
         * @property element.Height
         * @type {Number}
         * @for dom
         * @param {String|number=} pixel value to set
         */
        element.newSetGet('Height', pixels => {
            element.style.height = pixels;
        }, () => element.getRect().height);
        /**
         * move the element using either css transforms or plain css possitioning
         * @method element.move
         * @for dom
         * @param {String|Number} x - x-axis position in pixels
         * @param {String|Number} y - y-axis position in pixels
         * @param {Boolean=} transform - should move set the position using css transforms or not
         */
        element.move = function (x, y, transform) {
            if (transform === true) {
                // element.style.willChange = 'transform';
                element.style.transform = `translateX(${x}px) translateY(${y}px)`;
            } else {
                element.top = y + 'px';
                element.left = x + 'px';
            }
        };
        /**
         * performs a query inside the element
         * @method element.query
         * @for dom
         * @param {String} CSS selector
         * @return {Node|Null}
         */
        element.query = selector => query(selector, element);
        /**
         * performs a queryAll inside the element
         * @method element.queryAll
         * @for dom
         * @param {String} CSS selector
         * @return {NodeList|Null}
         */
        element.queryAll = selector => queryAll(selector, element);

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

        if (element.isInput) {
            element.SyncInput = (obj, key, onset) => Craft.SyncInput(element, obj, key, onset);
            element.disconectInputSync = () => Craft.disconectInputSync(element);
        }

        element.observe = (func, options, name) => {
            if (!isStr(name)) name = 'MutObserver';
            element[name] = new MutationObserver(muts => {
                muts.map(mut => {
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
        element.observeAttrs = func => element.state.on('attr', func.bind(element));

        return element;
    }

    /**
     * returns many useful methods for interacting with and manipulating the DOM or creating elements
     * @method dom
     * @for Craft
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
     * Craft is Crafter.js's Core containing most functionality.
     * @class Craft
     */
    var Craft = {
        /**
         * general Crafter notification event system
         * @type {Object}
         * @property notifier
         * @for Craft
         */
        notifier: eventsys(),
        /**
         * Returns an object or calls a function with all the differences between two arrays
         * @method arrDiff
         * @for Craft
         * @param {Array} arr - array to be compared
         * @param {Array} newArr - second array to be compared
         * @param {Function=} func - optional function that recieves all the info as parameters
         * @return {Object}
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
                arrb
            };
        },
        /**
         * Checks an array's length if the array contains only a single item it is returned.
         * @method deglove
         * @for Craft
         * @param {array|arraylike) arr - collection to deglove
         * @return (array|*)
         */
        deglove: arr => is.Arraylike(arr) && arr.length == 1 ? arr[0] : arr,
        last,
        cutdot,

        joindot,
        dffstr,

        toArr,
        toInt,
        promise,
        eventsys,
        // dom methods and stuff
        dom,
        query,
        queryAll,
        queryEach,
        forEach,
        map,
        on,
        once,
        is,
        UnHTML(html) {
            return html
                .replace(/<script[^>]*?>.*?<\/script>/gi, '')
                .replace(/<style[^>]*?>.*?<\/style>/gi, '')
                .replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');
        },
        /**
         * Compares two arrays and determines if they are the same array
         * @method sameArray
         * @for Craft
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
         * @for Craft
         * @param {Number} len - the integer length of the array to be generated
         * @param {...function|*} val - value to set at each index , multiple value params after lenth will generate nested 2d arrays
         * @return {Array}
         */
        array(len) {
            let arr = [],
                val = slice(arguments, 1);
            if (val.length == 1)
                for (; len > 0; len--) arr.push(isFunc(val[0]) ? val[0]() : val[0]);
            else
                for (; len > 0; len--) arr.push(Craft.array(val.length, val));
            return arr;
        },
        /**
         * Gets all the property keys in any object even the hiden ones
         * @method getAllKeys
         * @for Craft
         * @param {*} obj - object to list keys fromModel
         * @return {Array} - array containing all the property keys
         */
        getAllKeys(obj) {
            let props = [];
            do {
                props = props.concat(Object.getOwnPropertyNames(obj));
            } while (obj = Object.getPrototypeOf(obj));
            return props;
        },
        /**
         * flattens, sorts and eliminates doubles from arraylike collections
         * @method unique
         * @for Craft
         * @param {Array|Arraylike} arr
         * @return {Array}
         */
        unique: arr => toArr(newSet()(Craft.flatten(arr))),
        /**
         * Flattens any multidimentional array or arraylike object
         * @method flatten
         * @for Craft
         * @param {Array|Arraylike} arr - multidimentional array(like) object to flatten
         * @return {Array}
         */
        flatten: arr => Array.prototype.reduce.call(arr, (flat, toFlatten) => flat.concat(isArr(toFlatten) ? Craft.flatten(toFlatten) : toFlatten), []),
        /**
         * Gets a value from inside an object using a reference string
         * @method getDeep
         * @for Craft
         * @example Craft.getDeep(myObj,'Company.employees[16].person.name') -> Mr Smithers or Craft.getDeep(anObj,'Colony.Queen.brood') -> [...ants]
         * @param {Object} obj - the object to extract values from
         * @param {String} path - string to reference value by simple dot notation or array refference example Craft.getDeep({ a : { b : [1,2,3] }},"a.b[2]") -> 3
         */
        getDeep(obj, path) {
            try {
                cutdot(path.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '')).map(step => {
                    return step in obj || (root.Reflect && Reflect.has(obj, step)) ? obj = (obj.isObservable ? obj.get(step) : obj[step]) : obj = undef;
                });
                return obj;
            } catch (e) {}
        },
        /**
         * Craft.setDeep  is similar to getDeep it uses a string to reference to a value
         * @method setDeep
         * @for Craft
         * @param {Object} obj - the object to set values on
         * @param {String} path - string to reference value by simple dot notation
         * @param {*} value - value to set
         * @param {Boolean} robj - should the function return the object
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
         * @for Craft
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
         * @method URLfrom
         * @for Craft
         * @param {String} - content to convert to an inline URL
         **/
        URLfrom: (text, type) => URL.createObjectURL(new Blob([text], type)),
        checkStatus(response) {
            if (response.status >= 200 && response.status < 300) return response;
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
        },
        concatObjects,
        completeAssign(host) {
            slice(arguments, 1).map(source => {
                let descriptors = Object.keys(source).reduce((descriptors, key) => {
                    descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
                    return descriptors;
                }, {});
                // by default, Object.assign copies enumerable Symbols too
                Object.getOwnPropertySymbols(source).map(sym => {
                    let descriptor = Object.getOwnPropertyDescriptor(source, sym);
                    if (descriptor.enumerable) descriptors[sym] = descriptor;
                });
                Object.defineProperties(target, descriptors);
            });
            return target;
        },
        isObservable: obj => obj.isObservable || false,
        /**
         * Simply clones/duplicates any object or array/arraylike object
         * @method clone
         * @for Craft
         * @param {Array|Object} val - array or object to be cloned
         * @return {Array|Object} cloned result
         */
        clone: val => isObj(val) ? Object.create(val) : Array.from(val),
        /**
         * omits values from any arraylike object or string
         * @method omitFrom
         * @for Craft
         * @param {arraylike|String} Arr - arraylike object from which values will be omitted
         * @param {...*} values - values to omit from the arraylike object
         * @return {Array|String}
         */
        omitFrom(Arr) {
            let args = slice(arguments, 1);
            if (isStr(Arr))
                args.map(a => {
                    while (Arr.includes(a)) Arr = Arr.replace(a, '');
                });
            else Arr = (is.Arraylike(Arr) ? toArr(Arr) : Arr).filter(e => {
                if (!args.some(is.eq(e))) return e;
            });
            return Arr;
        },

        has,
        /**
         * Omits values from Objects, Strings and Arraylike objects
         * @method omit
         * @for Craft
         * @param {Object|Array} val - object from which things may be omitted
         * @param {...*} args - things to omit from Object or Array
         * @return {Object|Array}
         */
        omit(val) {
            if (is.Arraylike(val)) val = Craft.omitFrom.apply(this, arguments);
            let args = toArr(arguments).slice(1);
            if (isObj(val) && !args.some(v => v == val)) forEach(val, (prop, key) => {
                if (args.some(v => v == prop || v == key)) delete val[key];
            });
            return val;
        },
        /**
         * checks which browser you're running
         * @method isBrowser
         * @for Craft
         * @param {String} browser - string containing a browser name like 'chrome','firefox'...
         * @return {Boolean} - returns whether or not this is the browser you checked for
         */
        isBrowser: browser => Br.toLowerCase().includes(browser.toLowerCase()),
        /**
         * name of browser and version
         * @type {String}
         * @property browser
         * @for Craft
         */
        browser: Br,
        /**
         * Crafter.js' router system
         * @class router
         * @for Craft
         * @type Object
         * @property router
         */
        router: {
            handle(event, func) {
                if(location.hash === event) func(event,location);
                return Craft.notifier.on(event, func);
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
        /**
         * Create, remove and manage cookies.
         * @class Cookies
         */
        Cookies: {
            get: key => decodeURIComponent(doc.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null,
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
            keys: () => doc.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/).map(decodeURIComponent)
        },
        /**
         * Handles WebSockets in a contained manner with send and recieve methods
         * @class Socket
         * @for Craft
         * @constructor
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
                const newSock = () => protocols ? new WebSocket(address, protocols) : new WebSocket(address);

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
        after(n, func, ctx) {
            !isFunc(func) && isFunc(n) ? func = n : console.error('Craft.after: no function');
            n = Number.isFinite(n = +n) ? n : 0;
            if (--n < 1) return function () {
                return func.apply(ctx || this, arguments);
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
         * takes in any string of valid css code and executes it
         * @method addCSS
         * @for Craft
         * @param {String} css - css code to execute
         */
        addCSS(css, noimport) {
            query('style[crafterstyles]', head).textContent += noimport ? css : `@import url("${Craft.URLfrom(css, {type: 'text/css'})}");\n`;
        },
        /**
         * imports css and executes it
         * @method importCSS
         * @for Craft
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
         * imports fonts and loads them
         * @method importFont
         * @for Craft
         * @param {String} name - name of font as used in css
         * @param {String} src - source to fetch from
         */
        importFont(name, src) {
            Craft.addCSS(`@font-face {font-family:${name};src:url("${src.slice(0, 2) === './' ? src : Craft.fixURL(src)}");}`, true);
        },
        /**
         * takes in a source then attempts to fetch and execute it
         * @method loadScript
         * @for Craft
         * @param {String} src - source to fetch from
         * @param {Boolean} [funcexec] - execute code from inside a new Function() object
         * @param {Object} [fetchAttr] - fetch request options
         */
        loadScript(src, funcexec, fetchattr) {
            let fetchAttr = {
                mode: 'cors'
            };
            if (isObj(fetchattr)) fetchAttr = concatObjects(fetchAttr, fetchattr);
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
         * fetches and executes multiple scripts
         * @method loadScripts
         * @for Craft
         * @param {Array} urls - array of string urls (sources) to fetch from
         * @param {Boolean} [funcexec] - execute code from inside a new Function() object
         * @param {Object} [fetchAttr] - fetch request options
         * @return {Promise}
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
        Directives: newMap(),
        Models: observable(),
        /**
         * Tail Call Optimization for recursive functions
         * @method tco
         * @for Craft
         * @param {Function} fn - function that uses recursion inside
         * @return {Function}
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
        /**
         * converts Objects or URL variable strings to a FormData object
         * @method toFormData
         * @for Craft
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
         * @method onScroll
         * @param {Node} element - target of listener
         * @param {Function} func - callback to handle the event
         * @param {Boolean=} preventDefault - event.preventDefault() or not
         */
        onScroll(element, func, preventDefault) {
            return on('wheel', element, e => {
                if (preventDefault) e.preventDefault();
                func(e.deltaY < 1, e);
            });
        },
        /**
         * Promise that resolves when the DOM and WebComponents are all finished loading
         * @property WhenReady
         * @type {Promise}
         * @for Craft
         * @return {Promise} - when everything is done loading WhenReady will return a promise
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
        /**
         * Create's Crafter.js models
         * @method model
         * @for Craft
         * @param {String} name - give a name to the model
         * @param {Class} modelclass - Class with constructor to instantiate model
         * @return {Object}
         */
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
         * Defines custom attributes aka directives.
         * @method directive
         * @for Craft
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
                              if (!is.Set(el.state.directives)) el.state.directives = newSet();
                              if (!el.state.directives.has(name)) {
                                  el.state.directives.add(name);
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
         * converts camel case strings to dashed strings usefull for css properties and such
         * @method camelDash
         * @for Craft
         * @example Craft.camelDash('MyCamelCaseName') // -> my-camel-case-name
         * @param {String) val - string to convert
         */
        camelDash(val) {
            return val.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        },
        /**
         * formats a number into a measurement of data size (Bytes,KB,GB,TB...)
         * @method formatBytes
         * @for Craft
         * @param {Nuber} bytes - number to convert
         * @param {Number} [decimals] - limit decimals to number
         * @return {String}
         */
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
         * Generates random alphanumeric strings. default length of 6 characters
         * @method randomStr
         * @for Craft
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
         * @method GenUID
         * @for Craft
         * @example Craft.GenUID(); // -> "0ebf-c7d2-ef81-2667-08ef-4cde"
         * @param {Number=} len - optional length of uid sections
         * @return {String}
         */
        GenUID: len => Craft.array(len || 6, () => Craft.randomStr(4)).join('-'),
        /**
         * method for creating custom elements configuring their lifecycle's and inheritance
         * the config Object has 7 distinct options ( created , inserted , destroyed , attr, css, set_X and get_X )
         * @method newComponent
         * @for Craft
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
            return Craft.notifier.on('tabChange', fn);
        },
        every(time, fn, context, pauseondefocus) {
            if (isFunc(fn)) {
                let options = {
                    interval: undef,
                    on() {
                        options.interval = setInterval(fn.bind(is.Bool(context) || !def(context) ? options : context), (isFunc(time) ? time() : time));
                        return options;
                    },
                    off() {
                        clearInterval(options.interval);
                        return options;
                    }
                };
                if (pauseondefocus === true || context === true) Craft.onTabChange(state => {
                    options[state ? 'on' : 'off']();
                });
                return options.on();
            }
        }
    };

    // takes in an affected element and scans it for custom attributes
    // then handles the custom attribute if it was registered with Craft.directive
    function manageAttr(el, name, val, oldval, hasAttr) {
        if (Craft.Directives.has(name)) {
            const handle = Craft.Directives.get(name);
            if (hasAttr && val != oldval) {
                el = dom(el);
                if (!is.Set(el.state.directives)) el.state.directives = newSet();
                if (!el.state.directives.has(name)) {
                    el.state.directives.add(name);
                    handle.bind.call(el, el, val);
                } else if (handle.update) handle.update.call(el, el, val, hasAttr);
            } else if (!hasAttr && handle.unbind) handle.unbind.call(el, el, val, oldval);
        }
        if (el.state) {
            el.state.emit('attr', name, val, oldval, hasAttr);
            el.state.emit('attr:' + name, name, val, oldval, hasAttr);
        }
    }

    new MutationObserver(muts => {
        muts.map(mut => {
            map(mut.removedNodes, el => {
                if (el.state) el.state.emit('destroy');
            });
            map(mut.addedNodes, el => {
                if (el.attributes) map(el.attributes, attr => {
                    if (Craft.Directives.has(attr.name)) manageAttr(el, attr.name, attr.textContent, '', true);
                });
            });
            if (mut.type == 'attributes' && isEl(mut.target) && mut.attributeName != 'style')
                manageAttr(mut.target, mut.attributeName, mut.target.getAttribute(mut.attributeName), mut.oldValue, mut.target.hasAttribute(mut.attributeName));
        });
    }).observe(doc, {
        attributes: true,
        childList: true,
        // characterData: true,
        subtree: true
    });


    head.appendChild(dom.style('', 'crafterstyles'));
    let TabChange = ta => () => {
        Craft.tabActive = ta;
        Craft.notifier.emit('tabChange', ta);
    }

    on('blur', TabChange(false));
    on('focus', TabChange(true));

    Craft.directive('link', {
        bind(element, link) {
            if (isFunc(element.onlink)) element.state.linkhandle = Craft.router.handle(link, element.onlink);
            function makeLinkHandler(fn) {
                if (isFunc(fn)) {
                    if (element.state.linkhandle) element.state.linkhandle.off();
                    return (element.state.linkhandle = Craft.router.handle(link, fn));
                }
            }
            element.newSetGet('onlink', makeLinkHandler, () => makeLinkHandler);
        },
        update(element, link, oldlink) {
            if (link != oldlink) {
                if (isObj(element.state.linkhandle)) element.state.linkhandle.off();
                if (isFunc(element.onunlink)) element.onunlink(link);
            }
        },
        unbind(element, link) {
            if (isObj(element.state.linkhandle)) element.state.linkhandle.off();
            if (isFunc(element.onunlink)) element.onunlink(link);
        }
    });

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

    Craft.directive('color-accent', {
        bind(element, color) {
            if (isFunc(element.colorAccent)) element.colorAccent(color);
        }
    });

    function init() {
        Ready = true;
        Craft.notifier.emit('ready');
    }

    !ready() ? once('DOMContentLoaded', doc, init) : init();

    on('hashchange', () => {
        Craft.notifier.emit(location.hash, location);
    });

    on('click', (e, target) => {
        if (target.attributes) {
            map(target.attributes, attr => {
                if (attr.name == 'link')(target.hasAttr('newtab') ? open : Craft.router.open)(attr.value);
            });
        }
    });

    if (typeof define === 'function' && define.amd) define(['Craft', 'craft'], Craft);
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    else if (typeof module === 'object' && module.exports) module.exports = Craft;
    // Browser globals (root is window)
    else root.Craft = Craft;

    // console.log(performance.now() - perf, 'Crafter.js');
})(document, self);
