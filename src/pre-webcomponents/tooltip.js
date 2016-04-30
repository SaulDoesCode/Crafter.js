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
        tooltip = dom()
        .span(element.getAttr('tooltip') || '', {
            direction: element.getAttr('tooltip-direction') || 'right',
            class: 'craft-tooltip'
        });

    tooltip.owner = element;
    tooltip.EventListeners = [];

    if (element.hasAttr('ripple')) tooltip.style.borderColor = element.getAttr('ripple');
    if (element.hasAttr('color-accent')) tooltip.style.borderColor = element.getAttr('color-accent');

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
        if (ev.target != element || ev.target.parentNode != element) element.hasAttr('tooltip-delay') ?
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
            else if (name === 'tooltip-delay' && element.hasAttr('tooltip-delay')) setTimeout(toggleTT, parseInt(element.getAttr('tooltip-delay')));
            else if (name === 'tooltip-direction' && element.hasAttr('tooltip-direction')) tooltip.setAttr('direction', element.getAttr('tooltip-direction') || 'right');
            else if (!element.hasAttr('tooltip')) {
                element.unobserve('ttObserve');
                forEach(tooltip.EventListeners, ev => {
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
