KISSY.Editor.add("maximize/support",function(){var e=KISSY.Editor,h=KISSY,f=h.UA,n=h.Node,k=h.Event,d=h.DOM,i;d.addStyleSheet(".ke-toolbar-padding {padding:5px;}","ke-maximize");var l={};h.mix(l,{onClick:function(){var a=this,b=a.editor;a._resize&&k.remove(window,"resize",a._resize);a.call("_saveEditorStatus");a.call("_restoreState");a.btn.boff();setTimeout(function(){a.call("_restoreEditorStatus");b.notifySelectionChange();b.fire("restoreWindow")},30)},_restoreState:function(){var a=document,b=this.editor,
c=this._savedParents;if(c){for(var g=0;g<c.length;g++){var j=c[g];j.el.css("position",j.position)}this._savedParents=null}b.wrap.css({height:this.iframeHeight});d.css(a.body,{width:"",height:"",overflow:""});a.documentElement.style.overflow="";b.editorWrap.css({position:"static",width:this.editorWrapWidth});i.css({left:"-99999px",top:"-99999px"});window.scrollTo(this.scrollLeft,this.scrollTop);a=this.btn.get("el");a.one("span").removeClass("ke-toolbar-restore").addClass("ke-toolbar-maximize");a.attr("title",
"\u5168\u5c4f");f.ie<8&&this.editor.toolBarDiv.removeClass("ke-toolbar-padding")},_saveSate:function(){var a=this.editor,b=[],c=a.editorWrap;this.iframeHeight=a.wrap._4e_style("height");this.editorWrapWidth=c._4e_style("width");this.scrollLeft=d.scrollLeft();this.scrollTop=d.scrollTop();window.scrollTo(0,0);for(a=c.parent();a;){c=a.css("position");if(c!="static"){b.push({el:a,position:c});a.css("position","static")}a=a.parent()}this._savedParents=b;b=this.btn.get("el");b.one("span").removeClass("ke-toolbar-maximize").addClass("ke-toolbar-restore");
b.attr("title","\u53d6\u6d88\u5168\u5c4f");f.ie<8&&this.editor.toolBarDiv.addClass("ke-toolbar-padding")},_saveEditorStatus:function(){var a=this.editor;this.savedRanges=null;if(f.gecko&&a.iframeFocus)this.savedRanges=(a=a.getSelection())&&a.getRanges()},_restoreEditorStatus:function(){var a=this.editor,b=a.getSelection(),c=this.savedRanges;f.gecko&&a.activateGecko();c&&b&&b.selectRanges(c);if(a.iframeFocus&&b)(a=b.getStartElement())&&a[0]&&a._4e_scrollIntoView();f.ie<8&&this.btn.get("el").one("span").css("background-image",
"")},_maximize:function(a){var b=document,c=this.editor,g=c.editorWrap,j=d.viewportHeight(),m=d.viewportWidth(),o=c.statusDiv?c.statusDiv[0].offsetHeight:0,p=c.toolBarDiv[0].offsetHeight;if(f.ie)b.body.style.overflow="hidden";else d.css(b.body,{width:0,height:0,overflow:"hidden"});b.documentElement.style.overflow="hidden";g.css({position:"absolute",zIndex:e.baseZIndex(e.zIndexManager.MAXIMIZE),width:m+"px"});i.css({zIndex:e.baseZIndex(e.zIndexManager.MAXIMIZE-5),height:j+"px",width:m+"px"});g.offset({left:0,
top:0});i.css({left:0,top:0});c.wrap.css({height:j-o-p+"px"});a!==true&&arguments.callee.call(this,true)},_real:function(){var a=this,b=a.editor;a.call("_saveEditorStatus");a.call("_saveSate");a.call("_maximize");a._resize=a._resize||e.Utils.buffer(a.cfg._maximize,a,100);k.on(window,"resize",a._resize);a.btn.bon();setTimeout(function(){a.call("_restoreEditorStatus");b.notifySelectionChange();b.fire("maximizeWindow")},30)},offClick:function(){i||(i=(new n("<iframe  class='ke-maximize-shim' style='position:absolute;top:-9999px;left:-9999px;' frameborder='0'>")).prependTo(document.body));
this.call("_real")},destroy:function(){}});e.Maximize=l},{attach:false});
