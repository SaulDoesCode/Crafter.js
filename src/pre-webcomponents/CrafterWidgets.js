"use strict";
((doc, root) => {

  Craft.ripple = (SelectorOrNode, options) => queryEach(SelectorOrNode, element => element.onmousedown = e => element.appendChild(Craft.make_element('ripple-effect', '', options || {}, true, {
    x: e.clientX,
    y: e.clientY
  })));

  Craft.newComponent('ripple-effect', {
    inserted() {
      let color, timing = this.hasAttribute("timing") ? this.getAttribute("timing") : 1600,
        rect = this.parentNode.getBoundingClientRect(),
        diameter = Math.max(rect.width, rect.height);
      if (this.parentNode.hasAttribute("ripple")) color = this.parentNode.getAttribute("ripple");
      else if (this.hasAttribute("color-accent")) color = this.getAttribute("color-accent");
      else if (this.hasAttribute("color")) color = this.getAttribute("color");

      dom(this).css({
        width: diameter + 'px',
        height: diameter + 'px',
        animation: `ripple ${timing}ms ease`
      }).move(parseInt(this.getAttribute('x')) - rect.left - (diameter / 2), parseInt(this.getAttribute('y')) - rect.top - (diameter / 2));

      if (is.Def(color)) this.style.backgroundColor = color;
      setTimeout(() => this.remove(), timing);
    }
  });

  Craft.notification = (msg, state, side, duration) => {
    if (query('.notifications-top-left') === null) doc.body.insertBefore(dom().div('', 'class=notifications-top-left', true), doc.body.firstChild);
    if (query('.notifications-top-right') === null) doc.body.insertBefore(dom().div('', 'class=notifications-top-right', true), doc.body.firstChild);
    if (query('.notifications-top-middle') === null) doc.body.insertBefore(dom().div('', 'class=notifications-top-middle', true), doc.body.firstChild);
    if (query('.notifications-bottom-middle') === null) doc.body.insertBefore(dom().div('', 'class=notifications-bottom-middle', true), doc.body.firstChild);
    if (query('.notifications-bottom-right') === null) doc.body.insertBefore(dom().div('', 'class=notifications-bottom-right', true), doc.body.firstChild);
    if (query('.notifications-bottom-left') === null) doc.body.insertBefore(dom().div('', 'class=notifications-bottom-left', true), doc.body.firstChild);
    if (is.Num(state)) {
      side = state;
      duration = side;
      state = '';
    }
    if (is.Num(side)) {
      if (side === 1) side = 'top-left';
      else if (side === 2) side = 'top-right';
      else if (side === 3) side = 'bottom-left';
      else if (side === 4) side = 'bottom-right';
      else if (side === 5) side = 'bottom-middle';
      else if (side === 6) side = 'top-middle';
      else {
        duration = side;
        side = 'top-left';
      }
    };

    query(`.notifications-${side}`).appendChild(Craft.make_element('craft-notification', msg, {
      duration: duration || 0,
      side: side,
      state: state
    }, true));
  }

  Craft.newComponent('craft-notification', {
    inserted() {
        if (this.hasAttribute('duration') && parseInt(this.getAttribute('duration'), 10) !== 0) setTimeout(() => this.remove(), parseInt(this.getAttribute('duration'), 10));
        if (this.hasAttribute('message')) this.innerHTML = this.getAttribute('message');
        this.appendChild(dom().div('X', 'class=notification-close', true));
        this.clickEvent = On('.notification-close', this).Click(e => this.remove());
      },
      destroyed() {
        let side = this.getAttribute('side');
        this.clickEvent.Off();
      }
  })

  var ContextMenus = [];

  Craft.newComponent('context-menu', {
    inserted() {
        this.show = false;
        dom(this).hasAttr('scope') ? this.contextmenuEvent = On('contextmenu', dom(this).getAttr('scope'), e => this.Show(true, e)) : console.error('no scope elements/attribute found on context-menu element \n can\' operate without a scope');
        ContextMenus.push(this);
      },
      destroyed() {
        ContextMenus = Craft.omit(ContextMenus, this);
        this.contextmenuEvent.Off();
      },
      Show(Show, ev) {
        let manip = dom(this);
        if (is.Def(ev)) ev.preventDefault();
        if (Show) {
          manip.addClass('context-menu-active');
          manip.move((ev.clientX + 5), (ev.clientY + 5));
          this.show = true;
        } else if (manip.gotClass('context-menu-active')) {
          manip.stripClass('context-menu-active');
          this.show = false;
        }
      }
  });

  Craft.newComponent('check-box', {
    created() {
        this.Check();
        this.OnClick = On(this).Click(e => {
          this.value = !this.value;
          this.Check();
        });
      },
      toggle(checked) {
        checked === true || (is.Undef(this.value) && this.getAttribute('checked') === 'false') ? this.setAttribute('checked', 'true') : this.setAttribute('checked', 'false');
      },
      OnCheck(func) {
        if (is.Func(func)) this.func = func;
      },
      setValue(val) {
        this.value = val;
      },
      Check() {
        if (is.Undef(this.value) && this.hasAttribute("checked")) {
          let checked = this.getAttribute("checked");
          if (checked === "true") this.value = true;
          if (checked === "false") this.value = false;
        } else this.value ? this.setAttribute("checked", "true") : this.setAttribute("checked", "false");
        if (is.Func(this.func)) this.func(this.value);
      },
      attr(attrName, oldVal, newVal) {
        if (attrName === "checked") this.Check();
      },
      destroyed() {
        this.OnClick.Off();
      }
  });

  Craft.newComponent('toggle-button', {
    created() {
        this.open ? this.setAttribute('open', 'true') : this.setAttribute('open', 'false');
        this.click = On(this).Click(e => {
          this.open = !this.open;
          this.open ? this.setAttribute('open', 'true') : this.setAttribute('open', 'false');
        });
        this.appendChild(dom().span('', 'class=toggle', true));
      },
      onToggle(func) {
        if (is.Func(func)) this.func = func;
      },
      toggle(open) {
        open === true || (is.Undef(open) && this.getAttribute('open') === 'false') ? this.setAttribute('open', 'true') : this.setAttribute('open', 'false');
      },
      attr(attrName, oldVal, newVal) {
        if (attrName === 'open') {
          this.getAttribute('open') === 'true' ? this.open = true : this.open = false;
          if (is.Func(this.func)) this.func(this.open);
        }
      },
      destroyed() {
        this.click.Off();
      }
  });

  Craft.newComponent('grid-host', {
    extends: 'div'
  });
  Craft.newComponent('grid-row', {
    extends: 'div'
  });

  Craft.newComponent('text-collapser', {
    created() {
        let txt = this.innerHTML;
        this.innerHTML = "";

        this.appendChild(dom().label(this.hasAttribute('summary') ? `&#9654; \t ${this.getAttribute('summary')}` : '&#9654;', 'id=indicator', true));
        this.appendChild(dom().label(txt, 'id=text', true));
        this.hasAttribute('open') ? this.open = true : this.open = false;

        this.OnClick = On('click', '#indicator', this, e => this.toggle());
      },
      toggle(open) {
        is.Def(open) ? this.open = open : this.open = !this.open;
        this.open ? this.setAttribute('open', '') : this.removeAttribute('open');
      },
      attr(name, oldVal, newVal) {
        if (name === 'open') this.hasAttribute('open') ? this.open = true : this.open = false;
      },
      destroyed() {
        this.OnClick.Off();
      }
  });

  let InputAttributes = ["name", "pattern", "value", "max", "maxlength", "min", "minlength", "size", "autofocus", "autocomplete", "disabled", "form_id", "required"];

  Craft.newComponent('material-input', {
    inserted() {
        let clearText = dom().span(),
          manip = dom(this),
          input = Craft.make_element("input", '', 'type=text', true);
        this.value = "";
        this.innerHTML = "";

        if (manip.hasAttr("type")) {
          if (manip.getAttr("type") !== "submit" && manip.getAttr("type") !== "button" && manip.getAttr("type") !== "range") {
            input.setAttribute("type", manip.getAttr("type"));
          } else console.warn("<material-input> is only for text type inputs not buttons,ranges,submits it will default to text if wrong type is chosen");
        } else input.setAttribute("type", "text");

        for (let attr in InputAttributes) {
          if (manip.hasAttr(InputAttributes[attr])) input.setAttribute(InputAttributes[attr], manip.getAttr(InputAttributes[attr]));
        }

        this.appendChild(input);

        this.labelEffects = () => {
          if (manip.query('input').value.length > 0) {
            manip.query('input').classList.add('inputhastext');
            manip.query('span').style.display = 'inline-block';
          } else if (manip.query('input').classList.contains('inputhastext')) {
            manip.query('input').classList.remove('inputhastext');
            manip.query('span').style.display = 'none';
          }
        }

        this.onblur = this.labelEffects();

        if (manip.hasAttr("label") || manip.hasAttr("placeholder")) {
          let label = dom().label();
          label.innerHTML = manip.getAttr("label") || manip.getAttr("placeholder");
          this.appendChild(label);
          this.labelEffects();
        }

        this.OnInput = On('input', this).Input(Craft.throttle(100, e => {
          this.value = manip.query('input').value;
          if (manip.hasAttr("label")) this.labelEffects();
        }));

        this.OnClick = On(clearText).Click(e => {
          input.value = '';
          this.labelEffects();
        });

        manip.append(clearText);
      },
      attr(attrName, oldVal, newVal) {
        let mnp = dom(this);
        InputAttributes.some(el => {
          if (el === attrName) {
            if (mnp.hasAttr(el)) {
              query('input', this).setAttribute(el, newVal);
            } else if (query('input', this).hasAttribute(el) && !mnp.hasAttr(el)) query('input', this).removeAttribute(el, newVal);
          }
        });
      }
  });

  On('blur', e => queryEach('context-menu', el => el.Show()));
  On(doc).Click(e => {
    if (e.target.parentNode.tagName !== 'CONTEXT-MENU' && e.target.tagName !== 'SECTION') ContextMenus.forEach(el => el.Show());
  });

  On('animationstart', doc, e => {
    if (e.animationName === 'NodeInserted' && is.Node(e.target)) {
      let element = e.target;
      if (element.hasAttribute('ripple')) Craft.ripple(element);
      if (element.hasAttribute('tooltip')) {
        queryEach(`[owner="${e.target.parentNode.tagName}${e.target.tagName}${e.target.className}"]`, el => {
          if (is.Def(el.TooltipOwnerObserver)) el.TooltipOwnerObserver.disconnect();
          if (is.Def(el.EventListeners)) el.EventListeners.forEach(ev => ev.Off());
          el.remove();
        });
        let show = false,
          tooltip = dom().span('', element.hasAttribute('tooltip-direction') ? `direction=${element.getAttribute('tooltip-direction')}&class=craft-tooltip` : 'direction=right&class=craft-tooltip', true);

        tooltip.EventListeners = [];
        tooltip.innerHTML = element.getAttribute('tooltip');
        tooltip.setAttribute('owner', `${e.target.parentNode.tagName}${e.target.tagName}${e.target.className}`);
        if (element.hasAttribute('ripple')) tooltip.style.borderColor = element.getAttribute('ripple');
        if (element.hasAttribute('color-accent')) tooltip.style.borderColor = element.getAttribute('color-accent');

        let moveTooltip = () => {
          let movecheck = setInterval(() => {
            Craft.mouse.observe(show);
            show ? dom(tooltip).move(Craft.mouse.x, Craft.mouse.y) : clearInterval(movecheck);
          }, 5);
        }

        tooltip.EventListeners.push(On(element).Mouseenter(ev => {
          show = true;
          moveTooltip();
          if (ev.target !== element || ev.target.parentNode !== element) {
            tooltip.style.display = show ? 'block' : 'none';
            setTimeout(() => tooltip.style.opacity = show ? '1' : '0', 10);
          } else {
            if (element.hasAttribute('tooltip-delay')) {
              setTimeout(() => {
                tooltip.style.display = show ? 'block' : 'none';
                setTimeout(() => tooltip.style.opacity = show ? '1' : '0', 10);
              }, parseInt(element.getAttribute('tooltip-delay')))
            } else {
              tooltip.style.display = show ? 'block' : 'none';
              setTimeout(() => tooltip.style.opacity = show ? '1' : '0', 10);
            }
          }
        }));
        tooltip.EventListeners.push(On(element).Mouseleave(ev => {
          show = false;
          tooltip.style.display = show ? 'block' : 'none';
          setTimeout(() => tooltip.style.opacity = show ? '1' : '0', 10);
        }));

        tooltip.TooltipOwnerObserver = new MutationObserver(mutations => {
          mutations.forEach(mut => {
            if (mut.type === 'attributes') {
              if (mut.attributeName === 'tooltip' && element.hasAttribute('tooltip')) {
                tooltip.innerHTML = element.getAttribute('tooltip');
              } else if (mut.attributeName === 'tooltip-delay' && element.hasAttribute('tooltip-delay')) {
                setTimeout(() => {
                  tooltip.style.display = show ? 'block' : 'none';
                  setTimeout(() => tooltip.style.opacity = show ? '1' : '0', 10);
                }, parseInt(element.getAttribute('tooltip-delay')));
              } else if (mut.attributeName === 'tooltip-direction' && element.hasAttribute('tooltip-direction')) {
                tooltip.setAttribute('direction', element.getAttribute('tooltip-direction'));
              } else if (!element.hasAttribute('tooltip')) {
                if (is.Def(tooltip.TooltipOwnerObserver)) tooltip.TooltipOwnerObserver.disconnect();
                if (is.Def(tooltip.EventListeners)) tooltip.EventListeners.forEach(ev => ev.Off());
                tooltip.remove();
              }
            }
          });
        });
        tooltip.TooltipOwnerObserver.observe(element, {
          attributes: true
        });

        doc.body.appendChild(tooltip);
      }
      if (element.hasAttribute('movable')) {
        element.style.position = 'absolute';
        let move, rect,
          movable = false,
          movehandle = query('[movehandle]', element);

        On(movehandle === null ? element : movehandle).Mousedown(e => {
          movable = true;
          rect = element.getBoundingClientRect();
          move = setInterval(() => {
            Craft.mouse.observe(movable);
            movable ? dom(element).move(Craft.mouse.x - e.clientX + rect.left, Craft.mouse.y - e.clientY + rect.top) : clearInterval(move);
          },5);
        });

        On(doc).Mouseup(e => movable = false);
      }
    }
  });
})(document, window);
