KISSY.Editor.add("bangpai-music",function(u){var j=KISSY,s=j.UA,x=j.Event,r=j.Editor,o=j.DOM,y=j.Node,v=r.Config.base+"theme/loading.gif",f=r.Flash,a="ke_xiami",d=u.htmlDataProcessor,h=d&&d.dataFilter;h&&h.addRules({elements:{object:function(i){var c=i.attributes,g=i.attributes.title,l;if(!(c.classid&&String(c.classid).toLowerCase())){for(c=0;c<i.children.length;c++){l=i.children[c];if(l.name=="embed"){if(!f.isFlashEmbed(l))break;if(/xiami\.com/i.test(l.attributes.src))return d.createFakeParserElement(i,
a,"bangpai-music",true,{title:g})}}return null}for(c=0;c<i.children.length;c++){l=i.children[c];if(l.name=="param"&&l.attributes.name=="movie")if(/xiami\.com/i.test(l.attributes.value))return d.createFakeParserElement(i,a,"bangpai-music",true,{title:g})}},embed:function(i){if(!f.isFlashEmbed(i))return null;if(/xiami\.com/i.test(i.attributes.src))return d.createFakeParserElement(i,a,"bangpai-music",true,{title:i.attributes.title})}}},4);r.BangPaiMusic||function(){function i(e){i.superclass.constructor.apply(this,
arguments);e.cfg.disableObjectResizing||x.on(e.document.body,s.ie?"resizestart":"resize",function(b){o.hasClass(b.target,a)&&b.preventDefault()})}function c(e){return t.replace(/\${([^}]+)}/g,function(b,m){return e[m]})}function g(e,b,m){return"<a class='ke-xiami-page-item"+(e==b?" ke-xiami-curpage":"")+"' data-value='"+b+"' href='#'>"+(m||b)+"</a>"}function l(e){return e._4e_name()==="img"&&!!e.hasClass(a)&&e}o.addStyleSheet(".ke-xiami-list {margin-top:10px;}.ke-xiami-list li{border:1px dotted gray;border-width:0 0 1px 0;overflow:hidden;zoom:1;padding:2px;}\n.ke-xiami-list .ke-xiami-add {float:right;}\n.ke-xiami-list .ke-xiami-song {float:left;}\n.ke-xiami-paging a{display: inline-block; zoom: 1;  *display: inline; border:1px solid gray;padding:0 5px;margin:0 2px;}\n.ke-xiami-paging a:hover,.ke-xiami-paging a.ke-xiami-curpage {background-color:orange;}\n.ke-xiami-paging {text-align:center;margin-top:10px;}\n",
"BangPaiMusic");window.bangpai_xiami=function(e){var b=bangpai_xiami.instance;e.page=bangpai_xiami.page;b._listSearch(e)};var w="<form action='#' class='ke-xiami-form'><p class='ke-xiami-title'></p><p class='ke-xiami-url-wrap'><input class='ke-xiami-url' style='width:300px' value='\u8f93\u5165\u60f3\u8981\u6dfb\u52a0\u7684\u6b4c\u66f2\u540d\u3001\u4e13\u8f91\u540d\u3001\u827a\u4eba\u540d'/> &nbsp;  <input class='ke-xiami-submit' type='submit' style='vertical-align:middle;' value='\u641c \u7d22 ' /></p><p style='margin:5px 0'><label>\u5bf9 \u9f50\uff1a <select class='ke-xiami-align'><option value=''>\u65e0</option><option value='left'>\u5de6\u5bf9\u9f50</option><option value='right'>\u53f3\u5bf9\u9f50</option></select>"+
r.Utils.duplicateStr("&nbsp;",1)+"<label>\u95f4\u8ddd\uff1a </span> <input  data-verify='^\\d+(.\\d+)?$'  data-warning='\u95f4\u8ddd\u8bf7\u8f93\u5165\u975e\u8d1f\u6570\u5b57' class='ke-xiami-margin' style='width:60px' value='5'/> \u50cf\u7d20</label></p></form><div class='ke-xiami-list'></div>",t="http://www.xiami.com/app/nineteen/search/key/${key}/page/${page}?random=${random}&callback=bangpai_xiami";j.extend(i,f,{_config:function(){this._cls=a;this._type="bangpai-music";this._title="\u867e\u7c73\u5c5e\u6027";this._bodyHtml=w;this._footHtml="<button class='ke-xiami-ok'>\u786e\u5b9a</button>";
this._contentCls="ke-toolbar-music";this._tip="\u63d2\u5165\u867e\u7c73\u97f3\u4e50";this._contextMenu=z;this._flashRules=["img."+a];this._config_dwidth="400px"},_updateTip:function(e,b){var m=this.editor.restoreRealElement(b);if(m){e.html(b.attr("title"));e.attr("href",this._getFlashUrl(m))}},_initD:function(){function e(p){var n=A.val();if(n.replace(/[^\x00-\xff]/g,"@@").length>30)alert("\u957f\u5ea6\u4e0a\u965030\u4e2a\u5b57\u7b26\uff081\u4e2a\u6c49\u5b57=2\u4e2a\u5b57\u7b26\uff09");else if(j.trim(n)){b._xiami_submit[0].disabled=true;n={key:encodeURIComponent(A.val()),page:p,random:(new Date).valueOf()};
n=c(n);bangpai_xiami.instance=b;bangpai_xiami.page=p;b._xiamia_list.html("<img style='display:block;width:108px;margin:5px auto 0 auto;'src='"+v+"'/>");var B=j.getScript(n,{timeout:10,success:function(){},error:function(){B.src="";b._xiami_submit[0].disabled=false;b._xiamia_list.html("<p style='text-align:center;margin:10px 0;'>\u4e0d\u597d\u610f\u601d\uff0c\u8d85\u65f6\u4e86\uff0c\u8bf7\u91cd\u8bd5\uff01</p>")}})}else alert("\u4e0d\u80fd\u4e3a\u7a7a\uff01")}var b=this,m=b.editor,k=b.d,q=k.el.one(".ke-xiami-form"),A=k.el.one(".ke-xiami-url");b.dAlign=k.el.one(".ke-xiami-align");b._xiami_input=
A;b._xiamia_list=k.el.one(".ke-xiami-list");b._xiami_submit=k.el.one(".ke-xiami-submit");b.dMargin=k.el.one(".ke-xiami-margin");b._xiami_url_wrap=k.el.one(".ke-xiami-url-wrap");b._xiamia_title=k.el.one(".ke-xiami-title");k.foot.one(".ke-xiami-ok").on("click",function(){var p=b.selectedFlash,n=m.restoreRealElement(p);b._dinfo={url:b._getFlashUrl(n),attrs:{title:p.attr("title"),align:b.dAlign.val(),style:"margin:"+(parseInt(b.dMargin.val())||0)+"px;"}};b._gen()},b);q.on("submit",function(p){e(1);p.halt()},
b);b._xiamia_list.on("click",function(p){p.preventDefault();var n=new y(p.target);p=n._4e_ascendant(function(B){return b._xiamia_list._4e_contains(B)&&B.hasClass("ke-xiami-add")},true);n=n._4e_ascendant(function(B){return b._xiamia_list._4e_contains(B)&&B.hasClass("ke-xiami-page-item")},true);if(p){b._dinfo={url:"http://www.xiami.com/widget/"+p.attr("data-value")+"/singlePlayer.swf",attrs:{title:p.attr("title"),align:b.dAlign.val(),style:"margin:"+(parseInt(b.dMargin.val())||0)+"px;"}};b._gen()}else n&&
e(parseInt(n.attr("data-value")))})},_listSearch:function(e){var b,m=e.results,k="";if(e.key==j.trim(this._xiami_input.val())){this._xiami_submit[0].disabled=false;if(m&&m.length){k="<ul>";for(b=0;b<m.length;b++){var q=m[b],A=decodeURIComponent(q.song_name)+" - "+decodeURIComponent(q.artist_name);k=k;var p="<li title='"+A+"'><span class='ke-xiami-song'>",n=A;if(n.length>35)n=n.substring(0,35)+"...";k=k+(p+n+"</span><a href='#' title='"+A+"' class='ke-xiami-add' data-value='"+(q.album_id+"_"+q.song_id)+
"'>\u9009\u62e9</a></li>")}k+="</ul>";m=e.page;e=Math.floor(e.total/8);b=m-3;q=m+3;if(e>1){if(b<=2){q=Math.min(2-b+q,e-1);b=2}q=Math.min(q,e-1);if(q==e-1)b=Math.max(2,q-6);k+="<p class='ke-xiami-paging'>"+g(m,1,"1"+(b!=2?"...":""));for(b=b;b<=q;b++)k+=g(m,b);if(q!=e)k+=g(m,e,(q!=e-1?"...":"")+e);k+="</p>"}}else k="<p style='text-align:center;margin:10px 0;'>\u4e0d\u597d\u610f\u601d\uff0c\u6ca1\u6709\u627e\u5230\u7ed3\u679c\uff01</p>";this._xiamia_list.html(k)}},_updateD:function(){var e=this.selectedFlash;if(e){this._xiami_input.val(e.attr("title"));this._xiamia_title.html(e.attr("title"));
this.dAlign.val(e.attr("align"));this.dMargin.val(parseInt(e._4e_style("margin"))||0);this._xiami_url_wrap.hide();this.d.foot.show();this._xiamia_title.show()}else{this._xiami_input.val("\u8f93\u5165\u60f3\u8981\u6dfb\u52a0\u7684\u6b4c\u66f2\u540d\u3001\u4e13\u8f91\u540d\u3001\u827a\u4eba\u540d");this.dAlign.val("");this.dMargin.val("5");this._xiami_url_wrap.show();this.d.foot.hide();this._xiamia_title.hide()}this._xiami_submit[0].disabled=false;this._xiamia_list.html("")},_getDInfo:function(){j.mix(this._dinfo.attrs,{width:257,height:33});return this._dinfo}});var z={"\u867e\u7c73\u5c5e\u6027":function(e){var b=
e.getSelection();b=b&&b.getStartElement();b=l(b);e=e._toolbars["bangpai-music"];b&&e.show(null,b)}};f.registerBubble("bangpai-music","\u867e\u7c73\u97f3\u4e50\uff1a ",l);r.BangPaiMusic=i}();u.addPlugin(function(){new r.BangPaiMusic(u)})},{attach:false,requires:["flashsupport"]});
KISSY.Editor.add("bangpai-upload",function(u){var j=KISSY,s=j.Editor;if(!s.BangPaiUpload){(function(){function x(f){this.editor=f;this._init()}var r=j.DOM,o=j.Node,y=s.Config.base+s.Utils.debugUrl("plugins/uploader/uploader.swf"),v={};name="ke-bangpai-upload";r.addStyleSheet(".ke-upload-list {width:100%;}.ke-upload-list th {border-top:1px solid #c1c8d1;background-color:#EBEDF1;}.ke-upload-list td,.ke-upload-list th {padding:0.5em;text-align:center;border-bottom:1px solid #c1c8d1;}","ke-BangPaiUpload");
j.augment(x,j.EventTarget,{_init:function(){var f=this.editor,a=f.cfg.pluginConfig["bangpai-upload"],d=a.holder;d=j.isString(d)?j.one(d):d;var h=(new o("<div style='position:relative;margin:10px;'>\u6279\u91cf\u4e0a\u4f20\u56fe\u7247\uff1a</div>")).appendTo(d);d=(new o("<div style='display:none'>")).appendTo(d);var i=(new o("<button disabled='disabled'>\u6d4f\u89c8</button>")).appendTo(h),c=i.offset();h.offset();h=(new o("<div style='"+("position:absolute;width:"+(i.width()+8)+"px;height:"+(i.height()+8)+"px;z-index:9999;")+"'>")).appendTo(h);
var g=(new o("<div><table class='ke-upload-list'><thead><tr><th>\u56fe\u7247</td><th>\u5927\u5c0f</td><th>\u4e0a\u4f20\u8fdb\u5ea6</td><th>\u56fe\u7247\u64cd\u4f5c</td></tr></thead><tbody></tbody></table></div>")).appendTo(d).one("tbody"),l=(new o("<p style='margin:10px;text-align:right;'><button>\u786e\u5b9a\u4e0a\u4f20</button></p>")).appendTo(d).one("button"),w=j.guid(name);this.btn=i;this.up=l;h.offset(c);var t=new s.FlashBridge({movie:y,methods:["removeFile","cancel","removeFile","setAllowMultipleFiles","setFileFilters","uploadAll"],holder:h,attrs:{width:i.width(),height:i.height()},
flashVars:{menu:true}});this.uploader=t;this._list=g;this._listWrap=d;this._ds=a.serverUrl;this._dsp=a.serverParams||{};this._fileInput=a.fileInput||"Filedata";g.on("click",function(z){var e=new o(z.target);z.halt();if(e.hasClass("ke-upload-insert")){z=e.parent("tr");url=z.attr("url");f.insertElement(new o("<img src='"+url+"'/>",null,f.document))}else if(e.hasClass("ke-upload-delete")){z=e.parent("tr");w=z.attr("fid");try{t.cancel(w)}catch(b){}t.removeFile(w);v[w].destroy();delete v[w];z._4e_remove()}});
t.on("fileSelect",this._onSelect,this);t.on("uploadStart",this._onUploadStart,this);t.on("uploadProgress",this._onProgress,this);t.on("uploadComplete",this._onComplete,this);t.on("uploadCompleteData",this._onUploadCompleteData,this);t.on("swfReady",this._ready,this);t.on("uploadError",this._uploadError,this)},_uploadError:function(f){var a=f.id,d=this._getFileTr(a);a=v[a];if(d){a.destroy();d.one(".ke-upload-progress").html("<span style='color:red'>"+f.status+"</span>")}},_getFileTr:function(f){for(var a=
this._list.all("tr"),d=0;d<a.length;d++){var h=new o(a[d]);if(h.attr("fid")==f)return h}},_onUploadStart:function(f){this.uploader.removeFile(f.id)},_onComplete:function(){},_onUploadCompleteData:function(f){var a=j.trim(f.data).replace(/\\r||\\n/g,"");f=f.id;if(a){a=JSON.parse(a);if(a.error)this._uploadError({id:f,status:a.error});else if(f=this._getFileTr(f)){f.one(".ke-upload-insert").show();f.attr("url",a.imgUrl)}}},_onProgress:function(f){var a=Math.floor(f.bytesLoaded*100/f.bytesTotal);(f=v[f.id])&&
f.set("progress",a)},_onSelect:function(f){var a=this._list;if(f=f.fileList){this._listWrap.show();for(var d in f)if(f.hasOwnProperty(d)){var h=f[d];if(!this._getFileTr(h.id)){var i=(new o("<tr fid='"+h.id+"'><td>"+h.name+"</td><td>"+Math.floor(h.size/1E3)+"k</td><td class='ke-upload-progress'></td><td><a href='#' class='ke-upload-insert' style='display:none'>[\u63d2\u5165]</a> &nbsp; <a href='#' class='ke-upload-delete'>[\u5220\u9664]</a> &nbsp; </td></tr>")).appendTo(a);v[h.id]=new s.ProgressBar({container:i.one(".ke-upload-progress"),
width:"100px",height:"18px"})}}}},_ready:function(){var f=this,a=f.uploader,d=f.up;f.btn[0].disabled=false;a.setAllowMultipleFiles(true);a.setFileFilters([{extensions:"*.jpeg;*.jpg;*.png;*.gif",description:"\u56fe\u7247\u6587\u4ef6( png,jpg,jpeg,gif )"}]);d.on("click",function(h){h.halt();a.uploadAll(f._ds,"POST",f._dsp,f._fileInput)})}});s.BangPaiUpload=x})();u.addPlugin(function(){new s.BangPaiUpload(u)})}},{attach:false,requires:["flashutils","progressbar","flashbridge"]});
KISSY.Editor.add("bangpai-video",function(u){function j(a){for(var d=0;d<f.length;d++){var h=f[d];if(h.reg.test(a))return h}}var s=KISSY,x=s.Editor,r="ke_video",o=x.Flash,y=u.htmlDataProcessor,v=y&&y.dataFilter;v&&v.addRules({elements:{object:function(a){var d=a.attributes;if(!(d.classid&&String(d.classid).toLowerCase())){for(d=0;d<a.children.length;d++)if(a.children[d].name=="embed"){if(!o.isFlashEmbed(a.children[d]))break;if(j(a.children[d].attributes.src))return y.createFakeParserElement(a,r,"bangpai-video",
true)}return null}for(d=0;d<a.children.length;d++){var h=a.children[d];if(h.name=="param"&&h.attributes.name=="movie")if(j(h.attributes.value))return y.createFakeParserElement(a,r,"bangpai-video",true)}},embed:function(a){if(!o.isFlashEmbed(a))return null;if(j(a.attributes.src))return y.createFakeParserElement(a,r,"bangpai-video",true)}}},4);var f=[{reg:/youku\.com/i,width:480,height:400,detect:function(a){var d=a.match(/id_([^.]+)\.html$/);if(d)return"http://player.youku.com/player.php/sid/"+d[1]+
"/v.swf";a.match(/v_playlist\/([^.]+)\.html$/);return a}},{reg:/tudou\.com/i,width:480,height:400,detect:function(a){return a}},{reg:/ku6\.com/i,width:480,height:400,detect:function(a){var d=a.match(/show[^\/]*\/([^.]+)\.html$/);if(d)return"http://player.ku6.com/refer/"+d[1]+"/v.swf";return a}}];x.BangPaiVideo||function(){function a(){a.superclass.constructor.apply(this,arguments)}function d(c){return c._4e_name()==="img"&&!!c.hasClass(r)&&c}var h=["img."+r];s.extend(a,o,{_config:function(){var c=
this.editor.cfg.pluginConfig;this._cls=r;this._type="bangpai-video";this._title="\u89c6\u9891\u5c5e\u6027";this._bodyHtml="<table><tr><td colspan='2'>\u9700\u8981\u5206\u4eab\u7684\u89c6\u9891\u94fe\u63a5\uff1a\u652f\u6301 \u571f\u8c46\uff0c\u4f18\u9177\uff0cku6 \u89c6\u9891\u5206\u4eab</td></tr><tr><td colspan='2'><label><span style='color:#0066CC;font-weight:bold;'>\u89c6\u9891\u94fe\u63a5\uff1a </span><input class='ke-video-url' style='width:230px' value='http://'/></label></td></tr><tr><td><label>\u5bbd\u5ea6\uff1a </span> <input  data-verify='^\u81ea\u52a8|((?!0$)\\d+(.\\d+)?)$'  data-warning='\u5bbd\u5ea6\u8bf7\u8f93\u5165\u6b63\u6570' class='ke-video-width' style='width:60px' value='\u81ea\u52a8'/> \u50cf\u7d20 </label></td><td><label> \u9ad8\u5ea6\uff1a </span> <input  data-verify='^\u81ea\u52a8|((?!0$)\\d+(.\\d+)?)$'  data-warning='\u9ad8\u5ea6\u8bf7\u8f93\u5165\u6b63\u6570' class='ke-video-height' style='width:60px' value='\u81ea\u52a8'/> \u50cf\u7d20 </label></td></tr><tr><td><label>\u5bf9\u9f50\uff1a <select class='ke-video-align'><option value=''>\u65e0</option><option value='left'>\u5de6\u5bf9\u9f50</option><option value='right'>\u53f3\u5bf9\u9f50</option></select></td><td><label>\u95f4\u8ddd\uff1a </span> <input  data-verify='^\\d+(.\\d+)?$'  data-warning='\u95f4\u8ddd\u8bf7\u8f93\u5165\u975e\u8d1f\u6570\u5b57' class='ke-video-margin' style='width:60px' value='5'/> \u50cf\u7d20</label></td></tr></table>";
this._footHtml="<button class='ke-video-ok'>\u786e\u5b9a</button> <button class='ke-video-cancel'>\u53d6\u6d88</button>";this._contentCls="ke-toolbar-video";this._tip="\u63d2\u5165\u89c6\u9891";this._contextMenu=i;this._flashRules=h;this.urlCfg=c["bangpai-video"]&&c["bangpai-video"].urlCfg},_initD:function(){var c=this,g=c.d;c.dUrl=g.el.one(".ke-video-url");c.dAlign=g.el.one(".ke-video-align");c.dMargin=g.el.one(".ke-video-margin");c.dWidth=g.el.one(".ke-video-width");c.dHeight=g.el.one(".ke-video-height");var l=g.el.one(".ke-video-ok");
g=g.el.one(".ke-video-cancel");l.on("click",c._gen,c);g.on("click",function(){c.d.hide()})},_getDInfo:function(){var c=this.dUrl.val(),g=j(c);if(g)if(c=g.detect(c))return{url:c,attrs:{height:parseInt(this.dHeight.val())||g.height,width:parseInt(this.dWidth.val())||g.width,align:this.dAlign.val(),style:"margin:"+(parseInt(this.dMargin.val())||0)+"px;"}};else alert("http://");else alert("\u4e0d\u652f\u6301\u8be5\u94fe\u63a5\u6765\u6e90!")},_gen:function(){var c=this.dUrl.val(),g=this.urlCfg;if(g)for(var l=0;l<g.length;l++){var w=g[l];if(w.reg.test(c)){this.d.loading();
a.dynamicUrl.origin=c;a.dynamicUrl.instance=this;s.getScript(w.url.replace(/@url@/,encodeURIComponent(c)).replace(/@callback@/,encodeURIComponent("KISSY.Editor.BangPaiVideo.dynamicUrl")));return}}a.superclass._gen.call(this)},_dynamicUrlPrepare:function(c){this.dUrl.val(c);this.d.unloading();a.superclass._gen.call(this)},_updateD:function(){var c=this.editor,g=this.selectedFlash;if(g){c=c.restoreRealElement(g);this.dUrl.val(this._getFlashUrl(c));this.dAlign.val(c.attr("align"));this.dMargin.val(parseInt(c._4e_style("margin"))||
0);this.dWidth.val(c.attr("width"));this.dHeight.val(c.attr("height"))}else{this.dUrl.val("http://");this.dAlign.val("");this.dMargin.val("5");this.dWidth.val("\u81ea\u52a8");this.dHeight.val("\u81ea\u52a8")}}});a.dynamicUrl=function(c,g){c===a.dynamicUrl.origin&&a.dynamicUrl.instance._dynamicUrlPrepare(g)};o.registerBubble("bangpai-video","\u89c6\u9891\u94fe\u63a5\uff1a ",d);x.BangPaiVideo=a;var i={"\u89c6\u9891\u5c5e\u6027":function(c){var g=c.getSelection();g=(g=g&&g.getStartElement())&&d(g);c=c._toolbars["bangpai-video"];g&&c.show(null,g)}}}();u.addPlugin(function(){new x.BangPaiVideo(u)})},
{attach:false,requires:["flashsupport"]});
