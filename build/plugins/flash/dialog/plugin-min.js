KISSY.Editor.add("flash/dialog",function(f){var d=KISSY,c=d.Editor,h=c.Dialog,i=c.Utils.flash;c.Flash.FlashDialog||function(){function g(b){this.editor=b;c.Utils.lazyRun(this,"_prepareShow","_realShow");this._config()}c.Flash.FlashDialog=g;d.augment(g,{_config:function(){this._urlTip="\u8bf7\u8f93\u5165\u5982 http://www.xxx.com/xxx.swf";this._type="flash";this._cls="ke_flash";this._config_dwidth="400px";this._title="Flash";this._bodyHtml="<div style='padding:20px 20px 0 20px'><p><label>\u7f51\u5740\uff1a <input  data-verify='^https?://[^\\s]+$'  data-warning='\u7f51\u5740\u683c\u5f0f\u4e3a\uff1ahttp://' class='ke-flash-url ke-input' style='width:300px;vertical-align:middle' /></label></p><table style='margin:10px 0 5px  40px;width:300px;'><tr><td><label>\u5bbd\u5ea6\uff1a <input  data-verify='^(?!0$)\\d+$'  data-warning='\u5bbd\u5ea6\u8bf7\u8f93\u5165\u6b63\u6574\u6570' class='ke-flash-width ke-input' style='width:60px;margin-left:2px;vertical-align:middle' /> \u50cf\u7d20 </label></td><td><label>\u9ad8\u5ea6\uff1a<input  data-verify='^(?!0$)\\d+$'  data-warning='\u9ad8\u5ea6\u8bf7\u8f93\u5165\u6b63\u6574\u6570' class='ke-flash-height ke-input' style='width:60px;vertical-align:middle' /> \u50cf\u7d20 </label></td></tr><tr><td><label>\u5bf9\u9f50\uff1a <select class='ke-flash-align'><option value='none'>\u65e0</option><option value='left'>\u5de6\u5bf9\u9f50</option><option value='right'>\u53f3\u5bf9\u9f50</option></select></td><td><label>\u95f4\u8ddd\uff1a<input  data-verify='^\\d+$'  data-warning='\u95f4\u8ddd\u8bf7\u8f93\u5165\u975e\u8d1f\u6574\u6570' class='ke-flash-margin ke-input' style='width:60px;vertical-align:middle' value='5'/> \u50cf\u7d20</label></td></tr></table></div>";
this._footHtml="<div style='padding:5px 20px 20px;'><a class='ke-flash-ok ke-button' style='margin-left:40px;margin-right:20px;'>\u786e\u5b9a</a> <a class='ke-flash-cancel ke-button'>\u53d6\u6d88</a></div>"},_prepareShow:function(){this.d=new h({autoRender:true,headerContent:this._title,bodyContent:this._bodyHtml,footerContent:this._footHtml,width:this._config_dwidth||"500px",mask:true});this._initD()},_realShow:function(){this._updateD();this.d.show()},_getFlashUrl:function(b){return i.getUrl(b)},_updateD:function(){var b=
this.editor,a=this.selectedFlash;if(a){if(b=b.restoreRealElement(a)){a.css("width")&&this.dWidth.val(parseInt(a.css("width")));a.css("height")&&this.dHeight.val(parseInt(a.css("height")));this.dAlign.val(a.css("float"));c.Utils.valInput(this.dUrl,this._getFlashUrl(b));this.dMargin.val(parseInt(b._4e_style("margin"))||0)}}else{c.Utils.resetInput(this.dUrl);this.dWidth.val("");this.dHeight.val("");this.dAlign.val("none");this.dMargin.val("5")}},show:function(b){this.selectedFlash=b;this._prepareShow()},
_initD:function(){var b=this.d,a=b.get("el");this.dHeight=a.one(".ke-flash-height");this.dWidth=a.one(".ke-flash-width");this.dUrl=a.one(".ke-flash-url");this.dAlign=c.Select.decorate(a.one(".ke-flash-align"));this.dMargin=a.one(".ke-flash-margin");var e=a.one(".ke-flash-ok");a=a.one(".ke-flash-cancel");e.on("click",this._gen,this);a.on("click",function(){b.hide()});c.Utils.placeholder(this.dUrl,this._urlTip)},_getDInfo:function(){return{url:this.dUrl.val(),attrs:{width:this.dWidth.val(),height:this.dHeight.val(),
style:"margin:"+(parseInt(this.dMargin.val())||0)+"px;float:"+this.dAlign.val()+";"}}},_gen:function(){var b=this.editor,a=this._getDInfo(),e=a&&d.trim(a.url),j=a&&a.attrs;if(a)if(c.Utils.verifyInputs(this.d.get("el").all("input"))){a=b.execCommand("insertFlash",e,j,this._cls,this._type);this.selectedFlash&&b.getSelection().selectElement(a);this.d.hide()}}})}();f.addDialog("flash/dialog",new c.Flash.FlashDialog(f))});
