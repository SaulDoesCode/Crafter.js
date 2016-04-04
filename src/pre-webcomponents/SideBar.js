"use strict";
(() => {
    Craft.newComponent('side-bar', {
        inserted() {
            let el = this;
            if (!el.hasAttr('sidebar-direction')) el.setAttr('sidebar-direction', 'left');
            if (el.hasAttr('color-accent')) el.color = el.getAttr('color-accent');
            if (el.hasAttr('toggle-element')) el.setToggleElement(el.getAttr('toggle-element'));
            el.onClick = el.Click(e => {
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
                s.func(!s.hasAttr('hidden'));
            }
            s.onToggleClick = On(selector).Click(e => {
                s.toggle()
            });
        },
        toggle(open) {
            let el = this,
                sbt = 'hidden',
                gotSBT = el.hasAttr(sbt);
            is.Def(open) ? open ? el.stripAttr(sbt) : el.setAttr(sbt, '') :
                gotSBT ? el.stripAttr(sbt) : el.setAttr(sbt);
        },
        attr(name) {
            if (name === 'hidden' && is.Func(el.func)) this.func(!this.hasAttr('hidden'))
        },
        destroyed() {
            this.onClick.Off;
            this.onToggleClick.Off;
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
            let el = this;
            if (el.hasAttr('ripple')) {
                el.color = el.getAttr('ripple');
                if (!is.Array(el.customAttr)) el.customAttr = [];
                if (!el.customAttr.includes('ripple') && is.Def(Craft.ripple)) {
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
            let el = this;
            if (el.hasAttr('ripple')) el.color = el.getAttr('ripple');
            if (el.hasAttr('color-accent')) el.color = el.getAttr('color-accent');
            else if (el.parentNode.firstChild.hasAttribute('ripple')) el.parentNode.firstChild.color = el.getAttr('ripple');
            else if (el.parentNode.firstChild.hasAttribute('color-accent')) el.parentNode.firstChild.color = el.getAttr('color-accent');

            el.style.borderColor = el.color;
            if (query('sidebar-icon', el) !== null) query('sidebar-icon', el).style.color = el.color;
            el.Onclick = el.Click(e => {
                el.hasAttr('selected') ? el.stripAttr('selected') : setTimeout(() => {
                    el.setAttr('selected')
                }, 50)
            });
        },
        attr(attrName, oldVal, newVal) {
            let el = this;
            if (attrName == 'ripple' || attrName == 'color-accent') el.color = newVal;
            el.style.borderColor = el.color;
            let sb = query('sidebar-icon', el);
            if (sb != null) sb.style.color = el.color
        },
        destroyed() {
            this.Onclick.Off
        }
    });

    Craft.newComponent('sidebar-accordion', {
        inserted() {
            let el = this;
            el.open = el.getAttr('accordion') === 'open';
            el.setAttr('accordion', el.open ? 'open' : 'closed');
            setTimeout(() => {
                let heading = dom('sidebar-heading', el);
                if (is.Node(heading)) {
                    el.headingclick = On(heading).Click(e => {
                        el.open = !el.open;
                        setTimeout(() => el.setAttr('accordion', el.open ? 'open' : 'closed'), 50);
                        el.style.height = el.open ? ((queryAll('sidebar-item', el).length * 8.5) + 12) + "mm" : '';
                    });
                    if (heading.hasAttr('ripple')) el.color = heading.getAttr('ripple');
                    if (heading.hasAttr('color-accent')) el.color = heading.getAttr('color-accent');
                }
                el.Click = On('click', el, e => queryEach('sidebar-item[selected]', el, s => {
                    if (s !== e.target && e.target.tagName != 'SIDEBAR-HEADING') s.stripAttr('selected');
                }));
                queryEach('sidebar-item', el, item => {
                    if (is.Def(el.color)) item.setAttribute('color-accent', el.color);
                });
            }, 40);
        },
        attr() {
            let el = this;
            el.open = el.getAttr('accordion') === 'open';
            setTimeout(() => el.setAttr('accordion', el.open ? 'open' : 'closed'), 50);
            el.style.height = el.open ? ((queryAll('sidebar-item', el).length * 8.5) + 12) + "mm" : '';
        },
        destroyed() {
            let s = this;
            s.headingclick.Off;
            s.Click.Off;
        }
    });
})();
