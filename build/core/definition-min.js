KISSY.Editor.add("definition",function(i){function w(a){return y+"<html><head><title>kissy-editor</title><link href='"+i.Config.base+z+"' rel='stylesheet'/></head><body class='ke-editor'>&nbsp;</body><html>"+(a?'<script id="ke_actscrpt" type="text/javascript">'+(i.Utils.isCustomDomain()?'document.domain="'+document.domain+'";':"")+'window.parent.KISSY.Editor._initIFrame("'+a+'");<\/script>':"")}var n=KISSY,d=n.UA,q=n.DOM,m=n.Node,r=n.Event,u=i.focusManager,A=i.Utils.tryThese,y="<!doctype html>",z=
i.Utils.debugUrl("assets/editor-iframe.css"),B=1,C="document.open();"+(i.Utils.isCustomDomain()?'document.domain="'+document.domain+'";':"")+"document.close();",D="<div  class='ke-editor-wrap'  > <div class='"+".ke-editor-tools".substring(1)+"'></div><div class='"+".ke-textarea-wrap".substring(1)+'\'><iframe  style="width:100%;height:100%;border:none;"  width="100%"  height="100%"  frameborder="0"  title="kissy-editor"  src="'+(d.ie?"javascript:void(function(){"+encodeURIComponent(C)+"}())":"")+'"  tabIndex="'+
(d.webkit?-1:"$(tabIndex)")+'"  allowTransparency="true" ></iframe></div><div class=\''+".ke-editor-status".substring(1)+"'></div></div>";n.augment(i,{init:function(a){var b=this,c=new m(D.replace(/\$\(tabIndex\)/,a.attr("tabIndex")));c.on("mousedown",function(k){if(d.webkit){var g=q._4e_name(k.target);if(g=="select"||g=="option")return true}k.halt()});b.editorWrap=c;b._UUID=B++;u.register(b);b.wrap=c.one(".ke-textarea-wrap");b.iframe=b.wrap.one("iframe");b.toolBarDiv=c.one(".ke-editor-tools");b.textarea=
a;b.statusDiv=c.one(".ke-editor-status");b.toolBarDiv._4e_unselectable();b._commands={};b._plugins={};var o=a._4e_style("width"),e=a._4e_style("height");if(o){c.css("width",o);a.css("width","100%")}b.textarea.css("display","none");c.insertAfter(a);b.wrap[0].appendChild(a[0]);if(e){b.wrap.css("height",e);a.css("height","100%")}a=b.iframe;b.on("dataReady",function(){b.ready=true;i.fire("instanceCreated",{editor:b})});d.gecko?a.on("load",b._setUpIFrame,b):b._setUpIFrame()},addCommand:function(a,b){this._commands[a]=
b},execCommand:function(a){this.fire("save");this._commands[a].exec(this);this.fire("save")},getData:function(){if(this.htmlDataProcessor)return this.htmlDataProcessor.toHtml(this.document.body.innerHTML,"p");return this.document.body.innerHTML},setData:function(a){if(this.htmlDataProcessor)a=this.htmlDataProcessor.toDataFormat(a,"p");this.document.body.innerHTML=a},sync:function(){this.textarea.val(this.getData())},_getRawData:function(){return this.document.body.innerHTML},_setRawData:function(a){this.document.body.innerHTML=
a},_hideSource:function(){this.iframe.css("display","");this.textarea.css("display","none");this.toolBarDiv.children().css("visibility","");this.statusDiv.children().css("visibility","")},_showSource:function(){this.textarea.css("display","");this.iframe.css("display","none");this.toolBarDiv.children().css("visibility","hidden");this.toolBarDiv.all(".ke-tool-editor-source").css("visibility","");this.statusDiv.children().css("visibility","hidden");d.ie<8&&this.textarea.css("height",this.wrap.css("height"))},
_prepareIFrameHtml:w,getSelection:function(){var a=new i.Selection(this.document);return!a||a.isInvalid?null:a},focus:function(){var a=q._4e_getWin(this.document);d.webkit&&a&&a.parent&&a.parent.focus();a&&a.focus();this.document&&this.document.body.focus();this.notifySelectionChange()},blur:function(){q._4e_getWin(this.document).blur();this.document&&this.document.body.blur()},_setUpIFrame:function(){function a(){k=e.document;b.document=k;c.detach();k.open("text/html","replace");k.write(o);k.close()}
var b=this,c=b.iframe,o=w(b._UUID),e=c[0].contentWindow,k;try{k=e.document}catch(g){c[0].src=c[0].src;if(d.ie&&d.ie<7){setTimeout(a,10);return}}a()},addPlugin:function(a){this.ready?a():this.on("dataReady",a)},_monitor:function(){var a=this;a._monitorId&&clearTimeout(a._monitorId);a._monitorId=setTimeout(function(){var b=a.getSelection();if(b&&!b.isInvalid){b=b.getStartElement();var c=new i.ElementPath(b);if(!a.previousPath||!a.previousPath.compare(c)){a.previousPath=c;a.fire("selectionChange",{selection:a,
path:c,element:b})}}},200)},notifySelectionChange:function(){this.previousPath=null;this._monitor()},insertElement:function(a,b){var c=this;c.focus();var o=a._4e_name(),e=i.XHTML_DTD,k=i.RANGE,g=i.NODE,x=e.$block[o],v=c.getSelection(),s=v.getRanges(),h,p,f,l,j;c.fire("save");for(var t=s.length-1;t>=0;t--){h=s[t];h.deleteContents();p=!t&&a||a._4e_clone(true);b&&b(p);if(x)for(;(l=h.getCommonAncestor(false,true))&&(j=e[l._4e_name()])&&!(j&&j[o]);)if(l._4e_name()in e.span)h.splitElement(l);else if(h.checkStartOfBlock()&&
h.checkEndOfBlock()){h.setStartBefore(l);h.collapse(true);l._4e_remove()}else h.splitBlock();h.insertNode(p);f||(f=p)}a=f._4e_nextSourceNode(true);j=i.XHTML_DTD;if(!j.$inline[p._4e_name()])if(a){if(a._4e_name()=="br"&&j[a.parent()._4e_name()].p){j=new m("<p>&nbsp;</p>",null,c.document);a[0].parentNode.replaceChild(j[0],a[0]);a=j}}else{j=new m("<p>&nbsp;</p>",null,c.document);j.insertAfter(f);a=j}h.moveToPosition(f,k.POSITION_AFTER_END);a&&a[0].nodeType==g.NODE_ELEMENT&&h.moveToElementEditablePosition(a);
v.selectRanges([h]);c.focus();p&&p._4e_scrollIntoView();setTimeout(function(){c.fire("save")},10)},insertHtml:function(a){var b=this;if(b.htmlDataProcessor)a=b.htmlDataProcessor.toDataFormat(a);if(d.webkit){a=q.create(a,null,this.document);a=a.nodeType==11?n.makeArray(a.childNodes):[a];for(var c=0;c<a.length;c++)b.insertElement(new m(a[c]))}else{b.focus();b.fire("save");c=b.getSelection();if(d.ie){c=c.getNative();c.type=="Control"&&c.clear();c.createRange().pasteHTML(a)}else b.document.execCommand("inserthtml",
false,a);b.focus();setTimeout(function(){b.fire("save")},10)}}});i._initIFrame=function(a){function b(f){A(function(){e.designMode="on";setTimeout(function(){e.designMode="off";g.focus();if(!arguments.callee.retry)arguments.callee.retry=true},10)},function(){e.designMode="off";q.attr(g,"contentEditable",false);q.attr(g,"contentEditable",true);!f&&b(1)})}var c=u.getInstance(a);a=c.textarea[0];var o=c.iframe[0].contentWindow,e=c.document,k=e.getElementById("ke_actscrpt");k.parentNode.removeChild(k);
var g=e.body;if(d.ie){g.hideFocus=true;g.disabled=true;g.contentEditable=true;g.removeAttribute("disabled")}else setTimeout(function(){if(d.gecko||d.opera)g.contentEditable=true;else if(d.webkit)g.parentNode.contentEditable=true;else e.designMode="on"},0);try{e.execCommand("enableObjectResizing",false,true)}catch(x){}try{e.execCommand("enableInlineTableEditing",false,true)}catch(v){}d.webkit&&r.on(e,"mousedown",function(f){f=new m(f.target);n.inArray(f._4e_name(),["img","hr","input","textarea","select"])&&
c.getSelection().selectElement(f)});if(d.webkit){r.on(e,"click",function(f){var l=new m(f.target);n.inArray(l._4e_name(),["input","select"])&&f.preventDefault()});r.on(e,"mouseup",function(f){var l=new m(f.target);n.inArray(l._4e_name(),["input","textarea"])&&f.preventDefault()})}if(d.gecko||d.ie||d.opera){var s;s=new m(q.insertAfter((new m('<span style="position:absolute; left:-10000"></span>'))[0],a));s.on("focus",function(){c.focus()});c.on("destroy",function(){})}if(d.ie&&e.compatMode=="CSS1Compat"||
d.gecko||d.opera){var h=new m(e.documentElement);h.on("mousedown",function(f){if(f.target===h[0]){d.gecko&&b(false);s[0].focus()}})}r.on(o,"focus",function(){if(d.gecko)b(false);else d.opera&&g.focus();c.notifySelectionChange()});d.gecko&&r.on(c.document,"mousedown",function(){c.iframeFocus||b(false)});if(d.ie){r.on(e,"keydown",function(f){if(f.keyCode in{8:1,46:1}){var l=c.getSelection(),j=l.getSelectedElement();if(j){c.fire("save");var t=l.getRanges()[0].createBookmark();j._4e_remove();l.selectBookmarks([t]);
c.fire("save");f.preventDefault()}}});if(e.compatMode=="CSS1Compat"){var p={33:1,34:1};r.on(e,"keydown",function(f){f.keyCode in p&&setTimeout(function(){c.getSelection().scrollIntoView()},0)})}}setTimeout(function(){d.ie&&setTimeout(function(){if(e){g.runtimeStyle.marginBottom="0px";g.runtimeStyle.marginBottom=""}},1E3)},0);setTimeout(function(){c.fire("dataReady")},10);u.add(c)};d.gecko&&function(){var a=document.body;if(a){var b=a.getAttribute("onpageshow");a.setAttribute("onpageshow",(b?b+";":
"")+"event.persisted && KISSY.Editor.focusManager.refreshAll();")}else window.addEventListener("load",arguments.callee,false)}()});
