Craft.newComponent('crafter-navbar', {
  inserted() {
      let tempVal, el = dom(this),selected = 0;

      this.navItems = el.queryAll('navbar-item');
      this.selected = selected + 1;

      let checkStates = () => {
        if (this.selected !== selected + 1) this.selected = selected + 1;
        this.setActive(selected);
      }

      if (el.hasAttr('select')) {
        let selectedNum = el.getAttr('select'),
          parsedNum = Number(selectedNum);
        Number.isNaN(selectedNum) || Number.isInteger(parsedNum) === false ? console.warn('crafer-navbars - the selected attribute is not a valid number, defaulting to 1') : selected = parsedNum - 1;
      }
      if (!el.hasAttr('direction')) el.setAttr('direction', 'left');
      this.setActive(selected);

      this.Click = el.On('click',e => {
        if (is.Node(e.target) && e.target.tagName === 'NAVBAR-ITEM') selected = Array.from(this.navItems).indexOf(e.target);
        checkStates();
      });

      this.Wheel = el.On('wheel', e => {
        tempVal = selected;
        (e.deltaY < 1) ? tempVal-- : tempVal++;
        if (tempVal >= this.navItems.length) tempVal = 0;
        else if (tempVal < 0) tempVal = this.navItems.length - 1;
        selected = tempVal;
        checkStates();
      });

      forEach(this.navItems, el => el.navIndex = Array.from(this.navItems).indexOf(el));
    },
    setActive(select) {
      let el = dom(this);
      if (el.query('[selected]') !== null) el.query('[selected]').removeAttribute('selected');
      this.navItems[select].setAttribute('selected', '');
    },
    attr(attrName, oldVal, newVal) {
      let el = dom(this);
      if (attrName === 'select' && el.hasAttr('select')) {
        if (Number.isNaN(newVal) || Number.isInteger(Number(newVal)) === false) console.warn('crafter-navbar - the selected attribute is not a valid number defaulting to 1');
        else if (this.selected !== Number(newVal) && (Number(newVal) >= (this.navItems.length + 1) === false) && (Number(newVal) <= (this.navItems.length + 1) === false)) this.selected = Number(newVal);
        else console.warn("crafter-navbar - selected attribute out of range");
      } else if (attrName === 'direction' && !el.hasAttr('direction')) el.setAttr('direction', 'left');
    },
    destroyed() {
      this.Click.Off();
      this.Wheel.Off();
    }
});

Craft.newComponent('navbar-item', {
  created() {
      let el = dom(this),
        r = 'ripple';
      if (el.hasAttr(r)) el.css({
        borderColor: el.getAttr(r),
        color: this.hasAttribute('selected') ? el.getAttr(r) : ''
      });
    },
    attr(name, oldVal, newVal) {
      let el = dom(this),
        r = 'ripple',
        s = 'selected';
      if (name === r && el.hasAttr(r)) this.style.borderColor = newVal;
      if (name === s && el.hasAttr(s)) {
        if (el.hasAttr(r)) this.style.color = el.getAttr(r);
        if (is.Def(this.handleActive)) this.handleActive();
      } else if (!el.hasAttr(s)) this.style.color = '';
    },
    setActive() {
      this.parentNode.setActive(this.navIndex);
    }
});
