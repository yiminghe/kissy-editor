KISSY.Editor.add("bangpai-music",function(g){var e=KISSY.Editor,f=g.htmlDataProcessor,j=f&&f.dataFilter;g.ready(function(){j&&j.addRules({elements:{object:function(d){var h=d.attributes,i=d.attributes.title,b;if(!(h.classid&&String(h.classid).toLowerCase())){for(h=0;h<d.children.length;h++){b=d.children[h];if(b.name=="embed"){if(!e.Utils.isFlashEmbed(b))break;if(/xiami\.com/i.test(b.attributes.src))return f.createFakeParserElement(d,"ke_xiami","bangpai-music",true,{title:i})}}return null}for(h=0;h<
d.children.length;h++){b=d.children[h];if(b.name=="param"&&b.attributes.name=="movie")if(/xiami\.com/i.test(b.attributes.value))return f.createFakeParserElement(d,"ke_xiami","bangpai-music",true,{title:i})}},embed:function(d){if(!e.Utils.isFlashEmbed(d))return null;if(/xiami\.com/i.test(d.attributes.src))return f.createFakeParserElement(d,"ke_xiami","bangpai-music",true,{title:d.attributes.title})}}},4);e.use("bangpai-music/support",function(){new e.BangPaiMusic(g)})})},{attach:false,requires:["fakeobjects"]});
KISSY.Editor.add("bangpai-music/support",function(){function g(a){g.superclass.constructor.apply(this,arguments);a.cfg.disableObjectResizing||h.on(a.document.body,j.ie?"resizestart":"resize",function(c){(new f.Node(c.target)).hasClass(d)&&c.preventDefault()})}function e(a){return a._4e_name()==="img"&&!!a.hasClass(d)&&a}var f=KISSY,j=f.UA,d="ke_xiami",h=f.Event,i=f.Editor;f.extend(g,i.Flash,{_config:function(){this._cls=d;this._type="bangpai-music";this._contentCls="ke-toolbar-music";this._tip="\u63d2\u5165\u867e\u7c73\u97f3\u4e50";
this._contextMenu=b;this._flashRules=["img."+d]},_updateTip:function(a,c){var k=this.editor.restoreRealElement(c);if(k){a.html(c.attr("title"));a.attr("href",this._getFlashUrl(k))}}});var b={"\u867e\u7c73\u5c5e\u6027":function(a){var c=a.editor.getSelection();c=c&&c.getStartElement();(c=e(c))&&a.show(null,c)}};i.Flash.registerBubble("bangpai-music","\u867e\u7c73\u97f3\u4e50\uff1a ",e);i.BangPaiMusic=g;i.add({"bangpai-music/dialog":{attach:false,charset:"utf-8",requires:["flash/dialog"],path:i.Utils.debugUrl("biz/bangpai/plugins/music/dialog/plugin.js")}})},
{attach:false,requires:["flash/support"]});
KISSY.Editor.add("bangpai-sourcearea",function(g){var e=KISSY.Editor,f=KISSY,j=f.Node;if(!(f.UA.gecko<1.92)){e.BangPaiSourceArea||function(){function d(b){this.editor=b;this._init()}var h=e.SOURCE_MODE,i=e.WYSIWYG_MODE;f.augment(d,{_init:function(){var b=this.editor,a=b.statusDiv,c=this.el=(new j("<span style='zoom:1;display:inline-block;height:22px;line-height:22px;'><input style='margin:0 5px;vertical-align:middle;' type='checkbox' /><span style='vertical-align:middle;'>\u7f16\u8f91\u6e90\u4ee3\u7801</span></span>")).appendTo(a).one("input");c.on("click",
this._check,this);b.on("sourcemode",function(){c[0].checked=true});b.on("wysiwygmode",function(){c[0].checked=false})},_check:function(){this.el[0].checked?this._show():this._hide()},_show:function(){this.editor.execCommand("sourceAreaSupport",h)},_hide:function(){this.editor.execCommand("sourceAreaSupport",i)}});e.BangPaiSourceArea=d}();g.ready(function(){new e.BangPaiSourceArea(g)})}},{attach:false,requires:["sourcearea/support"]});
KISSY.Editor.add("bangpai-upload",function(g){var e=KISSY.Editor;e.Env.mods["bangpai-upload/dialog"]||e.add({"bangpai-upload/dialog":{attach:false,charset:"utf-8",requires:["flashutils","progressbar","flashbridge","overlay"],path:e.Utils.debugUrl("biz/bangpai/plugins/upload/dialog/plugin.js")}});g.ready(function(){e.use("button localstorage",function(){g.addButton("bangpai-upload",{contentCls:"ke-toolbar-mul-image",title:"\u6279\u91cf\u63d2\u56fe",mode:e.WYSIWYG_MODE,offClick:function(){this.editor.useDialog("bangpai-upload/dialog",
function(f){f.show()})}})})})},{attach:false});
KISSY.Editor.add("bangpai-video",function(g){var e=KISSY.Editor,f=g.htmlDataProcessor,j=f&&f.dataFilter;g.ready(function(){function d(b){for(var a=0;a<h.length;a++){var c=h[a];if(c.reg.test(b))return c}}var h=[{reg:/youku\.com/i,width:480,height:400,detect:function(b){var a=b.match(/id_([^.]+)\.html$/);if(a)return"http://player.youku.com/player.php/sid/"+a[1]+"/v.swf";a=b.match(/v_playlist\/([^.]+)\.html$/);if(!a)return b}},{reg:/tudou\.com/i,width:480,height:400,detect:function(b){return b}},{reg:/ku6\.com/i,
width:480,height:400,detect:function(b){var a=b.match(/show[^\/]*\/([^.]+)\.html$/);if(a)return"http://player.ku6.com/refer/"+a[1]+"/v.swf";return b}}],i=g.cfg.pluginConfig;i["bangpai-video"]=i["bangpai-video"]||{};i=i["bangpai-video"];i.providers&&h.push.apply(h,i.providers);i.getProvider=d;j&&j.addRules({elements:{object:function(b){var a=b.attributes;if(!(a.classid&&String(a.classid).toLowerCase())){for(a=0;a<b.children.length;a++)if(b.children[a].name=="embed"){if(!e.Utils.isFlashEmbed(b.children[a]))break;
if(d(b.children[a].attributes.src))return f.createFakeParserElement(b,"ke_video","bangpai-video",true)}return null}for(a=0;a<b.children.length;a++){var c=b.children[a];if(c.name=="param"&&c.attributes.name=="movie")if(d(c.attributes.value))return f.createFakeParserElement(b,"ke_video","bangpai-video",true)}},embed:function(b){if(!e.Utils.isFlashEmbed(b))return null;if(d(b.attributes.src))return f.createFakeParserElement(b,"ke_video","bangpai-video",true)}}},4);e.use("bangpai-video/support",function(){new e.BangPaiVideo(g)})})},
{attach:false,requires:["fakeobjects"]});
KISSY.Editor.add("bangpai-video/support",function(){function g(){g.superclass.constructor.apply(this,arguments)}function e(a){return a._4e_name()==="img"&&!!a.hasClass(h)&&a}var f=KISSY,j=f.Editor,d=j.Flash,h="ke_video",i=["img."+h];g.CLS_VIDEO=h;g.TYPE_VIDEO="bangpai-video";f.extend(g,d,{_config:function(){this._cls=h;this._type="bangpai-video";this._contentCls="ke-toolbar-video";this._tip="\u63d2\u5165\u89c6\u9891";this._contextMenu=b;this._flashRules=i}});d.registerBubble("bangpai-video","\u89c6\u9891\u94fe\u63a5\uff1a ",e);j.BangPaiVideo=
g;var b={"\u89c6\u9891\u5c5e\u6027":function(a){var c=a.editor.getSelection();(c=(c=c&&c.getStartElement())&&e(c))&&a.show(null,c)}};j.add({"bangpai-video/dialog":{attach:false,charset:"utf-8",requires:["flash/dialog"],path:j.Utils.debugUrl("biz/bangpai/plugins/video/dialog/plugin.js")}})},{attach:false,requires:["flash/support"]});
