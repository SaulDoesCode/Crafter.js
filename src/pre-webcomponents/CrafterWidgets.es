"use strict";

(function (document) {
  Craft.WigetsDefined = true;

  self.Ripple = function (SelectorOrNode) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var color = options.color || undefined,
        timing = options.timing || 1000;
    SelectorOrNode = Array.from(is.String(SelectorOrNode) ? queryAll(SelectorOrNode) : is.NodeList(SelectorOrNode) ? SelectorOrNode : [SelectorOrNode]);
    SelectorOrNode.forEach(function (element) {
      if (element.hasAttribute("ripple")) color = element.getAttribute("ripple");
      element.onmousedown = function (e) {
        var circle = document.createElement('div'),
            Dimentions = element.getBoundingClientRect(),
            diameter = Math.max(Dimentions.width, Dimentions.height),
            x = e.clientX - Dimentions.left - diameter / 2,
            y = e.clientY - Dimentions.top - diameter / 2;
        circle.classList.add('circle');

        circle.style.width = diameter + "px";
        circle.style.height = diameter + "px";
        circle.style.top = y + "px";
        circle.style.left = x + "px";
        circle.style.animation = "ripple " + timing + "ms ease";

        if (is.Def(color)) circle.style.backgroundColor = color;
        element.insertBefore(circle, element.firstChild);
        if (is.Def(circle)) setTimeout(function () {
          return circle.remove();
        }, timing);
      };
      element.onmouseup = function (e) {
        return forEach(queryAll('.circle', element), function (Childcircle) {
          if (!is.Null(Childcircle)) setTimeout(function () {
            return Childcircle.remove();
          }, timing);
        });
      };
    });
  };

  Craft.newComponent('context-menu', {
    created: function created() {
      var _this = this;

      this.show = false;
      var scope = Array.from(queryAll(this.getAttribute('scope')));
      if (this.hasAttribute('scope') && queryAll(this.getAttribute('scope')) !== null) {
        forEach(queryAll(this.getAttribute('scope')), function (el) {
          el.oncontextmenu = function (ev) {
            ev.preventDefault();
            _this.Show(true, ev);
          };
        });
      } else log('err', 'no scope elements/attribute found on context-menu element \n can\' operate without a scope');
    },
    destroyed: function destroyed() {
      forEach(queryAll(this.getAttribute('scope')), function (el) {
        return el.oncontextmenu = null;
      });
    },
    Show: function Show(_Show, ev) {
      if (_Show) {
        this.classList.add('context-menu-active');
        this.style.left = ev.clientX + 5 + 'px';
        this.style.top = ev.clientY + 5 + 'px';
        this.show = true;
      } else if (this.classList.contains('context-menu-active')) {
        this.classList.remove('context-menu-active');
        this.show = false;
      }
    }
  });

  On('blur', function (e) {
    return forEach(queryAll('context-menu'), function (el) {
      return el.Show();
    });
  });
  On('click', document, function (e) {
    if (is.Node(e.target, e.target.parentNode) && e.target.tagName !== 'SECTION' && e.target.parentNode.tagName !== 'CONTEXT-MENU') forEach(queryAll('context-menu'), function (el) {
      return el.Show();
    });
  });
  var element = undefined;
  On('animationstart', document, function (e) {
    if (e.animationName === 'nodeInserted' && is.Node(e.target)) {
      element = e.target;
      if (element.hasAttribute('ripple')) Ripple(element);
      if (element.hasAttribute('tooltip')) {
        (function () {
          forEach(queryAll("[owner=\"" + e.target.parentNode.tagName.toLowerCase() + " " + e.target.tagName.toLowerCase() + " " + e.target.className + "\"]"), function (el) {
            return el.remove();
          });
          var show = false,
              tooltip = document.createElement('span');
          tooltip.appendChild(document.createElement('label'));
          tooltip.innerHTML += element.getAttribute('tooltip');
          tooltip.setAttribute('owner', "owner=\"" + e.target.parentNode.tagName + " " + e.target.tagName + " " + e.target.className + "\"");
          if (element.hasAttribute('ripple')) tooltip.style.borderColor = element.getAttribute('ripple');
          if (element.hasAttribute('color-accent')) tooltip.style.borderColor = element.getAttribute('color-accent');

          if (element.hasAttribute('tooltip-direction')) {
            var direction = element.getAttribute('tooltip-direction');
            if (direction === 'left') {
              tooltip.classList.add('craft-tooltip-left');
            } else if (direction === 'down') {
              tooltip.classList.add('craft-tooltip-down');
            } else if (direction === 'up') tooltip.classList.add('craft-tooltip-up');
          } else tooltip.classList.add('craft-tooltip');

          var moveTooltip = function moveTooltip() {
            var movecheck = setInterval(function () {
              if (show) {
                tooltip.style.left = Craft.mouse.x + 'px';
                tooltip.style.top = Craft.mouse.y + 'px';
              } else clearInterval(movecheck);
            }, 5);
          };

          element.onmouseenter = function (ev) {
            show = true;
            moveTooltip();
            if (ev.target !== element || ev.target.parentNode !== element) {
              tooltip.style.display = show ? 'block' : 'none';
              setTimeout(function () {
                return tooltip.style.opacity = show ? '1' : '0';
              }, 10);
            } else {
              if (element.hasAttribute('tooltip-delay')) {
                setTimeout(function () {
                  tooltip.style.display = show ? 'block' : 'none';
                  setTimeout(function () {
                    return tooltip.style.opacity = show ? '1' : '0';
                  }, 10);
                }, parseInt(element.getAttribute('tooltip-delay')));
              } else {
                tooltip.style.display = show ? 'block' : 'none';
                setTimeout(function () {
                  return tooltip.style.opacity = show ? '1' : '0';
                }, 10);
              }
            }
          };
          element.onmouseleave = function (e) {
            show = false;
            tooltip.style.display = show ? 'block' : 'none';
            setTimeout(function () {
              return tooltip.style.opacity = show ? '1' : '0';
            }, 10);
          };
          document.body.appendChild(tooltip);
        })();
      }
      if (element.hasAttribute('movable')) {
        (function () {
          var MoveElement = undefined;
          if (element.hasAttribute('movable-scope')) {
            (function () {
              var moveScope = query(element.getAttribute('movable-scope')).getBoundingClientRect();
              var elementDimentions = element.getBoundingClientRect();
              console.log(moveScope);
              console.log(elementDimentions);
              MoveElement = function () {
                var movecheck = setInterval(function () {
                  //log(is.lt(elementDimentions.left,moveScope.right) && is.lt(elementDimentions.bottom,moveScope.bottom))
                  if (elementinfo.movable) {
                    if (is.bt(elementDimentions.left, moveScope.right) && is.bt(elementDimentions.bottom, moveScope.bottom)) {
                      element.style.left = Craft.mouse.x - (elementinfo.mouseX - elementinfo.rect.left) + 'px';
                      element.style.top = Craft.mouse.y - (elementinfo.mouseY - elementinfo.rect.top) + 'px';
                    }
                  } else clearInterval(movecheck);
                }, 2);
              };
            })();
          } else {
            MoveElement = function () {
              var movecheck = setInterval(function () {
                if (elementinfo.movable) {
                  element.style.left = Craft.mouse.x - (elementinfo.mouseX - elementinfo.rect.left) + 'px';
                  element.style.top = Craft.mouse.y - (elementinfo.mouseY - elementinfo.rect.top) + 'px';
                } else clearInterval(movecheck);
              }, 2);
            };
          }

          element.style.position = 'absolute';
          var elementinfo = {
            movable: false,
            rect: element.getBoundingClientRect(),
            mouseX: Craft.mouse.x,
            mouseY: Craft.mouse.y
          },
              movehandle = query('[movehandle]', element);
          On('mousedown', !is.Null(movehandle) ? movehandle : element, function (e) {
            elementinfo.movable = true;
            elementinfo.rect = element.getBoundingClientRect();
            elementinfo.mouseX = e.clientX;
            elementinfo.mouseY = e.clientY;
            MoveElement();
          });

          On('mouseup', document, function (e) {
            return elementinfo.movable = false;
          });
        })();
      }
    }
  });
})(document);