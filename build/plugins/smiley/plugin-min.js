KISSY.Editor.add("smiley",function(j){var d=KISSY.Editor,f=KISSY,e=f.DOM,k=f.Event,l=f.Node,n=d.SimpleOverlay,g=d.TripleButton;d.Smiley||function(){function m(a){this.editor=a;this._init()}e.addStyleSheet('.ke-smiley-sprite { background: url("http://a.tbcdn.cn/sys/wangwang/smiley/sprite.png") no-repeat scroll -1px 0 transparent; height: 235px; width: 288px; margin: 5px;zoom: 1; overflow: hidden;}.ke-smiley-sprite a {   width: 24px;height: 24px; border: 1px solid white; float: left;}.ke-smiley-sprite a:hover { border: 1px solid #808080;}',
"smiley");for(var h="<div class='ke-smiley-sprite'>",i=0;i<=98;i++)h+="<a href='#' data-icon='http://a.tbcdn.cn/sys/wangwang/smiley/48x48/"+i+".gif'></a>";h+="</div>";f.augment(m,{_init:function(){var a=this.editor;this.el=new g({contentCls:"ke-toolbar-smiley",title:"\u63d2\u5165\u8868\u60c5",container:a.toolBarDiv});this.el.on("offClick onClick",this._show,this);d.Utils.lazyRun(this,"_prepare","_real");d.Utils.sourceDisable(a,this)},disable:function(){this.el.set("state",g.DISABLED)},enable:function(){this.el.set("state",
g.OFF)},_hidePanel:function(a){var b=this.el.el;a=a.target;var c=this.smileyWin;b._4e_equals(a)||b.contains(a)||c.hide()},_selectSmiley:function(a){a.halt();var b=this.editor;a=a.target;var c;if(e._4e_name(a)=="a"&&(c=e.attr(a,"data-icon"))){c=new l("<img class='ke_smiley'alt='' src='"+c+"'/>",null,b.document);b.insertElement(c);this.smileyWin.hide()}},_prepare:function(){var a=this.el,b=this.editor;this.smileyPanel=new l(h);var c=this.smileyWin=new n({el:this.smileyPanel,width:"297px",zIndex:b.baseZIndex(d.zIndexManager.POPUP_MENU),
focusMgr:false,mask:false});c.on("show",a.bon,a);c.on("hide",a.boff,a);this.smileyPanel.on("click",this._selectSmiley,this);k.on(document,"click",this._hidePanel,this);k.on(b.document,"click",this._hidePanel,this)},_real:function(){var a=this.el.el.offset();a.top+=this.el.el.height()+5;if(a.left+this.smileyPanel.width()>e.viewportWidth()-60)a.left=e.viewportWidth()-this.smileyPanel.width()-60;this.smileyWin.show(a)},_show:function(a){var b=this.smileyWin;b&&b.get("visible")?b.hide():this._prepare(a)}});
d.Smiley=m}();j.addPlugin(function(){new d.Smiley(j)})});
