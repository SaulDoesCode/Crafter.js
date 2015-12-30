/**
 *  @overview Crafter.js , minimalist front-end library
 *  @author Saul van der Walt - https://github.com/SaulDoesCode/
 *  @license MIT
 */
"use strict";

function _typeof(obj) {
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}

(function(doc, root) {

    var regexps = {
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
        tem = undefined,
        _br = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if (_br && (tem = ua.match(/version\/([\.\d]+)/i)) !== null) _br[2] = tem[1];
    _br ? [_br[1], _br[2]] : [navigator.appName, navigator.appVersion, '-?'];

    CrafterStyles.setAttribute('crafterstyles', '');
    CrafterStyles.innerHTML = '\n@keyframes NodeInserted {from {opacity:.99;}to {opacity: 1;}} [view-bind],[input-bind] {animation-duration: 0.001s;animation-name: NodeInserted;}';
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
        return (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === str;
    }

    function manageInvoke(fn, argsArr, totalArity) {
        argsArr = argsArr.length > totalArity ? argsArr.slice(0, totalArity) : argsArr;
        return argsArr.length === totalArity ? fn.apply(null, argsArr) : createFn(fn, argsArr, totalArity);
    }

    function createFn(fn, Args, totalArity) {
        var remainingArity = totalArity - Args.length;
        return is.Between(remainingArity, 10, 0) ? function() {
            var args = toArr(arguments);
            return manageInvoke(fn, Args.concat(args), totalArity);
        } : (function(fn, args, arity) {
            var a = [];
            forEach(arity, function(v, i) {
                return a.push('a' + i.toString());
            });
            return eval('false||function(' + a.join(',') + '){ return manageInvoke(fn, args.concat(toArr(arguments)));}');
        })(fn, args, remainingArity);
    }

    function def() {
        return ta(arguments, function(o) {
            return !isT(o, 'undefined');
        });
    }

    function nil() {
        return ta(arguments, function(o) {
            return o === null;
        });
    }

    /** is - Type Testing / Assertion */
    root.is = {
        /**
         * Test if something is a boolean type
         * @param val - value to test
         */

        Bool: function Bool() {
            return ta(arguments, function(o) {
                return typeof val === 'boolean';
            });
        },

        /**
         * Test if something is a String
         * @param args - value/values to test
         */
        String: function String() {
            return ta(arguments, function(o) {
                return isT(o, 'string');
            });
        },

        /**
         * Test if something is an Array
         * @param args - value/values to test
         */
        Arr: function Arr() {
            return ta(arguments, function(o) {
                return Array.isArray(o);
            });
        },

        /**
         * Test if something is an Array-Like
         * @param args - value/values to test
         */
        Arraylike: function Arraylike() {
            try {
                return ta(arguments, function(o) {
                    return def(o.length);
                });
            } catch (e) {}
            return false;
        },

        /**
         * Determine whether a variable is undefined
         * @param args - value/values to test
         */
        Undef: function Undef() {
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
        Null: function Null() {
            return ta(arguments, function(o) {
                return o === null;
            });
        },

        /**
         * Determine whether a variable is a DOM Node
         * @param args - value/values to test
         */
        Node: (function(_Node) {
            function Node() {
                return _Node.apply(this, arguments);
            }

            Node.toString = function() {
                return _Node.toString();
            };

            return Node;
        })(function() {
            return ta(arguments, function(o) {
                return o instanceof Node;
            });
        }),

        /**
         * Determine whether a variable is a DOM NodeList or Collection of Nodes
         * @param args - value/values to test
         */
        NodeList: function NodeList() {
            return ta(arguments, function(nl) {
                return is.Arraylike(nl) ? ta(nl, function(n) {
                    return n instanceof Node;
                }) : false;
            });
        },

        /**
         * Determine if a variable is a Number
         * @param {...*} args - value/values to test
         */
        Num: function Num() {
            return ta(arguments, function(o) {
                return !isNaN(Number(o));
            });
        },

        /**
         * Determine if a variable is an Object
         * @param args - value/values to test
         */
        Object: function Object() {
            return ta(arguments, function(o) {
                return type(o, '[object Object]');
            });
        },

        /**
         * Determine if a variable is a HTMLElement
         * @param args - value/values to test
         */
        Element: function Element() {
            return ta(arguments, function(o) {
                return type(o, '[object HTMLElement]');
            });
        },

        /**
         * Determine if a variable is a File Object
         * @param args - value/values to test
         */
        File: function File() {
            return ta(arguments, function(o) {
                return type(o, '[object File]');
            });
        },

        /**
         * Determine if a variable is of a FormData type
         * @param args - value/values to test
         */
        FormData: function FormData() {
            return ta(arguments, function(o) {
                return type(o, '[object FormData]');
            });
        },

        /**
         * Determine if a variable is a Map
         * @param args - value/values to test
         */
        Map: function Map() {
            return ta(arguments, function(o) {
                return type(o, '[object Map]');
            });
        },

        /**
         * Determine if a variable is a function
         * @param args - value/values to test
         */
        Func: function Func() {
            return ta(arguments, function(o) {
                return typeof o === 'function';
            });
        },

        /**
         * Determine if a variable/s are true
         * @param args - value/values to test
         */
        True: function True() {
            return ta(arguments, function(o) {
                return o === true;
            });
        },

        /**
         * Determine if a variable/s are false
         * @param args - value/values to test
         */
        False: function False() {
            return ta(arguments, function(o) {
                return o !== true;
            });
        },

        /**
         * Determine if a variable is of Blob type
         * @param obj - variable to test
         */
        Blob: function Blob() {
            return ta(arguments, function(o) {
                return type(o, '[object Blob]');
            });
        },

        /**
         * Determine if a variable is a Regular Expression
         * @param obj - variable to test
         */
        RegExp: function RegExp() {
            return ta(arguments, function(o) {
                return type(o, '[object RegExp]');
            });
        },

        /**
         * Determine if a variable is a Date type
         * @param {...*} variable to test
         */
        Date: function Date() {
            return ta(arguments, function(o) {
                return type(o, '[object Date]');
            });
        },

        /**
         * Determine if a variable is a Set
         * @param obj - variable to test
         */
        Set: function Set() {
            return ta(arguments, function(o) {
                return type(o, '[object Set]');
            });
        },

        Args: function Args(val) {
            return !nill(val) && (type(val, '[object Arguments]') || (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && 'callee' in val);
        },
        /**
         * Determine if a variable is a Symbol
         * @param obj - variable to test
         */
        symbol: function symbol(obj) {
            return type(obj, '[object Symbol]');
        },
        char: function char(val) {
            return is.String(val) && val.length === 1;
        },
        space: function space(val) {
            return is.char(val) && val.charCodeAt(0) > 8 && val.charCodeAt(0) < 14 || val.charCodeAt(0) === 32;
        },
        /**
         * Determine if a String is UPPERCASE
         * @param {string} char - variable to test
         */
        Uppercase: function Uppercase(str) {
            return is.String(str) && !is.Num(str) && str === str.toUpperCase();
        },
        /**
         * Determine if a String is LOWERCASE
         * @param {string} char - variable to test
         */
        Lowercase: function Lowercase(str) {
            return is.String(str) && str === str.toLowerCase();
        },
        /**
         * Determine if a String contains only characters and numbers (alphanumeric)
         * @param {string} str - variable to test
         */
        Alphanumeric: function Alphanumeric(str) {
            return (/^[0-9a-zA-Z]+$/.test(str));
        },
        /**
         * Determines whether a String is a valid Email
         * @param {string} email - variable to test
         */
        Email: function Email(email) {
            return regexps.email.test(email);
        },
        /**
         * Determines whether a String is a URL
         * @param {string} url - variable to test
         */
        URL: function URL(url) {
            return regexps.url.test(url);
        },
        /**
         * Determines whether a String is a HEX-COLOR (#fff123)
         * @param {string} HexColor - variable to test
         */
        HexColor: function HexColor(hexColor) {
            return regexps.hexColor.test(hexColor);
        },
        /**
         * Determines whether a String is a ip
         * @param {string} ip - variable to test
         */
        ip: function ip(_ip) {
            return regexps.ip.test(_ip);
        },
        /**
         * Determines whether a String is a ipv4
         * @param {string} ipv4 - variable to test
         */
        ipv4: function ipv4(_ipv) {
            return regexps.ipv4.test(_ipv);
        },
        /**
         * Determines whether a String is a ipv6
         * @param {string} ipv6 - variable to test
         */
        ipv6: function ipv6(_ipv2) {
            return regexps.ipv6.test(_ipv2);
        },
        /**
         * Determines whether a String is hexadecimal
         * @param {string} hexadecimal - variable to test
         */
        hexadecimal: function hexadecimal(_hexadecimal) {
            return regexps.hexadecimal.test(_hexadecimal);
        },
        /**
         * checks wether a date is today
         * @param obj - Date to test
         */
        today: function today(obj) {
            return is.Date(obj) && obj.toDateString() === new Date().toDateString();
        },
        /**
         * checks wether a date is yesterday
         * @param obj - Date to test
         */
        yesterday: function yesterday(obj) {
            var now = new Date();
            return is.Date(obj) && obj.toDateString() === new Date(now.setDate(now.getDate() - 1)).toDateString();
        },

        /**
         * checks wether a date is tommorow
         * @param obj - Date to test
         */
        tomorrow: function tomorrow(obj) {
            var now = new Date();
            return is.Date(obj) && obj.toDateString() === new Date(now.setDate(now.getDate() + 1)).toDateString();
        },

        /**
         * Determines if a date is in the past
         * @param obj - Date to test
         */
        past: function past(obj) {
            return is.Date(obj) && obj.getTime() < new Date().getTime();
        },
        /**
         * Determines if a date is in the future
         * @param obj - Date to test
         */
        future: function future(obj) {
            return !is.past(obj);
        },
        /**
         * Determines whether a String is a timeString
         * @param time - variable to test
         */
        time: function time(_time) {
            return regexps.timeString.test(_time);
        },
        /**
         * Determines whether a String is a dateString
         * @param {string} dateString - variable to test
         */
        dateString: function dateString(_dateString) {
            return regexps.dateString.test(_dateString);
        },
        /**
         * Determines whether a Number is between a maximum and a minimum
         * @param {Number} val - number value to test
         * @param {Number} max - maximum to compare the value with
         * @param {Number} min - minimum to compare the value with
         * @returns {Boolean} wether or not the value is between the max and min
         */
        Between: function Between(val, max, min) {
            return val <= max && val >= min;
        },
        /**
         * checks if a number is an integer
         * @param val - variable / value to test
         */
        int: function int(val) {
            return is.Num(val) && val % 1 === 0;
        },
        /**
         * checks if a number is an even number
         * @param val - variable / value to test
         */
        even: function even(val) {
            return is.Num(val) && val % 2 === 0;
        },
        /**
         * checks if a number is an odd number
         * @param val - variable / value to test
         */
        odd: function odd(val) {
            return is.Num(val) && val % 2 !== 0;
        },
        /**
         * checks if a number is positive
         * @param val - variable / value to test
         */
        positive: function positive(val) {
            return is.Num(val) && val > 0;
        },
        /**
         * checks if a number is positive
         * @param val - variable / value to test
         */
        negative: function negative(val) {
            return is.Num(val) && val < 0;
        },
        /**
         * Determines if two variables are equal
         * @param a - first value to compare
         * @param b - second value to compare
         */
        eq: function eq(a, b) {
            return a === b;
        },
        /**
         * Determines if a number is LOWER than another
         * @param {Number} val - value to test
         * @param {Number} other - num to test with value
         */
        lt: function lt(val, other) {
            return val < other;
        },
        /**
         * Determines if a number is LOWER than or equal to another
         * @param {Number} val - value to test
         * @param {Number} other - num to test with value
         */
        lte: function lte(val, other) {
            return val <= other;
        },
        /**
         * Determines if a number is BIGGER than another
         * @param {Number} val - value to test
         * @param {Number} other - num to test with value
         */
        bt: function bt(val, other) {
            return val > other;
        },
        /**
         * Determines if a number is BIGGER than or equal to another
         * @param {Number} val - value to test
         * @param {Number} other - num to test with value
         */
        bte: function bte(val, other) {
            return val >= other;
        },
        /**
         * Determine if a given collection or string is empty
         * @param {Object|Array|string} val - value to test if empty
         */
        empty: function empty(val) {
            if (is.Object(val)) {
                var num = Object.getOwnPropertyNames(val).length;
                return num === 0 || num === 1 && is.Arr(val) || num === 2 && is.Args(val) ? true : false;
            } else return is.Arr(val) ? val.length <= 0 : val === '';
        },

        /**
         * Determines if a value is an instance of the ReactiveVariable class
         * @param args - value/values to test
         */
        ReactiveVariable: function ReactiveVariable() {
            var args = toArr(arguments);
            return args.length && args.every(function(o) {
                return o instanceof _ReactiveVariable;
            });
        },

        /**
         * Test if something is a Native JavaScript feature
         * @param val - value to test
         */
        Native: function Native(val) {
            var type = typeof val === 'undefined' ? 'undefined' : _typeof(val);
            return type === 'function' ? RegExp('^' + String(Object.prototype.toString).replace(/[.*+?^${}()|[\]\/\\]/g, '\\$&').replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$').test(Function.prototype.toString.call(val)) : val && type == 'object' && /^\[object .+?Constructor\]$/.test(val.toString) || false;
        },

        Input: function Input(element) {
            return element.tagName === 'INPUT' || element.tagName === 'TEXTAREA';
        }
    };

    var rv = is.ReactiveVariable;
    /**
     * Converts any Query/QueryAll to an Array of Nodes even if there is only one Node , this is error proof when no arguments are present it returns an empty array
     * @param {Node|NodeList|Array|String} val - pass either a CSS Selector string , Node/NodeList or Array of Nodes
     * @param {Node|NodeList|Array|String} within - pass either a CSS Selector string , Node/NodeList or Array of Nodes to search for val in
     */
    root.QueryOrNodetoNodeArray = function(val, within) {
        if (is.String(val) && (is.String(within) || is.Node(within))) val = queryAll(val, within);
        else if (is.String(val)) val = queryAll(val);
        return is.Node(val) ? [val] : is.NodeList(val) ? toArr(val) : [];
    };

    /**
     * Handles WebSockets in a contained manner with send and recieve methods
     * @param {string} wsAddress - the WebSocket address example "ws://localhost:3000/"
     * @param {Array=} protocols - the protocols to pass to the WebSocket Connection
     */
    function CraftSocket(address, protocols) {
        var _this = this;

        try {
            (function() {
                is.Arr(protocols) ? _this.Socket = new WebSocket(address, protocols) : _this.Socket = new WebSocket(address);
                var Self = _this;
                _this.open = true;
                _this.address = address;
                if (def(protocols)) _this.protocols = protocols;
                _this.messageCalls = [];
                _this.RecieveCalls = [];
                _this.Socket.onmessage = function(e) {
                    return Self.RecieveCalls.forEach(function(call) {
                        return call(e);
                    });
                };
                _this.Socket.onclose = function(e) {
                    return _this.open = false;
                };
            })();
        } catch (e) {
            throw new Error(err);
        }
    }
    /**
     * Sends a message along the WebSocket Connection
     * @param {string} message - the WebSocket address example "ws://localhost:3000/"
     * @param {function=} func - optional function to recieve the response with -> "function ( response , event ) { ... } or response => ..."
     */
    CraftSocket.prototype.send = function(message, func) {
        var Self = this;
        Self.messageCalls.push(function() {
            Self.Socket.send(message);
            if (is.Func(func) && Self.open) Self.recieve(function(data, e) {
                return func(data, e);
            });
        });
        Self.Socket.onopen = function(e) {
            return Self.messageCalls[Self.messageCalls.length - 1]();
        };
        return this;
    };
    /**
     * Recieves messages from the WebSocket Server
     * @param {function} func - function to recieve the response and event with -> "function ( response , event ) { ... } or response => ..."
     */
    CraftSocket.prototype.recieve = function(func) {
        is.Func(func) && this.open ? this.RecieveCalls.push(function(e) {
            return func(e.data, e);
        }) : console.error("no function or connection closed");
        return this;
    };
    /** Closes the WebSocket Connection */
    CraftSocket.prototype.close = function() {
        this.Socket.close();
    };

    /**
     * Variable that is used for Data Binding and other reactive processes
     * @param {*} val - value you'd liek the ReactiveVariable to Store
     * @param {function} handle - function that gets called whenever the ReactiveVariable changes -> "function( OldValue , newValue ) {...}"
     * @returns {*} Returns the value assigned to the ReactiveVariable
     */
    function _ReactiveVariable(val, handle) {
        if (is.Func(handle)) {
            this.val = val;
            this.Handle = handle;
        } else console.error('ReactiveVariable needs function');
    }
    /**
     * Sets the new value of the ReactiveVariable , this will also call the handle function
     * @param {*} val - new value to assign the ReactiveVariable
     */
    _ReactiveVariable.prototype.set = function(val) {
        if (this.val !== val) {
            this.Oldval = this.val;
            this.val = val;
            this.Handle(this.Oldval, val);
            return this.val;
        }
    };
    /**
     * Gets the value of the ReactiveVariable , ReactiveVariable.val also does this
     */
    _ReactiveVariable.prototype.get = function() {
        return this.val;
    };
    /**
     * Redefine the handle function of the ReactiveVariable
     * @param {function} handle - function that gets called whenever the ReactiveVariable changes -> "function( OldValue , newValue ) {...}"
     */
    _ReactiveVariable.prototype.reset = function(handle) {
        is.Func(handle) ? this.Handle = handle : console.error('ReactiveVariable.Reset only takes a function');
        return this;
    };

    /**
     * Event Handling Class
     * @param {string} EventType - set the type of event to listen for example "click" or "scroll"
     * @param {Node|NodeList|window|document} Target - the Event Listener's target , can also be a NodeList to listen on multiple Nodes
     * @param {function} Func - Handler function that will be called when the event is triggered -> "function( event , event.srcElement ) {...}"
     * @param {...*} args - extra optional arguments/parameters to pass to the handler function
     * @returns Interface On,Off,Once
     */
    function EventHandler(EventType, Target, Func, Within) {
        for (var _len = arguments.length, args = Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
            args[_key - 4] = arguments[_key];
        }

        this.EventType = EventType || 'click';
        this.Target = Target !== root && Target !== doc ? QueryOrNodetoNodeArray(Target, Within) : Target;
        this.FuncWrapper = function(e) {
            return Func(e, e.srcElement, args);
        };
    }
    /**
     * Activates the EventHandler to start listening for the EventType on the Target/Targets
     */
    EventHandler.prototype.On = function() {
        var _this2 = this;

        is.Arr(this.Target) ? this.Target.forEach(function(target) {
            return target.addEventListener(_this2.EventType, _this2.FuncWrapper);
        }) : this.Target.addEventListener(this.EventType, this.FuncWrapper);
        return this;
    };

    EventHandler.prototype.ChangeType = function(type) {
        this.Off();
        this.EventType = type;
        this.On();
        return this;
    };
    /**
     * De-activates / turns off the EventHandler to stop listening for the EventType on the Target/Targets
     * can still optionally be re-activated with On again
     */
    EventHandler.prototype.Off = function() {
        var _this3 = this;

        is.Arr(this.Target) ? this.Target.forEach(function(target) {
            return target.removeEventListener(_this3.EventType, _this3.FuncWrapper);
        }) : this.Target.removeEventListener(this.EventType, this.FuncWrapper);
        return this;
    };
    /**
     * Once the the Event has been triggered the EventHandler will stop listening for the EventType on the Target/Targets
     * the Handler function will be called only Once
     */
    EventHandler.prototype.Once = function() {
        var func = this.FuncWrapper,
            target = this.Target,
            etype = this.EventType,
            listenOnce = function listenOnce(e) {
                func(e);
                is.Arr(target) ? target.forEach(function(t) {
                    return t.removeEventListener(etype, listenOnce);
                }) : target.removeEventListener(etype, listenOnce);
            };
        is.Arr(target) ? target.forEach(function(t) {
            return t.addEventListener(etype, listenOnce);
        }) : target.addEventListener(etype, listenOnce);
        return this;
    };

    /**
     * Easy way to loop through Collections and Objects
     * @param {Array|Object|NodeList} iterable - any collection that is either an Object or has a .length value
     * @param {function} func - function called on each iteration -> "function( value , indexOrKey ) {...}"
     */
    root.forEach = function(iterable, func) {
        if (!def(iterable)) throw new Error("forEach -> iterable undefined");
        if (!is.Func(func)) throw new Error("forEach -> function invalid or undefined");
        var i = 0;
        if (def(iterable.length))
            for (; i < iterable.length; i++) {
                func(iterable[i], i);
            } else
                for (i in iterable) {
                    if (iterable.hasOwnProperty(i)) func(iterable[i], i);
                }
    };

    /**
     * Easy way to get a DOM Node or Node within another DOM Node using CSS selectors
     * @param {string} selector - CSS selector to query the DOM Node with
     * @param {Node|string=} element - Optional Node or CSS selector to search within insead of document
     */
    root.query = function(selector, element) {
        return def(element) ? is.String(element) ? doc.querySelector(element).querySelector(selector) : element.querySelector(selector) : doc.querySelector(selector);
    };

    /**
     * Easy way to get a DOM NodeList or NodeList within another DOM Node using CSS selectors
     * @param {string} selector - CSS selector to query the DOM Nodes with
     * @param {Node|string=} element - Optional Node or CSS selector to search within insead of document
     */
    root.queryAll = function(selector, element) {
        return def(element) ? is.Node(element) || element === doc ? element.querySelectorAll(selector) : query(element).querySelectorAll(selector) : doc.querySelectorAll(selector);
    };
    /**
     * Easy way to loop through Nodes in the DOM using a CSS Selector or a NodeList
     * @param {string|NodeList} selector - CSS selector to query the DOM Nodes with or NodeList to iterate through
     * @param {Node|string=} element - Optional Node or CSS selector to search within insead of document
     * @param {function} func - function called on each iteration -> "function( Element , index ) {...}"
     */
    root.queryEach = function(selector, element, func) {
        if (is.Func(element)) func = element;
        var elements = undefined,
            i = 0;
        is.Node(selector) ? elements = [selector] : elements = is.Func(element) ? queryAll(selector) : queryAll(selector, element);
        for (; i < elements.length; i++) {
            func(elements[i], i);
        }
    };

    function EventTypes(Target, within, listen) {
        var etype = function etype(type, fn) {
            return new EventHandler(type, Target, fn, within)[listen || 'On']();
        };
        return {
            Click: function Click(fn) {
                return etype('click', fn);
            },
            Input: function Input(fn) {
                return etype('input', fn);
            },
            DoubleClick: function DoubleClick(fn) {
                return etype('dblclick', fn);
            },
            Focus: function Focus(fn) {
                return etype('focus', fn);
            },
            Blur: function Blur(fn) {
                return etype('blur', fn);
            },
            Keydown: function Keydown(fn) {
                return etype('keydown', fn);
            },
            Mousemove: function Mousemove(fn) {
                return etype('mousemove', fn);
            },
            Mousedown: function Mousedown(fn) {
                return etype('mousedown', fn);
            },
            Mouseup: function Mouseup(fn) {
                return etype('mouseup', fn);
            },
            Mouseover: function Mouseover(fn) {
                return etype('mouseover', fn);
            },
            Mouseout: function Mouseout(fn) {
                return etype('mouseout', fn);
            },
            Mouseenter: function Mouseenter(fn) {
                return etype('mouseenter', fn);
            },
            Mouseleave: function Mouseleave(fn) {
                return etype('mouseleave', fn);
            },
            Scroll: function Scroll(fn) {
                return etype('scroll', fn);
            }
        };
    }

    /**
     * Starts listening for an EventType on the Target/Targets
     * @param {string} EventType - set the type of event to listen for example "click" or "scroll"
     * @param {Node|NodeList|window|document} Target - the Event Listener's target , can be a NodeList to listen on multiple Nodes
     * @param {function} Func - Handler function that will be called when the event is triggered -> "function( event , event.srcElement ) {...}"
     * @returns Off - when On is defined as a variable "var x = On(...)" it allows you to access all the EventHandler interfaces Off,Once,On
     */
    root.On = function(EventType, Target, element, func) {
        var args = toArr(arguments),
            types = args.length < 3 && !args.some(function(i) {
                return is.Func(i);
            });

        return is.Func(Target) ? new EventHandler(EventType, root, Target).On() : types ? EventTypes(EventType, Target) : is.Func(element) ? new EventHandler(EventType, Target, element).On() : new EventHandler(EventType, Target, func, element).On();
    };

    /**
     * Starts listening for an EventType on the Target/Targets ONCE after triggering the Once event Listener will stop listening
     * @param {string} EventType - set the type of event to listen for example "click" or "scroll"
     * @param {Node|NodeList|window|document} Target - the Event Listener's target , can be a NodeList to listen on multiple Nodes
     * @param {function} Func - Handler function that will be called when the event is triggered -> "function( event , event.srcElement ) {...}"
     * @returns On,Off,Once - when Once is defined as a variable "var x = Once(...)" it allows you to access all the EventHandler interfaces Off,Once,On
     */
    root.Once = function(EventType, Target, element, func) {
        var args = toArr(arguments),
            types = args.length < 3 && !args.some(function(i) {
                return is.Func(i);
            });

        return is.Func(Target) ? new EventHandler(EventType, root, Target).Once() : types ? EventTypes(EventType, Target, 'Once') : is.Func(element) ? new EventHandler(EventType, Target, element).Once() : new EventHandler(EventType, Target, func, element).Once();
    };

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
            var _ret2 = (function() {
                var newEl = doc.createElement(name);
                newEl.innerHTML = inner;
                if (is.Object(attributes)) forEach(attributes, function(val, attr) {
                    return newEl.setAttribute(attr, val);
                });
                if (is.String(attributes)) attributes.split('&').forEach(function(attr) {
                    return def(attr.split('=')[1]) ? newEl.setAttribute(attr.split('=')[0], attr.split('=')[1]) : newEl.setAttribute(attr.split('=')[0], '');
                });
                if (def(extraAttr) && is.Object(extraAttr)) forEach(extraAttr, function(val, attr) {
                    return newEl.setAttribute(attr, val);
                });
                return {
                    v: newEl
                };
            })();

            if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
        }
        var attrString = '';
        if (is.String(attributes)) attributes.split('&').forEach(function(attr) {
            return attrString += def(attr.split('=')[1]) ? attr.split('=')[0] + '="' + attr.split('=')[1] + '" ' : attr.split('=')[0] + ' ';
        });
        if (is.Object(attributes)) forEach(attributes, function(val, attr) {
            return attrString += ' ' + attr + '="' + val + '" ';
        });
        if (def(extraAttr) && is.Object(extraAttr)) forEach(extraAttr, function(val, attr) {
            return attrString += ' ' + attr + '="' + val + '" ';
        });
        return '<' + name + ' ' + attrString + '>' + inner + '</' + name + '>';
    }

    function domNodeList(elements) {
        return {
            /**
             * Listen for Events on the NodeList
             * @param {string} string indicating the type of event to listen for
             * @param {function} func - handler function for the event
             * @returns handler (Off,Once,On)
             */
            On: (function(_On) {
                function On(_x, _x2) {
                    return _On.apply(this, arguments);
                }

                On.toString = function() {
                    return _On.toString();
                };

                return On;
            })(function(eventType, func) {
                return On(eventType, elements, func);
            }),
            /**
             * Checks wether a Node is in the NodeList with either a refference to the Node or a CSS selector
             * @param {Node|string} Node or CSS selector
             */
            includes: function includes(SelectorNode) {
                for (var _i = 0; _i < elements.length; _i++) {
                    if (elements[_i] === SelectorNode) return true;
                }
                return false;
            },

            /**
             * add CSS style rules to NodeList
             * @param {object} styles - should contain all the styles you wish to add example { borderWidth : '5px solid red' , float : 'right'}...
             */
            css: function css(styles) {
                return def(styles) ? forEach(elements, function(el) {
                    return forEach(styles, function(prop, key) {
                        return el.style[key] = prop;
                    });
                }) : console.error('styles unefined');
            }

        };
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
    domManip.prototype.html = function(val) {
        var el = this.element;
        if (!def(val)) return is.Input(el) ? el.value : el.innerHTML;
        is.Input(el) ? el.value = val : el.innerHTML = val;
        return this;
    };
    /**
     * changes or returns the textContent value of a Node
     * @memberof dom
     * @param {string=} sets the textContent value or when undefined gets the textContent value
     */
    domManip.prototype.text = function(val) {
        var el = this.element,
            input = is.Input(el);
        if (!def(val)) return input ? el.value : el.textContent;
        input ? el.value = val : el.textContent = val;
        return this;
    };
    /**
     * replaces a Node with another node provided as a parameter/argument
     * @memberof dom
     * @param {Node} Node to replace with
     */
    domManip.prototype.replace = function(val) {
        this.element.parentNode.replaceChild(el, this.element);
        return this;
    };
    /**
     * append the Element to another node using either a CSS selector or a Node
     * @memberof dom
     * @param {Node|string} CSS selector or Node to append the this.element to
     */
    domManip.prototype.appendTo = function(val) {
        if (is.String(val)) val = query(val);
        if (val !== null) val.appendChild(this.element);
        return this;
    };
    /**
     * append text or a Node to the element
     * @memberof dom
     * @param {Node|string} String or Node to append to the this.element
     */
    domManip.prototype.append = function(val) {
        is.String(val) ? this.element.innerHTML += val : this.element.appendChild(val);
        return this;
    };
    /**
     * prepend text or a Node to the element
     * @memberof dom
     * @param {Node|string} String or Node to prepend to the this.element
     */
    domManip.prototype.prepend = function(val) {
        is.String(val) ? this.element.innerHTML = val + this.element.innerHTML : this.element.insertBefore(val, this.element.firstChild);
        return this;
    };
    /**
     * Listen for Events on the element or on all the elements in the NodeList
     * @memberof dom
     * @param {string} string indicating the type of event to listen for
     * @param {function} func - handler function for the event
     * @returns handler (Off,Once,On)
     */
    domManip.prototype.On = function(eventType, func) {
        return On(eventType, this.element, func);
    };
    /**
     * add CSS style rules to the Element or NodeList
     * @memberof dom
     * @param {object} styles - should contain all the styles you wish to add example { borderWidth : '5px solid red' , float : 'right'}...
     */
    domManip.prototype.css = function(styles) {
        var _this4 = this;

        def(styles) ? forEach(styles, function(prop, key) {
            return _this4.element.style[key] = prop;
        }) : console.error('Styles Object undefined');
        return this;
    };
    /**
     * check if the element has got a specific CSS class
     * @memberof dom
     * @param {string} name of the class to check for
     */
    domManip.prototype.gotClass = function(Class) {
        return this.element.classList.contains(Class);
    };
    /**
     * Add a CSS class to the element
     * @memberof dom
     * @param {string} name of the class to add
     */
    domManip.prototype.addClass = function(Class) {
        this.element.classList.add(Class);
        return this;
    };
    /**
     * removes a specific CSS class from the element
     * @memberof dom
     * @param {string} name of the class to strip
     */
    domManip.prototype.stripClass = function(Class) {
        this.element.classList.remove(Class);
        return this;
    };
    /**
     * removes a specific Attribute from the this.element
     * @memberof dom
     * @param {string} name of the Attribute to strip
     */
    domManip.prototype.stripAttr = function(Attr) {
        this.element.removeAttribute(Attr);
        return this;
    };
    /**
     * checks if the element has a specific Attribute
     * @memberof dom
     * @param {string} name of the Attribute to check for
     */
    domManip.prototype.hasAttr = function(Attr) {
        return this.element.hasAttribute(Attr);
    };
    /**
     * Sets or adds an Attribute on the element
     * @memberof dom
     * @param {string} Name of the Attribute to add/set
     * @param {string} Value of the Attribute to add/set
     */
    domManip.prototype.setAttr = function(Attr, val) {
        this.element.setAttribute(Attr, val);
        return this;
    };
    domManip.prototype.getAttr = function(Attr) {
        return this.element.getAttribute(Attr);
    };
    /**
     * gets all the elements siblings within it's parentNode
     * @memberof dom
     */
    domManip.prototype.getSiblings = function() {
        var siblings = [],
            AllChildren = this.element.parentNode.childNodes;
        for (var _i2 = 0; _i2 < AllChildren.length; _i2++) {
            if (AllChildren[_i2] !== this.element) siblings.push(AllChildren[_i2]);
        }
        return siblings;
    };
    /**
     * sets or gets the element's pixel width
     * @memberof dom
     * @param {string|number=} pixel value to set
     */
    domManip.prototype.Width = function(pixels) {
        var haspixels = def(pixels);
        if (haspixels) this.element.style.width = pixels;
        return haspixels ? this : this.element.getBoundingClientRect().width;
    };
    /**
     * sets or gets the element's pixel height
     * @memberof dom
     * @param {string|number=} pixel value to set
     */
    domManip.prototype.Height = function(pixels) {
        var haspixels = def(pixels);
        if (haspixels) this.element.style.height = pixels;
        return haspixels ? this : this.element.getBoundingClientRect().height;
    };
    /**
     * gets all the element's dimentions (width,height,left,top,bottom,right)
     * @memberof dom
     */
    domManip.prototype.getRect = function() {
        return this.element.getBoundingClientRect();
    };
    /**
     * move the element using either css transforms or plain css possitioning
     * @param {string|num} x - x-axis position in pixels
     * @param {string|num} y - y-axis position in pixels
     * @param {boolean=} transform - should move set the position using css transforms or not
     * @param {string=} position - set the position style of the element absolute/fixed...
     * @param {boolean=} chainable - should this method be chainable defaults to false for performance reasons
     */
    domManip.prototype.move = function(x, y, transform, position, chainable) {
        if (is.Bool(position)) chainable = position;
        if (is.String(transform)) position = transfrom;
        transform === true ? this.element.style.transform = 'translateX(' + x + 'px) translateY(' + y + 'px)' : this.css({
            position: is.String(position) ? position : '',
            left: x + 'px',
            top: y + 'px'
        });
        if (chainable) return this;
    };
    /**
     * performs a query inside the element
     * @memberof dom
     * @param {string} CSS selector
     * @returns {Node|Null}
     */
    domManip.prototype.query = function(selector) {
        return query(selector, this.element);
    };
    /**
     * performs a queryAll inside the element
     * @memberof dom
     * @param {string} CSS selector
     * @returns {NodeList|Null}
     */
    domManip.prototype.queryAll = function(selector) {
        return queryAll(selector, this.element);
    };

    /**
     * Function that returns many useful methods for interacting with and manipulating the DOM or creating elements
     * in the absence of parameters the function will return methods for created elements
     * @name dom
     * @param {Node|NodeList|string=} element - optional Node, NodeList or CSS Selector that will be affected by the methods returned
     * @param {Node|string=} within - optional Node, NodeList or CSS Selector to search in for the element similar to query(element,within)
     */
    root.dom = function(element, within) {
        var elements = QueryOrNodetoNodeArray(element, within);
        return is.NodeList(elements) ? elements.length === 1 ? new domManip(elements[0]) : domNodeList(elements) : Craft.dom;
    };

    CrafterStyles = query('[crafterstyles]', head);

    /**
     * Craft is Crafter.js's Core containing most functionality.
     */
    root.Craft = {
        /** Converts an Array to an Object
         * @param {Array} arr - array to be converted
         */

        ArrtoObj: function ArrtoObj(arr) {
            var i = undefined,
                NewObject = {};
            for (i in arr) {
                if (def(arr[i])) NewObject[i] = arr[i];
            }
            return NewObject;
        },

        toArr: toArr,
        omitFrom: function omitFrom(Arr, val) {
            var index = Arr.indexOf(val),
                temp = [],
                string = false,
                i = 0;
            if (is.String(Arr)) {
                Arr = toArr(Arr);
                string = true;
            }
            if (is.NodeList(Arr)) Arr = toArr(Arr);
            for (; i < Arr.length; i++) {
                if (i !== index) temp.push(Arr[i]);
            }
            return string ? temp.join('') : temp;
        },

        /**
         * Compares two arrays and determines if they are the same array
         * @param {Array} arr1 - array one
         * @param {Array} arr2 - array two
         */
        sameArray: function sameArray(arr1, arr2) {
            var i = arr1.length;
            if (i !== arr2.length) return false;
            while (i--) {
                if (arr1[i] !== arr2[i]) return false;
            }
            return true;
        },
        getDeep: function getDeep(obj, propString) {
            if (!def(propString)) return obj;

            var prop = undefined,
                val = undefined,
                props = propString.split('.'),
                candidate = undefined,
                i = 0,
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
        setDeep: function setDeep(obj, prop, value, returnObj) {
            if (is.String(prop)) prop = prop.split(".");
            if (prop.length > 1) {
                var e = prop.shift();
                Craft.setDeep(obj[e] = is.Object(obj[e]) ? obj[e] : {}, prop, value);
            } else if (!rv(obj[prop[0]]) && def(value)) obj[prop[0]] = value;
            else if (value === undefined) delete obj[prop[0]];
            else obj[prop[0]].set(value);
            if (returnObj === true) return obj;
        },
        forEachDeep: function forEachDeep(object, fn, path) {
            path = path || '';
            var currentPath = path,
                nestable = undefined;
            forEach(object, function(val, key) {
                currentPath = path;
                nestable = false;
                is.Arr(object) ? currentPath += '[' + key + ']' : !currentPath ? currentPath = key : currentPath += '.' + key;
                nestable = fn(val, key, object, currentPath) !== false;
                if (nestable && (is.Arr(val) || is.Object(val))) Craft.forEachDeep(val, fn, currentPath);
            });
        },
        concatObjects: function concatObjects(hostobj) {
            for (var _len2 = arguments.length, Objs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                Objs[_key2 - 1] = arguments[_key2];
            }

            forEach(hostobj, function(o) {
                return Objs.forEach(function(obj) {
                    return forEach(obj, function(prop, key) {
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
        clone: (function(_clone) {
            function clone(_x3) {
                return _clone.apply(this, arguments);
            }

            clone.toString = function() {
                return _clone.toString();
            };

            return clone;
        })(function(obj) {
            if (obj === null || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || 'isActiveClone' in obj) return obj;
            var temp = obj.constructor();
            forEach(obj, function(val, key) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    obj['isActiveClone'] = null;
                    temp[key] = clone(obj[key]);
                    delete obj['isActiveClone'];
                }
            });
            return temp;
        }),
        omit: function omit(obj, val) {
            if (is.Object(obj) && obj !== val) forEach(obj, function(prop, key) {
                if (val === key || val === prop) delete obj[key];
            });
            else if (is.ArrayLike(obj)) obj.forEach(function(i) {
                if (val === i) obj = Craft.omitFrom(obj, i);
            });
            if (is.Object(obj) && obj.hasOwnProperty(val) || obj.includes(val)) throw new Error('couldn\'t omit ' + val + ' from Collection');
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
            div: function div(inner, attr, node) {
                return make_element('div', inner, attr, node);
            },
            /**
             * creates a span element with the options provided
             * @memberof dom
             * @param {string} sets innerHTML of the span
             * @param {string|Object=} sets span attributes with URL variable style string ("id=123&class=big-header") or Object with properties {id : 123 , class : 'big-header'}
             * @param {Boolean=} should the span be a plain String or a Node defaults to string
             */
            span: function span(inner, attr, node) {
                return make_element('span', inner, attr, node);
            },
            /**
             * creates a label element with the options provided
             * @memberof dom
             * @param {string} sets innerHTML of the label
             * @param {string|Object=} sets label attributes with URL variable style string ("id=123&class=big-header") or Object with properties {id : 123 , class : 'big-header'}
             * @param {Boolean=} should the label be a plain String or a Node defaults to string
             */
            label: function label(inner, attr, node) {
                return make_element('label', inner, attr, node);
            },
            /**
             * creates a p (paragraph) element with the options provided
             * @memberof dom
             * @param {string} sets innerHTML of the p
             * @param {string|Object=} sets p attributes with URL variable style string ("id=123&class=big-header") or Object with properties {id : 123 , class : 'big-header'}
             * @param {Boolean=} should the p be a plain String or a Node defaults to string
             */
            p: function p(inner, attr, node) {
                return make_element('p', inner, attr, node);
            },
            /**
             * creates an img element with the options provided
             * @memberof dom
             * @param {string} sets src of the img
             * @param {string} sets alt of the img
             * @param {string|Object=} sets p attributes with URL variable style string ("id=123&class=big-header") or Object with properties {id : 123 , class : 'big-header'}
             * @param {Boolean=} should the p be a plain String or a Node defaults to string
             */
            img: function img(src, alt, attr, node) {
                return make_element('img', '', attr, node, {
                    src: src,
                    alt: alt
                });
            },
            ul: function ul(items, attr, node) {
                var list = '';
                if (is.Arr(items)) items.forEach(function(item) {
                    if (is.String(item)) list += make_element('li', item);
                    else if (is.Object(items)) list += make_element('li', item.inner, item.attr);
                });
                return make_element('ul', list, attr, node);
            },
            ol: function ol(items, attr, node) {
                var list = '';
                if (is.Arr(items)) items.forEach(function(item) {
                    if (is.String(item)) list += make_element('li', item);
                    if (is.Object(items)) list += make_element('li', item.inner, item.attr);
                });
                return make_element('ol', list, attr, node);
            },

            h: function h(level, inner, attr, node) {
                return make_element('h' + level, inner, attr, node);
            },
            a: function a(link, inner, attr, node) {
                return make_element('a', inner, attr, node, {
                    href: link
                });
            },
            script: function script(code, attr, defer) {
                var script = make_element('script', code, attr, true, {
                    type: 'text/javascript'
                });
                script.defer = defer !== false;
                return script;
            },
            table: function table(rows, attr, node) {
                if (!is.Arr(rows)) return is.String(rows) ? make_element('table', rows, attr, node) : make_element('table', '', attr, node);
                if (!rows.every(function(o) {
                        return is.Object(o);
                    })) throw new TypeError('dom.table -> rows : all entries need to be objects');
                var tableInner = '';
                forEach(rows, function(row) {
                    return forEach(row, function(val, key) {
                        var row = '<tr>';
                        if (key === 'cell' || key === 'td' || key === 'data') {
                            if (is.String(val)) row += '<td>' + val + '</td>';
                            if (is.Object(val)) row += make_element('tr', val.inner, val.attr);
                        } else if (key === 'head' || key === 'th') {
                            if (is.String(val)) row += '<th>' + val + '</th>';
                            if (is.Object(val)) row += make_element('th', val.inner, val.attr);
                        }
                        row += '</tr>';
                        tableInner += row;
                    });
                });
                return make_element('table', tableInner, attr, node);
            }
        },
        CurrentBrowser: {
            is: function is(browser) {
                return _br.join(' ').toLowerCase().includes(browser.toLowerCase());
            },
            browser: _br.join(' ')
        },
        loader: {
            pre: 'craft:',
            fetchImport: function fetchImport(obj) {
                obj.key = obj.key || obj.url;
                var now = +new Date(),
                    src = Craft.loader.get(obj.key);
                if (src || src.expire - now > 0) return new Promise(function(resolve) {
                    return resolve(src);
                });
                return new Promise(function(success, failed) {
                    return fetch(obj.url).then(function(res) {
                        return res.text().then(function(data) {
                            obj.data = data;
                            obj.stamp = now;
                            obj.expire = now + (obj.expire || 4000) * 60 * 60 * 1000;
                            if (obj.cache) localStorage.setItem(Craft.loader.pre + obj.key, JSON.stringify(obj));
                            success(obj);
                        });
                    }).catch(function(err) {
                        return failed('problem importing -> ' + err);
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
                for (var _i3 in localStorage) {
                    if (!expired || Craft.loader.get(_i3).expire <= +new Date()) Craft.loader.remove(_i3);
                }
            }
        },
        /**
         * Crafter.js resource loader for Scripts and Style sheets,
         * each import option is an object with properties like 'script/css/wc : "location" ' for resource url
         * other options include 'cache' - determines wether to cache the resource or not , 'test' : usefull for conditional imports if test is false the resource won't load or execute ,
         * 'key' custom name to cache the resource in localStorage with instead of the resource location, 'defer' optionally load the script when the dom is loaded or load when it's ready,
         * {...object} args - Objects containing options for Script/CSS/WebComponent import
         */
        Import: function Import() {
            var promises = [];
            toArr(arguments).forEach(function(arg) {
                return arg.test === false ? Craft.loader.remove(arg.css || arg.script) : promises.push(Craft.loader.fetchImport({
                    url: arg.css || arg.script,
                    type: arg.css ? 'css' : 'script',
                    exec: arg.execute !== false,
                    cache: arg.cache !== false,
                    defer: arg.defer ? 'defer' : null,
                    key: arg.key,
                    expire: arg.expire
                }));
            });
            return Promise.all(promises).then(function(src) {
                return src.map(function(obj) {
                    return obj.exec ? obj.type === 'css' ? CrafterStyles.innerHTML += '\n' + obj.data : head.appendChild(dom().script(obj.data, 'key=' + obj.key, obj.defer)) : undefined;
                });
            });
        },

        router: {
            addHandle: function addHandle(link, func) {
                Craft.router.handlers.push({
                    link: link,
                    func: func
                });
            },
            handle: function handle(route, func) {
                if (is.String(route)) {
                    if (location.href.includes(route)) func(route);
                    Craft.router.addHandle(route, func);
                } else if (is.Arr(route)) route.forEach(function(link) {
                    if (location.href.includes(link)) func(link);
                    Craft.router.addHandle(link, func);
                });
            },

            handlers: [],
            links: [],
            link: function link(Selector, _link, newtab, eventType) {
                return Craft.router.links.push(function() {
                    return On(is.String(eventType) ? eventType : 'click', Selector, function(e) {
                        return newtab ? open(_link) : location = _link;
                    });
                });
            },
            open: (function(_open) {
                function open(_x4, _x5) {
                    return _open.apply(this, arguments);
                }

                open.toString = function() {
                    return _open.toString();
                };

                return open;
            })(function(link, newtab) {
                return newtab ? open(link) : location = link;
            }),
            setTitle: function setTitle(title) {
                return doc.title = title;
            },
            setView: function setView(selector, view, position) {
                var vh = is.String(selector) ? query(selector) : selector;
                vh.insertAdjacentHTML(is.String(position) ? position : 'beforeend', view);
            },
            fetchView: function fetchView(selector, src, cache, position) {
                var vh = is.String(selector) ? query(selector) : selector,
                    prefixedSRC = 'Cr:' + src,
                    view = localStorage.getItem(prefixedSRC);
                if (!is.String(position)) position = 'beforeend';
                if (!nil(vh) && nil(view)) fetch(src).then(function(res) {
                    return res.text().then(function(txt) {
                        if (is.True(cache, nil(view))) localStorage.setItem(prefixedSRC, txt);
                        vh.insertAdjacentHTML(position, txt);
                    });
                }).catch(function(err) {
                    return console.error("Couldn't get view ->" + err);
                });
                else vh.insertAdjacentHTML(position, view);
            },
            clearCache: function clearCache() {
                for (var _i4 in localStorage) {
                    if (localStorage.key(_i4).includes("Cr:")) localStorage.removeItem(localStorage.key(_i4));
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
                var all = doc.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
                all.forEach(function(c) {
                    return decodeURIComponent(c);
                });
                return all;
            }
        },
        curry: function curry(fn) {
            return createFn(fn, [], fn.length);
        },
        delay: function delay(func, ms) {
            return setTimeout(func, ms);
        },
        after: function after(n, func) {
            !is.Func(func) && is.Func(n) ? func = n : console.error("after: no function");
            n = Number.isFinite(n = +n) ? n : 0;
            if (--n < 1) return function() {
                return func.apply(this, arguments);
            };
        },
        debounce: function debounce(wait, func, immediate) {
            var timeout = undefined;
            return function() {
                var _this5 = this,
                    args = arguments,
                    later = function later() {
                        timeout = null;
                        if (!immediate) func.apply(_this5, args);
                    },
                    callNow = immediate && !timeout;

                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(this, args);
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
            return function() {
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
            return function() {
                if (is.Func(func)) {
                    res = func.apply(context || this, arguments);
                    func = null;
                }
                return res;
            };
        },

        css: function css(el, styles) {
            return def(styles, el) && is.Node(el) ? forEach(styles, function(prop, key) {
                return el.style[key] = prop;
            }) : console.error('invalid args');
        },
        hasCapitals: function hasCapitals(string) {
            return toArr(string).some(function(c) {
                return is.Uppercase(c);
            });
        },
        OverrideFunction: function OverrideFunction(funcName, Func, ContextObject) {
            var func = funcName.split(".").pop(),
                ns = funcName.split(".");
            for (var _i5 = 0; _i5 < ns.length; _i5++) {
                ContextObject = ContextObject[ns[_i5]];
            }
            ContextObject[func] = Func;
        },
        len: function len(val) {
            try {
                return is.Object(val) ? Object.keys(val).length : is.Map(val) || is.Set(val) ? val.size : val.length;
            } catch (e) {}
            return -1;
        },
        indexOfDate: function indexOfDate(Collection, date) {
            for (var _i6 = 0; _i6 < Collection.length; _i6++) {
                if (+Collection[_i6] === +date) return _i6;
            }
            return -1;
        },
        type: function type() {
            var types = [];
            toArr(arguments).forEach(function(arg) {
                return types.push(typeof arg === 'undefined' ? 'undefined' : _typeof(arg));
            });
            return types.length < 2 ? types[0] : types;
        },
        memoize: function memoize(func, resolver) {
            if (!is.Func(func) || resolver && !is.Func(resolver)) throw new TypeError("no function");
            var cache = new WeakMap(),
                memoized = function memoized() {
                    var args = arguments,
                        key = resolver ? resolver.apply(this, args) : args[0];
                    if (cache.has(key)) return cache.get(key);
                    var result = func.apply(this, args);
                    memoized.cache = cache.set(key, result);
                    return result;
                };

            return memoized;
        },

        millis: {
            seconds: function seconds(n) {
                return (n || 1) * 1000;
            },
            minutes: function minutes(n) {
                return (n || 1) * 60000;
            },
            hours: function hours(n) {
                return (n || 1) * 60000 * 60;
            },
            days: function days(n) {
                return (n || 1) * 60000 * 60 * 24;
            },
            months: function months(n, daysInMonth) {
                return n * Craft.millis.days(daysInMonth || 30);
            },
            years: function years(n) {
                return n * Craft.millis.days(365);
            }
        },
        Scope: {},
        WebComponents: [],
        tabActive: true,
        make_element: make_element,
        Binds: new Map(),
        mouse: {
            x: 0,
            y: 0,
            over: null,
            observe: new _ReactiveVariable(false, function(o, n) {
                return n ? Craft.mouse.eventhandler.On() : Craft.mouse.eventhandler.Off();
            })
        },
        easing: {
            inOutQuad: function inOutQuad(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }
        },
        JumpTo: function JumpTo(target, options) {
            options = options || {};
            options.duration = options.duration || 400;
            options.offset = options.offset || 0;
            options.func = options.func || undefined;

            var startTime = undefined,
                elapsedTime = undefined,
                start = root.pageYOffset,
                distance = is.String(target) ? options.offset + query(target).getBoundingClientRect().top : target,
                loopIteration = 0,
                loop = function loop(time) {
                    if (loopIteration === 0) startTime = time;
                    loopIteration++;
                    elapsedTime = time - startTime;
                    root.scrollTo(0, Craft.easing.inOutQuad(elapsedTime, start, distance, options.duration));
                    elapsedTime < options.duration ? requestAnimationFrame(function(time) {
                        return loop(time);
                    }) : (function() {
                        root.scrollTo(0, start + distance);
                        if (is.Func(options.func)) options.func.call();
                        startTime = undefined;
                    })();
                };
            requestAnimationFrame(function(time) {
                return loop(time);
            });
        },

        nodeExists: function nodeExists(selector, within) {
            return queryAll(selector, is.Node(within) ? within = within : within = query(within)) !== null;
        },
        ObjToFormData: function ObjToFormData(obj) {
            var key = undefined,
                formData = new FormData();
            for (key in obj) {
                formData.append(key, obj[key]);
            }
            return formData;
        },

        URLfrom: function URLfrom(text) {
            return URL.createObjectURL(new Blob([text]));
        },
        OnScroll: function OnScroll(element, func) {
            return is.Func(func) ? On('scroll', element, function(e) {
                return func(e.deltaY < 1 ? false : true, e);
            }) : console.error('second param needs to be a function');
        },
        OnResize: function OnResize(func) {
            return is.Func(func) ? Craft.ResizeHandlers.add(func) : console.error("Craft.OnResize -> func is not a function");
        },
        OnScrolledTo: function OnScrolledTo(Scroll) {
            return new Promise(function(pass, fail) {
                var evl = On('scroll', function(e) {
                    return pageYOffset >= Scroll ? pass(e, evl) : fail(e, evl);
                });
            });
        },
        WhenScrolledTo: function WhenScrolledTo(Scroll) {
            return new Promise(function(pass, fail) {
                return Once('scroll', function(e) {
                    return pageYOffset >= Scroll || pageYOffset <= Scroll ? pass(e) : fail(e);
                });
            });
        },
        /**
         * function that returns a promise when the DOM and WebComponents are finished loading
         * @param {Object=} Scope - Optional overide to the default Craft.Scope passed to the promise
         */
        WhenReady: function WhenReady(Scope) {
            return new Promise(function(resolve, reject) {
                Scope = Scope || Craft.Scope;
                if (Ready) resolve(Scope);
                else {
                    (function() {
                        var ReadyYet = setInterval(function() {
                            if (Ready) {
                                resolve(Scope);
                                clearInterval(ReadyYet);
                            }
                        }, 25);
                        setTimeout(function() {
                            clearInterval(ReadyYet);
                            if (!Ready) reject("Things didn't load correctly -> load failed");
                        }, 4500);
                    })();
                }
            });
        },
        poll: function poll(test, interval, timeout, success, fail) {
            return (function() {
                if (is.Func(timeout)) {
                    if (is.Func(success)) fail = success;
                    success = timeout;
                    timeout = undefined;
                }
                var Interval = setInterval(function() {
                    if (is.Bool(test) && test === true || is.Func(test) && test() === true) {
                        success();
                        clearInterval(Interval);
                    }
                }, interval || 20);
                if (is.Num(timeout)) setTimeout(function() {
                    clearInterval(Interval);
                    if (is.Bool(test) && test === false || is.Func(test) && test() === false) fail();
                }, timeout);
            })();
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
        strongPassword: function strongPassword(pass, length, caps, number, reasons) {
            if (pass.length <= length - 1) return reasons ? 'Password too short' : false;
            if (caps === true && Craft.hasCapitals(pass) === false) return reasons ? 'Password should contain Capital letters' : false;
            if (number === true && /\d/g.test(pass) === false) return reasons ? 'Password should contain a number' : false;

            for (var _len3 = arguments.length, includeChars = Array(_len3 > 5 ? _len3 - 5 : 0), _key3 = 5; _key3 < _len3; _key3++) {
                includeChars[_key3 - 5] = arguments[_key3];
            }

            if (includeChars.length !== 0) {
                var hasChars = true,
                    reason = includeChars.join();
                includeChars.forEach(function(ch) {
                    if (!pass.includes(ch)) hasChars = false;
                });
                if (!hasChars) return reasons ? '' : false;
            }
            return true;
        },

        /** method for generating random alphanumeric strings*/
        randomString: function randomString() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        },
        /**
         * similar to Craft.randomString in that it generates a unique string , in this case a Unique ID with random alphanumeric strings separated by hyphens
         * example 0ebf-c7d2-ef81-2667-08ef-4cde
         */
        GenUID: function GenUID() {
            return Craft.randomString() + '-' + Craft.randomString() + '-' + Craft.randomString() + '-' + Craft.randomString() + '-' + Craft.randomString() + '-' + Craft.randomString();
        },
        /**
         * Part of Crafter.js's own WebComponent format (.wc) it takes a json object that contains .css and .js values then imports and executes them
         * @param {string} webcomponent - JSON string from Crafter.js's (.wc) WebComponent format
         */
        createWebComponent: function createWebComponent(webcomponent, src) {
            webcomponent = JSON.parse(webcomponent);
            CrafterStyles.innerHTML += webcomponent.css;
            head.appendChild(dom().script(webcomponent.js + ('\nCraft.WebComponents.push(\'' + src + '\')'), 'webcomponent=' + webcomponent.name, true));
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
        newComponent: function newComponent(tag, config) {
            if (!def(config)) throw new Error(tag + ': config undefined');
            var element = Object.create(HTMLElement.prototype),
                settings = {};
            forEach(config, function(prop, key) {
                if (key === 'created') element.createdCallback = prop;
                else if (key === 'inserted') element.attachedCallback = prop;
                else if (key === 'destroyed') element.detachedCallback = prop;
                else if (key === 'attr') element.attributeChangedCallback = prop;
                else if (key === 'extends') settings.extends = prop;
                else element[key] = prop;
            });
            settings['prototype'] = element;
            doc.registerElement(tag, settings);
        },
        applyBinds: function applyBinds(key, bindScope) {
            var bind = undefined,
                val = Craft.getBind(key, bindScope);
            if (!def(val)) val = '';
            is.Object(val) && !rv(val) ? Craft.applyObjectProps(key, val) : queryEach('[' + ib + '="' + key + '"],[' + vb + '="' + key + '"]', function(el) {
                return is.Input(el) ? el.value = val : el.innerHTML = val;
            });
        },
        applyObjectProps: function applyObjectProps(okey, oval) {
            if (!okey.includes('.') && is.Object(oval) && !rv(oval)) Craft.forEachDeep(oval, function(prop, key, obj, path) {
                if (rv(prop)) prop = prop.val;
                var p = okey + '.' + path;
                queryEach('[' + ib + '="' + p + '"],[' + vb + '="' + p + '"]', function(el) {
                    return is.Input(el) ? el.value = prop : el.innerHTML = prop;
                });
            });
        },

        /** creates a new bound variable , part of Crafter.js's Data Binding System */
        newBind: function newBind(key, val, handle, Scope) {
            if (is.Map(handle)) Scope = handle;
            if (!is.Map(Scope)) Scope = Craft.Binds;
            if (is.Func(handle)) val = new _ReactiveVariable(val, handle);
            key.includes('.') ? Craft.setBind(key, val, Scope) : Scope.set(key, val);
            Craft.applyBinds(key, Scope);
        },

        /** sets the value of a bound variable */
        setBind: function setBind(key, val, Scope, parentignore) {
            var bind = undefined;
            if (is.Bool(Scope)) parentignore = Scope;
            if (!is.Map(Scope)) Scope = Craft.Binds;
            if (!key.includes('.')) {
                bind = Scope.get(key);
                rv(bind) ? bind.set(val) : Scope.set(key, val);
            } else {
                var obj = undefined,
                    okey = key.split('.'),
                    oldval = Craft.getBind(key, Scope, true),
                    _bind = Scope.get(okey[0]);
                if (rv(_bind) && !parentignore) _bind.Handle(rv(oldval) ? oldval.val : oldval, val, rv(_bind) ? _bind.val : _bind);
                if (rv(oldval)) {
                    oldval.set(val);
                    val = oldval.val;
                }
                obj = Craft.setDeep(rv(_bind) ? _bind.val : _bind || {}, Craft.omitFrom(okey, okey[0]).join('.'), val, true);
                rv(_bind) ? _bind.set(obj) : Scope.set(okey[0], obj);
            }
            queryEach('[' + ib + '="' + key + '"],[' + vb + '="' + key + '"]', function(el) {
                return is.Input(el) ? el.value = val : el.innerHTML = val;
            });
        },

        /** gets the value of a bound variable */
        getBind: function getBind(key, Scope, returnReactiveVars) {
            if (!is.Map(Scope)) Scope = Craft.Binds;
            if (is.Bool(Scope)) returnReactiveVars = Scope;
            if (!Craft.BindExists(key, Scope)) return undefined;
            if (!key.includes('.')) {
                var bind = Scope.get(key);
                if (returnReactiveVars === true) return bind;
                return rv(bind) ? bind.val : bind;
            } else {
                var okey = key.split('.'),
                    bind = Scope.get(okey[0]),
                    _val = Craft.getDeep(rv(bind) ? bind.val : bind, Craft.omitFrom(okey, okey[0]).join('.'));
                if (returnReactiveVars === true) return _val;
                return rv(_val) ? _val.val : _val;
            }
        },

        /**
         *
         */
        deleteBind: function deleteBind(key, Scope) {
            var bind = undefined,
                val = undefined;
            if (!is.Map(Scope) || Scope === Craft.Binds) Scope = Craft.Binds;
            if (!key.includes('.')) Scope.delete(key);
            else {
                var obj = undefined,
                    okey = key.split('.');
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
        BindExists: function BindExists(key, Scope) {
            if (!is.Map(Scope)) Scope = Craft.Binds;
            if (!key.includes('.')) return Scope.has(key);
            try {
                var okey = key.split('.'),
                    bind = Craft.getBind(okey[0], Scope);
                return def(Craft.getDeep(bind, Craft.omitFrom(okey, okey[0]).join('.')));
            } catch (e) {}
            return false;
        }
    };

    On('animationstart', doc, function(e) {
        if (e.animationName === 'NodeInserted' && is.Node(e.target)) {
            (function() {
                var element = e.target,
                    mnp = dom(element),
                    isInput = is.Input(element);
                if (mnp.hasAttr(ib)) {
                    (function() {
                        var key = mnp.getAttr(ib),
                            OnInput = On(i, element, function(e) {
                                return Craft.setBind(key, mnp.html());
                            }),
                            observer = new MutationObserver(function(mutations) {
                                return mutations.forEach(function(mut) {
                                    if (mut.type === 'attributes') {
                                        if (mut.attributeName === ib && !mnp.hasAttr(ib)) {
                                            OnInput.Off();
                                            observer.disconnect();
                                        }
                                    }
                                });
                            });
                        observer.observe(element, {
                            attributes: true
                        });
                        Craft.BindExists(key) ? mnp.html(Craft.getBind(key)) : Craft.newBind(key, mnp.html());
                    })();
                }
                if (mnp.hasAttr(vb)) {
                    var key = mnp.getAttr(vb);
                    Craft.BindExists(key) ? Craft.applyBinds(key) : Craft.newBind(key, mnp.html());
                }
                if (mnp.hasAttr('link')) On('click', element, function(e) {
                    return mnp.hasAttr('newtab') ? open(mnp.hasAttr('link')) : Craft.router.open(mnp.hasAttr('link'));
                });
            })();
        }
    });

    Craft.curry.to = Craft.curry(function(arity, fn) {
        return createFn(fn, [], arity);
    });
    Craft.curry.adaptTo = Craft.curry(function(num, fn) {
        return Craft.curry.to(num, function(context) {
            for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
                args[_key4 - 1] = arguments[_key4];
            }

            return fn.apply(null, args.slice(1).concat(context));
        });
    });
    Craft.curry.adapt = function(fn) {
        return Craft.curry.adaptTo(fn.length, fn);
    };
    Craft.loader.removeAll(true);
    Craft.mouse.eventhandler = On('mousemove', function(e) {
        if (Craft.mouse.observe.val === true) {
            Craft.mouse.x = e.clientX;
            Craft.mouse.y = e.clientY;
            Craft.mouse.over = e.target;
        }
    });
    On('blur', function(e) {
        return Craft.tabActive = false;
    });
    On('focus', function(e) {
        return Craft.tabActive = true;
    });

    Craft.newComponent('fetch-webcomponent', {
        inserted: function inserted() {
            var _this6 = this,
                src = this.getAttribute('src');

            if (src !== null) {
                var _ret6 = (function() {
                    var wc = null,
                        el = dom(_this6),
                        cc = 'cache-component';
                    if (Craft.WebComponents.includes(src)) return {
                        v: false
                    };
                    if (el.hasAttr(cc)) {
                        wc = localStorage.getItem(src);
                        if (wc !== null) Craft.createWebComponent(wc, src);
                    }
                    if (wc === null) fetch(src).then(function(res) {
                        return res.json().then(function(webcomponent) {
                            CrafterStyles.innerHTML += webcomponent.css;
                            head.appendChild(dom().script(webcomponent.js + ('\nCraft.WebComponents.push(\'' + src + '\')'), 'webcomponent=' + webcomponent.name, true));
                            if (el.getAttr(cc) == 'true') localStorage.setItem(src, JSON.stringify(webcomponent));
                        });
                    }).catch(function(err) {
                        return console.error(err + ': could not load webcomponent');
                    });
                })();

                if ((typeof _ret6 === 'undefined' ? 'undefined' : _typeof(_ret6)) === "object") return _ret6.v;
            }
        }
    });

    Once('DOMContentLoaded', function(e) {
        Craft.router.links.forEach(function(link) {
            return link();
        });
        Craft.WebComponents.length === queryAll('fetch-webcomponent').length ? Ready = true : Craft.poll(function() {
            return Craft.WebComponents.length === queryAll('fetch-webcomponent').length;
        }, 35, 2000, function() {
            return Ready = true;
        }, function() {
            console.warn('loading is taking longer than usual :(');
            Ready = true;
        });
    });

    On('hashchange', function(e) {
        return Craft.router.handlers.forEach(function(handler) {
            return location.hash === handler.link || location === handler.link ? handler.func(location.hash) : null;
        });
    });

    root.CraftSocket = CraftSocket;
    root.EventHandler = EventHandler;
    root.ReactiveVariable = _ReactiveVariable;
})(document, self);
