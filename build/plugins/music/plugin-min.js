KISSY.Editor.add("music",function(j){var g=KISSY,k=g.Node,n=g.DOM,e=g.Editor,h=g.Event;e.MusicInserter||function(){function d(a){d.superclass.constructor.call(this,a);a=this.get("editor");a._toolbars=a._toolbars||{};a._toolbars.music=this;this._init()}function l(a){return a.replace(/^.+niftyplayer\.swf\?file=/,"")}var q=e.ContextMenu,o=e.SimpleOverlay,r=e.TripleButton,m=e.Utils.getFlashUrl,s='<object  width="165" height="37" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"><param value="'+
(e.Config.base+'plugins/music/niftyplayer.swf?file=#(music)"')+' name="movie"/><param value="high" name="quality"/><param value="#FFFFFF" name="bgcolor"/><embed width="165" height="37" type="application/x-shockwave-flash" swliveconnect="true" src="'+(e.Config.base+'plugins/music/niftyplayer.swf?file=#(music)"')+'quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" bgcolor="#FFFFFF" /></object>',t=/#\(music\)/g,u=["img.ke_music"];d.ATTRS={editor:{}};d.tip=function(){var a=this,
b=new k('<div class="ke-bubbleview-bubble" onmousedown="return false;">\u97f3\u4e50\u7f51\u5740\ufffd? <a class="ke-bubbleview-url" target="_blank" href="#"></a> -     <span class="ke-bubbleview-link ke-bubbleview-change">\u7f16\u8f91</span> -     <span class="ke-bubbleview-link ke-bubbleview-remove">\u5220\u9664</span></div>');b._4e_unselectable();a.tipwin=new o({el:b,focusMgr:false});document.body.appendChild(b[0]);a.tipurl=b.one(".ke-bubbleview-url");var c=b.one(".ke-bubbleview-change");b=b.one(".ke-bubbleview-remove");
c.on("click",function(f){a.tipwin.music.show();f.halt()});a.tipwin.on("hide",function(){var f=a.tipwin.music;f&&(f.selectedFlash=null)});b.on("click",function(f){var i=a.tipwin.music;i.selectedFlash._4e_remove();i.get("editor").notifySelectionChange();f.halt()});a.tip=null};g.extend(d,g.Base,{_init:function(){var a=this.get("editor"),b={};this.el=new r({contentCls:"ke-toolbar-music",title:"\u5206\u4eab\u97f3\u4e50",container:a.toolBarDiv});h.on(a.document,"dblclick",this._dblclick,this);for(var c in p)(function(f){b[f]=
function(){a.fire("save");a.focus();p[f](a);a.fire("save")}})(c);q.register(a.document,{rules:u,width:"120px",funcs:b});this.el.on("offClick",this.show,this);e.Utils.lazyRun(this,"_prepare","_real");a.on("selectionChange",this._selectionChange,this)},_selectionChange:function(a){a=a.path;var b=a.elements;if(a&&b)if(a=a.lastElement)(a=a._4e_ascendant(function(c){return c._4e_name()==="img"&&!!c.hasClass("ke_music")},true))?this._showTip(a):this._hideTip()},_showTip:function(a){this._prepareTip(a)},
_hideTip:function(){d.tipwin&&d.tipwin.hide()},_prepareTip:function(){d.tip&&d.tip()},_realTip:function(a){var b=this.get("editor"),c=a._4e_getOffset(document);c.top+=a.height()+5;d.tipwin.show(c);this.selectedFlash=a;a=b.restoreRealElement(this.selectedFlash);d.tipwin.music=this;d.tipurl.html(l(m(a)));d.tipurl.attr("href",l(m(a)))},_prepare:function(){var a=this,b=a.get("editor");a.d=new o({title:"\u7f16\u8f91\u97f3\u4e50",mask:true,width:"350px"});var c=a.d;c.body.html("<div><p><label><span style='color:#0066CC;font-weight:bold;'>\u97f3\u4e50\u7f51\u5740\ufffd?</span><input class='ke-music-url' style='width:230px' value='http://'/></label></p></div>");
c.foot.html("<button class='ke-music-insert'>\u786e\u5b9a</button> <button class='ke-music-cancel'>\u53d6\u6d88</button>");a.content=c.el;var f=a.content;c.on("hide",function(){a.selectedFlash=null});c=f.one(".ke-music-cancel");var i=f.one(".ke-music-insert");a.musicUrl=f.one(".ke-music-url");c.on("click",function(v){a.d.hide();v.halt()});h.on(document,"click",a.hide,a);h.on(b.document,"click",a.hide,a);i.on("click",function(){a._insert()})},hide:function(a){var b=this;n._4e_ascendant(a.target,function(c){return c[0]===
b.content[0]||c[0]===b.el.el[0]})||this.d.hide()},_real:function(){this.d.show()},_insert:function(){var a=this.get("editor"),b=this.musicUrl.val();if(b){b=s.replace(t,b);var c=new k(b,null,a.document);b=a.createFakeElement?a.createFakeElement(c,"ke_music","music",true,b):c;a.insertElement(b);this.d.hide()}},_dblclick:function(a){var b=new k(a.target);if(b._4e_name()==="img"&&b.hasClass("ke_music")){this.selectedFlash=b;this.show();a.halt()}},show:function(){this._prepare();if(this.selectedFlash){var a=
this.get("editor").restoreRealElement(this.selectedFlash);this.musicUrl.val(l(m(a)))}else this.musicUrl.val("")}});e.Utils.lazyRun(d.prototype,"_prepareTip","_realTip");e.MusicInserter=d;var p={"\u7f16\u8f91\u97f3\u4e50":function(a){var b=a.getSelection();if(b=(b=b&&b.getStartElement())&&b._4e_ascendant("img",true))if(b.hasClass("ke_music")){a=a._toolbars.music;a.selectedFlash=b;a.show()}}}}();j.addPlugin(function(){new e.MusicInserter({editor:j});var d=n._4e_getWin(j.document);h.on(d,"scroll",function(){e.MusicInserter.tipwin&&
e.MusicInserter.tipwin.hide()})})});
