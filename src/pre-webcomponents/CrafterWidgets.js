"use strict";
((doc,root) => {
  Craft.ripple = function (SelectorOrNode, options) {
    if(is.Null(SelectorOrNode)) throw new Error('null selector or node/nodelist');
    options = options || {};
    let color = options.color || undefined,
    timing = options.timing || 1600;
    queryEach(SelectorOrNode, element => {
      if (element.hasAttribute("ripple")) color = element.getAttribute("ripple");
      element.onmousedown = e => {
        let circle = doc.createElement('div'),
          rect = element.getBoundingClientRect(),
          diameter = Math.max(rect.width, rect.height),
          x = e.clientX - rect.left - (diameter / 2),
          y = e.clientY - rect.top - (diameter / 2);
        circle.classList.add('circle');
        circle.style.width = diameter + "px";
        circle.style.height = diameter + "px";
        circle.style.top = y + "px";
        circle.style.left = x + "px";
        circle.style.animation = "ripple " + timing + "ms ease";

        if (is.Def(color)) circle.style.backgroundColor = color;
        element.insertBefore(circle, element.firstChild);
        if (is.Def(circle)) setTimeout(() => circle.remove(), timing);
      }
      element.onmouseup = e => queryEach('.circle', element, Childcircle => {
        if (!is.Null(Childcircle)) setTimeout(() => Childcircle.remove(), timing);
      });
    });
  }

  Craft.easing = {
    InOutQuad: (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    },
  }

  Craft.notification = (msg,state,duration,side) => {
    if(is.Num(state)) {
      duration = state;
      side = duration;
    }
    if(query('.notification-host') === null) doc.body.appendChild(make_element('div','','class=notification-host',true));
    dom('.notification-host').append(make_element('craft-notification',msg,{
      duration : duration || 600,
      state : is.Num(state) ? '' : state,
      side : side
    },true));
  }

  Craft.JumpTo = function (target, options) {
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

  Craft.newComponent('craft-notification',{
    created : function() {
      if(this.hasAttribute('duration')) setTimeout(() => this.remove(), parseInt(this.getAttribute('duration'),10) || 600);
      if(this.hasAttribute('message')) this.innerHTML = this.getAttribute('message');
      dom(this).append(dom().div('X','class=notification-close'));
      this.clickEvent = On('click',query('.notification-close',this),e => this.remove());
    },
    destroyed : function () {
      this.clickEvent.Off();
    }
  })

  Craft.newComponent('context-menu', {
    created: function () {
      this.show = false;
      let scope = Array.from(queryAll(this.getAttribute('scope')));
      if (this.hasAttribute('scope') && queryAll(this.getAttribute('scope')) !== null) {
        forEach(queryAll(this.getAttribute('scope')), el => {
          el.oncontextmenu = ev => {
            ev.preventDefault();
            this.Show(true, ev);
          }
        });
      } else console.error('no scope elements/attribute found on context-menu element \n can\' operate without a scope');
    },
    destroyed: function () {
      queryEach(this.getAttribute('scope'), el => el.oncontextmenu = null)
    },
    Show: function (Show, ev) {
      if (Show) {
        this.classList.add('context-menu-active');
        this.style.left = (ev.clientX + 5) + 'px';
        this.style.top = (ev.clientY + 5) + 'px';
        this.show = true;
      } else if (this.classList.contains('context-menu-active')) {
        this.classList.remove('context-menu-active');
        this.show = false;
      }
    }
  });

  Craft.newComponent('grid-host',{
    extends : 'div'
  });
  Craft.newComponent('grid-row',{
    extends : 'div'
  });

  On('blur', e => queryEach('context-menu', el => el.Show()));
  On('click', doc, e => {
    if (is.Node(e.target, e.target.parentNode) && e.target.tagName !== 'SECTION' && e.target.parentNode.tagName !== 'CONTEXT-MENU') queryEach('context-menu', el => el.Show());
  });

  On('animationstart', doc, e => {
    if (e.animationName === 'NodeInserted' && is.Node(e.target)) {
      let element = e.target;
      if (element.hasAttribute('ripple')) Craft.ripple(element);
      if (element.hasAttribute('tooltip')) {
        queryEach(`[owner="${e.target.parentNode.tagName.toLowerCase()} ${e.target.tagName.toLowerCase()} ${e.target.className}"]`, el => el.remove());
        let show = false,
          tooltip = doc.createElement('span');
        tooltip.appendChild(doc.createElement('label'));
        tooltip.innerHTML += element.getAttribute('tooltip');
        tooltip.setAttribute('owner', `owner="${e.target.parentNode.tagName} ${e.target.tagName} ${e.target.className}"`);
        if (element.hasAttribute('ripple')) tooltip.style.borderColor = element.getAttribute('ripple');
        if (element.hasAttribute('color-accent')) tooltip.style.borderColor = element.getAttribute('color-accent');

        if (element.hasAttribute('tooltip-diion')) {
          let diion = element.getAttribute('tooltip-diion');
          if (diion === 'left') {
            tooltip.classList.add('craft-tooltip-left');
          } else if (diion === 'down') {
            tooltip.classList.add('craft-tooltip-down');
          } else if (diion === 'up') tooltip.classList.add('craft-tooltip-up');
        } else tooltip.classList.add('craft-tooltip');

        let moveTooltip = () => {
          let movecheck = setInterval(() => {
            if (show) {
              tooltip.style.left = Craft.mouse.x + 'px';
              tooltip.style.top = Craft.mouse.y + 'px';
            } else clearInterval(movecheck);
          }, 5);
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
            if (movable) {
              element.style.left = Craft.mouse.x - e.clientX + rect.left + "px";
              element.style.top = Craft.mouse.y - e.clientY + rect.top + "px";
            } else clearInterval(move);
          }, 4);
        });

        On('mouseup', doc, e => movable = false);
      }
    }
  });
})(document,window);
