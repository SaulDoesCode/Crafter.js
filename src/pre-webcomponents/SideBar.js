"use strict";
(() => {
  Craft.newComponent('side-bar', {
    inserted() {
        let el = dom(this);
        if (!el.hasAttr('sidebar-direction')) el.setAttr('sidebar-direction', 'left');
        if (el.hasAttr('color-accent')) el.color = el.getAttr('color-accent');
        if (el.hasAttr('toggle-element')) el.setToggleElement(el.getAttr('toggle-element'));
        el.onClick = On('click', el, e => {
          queryEach('[selected]', el, s => {
            if (s !== e.target) s.removeAttribute('selected');
          });
          queryEach('[accordion="open"]', el, s => {
            if (s !== e.target && s !== e.target.parentNode) s.setAttribute('accordion', 'closed');
          });
        });
      },
      setToggler(selector, func) {
        let s = this;
        if (is.Def(func)) {
          s.func = func;
          s.func(!s.hasAttribute('hidden'));
        }
        s.onToggleClick = On(selector).Click(e => s.toggle());
      },
      toggle(open) {
        let el = dom(this),
          sbt = 'hidden',
          gotSBT = el.hasAttr(sbt);
        if (is.Def(open)) open ? el.stripAttr(sbt) : el.setAttr(sbt, '');
        else gotSBT ? el.stripAttr(sbt) : el.setAttr(sbt, '');
      },
      attr(name) {
        let el = dom(this);
        if (name === 'hidden' && is.Func(el.func)) this.func(!el.hasAttr('hidden'));
      },
      destroyed() {
        this.onClick.Off();
        if (this.onToggleClick instanceof EventHandler) this.onToggleClick.Off();
      }
  });

  Craft.newComponent('sidebar-mainheading', {
    extends: 'div'
  });
  Craft.newComponent('sidebar-icon', {
    extends: 'span'
  });

  Craft.newComponent('sidebar-heading', {
    inserted() {
        let el = dom(this);
        if (el.hasAttr('ripple')) {
          el.color = el.getAttr('ripple');
          if (!is.Array(el.customAttr)) el.customAttr = [];
          if (!el.customAttr.includes('ripple')) {
            el.customAttr.push('ripple');
            Craft.ripple(el);
          }
        }
        if (el.hasAttr('color-accent')) el.color = el.getAttr('color-accent');
        setTimeout(() => {
          let icon = el.query('sidebar-icon');
          if (icon !== null) icon.style.color = el.color;
          if (el.textContent.length > 40) el.style.height = 'auto';
        }, 40);
      },
      attr(name, ov, nv) {
        if (name === 'ripple' || name === 'color-accent') this.color = nv;
      }
  });

  Craft.newComponent('sidebar-item', {
    inserted() {
        let el = dom(this);
        if (el.hasAttr('ripple')) el.color = el.getAttr('ripple');
        if (el.hasAttr('color-accent')) el.color = el.getAttr('color-accent');
        el.style.borderColor = el.color;
        if (query('sidebar-icon', el) !== null) query('sidebar-icon', el).style.color = el.color;
        el.Onclick = On('click', el, e => el.hasAttr('selected') ? el.stripAttr('selected') : setTimeout(() => el.setAttr('selected'), 50));
      },
      attr(attrName, oldVal, newVal) {
        if (attrName === 'ripple' || attrName === 'color-accent') this.color = newVal;
        this.style.borderColor = this.color;
        let sb = query('sidebar-icon', this);
        if (sb !== null) sb.style.color = this.color;
      },
      destroyed() {
        this.Onclick.Off();
      }
  });

  Craft.newComponent('sidebar-accordion', {
    inserted() {
        let el = dom(this);
        el.open = el.getAttr('accordion') === 'open' ? true : false;
        el.setAttr('accordion', el.open ? 'open' : 'closed');
        setTimeout(() => {
          let heading = dom('sidebar-heading', el);
          if (is.Node(heading)) {
            el.headingclick = On(heading).Click(e => {
              el.open = !el.open;
              setTimeout(() => el.setAttr('accordion', el.open ? 'open' : 'closed'), 50);
              el.style.height = el.open ? ((queryAll('sidebar-item', el).length * 8.5) + 12) + "mm" : '';
            });
            if (heading.hasAttribute('ripple')) el.color = heading.getAttribute('ripple');
            if (heading.hasAttribute('color-accent')) el.color = heading.getAttribute('color-accent');
          }
          el.Click = On('click', el, e => queryEach('sidebar-item[selected]', el, s => {
            if (s !== e.target && e.target.tagName !== 'SIDEBAR-HEADING') s.removeAttribute('selected');
          }));
          queryEach('sidebar-item', el, item => {
            if (is.Def(el.color)) item.setAttribute('color-accent', el.color);
          });
        }, 40);
      },
      attr() {
        let el = dom(this);
        el.getAttr('accordion') === 'open' ? el.open = true : el.open = false;
        setTimeout(() => el.setAttr('accordion', el.open ? 'open' : 'closed'), 50);
        el.style.height = el.open ? ((queryAll('sidebar-item', el).length * 8.5) + 12) + "mm" : '';
      },
      destroyed() {
        let s = this;
        if (s.headingclick instanceof EventHandler) s.headingclick.Off();
        if (s.Click instanceof EventHandler) s.Click.Off();
      }
  });
})();
