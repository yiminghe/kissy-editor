KISSY.Editor.add("smiley/support",function(){var e=KISSY,i=e.Event,g=e.Editor,h=e.DOM;h.addStyleSheet('.ke-smiley-sprite { background: url("http://a.tbcdn.cn/sys/wangwang/smiley/sprite.png") no-repeat scroll -1px 0 transparent; height: 235px; width: 288px; margin: 5px;zoom: 1; overflow: hidden;}.ke-smiley-sprite a {   width: 24px;height: 24px; border: 1px solid white; float: left;}.ke-smiley-sprite a:hover { border: 1px solid #808080;}',"smiley");var f;g.SmileySupport={_selectSmiley:function(a){a.halt();
var b=this.editor;a=new e.Node(a.target);var d;if(a._4e_name()=="a"&&(d=a.attr("data-icon"))){d=new e.Node("<img class='ke_smiley'alt='' src='"+d+"'/>",null,b.document);b.insertElement(d);this.smileyWin.hide()}},_hidePanel:function(a){var b=this.btn.get("el");a=new e.Node(a.target);var d=this.smileyWin;b._4e_equals(a)||b.contains(a)||d.hide()},_show:function(){var a=this.smileyWin;a&&a.get("visible")?a.hide():this.call("_prepare")},_prepare:function(){var a=this.cfg,b=this.btn,d=this.editor,c;if(!f){f=
"<div class='ke-smiley-sprite'>";for(c=0;c<=98;c++)f+="<a href='#' data-icon='http://a.tbcdn.cn/sys/wangwang/smiley/48x48/"+c+".gif'></a>";f+="</div>"}c=f;c=this.smileyWin=new g.Overlay({content:c,focus4e:false,width:"297px",autoRender:true,elCls:"ks-popup",zIndex:d.baseZIndex(g.zIndexManager.POPUP_MENU),mask:false});this.smileyPanel=c.get("contentEl");c.on("show",b.bon,b);c.on("hide",b.boff,b);this.smileyPanel.on("click",a._selectSmiley,this);i.on(document,"click",a._hidePanel,this);i.on(d.document,
"click",a._hidePanel,this);this.cfg._prepare=this.cfg._real;this.call("_real")},_real:function(){var a=this.btn.get("el"),b=a.offset();b.top+=a.height()+5;if(b.left+this.smileyPanel.width()>h.viewportWidth()-60)b.left=h.viewportWidth()-this.smileyPanel.width()-60;this.smileyWin.set("xy",[b.left,b.top]);this.smileyWin.show()},offClick:function(){this.call("_prepare")},onClick:function(){this.call("_prepare")}}});
