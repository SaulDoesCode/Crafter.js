"use strict";
(() => {
  Craft.newComponent('side-bar', {
    inserted() {
        let el = this;
        if (el.hasAttribute('sidebar-direction')) el.setAttribute('sidebar-direction', 'left');
        if (el.hasAttribute('color-accent')) el.color = el.getAttribute('color-accent');
        if (el.hasAttribute('toggle-element')) el.setToggleElement(el.getAttribute('toggle-element'));
        el.onClick = On('click', el, e => {
          queryEach('[selected]',el, s => {
            if (s !== e.target) s.removeAttribute('selected');
          });
          queryEach('[accordion="open"]',el, s => {
            if (s !== e.target && s !== e.target.parentNode) s.setAttribute('accordion', 'closed');
          });
        });
      },
      setToggler(selector, func) {
        let s = this;
        if (is.Def(func)) this.func = func;
        s.onToggleClick = On('click', selector, e => s.toggle());
      },
      toggle(open) {
        let el = this,
          sbt = 'hidden', gotSBT = this.hasAttribute(sbt);
        if(is.Def(open)) open ? el.removeAttribute(sbt) : el.setAttribute(sbt, '');
        else gotSBT ? el.removeAttribute(sbt) : el.setAttribute(sbt, '');
      },
      attr(name) {
        if (name === 'hidden' && is.Func(this.func)) this.func(!this.hasAttribute('hidden'));
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
        if (this.hasAttribute('ripple')) this.color = this.getAttribute('ripple');
        if (this.hasAttribute('color-accent')) this.color = this.getAttribute('color-accent');
        setTimeout(() => {
          if (query('sidebar-icon', this) !== null) query('sidebar-icon', this).style.color = this.color;
          if (this.textContent.length > 40) this.style.height = 'auto';
        }, 40);
      },
      attr() {
        if (attrName === 'ripple') this.color = newVal;
        if (attrName === 'color-accent') this.color = newVal;
      }
  });

  Craft.newComponent('sidebar-item', {
    inserted() {
        if (this.hasAttribute('ripple')) this.color = this.getAttribute('ripple');
        if (this.hasAttribute('color-accent')) this.color = this.getAttribute('color-accent');
        this.style.borderColor = this.color;
        if (query('sidebar-icon', this) !== null) query('sidebar-icon', this).style.color = this.color;
        this.Onclick = On('click', this, e => this.hasAttribute('selected') ? this.removeAttribute('selected') : setTimeout(() => this.setAttribute('selected', ''), 50));
      },
      attr(attrName, oldVal, newVal) {
        if (attrName === 'ripple' || attrName === 'color-accent') this.color = newVal;
        this.style.borderColor = this.color;
        if (query('sidebar-icon', this) !== null) query('sidebar-icon', this).style.color = this.color;
      },
      destroyed() {
        this.Onclick.Off();
      }
  });

  Craft.newComponent('sidebar-accordion', {
    created() {
        let heading, el = this;
        el.open = el.getAttribute('accordion') === 'open' ? true : false;
        el.setAttribute('accordion', el.open ? 'open' : 'closed');
        setTimeout(() => {
          heading = query('sidebar-heading', el);
          el.headingclick = On('click', heading, e => {
            el.open = !el.open;
            setTimeout(() => el.setAttribute('accordion', el.open ? 'open' : 'closed'), 50);
            el.style.height = el.open ? ((queryAll('sidebar-item', el).length * 8.5) + 12) + "mm" : '';
          });
          el.Click = On('click', el, e => queryEach('sidebar-item[selected]', el, s => {
            if (s !== e.target && e.target.tagName !== 'SIDEBAR-HEADING') s.removeAttribute('selected');
          }));
          if (heading.hasAttribute('ripple')) el.color = heading.getAttribute('ripple');
          if (heading.hasAttribute('color-accent')) el.color = heading.getAttribute('color-accent');
          queryEach('sidebar-item', el, item => {
            if (is.Def(el.color)) item.setAttribute('color-accent', el.color);
          });
        }, 40);
      },
      attr() {
        let el = this;
        el.getAttribute('accordion') === 'open' ? el.open = true : el.open = false;
        setTimeout(() => el.setAttribute('accordion', el.open ? 'open' : 'closed'), 50);
        el.style.height = el.open ? ((queryAll('sidebar-item', el).length * 8.5) + 12) + "mm" : '';
      },
      destroyed() {
        let s = this;
        if (s.headingclick instanceof EventHandler) s.headingclick.Off();
        if (s.Click instanceof EventHandler) s.Click.Off();
      }
  });
})();
