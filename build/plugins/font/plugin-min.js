KISSY.Editor.add("font",function(e){var c=KISSY.Editor,n=KISSY,l=c.Style,m=c.TripleButton,o=e.cfg.pluginConfig["font-size"]||{};n.mix(o,{items:function(f){for(var i=[],g=0;g<f.length;g++)i.push({name:f[g],value:f[g]});return i}(["8px","10px","12px","14px","18px","24px","36px","48px","60px","72px","84px","96px","108px"]),width:"55px"},false);var r={},s=[],j={element:"span",styles:{"font-size":"#(size)"},overrides:[{element:"font",attributes:{size:null}}]},q=e.cfg.pluginConfig["font-family"]||["宋体",
"黑体","隶书","楷体_GB2312","微软雅黑","Georgia","Times New Roman","Impact","Courier New","Arial","Verdana","Tahoma"],t={},u=[],w={element:"span",styles:{"font-family":"#(family)"},overrides:[{element:"font",attributes:{face:null}}]},h;e.cfg.pluginConfig["font-size"]=o;e.cfg.pluginConfig["font-family"]=q;for(h=0;h<o.items.length;h++){var k=o.items[h],x=k.name,y=k.attrs;k=k.value;r[k]=new l(j,{size:k});s.push({name:x,value:k,attrs:y})}for(h=0;h<q.length;h++){j=q[h];t[j]=new l(w,{family:j});u.push({name:j,value:j,
attrs:{style:"font-family:"+j}})}c.Font||function(){function f(a){f.superclass.constructor.call(this,a);this._init()}function i(a){i.superclass.constructor.call(this,a);this._init()}f.ATTRS={title:{},html:{},styles:{},editor:{}};var g=c.Select;n.extend(f,n.Base,{_init:function(){var a=this.get("editor"),b=a.toolBarDiv;this.get("html");this.el=new g({container:b,doc:a.document,width:this.get("width"),popUpWidth:this.get("popUpWidth"),title:this.get("title"),items:this.get("html"),showValue:this.get("showValue")});
this.el.on("click",this._vChange,this);a.on("selectionChange",this._selectionChange,this);c.Utils.sourceDisable(a,this)},disable:function(){this.el.set("state",g.DISABLED)},enable:function(){this.el.set("state",g.ENABLED)},_vChange:function(a){var b=this.get("editor"),d=a.newVal;a=a.preVal;var p=this.get("styles");b.focus();b.fire("save");if(d==a){p[d].remove(b.document);this.el.set("value","")}else p[d].apply(b.document);b.fire("save")},_selectionChange:function(a){this.get("editor");a=a.path.elements;
for(var b=this.get("styles"),d=0,p;d<a.length;d++){p=a[d];for(var v in b)if(b[v].checkElementRemovable(p,true)){this.el.set("value",v);return}}this.el.reset("value")}});i.ATTRS={editor:{},text:{},contentCls:{},title:{},style:{}};n.extend(i,n.Base,{_init:function(){var a=this.get("editor"),b=this.get("text");this.get("style");var d=this.get("title");this.el=new m({text:b,title:d,contentCls:this.get("contentCls"),container:a.toolBarDiv});this.el.on("offClick",this._on,this);this.el.on("onClick",this._off,
this);a.on("selectionChange",this._selectionChange,this);c.Utils.sourceDisable(a,this)},disable:function(){this.el.set("state",m.DISABLED)},enable:function(){this.el.set("state",m.OFF)},_on:function(){var a=this.get("editor");this.get("text");var b=this.get("style");this.get("title");a.fire("save");b.apply(a.document);a.fire("save");a.notifySelectionChange();a.focus()},_off:function(){var a=this.get("editor");this.get("text");var b=this.get("style");this.get("title");a.fire("save");b.remove(a.document);
a.fire("save");a.notifySelectionChange();a.focus()},_selectionChange:function(a){this.get("editor");this.get("text");var b=this.get("style");this.get("title");var d=this.el;a=a.path;if(d.get("state")!=m.DISABLED)b.checkActive(a)?d.set("state",m.ON):d.set("state",m.OFF)}});f.SingleFont=i;c.Font=f}();e.addPlugin(function(){new c.Font({editor:e,title:"大小",width:"30px",showValue:true,popUpWidth:o.width,styles:r,html:s});new c.Font({editor:e,title:"字体",width:"110px",popUpWidth:"130px",styles:t,html:u});
new c.Font.SingleFont({contentCls:"ke-toolbar-bold",title:"粗体 ",editor:e,style:new l({element:"strong",overrides:[{element:"b"},{element:"span",attributes:{style:"font-weight: bold;"}}]})});new c.Font.SingleFont({contentCls:"ke-toolbar-italic",title:"斜体 ",editor:e,style:new l({element:"em",overrides:[{element:"i"},{element:"span",attributes:{style:"font-style: italic;"}}]})});new c.Font.SingleFont({contentCls:"ke-toolbar-underline",title:"下划线 ",editor:e,style:new l({element:"u",overrides:[{element:"span",
attributes:{style:"text-decoration: underline;"}}]})});new c.Font.SingleFont({contentCls:"ke-toolbar-strikeThrough",title:"删除线 ",editor:e,style:new l({element:"del",overrides:[{element:"span",attributes:{style:"text-decoration: line-through;"}},{element:"s"}]})})})});
