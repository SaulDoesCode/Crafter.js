/**
 *  @overview Crafter.js , minimalist front-end library
 *  @author Saul van der Walt - https://github.com/SaulDoesCode/
 *  @license MIT
 */
"use strict";function _classCallCheck(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function _typeof(n){return n&&"undefined"!=typeof Symbol&&n.constructor===Symbol?"symbol":typeof n}var _createClass=function(){function n(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}}();!function(n,e){/**
   * Converts any Query/QueryAll to an Array of Nodes even if there is only one Node
   * @param {Node|NodeList|Array|String} val - pass either a CSS Selector string , Node/NodeList or Array of Nodes
   */
function t(n){return A.String(n)&&(n=u(n)),A.Node(n)?[n]:A.NodeList(n)?Array.from(n):void 0}/**
   * Easy way to loop through Collections and Objects
   * @param {Array|Object|NodeList} iterable - any collection that is either an Object or has a .length value
   * @param {function} func - function called on each iteration -> "function( value , indexOrKey ) {...}"
   */
function r(n,e){if(A.Undef(n))throw new Error("forEach -> cannot iterate through undefined");if(!A.Func(e))throw new Error("forEach -> invalid or undefined function provided");var t=0;if(A.Def(n.length))for(;t<n.length;t++)e(n[t],t);else for(t in n)n.hasOwnProperty(t)&&e(n[t],t)}/**
   * Easy way to get a DOM Node or Node within another DOM Node using CSS selectors
   * @param {string} selector - CSS selector to query the DOM Node with
   * @param {Node|string=} element - Optional Node or CSS selector to search within insead of document
   */
function o(e,t){return A.String(t)?n.querySelector(t).querySelector(e):A.Node(t)?t.querySelector(e):n.querySelector(e)}/**
   * Easy way to get a DOM NodeList or NodeList within another DOM Node using CSS selectors
   * @param {string} selector - CSS selector to query the DOM Nodes with
   * @param {Node|string=} element - Optional Node or CSS selector to search within insead of document
   */
function u(e,t){return A.String(t)?n.querySelector(t).querySelectorAll(e):A.Node(t)?t.querySelectorAll(e):n.querySelectorAll(e)}/**
   * Easy way to loop through Nodes in the DOM using a CSS Selector or a NodeList
   * @param {string|NodeList} selector - CSS selector to query the DOM Nodes with or NodeList to iterate through
   * @param {Node|string=} element - Optional Node or CSS selector to search within insead of document
   * @param {function} func - function called on each iteration -> "function( Element , index ) {...}"
   */
function a(e,t,r){A.Func(t)&&(r=t,t=n);var o=void 0,i=0;for(A.String(t,e)&&(o=n.querySelector(t).querySelectorAll(e)),A.String(e)&&(o=t.querySelectorAll(e)),(A.NodeList(e)||A.Element(e))&&(o=[e]);i<o.length;i++)r(o[i],i)}/**
   * Starts listening for an EventType on the Target/Targets
   * @param {string} EventType - set the type of event to listen for example "click" or "scroll"
   * @param {Node|NodeList|window|document} Target - the Event Listener's target , can be a NodeList to listen on multiple Nodes
   * @param {function} Func - Handler function that will be called when the event is triggered -> "function( event , event.srcElement ) {...}"
   * @returns Off - when On is defined as a variable "var x = On(...)" it allows you to access all the EventHandler interfaces Off,Once,On
   */
function c(n,t,r){A.Func(t)&&(r=t,t=e);var o=new O(n,t,r);return o.On(),o}/**
   * Starts listening for an EventType on the Target/Targets ONCE after triggering the Once event Listener will stop listening
   * @param {string} EventType - set the type of event to listen for example "click" or "scroll"
   * @param {Node|NodeList|window|document} Target - the Event Listener's target , can be a NodeList to listen on multiple Nodes
   * @param {function} Func - Handler function that will be called when the event is triggered -> "function( event , event.srcElement ) {...}"
   * @returns On,Off,Once - when Once is defined as a variable "var x = Once(...)" it allows you to access all the EventHandler interfaces Off,Once,On
   */
function s(n,t,r){A.Func(t)&&(r=t,t=e);var o=new O(n,t,r);return o.Once(),o}function l(e,t,o,i,u){if(A.Bool(o)&&(i=o,o=void 0),A.Bool(t)&&(i=t,o=void 0),i===!0){var a=function(){var i=n.createElement(e);return i.innerHTML=t,A.Object(o)&&r(o,function(n,e){return i.setAttribute(e,n)}),A.String(o)&&o.split("&").forEach(function(n){return A.Def(n.split("=")[1])?i.setAttribute(n.split("=")[0],n.split("=")[1]):i.setAttribute(n.split("=")[0],"")}),A.Def(u)&&A.Object(u)&&r(u,function(n,e){return i.setAttribute(e,n)}),{v:i}}();if("object"===("undefined"==typeof a?"undefined":_typeof(a)))return a.v}var c="";return A.String(o)&&o.split("&").forEach(function(n){return c+=A.Def(n.split("=")[1])?n.split("=")[0]+'="'+n.split("=")[1]+'" ':n.split("=")[0]+" "}),A.Object(o)&&r(o,function(n,e){return c+=" "+e+'="'+n+'" '}),A.Def(u)&&A.Object(u)&&r(u,function(n,e){return c+=" "+e+'="'+n+'" '}),"<"+e+" "+c+">"+t+"</"+e+">"}var f=function(n,e){return toString.call(n)===e},h=function(n,e){return("undefined"==typeof n?"undefined":_typeof(n))===e},g=function(n,e){return!h(n,e)},d=function(n,e){if(h(e,"string")||void 0===e||null===e)return!1;for(var t=0,r=!0;t<e.length;t++)if(e[t]instanceof n){r=!1;break}return r},p=!1,v=n.getElementsByTagName("head")[0],m=n.createElement("style"),y=navigator.userAgent,b=void 0,S=y.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);S&&null!==(b=y.match(/version\/([\.\d]+)/i))&&(S[2]=b[1]),S?[S[1],S[2]]:[navigator.appName,navigator.appVersion,"-?"],m.setAttribute("crafterstyles",""),m.innerHTML="\n@keyframes NodeInserted {from {opacity:.99;}to {opacity: 1;}} [view-bind] {animation-duration: 0.001s;animation-name: NodeInserted;}",v.appendChild(m),m=n.querySelector("[crafterstyles]",v);/** is - Type Testing / Assertion */
var A={/**
     * Test if something is a boolean type
     * @param val - value to test
     */
Bool:function(n){return"boolean"==typeof n},/**
     * Test if something is a String
     * @param args - value/values to test
     */
String:function(){for(var n=arguments.length,e=Array(n),t=0;n>t;t++)e[t]=arguments[t];return e.length&&e.every(function(n){return h(n,"string")})},/**
     * Test if something is a Number
     * @param args - value/values to test
     */
Num:function(){for(var n=arguments.length,e=Array(n),t=0;n>t;t++)e[t]=arguments[t];return e.length&&e.every(function(n){return h(n,"number")})},/**
     * Test if something is an Array
     * @param args - value/values to test
     */
Arr:function(){for(var n=arguments.length,e=Array(n),t=0;n>t;t++)e[t]=arguments[t];return e.length&&e.every(function(n){return Array.isArray(n)})},/**
     * Test if something is an Array-Like
     * @param args - value/values to test
     */
Arraylike:function(){for(var n=arguments.length,e=Array(n),t=0;n>t;t++)e[t]=arguments[t];return e.length&&e.every(function(n){return A.Def(n.length)?!0:!1})},/**
     * Determine whether a variable is undefined
     * @param args - value/values to test
     */
Undef:function(){for(var n=arguments.length,e=Array(n),t=0;n>t;t++)e[t]=arguments[t];return e.length&&e.every(function(n){return h(n,"undefined")})},/**
     * Determine whether a variable is in fact defined
     * @param args - value/values to test
     */
Def:function(){for(var n=arguments.length,e=Array(n),t=0;n>t;t++)e[t]=arguments[t];return e.length&&e.every(function(n){return g(n,"undefined")})},/**
     * Determine whether a variable is null
     * @param args - value/values to test
     */
Null:function(){for(var n=arguments.length,e=Array(n),t=0;n>t;t++)e[t]=arguments[t];return e.length&&e.every(function(n){return null===n})},/**
     * Determine whether a variable is a DOM Node
     * @param args - value/values to test
     */
Node:function(n){function e(){return n.apply(this,arguments)}return e.toString=function(){return n.toString()},e}(function(){for(var n=arguments.length,e=Array(n),t=0;n>t;t++)e[t]=arguments[t];return e.length&&e.every(function(n){return n instanceof Node})}),/**
     * Determine whether a variable is a DOM NodeList or Collection of Nodes
     * @param args - value/values to test
     */
NodeList:function(n){function e(){return n.apply(this,arguments)}return e.toString=function(){return n.toString()},e}(function(){for(var n=arguments.length,e=Array(n),t=0;n>t;t++)e[t]=arguments[t];return e.length?e.every(function(n){return null===n?!1:n instanceof NodeList||d(Node,n)}):!1}),/**
     * Determine if a variable is an Object
     * @param args - value/values to test
     */
Object:function(){for(var n=arguments.length,e=Array(n),t=0;n>t;t++)e[t]=arguments[t];return e.length&&e.every(function(n){return f(n,"[object Object]")})},/**
     * Determine if a variable is a HTMLElement
     * @param args - value/values to test
     */
Element:function(){for(var n=arguments.length,e=Array(n),t=0;n>t;t++)e[t]=arguments[t];return e.length&&e.every(function(n){return f(n,"[object HTMLElement]")})},/**
     * Determine if a variable is a File Object
     * @param args - value/values to test
     */
File:function(){for(var n=arguments.length,e=Array(n),t=0;n>t;t++)e[t]=arguments[t];return e.length&&e.every(function(n){return f(n,"[object File]")})},/**
     * Determine if a variable is of a FormData type
     * @param args - value/values to test
     */
FormData:function(){for(var n=arguments.length,e=Array(n),t=0;n>t;t++)e[t]=arguments[t];return e.length&&e.every(function(n){return f(n,"[object FormData]")})},/**
     * Determine if a variable is a Map
     * @param args - value/values to test
     */
Map:function(){for(var n=arguments.length,e=Array(n),t=0;n>t;t++)e[t]=arguments[t];return e.length&&e.every(function(n){return f(n,"[object Map]")})},/**
     * Determine if a variable is a function
     * @param args - value/values to test
     */
Func:function(){for(var n=arguments.length,e=Array(n),t=0;n>t;t++)e[t]=arguments[t];return e.length&&e.every(function(n){return"function"==typeof n})},/**
     * Determine if a variable is of Blob type
     * @param obj - variable to test
     */
Blob:function(n){return f(n,"[object Blob]")},/**
     * Determine if a variable is a Regular Expression
     * @param obj - variable to test
     */
RegExp:function(n){return f(n,"[object RegExp]")},/**
     * Determine if a variable is a Date type
     * @param obj - variable to test
     */
Date:function(n){return f(n,"[object Date]")},/**
     * Determine if a variable is a Set
     * @param obj - variable to test
     */
Set:function(n){return f(n,"[object Set]")},/**
     * Determine if a variable is a Symbol
     * @param obj - variable to test
     */
Symbol:function(n){return f(n,"[object Symbol]")},/**
     * Determine if a String (Single Character) is UPPERCASE
     * @param {string} char - variable to test
     */
UpperCase:function(n){return n>="A"&&"Z">=n},/**
     * Determine if a String contains only characters and numbers (alphanumeric)
     * @param {string} str - variable to test
     */
Alphanumeric:function(n){return/^[0-9a-zA-Z]+$/.test(n)},/**
     * Determines whether a String is a valid Email
     * @param {string} email - variable to test
     */
Email:function(n){return/(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/.test(n)},/**
     * Determines whether a Number is between a maximum and a minimum
     * @param {Number} val - number value to test
     * @param {Number} max - maximum to compare the value with
     * @param {Number} min - minimum to compare the value with
     * @returns {Boolean} wether or not the value is between the max and min
     */
Between:function(n,e,t){return e>=n&&n>=t},/**
     * Determines if two variables are equal
     * @param a - first value to compare
     * @param b - second value to compare
     */
eq:function(n,e){return n===e},/**
     * Determines if a number is LOWER than another
     * @param {Number} val - value to test
     * @param {Number} other - num to test with value
     */
lt:function(n,e){return e>n},/**
     * Determines if a number is LOWER than or equal to another
     * @param {Number} val - value to test
     * @param {Number} other - num to test with value
     */
lte:function(n,e){return e>=n},/**
     * Determines if a number is BIGGER than another
     * @param {Number} val - value to test
     * @param {Number} other - num to test with value
     */
bt:function(n,e){return n>e},/**
     * Determines if a number is BIGGER than or equal to another
     * @param {Number} val - value to test
     * @param {Number} other - num to test with value
     */
bte:function(n,e){return n>=e},/**
     * Determines if a value is an instance of the ReactiveVariable class
     * @param args - value/values to test
     */
ReactiveVariable:function(){for(var n=arguments.length,e=Array(n),t=0;n>t;t++)e[t]=arguments[t];return e.length&&e.every(function(n){return n instanceof k?!0:!1})},/**
     * Test if something is a Native JavaScript feature
     * @param val - value to test
     */
Native:function(n){var e="undefined"==typeof n?"undefined":_typeof(n);return"function"===e?RegExp("^"+String(Object.prototype.toString).replace(/[.*+?^${}()|[\]\/\\]/g,"\\$&").replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$").test(Function.prototype.toString.call(n)):n&&"object"==e&&/^\[object .+?Constructor\]$/.test(n.toString)||!1}},C=function(){function n(){_classCallCheck(this,n),this.functions={},this.length=Object.keys(this.functions).length}/**
     * Check if the FunctionIterator Collection contains a certain function
     * @param {string} funcName - name to identify the function with
     */
return _createClass(n,[{key:"has",value:function(n){return this.functions.has(n)?!0:!1}},{key:"add",value:function(n,e){A.Func(e)?this.functions[n]=e:A.Func(n)?this.functions[T.randomString()]=n:console.error("Invalid function parameter in FunctionIterator.add(funcName , _function_ )"),this.length=Object.keys(this.functions).length}},{key:"remove",value:function(n){this.functions.has(n)?(this.functions[n]=null,delete this.functions[n]):console.warn("No Such Function Entry in FunctionIterator"),this.length=Object.keys(this.functions).length}},{key:"removeAll",value:function(){delete this.functions,this.functions=null,this.functions={},this.length=Object.keys(this.functions).length}},{key:"runEach",value:function(){for(var n in this.functions)this.functions[n].apply(this,arguments)}},{key:"runOne",value:function(n){this.functions.hasOwnProperty(n)?this.functions[n].apply(this,args):console.warn("No Such Function Entry in FunctionIterator")}}]),n}(),w=function(){/**
     * Creates a new WebSocket connection
     * @param {string} wsAddress - the WebSocket address example "ws://localhost:3000/"
     * @param {Array=} protocols - the protocols to pass to the WebSocket Connection
     */
function n(e,t){var r=this;_classCallCheck(this,n),A.Arr(t)?this.Socket=new WebSocket(e,t):this.Socket=new WebSocket(e),this.messageCalls=[],this.RecieveCalls=[],this.Socket.onmessage=function(n){return r.RecieveCalls.forEach(function(e){return e(n)})}}/**
     * Sends a message along the WebSocket Connection
     * @param {string} message - the WebSocket address example "ws://localhost:3000/"
     * @param {function=} func - optional function to recieve the response with -> "function ( response , event ) { ... } or response => ..."
     */
return _createClass(n,[{key:"send",value:function(n,e){var t=this;this.messageCalls.push(function(){t.Socket.send(n),A.Def(e)&&A.Func(e)&&t.recieve(function(n,t){return e(n,t)})}),this.Socket.onopen=function(n){return t.messageCalls[t.messageCalls.length-1]()}}},{key:"recieve",value:function(n){A.Func(n)?this.RecieveCalls.push(function(e){return n(e.data,e)}):console.error("callback is not a function or is not defined")}},{key:"close",value:function(){this.Socket.close()}}]),n}(),k=function(){/**
     * Creates a ReactiveVariable
     * @param {*} val - value you'd liek the ReactiveVariable to Store
     * @param {function} handle - function that gets called whenever the ReactiveVariable changes -> "function( OldValue , newValue ) {...}"
     * @returns {*} Returns the value assigned to the ReactiveVariable
     */
function n(e,t){return _classCallCheck(this,n),A.Func(t)?(this.val=e,this.Handle=t):console.error("ReactiveVariable needs a handler function after the value"),this.val}/**
     * Sets the new value of the ReactiveVariable , this will also call the handle function
     * @param {*} val - new value to assign the ReactiveVariable
     */
return _createClass(n,[{key:"set",value:function(n){return this.val!==n&&(this.Oldval=this.val,this.val=n,this.Handle(this.Oldval,n)),this.val}},{key:"get",value:function(){return this.val}},{key:"reset",value:function(n){A.Func(n)?this.Handle=n:console.error("ReactiveVariable.Reset only takes a function")}}]),n}(),O=function(){function n(e,r,o){for(var i=arguments.length,u=Array(i>3?i-3:0),a=3;i>a;a++)u[a-3]=arguments[a];_classCallCheck(this,n),this.EventType=e,this.Target=r!==window&&r!==document?t(r):r,this.FuncWrapper=function(n){return o(n,n.srcElement,u||[])}}/**
     * Activates the EventHandler to start listening for the EventType on the Target/Targets
     */
return _createClass(n,[{key:"On",value:function(){var n=this;A.Arr(this.Target)?this.Target.forEach(function(e){return e.addEventListener(n.EventType,n.FuncWrapper)}):this.Target.addEventListener(this.EventType,this.FuncWrapper)}},{key:"Off",value:function(){var n=this;A.Arr(this.Target)?this.Target.forEach(function(e){return e.removeEventListener(n.EventType,n.FuncWrapper)}):this.Target.removeEventListener(this.EventType,this.FuncWrapper)}},{key:"Once",value:function(){var n=this.FuncWrapper,e=this.Target,t=this.EventType,r=function o(r){n(r),A.Arr(e)?e.forEach(function(n){return n.removeEventListener(t,o)}):e.removeEventListener(t,o)};A.Arr(e)?e.forEach(function(n){return n.addEventListener(t,r)}):e.addEventListener(t,r)}}]),n}(),E=function(n){if(A.String(n)){var e=u(n);n=e.length>1?e:e[0]}return A.Node(n)?{html:function(e){return e?n.innerHTML=e:n.innerHTML},text:function(e){return e?n.textContent=e:n.textContent},replace:function(e){return n.parentNode.replaceChild(el,n)},remove:function(){return n.parentNode.removeChild(n)},appendTo:function(e){var t=void 0;t=A.Node(e)?e:o(e),null!==t&&t.appendChild(n)},append:function(e){return A.String(e)?n.innerHTML+=e:n.parentNode.appendChild(n)},prepend:function(e){return A.String(e)?n.innerHTML=e+n.innerHTML:n.insertBefore(e,n.firstChild)},On:function(e,t){return c(e,n,t)},css:function(e){return A.Def(e)?r(e,function(e,t){return n.style[t]=e}):console.error("Styles Object undefined")},gotClass:function(e){return n.classList.contains(e)},addClass:function(e){return n.classList.add(e)},stripClass:function(e){return n.classList.remove(e)},stripAttr:function(e){return n.removeAttribute(e)},hasAttr:function(e){return n.hasAttribute(e)},setAttr:function(e,t){return n.setAttribute(e,t)},getAttr:function(e){return n.getAttribute(e)},getSiblings:function(){for(var e=[],t=n.parentNode.childNodes,r=0;r<t.length;r++)t[r]!==n&&e.push(t[r]);return e},Width:function(){return n.getBoundingClientRect().width},Height:function(){return n.getBoundingClientRect().height},getRect:function(){return n.getBoundingClientRect()},setWidth:function(e){return n.style.width=e},setHeight:function(e){return n.style.height=e},find:function(e,t){var r=u(e,n);return r.length>1||t===!0&&!A.Null(r)?r:A.Null(r)?null:r[0]}}:A.NodeList(n)?{On:function(e,t){return c(e,n,t)},find:function(e,t){var r=u(e,n);return r.length>1||t===!0&&!A.Null(r)?r:A.Null(r)?null:r[0]},includes:function(e){A.Node(e)||(e=o(e));for(var t=0;t<n.length;t++)if(n[t]===e)return!0;return!1},css:function(e){return A.Def(e)?r(n,function(n){return r(e,function(e,t){return n.style[t]=e})}):console.error("styles unefined")}}:{div:function(n,e,t){return l("div",n,e,t)},span:function(n,e,t){return l("span",n,e,t)},label:function(n,e,t){return l("label",n,e,t)},p:function(n,e,t){return l("p",n,e,t)},img:function(n,e,t,r,o){return l("img",t,r,o,{src:n,alt:e})},ul:function(n,e,t){var r="";return A.Arr(n)&&n.forEach(function(e){A.String(e)?r+=l("li",e):A.Object(n)&&(r+=l("li",e.inner,e.attr))}),l("ul",r,e,t)},ol:function(n,e,t){var r="";return A.Arr(n)&&n.forEach(function(e){A.String(e)?r+=l("li",e):A.Object(n)&&(r+=l("li",e.inner,e.attr))}),l("ol",r,e,t)},h:function(n,e,t,r){return l("h"+n,e,t,r)},a:function(n,e,t,r){return l("a",e,t,r,{href:n})},script:function(n,e,t){return l("script",n,e,t,{type:"text/javascript"})},table:function(n,e,t){if(!A.Arr(n))return A.String(n)?l("table",n,e,t):l("table","",e,t);if(!n.every(function(n){return A.Object(n)}))throw new TypeError("dom.table -> rows : all entries need to be objects");var o="";return r(n,function(n){return r(n,function(n,e){var t="<tr>";"cell"===e||"td"===e||"data"===e?A.String(n)?t+="<td>"+n+"</td>":A.Object(n)&&(t+=l("tr",n.inner,n.attr)):("head"===e||"th"===e)&&(A.String(n)?t+="<th>"+n+"</th>":A.Object(n)&&(t+=l("th",n.inner,n.attr))),t+="</tr>",o+=t})}),l("table",o,e,t)}}},T={ArraytoObject:function(n){var e=void 0,t={};for(e in n)A.Def(n[e])&&(t[e]=n[e]);return t},filterArr:function(n,e){for(var t=-1,r=-1,o=[];++t<n.length;)e(n[t],t,n)&&(o[++r]=n[t]);return o},removeFromArr:function(n,e){var t=n.IndexOf(e),r=[],o=!1,i=0;for(A.String(n)&&(n=Array.from(n),o=!0);i<n.length;i++)i!==t&&r.push(n[i]);return o?r:r},sameArray:function(n,e){var t=n.length;if(t!==e.length)return!1;for(;t--;)if(n[t]!==e[t])return!1;return!0},concatObjects:function(n){for(var e=arguments.length,t=Array(e>1?e-1:0),o=1;e>o;o++)t[o-1]=arguments[o];return r(n,function(){t.forEach(function(e){r(e,function(e,t){t in n?A.Arr(n[t])?n[t].includes(e)||n[t].push(e):e!==n[t]&&(n[t]=[e,n[t]]):n[t]=e})})}),n},mergeObjects:function(n){for(var e=arguments.length,t=Array(e>1?e-1:0),r=1;e>r;r++)t[r-1]=arguments[r];return Object.assign(n,t)},omit:function(n,e){return A.Object(n)&&n!==e?(r(n,function(t,r){(e===r||e===t)&&delete n[r]}),n.hasOwnProperty(e)&&console.error("couldn't omit "+e+" from Object")):(A.Arr(n)||A.String(n))&&(n.forEach(function(t){e===t&&(n=T.removeArrItem(n,t))}),-1!==e.IndexOf(i)&&console.error("couldn't omit "+e+" from Array or String")),n},CurrentBrowser:{is:function(n){return S.join(" ").toLowerCase().includes(n.toLowerCase())?!0:!1},browser:S.join(" ")},loader:{pre:"craft:",CraftImport:function(n){var e=+new Date,t=n.key||n.url,r=T.loader.get(t);return r||r.expire-e>0?new Promise(function(n){return n(r)}):new Promise(function(r,o){return fetch(n.url).then(function(o){return o.text().then(function(o){n.data=o,n.stamp=e,n.expire=e+60*(n.expire||4e3)*60*1e3,n.cache&&localStorage.setItem(T.loader.pre+t,JSON.stringify(n)),r(n)})})["catch"](function(n){return o("Craft.loader: problem fetching import -> "+n)})})},Import:function(){for(var n=arguments.length,e=Array(n),t=0;n>t;t++)e[t]=arguments[t];var r=void 0,o=[];return e.forEach(function(n){r={url:n.css||n.script,type:n.css?"css":"script",exec:n.execute!==!1,cache:n.cache!==!1},A.Def(n.key)&&(r.key=n.key),A.Def(n.defer)&&(r.defer=n.defer),A.Def(n.expire)&&(r.expire=n.expire),n.test===!1?T.loader.remove(r.url):o.push(T.loader.CraftImport(r))}),Promise.all(o).then(function(n){return n.map(function(n){return n.exec?"css"===n.type?m.innerHTML+="\n"+n.data:v.appendChild(E().script(n.data,{defer:n.defer||void 0},!0)):void 0})})},setPrekey:function(n){return T.loader.pre=n+":"},get:function(n){return JSON.parse(localStorage.getItem(n.includes(T.loader.pre)?n:T.loader.pre+n)||!1)},remove:function(n){return localStorage.removeItem(n.includes(T.loader.pre)?n:T.loader.pre+n)},removeAll:function(n){for(var e in localStorage)(!n||T.loader.get(e).expire<=+new Date)&&T.loader.remove(e)}},router:{handle:function(n,e){(location.hash===n||location===n)&&e(),T.router.handlers.push({link:n,func:e})},handlers:[],links:[],link:function(n,e,t,r){return T.router.links.push(function(){return c(A.Def(r)?r:"click",o(n),function(n){return t?open(e):location=e})})},open:function(n){function e(e,t){return n.apply(this,arguments)}return e.toString=function(){return n.toString()},e}(function(n,e){return e?open(n):location=n}),setTitle:function(e){return n.title=e},setView:function(n,e){return o(n).innerHTML=e},fetchView:function(n,e,t,r){A.Null(localStorage.getItem("RT_"+r))?fetch(e).then(function(e){e.text().then(function(e){t&&A.Def(r)&&A.String(r)&&A.Null(localStorage.getItem("RT_"+r))&&localStorage.setItem("RT_"+r,e),o(n).innerHTML=e})})["catch"](function(n){return console.warn("Could not fetch view -> "+n)}):t&&(o(n).innerHTML=localStorage.getItem("RT_"+r))},clearCache:function(){for(var n in localStorage)localStorage.key(n).includes("RT_")&&localStorage.removeItem(localStorage.key(n))}},Cookies:{get:function(e){return e?decodeURIComponent(n.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null:null},set:function(e,t,r,o,i,u){if(!e||/^(?:expires|max\-age|path|domain|secure)$/i.test(e))return!1;var a="";return r&&(A.Num(r)&&(a=r===1/0?"; expires=Fri, 11 April 9997 23:59:59 UTC":"; max-age="+r),A.String(r)&&(a="; expires="+r),A.Date(r)&&(a="; expires="+r.toUTCString())),n.cookie=encodeURIComponent(e)+"="+encodeURIComponent(t)+a+(i?"; domain="+i:"")+(o?"; path="+o:"")+(u?"; secure":""),!0},remove:function(e,t,r){return T.Cookies.has(e)?(n.cookie=encodeURIComponent(e)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"+(r?"; domain="+r:"")+(t?"; path="+t:""),!0):!1},has:function(e){return e?new RegExp("(?:^|;\\s*)"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=").test(n.cookie):!1},keys:function(){var e=n.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g,"").split(/\s*(?:\=[^;]*)?;\s*/);return e.forEach(function(n){return decodeURIComponent(n)}),e}},after:function(n,e){var t=this;return A.Func(e)||(A.Func(n)?e=n:console.error("after : func is not a function")),n=Number.isFinite(n=+n)?n:0,function(){for(var r=arguments.length,o=Array(r),i=0;r>i;i++)o[i]=arguments[i];return--n<1?e.apply(t,o):function(){return null}}},debounce:function(n,e,t){var r=void 0;return function(){var o=this,i=arguments,u=function(){r=null,t||e.apply(o,i)},a=t&&!r;clearTimeout(r),r=setTimeout(u,n),a&&e.apply(this,i)}},throttle:function(n,e,t){var r=void 0,o=void 0,i=void 0,u=null,a=0;t||(t={});var c=function(){a=t.leading===!1?0:Date.now(),u=null,i=e.apply(r,o),u||(r=o=null)};return function(){var s=Date.now();a||t.leading!==!1||(a=s);var l=n-(s-a);return r=this,o=arguments,0>=l||l>n?(u&&(clearTimeout(u),u=null),a=s,i=e.apply(r,o),u||(r=o=null)):u||t.trailing===!1||(u=setTimeout(c,l)),i}},once:function(n,e){var t=void 0;return function(){return A.Func(n)&&(t=n.apply(e||this,arguments),n=null),t}},css:function(n,e){return A.Def(e,n)&&A.Node(n)?r(e,function(e,t){return n.style[t]=e}):console.error("invalid args")},hasCapitals:function(n){for(var e=0;e<n.length;e++)if(A.UpperCase(n[e]))return!0;return!1},OverrideFunction:function(n,e,t){for(var r=n.split("."),o=r.pop(),i=0;i<r.length;i++)t=t[r[i]];t[o]=e},len:function(n){if(A.Object(n))return Object.keys(n).length;if(A.Map(n)||A.Set(n))return n.size;try{return n.length}catch(e){console.error("could not find length of value")}},indexOfDate:function(n,e){for(var t=0;t<n.length;t++)if(+n[t]===+e)return t;return-1},type:function(){for(var n=arguments.length,e=Array(n),t=0;n>t;t++)e[t]=arguments[t];var r=[];return e.forEach(function(n){return r.push("undefined"==typeof n?"undefined":_typeof(n))}),r.length<2?r[0]:r},memoize:function(n,e){if(!A.Func(n)||e&&!A.Func(e))throw new TypeError("arg provided is not a function");var t=new WeakMap,r=function o(){for(var r=arguments.length,i=Array(r),u=0;r>u;u++)i[u]=arguments[u];var a=e?e.apply(this,i):i[0];if(t.has(a))return t.get(a);var c=n.apply(this,i);return o.cache=t.set(a,c),c};return r},Scope:{},WebComponents:[],ResizeHandlers:new C,Binds:new Map,mouse:{x:0,y:0,over:null},nodeExists:function(n,e){return null!==u(n,e=A.Node(e)?e:o(e))},ObjToFormData:function(n){var e=void 0,t=new FormData;for(e in n)t.append(e,n[e]);return t},URLfrom:function(n){return URL.createObjectURL(new Blob([n]))},OnScroll:function(n,e){return A.Func(e)?c("scroll",n,function(n){return e(n.deltaY<1?!1:!0,n)}):console.error("second param needs to be a function")},OnResize:function(n){return A.Func(n)?T.ResizeHandlers.add(n):console.error("Craft.OnResize -> func is not a function")},OnScrolledTo:function(n,e,t){return c("scroll",function(r){pageYOffset>=n?e(r):A.Def(t)&&t(r)})},WhenScrolledTo:function(n){return new Promise(function(e,t){var r=c("scroll",function(t){(pageYOffset>=n||pageYOffset<=n)&&(r.Off(),e(t))})})},/**
     * function that returns a promise when the DOM and WebComponents are finished loading
     * @param {Object=} Scope - Optional overide to the default Craft.Scope passed to the promise
     */
WhenReady:function(n){return new Promise(function(e,t){var r=T.CurrentBrowser.is("Firefox")||T.CurrentBrowser.is("msie");n=n||T.Scope,p?r?setTimeout(function(){return e(n)},500):e(n):!function(){var o=setInterval(function(){p&&(r?setTimeout(function(){return e(n)},500):e(n),clearInterval(o))},20);setTimeout(function(){clearInterval(o),p||t("Things didn't load correctly/intime -> load failed")},4500)}()})},poll:function(n,e,t,r,o){return function(){A.Func(t)&&(A.Func(r)&&(o=r),r=t,t=void 0);var i=setInterval(function(){(A.Bool(n)&&n===!0||A.Func(n)&&n()===!0)&&(r(),clearInterval(i))},e||20);A.Num(t)&&setTimeout(function(){clearInterval(i),(A.Bool(n)&&n===!1||A.Func(n)&&n()===!1)&&o()},t)}()},/**
     * Usefull method for validating passwords , example Craft.strongPassword('#MyFancyPassword18',8,true,true,"#") -> true requirements met
     * @param {string} pass - string containing the password
     * @param {Number} length - Character length in numbers (Minimum password length)
     * @param {Boolean} caps - Should the password contains Capital Letters
     * @param {Boolean} number - should the password contain Numbers
     * @param {...string} includeChars - every extra argument should be a string containing a character you want the password to include
     */
strongPassword:function(n,e,t,r){for(var o=arguments.length,i=Array(o>4?o-4:0),u=4;o>u;u++)i[u-4]=arguments[u];if(n.length<=e)return!1;if(t===!0&&T.hasCapitals(n)===!1)return!1;if(r===!0&&/\d/g.test(n)===!1)return!1;if(0!==i.length){var a=!0;if(i.forEach(function(e){n.includes(e)||(a=!1)}),!a)return!1}return!0},/** method for generating random alphanumeric strings*/
randomString:function(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)},/**
    * similar to Craft.randomString in that it generates a unique string , in this case a Unique ID with random alphanumeric strings separated by hyphens
    * example 0ebf-c7d2-ef81-2667-08ef-4cde
    */
GenUID:function(){return T.randomString()+"-"+T.randomString()+"-"+T.randomString()+"-"+T.randomString()+"-"+T.randomString()+"-"+T.randomString()},/**
    * Part of Crafter.js's own WebComponent format (.wc) it takes a json object that contains .css and .js values then imports and executes them
    * @param {string} webcomponent - JSON string from Crafter.js's (.wc) WebComponent format
    */
createWebComponent:function(n){A.String&&(n=JSON.parse(n)),m.innerHTML+=n.css;var e=E().script("",{src:T.URLfrom(n.js),webcomponent:n.name},!0);e.onload=function(e){return T.WebComponents.push(n.name)},v.appendChild(e)},/**
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
newComponent:function(e,t){A.Undef(t)?console.error("Invalid Component Configuration"):!function(){var o=Object.create(HTMLElement.prototype),i={};r(t,function(n,e){"created"===e?o.createdCallback=n:"inserted"===e?o.attachedCallback=n:"destroyed"===e?o.detachedCallback=n:"attr"===e?o.attributeChangedCallback=n:"extends"===e?i["extends"]=n:A.Func(n)?o[e]=n:"extends"===e||A.Func(n)||(o[e]=n)}),i.prototype=o,n.registerElement(e,i)}()},/** creates a new bound variable , part of Crafter.js's Data Binding System */
newBind:function(n,e,t){A.Func(t)?T.Binds.set(n,new k(e,t)):T.Binds.set(n,e),a("[view-bind]",function(n){T.Binds.has(n.getAttribute("view-bind"))&&(n.innerHTML=A.Func(t)?T.Binds.get(n.getAttribute("view-bind")).val:T.Binds.get(n.getAttribute("view-bind")))})},/** sets the value of a bound variable */
setBind:function(n,e){A.ReactiveVariable(T.Binds.get(n))?T.Binds.get(n).set(e):T.Binds.set(n,e),a("[view-bind]",function(e){T.Binds.has(e.getAttribute("view-bind"))&&(e.innerHTML=A.ReactiveVariable(T.Binds.get(n))?T.Binds.get(e.getAttribute("view-bind")).val:T.Binds.get(e.getAttribute("view-bind")))})}};T.loader.removeAll(!0),c("animationstart",n,function(n){"NodeInserted"===n.animationName&&A.Node(n.target)&&n.target.hasAttribute("[view-bind]")&&T.Binds.has(n.target.getAttribute("view-bind"))&&(n.target.innerHTML=A.ReactiveVariable(T.Binds.get(key))?T.Binds.get(n.target.getAttribute("view-bind")).val:T.Binds.get(n.target.getAttribute("view-bind")))}),e.onresize=T.throttle(450,function(n){return T.ResizeHandlers.runEach(n)}),e.onmousemove=function(n){T.mouse.x=n.clientX,T.mouse.y=n.clientY,T.mouse.over=n.target},e.onblur=function(n){return T.tabActive=!1},e.onfocus=function(n){return T.tabActive=!0},T.newComponent("fetch-webcomponent",{created:function(){var n=this;if(this.hasAttribute("src")){var e=null;this.hasAttribute("cache-component")&&(e=localStorage.getItem(this.getAttribute("src")),null!==e&&T.createWebComponent(e)),null===e&&fetch(this.getAttribute("src")).then(function(e){return e.json().then(function(e){m.innerHTML+=e.css;var t=E().script("",{src:T.URLfrom(e.js),webcomponent:e.name},!0);t.onload=function(n){T.WebComponents.push(e.name),t=null,e=null},v.appendChild(t),"true"===n.getAttribute("cache-component")&&localStorage.setItem(n.getAttribute("src"),JSON.stringify(e))})})["catch"](function(n){return console.error(n+": could not load webcomponent")})}}}),s("DOMContentLoaded",function(n){a("[link]",function(n){return c("click",n,function(e){return n.hasAttribute("newtab")?open(n.getAttribute("link")):T.router.open(n.getAttribute("link"))})}),T.router.links.forEach(function(n){return n()}),T.WebComponents.length===u("fetch-webcomponent").length?p=!0:T.poll(function(){return T.WebComponents.length===u("fetch-webcomponent").length},35,2e3,function(){return p=!0},function(){console.log("loading is taking longer than usual :("),p=!0})}),c("hashchange",function(n){return T.router.handlers.forEach(function(n){return location.hash===n.link||location===n.link?n.func():null})}),e.is=A,e.dom=E,e.Craft=T,e.On=c,e.Once=s,e.forEach=r,e.QueryOrNodetoNodeArray=t,e.make_element=l,e.FunctionIterator=C,e.CraftSocket=w,e.EventHandler=O,e.ReactiveVariable=k,e.query=o,e.queryAll=u,e.queryEach=a}(document,self);