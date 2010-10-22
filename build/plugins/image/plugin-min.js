KISSY.Editor.add("image",function(s){var f=KISSY.Editor,l=KISSY,t=l.UA,x=l.JSON,q=l.Node,y=l.Event,u=f.BubbleView,z=f.SimpleOverlay;f.ImageInserter||function(){function o(a){o.superclass.constructor.call(this,a);this._init()}var p=function(a){return a._4e_name()==="img"&&!/(^|\s+)ke_/.test(a[0].className)&&a},A=f.TripleButton;o.ATTRS={editor:{}};var r={"图片属性":function(a){var b=a.getSelection();b=b&&b.getStartElement();b=p(b);a=a._toolbars.image;b&&a.show(null,b)}};l.extend(o,l.Base,{_init:function(){var a=
this.get("editor"),b=a.toolBarDiv,d={};this.editor=a;this.el=new A({contentCls:"ke-toolbar-image",title:"插入图片",container:b});this.el.on("offClick",this.show,this);y.on(a.document,"dblclick",this._dblclick,this);f.Utils.lazyRun(this,"_prepare","_real");a._toolbars=a._toolbars||{};a._toolbars.image=this;if(r)for(var e in r)(function(c){d[c]=function(){r[c](a)}})(e);f.ContextMenu.register(a.document,{rules:[p],width:"120px",funcs:d});u.attach({pluginName:"image",pluginInstance:this});f.Utils.sourceDisable(a,
this)},disable:function(){this.el.disable()},enable:function(){this.el.boff()},_dblclick:function(a){var b=new q(a.target);if(p(b)){this.show(null,b);a.halt()}},_prepare:function(){var a=this,b="请点击浏览上传图片",d=(a.get("editor").cfg.pluginConfig.image||{}).upload||null;a.d=new z({title:"图片",mask:true});var e=a.d;e.body.html("<div class='ke-image-wrap'><ul class='ke-tabs ks-clear'><li rel='remote'>网络图片</li><li rel='local'>本地上传</li></ul><div style='padding:12px 20px 5px 20px;'><div class='ke-image-tabs-content-wrap' ><div><label><span class='ke-image-title'>图片地址： </span><input  data-verify='^https?://[^\\s]+$'  data-warning='网址格式为：http://' class='ke-img-url ke-input' style='width:390px;' value='http://'/></label></div><div style='position:relative;'><form class='ke-img-upload-form'><p><input class='ke-input ke-img-local-url' readonly='readonly' style='margin-right: 15px; vertical-align: middle; width: 368px;color:#969696;'/><a style='padding:3px 11px;position:absolute;left:390px;top:0px;z-index:1;' class='ke-image-up ke-button'>浏览...</a></p><div class='ke-img-up-extraHtml'></div></form></div></div><table style='width:100%;margin-top:8px;' class='ke-img-setting'><tr><td><label>宽度： <input  data-verify='^(自动|((?!0$)\\d+))$'  data-warning='宽度请输入正整数' class='ke-img-width ke-input' style='width:60px' value='自动'/> 像素 </label></td><td><label>高度： <input  data-verify='^(自动|((?!0$)\\d+))$'  data-warning='高度请输入正整数' class='ke-img-height ke-input' style='width:60px' value='自动'/> 像素 </label></td></tr><tr><td><label>对齐：<select class='ke-img-align'><option value='none'>无</option><option value='left'>左对齐</option><option value='right'>右对齐</option></select></label></td><td><label>间距： <input  data-verify='^\\d+$'  data-warning='间距请输入非负整数' class='ke-img-margin ke-input' style='width:60px' value='0'/> 像素</label></td></tr></table></div></div>");
e.foot.html("<a class='ke-img-insert ke-button' style='margin-right:30px;'>确定</a> <a  class='ke-img-cancel ke-button'>取消</a>");var c=e.el,k=c.one(".ke-img-cancel"),g=c.one(".ke-img-insert"),i=c.one(".ke-img-upload-form"),h=c.one(".ke-img-local-url"),m=new f.Tabs({tabs:c.one("ul.ke-tabs"),contents:c.one("div.ke-image-tabs-content-wrap")});c.one(".ke-image-title");var v=f.Utils.verifyInputs,B=e.el.one(".ke-img-setting");a.tab=m;h.val(b);a.imgUrl=c.one(".ke-img-url");a.imgHeight=c.one(".ke-img-height");
a.imgWidth=c.one(".ke-img-width");a.imgAlign=f.Select.decorate(c.one(".ke-img-align"));a.imgMargin=c.one(".ke-img-margin");k.on("click",function(j){a.d.hide();j.halt()});g.on("click",function(){if(m.activate()=="local"&&d){if(v(B.all("input")))if(h.val()==b)alert("请先选择文件!");else{f.Utils.doFormUpload({form:i,callback:function(j){j=l.trim(j.responseText).replace(/\r|\n/g,"");e.unloading();h.val(b);try{j=x.parse(j)}catch(C){l.log(j);j={error:"服务器出错，请重试"}}if(j.error)alert(j.error);else{a.imgUrl.val(j.imgUrl);
a._insert()}}},d.serverParams,d.serverUrl);e.loading()}}else v(c.all("input"))&&a._insert()});if(d){d.extraHtml&&c.one(".ke-img-up-extraHtml").html(d.extraHtml);var w=c.one(".ke-image-up");k=d&&d.sizeLimit;var n=(new q("<input type='file' style='position:absolute;cursor:pointer;left:"+(t.ie?"360":"369")+"px;z-index:2;top:0px;height:26px;' size='1' name=''/>")).insertAfter(h);if(k)b="单张图片容量不超过 "+k/1E3+" M";h.val(b);n.css({opacity:0});n.on("mouseenter",function(){w.addClass("ke-button-hover")});n.on("mouseleave",
function(){w.removeClass("ke-button-hover")});n.on("change",function(){h.val(n.val())})}else m.remove("local")},_updateTip:function(a,b){var d=b.attr("src");a.html(d);a.attr("href",d)},_real:function(){this.d.show()},_insert:function(){var a=this.imgUrl.val(),b=parseInt(this.imgHeight.val()),d=this.get("editor"),e=parseInt(this.imgWidth.val()),c=this.imgAlign.val(),k=parseInt(this.imgMargin.val()),g="";if(b)g+="height:"+b+"px;";if(e)g+="width:"+e+"px;";if(c)g+="float:"+c+";";isNaN(k)||(g+="margin:"+
k+"px;");if(g)g=" style='"+g+"' ";b=new q("<img "+g+"src='"+a+"' alt='' />",null,d.document);b=d.insertElement(b,function(i){i.on("abort error",function(){i.detach();i[0].src=a})});this._selectedEl&&d.getSelection().selectElement(b);this.d.hide();d.notifySelectionChange()},_updateD:function(a){var b="remote";if(this._selectedEl=a){this.imgUrl.val(a.attr("src"));this.imgHeight.val(a.height());this.imgWidth.val(a.width());this.imgAlign.val(a.css("float")||"none");this.imgMargin.val(parseInt(a._4e_style("margin"))||
0)}else{b="local";this.imgUrl.val("http://");this.imgHeight.val("自动");this.imgWidth.val("自动");this.imgAlign.val("none");this.imgMargin.val(0)}this.tab.activate(b)},show:function(a,b){this._prepare();this._updateD(b)}});f.ImageInserter=o;(function(a,b,d){u.register({pluginName:a,func:d,init:function(){var e=this,c=e.el;c.html(b+'  <a class="ke-bubbleview-url" target="_blank" href="#"></a> -     <span class="ke-bubbleview-link ke-bubbleview-change">编辑</span> -     <span class="ke-bubbleview-link ke-bubbleview-remove">删除</span>');
var k=c.one(".ke-bubbleview-url"),g=c.one(".ke-bubbleview-change");c=c.one(".ke-bubbleview-remove");g._4e_unselectable();k._4e_unselectable();c._4e_unselectable();g.on("click",function(i){e._plugin.show(null,e._selectedEl);i.halt()});c.on("click",function(i){var h=e._plugin;if(t.webkit){var m=h.editor.getSelection().getRanges();m&&m[0]&&(m[0].collapse(true)||1)&&m[0].select()}e._selectedEl._4e_remove();e.hide();h.editor.notifySelectionChange();i.halt()});e.on("afterVisibleChange",function(i){var h=
e._selectedEl;i.newVal&&h&&e._plugin._updateTip(k,h)})}})})("image","图片网址： ",p)}();s.addPlugin(function(){new f.ImageInserter({editor:s})})});
