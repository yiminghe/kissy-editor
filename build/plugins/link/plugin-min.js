KISSY.Editor.add("link",function(i){var e=KISSY.Editor;e.Link||function(){function f(a){this.editor=a;this._init()}function j(a){return a._4e_ascendant(function(b){return b._4e_name()==="a"&&!!b.attr("href")},true)}var k=KISSY,h=e.TripleButton,l=e.Style,p=k.Node,q=e.Range,r=e.SimpleOverlay,m=e.BubbleView,n={element:"a",attributes:{href:"#(href)",target:"#(target)"}};f.init=function(){var a=new r({title:"链接属性",mask:true,width:"350px"});this.dialog=a;a.body.html("<div style='padding:20px 20px 0 20px'><p><label><span >链接网址： </span><input  data-verify='^https?://[^\\s]+$'  data-warning='网址格式为：http://' class='ke-link-url ke-input' style='width:230px' value='http://'/></label></p><p style='margin: 15px 0 10px 70px;'><label><input class='ke-link-blank' type='checkbox'/> &nbsp; 在新窗口打开链接</label></p></div>");
a.foot.html("<button class='ke-link-ok ke-button' style='margin-left:65px;margin-right:20px;'>确定</button> <button class='ke-link-cancel ke-button'>取消</button>");a.urlEl=a.body.one(".ke-link-url");a.targetEl=a.body.one(".ke-link-blank");var b=a.foot.one(".ke-link-cancel");a.foot.one(".ke-link-ok").on("click",function(c){a.link._link();c.halt()},this);b.on("click",function(c){a.hide();c.halt()},this);f.init=null};m.register({pluginName:"link",func:j,init:function(){var a=this,b=a.el;b.html('前往链接：  <a href=""  target="_blank" class="ke-bubbleview-url"></a> -  <span class="ke-bubbleview-link ke-bubbleview-change">编辑</span> -  <span class="ke-bubbleview-link ke-bubbleview-remove">去除</span>');
var c=b.one(".ke-bubbleview-url"),g=b.one(".ke-bubbleview-change");b=b.one(".ke-bubbleview-remove");g._4e_unselectable();c._4e_unselectable();b._4e_unselectable();g.on("click",function(d){a._plugin.show();d.halt()});b.on("click",function(d){var o=a._plugin;o._removeLink(a._selectedEl);o.editor.notifySelectionChange();d.halt()});a.on("afterVisibleChange",function(){var d=a._selectedEl;if(d){c.html(d.attr("href"));c.attr("href",d.attr("href"))}})}});k.augment(f,{_init:function(){var a=this.editor;this.el=
new h({container:a.toolBarDiv,contentCls:"ke-toolbar-link",title:"插入链接 "});this.el.on("offClick",this.show,this);m.attach({pluginName:"link",pluginInstance:this});e.Utils.sourceDisable(a,this)},disable:function(){this.el.set("state",h.DISABLED)},enable:function(){this.el.set("state",h.OFF)},_removeLink:function(a){var b=this.editor,c={href:a.attr("href")};if(a._4e_hasAttribute("target"))c.target=a.attr("target");a=new l(n,c);b.fire("save");a.remove(b.document);b.fire("save")},_getSelectedLink:function(){var a=
this.editor.getSelection();if(a=a&&a.getStartElement())a=j(a);return a},_link:function(){var a,b=this.editor,c=f.dialog,g=c.urlEl.val(),d;if(e.Utils.verifyInputs(c.el.all("input"))){c.hide();if(d=this._getSelectedLink()){a=new q(b.document);a.selectNodeContents(d);b.getSelection().selectRanges([a]);this._removeLink(d)}d={href:g};d.target=c.targetEl[0].checked?"_blank":"_self";a=b.getSelection().getRanges()[0];if(a.collapsed){a=new p("<a href='"+g+"' target='"+d.target+"'>"+g+"</a>",null,b.document);
b.insertElement(a)}else{b.fire("save");a=new l(n,d);a.apply(b.document);b.fire("save")}b.notifySelectionChange()}},_prepare:function(){f.init&&f.init()},_real:function(){var a=f.dialog,b=this._getSelectedLink();a.link=this;if(b){a.urlEl.val(b.attr("href"));a.targetEl[0].checked=b.attr("target")=="_blank"}a.show()},show:function(){this._prepare()}});e.Utils.lazyRun(f.prototype,"_prepare","_real");e.Link=f}();i.addPlugin(function(){new e.Link(i)})});
