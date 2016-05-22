'use strict';Craft.addCSS("check-box,context-menu>section{-webkit-user-select:none;-moz-user-select:none}context-menu{position:fixed;display:none;width:165px;height:auto;left:0;right:0;border-radius:2px;color:#696969;background:#f4f4f4;box-shadow:0 1px 3px hsla(354,5%,10%,.2);z-index:1200}.context-menu-active{display:block}context-menu>section{-ms-user-select:none;user-select:none;height:25px;line-height:25px;width:100%;cursor:pointer}context-menu>section:hover{background:#d8d8d8}.craft-tooltip{position:fixed;box-sizing:content-box!important;overflow:visible;display:none;min-width:18px;width:auto;font-size:15px;height:26px;line-height:26px;padding-left:15px;padding-right:15px;background:#ededed;border-radius:3px;white-space:nowrap;color:#696662;-webkit-filter:drop-shadow(0 1px 2px hsla(0, 0%, 10%, .35));-moz-filter:drop-shadow(0 1px 2px hsla(0, 0%, 10%, .35));filter:drop-shadow(0 1px 2px hsla(0, 0%, 10%, .35));-webkit-transition:opacity 450ms ease;transition:opacity 450ms ease;z-index:5000}check-box,material-input,material-input>*,radio-button,radio-button>*,toggle-button{box-sizing:border-box}.craft-tooltip[direction=up],.craft-tooltip[direction=down]{height:22px;line-height:22px}.craft-tooltip:before{position:absolute;content:' ';display:block;pointer-events:none;-webkit-pointer-events:none;-moz-pointer-events:none;border-style:solid;width:0;height:0;z-index:1}.craft-tooltip[direction=right]{border-right:3px solid #696969;-webkit-transform:translateY(-15px) translateX(25px);transform:translateY(-15px) translateX(25px)}.craft-tooltip[direction=left]{border-left:3px solid #696969;-webkit-transform:translateY(-15px) translateX(calc(-100% - 25px));transform:translateY(-15px) translateX(calc(-100% - 25px))}.craft-tooltip[direction=down]{border-bottom:2px solid #696969;-webkit-transform:translateY(38px) translateX(-50%);transform:translateY(38px) translateX(-50%)}.craft-tooltip[direction=up]{border-top:2px solid #696969;-webkit-transform:translateY(-38px) translateX(-50%);transform:translateY(-38px) translateX(-50%)}.craft-tooltip[direction=right]:before{left:-20px;border-width:13px 22.5px 13px 0;border-color:transparent #ededed transparent transparent}.craft-tooltip[direction=left]:before{right:-20px;border-width:13px 0 13px 22.5px;border-color:transparent transparent transparent #ededed}.craft-tooltip[direction=down]:before{top:-12px;left:calc(50% - 12.5px);border-width:0 12.5px 12px;border-color:transparent transparent #ededed}.craft-tooltip[direction=up]:before{bottom:-12px;left:calc(50% - 12.5px);border-width:12px 12.5px 0;border-color:#ededed transparent transparent}[movehandle]{cursor:move}@keyframes rippleanim{100%{opacity:0;transform:scale(2.5)}}ripple-effect{display:inline-block;position:absolute;pointer-events:none;user-select:none;-moz-user-select:none;-webkit-user-select:none;opacity:.8;background:#d6c11b;border-radius:100%;-webkit-transform:scale(0);-moz-transform:scale(0);transform:scale(0);z-index:0}.hz-divider{margin:5px 0;border-top:1px solid #7f7f7f;font-size:.9em}.vert-divider{margin:5px 0;border-left:1px solid #666}toggle-button{overflow:visible!important;position:relative;display:inline-block;width:10mm;height:4mm;border-radius:4mm;background:#e9e9e9;box-shadow:inset 0 0 3px hsla(0,0%,20%,.2);cursor:pointer;-webkit-transition:all 130ms ease;transition:all 130ms ease}toggle-button>.toggle{position:absolute;display:inline-block;width:5mm;height:5mm;top:-.45mm;left:0;border-radius:100%;background:#fff;box-shadow:0 2px 5px hsla(0,0%,20%,.2),0 0 2px hsla(0,0%,20%,.2);-webkit-transition:all 120ms ease;transition:all 120ms ease}toggle-button[on]>.toggle{left:calc(100% - 5mm)}toggle-button:hover{background:#ebb4b1}toggle-button[on]:hover{background:#adeeb7}.notifications-bottom-left,.notifications-bottom-middle,.notifications-bottom-right,.notifications-top-left,.notifications-top-middle,.notifications-top-right{position:fixed;width:auto;height:auto;z-index:50}.notifications-top-left{top:0;left:0}.notifications-top-right{top:0;right:0}.notifications-top-middle{top:0;left:30%;right:30%;width:40%}.notifications-bottom-left{bottom:0;left:0}.notifications-bottom-right{bottom:0;right:0}.notifications-bottom-middle{bottom:0;left:30%;right:30%;width:40%}craft-notification{position:relative;display:block;pointer-events:all;-webkit-pointer-events:all;-moz-pointer-events:all;border-bottom-left-radius:2px;border-top-left-radius:2px;margin:2mm;padding-left:1mm;padding-right:6mm;height:6mm;line-height:6mm;width:auto;font-size:.8em;background:#fff;color:#282828;box-shadow:0 2px 5px rgba(47,47,47,.17);z-index:100000}craft-notification[state=bad]{border-left:4px solid red}craft-notification[state=good]{border-left:4px solid green}craft-notification[state=warning]{border-left:4px solid #dfb007}craft-notification>.notification-close{position:absolute;text-align:center;right:0;top:0;height:6mm;line-height:6mm;font-size:1.2em;width:6mm;color:red;text-shadow:0 1px 2px rgba(52,52,52,.29);cursor:not-allowed;z-index:5}.biscuit,.biscuit-big,.biscuit-double,.biscuit-tall{-webkit-box-flex:0;-webkit-flex:0 0 auto;-ms-flex:0 0 auto;flex:0 0 auto;background:#fff;color:#3f3f3f;border-radius:1px;box-shadow:0 1px 4px hsla(0,0%,30%,.3);width:280px;height:280px;margin:1%;display:block;position:relative;overflow:hidden;-webkit-transition:all .3s cubic-bezier(.4,.2,.5,1.4);transition:all .3s cubic-bezier(.4,.2,.5,1.4)}.biscuit-big:last-of-type,.biscuit-double:last-of-type,.biscuit-tall:last-of-type,.biscuit:last-of-type{margin-right:0}.biscuit-big:hover,.biscuit-double:hover,.biscuit-tall:hover,.biscuit:hover{box-shadow:0 5px 8px hsla(0,0%,20%,.2)}.biscuit-double{width:480px}.biscuit-big{width:320px;height:320px}.biscuit-tall{height:480px}.biscuit-title{position:relative;text-align:left;font-size:1.2em;margin:5px}.biscuit-footer,[class^=flatbutton],[class^=pushbutton]{display:inline-block;text-align:center;position:relative}.biscuit-footer{font-size:.8em;margin:5px}[class^=flatbutton],[class^=pushbutton]{overflow:hidden;box-sizing:border-box;vertical-align:top;height:10mm;line-height:9.5mm;width:auto;min-width:16mm;margin:3px 0;padding-left:10px;padding-right:10px;outline:0!important;border:1px solid #737373;border-radius:2px;background:#b3b3b3;-ms-user-select:none;user-select:none;-moz-user-select:none;-webkit-user-select:none;cursor:pointer;-webkit-transition:all .2s ease,border .2s ease-in,boxShadow .1s linear,-webkit-filter .1s ease-in;transition:all .2s ease,border .2s ease-in,boxShadow .1s linear,-webkit-filter .1s ease-in;transition:all .2s ease,border .2s ease-in,boxShadow .1s linear,filter .1s ease-in;transition:all .2s ease,border .2s ease-in,boxShadow .1s linear,filter .1s ease-in,-webkit-filter .1s ease-in}button:active,input[type=button]:active,input[type=submit]:active{outline:0!important;box-shadow:inset 0 2px 4px hsla(0,0%,10%,.26)!important}button:hover,input[type=button]:hover,input[type=submit]:hover{outline:0!important;box-shadow:0 2px 4px hsla(0,0%,10%,.26)}button::-moz-focus-inner,input[type=button]::-moz-focus-inner,input[type=submit]::-moz-focus-inner{border:0;outline:0!important}[class*=flatbutton]{border-radius:3px;font-weight:600;font-size:15px;background:hsla(0,0%,50%,.01);color:#696969}[class*=flatbutton]:hover{-webkit-transform:translateZ(5px);transform:translateZ(5px);color:#fff;background:#595959}[class*=flatbutton]:active{box-shadow:inset 0 2px 2px hsla(0,0%,10%,.45);outline:0!important;filter:saturate(.95);-moz-filter:saturate(.95);-webkit-filter:saturate(.95)}.flatbutton-go{border-color:#209814;color:#209814}.flatbutton-info{border-color:#3074e3;color:#3074e3}.flatbutton-danger{border-color:#d11717;color:#d11717}.flatbutton-warning{border-color:#dfba1c;color:#dfba1c}.flatbutton-go:hover{background:#209814}.flatbutton-info:hover{background:#3074e3}.flatbutton-danger:hover{background:#d11717}.flatbutton-warning:hover{background:#dfba1c}[class*=pushbutton]{border:none;border-bottom:2px solid hsla(0,0%,20%,.35);border-radius:3px;font-weight:500;font-size:16px;color:#fff;text-shadow:0 1px 2px hsla(0,0%,40%,.9)}[class*=pushbutton]:hover{-webkit-transform:translateZ(5px);transform:translateZ(5px);color:#f2f2f2;filter:brightness(1.2);-webkit-filter:brightness(1.2);-moz-filter:brightness(1.2)}[class*=pushbutton]:active{text-shadow:0 2px 2px hsla(0,0%,35%,.8);box-shadow:inset 0 2px 5px hsla(0,0%,10%,.4);border-bottom:0 solid grey;outline:0!important}.pushbutton{background:#9f9f9f}.pushbutton-go{background:#1e8f13}.pushbutton-info{background:#2666cd}.pushbutton-danger{background:#d11717}.pushbutton-warning{background:#dfba1c}code{padding:.2rem .5rem;margin:0 .2rem;font-size:90%;white-space:nowrap;background:#F1F1F1;border:1px solid #E1E1E1;border-radius:4px}pre>code{display:block;padding:1rem 1.5rem;white-space:pre}check-box,radio-button,radio-button>[radio],radio-button>label{display:inline-block}ul{list-style:circle inside}ol{list-style:decimal inside}ol,ul{padding-left:0;margin-top:0}ol ol,ol ul,ul ol,ul ul{margin:1.5rem 0 1.5rem 3rem;font-size:90%}li{margin-bottom:1rem}input[type=range],material-input{box-sizing:content-box!important}radio-button{position:relative;overflow:visible;cursor:pointer;color:#333}radio-button+radio-button,radio-button~radio-button{margin:auto 5px}radio-button>[radio]{vertical-align:middle;width:16px;height:16px;margin-right:5px;border-radius:100%;background:#999;-ms-user-select:none;user-select:none;-webkit-user-select:none;-moz-user-select:none;-webkit-transition:all 150ms ease;transition:all 150ms ease}radio-button:hover:not([disabled])>[radio]{filter:drop-shadow(0 1px 3px hsla(0, 0%, 10%, .45));-webkit-filter:drop-shadow(0 1px 3px hsla(0, 0%, 10%, .45))}radio-button[disabled]{pointer-events:none;-webkit-pointer-events:none;-moz-pointer-events:none;color:#a5a5a5}radio-button[disabled]>[radio]{background:#ccc}radio-button>label{cursor:pointer;vertical-align:middle}radio-button[checked]>[radio]{border:3px solid #a5a5a5;background:#4c4c4c}check-box{position:relative;vertical-align:middle;user-select:none;width:18px;height:18px;line-height:16px;margin:auto 2px;font-size:18px;background:#fcfcfc;border:2px solid #32b9ea;border-radius:2px;color:#4c4c4c;cursor:pointer;box-shadow:0 1px 3px hsla(0,0%,10%,.3);transition:all 140ms ease}check-box[checked]:before{content:'\u2714'}check-box[checked]{box-shadow:inset 0 0 3px hsla(0,0%,10%,.3),0 1px 3px hsla(0,0%,10%,.3)}check-box:hover{border-color:#fff}input[type=range]{-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:0;border:none;z-index:500;height:23px;background:0 0}input[type=range]::-moz-focus-inner{border:0;outline:0!important}input[type=range]::-webkit-slider-runnable-track{height:8px;cursor:pointer;background:#d8d8d8;border-radius:3px;box-shadow:inset 0 0 5px #b2b2b2;border:0;outline:0!important}input[type=range]::-moz-range-track{height:8px;cursor:pointer;background:#d8d8d8;border:0;outline:0!important;border-radius:3px;box-shadow:inset 0 0 5px #b2b2b2}input[type=range]::-webkit-slider-thumb{box-shadow:0 1px 4px hsla(0,0%,20%,.5),0 -1px 3px hsla(0,0%,85%,.8);height:18px;width:18px;border-radius:100%;background:#f9f9f9;cursor:pointer;-webkit-appearance:none;appearance:none;margin-top:-5px}input[type=range]::-moz-range-thumb{box-shadow:0 1px 4px hsla(0,0%,20%,.5),0 -1px 3px hsla(0,0%,85%,.8);height:18px;width:18px;border:none;border-radius:100%;background:#f9f9f9;cursor:pointer;-moz-appearance:none;appearance:none;margin-top:-7px}text-collapser{position:relative;display:block;text-align:left;width:auto;height:auto}text-collapser>.text{display:none;position:relative;text-align:center;padding-left:10px;padding-top:5px}text-collapser>.indicator::first-letter{-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none;font-size:14px;color:#383838}text-collapser>.indicator{position:relative;font-size:1.04em;display:inline-block;cursor:pointer;text-align:left;padding-right:5px;padding-left:5px;width:100%;height:auto;-webkit-transform:translateZ(10px);transform:translateZ(10px);z-index:2}.flat-input{background:#fff;border-bottom:2px solid #15eb84}text-collapser[open]>.indicator:before{content:'\u25bc '}text-collapser>.indicator:before{content:'\u25b6 '}text-collapser[open]>.text{display:inline-block}material-input{margin:20px auto 10px;position:relative;display:block;height:7mm!important;width:80%;text-align:left}material-input>input{-webkit-box-align:bottom;-webkit-align-items:bottom;-ms-flex-align:bottom;align-items:bottom;width:100%;height:7mm;display:block;padding:0!important;outline:0!important;border:none;border-top-left-radius:2px;border-top-right-radius:2px;border-bottom:1px solid #2a72df;-webkit-transition:all 250ms ease;transition:all 250ms ease}material-input>input:focus:invalid{border-bottom:1px solid red}material-input>input:focus:valid{border-bottom:1px solid green}material-input>input:focus{background:#eaeaea;border-bottom:1px solid grey}material-input>label{display:inline-block;position:absolute;-ms-user-select:none;user-select:none;-webkit-user-select:none;-moz-user-select:none;pointer-events:none;left:0;font-size:.9em;top:2.5mm;color:#666;-webkit-transition:all 240ms ease;transition:all 240ms ease}material-input>input.inputhastext+label{top:-10px;font-size:.75em}material-input>input:focus+label{top:-13px;font-size:.76em;color:#7f7f7f}material-input>span{position:absolute;cursor:pointer;right:0;top:2mm;color:grey;display:none;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAq0lEQVR42o2RMQoCMRBFcwQ776C11upOekHEnaC47sQbWomIlWfRSm+wZiBFIAzfgYEw/PeKfLdYdyNiuSz5OHV/TLM9TTSvnPMsVx/ikPadBQh8aZ6C3Fyz62bp8SkFEOT4XQWZ670SaBCCeWwBBm0Bcb+xQSwYEFgLOO5L2LdyAEj9ObpGC7gOavuz0QLu0WoBgqhGCEJBOtwBWAly/qG1jInlWYJIoHnlfhcTzX2HEVUjAAAAAElFTkSuQmCC);background-size:14px 14px;background-repeat:no-repeat;width:5mm;height:5mm;font-size:1.4em;-webkit-transition:all 160ms ease;transition:all 160ms ease}material-input>span:hover{color:red}@media all and (max-width:480px){craft-notification{position:relative;text-align:center;width:95%;font-size:.7em;padding-left:4mm;margin:1mm auto}craft-notification>.notification-close{font-size:1em}.notifications-bottom-left,.notifications-bottom-middle,.notifications-bottom-right,.notifications-top-left,.notifications-top-middle,.notifications-top-right{position:relative;width:100%;left:0!important;height:auto;z-index:50}}");
"use strict";dom.ripple=function(a){return dom.element("ripple-effect","",a)};Craft.ripple=function(a,b){return queryEach(a,function(a){On(a).Mousedown(function(e){if(1==e.buttons){var d=dom.ripple(b);d.Rx=e.clientX;d.Ry=e.clientY;d.appendTo(a)}})})};
Craft.newComponent("ripple-effect",{inserted:function(){var a=void 0,b=this.getAttr("timing")||1600,c=dom(this.parentNode),e=c.getRect(),d=Math.max(e.width,e.height);this.hasAttr("color-accent")?a=this.getAttr("color-accent"):this.hasAttr("color")?a=this.getAttr("color"):c.hasAttr("color-accent")&&(a=c.getAttr("color-accent"));this.css({width:d+"px",height:d+"px",backgroundColor:a||"",animation:"rippleanim "+b+"ms"}).removeAfter(b).move(parseInt(this.Rx)-e.left-d/2,parseInt(this.Ry)-e.top-d/2,!1,
!0)}});Craft.notification=function(a,b,c,e){is.Num(b)&&(e=c=b,b="");is.int(c)&&(is.String(c)&&(c=Number(c)),c=1==c?"top-left":2==c?"top-right":3==c?"bottom-left":4==c?"bottom-right":5==c?"bottom-middle":6==c?"top-middle":"top-left");var d=query(".notifications-"+c);null==d&&(document.body.insertBefore(dom.div("","class=notifications-"+c),document.body.firstChild),d=query(".notifications-"+c));dom.element("craft-notification",a,{duration:e,side:c,state:b}).appendTo(d)};
Craft.newComponent("craft-notification",{inserted:function(){var a=this;a.hasAttr("duration")&&0!=parseInt(a.getAttr("duration"),10)&&setTimeout(function(){a.remove()},parseInt(a.getAttr("duration"),10)||3E3);a.hasAttr("message")&&a.html(a.getAttr("message"));a.append(dom.div("X","class=notification-close"));a.clickEvent=On(".notification-close",a).Click(function(b){a.remove()})},destroyed:function(){this.clickEvent.Off}});var __ContextMenus=[];
Craft.newComponent("context-menu",{inserted:function(){var a=this;a.hasAttr("scope")&&(a.Contextmenu=On("contextmenu",a.getAttr("scope"),function(b){a.Show(!0,b)}));__ContextMenus.push(a)},destroyed:function(){__ContextMenus=Craft.omit(__ContextMenus,this);this.Contextmenu.Off},Show:function(a,b){is.Def(b)&&b.preventDefault();a?this.addClass("context-menu-active").move(b.clientX+5,b.clientY+5,!0):this.stripClass("context-menu-active")}});
Craft.newComponent("check-box",{inserted:function(){var a=this;a.check=a.Click(a.toggle.bind(a));a.colorAccent=function(b){a.css({borderColor:b})}},set_value:function(a){this.toggleAttr("checked",a);if(is.Func(this.oncheck))this.oncheck(this.value)},get_value:function(){return this.hasAttr("checked")},toggle:function(a){this.value=is.Bool(a)?a:!this.value},destroyed:function(){this.check.Off}});
Craft.newComponent("toggle-button",{inserted:function(){var a=this;a.toggleAttr("on",a.hasAttr("on"));a.click=a.Click(a.toggle.bind(a));a.newSetGet("on",function(b){return a.toggle(b)},function(){return a.hasAttr("on")});a.append(dom.span("","class=toggle"))},set_ontoggle:function(a){is.Func(a)&&(this.func=a)},toggle:function(a){this.toggleAttr("on",is.Bool(a)?a:void 0)},attr:function(a){"on"==a&&this.func(this.hasAttr("on"))},destroyed:function(){this.click.Off}});
Craft.newComponent("text-collapser",{inserted:function(){var a=this,b=a.html();a.html("");a.append(dom.label(a.getAttr("summary"),"class=indicator")).append(dom.label(b,"class=text"));a.newSetGet("open",function(b){return a.toggleAttr("open",b)},function(){return a.hasAttr("open")});a.onClick=On(".indicator",a).Click(function(b){a.toggle()})},toggle:function(a){this.open=is.Bool(a)?a:!this.open},attr:function(a,b,c){"open"===a&&(this.open=this.hasAttr("open"))},destroyed:function(){this.onClick.Off}});
var __InputAttributes="name pattern value max maxlength min minlength size autofocus autocomplete disabled form_id required".split(" ");
Craft.newComponent("material-input",{inserted:function(){var a=this,b=dom.input();a.html("");a.newSetGet("value",function(a){b.Text(a).toggleClass("inputhastext",0<b.value.length||b.value);d()},function(){return b.value});a.hasAttr("type")?["submit","button","range"].some(function(b){return a.getAttr("type")!=b})?b.setAttr("type",a.getAttr("type")):console.warn("<material-input> is only for text type inputs it will default to text if wrong type is chosen"):b.setAttr("type","text");forEach(__InputAttributes,
function(d){a.hasAttr(d)&&b.setAttr(d,a.getAttr(d))});a.append(b,dom.span());b=dom("input",a);a.input=b;var c=query("span",a),e=void 0,d=function(){e=0<b.value.length;b.toggleClass("inputhastext",!e);c.style.display=e?"block":"";return a};a.onblur=d;if(a.hasAttr("label")||a.hasAttr("placeholder")){var f=dom.label(a.getAttr("label")||a.getAttr("placeholder"));a.append(f);d()}a.OnInput=b.Input(function(b){(a.hasAttr("label")||a.hasAttr("placeholder"))&&d()});a.OnClick=On("span",a).Click(function(b){a.value=
"";d()});a.append(c)},attr:function(a,b){var c=this.input;is.Def(c)&&__InputAttributes.includes(a)&&(this.hasAttr(a)?c.setAttr(a,b):c.hasAttr(i)&&c.stripAttr(a))}});
Craft.newComponent("radio-button",{created:function(){var a=this;(a.hasAttr("name")||a.hasAttr("label"))&&a.append(dom.label(a.getAttr("name")||a.getAttr("label")));a.prepend(dom.span("","radio"));a.CheckGroup=function(a){var c=[];queryEach("radio-button",a.parentNode,function(a){a.hasAttr("checked")&&c.push(a)});1<c.length&&forEach(c,function(c){c!=a&&(c.checked=!1)})};a.newSetGet("checked",function(b){a.toggleAttr("checked",b);a.hasAttr("checked")&&a.CheckGroup(a)},function(){return a.hasAttr("checked")});
a.Click(function(b){a.checked=!a.checked})},attr:function(a){"checked"===a&&this.hasAttr("checked")?this.CheckGroup(this):"name"!==a&&"label"!==a||!this.hasAttr("name")&&!this.hasAttr("label")||(this.name=this.getAttr("name")||this.getAttr("label"))}});On("blur",function(a){return queryEach("context-menu",function(a){return a.Show()})});On(document).Click(function(a){"CONTEXT-MENU"!==a.target.parentNode.tagName&&"SECTION"!==a.target.tagName&&forEach(__ContextMenus,function(a){return a.Show()})});
Craft.customAttr("ripple",function(a,b){""==b&&(b=a.getAttr("color-accent")||a.getAttr("color"));Craft.ripple(a,{color:b})});
Craft.customAttr("tooltip",function(a,b){function c(){d.style.display=e?"block":"none";setTimeout(function(){d.style.opacity=e?"1":"0"},10)}queryEach(".craft-tooltip",function(b){b.owner==a?(b.owner.unobserve("ttObserve"),forEach(b.EventListeners,function(a){a.Off}),b.remove()):is.Def(b.owner)||b.remove()});var e=!1,d=dom.span(a.getAttr("tooltip")||"","direction="+(a.getAttr("tooltip-direction")||"right")+"&class=craft-tooltip");d.owner=a;d.EventListeners=[];a.hasAttr("ripple")&&(d.style.borderColor=
a.getAttr("ripple"));a.hasAttr("color-accent")&&(d.style.borderColor=a.getAttr("color-accent"));a.hasAttr("color")&&(d.style.borderColor=a.getAttr("color"));a.hasAttr("text-color")&&(d.style.color=a.getAttr("text-color"));d.mover=a.Mousemove(function(a){d.move(a.clientX,a.clientY)}).Off;d.EventListeners.push(a.Mouseenter(function(b){e=!0;d.mover.On;if(b.target!==a||b.target.parentNode!==a)a.hasAttr("tooltip-delay")?setTimeout(c,parseInt(a.getAttr("tooltip-delay"))):c()}));d.EventListeners.push(a.Mouseleave(function(a){e=
!1;d.mover.Off;c()}));a.observe(function(b,c){"attributes"===c&&(b=b.attributeName,"tooltip"===b&&a.hasAttr("tooltip")?d.html(a.getAttr("tooltip")):"tooltip-delay"===b&&a.hasAttr("tooltip-delay")?setTimeout(function(){d.style.display=e?"block":"none";setTimeout(function(){d.style.opacity=e?"1":"0"},10)},parseInt(a.getAttr("tooltip-delay"))):"tooltip-direction"===b&&a.hasAttr("tooltip-direction")?d.setAttr("direction",a.getAttr("tooltip-direction")||"right"):a.hasAttr("tooltip")||(a.unobserve("ttObserve"),
is.Def(d.EventListeners)&&forEach(d.EventListeners,function(a){a.Off}),d.remove()))},{attributes:!0},"ttObserve");d.appendTo(document.body)});Craft.customAttr("movable",function(a){a.style.position="fixed";var b=a.getRect(),c=query("[movehandle]",a),e=0,d=0,f=On(window).Mousemove(function(c){a.move(c.clientX-e+b.left,c.clientY-d+b.top)}).Off;On(null==c?a:c).Mousedown(function(c){if(1==c.button||1==c.buttons)b=a.getRect(),e=c.clientX,d=c.clientY,f.On});On(document).Mouseup(function(a){f.Off})});
