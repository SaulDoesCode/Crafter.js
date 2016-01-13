"use strict";
((doc, root) => {

  Craft.ripple = (SelectorOrNode, options) => queryEach(SelectorOrNode, element => On(element).Mousedown(e => {
    let ripple = dom().element('ripple-effect', '', options);
    ripple.Rx = e.clientX;
    ripple.Ry = e.clientY;
    element.appendChild(ripple);
  }));

  Craft.newComponent('ripple-effect', {
    inserted() {
      let ripple = dom(this),
        color, timing = ripple.hasAttr("timing") ? ripple.getAttr("timing") : 1600,
        rect = this.parentNode.getBoundingClientRect(),
        diameter = Math.max(rect.width, rect.height);
      if (ripple.parentNode.hasAttribute("ripple")) color = ripple.parentNode.getAttr("ripple");
      else if (ripple.hasAttr("color-accent")) color = ripple.getAttr("color-accent");
      else if (ripple.hasAttr("color")) color = ripple.getAttr("color");

      ripple.css({
          width: diameter + 'px',
          height: diameter + 'px',
          backgroundColor: color || '',
          animation: `ripple ${timing}ms ease`
        })
        .move(parseInt(ripple.Rx) - rect.left - (diameter / 2), parseInt(ripple.Ry) - rect.top - (diameter / 2), false, true)
        .removeAfter(timing + 10);
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
      side = side === 1 ? 'top-left' :
        side === 2 ? 'top-right' :
        side === 3 ? 'bottom-left' :
        side === 4 ? 'bottom-right' :
        side === 5 ? 'bottom-middle' :
        side === 6 ? 'top-middle' : 'top-left';
    }

    let host = query(`.notifications-${side}`);
    if (host === null) {
      doc.body.insertBefore(dom().div('', `class=notifications-${side}`), doc.body.firstChild);
      host = query(`.notifications-${side}`);
    }
    host.appendChild(dom().element('craft-notification', msg, {
      duration: duration,
      side: side,
      state: state
    }));
  }

  Craft.newComponent('craft-notification', {
    inserted() {
        let note = dom(this);
        if (note.hasAttr('duration') && parseInt(note.getAttr('duration'), 10) !== 0) setTimeout(() => note.remove(), parseInt(note.getAttr('duration'), 10) || 3000);
        if (note.hasAttr('message')) note.html(note.getAttr('message'));
        note.append(dom().div('X', 'class=notification-close'));
        this.clickEvent = On('.notification-close', this).Click(e => this.remove());
      },
      destroyed() {
        this.clickEvent.Off();
      }
  })

  var ContextMenus = [];

  Craft.newComponent('context-menu', {
    inserted() {
        let el = dom(this);

        Object.defineProperty(this, 'show', {
          set: function (val) {
            Craft.mouse.observe(Show);
            setTimeout(() => val ? el.addClass('context-menu-active').move((Craft.mouse.x + 5), (Craft.mouse.y + 5)) : el.stripClass('context-menu-active'), 50);
            Craft.mouse.observe(false);
          },
          get: () => el.gotClass('context-menu-active')
        });

        el.hasAttr('scope') ? this.Contextmenu = On('contextmenu', el.getAttr('scope'), e => this.Show(true, e)) : console.error('context-menu : No Scope Attribute found');
        ContextMenus.push(this);
      },
      destroyed() {
        ContextMenus = Craft.omit(ContextMenus, this);
        this.Contextmenu.Off();
      },
      Show(Show, ev) {
        if (is.Def(ev)) ev.preventDefault();
        let el = dom(this);
        Show ? el.addClass('context-menu-active').move((ev.clientX + 5), (ev.clientY + 5),true) : el.stripClass('context-menu-active');
      }
  });

  Craft.newComponent('check-box', {
    created() {
        let el = dom(this);
        el.Click = On(el).Click(e => el.value = !el.value);

        Object.defineProperty(this, 'value', {
          set: val => {
            el.toggleAttr('checked', val);
            if (is.Func(el.func)) el.func(el.hasAttr('checked'));
          },
          get: () => el.hasAttr('checked')
        });
      },
      toggle(val) {
        this.value = is.Bool(val) ? val : !this.value;
      },
      OnCheck(func) {
        if (is.Func(func)) this.func = func;
      },
      destroyed() {
        this.Click.Off();
      }
  });

  Craft.newComponent('toggle-button', {
    created() {
        let el = dom(this),
          t = 'true',
          f = 'false';
        el.open ? el.setAttr('open', t) : el.setAttr('open', f);
        this.click = On(this).Click(e => {
          this.open = !this.open;
          el.setAttr('open', this.open ? t : f);
        });
        el.append(dom().span('', 'class=toggle'));
      },
      onToggle(func) {
        if (is.Func(func)) this.func = func;
      },
      toggle(open) {
        open === true || (is.Undef(open) && this.getAttribute('open') === 'false') ? this.setAttribute('open', 'true') : this.setAttribute('open', 'false');
      },
      attr(attrName, oldVal, newVal) {
        if (attrName === 'open') {
          this.open = this.getAttribute('open') === 'true';
          if (is.Func(this.func)) this.func(this.open);
        }
      },
      destroyed() {
        this.click.Off();
      }
  });

  Craft.newComponent('grid-host', {
    extends : 'div'
  });

  Craft.newComponent('text-collapser', {
    created() {
        let el = dom(this),
          txt = el.html();
        el.html("");

        el.append(dom().label(el.getAttr('summary'), 'class=indicator'));
        el.append(dom().label(txt, 'class=text'));

        Object.defineProperty(this, 'open', {
          get: () => el.hasAttr('open'),
          set: val => el.toggleAttr('open', val)
        });

        this.onClick = On('.indicator', this).Click(e => this.toggle());
      },
      toggle(open) {
        this.open = is.Bool(open) ? open : !this.open;
      },
      attr(name, oldVal, newVal) {
        if (name === 'open') this.open = this.hasAttribute('open');
      },
      destroyed() {
        this.onClick.Off();
      }
  });

  let InputAttributes = ["name", "pattern", "value", "max", "maxlength", "min", "minlength", "size", "autofocus", "autocomplete", "disabled", "form_id", "required"];

  Craft.newComponent('material-input', {
    inserted() {
        let el = dom(this),
          input = dom(dom().input());
        el.html("");

        if (el.hasAttr("type")) {
          if (el.getAttr("type") !== "submit" && el.getAttr("type") !== "button" && el.getAttr("type") !== "range") {
            input.setAttr("type", el.getAttr("type"));
          } else console.warn("<material-input> is only for text type inputs it will default to text if wrong type is chosen");
        } else input.setAttr("type", "text");

        forEach(InputAttributes, attr => {
          if (el.hasAttr(attr)) input.setAttr(attr, el.getAttr(attr));
        });

        el.append(input);
        el.append(dom().span());
        input = dom(el.query('input'));
        let clearText = query('span', this);

        this.labelEffects = () => {
          if (this.value.length > 0) {
            input.addClass('inputhastext');
            clearText.style.display = 'block';
          } else {
            input.stripClass('inputhastext');
            clearText.style.display = '';
          }
        }

        this.onblur = this.labelEffects;

        if (el.hasAttr("label") || el.hasAttr("placeholder")) {
          let label = dom().label();
          label.innerHTML = el.getAttr("label") || el.getAttr("placeholder");
          el.append(label);
          this.labelEffects();
        }

        this.OnInput = On(input).Input(e => {
          if (el.hasAttr("label") || el.hasAttr("placeholder")) this.labelEffects();
        });

        this.OnClick = On('span', this).Click(e => {
          this.value = '';
          this.labelEffects();
        });

        el.append(clearText);
      },
      attr(attrName, oldVal, newVal) {
        let el = dom(this),
          input = dom('input', el);
        InputAttributes.forEach(i => {
          if (i === attrName) {
            if (el.hasAttr(i)) input.setAttr(i, newVal);
            else if (input.hasAttr(i) && !el.hasAttr(i)) input.stripAttr(i, newVal);
          }
        });
      },
      set value(val) {
        let input = dom('input', this);
        input.text(val);
        input.value.length > 0 || input.value == ' ' ? input.addClass('inputhastext') : input.stripClass('inputhastext');
      },
      get value() {
        return query('input', this).value;
      }
  });

  Craft.newComponent('radio-button', {
    created() {
        let element = dom(this);

        if (element.hasAttr('name') || element.hasAttr('label')) element.append(dom().label(element.getAttr('name') || element.getAttr('label')));

        element.prepend(dom().span('', 'radio'));

        this.CheckGroup = active => {
          let Group = [];
          queryEach('radio-button', active.parentNode, rb => {
            if (rb.hasAttribute('checked')) Group.push(rb);
          });
          if (Group.length > 1) Group.forEach(rb => {
            if (rb !== active) rb.checked = false;
          });
        }

        On(this).Click(e => element.checked = !element.checked);

        Object.defineProperty(this, 'checked', {
          set: val => {
            element.toggleAttr('checked', val);
            if (element.hasAttr('checked')) element.CheckGroup(element);
          },
          get: () => element.hasAttr('checked')
        });

      },
      attr(name) {
        if (name === "checked" && this.hasAttribute("checked")) this.CheckGroup(this);
        else if ((name === "name" || name === "label") && (this.hasAttribute("name") || this.hasAttribute("label"))) this.name = this.getAttribute("name") || this.getAttribute("label");
      }
  });

  On('blur', e => queryEach('context-menu', el => el.Show()));
  On(doc).Click(e => {
    if (e.target.parentNode.tagName !== 'CONTEXT-MENU' && e.target.tagName !== 'SECTION') ContextMenus.forEach(el => el.Show());
  });

  Craft.WidgetWatchers = element => {
    if (element.hasAttr('ripple')) Craft.ripple(element);
    if (element.hasAttr('tooltip')) {
      queryEach(`[owner="${element.parentNode.tagName}${element.tagName}${element.className}"]`, el => {
        if (is.Def(el.TooltipOwnerObserver)) el.TooltipOwnerObserver.disconnect();
        if (is.Def(el.EventListeners)) el.EventListeners.forEach(ev => ev.Off());
        el.remove();
      });
      let show = false,
      tooltip = dom().span('', `direction=${element.hasAttr('tooltip-direction') ? element.getAttr('tooltip-direction') : 'right'}&class=craft-tooltip`);

      tooltip.EventListeners = [];
      tooltip.textContent = element.getAttr('tooltip');
      tooltip.setAttribute('owner', `${element.parentNode.tagName}${element.tagName}${element.className}`);
      if (element.hasAttr('ripple')) tooltip.style.borderColor = element.getAttr('ripple');
      if (element.hasAttr('color-accent')) tooltip.style.borderColor = element.getAttr('color-accent');

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
          if (element.hasAttr('tooltip-delay')) setTimeout(() => {
            tooltip.style.display = show ? 'block' : 'none';
            setTimeout(() => tooltip.style.opacity = show ? '1' : '0', 10);
          }, parseInt(element.getAttr('tooltip-delay')));
          else {
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

      tooltip.hostObserver = new MutationObserver(mutations => {
        mutations.forEach(mut => {
          if (mut.type === 'attributes') {
            if (mut.attributeName === 'tooltip' && element.hasAttr('tooltip')) {
              tooltip.innerHTML = element.getAttr('tooltip');
            } else if (mut.attributeName === 'tooltip-delay' && element.hasAttr('tooltip-delay')) {
              setTimeout(() => {
                tooltip.style.display = show ? 'block' : 'none';
                setTimeout(() => tooltip.style.opacity = show ? '1' : '0', 10);
              }, parseInt(element.getAttr('tooltip-delay')));
            } else if (mut.attributeName === 'tooltip-direction' && element.hasAttr('tooltip-direction')) {
              tooltip.setAttribute('direction', element.getAttr('tooltip-direction'));
            } else if (!element.hasAttr('tooltip')) {
              if (is.Def(tooltip.hostObserver)) tooltip.hostObserver.disconnect();
              if (is.Def(tooltip.EventListeners)) tooltip.EventListeners.forEach(ev => ev.Off());
              tooltip.remove();
            }
          }
        });
      });
      tooltip.hostObserver.observe(element, {
        attributes: true
      });

      doc.body.appendChild(tooltip);
    }
    if (element.hasAttr('movable')) {
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
        }, 5);
      });

      On(doc).Mouseup(e => movable = false);
    }
  }

})(document, window);
