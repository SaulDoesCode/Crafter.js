Craft.exec(function () {
    "use strict";
    let {
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
            if (element.ripplehandle) element.ripplehandle.off;
        }
    });

    Craft.newComponent('ripple-effect', {
        inserted() {
            let ripple = this,
                color, timing = ripple.getAttr("timing") || ripple.timing || 1600,
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
            }).move(parseInt(ripple.Rx) - rect.left - (diameter / 2), parseInt(ripple.Ry) - rect.top - (diameter / 2), !1, !0);
            anime({
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
            dom(document.body).prepend(dom.div('', `class=notifications-${side}`));
            host = query(`.notifications-${side}`);
        }
        dom.element('craft-notification', msg, {
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
            note.clickEvent = on('.notification-close', note).Click(e => {
                note.remove()
            });
        },
        destroyed() {
            this.clickEvent.off
        }
    })

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
            this.check.off
        }
    });

    Craft.newComponent('toggle-button', {
        inserted() {
            let el = this;
            el.tclick = el.Click(el.toggle.bind(el));
            el.toggleAttr('on', el.hasAttr('on')).append(dom.span('', 'class=toggle'));
        },
        set_ontoggle(func) {
            if (is.Func(func)) this.togglefunc = func;
        },
        toggle(on) {
            let el = this;
            el.toggleAttr('on', is.Bool(on) ? on : void 0);
            if (is.Def(el.togglefunc)) el.togglefunc(el.on);
        },
        set_on(v) {
            this.toggle(v);
        },
        get_on() {
            return this.hasAttr('on')
        },
        destroyed() {
            this.tclick.off
        }
    });

    Craft.newComponent('text-collapser', {
        inserted() {
            let el = this,
                txt = el.html();
            el.html("");
            el.append(dom.label(el.getAttr('summary'), 'class=indicator')).append(dom.label(txt, 'class=text'));
            el.newSetGet('open', val => el.toggleAttr('open', val), () => el.hasAttr('open'));
            el.onClick = on('.indicator', el).Click(e => {
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
            this.onClick.off
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

            let itype = el.getAttr("type");
            !is.Null(itype) ? ["submit", "button", "range"].some(v => itype != v) ? input.setAttr("type", itype) :
                console.warn("<material-input> is only for text type inputs it will default to text if wrong type is chosen") :
                input.setAttr("type", "text");

            __InputAttributes.forEach(attr => {
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
                let Group = [];
                queryEach('radio-button', active.parentNode, rb => {
                    if (rb.hasAttr('checked')) Group.push(rb);
                });
                if (Group.length > 1) Group.forEach(rb => {
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
        attr(name, val, oldval, hasAttr) {
            let element = this;
            if (name === "checked" && hasAttr) element.CheckGroup(element);
            else if ((name === "name" || name === "label") && (element.hasAttr("name") || element.hasAttr("label"))) element.name = element.getAttr("name") || element.getAttr("label");
        }
    });

    Craft.directive('tooltip', {
        bind(element, val) {
            queryEach(`.craft-tooltip`, el => {
                if (el.owner == element) {
                    el.EventListeners.forEach(ev => {
                        ev.off
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

            tooltip.mover = element.Mousemove(e => {
                tooltip.move(e.clientX, e.clientY)
            }).off;

            function toggleTT() {
                tooltip.style.display = show ? 'block' : 'none';
                setTimeout(() => {
                    tooltip.style.opacity = show ? '1' : '0'
                }, 10);
            }

            tooltip.EventListeners.push(element.Mouseenter(ev => {
                show = !0;
                tooltip.mover.on;
                if (ev.target !== element || ev.target.parentNode !== element) element.hasAttr('tooltip-delay') ?
                    setTimeout(toggleTT, parseInt(element.getAttr('tooltip-delay'))) :
                    toggleTT();

            }));
            tooltip.EventListeners.push(element.Mouseleave(ev => {
                show = !1;
                tooltip.mover.off;
                toggleTT()
            }));

            element.observeAttrs((name, val, oldval, hasAttr) => {
                if (name === 'tooltip' && hasAttr) tooltip.html(val);
                else if (name === 'tooltip' && !hasAttr) {
                    if (is.Def(tooltip.EventListeners)) tooltip.EventListeners.forEach(ev => {
                        ev.off;
                    });
                    tooltip.remove()
                } else if (name === 'tooltip-delay' && hasAttr) setTimeout(toggleTT, parseInt(element.getAttr('tooltip-delay')));
                else if (name === 'tooltip-direction' && hasAttr) tooltip.setAttr('direction', val || 'right');
            });

            tooltip.appendTo(document.body);
        }
    });

    Craft.directive('movable', {
        bind(element) {
            element.style.position = 'fixed';
            element.mlisteners = [];
            let rect = element.getRect(),
                movehandle = query('[movehandle]', element),
                cx = 0,
                cy = 0,
                move = on(window).Mousemove(e => {
                    element.move(e.clientX - cx + rect.left, e.clientY - cy + rect.top)
                }).off;

            element.mlisteners.push(on(movehandle == null ? element : movehandle).Mousedown(e => {
                if (e.button == 1 || e.buttons == 1) {
                    rect = element.getRect();
                    cx = e.clientX;
                    cy = e.clientY;
                    move.on
                }
            }));

            element.mlisteners.push(on(document).Mouseup(e => {
                move.off
            }));
        },
        unbind(element) {
          element.mlisteners.forEach(hndl => {
            hndl.off;
          });
          delete element.mlisteners;
        }
    });

});
