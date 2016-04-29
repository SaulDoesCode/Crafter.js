Craft.newComponent('crafter-navbar', {
    inserted() {
        let el = this;
        if (!el.hasAttr('direction')) el.setAttr('direction', 'left');
        if(!el.query('[selected]')) dom(el.query('navbar-item')).setAttr('selected');
        el.OnClick = el.Click((e,target) => {
            if (target.tagName === 'NAVBAR-ITEM') target.active()
        });
        el.OnWheel = el.OnScroll((y,e) => {
          dom('[selected]', el)[y ? 'previous' : 'next'](true).active();
        },!0);
    },
    attr(attrName, ov, nv) {
        let el = this;
        if (attrName === 'direction' && !el.hasAttr('direction')) el.setAttr('direction', 'left');
    }
});

Craft.newComponent('navbar-item', {
    inserted() {
        let el = this,
            r = 'ripple';
        if (el.hasAttr(r)) el.css({
            borderColor: el.getAttr(r),
            color: el.hasAttr('selected') ? el.getAttr(r) : ''
        });
    },
    active() {
      let el = this;
      dom(this.Siblings).stripAttr('selected');
      this.setAttr('selected')
    },
    attr(name, oldVal, newVal) {
        let el = this,
            r = 'ripple',
            s = 'selected';
        if (name === r && el.hasAttr(r)) el.style.borderColor = newVal;
        if (name === s && el.hasAttr(s)) {
            if (el.hasAttr(r)) el.style.color = el.getAttr(r);
            if (is.Func(el.onactive)) el.onactive()
        } else if (!el.hasAttr(s)) el.style.color = '';
    }
});
