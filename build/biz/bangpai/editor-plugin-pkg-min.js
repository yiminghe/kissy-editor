KISSY.Editor.add("bangpai-music",function(u){var h=KISSY,s=h.UA,v=h.Event,n=h.Editor,w=h.DOM,t=h.Node,g=n.Config.base+"theme/loading.gif",j=n.Flash,c="ke_xiami",f=u.htmlDataProcessor,r=f&&f.dataFilter;r&&r.addRules({elements:{object:function(k){var b=k.attributes,e=k.attributes.title,o;if(!(b.classid&&String(b.classid).toLowerCase())){for(b=0;b<k.children.length;b++){o=k.children[b];if(o.name=="embed"){if(!j.isFlashEmbed(o))break;if(/xiami\.com/i.test(o.attributes.src))return f.createFakeParserElement(k,
c,"bangpai-music",true,{title:e})}}return null}for(b=0;b<k.children.length;b++){o=k.children[b];if(o.name=="param"&&o.attributes.name=="movie")if(/xiami\.com/i.test(o.attributes.value))return f.createFakeParserElement(k,c,"bangpai-music",true,{title:e})}},embed:function(k){if(!j.isFlashEmbed(k))return null;if(/xiami\.com/i.test(k.attributes.src))return f.createFakeParserElement(k,c,"bangpai-music",true,{title:k.attributes.title})}}},4);n.BangPaiMusic||function(){function k(d){k.superclass.constructor.apply(this,
arguments);d.cfg.disableObjectResizing||v.on(d.document.body,s.ie?"resizestart":"resize",function(a){w.hasClass(a.target,c)&&a.preventDefault()})}function b(d){return A.replace(/\${([^}]+)}/g,function(a,l){return d[l]})}function e(d,a,l){return"<a class='ke-xiami-page-item"+(d==a?" ke-xiami-curpage":"")+"' data-value='"+a+"' href='#'>"+(l||a)+"</a>"}function o(d){return d._4e_name()==="img"&&!!d.hasClass(c)&&d}w.addStyleSheet(".ke-xiami-list {margin-top:10px;}.ke-xiami-list li{border:1px dotted gray;border-width:0 0 1px 0;overflow:hidden;zoom:1;padding:2px;}\n.ke-xiami-list .ke-xiami-add {float:right;}\n.ke-xiami-list .ke-xiami-song {float:left;}\n.ke-xiami-paging a{display: inline-block; zoom: 1;  *display: inline; border:1px solid gray;padding:0 5px;margin:0 2px;}\n.ke-xiami-paging a:hover,.ke-xiami-paging a.ke-xiami-curpage {background-color:orange;}\n.ke-xiami-paging {text-align:center;margin-top:10px;}\n",
"BangPaiMusic");window.bangpai_xiami=function(d){var a=bangpai_xiami.instance;d.page=bangpai_xiami.page;a._listSearch(d)};var z="<form action='#' class='ke-xiami-form'><p class='ke-xiami-title'></p><p class='ke-xiami-url-wrap'><input class='ke-xiami-url' style='width:300px' value='输入想要添加的歌曲名、专辑名、艺人名'/> &nbsp;  <input class='ke-xiami-submit' type='submit' style='vertical-align:middle;' value='搜 索 ' /></p><p style='margin:5px 0'><label>对 齐： <select class='ke-xiami-align'><option value=''>无</option><option value='left'>左对齐</option><option value='right'>右对齐</option></select>"+
n.Utils.duplicateStr("&nbsp;",1)+"<label>间距： </span> <input  data-verify='^\\d+(.\\d+)?$'  data-warning='间距请输入非负数字' class='ke-xiami-margin' style='width:60px' value='5'/> 像素</label></p></form><div class='ke-xiami-list'></div>",A="http://www.xiami.com/app/nineteen/search/key/${key}/page/${page}?random=${random}&callback=bangpai_xiami";h.extend(k,j,{_config:function(){this._cls=c;this._type="bangpai-music";this._title="虾米属性";this._bodyHtml=z;this._footHtml="<button class='ke-xiami-ok'>确定</button>";
this._contentCls="ke-toolbar-music";this._tip="插入虾米音乐";this._contextMenu=B;this._flashRules=["img."+c];this._config_dwidth="400px"},_updateTip:function(d,a){var l=this.editor.restoreRealElement(a);if(l){d.html(a.attr("title"));d.attr("href",this._getFlashUrl(l))}},_initD:function(){function d(p){var m=x.val();if(m.replace(/[^\x00-\xff]/g,"@@").length>30)alert("长度上限30个字符（1个汉字=2个字符）");else if(h.trim(m)){a._xiami_submit[0].disabled=true;m={key:encodeURIComponent(x.val()),page:p,random:(new Date).valueOf()};
m=b(m);bangpai_xiami.instance=a;bangpai_xiami.page=p;a._xiamia_list.html("<img style='display:block;width:108px;margin:5px auto 0 auto;'src='"+g+"'/>");var y=h.getScript(m,{timeout:10,success:function(){},error:function(){y.src="";a._xiami_submit[0].disabled=false;a._xiamia_list.html("<p style='text-align:center;margin:10px 0;'>不好意思，超时了，请重试！</p>")}})}else alert("不能为空！")}var a=this,l=a.editor,i=a.d,q=i.el.one(".ke-xiami-form"),x=i.el.one(".ke-xiami-url");a.dAlign=i.el.one(".ke-xiami-align");a._xiami_input=
x;a._xiamia_list=i.el.one(".ke-xiami-list");a._xiami_submit=i.el.one(".ke-xiami-submit");a.dMargin=i.el.one(".ke-xiami-margin");a._xiami_url_wrap=i.el.one(".ke-xiami-url-wrap");a._xiamia_title=i.el.one(".ke-xiami-title");i.foot.one(".ke-xiami-ok").on("click",function(){var p=a.selectedFlash,m=l.restoreRealElement(p);a._dinfo={url:a._getFlashUrl(m),attrs:{title:p.attr("title"),align:a.dAlign.val(),style:"margin:"+(parseInt(a.dMargin.val())||0)+"px;"}};a._gen()},a);q.on("submit",function(p){d(1);p.halt()},
a);a._xiamia_list.on("click",function(p){p.preventDefault();var m=new t(p.target);p=m._4e_ascendant(function(y){return a._xiamia_list._4e_contains(y)&&y.hasClass("ke-xiami-add")},true);m=m._4e_ascendant(function(y){return a._xiamia_list._4e_contains(y)&&y.hasClass("ke-xiami-page-item")},true);if(p){a._dinfo={url:"http://www.xiami.com/widget/"+p.attr("data-value")+"/singlePlayer.swf",attrs:{title:p.attr("title"),align:a.dAlign.val(),style:"margin:"+(parseInt(a.dMargin.val())||0)+"px;"}};a._gen()}else m&&
d(parseInt(m.attr("data-value")))})},_listSearch:function(d){var a,l=d.results,i="";if(d.key==h.trim(this._xiami_input.val())){this._xiami_submit[0].disabled=false;if(l&&l.length){i="<ul>";for(a=0;a<l.length;a++){var q=l[a],x=decodeURIComponent(q.song_name)+" - "+decodeURIComponent(q.artist_name);i=i;var p="<li title='"+x+"'><span class='ke-xiami-song'>",m=x;if(m.length>35)m=m.substring(0,35)+"...";i=i+(p+m+"</span><a href='#' title='"+x+"' class='ke-xiami-add' data-value='"+(q.album_id+"_"+q.song_id)+
"'>选择</a></li>")}i+="</ul>";l=d.page;d=Math.floor(d.total/8);a=l-3;q=l+3;if(d>1){if(a<=2){q=Math.min(2-a+q,d-1);a=2}q=Math.min(q,d-1);if(q==d-1)a=Math.max(2,q-6);i+="<p class='ke-xiami-paging'>"+e(l,1,"1"+(a!=2?"...":""));for(a=a;a<=q;a++)i+=e(l,a);if(q!=d)i+=e(l,d,(q!=d-1?"...":"")+d);i+="</p>"}}else i="<p style='text-align:center;margin:10px 0;'>不好意思，没有找到结果！</p>";this._xiamia_list.html(i)}},_updateD:function(){var d=this.selectedFlash;if(d){this._xiami_input.val(d.attr("title"));this._xiamia_title.html(d.attr("title"));
this.dAlign.val(d.attr("align"));this.dMargin.val(parseInt(d._4e_style("margin"))||0);this._xiami_url_wrap.hide();this.d.foot.show();this._xiamia_title.show()}else{this._xiami_input.val("输入想要添加的歌曲名、专辑名、艺人名");this.dAlign.val("");this.dMargin.val("5");this._xiami_url_wrap.show();this.d.foot.hide();this._xiamia_title.hide()}this._xiami_submit[0].disabled=false;this._xiamia_list.html("")},_getDInfo:function(){h.mix(this._dinfo.attrs,{width:257,height:33});return this._dinfo}});var B={"虾米属性":function(d){var a=
d.getSelection();a=a&&a.getStartElement();a=o(a);d=d._toolbars["bangpai-music"];a&&d.show(null,a)}};j.registerBubble("bangpai-music","虾米音乐： ",o);n.BangPaiMusic=k}();u.addPlugin(function(){new n.BangPaiMusic(u)})},{attach:false,requires:["flashsupport"]});
KISSY.Editor.add("bangpai-upload",function(u){var h=KISSY,s=h.Editor;if(!s.BangPaiUpload){(function(){function v(g){this.editor=g;this._init()}var n=[],w=s.Config.base+s.Utils.debugUrl("biz/bangpai/plugins/upload/uploader.swf"),t=h.Node;h.augment(v,h.EventTarget,{_init:function(){var g=this.editor.cfg.pluginConfig["bangpai-upload"].holder,j=h.isString(g)?h.one(g):g;g=(new t("<p><button disabled='disabled'>选择文件</button></p>")).appendTo(j).one("button");var c=(new t("<div>")).appendTo(j);j=(new t("<p><button>开始上传</button></p>")).appendTo(j);
var f=h.guid("ke-bangpai-upload"),r=g.offset();n[f]=this;this.btn=g;this.up=j;this.on("contentReady",this._ready,this);this.flash=s.Utils.flash.createSWFRuntime(w,{style:"position:absolute;top:"+r.top+"px;left:"+r.left+"px;width:"+g.width()+"px;height:"+g.height()+"px;z-index:9999;",attrs:{allowScriptAccess:"always",allowNetworking:"all",scale:"noScale",width:g.width(),height:g.height()},flashVars:{allowedDomain:location.hostname,shareData:true,swfID:f,jsEntry:"KISSY.Editor.BangPaiUpload.EventHandler",
browser:"ke-bangpai-upload",useCompression:true,hand:true,btn:true}});this._list=c;this.on("select",this._onSelect,this)},_onSelect:function(){},_ready:function(){var g=this.flash;this.btn[0].disabled=false;g.browse(false,[{desc:"图片文件( png,jpg,jpeg,gif )",ext:"*.jpeg;*.jpg;*.png;*.gif"}])},_eventHandler:function(g){var j=g.type;if(j==="log")h.log(g.message);else j&&this.fire(j,g)}});v.EventHandler=function(g,j){n[g]._eventHandler.call(n[g],j)};s.BangPaiUpload=v})();u.addPlugin(function(){new s.BangPaiUpload(u)})}},
{attach:false,requires:["flashutils"]});
KISSY.Editor.add("bangpai-video",function(u){function h(c){for(var f=0;f<j.length;f++){var r=j[f];if(r.reg.test(c))return r}}var s=KISSY,v=s.Editor,n="ke_video",w=v.Flash,t=u.htmlDataProcessor,g=t&&t.dataFilter;g&&g.addRules({elements:{object:function(c){var f=c.attributes;if(!(f.classid&&String(f.classid).toLowerCase())){for(f=0;f<c.children.length;f++)if(c.children[f].name=="embed"){if(!w.isFlashEmbed(c.children[f]))break;if(h(c.children[f].attributes.src))return t.createFakeParserElement(c,n,"bangpai-video",
true)}return null}for(f=0;f<c.children.length;f++){var r=c.children[f];if(r.name=="param"&&r.attributes.name=="movie")if(h(r.attributes.value))return t.createFakeParserElement(c,n,"bangpai-video",true)}},embed:function(c){if(!w.isFlashEmbed(c))return null;if(h(c.attributes.src))return t.createFakeParserElement(c,n,"bangpai-video",true)}}},4);var j=[{reg:/youku\.com/i,width:480,height:400,detect:function(c){var f=c.match(/id_([^.]+)\.html$/);if(f)return"http://player.youku.com/player.php/sid/"+f[1]+
"/v.swf";return c}},{reg:/tudou\.com/i,width:480,height:400,detect:function(c){var f=c.match(/\/view\/([^/]+)\/$/);if(f)return"http://www.tudou.com/v/"+f[1]+"/v.swf";return c}},{reg:/ku6\.com/i,width:480,height:400,detect:function(c){var f=c.match(/show[^\/]*\/([^.]+)\.html$/);if(f)return"http://player.ku6.com/refer/"+f[1]+"/v.swf";return c}}];v.BangPaiVideo||function(){function c(){c.superclass.constructor.apply(this,arguments)}function f(b){return b._4e_name()==="img"&&!!b.hasClass(n)&&b}var r=
["img."+n];s.extend(c,w,{_config:function(){var b=this.editor.cfg.pluginConfig;this._cls=n;this._type="bangpai-video";this._title="视频属性";this._bodyHtml="<table><tr><td colspan='2'>需要分享的视频链接：支持 土豆，优酷，ku6 视频分享</td></tr><tr><td colspan='2'><label><span style='color:#0066CC;font-weight:bold;'>视频链接： </span><input class='ke-video-url' style='width:230px' value='http://'/></label></td></tr><tr><td><label>宽度： </span> <input  data-verify='^自动|((?!0$)\\d+(.\\d+)?)$'  data-warning='宽度请输入正数' class='ke-video-width' style='width:60px' value='自动'/> 像素 </label></td><td><label> 高度： </span> <input  data-verify='^自动|((?!0$)\\d+(.\\d+)?)$'  data-warning='高度请输入正数' class='ke-video-height' style='width:60px' value='自动'/> 像素 </label></td></tr><tr><td><label>对齐： <select class='ke-video-align'><option value=''>无</option><option value='left'>左对齐</option><option value='right'>右对齐</option></select></td><td><label>间距： </span> <input  data-verify='^\\d+(.\\d+)?$'  data-warning='间距请输入非负数字' class='ke-video-margin' style='width:60px' value='5'/> 像素</label></td></tr></table>";
this._footHtml="<button class='ke-video-ok'>确定</button> <button class='ke-video-cancel'>取消</button>";this._contentCls="ke-toolbar-video";this._tip="插入视频";this._contextMenu=k;this._flashRules=r;this.urlCfg=b["bangpai-video"]&&b["bangpai-video"].urlCfg},_initD:function(){var b=this,e=b.d;b.dUrl=e.el.one(".ke-video-url");b.dAlign=e.el.one(".ke-video-align");b.dMargin=e.el.one(".ke-video-margin");b.dWidth=e.el.one(".ke-video-width");b.dHeight=e.el.one(".ke-video-height");var o=e.el.one(".ke-video-ok");
e=e.el.one(".ke-video-cancel");o.on("click",b._gen,b);e.on("click",function(){b.d.hide()})},_getDInfo:function(){var b=this.dUrl.val(),e=h(b);if(e)if(b=e.detect(b))return{url:b,attrs:{height:parseInt(this.dHeight.val())||e.height,width:parseInt(this.dWidth.val())||e.width,align:this.dAlign.val(),style:"margin:"+(parseInt(this.dMargin.val())||0)+"px;"}};else alert("http://");else alert("不支持该链接来源!")},_gen:function(){var b=this.dUrl.val(),e=this.urlCfg;if(e)for(var o=0;o<e.length;o++){var z=e[o];if(z.reg.test(b)){this.d.loading();
c.dynamicUrl.origin=b;c.dynamicUrl.instance=this;s.getScript(z.url.replace(/@url@/,encodeURIComponent(b)).replace(/@callback@/,encodeURIComponent("KISSY.Editor.BangPaiVideo.dynamicUrl")));return}}c.superclass._gen.call(this)},_dynamicUrlPrepare:function(b){this.dUrl.val(b);this.d.unloading();c.superclass._gen.call(this)},_updateD:function(){var b=this.editor,e=this.selectedFlash;if(e){b=b.restoreRealElement(e);this.dUrl.val(this._getFlashUrl(b));this.dAlign.val(b.attr("align"));this.dMargin.val(parseInt(b._4e_style("margin"))||
0);this.dWidth.val(b.attr("width"));this.dHeight.val(b.attr("height"))}else{this.dUrl.val("http://");this.dAlign.val("");this.dMargin.val("5");this.dWidth.val("自动");this.dHeight.val("自动")}}});c.dynamicUrl=function(b,e){b===c.dynamicUrl.origin&&c.dynamicUrl.instance._dynamicUrlPrepare(e)};w.registerBubble("bangpai-video","视频链接： ",f);v.BangPaiVideo=c;var k={"视频属性":function(b){var e=b.getSelection();e=(e=e&&e.getStartElement())&&f(e);b=b._toolbars["bangpai-video"];e&&b.show(null,e)}}}();u.addPlugin(function(){new v.BangPaiVideo(u)})},
{attach:false,requires:["flashsupport"]});
