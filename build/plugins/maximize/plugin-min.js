KISSY.Editor.add("maximize",function(l){var g=KISSY.Editor,h=KISSY,j=h.UA,o=h.Node,m=h.Event,n=g.TripleButton,d=h.DOM,k;if(!(j.gecko<1.92)){g.Maximize||function(){function e(a){this.editor=a;this._init()}e.init=function(){k=(new o("<iframe  class='ke-maximize-shim' style='position:absolute;top:-9999px;left:-9999px;' frameborder='0'></iframe>")).appendTo(document.body);e.init=null};h.augment(e,{_init:function(){var a=new n({container:this.editor.toolBarDiv,title:"全屏",contentCls:"ke-toolbar-maximize"});
this.el=a;a.on("offClick",this.maximize,this);a.on("onClick",this.restore,this);g.Utils.lazyRun(this,"_prepare","_real")},restore:function(){var a=this,b=a.editor;m.remove(window,"resize",a._maximize,a);a._saveEditorStatus();a._restoreState();a.el.boff();setTimeout(function(){a._restoreEditorStatus();b.notifySelectionChange()},30)},_restoreState:function(){var a=document,b=this.editor,c=this._savedParents;if(c){for(var f=0;f<c.length;f++){var i=c[f];i.el.css("position",i.position)}this._savedParents=
null}b.wrap.css({height:this.iframeHeight});d.css(a.body,{width:"",height:"",overflow:""});a.documentElement.style.overflow="";b.editorWrap.css({position:"static",width:this.editorWrapWidth});k.css({left:"-99999px",top:"-99999px"});window.scrollTo(this.scrollLeft,this.scrollTop);a=this.el.el;a.one("span").removeClass("ke-toolbar-restore").addClass("ke-toolbar-maximize");a.attr("title","全屏")},_saveSate:function(){var a=this.editor,b=[],c=a.editorWrap;this.iframeHeight=a.wrap._4e_style("height");this.editorWrapWidth=
c._4e_style("width");this.scrollLeft=d.scrollLeft();this.scrollTop=d.scrollTop();window.scrollTo(0,0);for(a=c.parent();a;){c=a.css("position");if(c!="static"){b.push({el:a,position:c});a.css("position","static")}a=a.parent()}this._savedParents=b;b=this.el.el;this.el.el.one("span").removeClass("ke-toolbar-maximize").addClass("ke-toolbar-restore");b.attr("title","取消全屏")},_saveEditorStatus:function(){var a=this.editor;this.savedRanges=null;if(j.gecko&&a.iframeFocus)this.savedRanges=(a=a.getSelection())&&
a.getRanges()},_restoreEditorStatus:function(){var a=this.editor,b=a.getSelection(),c=this.savedRanges;a.activateGecko();c&&b&&b.selectRanges(c);if(a.iframeFocus&&b)(a=b.getStartElement())&&a[0]&&a._4e_scrollIntoView();j.ie<8&&this.el.el.one("span").css("background-image","")},_maximize:function(){var a=document,b=this.editor,c=b.editorWrap,f=d.viewportHeight(),i=d.viewportWidth(),p=b.statusDiv?b.statusDiv.height():0,q=b.toolBarDiv.height();if(j.ie)a.body.style.overflow="hidden";else d.css(a.body,
{width:0,height:0,overflow:"hidden"});a.documentElement.style.overflow="hidden";c.css({position:"absolute",zIndex:b.baseZIndex(990),width:i+"px"});k.css({zIndex:b.baseZIndex(985),height:f+"px",width:i+"px"});c.offset({left:0,top:0});k.css({left:0,top:0});b.wrap.css({height:f-p-q-8+"px"})},_real:function(){var a=this,b=a.editor;a._saveEditorStatus();a._saveSate();a._maximize();a._maximize();m.on(window,"resize",a._maximize,a);a.el.set("state",n.ON);setTimeout(function(){a._restoreEditorStatus();b.notifySelectionChange()},
30)},_prepare:function(){e.init&&e.init()},maximize:function(){this._prepare()}});g.Maximize=e}();l.addPlugin(function(){new g.Maximize(l)})}});
