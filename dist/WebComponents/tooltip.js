'use strict';Craft.addCSS(".craft-tooltip{position:fixed;box-sizing:content-box!important;overflow:visible;display:none;min-width:18px;width:auto;font-size:15px;height:26px;line-height:26px;padding-left:15px;padding-right:15px;background:#ededed;border-radius:3.5px;white-space:nowrap;color:#696662;-webkit-filter:drop-shadow(0 1px 2px hsla(0, 0%, 10%, .35));-moz-filter:drop-shadow(0 1px 2px hsla(0, 0%, 10%, .35));filter:drop-shadow(0 1px 2px hsla(0, 0%, 10%, .35));-webkit-transition:opacity 450ms ease;transition:opacity 450ms ease;z-index:500}.craft-tooltip[direction=up],.craft-tooltip[direction=down]{height:22px;line-height:22px}.craft-tooltip:before{position:absolute;content:' ';display:block;pointer-events:none;-webkit-pointer-events:none;-moz-pointer-events:none;border-style:solid;width:0;height:0;z-index:1}.craft-tooltip[direction=right]{border-right:3px solid #696969;-webkit-transform:translateY(-15px) translateX(25px);-ms-transform:translateY(-15px) translateX(25px);transform:translateY(-15px) translateX(25px)}.craft-tooltip[direction=left]{border-left:3px solid #696969;-webkit-transform:translateY(-15px) translateX(calc(-100% - 25px));-ms-transform:translateY(-15px) translateX(calc(-100% - 25px));transform:translateY(-15px) translateX(calc(-100% - 25px))}.craft-tooltip[direction=down]{border-bottom:2px solid #696969;-webkit-transform:translateY(38px) translateX(-50%);-ms-transform:translateY(38px) translateX(-50%);transform:translateY(38px) translateX(-50%)}.craft-tooltip[direction=up]{border-top:2px solid #696969;-webkit-transform:translateY(-38px) translateX(-50%);-ms-transform:translateY(-38px) translateX(-50%);transform:translateY(-38px) translateX(-50%)}.craft-tooltip[direction=right]:before{left:-20px;border-width:13px 22.5px 13px 0;border-color:transparent #ededed transparent transparent}.craft-tooltip[direction=left]:before{right:-20px;border-width:13px 0 13px 22.5px;border-color:transparent transparent transparent #ededed}.craft-tooltip[direction=down]:before{top:-12px;left:calc(50% - 12.5px);border-width:0 12.5px 12px;border-color:transparent transparent #ededed}.craft-tooltip[direction=up]:before{bottom:-12px;left:calc(50% - 12.5px);border-width:12px 12.5px 0;border-color:#ededed transparent transparent}");
(function(){var g=this.is,h=this.dom,k=this.queryEach;Craft.directive("tooltip",{bind:function(b,l){function e(){a.style.display=c?"block":"none";setTimeout(function(){a.style.opacity=c?"1":"0"},10)}k(".craft-tooltip",function(a){a._owner==b?(a.EventListeners.map(function(a){a.off()}),a.remove()):g.Def(a._owner)||a.remove()});var c=!1,a=h.span(b.getAttr("tooltip")||"","direction="+(b.getAttr("tooltip-direction")||"right")+"&class=craft-tooltip");a._owner=b;a.EventListeners=[];b.hasAttr("ripple")&&
(a.style.borderColor=b.getAttr("ripple"));b.hasAttr("color-accent")&&(a.style.borderColor=b.getAttr("color-accent"));a.mover=b.Mousemove(function(b){a.move(b.clientX,b.clientY)}).off();a.EventListeners.push(b.Mouseenter(function(d){c=!0;a.mover.on;if(d.target!==b||d.target.parentNode!==b)b.hasAttr("tooltip-delay")?setTimeout(e,parseInt(b.getAttr("tooltip-delay"))):e()}));a.EventListeners.push(b.Mouseleave(function(b){c=!1;a.mover.off();e()}));b.lifecycle.attr(function(d,c,h,f){"tooltip"===d&&f?a.html(c):
"tooltip"!==d||f?"tooltip-delay"===d&&f?setTimeout(e,parseInt(b.getAttr("tooltip-delay"))):"tooltip-direction"===d&&f&&a.setAttr("direction",c||"right"):(g.Def(a.EventListeners)&&a.EventListeners.map(function(a){a.off()}),a.remove())});a.appendTo(document.body)}})})();
