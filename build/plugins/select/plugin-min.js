KISSY.Editor.add("select",function(){function g(a){g.superclass.constructor.call(this,a);this._init()}var h=KISSY,i=h.Node,m=h.Event,j=h.DOM,k=h.Editor;if(!k.Select){g.DISABLED=0;g.ENABLED=1;g.ATTRS={el:{},cls:{},container:{},doc:{},value:{},width:{},title:{},items:{},state:{value:1}};g.decorate=function(a){for(var d=a.width()-23,b=[],c=a.all("option"),e=0;e<c.length;e++){var f=c[e];b.push({name:j.html(f),value:j.attr(f,"value")})}return new g({width:d,el:a,items:b,cls:"ke-combox",value:a.val()})};
h.extend(g,h.Base,{_init:function(){var a=this.get("container"),d=this.get("el"),b=new i("<span class='ke-select-wrap'><a onclick='return false;' class='ke-select'><span class='ke-select-text'></span><span class='ke-select-drop-wrap'><span class='ke-select-drop'></span></span></a></span>"),c=this.get("title")||"",e=this.get("cls"),f=b.one(".ke-select-text");b.one(".ke-select-drop");this.get("value")?f.html(this._findNameByV(this.get("value"))):f.html(c);f.css("width",this.get("width"));b._4e_unselectable();
c&&b.attr("title",c);e&&b.addClass(e);if(d)d[0].parentNode.replaceChild(b[0],d[0]);else a&&b.appendTo(a);b.on("click",this._click,this);this.el=b;this.title=f;this._focusA=b.one("a.ke-select");k.Utils.lazyRun(this,"_prepare","_real");this.on("afterValueChange",this._valueChange,this);this.on("afterStateChange",this._stateChange,this)},_findNameByV:function(a){for(var d=this.get("title")||"",b=this.get("items"),c=0;c<b.length;c++){var e=b[c];if(e.value==a){d=e.name;break}}return d},_valueChange:function(a){this.title.html(this._findNameByV(a.newVal))},
_itemsChange:function(a){a=a.newVal;var d=this._selectList;d.html("");if(a)for(var b=0;b<a.length;b++){var c=a[b];(new i("<a class='ke-select-menu-item' href='#' data-value='"+c.value+"'>"+c.name+"</a>",c.attrs)).appendTo(d)._4e_unselectable()}this.as=d.all("a")},val:function(a){if(a){this.set("value",a);return this}else return this.get("value")},_prepare:function(){var a=this,d=a.el,b=a._focusA,c=new i("<div class='ke-menu' onmousedown='return false;'></div>"),e=new k.SimpleOverlay({el:c,zIndex:990,
focusMgr:false}),f=a.get("items");a.menu=e;a.get("title")&&(new i("<div class='ke-menu-title ke-select-menu-item' style='margin-top:-6px;' >"+a.get("title")+"</div>")).appendTo(c);a._selectList=(new i("<div>")).appendTo(c);a._itemsChange({newVal:f});a.get("popUpWidth")&&c.css("width",a.get("popUpWidth"));c.appendTo(document.body);e.on("show",function(){b.addClass("ke-select-active")});e.on("hide",function(){b.removeClass("ke-select-active")});m.on([document,a.get("doc")],"click",function(l){d._4e_contains(l.target)||
e.hide()});c.on("click",a._select,a);a.as=a._selectList.all("a");m.on(c[0],"mouseenter",function(){a.as.removeClass("ke-menu-selected")});a.on("afterItemsChange",a._itemsChange,a)},_stateChange:function(a){var d=this.el;a.newVal==1?d.removeClass("ke-select-disabled"):d.addClass("ke-select-disabled")},_select:function(a){a.halt();var d=this.menu,b=d.el;if(a=(new i(a.target))._4e_ascendant(function(f){return b._4e_contains(f)&&f._4e_name()=="a"},true)){var c=this.get("value"),e=a.attr("data-value");
this.set("value",e);this.fire("click",{newVal:e,preVal:c,name:a.html()});d.hide()}},_real:function(){var a=this.el.offset(),d=h.clone(a),b=this.menu.el.height(),c=this.menu.el.width(),e=a.top,f=j.scrollTop(),l=j.viewportHeight(),n=j.viewportWidth();a.top+=this.el.height()-2;if(a.top+b>f+l&&e-f>f+l-a.top){a=d;a.top-=b+9}if(a.left+c>n-60)a.left=n-c-60;this.menu.show(a)},_click:function(a){a.preventDefault();a=this.el;var d=this.get("value");if(!a.hasClass("ke-select-disabled"))if(this._focusA.hasClass("ke-select-active"))this.menu.hide();
else{this._prepare();d&&this.menu&&this.as.each(function(b){b.attr("data-value")==d?b.addClass("ke-menu-selected"):b.removeClass("ke-menu-selected")})}}});k.Select=g}});
