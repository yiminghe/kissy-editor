KISSY.Editor.add("link/dialog",function(g){var e=KISSY,d=e.Editor;d.namespace("Link");var f=d.Link;f.Dialog||function(){function h(a){this.editor=a;d.Utils.lazyRun(this,"_prepareShow","_real")}var i=d.Dialog;f.Dialog=h;e.augment(h,{_prepareShow:function(){var a=new i({autoRender:true,width:500,headerContent:"\u94fe\u63a5",bodyContent:"<div style='padding:20px 20px 0 20px'><p><label>\u94fe\u63a5\u7f51\u5740\uff1a <input  data-verify='^(https?://[^\\s]+)|(#.+)$'  data-warning='\u8bf7\u8f93\u5165\u5408\u9002\u7684\u7f51\u5740\u683c\u5f0f' class='ke-link-url ke-input' style='width:390px;vertical-align:middle;' /></label></p><p style='margin: 15px 0 10px 0px;'><label>\u94fe\u63a5\u540d\u79f0\uff1a <input class='ke-link-title ke-input' style='width:100px;vertical-align:middle;'></label> <label><input class='ke-link-blank' style='vertical-align: middle; margin-left: 21px;' type='checkbox'/> &nbsp; \u5728\u65b0\u7a97\u53e3\u6253\u5f00\u94fe\u63a5</label></p></div>",
footerContent:"<div style='padding:5px 20px 20px;'><a class='ke-link-ok ke-button' style='margin-left:65px;margin-right:20px;'>\u786e\u5b9a</a> <a class='ke-link-cancel ke-button'>\u53d6\u6d88</a></div>",mask:true});this.dialog=a;var b=a.get("body"),c=a.get("footer");a.urlEl=b.one(".ke-link-url");a.urlTitle=b.one(".ke-link-title");a.targetEl=b.one(".ke-link-blank");b=c.one(".ke-link-cancel");c.one(".ke-link-ok").on("click",this._link,this);b.on("click",a.hide,a);d.Utils.placeholder(a.urlEl,"http://")},_link:function(){var a=
this.cmd,b=a.cfg,c=this.dialog,j=c.urlEl.val();if(d.Utils.verifyInputs(c.get("el").all("input"))){c.hide();c={href:j,target:c.targetEl[0].checked?"_blank":"_self",title:e.trim(c.urlTitle.val())};b._link.call(a,c)}},_real:function(){var a=this.cmd,b=a.cfg,c=b._getSelectedLink.call(a);a=b._getSelectionLinkUrl.call(a);b=this.dialog;if(c){d.Utils.valInput(b.urlEl,a);b.urlTitle.val(c.attr("title")||"");b.targetEl[0].checked=c.attr("target")=="_blank"}else{d.Utils.resetInput(b.urlEl);b.urlTitle.val("")}b.show()},
show:function(a){this.cmd=a;this._prepareShow()}})}();g.addDialog("link/dialog",new f.Dialog(g))});
