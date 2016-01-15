'use strict';
/**
 *  @overview Crafter.js , minimalist front-end library
 *  @author Saul van der Walt - https://github.com/SaulDoesCode/
 *  @license MIT
 */
"use strict ";

function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    } else {
        return Array.from(arr);
    }
}

function _typeof(obj) {
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}

(function(doc, root) {

    var RegExps = {
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
        Locs = function Locs() {
            return [location.hash, location.href, location.pathname];
        },
        CrafterStyles = doc.createElement('style'),
        ua = navigator.userAgent,
        tem = undefined,
        _br = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if (_br && (tem = ua.match(/version\/([\.\d]+)/i)) !== null) _br[2] = tem[1];
    _br ? [_br[1], _br[2]] : [navigator.appName, navigator.appVersion, '-?'];

    CrafterStyles.setAttribute('crafterstyles', '');
    head.appendChild(CrafterStyles);

    function toInt(val) {
        var num = Number(val);
        if (isNaN(num)) return 0;
        if (num === 0 || !isFinite(num)) return num;
        return (num > 0 ? 1 : -1) * Math.floor(Math.abs(num));
    }

    function docfragFromString(html) {
        return doc.createRange().createContextualFragment(html);
    }

    function toArr(val) {
        return Array.prototype.slice.call(val);
    }

    function type(obj, str) {
        return toString.call(obj) === str;
    }

    function doInvok(fn, argsArr, totalArity) {
        argsArr = argsArr.length > totalArity ? argsArr.slice(0, totalArity) : argsArr;
        return argsArr.length === totalArity ? fn.apply(null, argsArr) : makeFn(fn, argsArr, totalArity);
    }

    function makeFn(fn, Args, totalArity) {
        var remainingArity = totalArity - Args.length;
        return is.Between(remainingArity, 10, 0) ? function() {
            var args = toArr(arguments);
            return doInvok(fn, Args.concat(args), totalArity);
        } : (function(fn, args, arity) {
            var a = [];
            forEach(arity, function(v, i) {
                return a.push('a' + i.toString());
            });
            return function() {
                for (var _len = arguments.length, a = Array(_len), _key = 0; _key < _len; _key++) {
                    a[_key] = arguments[_key];
                }

                return doInvok(fn, args.concat(a));
            };
        })(fn, args, remainingArity);
    }

    function def() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return args.length && args.every(function(o) {
            return typeof o !== 'undefined';
        });
    }

    function nil() {
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
        }

        return args.length && args.every(function(o) {
            return o === null;
        });
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
        Bool: function Bool() {
            for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                args[_key4] = arguments[_key4];
            }

            return args.length && args.every(function(o) {
                return typeof o === 'boolean';
            });
        },
        /**
         * Test if something is a String
         * @param args - value/values to test
         */
        String: function String() {
            for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                args[_key5] = arguments[_key5];
            }

            return args.length && args.every(function(o) {
                return typeof o === 'string';
            });
        },
        /**
         * Test if something is an Array
         * @param args - value/values to test
         */
        Arr: function Arr() {
            for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                args[_key6] = arguments[_key6];
            }

            return args.length && args.every(Array.isArray);
        },
        /**
         * Array.isArray alias for convenience and performance when only one argument is present
         * @param {*} val - value to test
         */
        Array: Array.isArray,
        /**
         * Test if something is an Array-Like
         * @param args - value/values to test
         */
        Arraylike: function Arraylike() {
            try {
                for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
                    args[_key7] = arguments[_key7];
                }

                return args.length && args.every(function(o) {
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
            for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
                args[_key8] = arguments[_key8];
            }

            return args.length && args.every(function(o) {
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
            for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
                args[_key9] = arguments[_key9];
            }

            return args.length && args.every(function(o) {
                return o instanceof Node;
            });
        }),
        /**
         * Test an element's tagname
         * @param {Node} element - node to test
         * @param {string} tag - tag to test node for
         */
        Tag: function Tag(element, tag) {
            return is.Node(element) ? element.tagName === tag.toUpperCase() : false;
        },
        /**
         * Determine whether a variable is a DOM NodeList or Collection of Nodes
         * @param args - value/values to test
         */
        NodeList: (function(_NodeList) {
            function NodeList() {
                return _NodeList.apply(this, arguments);
            }

            NodeList.toString = function() {
                return _NodeList.toString();
            };

            return NodeList;
        })(function() {
            for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
                args[_key10] = arguments[_key10];
            }

            return args.length && args.every(function(nl) {
                return nl instanceof NodeList || is.Arraylike(nl) ? nl.length && toArr(nl).every(function(n) {
                    return n instanceof Node;
                }) : false;
            });
        }),
        /**
         * Determine if a variable is a Number
         * @param {...*} args - value/values to test
         */
        Num: function Num() {
            for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
                args[_key11] = arguments[_key11];
            }

            return args.length && args.every(function(o) {
                return !isNaN(Number(o));
            });
        },
        /**
         * Determine if a variable is an Object
         * @param args - value/values to test
         */
        Object: function Object() {
            for (var _len12 = arguments.length, args = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
                args[_key12] = arguments[_key12];
            }

            return args.length && args.every(function(o) {
                return toString.call(o) === '[object Object]';
            });
        },
        /**
         * Determine if a sring is JSON
         * @param args - value/values to test
         */
        Json: function Json() {
            for (var _len13 = arguments.length, args = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
                args[_key13] = arguments[_key13];
            }

            return args.length && args.every(function(str) {
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
        Element: function Element() {
            for (var _len14 = arguments.length, args = Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
                args[_key14] = arguments[_key14];
            }

            return args.length && args.every(function(o) {
                return type(o, '[object HTMLElement]');
            });
        },
        /**
         * Determine if a variable is a File Object
         * @param args - value/values to test
         */
        File: function File() {
            for (var _len15 = arguments.length, args = Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
                args[_key15] = arguments[_key15];
            }

            return args.length && args.every(function(o) {
                return type(o, '[object File]');
            });
        },
        /**
         * Determine if a variable is of a FormData type
         * @param args - value/values to test
         */
        FormData: function FormData() {
            for (var _len16 = arguments.length, args = Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
                args[_key16] = arguments[_key16];
            }

            return args.length && args.every(function(o) {
                return type(o, '[object FormData]');
            });
        },
        /**
         * Determine if a variable is a Map
         * @param args - value/values to test
         */
        Map: function Map() {
            for (var _len17 = arguments.length, args = Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {
                args[_key17] = arguments[_key17];
            }

            return args.length && args.every(function(o) {
                return type(o, '[object Map]');
            });
        },
        /**
         * Determine if a variable is a function
         * @param args - value/values to test
         */
        Func: function Func() {
            for (var _len18 = arguments.length, args = Array(_len18), _key18 = 0; _key18 < _len18; _key18++) {
                args[_key18] = arguments[_key18];
            }

            return args.length && args.every(function(o) {
                return typeof o === 'function';
            });
        },
        /**
         * Determine if a variable/s are true
         * @param args - value/values to test
         */
        True: function True() {
            for (var _len19 = arguments.length, args = Array(_len19), _key19 = 0; _key19 < _len19; _key19++) {
                args[_key19] = arguments[_key19];
            }

            return args.length && args.every(function(o) {
                return o === true;
            });
        },
        /**
         * Determine if a variable/s are false
         * @param args - value/values to test
         */
        False: function False() {
            for (var _len20 = arguments.length, args = Array(_len20), _key20 = 0; _key20 < _len20; _key20++) {
                args[_key20] = arguments[_key20];
            }

            return args.length && args.every(function(o) {
                return o !== true;
            });
        },
        /**
         * Determine if a variable is of Blob type
         * @param obj - variable to test
         */
        Blob: function Blob() {
            for (var _len21 = arguments.length, args = Array(_len21), _key21 = 0; _key21 < _len21; _key21++) {
                args[_key21] = arguments[_key21];
            }

            return args.length && args.every(function(o) {
                return type(o, '[object Blob]');
            });
        },
        /**
         * Determine if a variable is a Regular Expression
         * @param obj - variable to test
         */
        RegExp: function RegExp() {
            for (var _len22 = arguments.length, args = Array(_len22), _key22 = 0; _key22 < _len22; _key22++) {
                args[_key22] = arguments[_key22];
            }

            return args.length && args.every(function(o) {
                return type(o, '[object RegExp]');
            });
        },
        /**
         * Determine if a variable is a Date type
         * @param {...*} variable to test
         */
        Date: function Date() {
            for (var _len23 = arguments.length, args = Array(_len23), _key23 = 0; _key23 < _len23; _key23++) {
                args[_key23] = arguments[_key23];
            }

            return args.length && args.every(function(o) {
                return type(o, '[object Date]');
            });
        },
        /**
         * Determine if a variable is a Set
         * @param obj - variable to test
         */
        Set: function Set() {
            for (var _len24 = arguments.length, args = Array(_len24), _key24 = 0; _key24 < _len24; _key24++) {
                args[_key24] = arguments[_key24];
            }

            return args.length && args.every(function(o) {
                return type(o, '[object Set]');
            });
        },
        Args: function Args(val) {
            return !nil(val) && type(val, '[object Arguments]');
        },
        /**
         * Determine if a variable is a Symbol
         * @param obj - variable to test
         */
        Symbol: function Symbol(obj) {
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
            return RegExps.email.test(email);
        },
        /**
         * Determines whether a String is a URL
         * @param {string} url - variable to test
         */
        URL: (function(_URL) {
            function URL(_x) {
                return _URL.apply(this, arguments);
            }

            URL.toString = function() {
                return _URL.toString();
            };

            return URL;
        })(function(url) {
            try {
                new URL(url);
                return true;
            } catch (e) {}
            return false;
        }),

        /**
         * Determines whether a String is a HEX-COLOR (#fff123)
         * @param {string} HexColor - variable to test
         */
        HexColor: function HexColor(hexColor) {
            return RegExps.hexColor.test(hexColor);
        },
        /**
         * Determines whether a String is a ip
         * @param {string} ip - variable to test
         */
        ip: function ip(_ip) {
            return RegExps.ip.test(_ip);
        },
        /**
         * Determines whether a String is a ipv4
         * @param {string} ipv4 - variable to test
         */
        ipv4: function ipv4(_ipv) {
            return RegExps.ipv4.test(_ipv);
        },
        /**
         * Determines whether a String is a ipv6
         * @param {string} ipv6 - variable to test
         */
        ipv6: function ipv6(_ipv2) {
            return RegExps.ipv6.test(_ipv2);
        },
        /**
         * Determines whether a String is hexadecimal
         * @param {string} hexadecimal - variable to test
         */
        hexadecimal: function hexadecimal(_hexadecimal) {
            return RegExps.hexadecimal.test(_hexadecimal);
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
            return RegExps.timeString.test(_time);
        },
        /**
         * Determines whether a String is a dateString
         * @param {string} dateString - variable to test
         */
        dateString: function dateString(_dateString) {
            return RegExps.dateString.test(_dateString);
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
        neither: function neither(value) {
            var args = toArr(arguments).slice(1);
            return args.every(function(val) {
                return value !== val;
            });
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
            return Craft.len(val) === 0 || val === '';
        },

        /**
         * Test if something is a Native JavaScript feature
         * @param val - value to test
         */
        Native: function Native(val) {
            var type = typeof val === 'undefined' ? 'undefined' : _typeof(val);
            return is.Func(val) ? RegExp('^' + String(Object.prototype.toString).replace(/[.*+?^${}()|[\]\/\\]/g, '\\$&').replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$').test(Function.prototype.toString.call(val)) : val && type == 'object' && /^\[object .+?Constructor\]$/.test(val.toString) || false;
        },

        Input: function Input(element) {
            return ['INPUT', 'TEXTAREA'].some(function(i) {
                return element.tagName === i;
            });
        }
    };

    /**
     * Converts any Query/QueryAll to an Array of Nodes even if there is only one Node , this is error proof when no arguments are present it returns an empty array
     * @param {Node|NodeList|Array|String} val - pass either a CSS Selector string , Node/NodeList or Array of Nodes
     * @param {Node|NodeList|Array|String} within - pass either a CSS Selector string , Node/NodeList or Array of Nodes to search for val in
     */
    function NodeOrQuerytoArr(val, within) {
        if (is.String(val) && (is.String(within) || is.Node(within))) val = queryAll(val, within);
        else if (is.String(val)) val = queryAll(val);
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
        this.Target = Target !== root && Target !== doc ? NodeOrQuerytoArr(Target, Within) : [Target];
        this.FuncWrapper = function(e) {
            return func(e, e.srcElement);
        };
        if (EventType.includes(',')) this.EventType = EventType.split(',');
    }
    /**
     * Activates the EventHandler to start listening for the EventType on the Target/Targets
     */
    EventHandler.prototype.On = function() {
        var _this = this;

        is.Arr(this.EventType) ? this.Target.forEach(function(target) {
            return _this.EventType.forEach(function(evt) {
                return target.addEventListener(evt, _this.FuncWrapper);
            });
        }) : this.Target.forEach(function(target) {
            return target.addEventListener(_this.EventType, _this.FuncWrapper);
        });
        return this;
    };
    /**
     * Change the Event type to listen for
     * {string} type - the name of the event/s to listen for
     */
    EventHandler.prototype.ChangeType = function(type) {
        //  have you tried turning it on and off again? - THE IT CROWD
        this.Off();
        this.EventType = type.includes(',') ? type.split(',') : type;
        this.On();
        return this;
    };
    /**
     * De-activates / turns off the EventHandler to stop listening for the EventType on the Target/Targets
     * can still optionally be re-activated with On again
     */
    EventHandler.prototype.Off = function() {
        var _this2 = this;

        is.Arr(this.EventType) ? this.Target.forEach(function(target) {
            return _this2.EventType.forEach(function(evt) {
                return target.removeEventListener(evt, _this2.FuncWrapper);
            });
        }) : this.Target.forEach(function(target) {
            return target.removeEventListener(_this2.EventType, _this2.FuncWrapper);
        });
        return this;
    };
    /**
     * Once the the Event has been triggered the EventHandler will stop listening for the EventType on the Target/Targets
     * the Handler function will be called only Once
     */
    EventHandler.prototype.Once = function() {
        var _this3 = this,
            func = this.FuncWrapper,
            target = this.Target;

        if (is.Arr(this.EventType)) this.EventType.forEach(function(etype) {
            var listenOnce = function listenOnce(e) {
                func(e);
                target.forEach(function(t) {
                    return t.removeEventListener(etype, listenOnce);
                });
            };
            target.forEach(function(t) {
                return t.addEventListener(etype, listenOnce);
            });
        });
        else {
            (function() {
                var listenOnce = function listenOnce(e) {
                    func(e);
                    target.forEach(function(t) {
                        return t.removeEventListener(_this3.EventType, listenOnce);
                    });
                };
                target.forEach(function(t) {
                    return t.addEventListener(_this3.EventType, listenOnce);
                });
            })();
        }
        return this;
    };
    /**
     * Easy way to loop through Collections and Objects
     * @param {Array|Object|NodeList} iterable - any collection that is either an Object or has a .length value
     * @param {function} func - function called on each iteration -> "function( value , indexOrKey ) {...}"
     */
    function forEach(iterable, func) {
        if (!is.empty(iterable) && is.Func(func)) {
            var _i = 0;
            if (is.Arraylike(iterable) && !localStorage) {
                for (; _i < iterable.length; _i++) {
                    func(iterable[_i], _i);
                }
            } else if (is.int(iterable)) {
                iterable = toInt(iterable);
                for (; _i < iterable; iterable--) {
                    func(iterable);
                }
            } else
                for (_i in iterable) {
                    if (iterable.hasOwnProperty(_i)) func(iterable[_i], _i);
                }
        }
    }

    /**
     * Easy way to get a DOM Node or Node within another DOM Node using CSS selectors
     * @param {string} selector - CSS selector to query the DOM Node with
     * @param {Node|string=} element - Optional Node or CSS selector to search within insead of document
     */
    root.query = function(selector, element) {
        if (is.String(element)) element = doc.querySelector(element);
        return is.Node(element) ? element.querySelector(selector) : doc.querySelector(selector);
    };

    /**
     * Easy way to get a DOM NodeList or NodeList within another DOM Node using CSS selectors
     * @param {string} selector - CSS selector to query the DOM Nodes with
     * @param {Node|string=} element - Optional Node or CSS selector to search within insead of document
     */
    root.queryAll = function(selector, element) {
        if (is.String(element)) element = query(element);
        var list = is.Node(element) ? element.querySelectorAll(selector) : doc.querySelectorAll(selector);
        return nil(list) ? list : toArr(list);
    };
    /**
     * Easy way to loop through Nodes in the DOM using a CSS Selector or a NodeList
     * @param {string|NodeList|Node} selector - CSS selector to query the DOM Nodes with or NodeList to iterate through
     * @param {Node|string=} element - Optional Node or CSS selector to search within insead of document
     * @param {function} func - function called on each iteration -> "function( Element , index ) {...}"
     * @param {boolean=} returnList - should queryEach also return the list of nodes
     */
    root.queryEach = function(selector, element, func, returnList) {
        if (is.Func(element)) func = element;
        var list = NodeOrQuerytoArr(selector, element);
        forEach(list, func);
        if (returnList) return list;
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
            },
            Enter: function Enter(fn) {
                return etype('keydown', function(e, srcElement) {
                    if (event.which == 13 || event.keyCode == 13) fn(e, srcElement);
                });
            },
            Escape: function Escape(fn) {
                return etype('keydown', function(e, srcElement) {
                    if (event.which == 27 || event.keyCode == 27) fn(e, srcElement);
                });
            },
            Delete: function Delete(fn) {
                return etype('keydown', function(e, srcElement) {
                    if (event.which == 46 || event.keyCode == 46) fn(e, srcElement);
                });
            },
            Space: function Space(fn) {
                return etype('keydown', function(e, srcElement) {
                    if (event.which == 32 || event.keyCode == 32) fn(e, srcElement);
                });
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
        return is.Func(Target) ? new EventHandler(EventType, root, Target).On() : arguments.length < 3 && !toArr(arguments).some(function(i) {
            return is.Func(i);
        }) ? EventTypes(EventType, Target) : is.Func(element) ? new EventHandler(EventType, Target, element).On() : new EventHandler(EventType, Target, func, element).On();
    };

    /**
     * Starts listening for an EventType on the Target/Targets ONCE after triggering the Once event Listener will stop listening
     * @param {string} EventType - set the type of event to listen for example "click" or "scroll"
     * @param {Node|NodeList|window|document} Target - the Event Listener's target , can be a NodeList to listen on multiple Nodes
     * @param {function} Func - Handler function that will be called when the event is triggered -> "function( event , event.srcElement ) {...}"
     * @returns On,Off,Once - when Once is defined as a variable "var x = Once(...)" it allows you to access all the EventHandler interfaces Off,Once,On
     */
    root.Once = function(EventType, Target, element, func) {
        return is.Func(Target) ? new EventHandler(EventType, root, Target).Once() : arguments.length < 3 && !toArr(arguments).some(function(i) {
            return is.Func(i);
        }) ? EventTypes(EventType, Target, 'Once') : is.Func(element) ? new EventHandler(EventType, Target, element).Once() : new EventHandler(EventType, Target, func, element).Once();
    };

    function craftElement(name, inner, attributes, extraAttr, stringForm) {
        if (is.False(is.String(inner), is.Node(inner), is.Num(inner))) is.Object(inner) ? attributes = inner : inner = is.Func(inner) ? inner() : '';
        var newEl = dom(doc.createElement(name)).html(inner);
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
            On: (function(_On) {
                function On(_x2, _x3) {
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
            includes: function includes(selector) {
                if (is.String(selector)) selector = query(selector);
                return elements.length && toArr(elements).some(function(e) {
                    return elements[i] === selector;
                });
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
            },

            addClass: function addClass(Class) {
                return forEach(elements, function(el) {
                    return el.classList.add(Class);
                });
            },
            stripClass: function stripClass(Class) {
                return forEach(elements, function(el) {
                    return el.classList.remove(Class);
                });
            },
            toggleClass: function toggleClass(Class, state) {
                return forEach(elements, function(el) {
                    return (is.Bool(state) ? state : el.classList.contains(Class)) ? el.classList.remove(Class) : el.classList.add(Class);
                });
            },
            append: function append() {
                forEach(arguments, function(val) {
                    return forEach(elements, function(el) {
                        return el.appendChild((is.Node(val) ? val : docfragFromString(val)).cloneNode(true));
                    });
                });
                return this;
            },
            prepend: function prepend() {
                forEach(arguments, function(val) {
                    return forEach(elements, function(el) {
                        return el.insertBefore((is.Node(val) ? val : docfragFromString(val)).cloneNode(true), el.firstChild);
                    });
                });
                return this;
            }
        };
    }

    function setInner(type, el, args) {
        type = is.Input(el) ? 'value' : type;
        if (is.empty(args)) return el[type];
        if (args.length === 1) {
            args = args[0];
            el[type] = '';
            is.Node(args) ? el.append(args) : el[type] = args;
        } else el[type] = args.map(function(el) {
            return is.Node(el) ? el.outerHTML : el;
        }).join('');
        return el;
    }

    function domManip(element, within) {
        if (is.String(element)) def(within) ? element = query(element, within) : element = query(element);
        element.hasDOMmethods = true;
        /**
         * changes or returns the innerHTML value of a Node
         * @memberof dom
         * @param {string=} sets the innerHTML value or when undefined gets the innerHTML value
         */
        element.html = function() {
            for (var _len25 = arguments.length, args = Array(_len25), _key25 = 0; _key25 < _len25; _key25++) {
                args[_key25] = arguments[_key25];
            }

            return setInner('innerHTML', element, args);
        };

        /**
         * changes or returns the textContent value of a Node
         * @memberof dom
         * @param {string=} sets the textContent value or when undefined gets the textContent value
         */
        element.text = function() {
            for (var _len26 = arguments.length, args = Array(_len26), _key26 = 0; _key26 < _len26; _key26++) {
                args[_key26] = arguments[_key26];
            }

            return setInner('textContent', element, args);
        };
        /**
         * replaces a Node with another node provided as a parameter/argument
         * @memberof dom
         * @param {Node} Node to replace with
         */
        element.replace = function(val) {
            this.parentNode.replaceChild(val, this);
            return this;
        };
        /**
         * append the Element to another node using either a CSS selector or a Node
         * @memberof dom
         * @param {Node|string} CSS selector or Node to append the this.element to
         */
        element.appendTo = function(val, within) {
            if (is.String(val)) val = query(val, within);
            if (is.Node(val)) val.appendChild(this);
            return this;
        };
        /**
         * append text or a Node to the element
         * @memberof dom
         * @param {Node|string} String or Node to append to the this.element
         */
        element.append = function() {
            for (var _len27 = arguments.length, args = Array(_len27), _key27 = 0; _key27 < _len27; _key27++) {
                args[_key27] = arguments[_key27];
            }

            args.forEach(function(val) {
                return element.appendChild(is.Node(val) ? val : docfragFromString(val));
            });
            return this;
        };
        /**
         * prepend text or a Node to the element
         * @memberof dom
         * @param {Node|string} String or Node to prepend to the this.element
         */
        element.prepend = function(val) {
            this.insertBefore(is.Node(val) ? val : docfragFromString(val), this.firstChild);
            return this;
        };
        /**
         * Listen for Events on the element or on all the elements in the NodeList
         * @memberof dom
         * @param {string} string indicating the type of event to listen for
         * @param {function} func - handler function for the event
         * @returns handler (Off,Once,On)
         */
        element.On = function(eventType, func) {
            return On(eventType, element, func);
        };
        /**
         * add CSS style rules to the Element or NodeList
         * @memberof dom
         * @param {object} styles - should contain all the styles you wish to add example { borderWidth : '5px solid red' , float : 'right'}...
         */
        element.css = function(styles) {
            var _this4 = this;

            def(styles) ? forEach(styles, function(prop, key) {
                return _this4.style[key] = prop;
            }) : console.error('Styles Object undefined');
            return this;
        };
        /**
         * check if the element has got a specific CSS class
         * @memberof dom
         * @param {...string} name of the class to check for
         */
        element.gotClass = function() {
            var _this5 = this;

            return toArr(arguments).every(function(Class) {
                return _this5.classList.contains(Class);
            });
        };
        /**
         * Add a CSS class to the element
         * @memberof dom
         * @param {string} name of the class to add
         */
        element.addClass = function(Class) {
            var _this6 = this;

            forEach(arguments, function(Class) {
                return _this6.classList.add(Class);
            });
            return this;
        };
        /**
         * removes a specific CSS class from the element
         * @memberof dom
         * @param {...string} name of the class to strip
         */
        element.stripClass = function() {
            var _this7 = this;

            forEach(arguments, function(Class) {
                return _this7.classList.remove(Class);
            });
            return this;
        };
        /**
         * Toggle a CSS class to the element
         * @memberof dom
         * @param {string} name of the class to add
         * @param {boolean=} state - optionally toggle class either on or off with bool
         */
        element.toggleClass = function(Class, state) {
            if (!is.Bool(state)) state = this.gotClass(Class);
            state ? this.stripClass(Class) : this.addClass(Class);
            return this;
        };
        /**
         * removes a specific Attribute from the this.element
         * @memberof dom
         * @param {...string} name of the Attribute/s to strip
         */
        element.stripAttr = function() {
            var _this8 = this;

            forEach(arguments, function(attr) {
                return _this8.removeAttribute(attr);
            });
            return this;
        };
        /**
         * checks if the element has a specific Attribute or Attributes
         * @memberof dom
         * @param {string|boolean} name of the Attribute or if true checks that it has some (||) of the attributes or if false checks that it has all of the attributes (&&)
         * @param {...string} names of attributes to check for
         */
        element.hasAttr = function(attr) {
            var _this9 = this;

            if (is.String(attr)) return this.hasAttribute(attr);

            for (var _len28 = arguments.length, attributes = Array(_len28 > 1 ? _len28 - 1 : 0), _key28 = 1; _key28 < _len28; _key28++) {
                attributes[_key28 - 1] = arguments[_key28];
            }

            if (attr === false) return attributes.every(function(a) {
                return _this9.hasAttribute(a);
            });
            if (attr === true) return attributes.some(function(a) {
                return _this9.hasAttribute(a);
            });
        };
        /**
         * Toggles an attribute on element , optionally add value when toggle is adding attribute
         * @param {string} name - name of the attribute to toggle
         * @param {string} val - value to set attribute to
         * @param {boolean=} returnState - optionally return a bool witht the toggle state otherwise returns the element
         */
        element.toggleAttr = function(name, val, returnState) {
            if (is.Bool(val)) !val ? this.stripAttr(name) : this.setAttr(name);
            else this.hasAttr(name) ? this.stripAttr(name) : this.setAttr(name, val);
            return returnState ? this.hasAttr(name) : this;
        };
        /**
         * Sets or adds an Attribute on the element
         * @memberof dom
         * @param {string} Name of the Attribute to add/set
         * @param {string} Value of the Attribute to add/set
         */
        element.setAttr = function(attr, val) {
            var _this10 = this;

            if (!def(val)) {
                if (is.Object(attr)) forEach(attr, function(value, Attr) {
                    return _this10.setAttribute(Attr, value);
                });
                else if (is.String(attr)) attr.split('&').forEach(function(Attr) {
                    return def(Attr.split('=')[1]) ? _this10.setAttribute(Attr.split('=')[0], Attr.split('=')[1]) : _this10.setAttribute(Attr.split('=')[0], '');
                });
            } else this.setAttribute(attr, val || '');
            return this;
        };
        /**
         * Gets the value of an attribute , shortened alias for element.getAttribute
         * {string} attr - name of attribute to get
         */
        element.getAttr = function(attr) {
            return element.getAttribute(attr);
        };

        element.hide = function() {
            element.css({
                display: 'none'
            });
        };
        element.show = function() {
            element.css({
                display: ''
            });
        };
        /**
         * Remove the element after a time in milliseconds
         * @param {number=} time - time to wait before self destructing the element
         */
        element.removeAfter = function(time) {
            setTimeout(function() {
                return element.remove();
            }, time || 5000);
            return element;
        };

        /**
         * gets all the elements siblings within it's parentNode
         * @memberof dom
         */
        element.getSiblings = function() {
            return Craft.omit(toArr(element.parentNode.childNodes), element);
        };
        /**
         * gets all the element's dimentions (width,height,left,top,bottom,right)
         * @memberof dom
         */
        element.getRect = function() {
            return element.getBoundingClientRect();
        };
        /**
         * sets or gets the element's pixel width
         * @memberof dom
         * @param {string|number=} pixel value to set
         */
        element.Width = function(pixels) {
            var dp = def(pixels);
            if (dp) this.style.width = pixels;
            return dp ? this : this.getRect().width;
        };
        /**
         * sets or gets the element's pixel height
         * @memberof dom
         * @param {string|number=} pixel value to set
         */
        element.Height = function(pixels) {
            var dp = def(pixels);
            if (dp) this.style.height = pixels;
            return dp ? this : this.getRect().height;
        };
        /**
         * move the element using either css transforms or plain css possitioning
         * @param {string|num} x - x-axis position in pixels
         * @param {string|num} y - y-axis position in pixels
         * @param {boolean=} transform - should move set the position using css transforms or not
         * @param {string=} position - set the position style of the element absolute/fixed...
         * @param {boolean=} chainable - should this method be chainable defaults to false for performance reasons
         */
        element.move = function(x, y, transform, position, chainable) {
            if (is.Bool(position)) chainable = position;
            if (is.String(transform)) position = transfrom;
            if (is.String(position)) this.style.position = position;
            this.css(!!transform ? {
                transform: 'translateX(' + x + 'px) translateY(' + y + 'px)'
            } : {
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
        element.query = function(selector) {
            return query(selector, element);
        };
        /**
         * performs a queryAll inside the element
         * @memberof dom
         * @param {string} CSS selector
         * @returns {NodeList|Null}
         */
        element.queryAll = function(selector) {
            return queryAll(selector, element);
        };

        if (is.Input(element)) {
            element.SyncInput = function(obj, key) {
                return element[sI] = On(element).Input(function(e) {
                    return Craft.setDeep(obj, key, element.html());
                });
            };
            element.disconectInputSync = function() {
                if (def(element[sI])) {
                    element[sI].Off();
                    delete element[sI];
                }
            };
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
    root.dom = function(element, within, one) {
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
    };

    CrafterStyles = query('[crafterstyles]', head);

    /**
     * Craft is Crafter.js's Core containing most functionality.
     */
    root.Craft = {
        /** Converts an Array to an Object
         * @param {Array} arr - array to be converted
         */

        arrDiff: function arrDiff(arr, newArr, func) {
            var added = newArr.filter(function(item) {
                    if (!arr.includes(item)) return item;
                }),
                removed = arr.filter(function(item) {
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
            };
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
        array: function array(len, val) {
            var arr = [];
            forEach(len, function(i) {
                return arr.push(is.Func(val) ? val() : val);
            });
            return arr;
        },
        getDeep: function getDeep(obj, keychain) {
            keychain = keychain.replace(/\[(\w+)\]/g, '.$1');
            keychain = keychain.replace(/^\./, '');
            try {
                for (var _i2 = 0, a = keychain.split('.'); _i2 < a.length; ++_i2) {
                    a[_i2] in obj ? obj = obj[a[_i2]] : obj = undefined;
                }
            } catch (e) {}
            return obj;
        },
        setDeep: function setDeep(obj, path, value, returnObj) {
            path = path.split('.');
            var temp = obj;
            for (var _i3 = 0, n; _i3 < path.length - 1; _i3++) {
                n = path[_i3];
                if (n in temp) temp = temp[n];
                else {
                    temp[n] = {};
                    temp = temp[n];
                }
            }
            temp[path[path.length - 1]] = value;
            if (returnObj === true) return obj;
        },
        forEachDeep: function forEachDeep(object, fn, path) {
            path = path || '';
            var currentPath = path,
                nestable = undefined,
                val = undefined,
                key = undefined;
            for (key in object) {
                if (object.hasOwnProperty(key)) val = object[key];
                currentPath = path;
                nestable = false;
                is.Arr(object) ? currentPath += '[' + key + ']' : !currentPath ? currentPath = key : currentPath += '.' + key;
                nestable = fn(val, key, object, currentPath) !== false;
                if (nestable && (is.Arr(val) || is.Object(val))) Craft.forEachDeep(val, fn, currentPath);
            }
        },
        concatObjects: function concatObjects(hostobj) {
            var _arguments = arguments;

            forEach(hostobj, function(o) {
                return Craft.omitFrom(_arguments, hostobj).forEach(function(obj) {
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

        cloneArr: function cloneArr(arr) {
            return Array.apply(undefined, _toConsumableArray(arr));
        },
        clone: function clone(val) {
            return is.Object(val) ? Object.create(val) : val.slice(0);
        },
        omitFrom: function omitFrom(Arr) {
            for (var _len29 = arguments.length, values = Array(_len29 > 1 ? _len29 - 1 : 0), _key29 = 1; _key29 < _len29; _key29++) {
                values[_key29 - 1] = arguments[_key29];
            }

            var string = is.String(Arr);
            Arr = (is.Arraylike(Arr) ? toArr(Arr) : Arr).filter(function(e) {
                if (!values.some(function(v) {
                        return is.eq(v, e);
                    })) return e;
            });
            return string ? Arr.join('') : Arr;
        },
        omit: function omit(val) {
            var _Craft;

            for (var _len30 = arguments.length, values = Array(_len30 > 1 ? _len30 - 1 : 0), _key30 = 1; _key30 < _len30; _key30++) {
                values[_key30 - 1] = arguments[_key30];
            }

            if (is.Arraylike(val)) val = (_Craft = Craft).omitFrom.apply(_Craft, [val].concat(values));
            if (is.Object(val) && !values.some(function(v) {
                    return v === val;
                })) forEach(val, function(prop, key) {
                if (values.some(function(v) {
                        return is.eq(v, prop) || is.eq(v, key);
                    })) delete val[key];
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
            div: function div(inner, attr) {
                return craftElement('div', inner, attr);
            },
            /**
             * creates a span element with the options provided
             * @memberof dom
             * @param {string} sets innerHTML of the span
             * @param {string|Object=} sets span attributes with URL variable style string ("id=123&class=big-header") or Object with properties {id : 123 , class : 'big-header'}
             */
            span: function span(inner, attr) {
                return craftElement('span', inner, attr);
            },
            /**
             * creates a label element with the options provided
             * @memberof dom
             * @param {string} sets innerHTML of the label
             * @param {string|Object=} sets label attributes with URL variable style string ("id=123&class=big-header") or Object with properties {id : 123 , class : 'big-header'}
             */
            label: function label(inner, attr) {
                return craftElement('label', inner, attr);
            },
            /**
             * creates a p (paragraph) element with the options provided
             * @memberof dom
             * @param {string} sets innerHTML of the p
             * @param {string|Object=} sets p attributes with URL variable style string ("id=123&class=big-header") or Object with properties {id : 123 , class : 'big-header'}
             */
            p: function p(inner, attr) {
                return craftElement('p', inner, attr);
            },
            /**
             * creates an img element with the options provided
             * @memberof dom
             * @param {string} sets src of the img
             * @param {string} sets alt of the img
             * @param {string|Object=} sets p attributes with URL variable style string ("id=123&class=big-header") or Object with properties {id : 123 , class : 'big-header'}
             */
            img: function img(src, alt, attr) {
                return craftElement('img', '', attr, {
                    src: src,
                    alt: alt
                });
            },
            input: function input(type, attributes) {
                if (is.Object(type)) {
                    attributes = type;
                    type = 'text';
                }
                return craftElement('input', '', attributes, {
                    type: type || 'text'
                });
            },

            button: function button(inner, attr) {
                return craftElement('button', inner, attr);
            },
            list: function list(type, items, attr) {
                var list = '';
                if (is.Arrylike(items)) items.forEach(function(item) {
                    if (is.String(item)) list += craftElement('li', item).outerHTML;
                    else if (is.Object(items)) list += craftElement('li', item.inner, item.attr).outerHTML;
                });
                return craftElement(type, list, attr);
            },

            ul: function ul(items, attr) {
                return Craft.dom.list('ul', items, attr);
            },
            ol: function ol(items, attr) {
                return Craft.dom.list('ol', items, attr);
            },
            li: function li(inner, attr) {
                return craftElement('li', inner, attr);
            },
            h: function h(level, inner, attr, node) {
                return craftElement('h' + level, inner, attr);
            },
            a: function a(link, inner, attr, node) {
                return craftElement('a', inner, attr, {
                    href: link
                });
            },
            script: function script(code, attr, defer) {
                var script = craftElement('script', '', attr, {
                    type: 'text/javascript',
                    src: Craft.URLfrom(code)
                });
                script.defer = defer !== false;
                return script;
            },
            table: function table(rows, attr) {
                if (!is.Arr(rows)) return (is.String(rows) ? craftElement('table', rows, attr, node) : craftElement('table', '', attr, node)).outerHTML;
                if (!rows.every(function(o) {
                        return is.Object(o);
                    })) throw new TypeError('dom.table -> rows : needs to be all objects');
                var tableInner = '';
                forEach(rows, function(row) {
                    return forEach(row, function(val, key) {
                        var row = '';
                        if (key === 'cell' || key === 'td' || key === 'data') {
                            if (is.String(val)) row += '<td>' + val + '</td>';
                            if (is.Object(val)) row += craftElement('tr', val.inner, val.attr).outerHTML;
                        } else if (key === 'head' || key === 'th') {
                            if (is.String(val)) row += '<th>' + val + '</th>';
                            if (is.Object(val)) row += craftElement('th', val.inner, val.attr).outerHTML;
                        }
                        row += '';
                        tableInner += craftElement('tr', row).outerHTML;
                    });
                });
                return craftElement('table', tableInner, attr);
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
                        return failed('error importing -> ' + err);
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
                for (var _i4 in localStorage) {
                    if (!expired || Craft.loader.get(_i4).expire <= +new Date()) Craft.loader.remove(_i4);
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
            forEach(arguments, function(arg) {
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
                    if (obj.exec) obj.type === 'css' ? CrafterStyles.innerHTML += '\n' + obj.data : head.appendChild(dom().script('', {
                        src: Craft.URLfrom(obj.data),
                        key: obj.key
                    }, obj.defer));
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
                    if (Locs().some(function(l) {
                            return l === route;
                        })) func(route);
                    Craft.router.addHandle(route, func);
                } else if (is.Arr(route)) route.forEach(function(link) {
                    if (Locs().some(function(l) {
                            return l === link;
                        })) func(link);
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
                newtab ? open(link) : location = link;
            }),

            setTitle: function setTitle(title) {
                return doc.title = title;
            },
            setView: function setView(selector, view, position) {
                dom(selector, true).html(view, position);
            },
            fetchView: function fetchView(selector, src, cache, position) {
                var vh = dom(selector, true),
                    srcpre = 'Cr:' + src,
                    view = localStorage.getItem(srcpre);
                if (!def(vh.element)) return;
                nil(view) ? fetch(src).then(function(res) {
                    return res.text().then(function(txt) {
                        if (is.True(cache, nil(view))) localStorage.setItem(srcpre, txt);
                        vh.html(txt, position);
                    });
                }).catch(function(err) {
                    return console.error("fetchView: " + err);
                }) : vh.html(view, position);
            },
            clearViews: function clearViews() {
                for (var _i5 in localStorage) {
                    localStorage.removeItem(localStorage.key(_i5).includes("Cr:"));
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
        /**
         * Handles WebSockets in a contained manner with send and recieve methods
         * @param {string} address - the WebSocket address example "ws://localhost:3000/" but the ws:// or wss:// is optional
         * @param {Array=} protocols - the protocols to pass to the WebSocket Connection
         */
        Socket: function Socket(address, protocols) {
            if (!address.includes('ws://') || !address.includes('wss://')) address = (location.protocol === 'http:' ? 'ws://' : 'wss://') + address;
            if (is.URL(address)) {
                var _ret2 = (function() {

                    var Options = {
                        socket: null,
                        open: false,
                        recievers: [],
                        message: '',
                        set send(msg) {
                            var _this11 = this;

                            if (this.socket['readyState'] === 1) this.socket.send(is.Object(msg) ? JSON.stringify(msg) : msg);
                            else {
                                (function() {
                                    var poll = setInterval(function() {
                                        if (_this11.socket['readyState'] === 1) {
                                            _this11.socket.send(is.Object(msg) ? JSON.stringify(msg) : msg);
                                            clearInterval(poll);
                                        }
                                    }, 20);
                                    setTimeout(function() {
                                        return clearInterval(poll);
                                    }, 2000);
                                })();
                            }
                        },
                        set recieve(func) {
                            if (is.Func(func)) this.recievers.push(func);
                        },
                        get recieve() {
                            return this.message;
                        },
                        close: function close() {
                            this.socket.close();
                        },
                        reopen: function reopen() {
                            if (this.open === false) this.socket = is.Def(protocols) ? new WebSocket(address) : new WebSocket(address, protocols);
                        }
                    };

                    Options.socket = is.Def(protocols) ? new WebSocket(address) : new WebSocket(address, protocols);
                    Options.socket.onopen = function(e) {
                        return Options.open = true;
                    };
                    Options.socket.onclose = function(e) {
                        return Options.open = false;
                    };

                    Options.socket.onmessage = function(e) {
                        Options.message = e.data;
                        Options.recievers.forEach(function(fn) {
                            return fn(e.data, e);
                        });
                    };

                    return {
                        v: Options
                    };
                })();

                if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
            }
        },
        observable: function observable(obj) {
            Object.defineProperty(obj, 'listeners', {
                value: [],
                enumerable: false
            });
            Object.defineProperty(obj, 'removeListener', {
                value: function value(fn) {
                    return obj.listeners = obj.listeners.filter(function(l) {
                        if (l.fn !== fn) return l;
                    });
                },
                enumerable: false
            });
            Object.defineProperty(obj, 'addListener', {
                value: function value(prop, func) {
                    if (is.Func(prop) || is.Node(prop)) {
                        func = prop;
                        prop = '*';
                    }
                    var listner = {
                        prop: is.String(prop) ? prop : '*'
                    };
                    if (is.Node(func)) {
                        if (!is.Func(func['BindListener'])) throw Error('BindListener is not a function');
                        listner.node = func;
                        listner.fn = func['BindListener'];
                    } else if (is.Func(func)) listner.fn = func;
                    else throw new Error('no function');
                    obj.listeners.push(listner);
                },
                enumerable: false
            });
            try {
                return new Proxy(obj, {
                    get: function get(target, key, reciever) {
                        return Reflect.get(target, key);
                    },
                    set: function set(target, key, value, reciever) {
                        target.listeners.forEach(function(l) {
                            if (l.prop === '*' || l.prop === key) l.fn(target, key, value, !(key in target));
                        });
                        return Reflect.set(target, key, value);
                    }
                });
            } catch (e) {
                try {
                    Object.observe(obj, function(changes) {
                        return changes.forEach(function(change) {
                            if (change.type === 'add' || change.type === 'update') obj.listeners.forEach(function(l) {
                                if (l.prop === '*' || l.prop === change.name) l.fn(obj, change.name, obj[change.name], change.type === 'add');
                            });
                        });
                    });
                    return obj;
                } catch (e2) {
                    console.warn('Your Browser is Old Update it');
                }
            }
        },

        curry: function curry(fn) {
            return makeFn(fn, [], fn.length);
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
                var _this12 = this,
                    _arguments2 = arguments,
                    later = function later() {
                        timeout = null;
                        if (!immediate) func.apply(_this12, _arguments2);
                    },
                    callNow = immediate && !timeout;

                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(this, arguments);
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
                } else if (!timeout && options.trailing === true) timeout = setTimeout(later, remaining);
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
            return def(styles) && is.Node(el) ? forEach(styles, function(prop, key) {
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
            for (var _i6 = 0; _i6 < ns.length; _i6++) {
                ContextObject = ContextObject[ns[_i6]];
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
            for (var _i7 = 0; _i7 < Collection.length; _i7++) {
                if (+Collection[_i7] === +date) return _i7;
            }
            return -1;
        },
        type: function type() {
            var types = [];
            forEach(arguments, function(arg) {
                return types.push(typeof arg === 'undefined' ? 'undefined' : _typeof(arg));
            });
            return types.length < 2 ? types[0] : types;
        },

        toggle: function toggle(bool) {
            return !bool;
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
        WebComponents: [],
        CustomAttributes: [],
        tabActive: true,
        toArr: toArr,
        toInt: toInt,
        RegExps: RegExps,
        mouse: {
            x: 0,
            y: 0,
            over: null,
            track: false,
            observe: function observe(val) {
                if (is.Bool(val)) {
                    Craft.mouse.track = val;
                    Craft.mouse.track ? Craft.mouse.eventhandler.On() : Craft.mouse.eventhandler.Off();
                } else return Craft.mouse.track;
            }
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
                    if (elapsedTime < options.duration) requestAnimationFrame(loop);
                    else {
                        root.scrollTo(0, start + distance);
                        if (is.Func(options.func)) options.func.call();
                        startTime = undefined;
                    }
                };
            requestAnimationFrame(loop);
        },

        /**
         * converts Objects or URL variable strings to a FormData object
         * @param {object|string} val - values to convert
         */
        toFormData: function toFormData(val) {
            var formData = new FormData();
            if (is.String(val)) val = val.split('&');
            forEach(val, function(v) {
                if (is.String(v)) {
                    v = v.split('=');
                    if (v.length === 1) v[1] = '';
                    formData.append(v[0], v[1]);
                } else formData.append(key, v);
            });
            return formData;
        },
        CSSRule: function CSSRule(selector, rules, index, sheet) {
            if (is.Object(rules)) {
                var temp = '';
                forEach(rules, function(val, key) {
                    return temp += key + ': ' + (val.includes(';') ? val : val + ';\n');
                });
                rules = temp;
            }
            console.log(rules);
            if (!sheet) sheet = CrafterStyles.sheet;
            sheet.insertRule(selector + "{" + rules + "}", index);
        },
        revokeCSSRule: function revokeCSSRule(index) {
            if (is.int(index)) CrafterStyles.sheet.deleteRule(index);
        },

        URLfrom: function URLfrom(text) {
            return URL.createObjectURL(new Blob([text]));
        },
        OnScroll: function OnScroll(element, func) {
            return is.Func(func) ? On('scroll', element, function(e) {
                return func(e.deltaY < 1, e);
            }) : console.error('no function');
        },
        OnResize: function OnResize(func) {
            return is.Func(func) ? Craft.ResizeHandlers.add(func) : console.error("Craft.OnResize -> no function");
        },
        OnScrolledTo: function OnScrolledTo(Scroll) {
            return new Promise(function(pass, fail) {
                var ev = On('scroll', function(e) {
                    return pageYOffset >= Scroll ? pass(e, ev) : fail(e, ev);
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
         * returns a promise when the DOM and WebComponents are all finished loading
         * @param {function} func - function to execute when the DOM and webcomponents are ready
         */
        get WhenReady() {
            return new Promise(function(pass, fail) {
                if (Ready) return pass();
                var check = setInterval(function() {
                    if (Ready) {
                        pass();
                        clearInterval(check);
                    }
                }, 30);
                setTimeout(function() {
                    clearInterval(check);
                    if (!Ready) fail('loading took too long loaded with errors :(');
                }, 5500);
            });
        },
        model: function model(name, func) {
            if (is.Func(func) && is.String(name)) {
                if (!def(Craft.Models[name])) Craft.Models[name] = {
                    func: func,
                    scope: Craft.observable({})
                };
            }
        },
        fromModel: function fromModel(key, val) {
            var cutkey = cutdot(key);
            if (def(Craft.Models[cutkey[0]])) {
                var _type = (def(val) ? 'set' : 'get') + 'Deep';
                return cutkey.length === 1 && !def(val) ? Craft.Models[cutkey[0]].scope : Craft[_type](Craft.Models[cutkey[0]].scope, Craft.omit(cutkey, cutkey[0]).join('.'), val);
            }
        },
        customAttribute: function customAttribute(name, handle) {
            if (is.Func(handle)) {
                (function() {
                    var apply = function apply() {
                        queryEach('[' + name + ']', function(el) {
                            el = el.hasDOMmethods ? el : dom(el);
                            if (el.hasAttr(name)) {
                                if (!is.Array(el.customAttr)) el.customAttr = [];
                                if (!el.customAttr.includes(name)) {
                                    el.customAttr.push(name);
                                    handle(el, el.getAttr(name));
                                }
                            }
                        });
                    };

                    Craft.CustomAttributes.push({
                        name: name,
                        handle: handle
                    });

                    Ready ? apply() : Craft.WhenReady.then(function() {
                        return setTimeout(apply, 80);
                    });
                })();
            }
        },

        poll: function poll(test, interval, timeout) {
            return new Promise(function(pass, fail) {
                if (!def(timeout)) interval = timeout;
                var bool = is.Bool(test) && test === true,
                    Interval = setInterval(function() {
                        if (bool || is.Func(test) && test() === true) {
                            pass();
                            clearInterval(Interval);
                        }
                    }, interval || 20);

                if (is.Num(timeout)) setTimeout(function() {
                    if (bool || is.Func(test) && test() === false) fail();
                    clearInterval(Interval);
                }, timeout);
            });
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
            if (caps === true && Craft.hasCapitals(pass) === false) return reasons ? 'Password should have a Capital letter' : false;
            if (number === true && /\d/g.test(pass) === false) return reasons ? 'Password should have a number' : false;

            for (var _len31 = arguments.length, includeChars = Array(_len31 > 5 ? _len31 - 5 : 0), _key31 = 5; _key31 < _len31; _key31++) {
                includeChars[_key31 - 5] = arguments[_key31];
            }

            if (includeChars.length) {
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
         * @param {number=} len - optional length of uid sections
         */
        GenUID: function GenUID(len) {
            return Craft.array(len || 6, Craft.randomString).join('-');
        },
        /**
         * Part of Crafter.js's own WebComponent format (.wc) it takes a json object that contains .css and .js values then imports and executes them
         * @param {string} webcomponent - JSON string from Crafter.js's (.wc) WebComponent format
         */
        createWebComponent: function createWebComponent(wc, src) {
            wc = JSON.parse(wc);
            CrafterStyles.textComponent += wc.css;
            head.appendChild(dom().script(wc.js + ('\nCraft.WebComponents.push(\'' + src + '\')'), w + '=' + wc.name));
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
        newComponent: function newComponent(tag, config) {
            if (!def(config)) throw new Error(tag + ' : config undefined');
            var element = Craft.clone(HTMLElement.prototype),
                settings = {};

            forEach(config, function(prop, key) {
                if (key === 'created') element.createdCallback = prop;
                else if (key === 'inserted') element.attachedCallback = prop;
                else if (key === 'destroyed') element.detachedCallback = prop;
                else if (key === 'attr') element.attributeChangedCallback = prop;
                else key === 'extends' ? settings.extends = prop : Object.defineProperty(element, key, Object.getOwnPropertyDescriptor(config, key));
            });

            settings['prototype'] = element;
            doc.registerElement(tag, settings);
        },
        SyncInput: function SyncInput(input, obj, key) {
            if (is.String(input)) input = query(input);
            if (is.Input(input)) input[sI] = On(input).Input(function(e) {
                return Craft.setDeep(obj, key, input.value);
            });
        },
        disconectInputSync: function disconectInputSync(input) {
            if (is.String(input)) input = query(input);
            if (is.Node(input) && def(input[sI])) {
                input[sI].Off();
                delete input[sI];
            }
        }
    };

    root.CraftScope = Craft.observable({});

    On('blur', function(e) {
        return Craft.tabActive = !1;
    });
    On('focus', function(e) {
        return Craft.tabActive = !0;
    });

    Craft.Models = Craft.observable({});

    Craft.Models.addListener(function(o, key, model, New) {
        if (New) Ready ? model.func(model.scope) : Craft.WhenReady.then(function() {
            return model.func(model.scope);
        });
    });

    Craft.curry.to = Craft.curry(function(arity, fn) {
        return makeFn(fn, [], arity);
    });
    Craft.curry.adaptTo = Craft.curry(function(num, fn) {
        return Craft.curry.to(num, function(context) {
            for (var _len32 = arguments.length, args = Array(_len32 > 1 ? _len32 - 1 : 0), _key32 = 1; _key32 < _len32; _key32++) {
                args[_key32 - 1] = arguments[_key32];
            }

            return fn.apply(null, args.slice(1).concat(context));
        });
    });
    Craft.curry.adapt = function(fn) {
        return Craft.curry.adaptTo(fn.length, fn);
    };
    Craft.loader.removeAll(true);
    Craft.mouse.eventhandler = On('mousemove', function(e) {
        if (Craft.mouse.track === true) {
            Craft.mouse.x = e.clientX;
            Craft.mouse.y = e.clientY;
            Craft.mouse.over = e.target;
        }
    });

    Craft.newComponent(fw, {
        inserted: function inserted() {
            var _this13 = this,
                src = this.getAttribute('src');

            if (!nil(src)) {
                (function() {
                    var wc = null,
                        el = dom(_this13),
                        cc = 'cache-component';
                    if (!Craft.WebComponents.includes(src)) {
                        if (el.hasAttr(cc)) {
                            wc = localStorage.getItem(src);
                            if (!nil(wc)) Craft.createWebComponent(wc, src);
                        }
                        if (nil(wc)) fetch(src).then(function(res) {
                            return res.json().then(function(webcomponent) {
                                CrafterStyles.innerHTML += webcomponent.css;
                                head.appendChild(dom().script(webcomponent.js + ('\nCraft.WebComponents.push(\'' + src + '\')'), 'webcomponent=' + webcomponent.name));
                                if (el.getAttr(cc) == 'true') localStorage.setItem(src, JSON.stringify(webcomponent));
                            });
                        }).catch(function(err) {
                            return console.error(err + " couldn't load " + w);
                        });
                    }
                    el.removeAfter(3500);
                })();
            }
        }
    });

    Craft.customAttribute('link', function(el, link) {
        return On(el).Click(function(e) {
            return (el.hasAttr('newtab') ? open : Craft.router.open)(link);
        });
    });

    Craft.customAttribute('bind', function(el, bind) {
        try {
            var cutbind = cutdot(bind),
                prop = cutbind[cutbind.length - 1],
                obj = def(Craft.Models[cutbind[0]]) ? Craft.Models[cutbind[0]].scope : Craft.getDeep(root, Craft.omitFrom(cutbind, prop).join('.')) || CraftScope,
                val = Craft.getDeep(obj, cutbind.length > 1 ? Craft.omit(cutbind, cutbind[0]).join('.') : prop);

            def(val) ? el.html(val) : Craft.setDeep(obj, prop, el.html());

            if (def(Object.getOwnPropertyDescriptor(obj, 'addListener')) && !is.Func(el['BindListener'])) {
                el.BindListener = function(o, n, v) {
                    return el.html(v);
                };
                obj.addListener(prop, el);
            }
            if (is.Input(el)) el.SyncInput(obj, Craft.omitFrom(cutbind, cutbind[0]).join('.'));
        } catch (e) {
            console.log(e);
            console.warn("couldn't bind :", el);
        }
    });

    function manageAttr(el) {
        el = el.hasDOMmethods ? el : dom(el);
        for (var _i8 = 0, attr; _i8 < Craft.CustomAttributes.length; _i8++) {
            attr = Craft.CustomAttributes[_i8];
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

    function attrCheck() {
        Craft.CustomAttributes.forEach(function(attr) {
            queryAll('[' + attr.name + ']').forEach(function(el) {
                el = el.hasDOMmethods ? el : dom(el);
                if (el.hasAttr(attr.name)) {
                    if (!is.Array(el.customAttr)) el.customAttr = [];
                    if (!el.customAttr.includes(attr.name)) {
                        el.customAttr.push(attr.name);
                        attr.handle(el, el.getAttr(attr.name));
                    }
                }
            });
        });
    }

    function handleHash() {
        Craft.router.handlers.forEach(function(handle) {
            if (Locs().some(function(l) {
                    return l === handle.link;
                })) handle.func(location.hash);
        });
    }

    Once('DOMContentLoaded', function() {
        Craft.router.links.forEach(function(link) {
            return link();
        });
        Craft.WebComponents.length === queryAll(fw).length ? Ready = true : Craft.poll(function() {
            return Craft.WebComponents.length === queryAll(fw).length;
        }, 35, 5035).then(function() {
            Ready = true;
            Craft.DomObserver = new MutationObserver(function(muts) {
                return muts.forEach(function(mut, i) {
                    forEach(mut.addedNodes, function(el) {
                        if (el['hasAttribute']) manageAttr(el);
                    });
                    manageAttr(mut.target);
                });
            });
            Craft.DomObserver.observe(doc.body, {
                attributes: true,
                childList: true,
                subtree: true
            });
        }).catch(function() {
            Ready = true;
            console.warn('loading took too long loaded with errors :(');
        });
    });

    On('hashchange', handleHash);

    root.forEach = forEach;
})(document, self);
