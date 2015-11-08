"use strict";

(document => {
  Craft.WigetsDefined = true;

  window.Ripple = function (SelectorOrNode, options) {
    var color = options.color || undefined,
      timing = options.timing || 1000;
    SelectorOrNode = Array.from((is.String(SelectorOrNode) ? queryAll(SelectorOrNode) : is.NodeList(SelectorOrNode) ? SelectorOrNode : [SelectorOrNode]));
    SelectorOrNode.forEach(element => {
      if (element.hasAttribute("ripple")) color = element.getAttribute("ripple");
      element.onmousedown = e => {
        var circle = document.createElement('div'),
          Dimentions = element.getBoundingClientRect(),
          diameter = Math.max(Dimentions.width, Dimentions.height),
          x = e.clientX - Dimentions.left - (diameter / 2),
          y = e.clientY - Dimentions.top - (diameter / 2);
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
      element.onmouseup = e => forEach(queryAll('.circle', element), Childcircle => {
        if (Childcircle !== null) setTimeout(() => Childcircle.remove(), timing);
      });
    });
  }

  Craft.newComponent('context-menu', {
    created: function () {
      this.show = false;
      var scope = Array.from(queryAll(this.getAttribute('scope')));
      if (this.hasAttribute('scope') && queryAll(this.getAttribute('scope')) !== null) {
        forEach(queryAll(this.getAttribute('scope')), el => {
          el.oncontextmenu = ev => {
            ev.preventDefault();
            this.Show(true, ev);
          }
        });
      } else log('err', 'no scope elements/attribute found on context-menu element \n can\' operate without a scope');
    },
    destroyed: function () {
      forEach(queryAll(this.getAttribute('scope')), el => el.oncontextmenu = null);
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

  On('hashchange', e => {
    forEach(queryAll('context-menu'), el => el.Show());
    forEach(queryAll('[ripple]'), el => Ripple(el, {}))
  });
  On('blur', e => forEach(queryAll('context-menu'), el => el.Show()));
  On('click', document, e => {
    if (is.Node(e.target) && !is.Null(e.target, e.target.parentNode) && e.target.tagName !== 'SECTION' && e.target.parentNode.tagName !== 'CONTEXT-MENU') forEach(queryAll('context-menu'), el => el.Show());
  });

  On('DOMContentLoaded', e => forEach(queryAll('[ripple]'), el => Ripple(el, {})));

  On('animationstart', document, e => {
    if (e.animationName === 'nodeInserted' && is.Node(e.target)) {
      var element = e.target;
      if (e.target.hasAttribute('tooltip')) {
        forEach(queryAll(`[owner="${e.target.tagName} ${e.target.className}"]`), el => {
          el.remove()
        });
        var show = false,
          tooltip = document.createElement('span');
        tooltip.appendChild(document.createElement('label'));
        tooltip.innerHTML += element.getAttribute('tooltip');
        tooltip.setAttribute('owner', element.tagName + " " + element.className);
        if (element.hasAttribute('ripple')) tooltip.style.borderColor = element.getAttribute('ripple');

        if (element.getAttribute('tooltip-direction') === 'left') {
          tooltip.classList.add('craft-tooltip-left');
        } else {
          tooltip.classList.add('craft-tooltip');
        }
        var MoveElement = () => {
          var movecheck = setInterval(() => {
            if (show) {
              tooltip.style.left = Craft.mouse.x + 'px';
              tooltip.style.top = Craft.mouse.y + 'px';
            } else clearInterval(movecheck);
          }, 5);
        }

        element.onmouseenter = ev => {
          show = true;
          MoveElement();
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
        document.body.appendChild(tooltip);
      }
      if (e.target.hasAttribute('movable')) {

        var MoveElement = () => {
          var movecheck = setInterval(() => {
            if (elementinfo.movable) {
              element.style.left = (Craft.mouse.x - (elementinfo.mouseX - elementinfo.rect.left)) + 'px';
              element.style.top = (Craft.mouse.y - (elementinfo.mouseY - elementinfo.rect.top)) + 'px';
            } else clearInterval(movecheck);
          }, 5);
        }

        element.style.position = 'absolute';
        var elementinfo = {
          movable: false,
          rect: element.getBoundingClientRect(),
          mouseX: Craft.mouse.x,
          mouseY: Craft.mouse.y
        }
        var movehandle = query('[movehandle]', element);
        On('mousedown', ((movehandle !== null) ? movehandle : element), e => {
          elementinfo.movable = true;
          elementinfo.rect = element.getBoundingClientRect()
          elementinfo.mouseX = e.clientX;
          elementinfo.mouseY = e.clientY;
          MoveElement();
        });

        On('mouseup', document, e => elementinfo.movable = false);
      }
    }
  });

})(document);
