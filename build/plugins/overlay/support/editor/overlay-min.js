KISSY.Editor.add("overlay",function(){var b=KISSY,a=b.Editor;if(!a.Overlay){var f=b.Base.create(b.Overlay,[a.Ext.Focus],{init:function(){b.log("Overlay4E init");this.on("syncUI",this._syncUIOverlay4E,this)},_syncUIOverlay4E:function(){b.log("_syncUIOverlay4E");a.Utils.preventFocus(this.get("contentEl"))}},{ATTRS:{zIndex:{value:a.baseZIndex(a.zIndexManager.OVERLAY)}}}),e=b.Base.create(b.Dialog,[a.Ext.Focus],{show:function(){this.center();var d=this.get("y");if(d-b.DOM.scrollTop()>200){d=b.DOM.scrollTop()+
200;this.set("y",d)}e.superclass.show.call(this)}},{ATTRS:{constrain:{value:true},zIndex:{value:a.baseZIndex(a.zIndexManager.OVERLAY)}}});a.Overlay=f;a.Dialog=e;var c;a.Overlay.loading=function(){c||(c=new a.Overlay({x:0,focus4e:false,width:"100%",y:0,zIndex:a.baseZIndex(a.zIndexManager.LOADING),elCls:"ke-global-loading"}));c.set("height",b.DOM.docHeight());c.show();c.loading()};a.Overlay.unloading=function(){c&&c.hide()}}});
