KISSY.Editor.add("image/dialog",function(r){function D(){var a=s.val(),c=parseInt(m.val()),e=parseInt(n.val()),f=y.val(),A=parseInt(z.val()),d="";if(c)d+="height:"+c+"px;";if(e)d+="width:"+e+"px;";if(f)d+="float:"+f+";";isNaN(A)||(d+="margin:"+A+"px;");if(d)d=" style='"+d+"' ";c=new C("<img "+d+"src='"+a+"' alt='' />",null,r.document);g.hide();r.insertElement(c,function(h){h.on("abort error",function(){h.detach();h[0].src=a})},function(h){p&&r.getSelection().selectElement(h);r.notifySelectionChange()})}
var o=KISSY,i=o.Editor,G=o.DOM,H=o.UA,I=o.JSON,C=o.Node,J=o.Event,K=i.Dialog,L=/(png|jpg|jpeg|gif)$/i,g,x,s,m,n,y,q,z,t,j,u,B,v="\u8bf7\u70b9\u51fb\u6d4f\u89c8\u4e0a\u4f20\u56fe\u7247",p,k=(r.cfg.pluginConfig.image||{}).upload||null;r.addDialog("image/dialog",{show:function(a){var c="remote",e=i.Utils.resetInput,f=i.Utils.valInput;if(p=a){f(s,p.attr("src"));a=p.width();e=p.height();f(m,e);f(n,a);y.val(p.css("float")||"none");f=parseInt(p._4e_style("margin"))||0;z.val(f);q[0].disabled=false;t=a/e}else{if(x.getTab("local"))c="local";e(s);e(m);
e(n);y.val("none");z.val(0);q[0].disabled=true;t=null}B[0].reset();j.val(v);x.activate(c);g.show()},hide:function(){g.hide()}});(function(){g=new K({autoRender:true,width:500,headerContent:"\u56fe\u7247",bodyContent:"<div class='ke-image-wrap'><ul class='ke-tabs ks-clear'><li rel='remote'>\u7f51\u7edc\u56fe\u7247</li><li rel='local'>\u672c\u5730\u4e0a\u4f20</li></ul><div style='padding:12px 20px 5px 20px;'><div class='ke-image-tabs-content-wrap' ><div><label><span class='ke-image-title'>\u56fe\u7247\u5730\u5740\uff1a </span><input  data-verify='^(https?:/)?/[^\\s]+$'  data-warning='\u7f51\u5740\u683c\u5f0f\u4e3a\uff1ahttp:// \u6216 /' class='ke-img-url ke-input' style='width:390px;' /></label></div><div style='position:relative;'><form class='ke-img-upload-form'><p style='zoom:1;'><input class='ke-input ke-img-local-url' readonly='readonly' style='margin-right: 15px; vertical-align: middle; width: 368px;color:#969696;'/><a style='padding:3px 11px;position:absolute;left:390px;top:0px;z-index:1;' class='ke-image-up ke-button'>\u6d4f\u89c8...</a></p><div class='ke-img-up-extraHtml'></div></form></div></div><table style='width:100%;margin-top:8px;' class='ke-img-setting'><tr><td><label>\u5bbd\u5ea6\uff1a <input  data-verify='^(\u81ea\u52a8|((?!0$)\\d+))?$'  data-warning='\u5bbd\u5ea6\u8bf7\u8f93\u5165\u6b63\u6574\u6570' class='ke-img-width ke-input' style='vertical-align:middle;width:60px' /> \u50cf\u7d20 </label></td><td><label>\u9ad8\u5ea6\uff1a <input  data-verify='^(\u81ea\u52a8|((?!0$)\\d+))?$'  data-warning='\u9ad8\u5ea6\u8bf7\u8f93\u5165\u6b63\u6574\u6570' class='ke-img-height ke-input' style='vertical-align:middle;width:60px' /> \u50cf\u7d20 </label><label><input type='checkbox' class='ke-img-ratio' style='vertical-align:middle;margin-left:5px;' checked='checked'/> \u9501\u5b9a\u9ad8\u5bbd\u6bd4</label></td></tr><tr><td><label>\u5bf9\u9f50\uff1a<select class='ke-img-align'><option value='none'>\u65e0</option><option value='left'>\u5de6\u5bf9\u9f50</option><option value='right'>\u53f3\u5bf9\u9f50</option></select></label></td><td><label>\u95f4\u8ddd\uff1a <input  data-verify='^\\d+$'  data-warning='\u95f4\u8ddd\u8bf7\u8f93\u5165\u975e\u8d1f\u6574\u6570' class='ke-img-margin ke-input' style='width:60px' value='0'/> \u50cf\u7d20</label></td></tr></table></div></div>",
footerContent:"<div style='padding:5px 20px 20px;'><a class='ke-img-insert ke-button' style='margin-right:30px;'>\u786e\u5b9a</a> <a  class='ke-img-cancel ke-button'>\u53d6\u6d88</a></div>",mask:true});var a=g.get("el"),c=a.one(".ke-img-cancel"),e=a.one(".ke-img-insert"),f=i.Utils.verifyInputs,A=a.one(".ke-img-setting");B=a.one(".ke-img-upload-form");j=a.one(".ke-img-local-url");x=new i.Tabs({tabs:a.one("ul.ke-tabs"),contents:a.one("div.ke-image-tabs-content-wrap")});j.val(v);s=a.one(".ke-img-url");m=a.one(".ke-img-height");
n=a.one(".ke-img-width");q=a.one(".ke-img-ratio");y=i.Select.decorate(a.one(".ke-img-align"));z=a.one(".ke-img-margin");var d=i.Utils.placeholder;d(s,"http://");d(m,"\u81ea\u52a8");d(n,"\u81ea\u52a8");m.on("keyup",function(){var b=parseInt(m.val());!b||!q[0].checked||q[0].disabled||!t||n.val(Math.floor(b*t))});n.on("keyup",function(){var b=parseInt(n.val());!b||!q[0].checked||q[0].disabled||!t||m.val(Math.floor(b/t))});c.on("click",function(b){g.hide();b.halt()});var h=(new C("<a class='ke-button' style='position:absolute;z-index:"+
i.baseZIndex(i.zIndexManager.LOADING_CANCEL)+";left:-9999px;top:-9999px;'>\u53d6\u6d88\u4e0a\u4f20</a>")).appendTo(document.body),w=null;h.on("click",function(){g.unloading();if(w){J.remove(w,"load");G.remove(w)}h.css({left:-9999,top:-9999});w=null});e.on("click",function(){if(x.activate()=="local"&&k){if(f(A.all("input")))if(j.val()==v)alert("\u8bf7\u5148\u9009\u62e9\u6587\u4ef6!");else if(L.test(j.val())){g.loading();w=i.Utils.doFormUpload({form:B,callback:function(l){w=null;h.css({left:-9999,top:-9999});l=o.trim(l.responseText).replace(/\r|\n/g,
"");g.unloading();try{l=I.parse(l)}catch(M){o.log(l);l={error:"\u670d\u52a1\u5668\u51fa\u9519\uff0c\u8bf7\u91cd\u8bd5"}}if(l.error)alert(l.error);else{s.val(l.imgUrl);D()}}},k.serverParams,k.serverUrl);var b=g.get("el"),E=b.offset();h.css({left:E.left+b[0].offsetWidth/2.5,top:E.top+b[0].offsetHeight/1.5})}else{alert("\u53ea\u5141\u8bb8\u540e\u7f00\u540d\u4e3apng,jpg,jpeg,gif\u7684\u56fe\u7247");B[0].reset();j.val(v)}}else f(a.all("input"))&&D()});if(k){k.extraHtml&&a.one(".ke-img-up-extraHtml").html(k.extraHtml);var F=a.one(".ke-image-up");c=k&&k.sizeLimit;u=(new C("<input type='file' style='position:absolute;cursor:pointer;left:"+
(H.ie?"360":"369")+"px;z-index:2;top:0px;height:26px;' size='1' name='"+(k.fileInput||"Filedata")+"'/>")).insertAfter(j);if(c)v="\u5355\u5f20\u56fe\u7247\u5bb9\u91cf\u4e0d\u8d85\u8fc7 "+c/1E3+" M";j.val(v);u.css({opacity:0});u.on("mouseenter",function(){F.addClass("ke-button-hover")});u.on("mouseleave",function(){F.removeClass("ke-button-hover")});u.on("change",function(){var b=u.val();j.val(b.replace(/.+[\/\\]/,""))})}else x.remove("local")})()});
