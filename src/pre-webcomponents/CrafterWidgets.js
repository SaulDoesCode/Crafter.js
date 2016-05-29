"use strict";
dom.ripple = attr => dom.element('ripple-effect', '', attr);
Craft.ripple = (selector, options) => queryEach(selector, element => {
    On(element).Mousedown(e => {
        if (e.buttons == 1) {
            let ripple = dom.ripple(options);
            ripple.Rx = e.clientX;
            ripple.Ry = e.clientY;
            ripple.appendTo(element);
        }
    })
});

Craft.newComponent('ripple-effect', {
    inserted() {
        let ripple = this,
            color, timing = ripple.getAttr("timing") || 1600,
            par = dom(ripple.parentNode),
            rect = par.getRect(),
            diameter = Math.max(rect.width, rect.height);
        if (ripple.hasAttr("color-accent")) color = ripple.getAttr("color-accent");
        else if (ripple.hasAttr("color")) color = ripple.getAttr("color");
        else if (par.hasAttr("color-accent")) color = par.getAttr("color-accent");

        ripple.css({
            width: diameter + 'px',
            height: diameter + 'px',
            backgroundColor: color || '',
            animation: `rippleanim ${timing}ms`
        }).removeAfter(timing).move(parseInt(ripple.Rx) - rect.left - (diameter / 2), parseInt(ripple.Ry) - rect.top - (diameter / 2), !1, !0);

    }
});

Craft.notification = (msg, state, side, duration) => {
    if (is.Num(state)) {
        side = state;
        duration = side;
        state = '';
    }

    if (is.int(side)) {
        if (is.String(side)) side = Number(side);
        side = side == 1 ? 'top-left' :
            side == 2 ? 'top-right' :
            side == 3 ? 'bottom-left' :
            side == 4 ? 'bottom-right' :
            side == 5 ? 'bottom-middle' :
            side == 6 ? 'top-middle' : 'top-left';
    }

    let host = query(`.notifications-${side}`);
    if (host == null) {
        document.body.insertBefore(dom.div('', `class=notifications-${side}`), document.body.firstChild);
        host = query(`.notifications-${side}`);
    }
    dom.element('craft-notification',msg, {
        duration,
        side,
        state
    }).appendTo(host);
}

Craft.newComponent('craft-notification', {
    inserted() {
        let note = this;
        if (note.hasAttr('duration') && parseInt(note.getAttr('duration'), 10) != 0) setTimeout(() => {
            note.remove()
        }, parseInt(note.getAttr('duration'), 10) || 3000);
        if (note.hasAttr('message')) note.html(note.getAttr('message'));
        note.append(dom.div('X', 'class=notification-close'));
        note.clickEvent = On('.notification-close', note).Click(e => {
            note.remove()
        });
    },
    destroyed() {
        this.clickEvent.Off
    }
})

let __ContextMenus = [];

Craft.newComponent('context-menu', {
    inserted() {
        let el = this;
        if (el.hasAttr('scope')) el.Contextmenu = On('contextmenu', el.getAttr('scope'), e => {
                el.Show(!0, e)
            });


        __ContextMenus.push(el);
    },
    destroyed() {
        __ContextMenus = Craft.omit(__ContextMenus, this);
        this.Contextmenu.Off
    },
    Show(Show, ev) {
        if (is.Def(ev)) ev.preventDefault();
        let el = this;
        Show ? el.addClass('context-menu-active').move((ev.clientX + 5), (ev.clientY + 5), !0) : el.stripClass('context-menu-active');
    }
});

Craft.newComponent('check-box', {
    inserted() {
        let el = this;
        el.check = el.Click(el.toggle.bind(el));
        el.colorAccent = color => {
            el.css({
                borderColor: color
            })
        }
    },
    set_value(val) {
        let el = this;
        el.toggleAttr('checked', val);
        if (is.Func(el.oncheck)) el.oncheck(el.value);
    },
    get_value() {
        return this.hasAttr('checked');
    },
    toggle(val) {
        this.value = is.Bool(val) ? val : !this.value
    },
    destroyed() {
        this.check.Off
    }
});

Craft.newComponent('toggle-button', {
    inserted() {
        let el = this;
        el.toggleAttr('on', el.hasAttr('on'));
        el.click = el.Click(el.toggle.bind(el));
        el.newSetGet('on', v => el.toggle(v), () => el.hasAttr('on'));
        el.append(dom.span('', 'class=toggle'));
    },
    set_ontoggle(func) {
        if (is.Func(func)) this.func = func;
    },
    toggle(on) {
        this.toggleAttr('on', is.Bool(on) ? on : void 0)
    },
    attr(name) {
        let el = this;
        if (name == 'on') el.func(el.hasAttr('on'))
    },
    destroyed() {
        this.click.Off
    }
});

Craft.newComponent('text-collapser', {
    inserted() {
        let el = this,
            txt = el.html();
        el.html("");
        el.append(dom.label(el.getAttr('summary'), 'class=indicator')).append(dom.label(txt, 'class=text'));
        el.newSetGet('open', val => el.toggleAttr('open', val), () => el.hasAttr('open'));
        el.onClick = On('.indicator', el).Click(e => {
            el.toggle()
        });
    },
    toggle(open) {
        this.open = is.Bool(open) ? open : !this.open;
    },
    attr(name, oldVal, newVal) {
        if (name === 'open') this.open = this.hasAttr('open');
    },
    destroyed() {
        this.onClick.Off
    }
});

let __InputAttributes = ["name", "pattern", "value", "max", "maxlength", "min", "minlength", "size", "autofocus", "autocomplete", "disabled", "form_id", "required"];

Craft.newComponent('material-input', {
    inserted() {
        let el = this,
            input = dom.input();
        el.html("");

        el.newSetGet('value', val => {
            input.Text(val)
                .toggleClass('inputhastext', input.value.length > 0 || input.value);
            labelEffects()
        }, () => input.value);

        el.hasAttr("type") ? ["submit", "button", "range"].some(v => el.getAttr("type") != v) ? input.setAttr("type", el.getAttr("type")) :
            console.warn("<material-input> is only for text type inputs it will default to text if wrong type is chosen") :
            input.setAttr("type", "text");

        forEach(__InputAttributes, attr => {
            if (el.hasAttr(attr)) input.setAttr(attr, el.getAttr(attr));
        });

        el.append(input, dom.span());
        input = dom('input', el);
        el.input = input;
        let clearText = query('span', el),
            lengthy,
            labelEffects = () => {
                lengthy = input.value.length > 0;
                input.toggleClass('inputhastext', !lengthy);
                clearText.style.display = lengthy ? 'block' : '';
                return el
            }

        el.onblur = labelEffects;

        if (el.hasAttr("label") || el.hasAttr("placeholder")) {
            let label = dom.label(el.getAttr("label") || el.getAttr("placeholder"));
            el.append(label);
            labelEffects();
        }

        el.OnInput = input.Input(e => {
            if (el.hasAttr("label") || el.hasAttr("placeholder")) labelEffects();
        });

        el.OnClick = On('span', el).Click(e => {
            el.value = '';
            labelEffects();
        });
        el.append(clearText);
    },
    attr(name, nv) {
        let el = this,
            input = el.input;
        if (is.Def(input)) {
            if (__InputAttributes.includes(name)) {
                if (el.hasAttr(name)) input.setAttr(name, nv);
                else if (input.hasAttr(i)) input.stripAttr(name);
            }
        }
    }
});

Craft.newComponent('radio-button', {
    created() {
        let element = this;

        if (element.hasAttr('name') || element.hasAttr('label')) element.append(dom.label(element.getAttr('name') || element.getAttr('label')));

        element.prepend(dom.span('', 'radio'));

        element.CheckGroup = active => {
            let Group = [];
            queryEach('radio-button', active.parentNode, rb => {
                if (rb.hasAttr('checked')) Group.push(rb);
            });
            if (Group.length > 1) forEach(Group, rb => {
                if (rb != active) rb.checked = false
            });
        }

        element.newSetGet('checked', val => {
            element.toggleAttr('checked', val);
            if (element.hasAttr('checked')) element.CheckGroup(element)
        }, () => element.hasAttr('checked'));


        element.Click(e => {
            element.checked = !element.checked
        })

    },
    attr(name) {
        let element = this;
        if (name === "checked" && element.hasAttr("checked")) element.CheckGroup(element);
        else if ((name === "name" || name === "label") && (element.hasAttr("name") || element.hasAttr("label"))) element.name = element.getAttr("name") || element.getAttr("label");
    }
});

On('blur', e => queryEach('context-menu', el => el.Show()));
On(document).Click(e => {
    if (e.target.parentNode.tagName !== 'CONTEXT-MENU' && e.target.tagName !== 'SECTION') forEach(__ContextMenus, el => el.Show());
});

Craft.customAttr('ripple', (el, color) => {
    if(color == '') color = el.getAttr('color-accent') || el.getAttr('color');
    Craft.ripple(el, {color});
});

Craft.customAttr('tooltip', (element, val) => {
    queryEach(`.craft-tooltip`, el => {
        if (el.owner == element) {
            el.owner.unobserve('ttObserve');
            forEach(el.EventListeners, ev => {
                ev.Off
            });
            el.remove();
        } else if (!is.Def(el.owner)) el.remove();
    });
    let show = !1,
        tooltip = dom
        .span(element.getAttr('tooltip') || '', `direction=${element.getAttr('tooltip-direction') || 'right'}&class=craft-tooltip`);

    tooltip.owner = element;
    tooltip.EventListeners = [];

    if (element.hasAttr('ripple')) tooltip.style.borderColor = element.getAttr('ripple');
    if (element.hasAttr('color-accent')) tooltip.style.borderColor = element.getAttr('color-accent');
    if (element.hasAttr('color')) tooltip.style.borderColor = element.getAttr('color');
    if(element.hasAttr('text-color')) tooltip.style.color = element.getAttr('text-color');

    tooltip.mover = element.Mousemove(e => {
        tooltip.move(e.clientX, e.clientY)
    }).Off;

    function toggleTT() {
        tooltip.style.display = show ? 'block' : 'none';
        setTimeout(() => {
            tooltip.style.opacity = show ? '1' : '0'
        }, 10);
    }

    tooltip.EventListeners.push(element.Mouseenter(ev => {
        show = !0;
        tooltip.mover.On;
        if (ev.target !== element || ev.target.parentNode !== element) element.hasAttr('tooltip-delay') ?
            setTimeout(toggleTT, parseInt(element.getAttr('tooltip-delay'))) :
            toggleTT();

    }));
    tooltip.EventListeners.push(element.Mouseleave(ev => {
        show = !1;
        tooltip.mover.Off;
        toggleTT()
    }));

    element.observe((mut, type) => {
        if (type === 'attributes') {
            let name = mut.attributeName;
            if (name === 'tooltip' && element.hasAttr('tooltip')) tooltip.html(element.getAttr('tooltip'));
            else if (name === 'tooltip-delay' && element.hasAttr('tooltip-delay')) setTimeout(() => {
                tooltip.style.display = show ? 'block' : 'none';
                setTimeout(() => {
                    tooltip.style.opacity = show ? '1' : '0'
                }, 10);
            }, parseInt(element.getAttr('tooltip-delay')));
            else if (name === 'tooltip-direction' && element.hasAttr('tooltip-direction')) tooltip.setAttr('direction', element.getAttr('tooltip-direction') || 'right');
            else if (!element.hasAttr('tooltip')) {
                element.unobserve('ttObserve');
                if (is.Def(tooltip.EventListeners)) forEach(tooltip.EventListeners, ev => {
                    ev.Off
                });
                tooltip.remove()
            }
        }
    }, {
        attributes: !0
    }, 'ttObserve');

    tooltip.appendTo(document.body);
});

Craft.customAttr('movable', element => {
    element.style.position = 'fixed';

    let rect = element.getRect(),
        movehandle = query('[movehandle]', element),
        cx = 0,
        cy = 0,
        move = On(window).Mousemove(e => {
          element.move(e.clientX - cx + rect.left, e.clientY - cy + rect.top)
        }).Off;

    On(movehandle == null ? element : movehandle).Mousedown(e => {
        if (e.button == 1 || e.buttons == 1) {
            rect = element.getRect();
            cx = e.clientX;
            cy = e.clientY;
            move.On
        }
    });

    On(document).Mouseup(e => {
        move.Off
    });
})
