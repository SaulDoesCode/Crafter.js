'use strict';
(() => {
  var pre = 'craft:', doc = document, def = (...obj) => obj.every(o => o !== undefined),
  CraftImport = obj => {
    let now = +new Date(), key = (obj.key || obj.url),src = Craftloader.get(key);
    if (src || src.expire - now > 0) return new Promise(resolve => resolve(src));
    return new Promise((success, failed) => fetch(obj.url).then(res => res.text().then(data => {
      obj.data = data;
      obj.stamp = now;
      obj.expire = now + ((obj.expire || 4000) * 60 * 60 * 1000);
      if (obj.cache) localStorage.setItem(pre + key, JSON.stringify(obj));
      success(obj);
    })).catch(err => failed(`Craftloader: problem fetching import -> ${err}`)));
  },
  execute = src => src.map(obj => {
    let el = (obj.type === 'css') ? doc.createElement('style') : doc.createElement('script');
    el.defer = obj.defer || undefined;
    el.innerHTML = obj.data;
    if (obj.exec) doc.head.appendChild(el);
  });
  self.Craftloader = {
    Import: (...args) => {
      let obj, promises = [];
      args.forEach(arg => {
        obj = {url: (arg.css || arg.script), type: arg.css ? 'css' : 'script', exec: arg.execute !== false, cache: arg.noCache !== false};
        if (def(arg.key)) obj.key = arg.key;
        if (def(arg.defer)) obj.defer = arg.defer;
        if (def(arg.expire)) obj.expire = arg.expire;
        arg.test === false ? Craftloader.remove(obj.url) : promises.push(CraftImport(obj));
      });
      return Promise.all(promises).then(execute);
    },
    setPrekey: str => pre = str + ':',
    get: key => JSON.parse(localStorage.getItem(key.includes(pre) ? key : pre + key) || false),
    remove: key => localStorage.removeItem(key.includes(pre) ? key : pre + key),
    removeAll: expired => { for (let i in localStorage) if (!expired || Craftloader.get(i).expire <= +new Date()) Craftloader.remove(i) }
  };
  Craftloader.removeAll(true);
})();
