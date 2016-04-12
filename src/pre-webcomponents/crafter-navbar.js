Craft.newComponent('crafter-navbar', {
    inserted() {

        let el = this;

        el.newSetGet('active', select => {
            dom('navbar-item',el).stripAttr('selected');
            try {
                el.navItems[select].setAttr('selected')
            } catch (e) {
                console.warn('No such navbar-item')
            }
        }, () => el.queryAll('navbar-item').indexOf(el.query('navbar-item[selected]')))

        el.newSetGet('navItems', x => {}, () => el.queryAll('navbar-item'));

        if (el.hasAttr('select')) el.active = Craft.toInt(el.getAttr('select')) - 1;
        if (!el.hasAttr('direction')) el.setAttr('direction', 'left');


        el.Click = el.On('click', e => {
            if (is.Node(e.target) && e.target.tagName === 'NAVBAR-ITEM' || e.target.parentNode.tagName === 'NAVBAR-ITEM') el.active = el.navItems.indexOf(e.target)
        });

        el.Wheel = el.On('wheel', e => {
            let tempVal = el.active, nvi = el.navItems;
            (e.deltaY < 1) ? tempVal-- : tempVal++;
            e.preventDefault();
            if (tempVal >= nvi.length) tempVal = 0;
            else if (tempVal < 0) tempVal = nvi.length - 1;
            el.active = tempVal;
        });

    },
    attr(attrName, ov, nv) {
        let el = this;
        if (attrName === 'select' && el.hasAttr('select')) {
            let num = Craft.toInt(nv);
            if (!is.int(nv)) console.warn('crafter-navbar - the selected attribute is not an integer defaulting to 1');
            else if (el.active !== num && (num >= (el.navItems.length + 1) === !1) && (num <= (el.navItems.length + 1) === !1)) el.selected = num;
            else console.warn("crafter-navbar - selected attribute out of range");
        } else if (attrName === 'direction' && !el.hasAttr('direction')) el.setAttr('direction', 'left');
    },
    destroyed() {
        this.Click.Off;
        this.Wheel.Off;
    }
});

Craft.newComponent('navbar-item', {
    inserted() {
        let el = this,
            r = 'ripple';
        if (el.hasAttr(r)) el.css({
            borderColor: el.getAttr(r),
            color: el.hasAttr('selected') ? el.getAttr(r) : ''
        });
    },
    attr(name, oldVal, newVal) {
        let el = this,
            r = 'ripple',
            s = 'selected';
        if (name === r && el.hasAttr(r)) el.style.borderColor = newVal;
        if (name === s && el.hasAttr(s)) {
            if (el.hasAttr(r)) el.style.color = el.getAttr(r);
            if (is.Func(el.onactive)) el.onactive()
        } else if (!el.hasAttr(s)) el.style.color = '';
    }
});
