KISSY.Editor.add("smiley",function(j){var b=KISSY.Editor,e=KISSY,d=e.DOM,k=e.Event,l=e.Node,n=b.SimpleOverlay,g=b.TripleButton;b.Smiley||function(){function m(a){this.editor=a;this._init()}for(var h="<div class='ke-popup-wrap'><div class='ke-smiley-sprite'>",i=0;i<=98;i++)h+="<a href='#' data-icon='http://a.tbcdn.cn/sys/wangwang/smiley/48x48/"+i+".gif'></a>";h+="</div></div>";e.augment(m,{_init:function(){var a=this.editor;this.el=new g({contentCls:"ke-toolbar-smiley",title:"\u63d2\u5165\u8868\u60c5",
container:a.toolBarDiv});this.el.on("offClick",this._show,this);b.Utils.lazyRun(this,"_prepare","_real");b.Utils.sourceDisable(a,this)},disable:function(){this.el.set("state",g.DISABLED)},enable:function(){this.el.set("state",g.OFF)},_hidePanel:function(a){var f=this;d._4e_ascendant(a.target,function(c){return c[0]===f.el.el[0]})||this.smileyWin.hide()},_selectSmiley:function(a){a.halt();var f=this.editor;a=a.target;var c;if(d._4e_name(a)=="a"&&(c=d.attr(a,"data-icon"))){c=new l("<img alt='' src='"+
c+"'/>",null,f.document);f.insertElement(c);this.smileyWin.hide()}},_prepare:function(){var a=this.editor;this.smileyPanel=new l(h);this.smileyWin=new n({el:this.smileyPanel,focusMgr:false,mask:false});document.body.appendChild(this.smileyPanel[0]);this.smileyPanel.on("click",this._selectSmiley,this);k.on(document,"click",this._hidePanel,this);k.on(a.document,"click",this._hidePanel,this)},_real:function(){var a=this.el.el.offset();a.top+=this.el.el.height()+5;if(a.left+this.smileyPanel.width()>d.viewportWidth()-
60)a.left=d.viewportWidth()-this.smileyPanel.width()-60;this.smileyWin.show(a)},_show:function(a){this._prepare(a)}});b.Smiley=m}();j.addPlugin(function(){new b.Smiley(j)})});
