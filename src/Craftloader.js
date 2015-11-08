'use strict';
(document => {
  var PreKey = 'craft:';

  function CraftImport(obj) {
    var src, promise;
    src = Craftloader.get((obj.key || obj.url));
    obj.execute = obj.execute !== false;
    if (!src || src.expire - +new Date() < 0 || obj.unique !== src.unique) {
      if (obj.unique) obj.url += ((obj.url.indexOf('?') > 0) ? '&' : '?') + 'unique=' + obj.unique;
      promise = new Promise((success, failure) => {
        fetch(obj.url).then(res => {
          res.text().then(content => {
            var now = +new Date();
            obj.data = content;
            obj.stamp = now;
            obj.expire = now + ((obj.expire || 4000) * 60 * 60 * 1000);
            if (!obj.noCache) {
              try {
                localStorage.setItem(PreKey + (obj.key || obj.url), JSON.stringify(obj));
              } catch (e) {
                (e.name.toUpperCase().includes('QUOTA')) ? console.warn('localStorage is over QUOTA :' + e): console.warn("couldn't cache Module executing locally: " + e);
              }
            }
            success(obj);
          });
        }).catch(res => failure('Could not fetch Craftloader import -> ' + res));
      });
    } else {
      src.execute = obj.execute;
      promise = new Promise(resolve => resolve(src));
    }
    return promise;
  }

  function execute(sources) {
    return sources.map(obj => {
      if (obj.execute) {
        var execEl;
        (obj.type === 'css') ? execEl = document.createElement('style'): execEl = document.createElement('script');
        if (obj.type !== 'css') execEl.defer = obj.defer || false;
        execEl.innerHTML = obj.data;
        document.head.appendChild(execEl);
      }
      return obj;
    });
  }

  window.Craftloader = {
    Import: function () {
      var obj, promises = [];
      for (var i = 0; i < arguments.length; i++) {
        if ((arguments[i].test !== undefined && arguments[i].test === false) || (arguments[i].execute !== undefined && arguments[i].execute === false)) {
          if (arguments[i].test === false) Craftloader.remove((arguments[i].css || arguments[i].script || arguments[i].url));
        } else {
          obj = {
            url: (arguments[i].script || arguments[i].css || arguments[i].url),
            type: arguments[i].css ? 'css' : 'script'
          };
          if (obj.url === undefined || obj.url === '' || obj.url === null) return console.error('no script/css/url found');
          if (arguments[i].noCache === true) obj.noCache = true;
          if (arguments[i].key !== undefined) obj.key = arguments[i].key;
          if (arguments[i].defer !== undefined) obj.defer = obj.key;
          if (arguments[i].expire !== undefined) obj.expire = arguments[i].expire;
          promises.push(CraftImport(obj));
        }
      }
      return Promise.all(promises).then(execute);
    },
    remove: key => localStorage.removeItem(PreKey + key),
    get: key => {
      try {
        return JSON.parse(localStorage.getItem(PreKey + key) || false);
      } catch (e) {
        return undefined;
      }
    },
    removeAll: expired => {
      var mod, key, now = +new Date();
      for (mod in localStorage) {
        key = mod.split(PreKey)[1];
        if (key && (!expired || Craftloader.get(key).expire <= now)) Craftloader.remove(key);
      }
    }
  };
  Craftloader.removeAll(true);
})(document);
