KISSY.Editor.add("definition",function(h){function x(b,a){return y+"<html><head><title>${title}</title><link href='"+h.Config.base+z+"' rel='stylesheet'/><style>"+(a||"")+"</style></head><body class='ke-editor'>&nbsp;"+(b?'<script id="ke_actscript" type="text/javascript">'+(h.Utils.isCustomDomain()?'document.domain="'+document.domain+'";':"")+'window.parent.KISSY.Editor._initIFrame("'+b+'");<\/script>':"")+"</body></html>"}var p=KISSY,f=p.UA,o=p.DOM,n=p.Node,r=p.Event,w=h.focusManager,A=h.Utils.tryThese,
y="<!doctype html>",z=h.Utils.debugUrl("theme/editor-iframe.css"),B=1,C="document.open();"+(h.Utils.isCustomDomain()?'document.domain="'+document.domain+'";':"")+"document.close();",D="<div  class='ke-editor-wrap'  > <div class='"+".ke-editor-tools".substring(1)+"'></div><div class='"+".ke-textarea-wrap".substring(1)+'\'><iframe  style="width:100%;height:100%;border:none;"  width="100%"  height="100%"  frameborder="0"  title="kissy-editor"  src="'+(f.ie?"javascript:void(function(){"+encodeURIComponent(C)+
"}())":"")+'"  tabIndex="'+(f.webkit?-1:"$(tabIndex)")+'"  allowTransparency="true" ></iframe></div><div class=\''+".ke-editor-status".substring(1)+"'></div></div>";h.SOURCE_MODE=0;h.WYSIWYG_MODE=1;p.augment(h,{init:function(b){if(f.ie)o.addClass(document.body,"ie"+f.ie);else if(f.gecko)o.addClass(document.body,"gecko");else f.webkit&&o.addClass(document.body,"webkit");var a=this,c=new n(D.replace(/\$\(tabIndex\)/,b.attr("tabIndex")));c.on("mousedown",function(k){if(f.webkit){var s=o._4e_name(k.target);
if(s=="select"||s=="option")return true}k.halt()});b.on("mousedown",function(k){k.stopPropagation()});a.editorWrap=c;a._UUID=B++;w.register(a);a.wrap=c.one(".ke-textarea-wrap");a.iframe=a.wrap.one("iframe");a.toolBarDiv=c.one(".ke-editor-tools");a.textarea=b;a.statusDiv=c.one(".ke-editor-status");a.toolBarDiv._4e_unselectable();a._commands={};a._dialogs={};var g=b._4e_style("width"),e=b._4e_style("height");if(g){c.css("width",g);b.css("width","100%")}a.textarea.css("display","none");c.insertAfter(b);
a.wrap[0].appendChild(b[0]);if(e){a.wrap.css("height",e);b.css("height","100%")}c=a.iframe;a.on("dataReady",function(){a._ready=true;h.fire("instanceCreated",{editor:a})});f.gecko?c.on("load",a._setUpIFrame,a):a._setUpIFrame();a.cfg.attachForm&&b[0].form&&a._attachForm()},_attachForm:function(){(new n(this.textarea[0].form)).on("submit",this.sync,this)},useDialog:function(b,a){var c=this,g=h.SimpleOverlay;g.loading();c.use(b,function(){var e=c.getDialog(b);a(e);g.unloading()})},addDialog:function(b,
a){this._dialogs[b]=a},getDialog:function(b){return this._dialogs[b]},addPlugin:function(b){this.ready(b)},addCommand:function(b,a){this._commands[b]=a},hasCommand:function(b){return this._commands[b]},execCommand:function(b){var a=this._commands[b],c=p.makeArray(arguments);c.shift();c.unshift(this);return a.exec.apply(a,c)},getMode:function(){return this.textarea.css("display")=="none"?h.WYSIWYG_MODE:h.SOURCE_MODE},getData:function(b){var a;if(this.getMode()==h.WYSIWYG_MODE){a=this.document.body.innerHTML;
if(this.htmlDataProcessor)a=this.htmlDataProcessor.toHtml(a,"p")}else a=this.textarea.val();if(!b){a=a||"";a=a.replace(/\s+/g," ")}return a},setData:function(b){var a;if(this.htmlDataProcessor)a=this.htmlDataProcessor.toDataFormat(b,"p");this.document.body.innerHTML=a;this.getMode()!=h.WYSIWYG_MODE&&this.textarea.val(b)},sync:function(){this.textarea.val(this.getData())},baseZIndex:function(b){b=b||0;return b+(this.cfg.baseZIndex||0)},_getRawData:function(){return this.document.body.innerHTML},_setRawData:function(b){this.document.body.innerHTML=
b},_prepareIFrameHtml:x,getSelection:function(){return h.Selection.getSelection(this.document)},focus:function(){var b=this.document,a=o._4e_getWin(b);f.webkit&&a&&a.parent&&a.parent.focus();a&&a.focus();b&&b.body.focus();this.notifySelectionChange()},blur:function(){o._4e_getWin(this.document).blur();this.document&&this.document.body.blur()},addCustomStyle:function(b){var a=this.cfg,c=this.document;a.customStyle=a.customStyle||"";a.customStyle+="\n"+b;a=c.createElement("style");c.getElementsByTagName("head")[0].appendChild(a);
if(a.styleSheet)a.styleSheet.cssText=b;else a.appendChild(c.createTextNode(b))},_setUpIFrame:function(){function b(){k=e.document;a.document=k;c.detach();k.open("text/html","replace");k.write(g);k.close()}var a=this,c=a.iframe,g=x(a._UUID,a.cfg.customStyle),e=c[0].contentWindow,k;try{k=e.document}catch(s){c[0].src=c[0].src;if(f.ie<7){setTimeout(b,10);return}}b()},ready:function(b){this._ready?b():this.on("dataReady",b)},_monitor:function(){var b=this;b._monitorId&&clearTimeout(b._monitorId);b._monitorId=
setTimeout(function(){var a=b.getSelection();if(a&&!a.isInvalid){var c=a.getStartElement(),g=new h.ElementPath(c);if(!b.previousPath||!b.previousPath.compare(g)){b.previousPath=g;b.fire("selectionChange",{selection:a,path:g,element:c})}}},100)},notifySelectionChange:function(){this.previousPath=null;this._monitor()},insertElement:function(b,a){var c=this;c.focus();var g=b._4e_name(),e=h.XHTML_DTD,k=h.RANGE,s=h.NODE,l=e.$block[g],t=c.getSelection(),u=t.getRanges(),m,d,i,q,j;c.fire("save");for(var v=
u.length-1;v>=0;v--){m=u[v];m.deleteContents();d=!v&&b||b._4e_clone(true);a&&a(d);if(l)for(;(q=m.getCommonAncestor(false,true))&&(j=e[q._4e_name()])&&!(j&&j[g]);)if(q._4e_name()in e.span)m.splitElement(q);else if(m.checkStartOfBlock()&&m.checkEndOfBlock()){m.setStartBefore(q);m.collapse(true);q._4e_remove()}else m.splitBlock();m.insertNode(d);i||(i=d)}g=i._4e_nextSourceNode(true);e=c.document;j=h.XHTML_DTD;if(j.$inline[d._4e_name()]){g=new n(e.createTextNode(" "));g.insertAfter(i)}else if(g){if(g._4e_name()==
"br"&&j[g.parent()._4e_name()].p){j=new n("<p>&nbsp;</p>",null,e);g[0].parentNode.replaceChild(j[0],g[0]);g=j}}else{j=new n("<p>&nbsp;</p>",null,e);j.insertAfter(i);g=j}m.moveToPosition(i,k.POSITION_AFTER_END);g&&g[0].nodeType==s.NODE_ELEMENT&&m.moveToElementEditablePosition(g);t.selectRanges([m]);c.focus();d&&d._4e_scrollIntoView();setTimeout(function(){c.fire("save")},10);return d},insertHtml:function(b){var a=this;if(a.htmlDataProcessor)b=a.htmlDataProcessor.toDataFormat(b);if(f.webkit){b=o.create(b,
null,this.document);b=b.nodeType==11?p.makeArray(b.childNodes):[b];for(var c=0;c<b.length;c++)a.insertElement(new n(b[c]))}else{a.focus();a.fire("save");c=a.getSelection();if(f.ie){c=c.getNative();c.type=="Control"&&c.clear();c.createRange().pasteHTML(b)}else a.document.execCommand("inserthtml",false,b);a.focus();setTimeout(function(){a.fire("save")},10)}}});h._initIFrame=function(b){function a(d){A(function(){e.designMode="on";setTimeout(function(){e.designMode="off";l.focus();if(!arguments.callee.retry)arguments.callee.retry=
true},50)},function(){e.designMode="off";o.attr(l,"contentEditable",false);o.attr(l,"contentEditable",true);!d&&a(1)})}var c=w.getInstance(b);b=c.textarea[0];var g=c.iframe[0].contentWindow,e=c.document,k=c.cfg,s=e.getElementById("ke_actscript");o._4e_remove(s);var l=e.body;if(f.ie){l.hideFocus=true;l.disabled=true;l.contentEditable=true;l.removeAttribute("disabled")}else setTimeout(function(){if(f.gecko||f.opera)l.contentEditable=true;else if(f.webkit)l.parentNode.contentEditable=true;else e.designMode=
"on"},0);if(f.webkit){r.on(e,"click",function(d){var i=new n(d.target);p.inArray(i._4e_name(),["input","select"])&&d.preventDefault()});r.on(e,"mouseup",function(d){var i=new n(d.target);p.inArray(i._4e_name(),["input","textarea"])&&d.preventDefault()})}if(f.gecko||f.ie||f.opera){var t;t=new n(o.insertAfter((new n('<span tabindex="-1" style="position:absolute; left:-10000" role="presentation"></span>'))[0],b));t.on("focus",function(){c.focus()});c.activateGecko=function(){f.gecko&&c.iframeFocus&&
t[0].focus()};c.on("destroy",function(){})}if(f.ie&&e.compatMode=="CSS1Compat"||f.gecko||f.opera){var u=new n(e.documentElement);u.on("mousedown",function(d){if(d.target==u[0]){f.gecko&&a(false);t[0].focus()}})}r.on(g,"focus",function(){if(f.gecko)a(false);else f.opera&&l.focus();c.notifySelectionChange()});f.gecko&&r.on(c.document,"mousedown",function(){c.iframeFocus||a(false)});if(f.ie){r.on(e,"keydown",function(d){if(d.keyCode in{8:1,46:1}){var i=c.getSelection(),q=i.getSelectedElement();if(q){c.fire("save");
var j=i.getRanges()[0].createBookmark();q._4e_remove();i.selectBookmarks([j]);c.fire("save");d.preventDefault()}}});if(e.compatMode=="CSS1Compat"){var m={33:1,34:1};r.on(e,"keydown",function(d){d.keyCode in m&&setTimeout(function(){c.getSelection().scrollIntoView()},0)})}}setTimeout(function(){f.ie&&setTimeout(function(){if(e){l.runtimeStyle.marginBottom="0px";l.runtimeStyle.marginBottom=""}},1E3)},0);setTimeout(function(){c.fire("dataReady");var d=k.disableObjectResizing,i=k.disableInlineTableEditing;
if(d||i)try{e.execCommand("enableObjectResizing",false,!d);e.execCommand("enableInlineTableEditing",false,!i)}catch(q){r.on(l,f.ie?"resizestart":"resize",function(j){if(d||o._4e_name(j.target)==="table"&&i)j.preventDefault()})}},10);f.webkit&&r.on(e,"mousedown",function(d){d=new n(d.target);p.inArray(d._4e_name(),["img","hr","input","textarea","select"])&&c.getSelection().selectElement(d)});f.gecko&&r.on(e,"dragstart",function(d){var i=new n(d.target);i._4e_name()==="img"&&/ke_/.test(i[0].className)&&
d.preventDefault()});w.add(c)}});
