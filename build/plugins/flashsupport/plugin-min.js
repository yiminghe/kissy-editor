KISSY.Editor.add("flashsupport",function(n){var f=KISSY.Editor,j=KISSY,t=j.UA,u=j.Event,v=f.ContextMenu,w=j.Node,p=f.BubbleView,x=f.TripleButton,y=f.SimpleOverlay,k=n.htmlDataProcessor,i="ke_flash",q=f.Utils.flash;n=k&&k.dataFilter;f.Flash||function(){function c(a){this.editor=a;this._init()}function g(a){return a._4e_name()==="img"&&!!a.hasClass(i)&&a}var z=/\.swf(?:$|\?)/i;c.isFlashEmbed=function(a){a=a.attributes;return a.type=="application/x-shockwave-flash"||z.test(a.src||"")};j.augment(c,{_config:function(){this._cls=
i;this._type="flash";this._title="Flash\u5c5e\u6027";this._bodyHtml="<table><tr><td colspan='2'><label>\u7f51\u5740\uff1a <input  data-verify='^\\s*https?://[^\\s]+'  data-warning='\u7f51\u5740\u683c\u5f0f\u4e3a\uff1ahttp://' class='ke-flash-url' style='width:280px' value='\u8bf7\u8f93\u5165\u5982 http://www.xxx.com/xxx.swf'/></label></td></tr><tr><td><label>\u5bbd\u5ea6\uff1a <input  data-verify='^\\s*(?!0)\\d+(.\\d+)?\\s*'  data-warning='\u5bbd\u5ea6\u8bf7\u8f93\u5165\u6b63\u6570' class='ke-flash-width' style='width:60px' /> \u50cf\u7d20 </label></td><td><label>\u9ad8\u5ea6\uff1a<input  data-verify='^\\s*(?!0)\\d+(.\\d+)?\\s*'  data-warning='\u9ad8\u5ea6\u8bf7\u8f93\u5165\u6b63\u6570' class='ke-flash-height' style='width:60px' /> \u50cf\u7d20 </label></td></tr><tr><td><label>\u5bf9\u9f50\uff1a <select class='ke-flash-align'><option value=''>\u65e0</option><option value='left'>\u5de6\u5bf9\u9f50</option><option value='right'>\u53f3\u5bf9\u9f50</option></select></td><td><label>\u95f4\u8ddd\uff1a<input  data-verify='^\\s*\\d+(.\\d+)?\\s*'  data-warning='\u95f4\u8ddd\u8bf7\u8f93\u5165\u975e\u8d1f\u6570\u5b57' class='ke-flash-margin' style='width:60px' value='5'/> \u50cf\u7d20</label></td></tr></table>";
this._footHtml="<button class='ke-flash-ok'>\u786e\u5b9a</button> <button class='ke-flash-cancel'>\u53d6\u6d88</button>";this._contentCls="ke-toolbar-flash";this._tip="\u63d2\u5165Flash";this._contextMenu=A;this._flashRules=["img."+i]},_init:function(){this._config();var a=this.editor,b={},e=this._contextMenu;a._toolbars=a._toolbars||{};a._toolbars[this._type]=this;this.el=new x({container:a.toolBarDiv,contentCls:this._contentCls,title:this._tip});this.el.on("click",this.show,this);if(e)for(var d in e)(function(h){b[h]=
function(){e[h](a)}})(d);v.register(a.document,{rules:this._flashRules,width:"120px",funcs:b});p.attach({pluginName:this._type,pluginInstance:this});u.on(a.document,"dblclick",this._dbclick,this);f.Utils.lazyRun(this,"_prepareShow","_realShow")},_getFlashUrl:function(a){return q.getUrl(a)},_updateTip:function(a,b){b=this._getFlashUrl(this.editor.restoreRealElement(b));a.html(b);a.attr("href",b)},_dbclick:function(a){var b=new w(a.target);if(b._4e_name()==="img"&&b.hasClass(this._cls)){this.show(null,
b);a.halt()}},_prepareShow:function(){var a=new y({title:this._title,width:this._config_dwidth||"350px",mask:true});a.body.html(this._bodyHtml);a.foot.html(this._footHtml);this.d=a;this._initD()},_realShow:function(){this._updateD();this.d.show()},_updateD:function(){var a=this.editor,b=this.selectedFlash;if(b){a=a.restoreRealElement(b);a.attr("width")&&this.dWidth.val(parseInt(a.attr("width")));a.attr("height")&&this.dHeight.val(parseInt(a.attr("height")));this.dAlign.val(a.attr("align"));this.dUrl.val(this._getFlashUrl(a));
this.dMargin.val(parseInt(a._4e_style("margin"))||0)}else{this.dUrl.val("\u8bf7\u8f93\u5165\u5982 http://www.xxx.com/xxx.swf");this.dWidth.val("");this.dHeight.val("");this.dAlign.val("");this.dMargin.val("5")}},show:function(a,b){this.selectedFlash=b;this._prepareShow()},_initD:function(){var a=this,b=a.d;a.dHeight=b.el.one(".ke-flash-height");a.dWidth=b.el.one(".ke-flash-width");a.dUrl=b.el.one(".ke-flash-url");a.dAlign=b.el.one(".ke-flash-align");a.dMargin=b.el.one(".ke-flash-margin");var e=b.el.one(".ke-flash-ok");
b=b.el.one(".ke-flash-cancel");e.on("click",a._gen,a);b.on("click",function(){a.d.hide()})},_getDInfo:function(){return{url:this.dUrl.val(),attrs:{width:this.dWidth.val(),height:this.dHeight.val(),align:this.dAlign.val(),style:"margin:"+(parseInt(this.dMargin.val())||0)+"px"}}},_gen:function(){var a=this.editor,b=this._getDInfo(),e=b&&j.trim(b.url),d=b&&b.attrs;if(f.Utils.verifyInputs(this.d.el.all("input"))&&b){b=q.createSWF(e,{attrs:d},a.document);e=b.el;d=a.createFakeElement?a.createFakeElement(e,
this._cls,this._type,true,b.html,d):e;d=a.insertElement(d);this.selectedFlash&&a.getSelection().selectElement(d);this.d.hide()}}});f.Flash=c;c.registerBubble=function(a,b,e){p.register({pluginName:a,func:e,init:function(){var d=this,h=d.el;h.html(b+'  <a class="ke-bubbleview-url" target="_blank" href="#"></a> -     <span class="ke-bubbleview-link ke-bubbleview-change">\u7f16\u8f91</span> -     <span class="ke-bubbleview-link ke-bubbleview-remove">\u5220\u9664</span>');var r=h.one(".ke-bubbleview-url"),
s=h.one(".ke-bubbleview-change");h=h.one(".ke-bubbleview-remove");s._4e_unselectable();r._4e_unselectable();h._4e_unselectable();s.on("click",function(l){d._plugin.show(null,d._selectedEl);l.halt()});h.on("click",function(l){var m=d._plugin;if(t.webkit){var o=m.editor.getSelection().getRanges();o&&o[0]&&(o[0].collapse(true)||1)&&o[0].select()}d._selectedEl._4e_remove();d.hide();m.editor.notifySelectionChange();l.halt()});d.on("beforeVisibleChange",function(l){var m=d._selectedEl;l.newVal&&m&&d._plugin._updateTip(r,
m)})}})};c.registerBubble("flash","Flash \u7f51\u5740\uff1a ",g);c.checkFlash=g;var A={"Flash\u5c5e\u6027":function(a){var b=a.getSelection();b=b&&b.getStartElement();b=g(b);a=a._toolbars.flash;b&&a.show(null,b)}};c.CLS_FLASH=i;c.TYPE_FLASH="flash"}();n&&n.addRules({elements:{object:function(c){var g=c.attributes;if(!(g.classid&&String(g.classid).toLowerCase())){for(g=0;g<c.children.length;g++)if(c.children[g].name=="embed"){if(!f.Flash.isFlashEmbed(c.children[g]))return null;return k.createFakeParserElement(c,
i,"flash",true)}return null}return k.createFakeParserElement(c,i,"flash",true)},embed:function(c){if(!f.Flash.isFlashEmbed(c))return null;return k.createFakeParserElement(c,i,"flash",true)}}},5)});
