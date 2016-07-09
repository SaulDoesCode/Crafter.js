(function (root) {
    "use strict";
    const {
        on,
        once,
        dom,
        is,
        query,
        queryEach,
        queryAll
    } = Craft;

    dom.ripple = attr => dom.element('ripple-effect', '', attr);
    Craft.ripple = (selector, options) => queryEach(selector, element => {
        element.ripplehandle = on(element).Mousedown(e => {
            if (e.buttons == 1) {
                let ripple = dom.ripple(options);
                ripple.Rx = e.clientX;
                ripple.Ry = e.clientY;
                ripple.appendTo(element);
            }
        });
    });

    Craft.directive('ripple', {
        bind(el, color) {
            if (color == '') color = el.getAttr('color-accent') || el.getAttr('color');
            Craft.ripple(el, {
                color
            });
        },
        unbind(element) {
            if (element.ripplehandle) element.ripplehandle.off();
        }
    });

    Craft.newComponent('ripple-effect', {
        inserted() {
            let ripple = this,
                color, timing = Number(ripple.getAttr("ripple-timing")) || ripple.timing || 1600,
                par = dom(ripple.parentNode),
                rect = par.getRect(),
                diameter = Math.max(rect.width, rect.height);
            if (ripple.hasAttr('color')) color = ripple.getAttr('color');
            else if (par.hasAttr("color-accent")) color = par.getAttr("color-accent");
            ripple.css({
                width: diameter + 'px',
                height: diameter + 'px',
                backgroundColor: color || '',
            }).move(parseInt(ripple.Rx) - rect.left - (diameter / 2), parseInt(ripple.Ry) - rect.top - (diameter / 2), !1, !0);
            Craft.animation({
                targets: ripple,
                scale: [0, 2.5],
                opacity: [.7, 0],
                duration: timing,
                easing: 'easeInSine',
                complete() {
                    ripple.remove()
                }
            });
        }
    });

    Craft.newComponent('check-box', {
        inserted() {
            let el = this;
            el.Click(el.toggle.bind(el));
            el.colorAccent = color => {
                el.css({
                    borderColor: color
                });
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
        }
    });

    Craft.newComponent('toggle-button', {
        inserted() {
            let el = this;
            el.Click(el.toggle.bind(el));
            el.toggleAttr('on', el.hasAttr('on')).append(dom.span('', 'class=toggle'));
        },
        toggle(on) {
            let el = this;
            el.toggleAttr('on', is.Bool(on) ? on : undefined).state.emit('toggle',this.toggled);
        },
        set_toggled(v) {
            this.toggle(v);
        },
        set_toggled() {
            return this.hasAttr('on');
        }
    });

    Craft.newComponent('text-collapser', {
        inserted() {
            let el = this,
                txt = el.html();
            el.html("");
            el.append(dom.label(el.getAttr('summary'), 'class=indicator')).append(dom.label(txt, 'class=text'));
            el.newSetGet('open', val => el.toggleAttr('open', val), () => el.hasAttr('open'));
            on('.indicator', el).Click(e => {
                el.toggle()
            });
            el.lifecycle.attr('open',(name,v,ov,hasAttr) => {
              el.open = hasAttr;
            });
        },
        toggle(open) {
            this.open = is.Bool(open) ? open : !this.open;
            this.state.emit('toggle',this.open);
        }
    });

    const __InputAttributes = ["name", "pattern", "value", "max", "maxlength", "min", "minlength", "size", "autofocus", "autocomplete", "disabled", "form_id", "required"];

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

            let itype = el.getAttr("type");
            !is.Null(itype) ? ["submit", "button", "range"].some(v => itype != v) ? input.setAttr("type", itype) :
                console.warn("<material-input> is only for text type inputs it will default to text if wrong type is chosen") :
                input.setAttr("type", "text");

            __InputAttributes.map(attr => {
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
                dom.label(el.getAttr("label") || el.getAttr("placeholder")).appendTo(el);
                labelEffects();
            }

            el.onInput = input.Input(e => {
                if (el.hasAttr("label") || el.hasAttr("placeholder")) labelEffects();
            });

            el.onClick = on('span', el).Click(e => {
                el.value = '';
                labelEffects();
            });
            el.append(clearText);
        },
        attr(name, nv, ov, hasAttr) {
            let el = this,
                input = el.input;
            if (is.Def(input)) {
                if (__InputAttributes.includes(name)) {
                    if (hasAttr) input.setAttr(name, nv);
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
                const Group = [];
                queryEach('radio-button', active.parentNode, rb => {
                    if (rb.hasAttr('checked')) Group.push(rb);
                });
                if (Group.length > 1) Group.map(rb => {
                    if (rb != active) rb.checked = false
                });
            }

            element.newSetGet('checked', val => {
                element.toggleAttr('checked', val);
                if (element.hasAttr('checked')) element.CheckGroup(element)
            }, () => element.hasAttr('checked'));


            element.Click(e => {
                element.checked = !element.checked
            });
        },
        attr(name, val, oldval, hasAttr) {
            let element = this;
            if (name === "checked" && hasAttr) element.CheckGroup(element);
            else if ((name === "name" || name === "label") && (element.hasAttr("name") || element.hasAttr("label"))) element.name = element.getAttr("name") || element.getAttr("label");
        }
    });

    Craft.directive('tooltip', {
        bind(element, val) {
            queryEach(`.craft-tooltip`, el => {
                if (el._owner == element) {
                    el.EventListeners.map(ev => {
                        ev.off();
                    });
                    el.remove();
                } else if (!is.Def(el._owner)) el.remove();
            });
            let show = !1,
                tooltip = dom
                .span(element.getAttr('tooltip') || '', `direction=${element.getAttr('tooltip-direction') || 'right'}&class=craft-tooltip`);

            tooltip._owner = element;
            tooltip.EventListeners = [];

            if (element.hasAttr('ripple')) tooltip.style.borderColor = element.getAttr('ripple');
            if (element.hasAttr('color-accent')) tooltip.style.borderColor = element.getAttr('color-accent');

            tooltip.mover = element.Mousemove(e => {
                tooltip.move(e.clientX, e.clientY)
            }).off();

            function toggleTT() {
                tooltip.style.display = show ? 'block' : 'none';
                setTimeout(() => {
                    tooltip.style.opacity = show ? '1' : '0'
                }, 10);
            }

            tooltip.EventListeners.push(element.Mouseenter(ev => {
                show = !0;
                tooltip.mover.on();
                if (ev.target !== element || ev.target.parentNode !== element) element.hasAttr('tooltip-delay') ?
                    setTimeout(toggleTT, parseInt(element.getAttr('tooltip-delay'))) :
                    toggleTT();

            }));
            tooltip.EventListeners.push(element.Mouseleave(ev => {
                show = !1;
                tooltip.mover.off();
                toggleTT()
            }));

            element.lifecycle.attr((name, val, oldval, hasAttr) => {
                if (name === 'tooltip' && hasAttr) tooltip.html(val);
                else if (name === 'tooltip' && !hasAttr) {
                    if (is.Def(tooltip.EventListeners)) tooltip.EventListeners.map(ev => {
                        ev.off();
                    });
                    tooltip.remove()
                } else if (name === 'tooltip-delay' && hasAttr) setTimeout(toggleTT, parseInt(element.getAttr('tooltip-delay')));
                else if (name === 'tooltip-direction' && hasAttr) tooltip.setAttr('direction', val || 'right');
            });

            tooltip.appendTo(document.body);
        }
    });

})(this);
