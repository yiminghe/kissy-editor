KISSY.Editor.add("bangpai-upload/dialog",function(x){var n=KISSY,m=n.Editor,y=n.UA,H=m.BangPaiUpload,k=n.DOM,u=n.JSON,j=n.Node,z=m.SimpleOverlay,A=window[m.STORE],I=m.Config.base+m.Utils.debugUrl("plugins/uploader/uploader.longzang.swf"),q={};H.Dialog||function(){function B(a){this.editor=a;m.Utils.lazyRun(this,"_prepareShow","_realShow")}function C(a,b){var c=a.parentNode,d=a.nextSibling,e=b.nextSibling;d?c.insertBefore(b,d):c.appendChild(b);e?c.insertBefore(a,e):c.appendChild(a)}k.addStyleSheet(".ke-upload-btn-wrap {position:relative;padding:15px 20px 15px 10px;zoom:1;}.ke-upload-list {width:100%;}.ke-upload-list th {border-top:1px solid #c1c8d1;background-color: #E7E9ED;background: -webkit-gradient(linear, left top, left bottom, from(#E7E9ED), to(#F1F4F7));background: -moz-linear-gradient(top, #E7E9ED, #F1F4F7);}.ke-upload-list td,.ke-upload-list th {padding:0em;height:26px;line-height:26px;text-align:center;border-bottom:1px solid #c1c8d1;}.ke-upload-complete .ke-upload-filename {text-decoration:underline;cursor:pointer;}",
"ke-BangPaiUpload");n.augment(B,{_prepareShow:function(){var a=this,b=a.editor,c=b.cfg.pluginConfig["bangpai-upload"];a.dialog=new z({title:"\u6279\u91cf\u4e0a\u4f20",mask:false,draggable:"all",focusMgr:false,width:"600px"});var d=a.dialog;d.foot.hide();var e=d.body,f=(new j("<div class='ke-upload-btn-wrap'><span style='margin:0 15px 0 0px;color:#969696;display:inline-block;vertical-align:middle;width:469px;'></span></div>")).appendTo(e),l=(new j("<div style='display:none'>")).appendTo(e),o=new m.TripleButton({text:"\u6d4f&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u89c8",
cls:"ke-button",container:f}),r=(new j("<div><table class='ke-upload-list'><thead><tr><th>\u5e8f\u53f7</th><th>\u56fe\u7247</th><th>\u5927\u5c0f</th><th style='width:35%'>\u4e0a\u4f20\u8fdb\u5ea6</th><th>\u56fe\u7247\u64cd\u4f5c</th></tr></thead><tbody></tbody></table></div>")).appendTo(l),s=r.one("tbody"),p=(new j("<p style='margin:15px 15px 30px 6px;'><a class='ke-bangpaiupload-delall' style='margin-right:20px;cursor:pointer;margin-left:40px;'>\u6e05\u7a7a\u5217\u8868</a><a class='ke-button ke-bangpaiupload-ok'>\u786e\u5b9a\u4e0a\u4f20</a><a class='ke-button ke-bangpaiupload-insertall' style='margin-left:20px;'>\u5168\u90e8\u63d2\u5165</a></p>")).appendTo(l),
t=p.one(".ke-bangpaiupload-ok");e=p.one(".ke-bangpaiupload-insertall");var J=p.one(".ke-bangpaiupload-delall");n.guid("ke-bangpai-upload");p=(new j("<span>")).insertBefore(p[0].firstChild);a._sizeLimit=c.sizeLimit||1E3;a._numberLimit=c.numberLimit||15;var D="\u5141\u8bb8\u7528\u6237\u540c\u65f6\u4e0a\u4f20"+a._numberLimit+"\u5f20\u56fe\u7247\uff0c\u5355\u5f20\u56fe\u7247\u5bb9\u91cf\u4e0d\u8d85\u8fc7"+a._sizeLimit/1E3+"M";y.fpvGEQ("10.0.0")||(D="\u60a8\u7684flash\u63d2\u4ef6\u7248\u672c\u8fc7\u4f4e\uff0c\u8be5\u529f\u80fd\u4e0d\u53ef\u7528\uff0c\u8bf7<a href='http://get.adobe.com/cn/flashplayer/' target='_blank'>\u70b9\u6b64\u5347\u7ea7</a>");o.disable();a.tipSpan=f.one("span");a.tipSpan.html(D);if(y.fpvGEQ("10.0.0")){c.extraHtml&&
r.append(c.extraHtml);a._list=s;a._listTable=s.parent("table");a._listWrap=l;a._ds=c.serverUrl;a._dsp=c.serverParams||{};a._fileInput=c.fileInput||"Filedata";a.statusText=p;a.btn=o;a.up=t;r=o.el.offset();t=o.el.width()*2;p=o.el.height()*1.5;f=(new j("<div style='"+("position:absolute;width:"+t+"px;height:"+p+"px;z-index:"+b.baseZIndex(9999)+";")+"'>")).appendTo(f);f.offset(r);a.flashPos=f;f=new m.FlashBridge({movie:I,ajbridge:true,methods:["getReady","removeFile","lock","unlock","setAllowMultipleFiles",
"setFileFilters","uploadAll"],holder:f,attrs:{width:t,height:p},params:{wmode:"transparent"},flashVars:{allowedDomain:location.hostname,btn:true,hand:true}});a.uploader=f;f.on("mouseOver",function(){o.el.addClass("ke-button-hover")});f.on("mouseOut",function(){o.el.removeClass("ke-button-hover")});e.on("click",function(){for(var i=s.all("tr"),h=0;h<i.length;h++){var g=new j(i[h]),v=g.attr("url");if(v){b.insertElement(new j("<p>&nbsp;<img src='"+v+"'/>&nbsp;</p>",null,b.document));a._removeTrFile(g)}}if(v){l.hide();
d.hide()}});J.on("click",function(){for(var i=s.all("tr"),h=0;h<i.length;h++){var g=new j(i[h]);a._removeTrFile(g)}l.hide()});s.on("click",function(i){var h=new j(i.target),g;i.halt();if(h.hasClass("ke-upload-insert")){g=h.parent("tr");i=g.attr("url");b.insertElement(new j("<img src='"+i+"'/>",null,b.document))}if(h.hasClass("ke-upload-delete")||h.hasClass("ke-upload-insert")){g=h.parent("tr");a._removeTrFile(g)}if(h.hasClass("ke-upload-moveup")){g=h.parent("tr");g.css("backgroundColor","#FFFF00");
g.animate({backgroundColor:"#FBFBFB"},1,null,function(){g.css("backgroundColor","")});if(h=g.prev()){C(g[0],h[0]);a._syncStatus()}}else if(h.hasClass("ke-upload-movedown")){g=h.parent("tr");g.css("backgroundColor","#FFFF00");g.animate({backgroundColor:"#FBFBFB"},1,null,function(){g.css("backgroundColor","")});if(h=g.next()){C(g[0],h[0]);a._syncStatus()}}});f.on("fileSelect",a._onSelect,a);f.on("uploadStart",a._onUploadStart,a);f.on("uploadProgress",a._onProgress,a);f.on("uploadCompleteData",a._onUploadCompleteData,
a);f.on("contentReady",a._ready,a);f.on("uploadError",a._uploadError,a);a._restore();e=c.previewWidth;var E=c.previewSuffix;if(e){var F=(new j("<div>")).appendTo(l),w=new z({mask:false,width:e,el:F});w.el.css("border","none");var G=0;l.on("mouseover",function(i){i=i.target;if(k.hasClass(i,"ke-upload-filename")){var h=k._4e_ascendant(i,"tr");if(h.hasClass("ke-upload-complete")){var g=h.attr("url");h=h.attr("fid");if(g){if(h!=G){G=h;if(E)g=g.replace(/(\.\w+$)/,E);F.html("<img style='display:block;' src='"+
g+"' />")}g=k.offset(i);g.left+=i.offsetWidth;w.show(g)}}}else w.hide()})}}},_removeTrFile:function(a){var b=a.attr("fid"),c=this.uploader;if(b)try{c.removeFile(b)}catch(d){}if(q[b]){q[b].destroy();delete q[b]}a._4e_remove();this.denable();this._syncStatus()},_realShow:function(){this.dialog.show()},show:function(){this._prepareShow()},_uploadError:function(a){var b=this.uploader,c=a.id||a.file&&a.file.id;if(c){var d=this._getFileTr(c),e=q[c],f=a.status;b.removeFile(c);if(!a._custom){n.log(f);f="\u670d\u52a1\u5668\u51fa\u9519\u6216\u683c\u5f0f\u4e0d\u6b63\u786e"}if(d){e&&
e.destroy();d.one(".ke-upload-progress").html("<div style='color:red;'>"+f+"</div>")}}else n.log(a)},_getFileTr:function(a){for(var b=this._list.all("tr"),c=0;c<b.length;c++){var d=new j(b[c]);if(d.attr("fid")==a)return d}},_onUploadStart:function(a){this._getFileTr(a.id||a.file&&a.file.id)[0].className="ke-upload-uploading"},_onComplete:function(){},_onUploadCompleteData:function(a){var b=n.trim(a.data).replace(/\r|\n/g,"");a=a.file.id;if(b){b=u.parse(b);if(b.error)this._uploadError({id:a,_custom:1,
status:b.error});else{if(a=this._getFileTr(a)){a.one(".ke-upload-insert").show();this._tagComplete(a,b.imgUrl)}this._syncStatus()}}},_onProgress:function(a){var b=Math.floor(a.bytesLoaded*100/a.bytesTotal);(a=q[a.file.id])&&a.set("progress",b)},ddisable:function(){this.uploader.lock();this.btn.disable();this.flashPos.offset({left:-9999,top:-9999})},denable:function(){this.uploader.unlock();this.btn.enable();this.flashPos.offset(this.btn.el.offset())},_syncStatus:function(){var a=this._list,b=1,c=
a.all("tr");if(c.length==0)this._listWrap.hide();else{a.all(".ke-upload-seq").each(function(e){e.html(b++)});for(var d=a=0;d<c.length;d++)(new j(c[d])).attr("url")||a++;this.statusText.html("\u961f\u5217\u4e2d\u5269\u4f59"+a+"\u5f20\u56fe\u7247\uff0c\u70b9\u51fb\u786e\u5b9a\u4e0a\u4f20\uff0c\u5f00\u59cb\u4e0a\u4f20\u3002 ")}this._save()},_restore:function(){var a=A.getItem("Multi-Upload-Save"),b=this._list[0];if(a){a=u.parse(decodeURIComponent(a));for(var c=0;c<a.length;c++){var d=a[c];d.complete=1;d.fid="restore_"+c;this._tagComplete(this._createFileTr(b,d),d.url)}if(d){this._listWrap.show();this._syncStatus()}}},
_tagComplete:function(a,b){a.attr("url",b);a[0].className="ke-upload-complete"},_save:function(){for(var a=this._list.all("tr"),b=[],c=0;c<a.length;c++){var d=new j(a[c]),e=d.attr("url");if(e){var f=d.one(".ke-upload-filesize").html();d=d.one(".ke-upload-filename").html();b.push({name:d,size:f,url:e})}}A.setItem("Multi-Upload-Save",encodeURIComponent(u.stringify(b)))},_getFilesSize:function(a){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b},_createFileTr:function(a,b){var c=b.fid,d=a.insertRow(-1);
k.attr(d,"fid",c);var e=d.insertCell(-1);k.attr(e,"class","ke-upload-seq");e=d.insertCell(-1);if(b.name.length>18)b.name=b.name.substring(0,18)+"...";k.html(e,b.name);k.attr(e,"class","ke-upload-filename");e=d.insertCell(-1);k.html(e,b.size);k.attr(e,"class","ke-upload-filesize");e=d.insertCell(-1);k.attr(e,"class","ke-upload-progress");e=d.insertCell(-1);k.html(e,"<a class='ke-upload-moveup' href='#'>[\u4e0a\u79fb]</a> &nbsp; <a class='ke-upload-movedown' href='#'>[\u4e0b\u79fb]</a> &nbsp; <a href='#' class='ke-upload-insert' style='"+
(b.complete?"":"display:none;")+"' >[\u63d2\u5165]</a> &nbsp; <a href='#' class='ke-upload-delete'>[\u5220\u9664]</a> &nbsp;");d=new j(d);d.one(".ke-upload-progress");if(parseInt(b.size)>this._sizeLimit){this._uploadError({id:c,_custom:1,status:"\u56fe\u7247\u592a\u5927\uff0c\u8bf7\u538b\u7f29\u81f3 n M\u4ee5\u4e0b".replace(/n/,this._sizeLimit/1E3)});this.uploader.removeFile(c)}else{q[c]=new m.ProgressBar({container:d.one(".ke-upload-progress"),width:"100px",height:"15px"});b.complete&&q[c].set("progress",100)}return d},_onSelect:function(a){var b=this.uploader,c=this._list,
d=0;a=a.fileList;var e=this._numberLimit;if(a){e=c.children("tr");for(c=0;c<e.length;c++){var f=k.attr(e[c],"fid");f&&a[f]&&delete a[f]}e=this._numberLimit-e.length;f=this._getFilesSize(a);f>e&&alert("\u7cfb\u7edf\u5c06\u53ea\u4fdd\u7559 n \u5f20".replace(/n/,this._numberLimit));f>=e&&this.ddisable();this._listWrap.show();f=this._list[0];for(c in a)if(a.hasOwnProperty(c)){d++;var l=a[c],o=Math.floor(l.size/1E3),r=l.id;d>e?b.removeFile(r):this._createFileTr(f,{size:o+"k",fid:r,name:l.name})}this._syncStatus()}},_ready:function(){var a=
this,b=a.uploader,c=a.up,d=a.btn,e=a.flashPos,f=m.Utils.normParams;if("ready"!=b.getReady()){a.tipSpan.html("\u60a8\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u8be5\u529f\u80fd\uff0c\u8bf7\u5347\u7ea7\u5f53\u524d\u6d4f\u89c8\u5668\uff0c\u5e76\u540c\u65f6 <a href='http://get.adobe.com/cn/flashplayer/' target='_blank'>\u70b9\u6b64\u5347\u7ea7</a> flash \u63d2\u4ef6");e.offset({left:-9999,top:-9999})}else{d.enable();e.offset(d.el.offset());b.setAllowMultipleFiles(true);b.setFileFilters([{ext:"*.jpeg;*.jpg;*.png;*.gif",desc:"\u56fe\u7247\u6587\u4ef6( png,jpg,jpeg,gif )"}]);c.detach();c.on("click",function(l){l.halt();b.uploadAll(a._ds,"POST",f(a._dsp),a._fileInput)})}}});
m.BangPaiUpload.Dialog=B}();x.addDialog("bangpai-upload/dialog",new m.BangPaiUpload.Dialog(x))},{attach:false});
