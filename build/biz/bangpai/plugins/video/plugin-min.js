KISSY.Editor.add("bangpai-video",function(k){function f(b){for(var c=0;c<l.length;c++){var e=l[c];if(e.reg.test(b))return e}}var m=KISSY,h=m.Editor,g="ke_video",o=h.Utils.getFlashUrl,j=h.Flash,i=k.htmlDataProcessor,n=i&&i.dataFilter;n&&n.addRules({elements:{object:function(b){var c=b.attributes;if(!(c.classid&&String(c.classid).toLowerCase())){for(c=0;c<b.children.length;c++)if(b.children[c].name=="embed"){if(!j.isFlashEmbed(b.children[c]))return null;if(f(b.children[c].attributes.src))return i.createFakeParserElement(b,
g,"bangpai-video",true)}return null}for(c=0;c<b.children.length;c++){var e=b.children[c];if(e.name=="param"&&e.attributes.name=="movie")if(f(e.attributes.value))return i.createFakeParserElement(b,g,"bangpai-video",true)}},embed:function(b){if(!j.isFlashEmbed(b))return null;if(f(b.attributes.src))return i.createFakeParserElement(b,g,"bangpai-video",true)}}},4);var l=[{reg:/youku\.com/i,width:480,height:400,detect:function(b){var c=b.match(/id_([^.]+)\.html$/);if(c)return"http://player.youku.com/player.php/sid/"+
c[1]+"/v.swf";if(/\.swf$/.test(b))return b}},{reg:/tudou\.com/i,width:480,height:400,detect:function(b){var c=b.match(/\/view\/([^/]+)\/$/);if(c)return"http://www.tudou.com/v/"+c[1]+"/v.swf";if(/\.swf$/.test(b))return b}},{reg:/ku6\.com/i,width:480,height:400,detect:function(b){var c=b.match(/show\/([^.]+)\.html$/);if(c)return"http://player.ku6.com/refer/"+c[1]+"/v.swf";if(/\.swf$/.test(b))return b}}];h.BangPaiVideo||function(){function b(){b.superclass.constructor.apply(this,arguments)}function c(a){return a._4e_ascendant(function(d){return d._4e_name()===
"img"&&!!d.hasClass(g)},true)}var e=["img."+g];m.extend(b,j,{_config:function(){var a=this.editor;a._toolbars=a._toolbars||{};a._toolbars["bangpai-video"]=this;this._cls=g;this._type="bangpai-video";this._title="\u89c6\u9891\u5c5e\ufffd?";this._bodyHtml="<div><p style='margin-bottom:5px'>\ufffd?\ufffd\ufffd\u5206\u4eab\u7684\u89c6\u9891\u94fe\u63a5\uff1a\u652f\u6301 \u571f\u8c46\uff0c\u4f18\u9177\uff0cku6 \u89c6\u9891\u5206\u4eab</p><p><label><span style='color:#0066CC;font-weight:bold;'>\u89c6\u9891\u94fe\u63a5\ufffd?</span><input class='ke-video-url' style='width:230px' value='\u8bf7\u8f93\u5165\u5982 http://www.xxx.com/xxx.swf'/></label></p></div>";
this._footHtml="<button class='ke-video-ok'>\u786e\u5b9a</button> <button class='ke-video-cancel'>\u53d6\u6d88</button>";this._contentCls="ke-toolbar-flash";this._tip="\u63d2\u5165\u89c6\u9891";this._contextMenu=p;this._flashRules=e},_initD:function(){var a=this,d=a.d;a.dUrl=d.el.one(".ke-video-url");var q=d.el.one(".ke-video-ok");d=d.el.one(".ke-video-cancel");q.on("click",a._gen,a);d.on("click",function(){a.d.hide()})},_getDWidth:function(){var a=this.dUrl.val();return(a=f(a))&&a.width},_getDURl:function(){var a=
this.dUrl.val(),d=f(a);if(d)return d.detect(a);else alert("\u4e0d\u652f\u6301\u8be5\u94fe\u63a5\u6765\u6e90!")},_getDHeight:function(){var a=this.dUrl.val();return(a=f(a))&&a.height},_getFlashUrl:function(a){return o(a)},_updateD:function(){var a=this.editor,d=this.selectedFlash;d?this.dUrl.val(this._getFlashUrl(a.restoreRealElement(d))):this.dUrl.val("\u8bf7\u8f93\u5165\u5982 http://www.xxx.com/xxx.swf")}});j.registerBubble("bangpai-video","\u89c6\u9891\u94fe\u63a5\ufffd?",c);h.BangPaiVideo=b;var p=
{"\u7f16\u8f91\u89c6\u9891":function(a){var d=a.getSelection();d=(d=d&&d.getStartElement())&&c(d);a=a._toolbars["bangpai-video"];if(d){a.selectedFlash=d;a.show()}}}}();k.addPlugin(function(){new h.BangPaiVideo(k)})},{attach:false,requires:["flashsupport"]});
