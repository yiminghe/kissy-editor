KISSY.Editor.add("image",function(v){var i=KISSY.Editor,k=KISSY,y=k.DOM,z=k.UA,q=k.Node,A=k.Event,w=i.BubbleView,B=i.SimpleOverlay;i.ImageInserter||function(){function r(a){r.superclass.constructor.call(this,a);this._init()}var s=function(a){return a._4e_name()==="img"&&!/(^|\s+)ke_/.test(a[0].className)&&a};y.addStyleSheet(".ke-image-tabs {padding-left:10px;border-bottom:1px solid #CCCCCC;}.ke-image-tabs li {background-color:#F6F6F6;border-color:#CCCCCC #CCCCCC -moz-use-text-color;border-style:solid solid none;border-width:1px 1px medium;cursor:pointer;float:left;height:21px;line-height:21px;margin-left:5px;position:relative;text-align:center;top:1px;width:60px;}li.ke-image-tab-selected {border-bottom:1px solid #FFFFFF;border-color:#CCCCCC #CCCCCC #FFFFFF;cursor:default;}",
"ke-image");var t=i.TripleButton;r.ATTRS={editor:{}};var u={"图片属性":function(a){var b=a.getSelection();b=b&&b.getStartElement();b=s(b);a=a._toolbars.image;b&&a.show(null,b)}};k.extend(r,k.Base,{_init:function(){var a=this.get("editor"),b=a.toolBarDiv,e={};this.editor=a;this.el=new t({contentCls:"ke-toolbar-image",title:"插入图片",container:b});this.el.on("offClick",this.show,this);A.on(a.document,"dblclick",this._dblclick,this);i.Utils.lazyRun(this,"_prepare","_real");a._toolbars=a._toolbars||{};a._toolbars.image=
this;if(u)for(var c in u)(function(h){e[h]=function(){u[h](a)}})(c);i.ContextMenu.register(a.document,{rules:[s],width:"120px",funcs:e});w.attach({pluginName:"image",pluginInstance:this});i.Utils.sourceDisable(a,this)},disable:function(){this.el.set("state",t.DISABLED)},enable:function(){this.el.set("state",t.OFF)},_dblclick:function(a){var b=new q(a.target);if(s(b)){this.show(null,b);a.halt()}},_prepare:function(){var a=this,b=a.get("editor");a.d=new B({title:"图片属性",mask:true,width:"350px"});var e=
a.d;e.body.html("<ul class='ke-image-tabs ks-clear'><li class='ke-image-tab-selected' rel='remote'>网络图片</li><li rel='local'>本地上传</li></ul><div style='padding:10px 0 0 0;'><table><tr><td colspan='2'><label><span class='ke-image-title'style='color:#0066CC;font-weight:bold;'>图片网址： </span><input  data-verify='^https?://[^\\s]+$'  data-warning='网址格式为：http://' class='ke-img-url' style='width:180px;margin-right:5px;' value='http://'/></label><button class='ke-image-up' style='visibility:hidden;'>浏览...</button></td></tr><tr><td><label><span>高度： </span><input  data-verify='^自动|((?!0$)\\d+(.\\d+)?)$'  data-warning='高度请输入正数' class='ke-img-height' style='width:60px' value='自动'/> 像素 </label></td><td><label><span>宽度： </span><input  data-verify='^自动|((?!0$)\\d+(.\\d+)?)$'  data-warning='宽度请输入正数' class='ke-img-width' style='width:60px' value='自动'/> 像素 </label></td></tr><tr><td><label><span>对齐： </span><select class='ke-img-align'><option value='none'>无</option><option value='left'>左对齐</option><option value='right'>右对齐</option></select></td><td><label><span>间距： </span> <input  data-verify='^\\d+(.\\d+)?$'  data-warning='间距请输入非负数字' class='ke-img-margin' style='width:60px' value='5'/> 像素</label></td></tr></table></div>");
e.foot.html("<button class='ke-img-insert'>确定</button> <button class='ke-img-cancel'>取消</button>");a.content=e.el;var c=a.content,h=c.one(".ke-img-cancel"),l=c.one(".ke-img-insert");a.imgUrl=c.one(".ke-img-url");a.imgHeight=c.one(".ke-img-height");a.imgWidth=c.one(".ke-img-width");a.imgAlign=c.one(".ke-img-align");a.imgMargin=c.one(".ke-img-margin");h.on("click",function(d){a.d.hide();d.halt()});l.on("click",function(){a._insert()});var f=(b.cfg.pluginConfig.image||{}).upload,g=c.one("ul"),m=g.all("li"),
n=c.one(".ke-image-title"),j=c.one(".ke-image-up");if(f){g.on("click",function(d){d=new q(d.target);if(d=d._4e_ascendant(function(x){return x._4e_name()==="li"&&g._4e_contains(x)},true)){m.removeClass("ke-image-tab-selected");var C=d.attr("rel");d.addClass("ke-image-tab-selected");if(C=="local"){n.html("上传图片：");j.css("visibility","");p.css("visibility","")}else{n.html("图片网址：");j.css("visibility","hidden");p.css("visibility","hidden")}}});var p=(new q("<div style='"+("position:absolute;width:"+(j.width()+
8)+"px;height:"+(j.height()+8)+"px;z-index:9999;")+"'>")).appendTo(c);p.offset(j.offset());b=i.Config.base+i.Utils.debugUrl("plugins/uploader/uploader.swf");var o=new i.FlashBridge({movie:b,methods:["removeFile","cancel","removeFile","disable","enable","upload","setAllowMultipleFiles","setFileFilters","uploadAll"],holder:p,attrs:{width:j.width(),height:j.height()},flashVars:{menu:true}});j[0].disabled=true;o.on("swfReady",function(){j[0].disabled=false;p.css("visibility","hidden");o.setAllowMultipleFiles(false);
o.setFileFilters([{extensions:"*.jpeg;*.jpg;*.png;*.gif",description:"图片文件( png,jpg,jpeg,gif )"}])});o.on("fileSelect",function(){o.uploadAll(f.serverUrl,"POST",f.serverParams,f.fileInput);e.loading()});o.on("uploadCompleteData",function(d){d=k.trim(d.data).replace(/\\r||\\n/g,"");e.unloading();if(d){d=JSON.parse(d);d.error?alert(d.error):a.imgUrl.val(d.imgUrl)}});o.on("uploadError",function(d){e.unloading();alert(d.status)})}else g.hide()},_updateTip:function(a,b){a.html(b.attr("src"));a.attr("href",
b.attr("src"))},_real:function(){this.d.show()},_insert:function(){var a=this.imgUrl.val();if(i.Utils.verifyInputs(this.d.el.all("input"))){var b=parseInt(this.imgHeight.val()),e=this.get("editor"),c=parseInt(this.imgWidth.val()),h=this.imgAlign.val(),l=parseInt(this.imgMargin.val()),f="";if(b)f+="height:"+b+"px;";if(c)f+="width:"+c+"px;";if(h)f+="float:"+h+";";isNaN(l)||(f+="margin:"+l+"px;");if(f)f=" style='"+f+"' ";a=new q("<img "+f+"src='"+a+"' alt='' />",null,e.document);a=e.insertElement(a,
b||c?null:function(g){g.on("load",function(){g.detach();g.css({width:g.width()+"px",height:g.height()+"px"})})});this._selectedEl&&e.getSelection().selectElement(a);this.d.hide();e.notifySelectionChange()}},_updateD:function(a){if(this._selectedEl=a){this.imgUrl.val(a.attr("src"));this.imgHeight.val(a.height());this.imgWidth.val(a.width());this.imgAlign.val(a.css("float"));this.imgMargin.val(parseInt(a._4e_style("margin"))||0)}else{this.imgUrl.val("http://");this.imgHeight.val("自动");this.imgWidth.val("自动");
this.imgAlign.val("");this.imgMargin.val("5")}},show:function(a,b){this._prepare();this._updateD(b)}});i.ImageInserter=r;(function(a,b,e){w.register({pluginName:a,func:e,init:function(){var c=this,h=c.el;h.html(b+'  <a class="ke-bubbleview-url" target="_blank" href="#"></a> -     <span class="ke-bubbleview-link ke-bubbleview-change">编辑</span> -     <span class="ke-bubbleview-link ke-bubbleview-remove">删除</span>');var l=h.one(".ke-bubbleview-url"),f=h.one(".ke-bubbleview-change");h=h.one(".ke-bubbleview-remove");
f._4e_unselectable();l._4e_unselectable();h._4e_unselectable();f.on("click",function(g){c._plugin.show(null,c._selectedEl);g.halt()});h.on("click",function(g){var m=c._plugin;if(z.webkit){var n=m.editor.getSelection().getRanges();n&&n[0]&&(n[0].collapse(true)||1)&&n[0].select()}c._selectedEl._4e_remove();c.hide();m.editor.notifySelectionChange();g.halt()});c.on("afterVisibleChange",function(g){var m=c._selectedEl;g.newVal&&m&&c._plugin._updateTip(l,m)})}})})("image","图片网址： ",s)}();v.addPlugin(function(){new i.ImageInserter({editor:v})})});
