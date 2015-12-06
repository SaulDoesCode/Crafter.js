"use strict";
(() => {
    Craft.newComponent('side-bar', {
      created: function () {
        if (this.hasAttribute('color-accent')) this.color = this.getAttribute('color-accent');
        if (!this.hasAttribute('sidebar-direction')) this.setAttribute('sidebar-direction', 'left');
        if (!this.classList.contains('sidebar-hidden')) {
          this.setAttribute('sidebar-toggle', 'true');
        } else this.setAttribute('sidebar-toggle', 'false');
        this.onclick = e => {
            queryEach('side-bar > sidebar-item[selected]', this, el => {
              if(el !== e.target) el.removeAttribute('selected');
            });
            queryEach('sidebar-accordion[accordion="open"]', this, el => {
              if(el !== e.target && el !== e.target.parentNode) el.setAttribute('accordion', 'closed');
            });
        }
      },
      setToggleElement: function (SelectorOrNode) {
        let Toggle = Craft.resolveQueryOrNode(SelectorOrNode);
        this.open = true;
        On('click', Toggle, ev => {
          this.open = !this.open;
          this.setAttribute('sidebar-toggle', this.open.toString());
        });
      },
      toggle: function () {
        if (is.Undef(this.open)) this.open = true;
        this.open = !this.open;
        this.setAttribute('sidebar-toggle', this.open.toString());
      },
      attr: function (attrName, oldVal, newVal) {
        if (!this.classList.contains('sidebar-hidden')) {
          this.setAttribute('sidebar-toggle', 'true');
        } else this.setAttribute('sidebar-toggle', 'false');

      }
    });

    Craft.newComponent('sidebar-mainheading', {
      extends: 'div'
    });
    Craft.newComponent('sidebar-icon', {
      extends: 'span'
    });

    Craft.newComponent('sidebar-heading', {
      created: function () {
        if (this.hasAttribute('ripple')) this.color = this.getAttribute('ripple');
        if (this.hasAttribute('color-accent')) this.color = this.getAttribute('color-accent');
        if (query('sidebar-icon', this) !== null) query('sidebar-icon', this).style.color = this.color;
        setTimeout(() => {
          if (this.textContent.length > 40) this.style.height = 'auto';
        }, 50);
      },
      attr: function () {
        if (attrName === 'ripple') this.color = newVal;
        if (attrName === 'color-accent') this.color = newVal;
        if (query('sidebar-icon', this) !== null) query('sidebar-icon', this).style.color = this.color;
      }
    });

    Craft.newComponent('sidebar-item', {
      created: function () {
        if (this.hasAttribute('ripple')) this.color = this.getAttribute('ripple');
        if (this.hasAttribute('color-accent')) this.color = this.getAttribute('color-accent');
        this.style.borderColor = this.color;
        if (query('sidebar-icon', this) !== null) query('sidebar-icon', this).style.color = this.color;
        this.onclick = e => this.hasAttribute('selected') ? this.removeAttribute('selected') : setTimeout(() => this.setAttribute('selected', ''), 50);
      },
      attr: function (attrName, oldVal, newVal) {
        if (attrName === 'ripple' || attrName === 'color-accent') this.color = newVal;
        this.style.borderColor = this.color;
        if (query('sidebar-icon', this) !== null) query('sidebar-icon', this).style.color = this.color;
      }
    });

    Craft.newComponent('sidebar-accordion', {
      created: function () {
        this.open = false;
        if (this.getAttribute('accordion') === 'open') {
          this.open = true;
          this.setAttribute('accordion', 'open');
        } else {
          this.open = false;
          this.setAttribute('accordion', 'closed');
        }
        setTimeout(() => {
          let heading = query('sidebar-heading', this);
          heading.onclick = e => {
            this.open = !this.open;
            if(this.open === true) {
              setTimeout(() => this.setAttribute('accordion', 'open'), 50);
              this.style.height = ((queryAll('sidebar-item',this).length * 8.5) + 4) + "mm";
            } else {
              this.setAttribute('accordion', 'closed');
              this.style.height = '';
            }
          }
          this.onclick = e => queryEach('sidebar-item[selected]', this, el => {
              if(el !== e.target && e.target.tagName !== 'SIDEBAR-HEADING') el.removeAttribute('selected')
          });
          if (heading.hasAttribute('ripple')) this.color = heading.getAttribute('ripple');
          if (heading.hasAttribute('color-accent')) this.color = heading.getAttribute('color-accent');
          queryEach('sidebar-item', this, item => {
            if (is.Def(this.color)) item.setAttribute('color-accent', this.color)
          });
        }, 40);
      },
      attr: function () {
        if (this.getAttribute('accordion') === 'open') {
          this.open = true;
        } else this.open = false;
        if(this.open === true) {
          setTimeout(() => this.setAttribute('accordion', 'open'), 50);
          this.style.height = ((queryAll('sidebar-item',this).length * 8.5) + 4) + "mm";
        } else {
          this.setAttribute('accordion', 'closed');
          this.style.height = '';
        }
      }
    });
})();
