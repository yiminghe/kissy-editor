KISSY.Editor.add("bangpai-music",function(u){var j=KISSY,t=j.UA,v=j.Event,r=j.Editor,o=j.DOM,w=j.Node,x=r.Config.base+"theme/loading.gif",g=r.Flash,b="ke_xiami",d=u.htmlDataProcessor,i=d&&d.dataFilter;i&&i.addRules({elements:{object:function(h){var c=h.attributes,f=h.attributes.title,k;if(!(c.classid&&String(c.classid).toLowerCase())){for(c=0;c<h.children.length;c++){k=h.children[c];if(k.name=="embed"){if(!g.isFlashEmbed(k))break;if(/xiami\.com/i.test(k.attributes.src))return d.createFakeParserElement(h,
b,"bangpai-music",true,{title:f})}}return null}for(c=0;c<h.children.length;c++){k=h.children[c];if(k.name=="param"&&k.attributes.name=="movie")if(/xiami\.com/i.test(k.attributes.value))return d.createFakeParserElement(h,b,"bangpai-music",true,{title:f})}},embed:function(h){if(!g.isFlashEmbed(h))return null;if(/xiami\.com/i.test(h.attributes.src))return d.createFakeParserElement(h,b,"bangpai-music",true,{title:h.attributes.title})}}},4);r.BangPaiMusic||function(){function h(e){h.superclass.constructor.apply(this,
arguments);e.cfg.disableObjectResizing||v.on(e.document.body,t.ie?"resizestart":"resize",function(a){o.hasClass(a.target,b)&&a.preventDefault()})}function c(e){return y.replace(/\${([^}]+)}/g,function(a,m){return e[m]})}function f(e,a,m){return"<a class='ke-xiami-page-item"+(e==a?" ke-xiami-curpage":"")+"' data-value='"+a+"' href='#'>"+(m||a)+"</a>"}function k(e){return e._4e_name()==="img"&&!!e.hasClass(b)&&e}o.addStyleSheet(".ke-xiami-list {margin-top:10px;}.ke-xiami-list li{border:1px dotted gray;border-width:0 0 1px 0;overflow:hidden;zoom:1;padding:2px;}\n.ke-xiami-list .ke-xiami-add {float:right;}\n.ke-xiami-list .ke-xiami-song {float:left;}\n.ke-xiami-paging a{display: inline-block; zoom: 1;  *display: inline; border:1px solid gray;padding:0 5px;margin:0 2px;}\n.ke-xiami-paging a:hover,.ke-xiami-paging a.ke-xiami-curpage {background-color:orange;}\n.ke-xiami-paging {text-align:center;margin-top:10px;}\n",
"BangPaiMusic");window.bangpai_xiami=function(e){var a=bangpai_xiami.instance;e.page=bangpai_xiami.page;a._listSearch(e)};var s="<form action='#' class='ke-xiami-form'><p class='ke-xiami-title'></p><p class='ke-xiami-url-wrap'><input class='ke-xiami-url' style='width:300px' value='\u8f93\u5165\u60f3\u8981\u6dfb\u52a0\u7684\u6b4c\u66f2\u540d\u3001\u4e13\u8f91\u540d\u3001\u827a\u4eba\u540d'/> &nbsp;  <input class='ke-xiami-submit' type='submit' style='vertical-align:middle;' value='\u641c \u7d22 ' /></p><p style='margin:5px 0'><label>\u5bf9 \u9f50\uff1a <select class='ke-xiami-align'><option value=''>\u65e0</option><option value='left'>\u5de6\u5bf9\u9f50</option><option value='right'>\u53f3\u5bf9\u9f50</option></select>"+
r.Utils.duplicateStr("&nbsp;",1)+"<label>\u95f4\u8ddd\uff1a </span> <input  data-verify='^\\d+(.\\d+)?$'  data-warning='\u95f4\u8ddd\u8bf7\u8f93\u5165\u975e\u8d1f\u6570\u5b57' class='ke-xiami-margin' style='width:60px' value='5'/> \u50cf\u7d20</label></p></form><div class='ke-xiami-list'></div>",y="http://www.xiami.com/app/nineteen/search/key/${key}/page/${page}?random=${random}&callback=bangpai_xiami";j.extend(h,g,{_config:function(){this._cls=b;this._type="bangpai-music";this._title="\u867e\u7c73\u5c5e\u6027";this._bodyHtml=s;this._footHtml="<button class='ke-xiami-ok'>\u786e\u5b9a</button>";
this._contentCls="ke-toolbar-music";this._tip="\u63d2\u5165\u867e\u7c73\u97f3\u4e50";this._contextMenu=B;this._flashRules=["img."+b];this._config_dwidth="400px"},_updateTip:function(e,a){var m=this.editor.restoreRealElement(a);if(m){e.html(a.attr("title"));e.attr("href",this._getFlashUrl(m))}},_initD:function(){function e(p){var n=z.val();if(n.replace(/[^\x00-\xff]/g,"@@").length>30)alert("\u957f\u5ea6\u4e0a\u965030\u4e2a\u5b57\u7b26\uff081\u4e2a\u6c49\u5b57=2\u4e2a\u5b57\u7b26\uff09");else if(j.trim(n)){a._xiami_submit[0].disabled=true;n={key:encodeURIComponent(z.val()),page:p,random:(new Date).valueOf()};
n=c(n);bangpai_xiami.instance=a;bangpai_xiami.page=p;a._xiamia_list.html("<img style='display:block;width:108px;margin:5px auto 0 auto;'src='"+x+"'/>");var A=j.getScript(n,{timeout:10,success:function(){},error:function(){A.src="";a._xiami_submit[0].disabled=false;a._xiamia_list.html("<p style='text-align:center;margin:10px 0;'>\u4e0d\u597d\u610f\u601d\uff0c\u8d85\u65f6\u4e86\uff0c\u8bf7\u91cd\u8bd5\uff01</p>")}})}else alert("\u4e0d\u80fd\u4e3a\u7a7a\uff01")}var a=this,m=a.editor,l=a.d,q=l.el.one(".ke-xiami-form"),z=l.el.one(".ke-xiami-url");a.dAlign=l.el.one(".ke-xiami-align");a._xiami_input=
z;a._xiamia_list=l.el.one(".ke-xiami-list");a._xiami_submit=l.el.one(".ke-xiami-submit");a.dMargin=l.el.one(".ke-xiami-margin");a._xiami_url_wrap=l.el.one(".ke-xiami-url-wrap");a._xiamia_title=l.el.one(".ke-xiami-title");l.foot.one(".ke-xiami-ok").on("click",function(){var p=a.selectedFlash,n=m.restoreRealElement(p);a._dinfo={url:a._getFlashUrl(n),attrs:{title:p.attr("title"),align:a.dAlign.val(),style:"margin:"+(parseInt(a.dMargin.val())||0)+"px;"}};a._gen()},a);q.on("submit",function(p){e(1);p.halt()},
a);a._xiamia_list.on("click",function(p){p.preventDefault();var n=new w(p.target);p=n._4e_ascendant(function(A){return a._xiamia_list._4e_contains(A)&&A.hasClass("ke-xiami-add")},true);n=n._4e_ascendant(function(A){return a._xiamia_list._4e_contains(A)&&A.hasClass("ke-xiami-page-item")},true);if(p){a._dinfo={url:"http://www.xiami.com/widget/"+p.attr("data-value")+"/singlePlayer.swf",attrs:{title:p.attr("title"),align:a.dAlign.val(),style:"margin:"+(parseInt(a.dMargin.val())||0)+"px;"}};a._gen()}else n&&
e(parseInt(n.attr("data-value")))})},_listSearch:function(e){var a,m=e.results,l="";if(e.key==j.trim(this._xiami_input.val())){this._xiami_submit[0].disabled=false;if(m&&m.length){l="<ul>";for(a=0;a<m.length;a++){var q=m[a],z=decodeURIComponent(q.song_name)+" - "+decodeURIComponent(q.artist_name);l=l;var p="<li title='"+z+"'><span class='ke-xiami-song'>",n=z;if(n.length>35)n=n.substring(0,35)+"...";l=l+(p+n+"</span><a href='#' title='"+z+"' class='ke-xiami-add' data-value='"+(q.album_id+"_"+q.song_id)+
"'>\u9009\u62e9</a></li>")}l+="</ul>";m=e.page;e=Math.floor(e.total/8);a=m-3;q=m+3;if(e>1){if(a<=2){q=Math.min(2-a+q,e-1);a=2}q=Math.min(q,e-1);if(q==e-1)a=Math.max(2,q-6);l+="<p class='ke-xiami-paging'>"+f(m,1,"1"+(a!=2?"...":""));for(a=a;a<=q;a++)l+=f(m,a);if(q!=e)l+=f(m,e,(q!=e-1?"...":"")+e);l+="</p>"}}else l="<p style='text-align:center;margin:10px 0;'>\u4e0d\u597d\u610f\u601d\uff0c\u6ca1\u6709\u627e\u5230\u7ed3\u679c\uff01</p>";this._xiamia_list.html(l)}},_updateD:function(){var e=this.selectedFlash;if(e){this._xiami_input.val(e.attr("title"));this._xiamia_title.html(e.attr("title"));
this.dAlign.val(e.attr("align"));this.dMargin.val(parseInt(e._4e_style("margin"))||0);this._xiami_url_wrap.hide();this.d.foot.show();this._xiamia_title.show()}else{this._xiami_input.val("\u8f93\u5165\u60f3\u8981\u6dfb\u52a0\u7684\u6b4c\u66f2\u540d\u3001\u4e13\u8f91\u540d\u3001\u827a\u4eba\u540d");this.dAlign.val("");this.dMargin.val("5");this._xiami_url_wrap.show();this.d.foot.hide();this._xiamia_title.hide()}this._xiami_submit[0].disabled=false;this._xiamia_list.html("")},_getDInfo:function(){j.mix(this._dinfo.attrs,{width:257,height:33});return this._dinfo}});var B={"\u867e\u7c73\u5c5e\u6027":function(e){var a=
e.getSelection();a=a&&a.getStartElement();a=k(a);e=e._toolbars["bangpai-music"];a&&e.show(null,a)}};g.registerBubble("bangpai-music","\u867e\u7c73\u97f3\u4e50\uff1a ",k);r.BangPaiMusic=h}();u.addPlugin(function(){new r.BangPaiMusic(u)})},{attach:false,requires:["flashsupport"]});
KISSY.Editor.add("bangpai-upload",function(u){var j=KISSY,t=j.Editor;if(!t.BangPaiUpload){(function(){function v(g){this.editor=g;this._init()}var r=j.DOM,o=j.Node,w=t.Config.base+t.Utils.debugUrl("plugins/uploader/uploader.swf"),x={};name="ke-bangpai-upload";r.addStyleSheet(".ke-upload-list {width:100%;}.ke-upload-list th {border-top:1px solid #c1c8d1;background-color:#EBEDF1;}.ke-upload-list td,.ke-upload-list th {padding:0.5em;text-align:center;border-bottom:1px solid #c1c8d1;}","ke-BangPaiUpload");
j.augment(v,j.EventTarget,{_init:function(){var g=this.editor,b=g.cfg.pluginConfig["bangpai-upload"],d=b.holder,i=j.isString(d)?j.one(d):d,h=(new o("<div style='position:relative;margin:10px;'>\u6279\u91cf\u4e0a\u4f20\u56fe\u7247\uff1a</div>")).appendTo(i);d=(new o("<button disabled='disabled'>\u6d4f\u89c8</button>")).appendTo(h);var c=d.offset();h.offset();h=(new o("<div style='"+("position:absolute;width:"+(d.width()+8)+"px;height:"+(d.height()+8)+"px;z-index:9999;")+"'>")).appendTo(h);var f=(new o("<div><table class='ke-upload-list'><thead><tr><th>\u56fe\u7247</td><th>\u5927\u5c0f</td><th>\u4e0a\u4f20\u8fdb\u5ea6</td><th>\u56fe\u7247\u64cd\u4f5c</td></tr></thead><tbody></tbody></table></div>")).appendTo(i).one("tbody");
i=(new o("<p style='margin:10px;text-align:right;'><button>\u786e\u5b9a\u4e0a\u4f20</button></p>")).appendTo(i).one("button");var k=j.guid(name);this.btn=d;this.up=i;h.offset(c);var s=new t.FlashBridge({movie:w,methods:["removeFile","cancel","removeFile","setAllowMultipleFiles","setFileFilters","uploadAll"],holder:h,attrs:{width:d.width(),height:d.height()},flashVars:{menu:true}});this.uploader=s;this._list=f;this._ds=b.serverUrl;this._dsp=b.serverParams||{};f.on("click",function(y){var B=new o(y.target);y.halt();if(B.hasClass("ke-upload-insert")){y=
B.parent("tr");url=y.attr("url");g.insertElement(new o("<img src='"+url+"'/>",null,g.document))}else if(B.hasClass("ke-upload-delete")){y=B.parent("tr");k=y.attr("fid");try{s.cancel(k)}catch(e){}s.removeFile(k);x[k].destroy();delete x[k];y._4e_remove()}});s.on("fileSelect",this._onSelect,this);s.on("uploadStart",this._onUploadStart,this);s.on("uploadProgress",this._onProgress,this);s.on("uploadComplete",this._onComplete,this);s.on("uploadCompleteData",this._onUploadCompleteData,this);s.on("swfReady",
this._ready,this)},_onUploadStart:function(g){this.uploader.removeFile(g.id)},_onComplete:function(){},_onUploadCompleteData:function(g){var b=j.trim(g.data).replace(/\\r||\\n/g,"");g=g.id;var d=this._list.all("tr");if(b){b=JSON.parse(b);if(b.error)alert(b.error);else for(var i=0;i<d.length;i++){var h=new o(d[i]);if(h.attr("fid")==g){h.one(".ke-upload-insert").show();h.attr("url",b.imgUrl)}}}},_onProgress:function(g){var b=g.bytesLoaded*100/g.bytesTotal;(g=x[g.id])&&g.set("progress",b)},_onSelect:function(g){var b=
this._list;if(g=g.fileList)for(var d in g)if(g.hasOwnProperty(d)){var i=g[d],h=(new o("<tr fid='"+i.id+"'><td>"+i.name+"</td><td>"+Math.floor(i.size/1E3)+"k</td><td class='ke-upload-progress'></td><td><a href='#' class='ke-upload-insert' style='display:none'>[\u63d2\u5165]</a> &nbsp; <a href='#' class='ke-upload-delete'>[\u5220\u9664]</a> &nbsp; </td></tr>")).appendTo(b);x[i.id]=new t.ProgressBar({container:h.one(".ke-upload-progress"),width:"100px",height:"18px"})}},_ready:function(){var g=this,b=g.uploader,d=g.up;
g.btn[0].disabled=false;b.setAllowMultipleFiles(true);b.setFileFilters([{extensions:"*.jpeg;*.jpg;*.png;*.gif",description:"\u56fe\u7247\u6587\u4ef6( png,jpg,jpeg,gif )"}]);d.on("click",function(){b.uploadAll(g._ds,"POST",g._dsp,"Filedata")})}});t.BangPaiUpload=v})();u.addPlugin(function(){new t.BangPaiUpload(u)})}},{attach:false,requires:["flashutils","progressbar","flashbridge"]});
KISSY.Editor.add("bangpai-video",function(u){function j(b){for(var d=0;d<g.length;d++){var i=g[d];if(i.reg.test(b))return i}}var t=KISSY,v=t.Editor,r="ke_video",o=v.Flash,w=u.htmlDataProcessor,x=w&&w.dataFilter;x&&x.addRules({elements:{object:function(b){var d=b.attributes;if(!(d.classid&&String(d.classid).toLowerCase())){for(d=0;d<b.children.length;d++)if(b.children[d].name=="embed"){if(!o.isFlashEmbed(b.children[d]))break;if(j(b.children[d].attributes.src))return w.createFakeParserElement(b,r,"bangpai-video",
true)}return null}for(d=0;d<b.children.length;d++){var i=b.children[d];if(i.name=="param"&&i.attributes.name=="movie")if(j(i.attributes.value))return w.createFakeParserElement(b,r,"bangpai-video",true)}},embed:function(b){if(!o.isFlashEmbed(b))return null;if(j(b.attributes.src))return w.createFakeParserElement(b,r,"bangpai-video",true)}}},4);var g=[{reg:/youku\.com/i,width:480,height:400,detect:function(b){var d=b.match(/id_([^.]+)\.html$/);if(d)return"http://player.youku.com/player.php/sid/"+d[1]+
"/v.swf";return b}},{reg:/tudou\.com/i,width:480,height:400,detect:function(b){var d=b.match(/\/view\/([^/]+)\/$/);if(d)return"http://www.tudou.com/v/"+d[1]+"/v.swf";return b}},{reg:/ku6\.com/i,width:480,height:400,detect:function(b){var d=b.match(/show[^\/]*\/([^.]+)\.html$/);if(d)return"http://player.ku6.com/refer/"+d[1]+"/v.swf";return b}}];v.BangPaiVideo||function(){function b(){b.superclass.constructor.apply(this,arguments)}function d(c){return c._4e_name()==="img"&&!!c.hasClass(r)&&c}var i=
["img."+r];t.extend(b,o,{_config:function(){var c=this.editor.cfg.pluginConfig;this._cls=r;this._type="bangpai-video";this._title="\u89c6\u9891\u5c5e\u6027";this._bodyHtml="<table><tr><td colspan='2'>\u9700\u8981\u5206\u4eab\u7684\u89c6\u9891\u94fe\u63a5\uff1a\u652f\u6301 \u571f\u8c46\uff0c\u4f18\u9177\uff0cku6 \u89c6\u9891\u5206\u4eab</td></tr><tr><td colspan='2'><label><span style='color:#0066CC;font-weight:bold;'>\u89c6\u9891\u94fe\u63a5\uff1a </span><input class='ke-video-url' style='width:230px' value='http://'/></label></td></tr><tr><td><label>\u5bbd\u5ea6\uff1a </span> <input  data-verify='^\u81ea\u52a8|((?!0$)\\d+(.\\d+)?)$'  data-warning='\u5bbd\u5ea6\u8bf7\u8f93\u5165\u6b63\u6570' class='ke-video-width' style='width:60px' value='\u81ea\u52a8'/> \u50cf\u7d20 </label></td><td><label> \u9ad8\u5ea6\uff1a </span> <input  data-verify='^\u81ea\u52a8|((?!0$)\\d+(.\\d+)?)$'  data-warning='\u9ad8\u5ea6\u8bf7\u8f93\u5165\u6b63\u6570' class='ke-video-height' style='width:60px' value='\u81ea\u52a8'/> \u50cf\u7d20 </label></td></tr><tr><td><label>\u5bf9\u9f50\uff1a <select class='ke-video-align'><option value=''>\u65e0</option><option value='left'>\u5de6\u5bf9\u9f50</option><option value='right'>\u53f3\u5bf9\u9f50</option></select></td><td><label>\u95f4\u8ddd\uff1a </span> <input  data-verify='^\\d+(.\\d+)?$'  data-warning='\u95f4\u8ddd\u8bf7\u8f93\u5165\u975e\u8d1f\u6570\u5b57' class='ke-video-margin' style='width:60px' value='5'/> \u50cf\u7d20</label></td></tr></table>";
this._footHtml="<button class='ke-video-ok'>\u786e\u5b9a</button> <button class='ke-video-cancel'>\u53d6\u6d88</button>";this._contentCls="ke-toolbar-video";this._tip="\u63d2\u5165\u89c6\u9891";this._contextMenu=h;this._flashRules=i;this.urlCfg=c["bangpai-video"]&&c["bangpai-video"].urlCfg},_initD:function(){var c=this,f=c.d;c.dUrl=f.el.one(".ke-video-url");c.dAlign=f.el.one(".ke-video-align");c.dMargin=f.el.one(".ke-video-margin");c.dWidth=f.el.one(".ke-video-width");c.dHeight=f.el.one(".ke-video-height");var k=f.el.one(".ke-video-ok");
f=f.el.one(".ke-video-cancel");k.on("click",c._gen,c);f.on("click",function(){c.d.hide()})},_getDInfo:function(){var c=this.dUrl.val(),f=j(c);if(f)if(c=f.detect(c))return{url:c,attrs:{height:parseInt(this.dHeight.val())||f.height,width:parseInt(this.dWidth.val())||f.width,align:this.dAlign.val(),style:"margin:"+(parseInt(this.dMargin.val())||0)+"px;"}};else alert("http://");else alert("\u4e0d\u652f\u6301\u8be5\u94fe\u63a5\u6765\u6e90!")},_gen:function(){var c=this.dUrl.val(),f=this.urlCfg;if(f)for(var k=0;k<f.length;k++){var s=f[k];if(s.reg.test(c)){this.d.loading();
b.dynamicUrl.origin=c;b.dynamicUrl.instance=this;t.getScript(s.url.replace(/@url@/,encodeURIComponent(c)).replace(/@callback@/,encodeURIComponent("KISSY.Editor.BangPaiVideo.dynamicUrl")));return}}b.superclass._gen.call(this)},_dynamicUrlPrepare:function(c){this.dUrl.val(c);this.d.unloading();b.superclass._gen.call(this)},_updateD:function(){var c=this.editor,f=this.selectedFlash;if(f){c=c.restoreRealElement(f);this.dUrl.val(this._getFlashUrl(c));this.dAlign.val(c.attr("align"));this.dMargin.val(parseInt(c._4e_style("margin"))||
0);this.dWidth.val(c.attr("width"));this.dHeight.val(c.attr("height"))}else{this.dUrl.val("http://");this.dAlign.val("");this.dMargin.val("5");this.dWidth.val("\u81ea\u52a8");this.dHeight.val("\u81ea\u52a8")}}});b.dynamicUrl=function(c,f){c===b.dynamicUrl.origin&&b.dynamicUrl.instance._dynamicUrlPrepare(f)};o.registerBubble("bangpai-video","\u89c6\u9891\u94fe\u63a5\uff1a ",d);v.BangPaiVideo=b;var h={"\u89c6\u9891\u5c5e\u6027":function(c){var f=c.getSelection();f=(f=f&&f.getStartElement())&&d(f);c=c._toolbars["bangpai-video"];f&&c.show(null,f)}}}();u.addPlugin(function(){new v.BangPaiVideo(u)})},
{attach:false,requires:["flashsupport"]});
