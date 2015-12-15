"use strict";
((doc, root) => {
  if (query('.notification-host') === null) doc.body.appendChild(dom().div('', 'class=notification-host', true));

  Craft.ripple = (SelectorOrNode, options) => {
    if (is.Null(SelectorOrNode)) throw new Error('null selector/node/nodelist');
    queryEach(SelectorOrNode, element => element.onmousedown = e => element.appendChild(make_element('ripple-effect', '', options || {}, true)));
  }

  Craft.newComponent('ripple-effect', {
    inserted() {
      let color, timing = 1600,
        x = parseInt(this.getAttribute('x')),
        y = parseInt(this.getAttribute('y')),
        element = this.parentNode,
        ripple = this;
      if (element.hasAttribute("ripple")) color = element.getAttribute("ripple");
      if (ripple.hasAttribute("color-accent")) color = ripple.getAttribute("color-accent");
      if (ripple.hasAttribute("timing")) timing = ripple.getAttribute("timing");
      let rect = element.getBoundingClientRect(),
        diameter = Math.max(rect.width, rect.height);
      dom(ripple).css({
        width: diameter + 'px',
        height: diameter + 'px',
        left: Craft.mouse.x - rect.left - (diameter / 2) + 'px',
        top: Craft.mouse.y - rect.top - (diameter / 2) + 'px',
        animation: 'ripple ' + timing + 'ms ease'
      });
      if (is.Def(color)) ripple.style.backgroundColor = color;
      setTimeout(() => ripple.remove(), timing);
    }
  });

  Craft.easing = {
    InOutQuad: (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    },
  }

  Craft.notification = (msg, state, duration, side) => {
    if (is.Num(state)) {
      duration = state;
      side = duration;
    }
    dom('.notification-host').append(make_element('craft-notification', msg, {
      duration: duration || 600,
      state: is.Num(state) ? '' : state,
      side: side
    }, true));
  }

  Craft.JumpTo = (target, options) => {
    options = options || {};
    options.duration = options.duration || 400;
    options.offset = options.offset || 0;
    options.callback = options.callback || undefined;

    let startTime, elapsedTime, start = root.pageYOffset,
      distance = is.String(target) ? options.offset + query(target).getBoundingClientRect().top : target,
      loopIteration = 0,
      loop = time => {
        if (loopIteration === 0) startTime = time;
        loopIteration++;
        elapsedTime = time - startTime;
        root.scrollTo(0, Craft.easing.InOutQuad(elapsedTime, start, distance, options.duration));
        elapsedTime < options.duration ? requestAnimationFrame(time => loop(time)) : (() => {
          root.scrollTo(0, start + distance);
          if (is.Func(options.callback)) options.callback.call();
          startTime = undefined;
        })();
      };
    requestAnimationFrame(time => loop(time))
  }

  Craft.newComponent('craft-notification', {
    created() {
        if (dom(this).hasAttr('duration')) setTimeout(() => this.remove(), parseInt(dom(this).getAttr('duration'), 10) || 600);
        if (dom(this).hasAttr('message')) this.innerHTML = dom(this).getAttr('message');
        dom(this).append(dom().div('X', 'class=notification-close'));
        this.clickEvent = On('click', '.notification-close', this, e => this.remove());
      },
      destroyed() {
        this.clickEvent.Off();
      }
  })

  var ContextMenus = [];

  Craft.newComponent('context-menu', {
    created() {
        this.show = false;
        dom(this).hasAttr('scope') ? this.contextmenuEvent = On('contextmenu', dom(this).getAttr('scope'), e => this.Show(true, e)) : console.error('no scope elements/attribute found on context-menu element \n can\' operate without a scope');
        ContextMenus.push(this);
      },
      destroyed() {
        ContextMenus = Craft.omit(ContextMenus, this);
        this.contextmenuEvent.Off();
      },
      Show(Show, ev) {
        if (is.Def(ev)) ev.preventDefault();
        if (Show) {
          dom(this).addClass('context-menu-active');
          dom(this).css({
            left: (ev.clientX + 5) + 'px',
            top: (ev.clientY + 5) + 'px'
          });
          this.show = true;
        } else if (dom(this).gotClass('context-menu-active')) {
          dom(this).stripClass('context-menu-active');
          this.show = false;
        }
      }
  });

  Craft.newComponent('grid-host', {
    extends: 'div'
  });
  Craft.newComponent('grid-row', {
    extends: 'div'
  });

  On('blur', e => queryEach('context-menu', el => el.Show()));
  On('click', doc, e => {
    if (e.target.parentNode.tagName !== 'CONTEXT-MENU' && e.target.tagName !== 'SECTION') forEach(ContextMenus, el => el.Show());
  });

  On('animationstart', doc, e => {
    if (e.animationName === 'NodeInserted' && is.Node(e.target)) {
      let element = e.target;
      if (element.hasAttribute('ripple')) Craft.ripple(element);
      if (element.hasAttribute('tooltip')) {
        queryEach(`[owner="${e.target.parentNode.tagName.toLowerCase()} ${e.target.tagName.toLowerCase()} ${e.target.className}"]`, el => el.remove());
        let show = false,
          tooltip = dom().span(dom().label(''), {}, true);
        tooltip.innerHTML += element.getAttribute('tooltip');
        tooltip.setAttribute('owner', `owner="${e.target.parentNode.tagName} ${e.target.tagName} ${e.target.className}"`);
        if (element.hasAttribute('ripple')) tooltip.style.borderColor = element.getAttribute('ripple');
        if (element.hasAttribute('color-accent')) tooltip.style.borderColor = element.getAttribute('color-accent');

        if (element.hasAttribute('tooltip-direction')) {
          let direction = element.getAttribute('tooltip-direction');
          if (direction === 'left') tooltip.classList.add('craft-tooltip-left');
          else if (direction === 'down') tooltip.classList.add('craft-tooltip-down');
          else if (direction === 'up') tooltip.classList.add('craft-tooltip-up');
        } else tooltip.classList.add('craft-tooltip');

        let moveTooltip = () => {
          let movecheck = setInterval(() => show ? dom(tooltip).css({
            left: Craft.mouse.x + 'px',
            top: Craft.mouse.y + 'px'
          }) : clearInterval(movecheck), 5);
        }

        element.onmouseenter = ev => {
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
        }
        element.onmouseleave = e => {
          show = false;
          tooltip.style.display = show ? 'block' : 'none';
          setTimeout(() => tooltip.style.opacity = show ? '1' : '0', 10);
        }
        doc.body.appendChild(tooltip);
      }
      if (element.hasAttribute('movable')) {
        element.style.position = 'absolute';
        let move, rect,
          movable = false,
          movehandle = query('[movehandle]', element);

        On('mousedown', is.Null(movehandle) ? element : movehandle, e => {
          movable = true;
          rect = element.getBoundingClientRect();
          move = setInterval(() => {
            movable ? dom(element).css({
              left: Craft.mouse.x - e.clientX + rect.left + "px",
              top: Craft.mouse.y - e.clientY + rect.top + "px"
            }) : clearInterval(move);
          }, 4);
        });

        On('mouseup', doc, e => movable = false);
      }
    }
  });
})(document, window);
