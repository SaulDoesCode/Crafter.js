Object.observe||function(e,t,n,r){"use strict";var o,i,c=["add","update","delete","reconfigure","setPrototype","preventExtensions"],a=t.isArray||function(e){return function(t){return"[object Array]"===e.call(t)}}(e.prototype.toString),f=t.prototype.indexOf?t.indexOf||function(e,n,r){return t.prototype.indexOf.call(e,n,r)}:function(e,t,n){for(var r=n||0;r<e.length;r++)if(e[r]===t)return r;return-1},s=n.Map!==r&&Map.prototype.forEach?function(){return new Map}:function(){var e=[],t=[];return{size:0,has:function(t){return f(e,t)>-1},get:function(n){return t[f(e,n)]},set:function(n,r){var o=f(e,n);-1===o?(e.push(n),t.push(r),this.size++):t[o]=r},"delete":function(n){var r=f(e,n);r>-1&&(e.splice(r,1),t.splice(r,1),this.size--)},forEach:function(n){for(var r=0;r<e.length;r++)n.call(arguments[1],t[r],e[r],this)}}},u=e.getOwnPropertyNames?function(){var t=e.getOwnPropertyNames;try{arguments.callee}catch(n){var r=(t(f).join(" ")+" ").replace(/prototype |length |name /g,"").slice(0,-1).split(" ");r.length&&(t=function(t){var n=e.getOwnPropertyNames(t);if("function"==typeof t)for(var o,i=0;i<r.length;)(o=f(n,r[i++]))>-1&&n.splice(o,1);return n})}return t}():function(t){var n,r,o=[];if("hasOwnProperty"in t)for(n in t)t.hasOwnProperty(n)&&o.push(n);else{r=e.hasOwnProperty;for(n in t)r.call(t,n)&&o.push(n)}return a(t)&&o.push("length"),o},p=n.requestAnimationFrame||n.webkitRequestAnimationFrame||function(){var e=+new Date,t=e;return function(n){return setTimeout(function(){n((t=+new Date)-e)},17)}}(),l=function(e,t,n){var r=o.get(e);r?(v(r,e),g(e,r,t,n)):(r=h(e),g(e,r,t,n),1===o.size&&p(d))},h=function(e,t){for(var n=u(e),r=[],i=0,t={handlers:s(),properties:n,values:r,notifier:b(e,t)};i<n.length;)r[i]=e[n[i++]];return o.set(e,t),t},v=function(e,t,n){if(e.handlers.size){var r,o,i,c,a,s,p,l=e.values,h=0;for(r=e.properties.slice(),o=r.length,i=u(t);h<i.length;)a=i[h++],c=f(r,a),s=t[a],-1===c?(w(t,e,{name:a,type:"add",object:t},n),e.properties.push(a),l.push(s)):(p=l[c],r[c]=null,o--,(p===s?0===p&&1/p!==1/s:p===p||s===s)&&(w(t,e,{name:a,type:"update",object:t,oldValue:p},n),e.values[c]=s));for(h=r.length;o&&h--;)null!==r[h]&&(w(t,e,{name:r[h],type:"delete",object:t,oldValue:l[h]},n),e.properties.splice(h,1),e.values.splice(h,1),o--)}},d=function(){o.size&&(o.forEach(v),i.forEach(y),p(d))},y=function(e,t){var n=e.changeRecords;n.length&&(e.changeRecords=[],t(n))},b=function(e,t){return arguments.length<2&&(t=o.get(e)),t&&t.notifier||{notify:function(t){t.type;var n=o.get(e);if(n){var r,i={object:e};for(r in t)"object"!==r&&(i[r]=t[r]);w(e,n,i)}},performChange:function(t,n){if("string"!=typeof t)throw new TypeError("Invalid non-string changeType");if("function"!=typeof n)throw new TypeError("Cannot perform non-function");var i,c,a=o.get(e),f=arguments[2],s=f===r?n():n.call(f);if(a&&v(a,e,t),a&&s&&"object"==typeof s){c={object:e,type:t};for(i in s)"object"!==i&&"type"!==i&&(c[i]=s[i]);w(e,a,c)}}}},g=function(e,t,n,r){var o=i.get(n);o||i.set(n,o={observed:s(),changeRecords:[]}),o.observed.set(e,{acceptList:r.slice(),data:t}),t.handlers.set(n,o)},w=function(e,t,n,r){t.handlers.forEach(function(t){var o=t.observed.get(e).acceptList;("string"!=typeof r||-1===f(o,r))&&f(o,n.type)>-1&&t.changeRecords.push(n)})};o=s(),i=s(),e.observe=function(t,n,o){if(!t||"object"!=typeof t&&"function"!=typeof t)throw new TypeError("Object.observe cannot observe non-object");if("function"!=typeof n)throw new TypeError("Object.observe cannot deliver to non-function");if(e.isFrozen&&e.isFrozen(n))throw new TypeError("Object.observe cannot deliver to a frozen function object");if(o===r)o=c;else if(!o||"object"!=typeof o)throw new TypeError("Third argument to Object.observe must be an array of strings.");return l(t,n,o),t},e.unobserve=function(e,t){if(null===e||"object"!=typeof e&&"function"!=typeof e)throw new TypeError("Object.unobserve cannot unobserve non-object");if("function"!=typeof t)throw new TypeError("Object.unobserve cannot deliver to non-function");var n,r=i.get(t);return r&&(n=r.observed.get(e))&&(r.observed.forEach(function(e,t){v(e.data,t)}),p(function(){y(r,t)}),1===r.observed.size&&r.observed.has(e)?i["delete"](t):r.observed["delete"](e),1===n.data.handlers.size?o["delete"](e):n.data.handlers["delete"](t)),e},e.getNotifier=function(t){if(null===t||"object"!=typeof t&&"function"!=typeof t)throw new TypeError("Object.getNotifier cannot getNotifier non-object");return e.isFrozen&&e.isFrozen(t)?null:b(t)},e.deliverChangeRecords=function(e){if("function"!=typeof e)throw new TypeError("Object.deliverChangeRecords cannot deliver to non-function");var t=i.get(e);t&&(t.observed.forEach(function(e,t){v(e.data,t)}),y(t,e))}}(Object,Array,this);