(function () {
        const {
            is,
            dom,
            queryEach,
            on,
            forEach,

        } = this;

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
                    tooltip.mover.on;
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
})();
