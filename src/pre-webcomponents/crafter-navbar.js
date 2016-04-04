Craft.newComponent('crafter-navbar', {
  inserted() {
      let tempVal, el = this,
        selected = 0;

      el.navItems = el.queryAll('navbar-item');
      el.selected = selected + 1;

      let checkStates = () => {
        if (el.selected !== selected + 1) el.selected = selected + 1;
        el.active = selected;
      }

      if (el.hasAttr('select')) {
        let selectedNum = el.getAttr('select'),
          parsedNum = Number(selectedNum);
        Number.isNaN(selectedNum) || !Number.isInteger(parsedNum) ? console.warn('crafer-navbars - the selected attribute is not a valid number, defaulting to 1') : selected = parsedNum - 1;
      }
      if (!el.hasAttr('direction')) el.setAttr('direction', 'left');
      el.active = selected;

      el.Click = el.On('click', e => {
        if (is.Node(e.target) && e.target.tagName === 'NAVBAR-ITEM') selected = Craft.toArr(el.navItems).indexOf(e.target);
        checkStates();
      });

      el.Wheel = el.On('wheel', e => {
        tempVal = selected;
        (e.deltaY < 1) ? tempVal-- : tempVal++;
        e.preventDefault();
        if (tempVal >= el.navItems.length) tempVal = 0;
        else if (tempVal < 0) tempVal = el.navItems.length - 1;
        selected = tempVal;
        checkStates();
      });

      forEach(el.navItems, (el,i) => {
        el.navIndex = i
      });
    },
    set active(select) {
      let el = this,
        selected = el.query('[selected]');
      if (selected !== null) selected.removeAttribute('selected');
      el.navItems[select].setAttribute('selected', '');
    },
    attr(attrName, ov, nv) {
      let el = this;
      if (attrName === 'select' && el.hasAttr('select')) {
        let num = Craft.toInt(nv);
        if (!is.int(nv)) console.warn('crafter-navbar - the selected attribute is not an integer defaulting to 1');
        else if (el.selected !== num && (num >= (el.navItems.length + 1) === !1) && (num <= (el.navItems.length + 1) === !1)) el.selected = num;
        else console.warn("crafter-navbar - selected attribute out of range");
      } else if (attrName === 'direction' && !el.hasAttr('direction')) el.setAttr('direction', 'left');
    },
    destroyed() {
      this.Click.Off;
      this.Wheel.Off;
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
    attr(name, oldVal, newVal) {
      let el = this,
        r = 'ripple',
        s = 'selected';
      if (name === r && el.hasAttr(r)) el.style.borderColor = newVal;
      if (name === s && el.hasAttr(s)) {
        if (el.hasAttr(r)) el.style.color = el.getAttr(r);
        if (is.Def(el.handleActive)) el.handleActive();
      } else if (!el.hasAttr(s)) el.style.color = '';
    },
    setActive() {
      this.parentNode.active = this.navIndex;
    }
});
