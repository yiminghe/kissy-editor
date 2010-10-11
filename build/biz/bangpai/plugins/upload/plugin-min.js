KISSY.Editor.add("bangpai-upload",function(r){var i=KISSY,k=i.Editor;if(!k.BangPaiUpload){(function(){function s(a){this.editor=a;this._init()}var y=i.DOM,z=i.JSON,f=i.Node,A=k.Config.base+k.Utils.debugUrl("plugins/uploader/uploader.swf"),o={};name="ke-bangpai-upload";y.addStyleSheet(".ke-BangPaiUpload {border:1px solid #CED5E0;}.ke-upload-head {background-color: #f4f7fc;background: -webkit-gradient(linear, left top, left bottom, from(rgb(244, 247, 252)), to(rgb(235, 239, 244)));background: -moz-linear-gradient(top, rgb(244, 247, 252), rgb(235, 239, 244));filter: progid:DXImageTransform.Microsoft.gradient(startColorstr = '#f4f7fc', endColorstr = '#ebeff4');height:40px;border-bottom:1px solid #CED5E0;padding-top:1px;}.ke-upload-head-text {height:30px;line-height:30px;width:120px;margin-top:8px;margin-left:30px;text-align:center;border:1px solid #CED5E0;border-bottom-color:#FDFDFD;background:#FDFDFD;padding-bottom:2px;margin-bottom:-2px;position:relative;}.ke-upload-btn-wrap {position:relative;margin:15px 0 15px 20px;}.ke-upload-list {width:100%;}.ke-upload-list th {border-top:1px solid #c1c8d1;background-color:#EBEDF1;}.ke-upload-list td,.ke-upload-list th {padding:0.5em;text-align:center;border-bottom:1px solid #c1c8d1;}",
"ke-BangPaiUpload");i.augment(s,i.EventTarget,{_init:function(){var a=this,b=a.editor,c=b.cfg.pluginConfig["bangpai-upload"],d=c.holder;d=i.isString(d)?i.one(d):d;var g=(new f("<div class='ke-upload-head'> <h2 class='ke-upload-head-text'>批量上传</h2></div>")).appendTo(d),h=(new f("<div class='ke-upload-btn-wrap'><input class='ke-input' readonly style='margin:0 15px 0 0px;color:#969696;vertical-align:middle;width:80%;'></div>")).appendTo(d),l=(new f("<div style='display:none'>")).appendTo(d),e=new k.TripleButton({text:"浏览",
cls:"ke-button",container:h}),m=e.el.offset(),t=e.el.width()*2.5,u=e.el.height()*1.5;g.offset();g=(new f("<div style='"+("position:absolute;width:"+t+"px;height:"+u+"px;z-index:9999;")+"'>")).appendTo(h);var v=(new f("<div><table class='ke-upload-list'><thead><tr><th>序号</th><th>图片</th><th>大小</th><th>上传进度</th><th>图片操作</th></tr></thead><tbody></tbody></table></div>")).appendTo(l),w=v.one("tbody"),x=(new f("<p style='margin:15px 20px 35px; 0;text-align:right;'><a class='ke-button'>确定上传</a></p>")).appendTo(l).one("a"),
p=i.guid(name),B=(new f("<span></span>")).insertBefore(x);c.extraHtml&&v.append(c.extraHtml);a.statusText=B;d.addClass("ke-BangPaiUpload");a.btn=e;a.up=x;g.offset(m);var j=new k.FlashBridge({movie:A,methods:["removeFile","cancel","removeFile","disable","enable","setAllowMultipleFiles","setFileFilters","uploadAll"],holder:g,attrs:{width:t,height:u},params:{wmode:"transparent"},flashVars:{allowedDomain:location.hostname,menu:true}});a.flashPos=g;a.uploader=j;a._list=w;a._listWrap=l;a._ds=c.serverUrl;
a._dsp=c.serverParams||{};a._fileInput=c.fileInput||"Filedata";a._sizeLimit=c.sizeLimit||1E3;a._numberLimit=c.numberLimit||15;h.one("input").val("允许用户同时上传"+a._numberLimit+"张图片，单张图片容量不超过"+a._sizeLimit/1E3+"M");w.on("click",function(n){var q=new f(n.target);n.halt();if(q.hasClass("ke-upload-insert")){n=q.parent("tr");url=n.attr("url");b.insertElement(new f("<img src='"+url+"'/>",null,b.document))}else if(q.hasClass("ke-upload-delete")){n=q.parent("tr");p=n.attr("fid");try{j.cancel(p)}catch(C){}j.removeFile(p);
if(o[p]){o[p].destroy();delete o[p]}n._4e_remove();a.enable();a._seqPics()}});j.on("fileSelect",a._onSelect,a);j.on("uploadStart",a._onUploadStart,a);j.on("uploadProgress",a._onProgress,a);j.on("uploadComplete",a._onComplete,a);j.on("uploadCompleteData",a._onUploadCompleteData,a);j.on("swfReady",a._ready,a);j.on("uploadError",a._uploadError,a)},_uploadError:function(a){var b=a.id,c=this._getFileTr(b);b=o[b];if(c){b&&b.destroy();c.one(".ke-upload-progress").html("<span style='color:red'>"+a.status+
"</span>")}},_getFileTr:function(a){for(var b=this._list.all("tr"),c=0;c<b.length;c++){var d=new f(b[c]);if(d.attr("fid")==a)return d}},_onUploadStart:function(a){this.uploader.removeFile(a.id)},_onComplete:function(){},_onUploadCompleteData:function(a){var b=i.trim(a.data).replace(/\\r||\\n/g,"");a=a.id;if(b){b=z.parse(b);if(b.error)this._uploadError({id:a,status:b.error});else if(a=this._getFileTr(a)){a.one(".ke-upload-insert").show();a.attr("url",b.imgUrl)}}},_onProgress:function(a){var b=Math.floor(a.bytesLoaded*
100/a.bytesTotal);(a=o[a.id])&&a.set("progress",b)},disable:function(){this.uploader.disable();this.btn.disable()},enable:function(){this.uploader.enable();this.btn.enable()},_seqPics:function(){var a=1;this._list.all(".ke-upload-seq").each(function(b){b.html(a++)})},_getFilesSize:function(a){var b=0,c;for(c in a)b++;return b},_onSelect:function(a){var b=this.uploader,c=this._list,d=0;a=a.fileList;var g=this._numberLimit-c.all("tr").length;if(a){var h=this._getFilesSize(a);h>g&&alert("系统将只保留 n 张".replace(/n/,
this._numberLimit));h>=g&&this.disable();this._listWrap.show();for(var l in a)if(a.hasOwnProperty(l)){var e=a[l];if(!this._getFileTr(e.id)){h=Math.floor(e.size/1E3);var m=e.id;d++;if(d>g){b.removeFile(m);d--}else{e=(new f("<tr fid='"+m+"'><td class='ke-upload-seq'></td><td>"+e.name+"</td><td>"+h+"k</td><td class='ke-upload-progress'></td><td><a href='#' class='ke-upload-insert' style='display:none'>[插入]</a> &nbsp; <a href='#' class='ke-upload-delete'>[删除]</a> &nbsp; </td></tr>")).appendTo(c);e.one(".ke-upload-progress");
if(h>this._sizeLimit){this._uploadError({id:m,status:"图片不能超过 n M".replace(/n/,this._sizeLimit/1E3)});b.removeFile(m)}else o[m]=new k.ProgressBar({container:e.one(".ke-upload-progress"),width:"100px",height:"18px"})}}}this._seqPics();this.statusText.html("本次共插入"+d+"张图片，点击确定上传，开始上传。 ")}},_ready:function(){var a=this,b=a.uploader,c=a.up,d=a.btn,g=a.flashPos,h=k.Utils.normParams;d.enable();g.offset(d.el.offset());b.setAllowMultipleFiles(true);b.setFileFilters([{extensions:"*.jpeg;*.jpg;*.png;*.gif",description:"图片文件( png,jpg,jpeg,gif )"}]);
c.on("click",function(l){l.halt();b.uploadAll(a._ds,"POST",h(a._dsp),a._fileInput)})}});k.BangPaiUpload=s})();r.addPlugin(function(){new k.BangPaiUpload(r)})}},{attach:false,requires:["flashutils","progressbar","flashbridge"]});
