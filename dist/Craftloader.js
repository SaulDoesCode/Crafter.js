'use strict';

(function () {
  var pre = 'craft:',
      doc = document,
      def = function def() {
    for (var _len = arguments.length, obj = Array(_len), _key = 0; _key < _len; _key++) {
      obj[_key] = arguments[_key];
    }

    return obj.every(function (o) {
      return o !== undefined;
    });
  },
      CraftImport = function CraftImport(obj) {
    var now = +new Date(),
        key = obj.key || obj.url,
        src = Craftloader.get(key);
    if (src || src.expire - now > 0) return new Promise(function (resolve) {
      return resolve(src);
    });
    return new Promise(function (success, failed) {
      return fetch(obj.url).then(function (res) {
        return res.text().then(function (data) {
          obj.data = data;
          obj.stamp = now;
          obj.expire = now + (obj.expire || 4000) * 60 * 60 * 1000;
          if (obj.cache) localStorage.setItem(pre + key, JSON.stringify(obj));
          success(obj);
        });
      }).catch(function (err) {
        return failed('Craftloader: problem fetching import -> ' + err);
      });
    });
  },
      execute = function execute(src) {
    return src.map(function (obj) {
      var el = obj.type === 'css' ? doc.createElement('style') : doc.createElement('script');
      el.defer = obj.defer || undefined;
      el.innerHTML = obj.data;
      if (obj.exec) doc.head.appendChild(el);
    });
  };
  self.Craftloader = {
    Import: function Import() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var obj = undefined,
          promises = [];
      args.forEach(function (arg) {
        obj = { url: arg.css || arg.script, type: arg.css ? 'css' : 'script', exec: arg.execute !== false, cache: arg.noCache !== false };
        if (def(arg.key)) obj.key = arg.key;
        if (def(arg.defer)) obj.defer = arg.defer;
        if (def(arg.expire)) obj.expire = arg.expire;
        arg.test === false ? Craftloader.remove(obj.url) : promises.push(CraftImport(obj));
      });
      return Promise.all(promises).then(execute);
    },
    setPrekey: function setPrekey(str) {
      return pre = str + ':';
    },
    get: function get(key) {
      return JSON.parse(localStorage.getItem(key.includes(pre) ? key : pre + key) || false);
    },
    remove: function remove(key) {
      return localStorage.removeItem(key.includes(pre) ? key : pre + key);
    },
    removeAll: function removeAll(expired) {
      for (var i in localStorage) {
        if (!expired || Craftloader.get(i).expire <= +new Date()) Craftloader.remove(i);
      }
    }
  };
  Craftloader.removeAll(true);
})();