KISSY.Editor.add("bubbleview",function(){function d(a){d.superclass.constructor.apply(this,arguments);a.init&&a.init.call(this)}function l(a){a=f[a];if(!a.bubble)a.bubble=new d(a.cfg);return a.bubble}var g=KISSY.Editor,h=KISSY,j=h.Event,m=h.Node;if(!g.BubbleView){var f={};d.attach=function(a){var e=a.pluginInstance,i=a.pluginName;a=e.editor;var k=f[i];if(k){var n=k.cfg.func,b=f[i].bubble;a.on("selectionChange",function(c){c=c.path;var o=c.elements;if(c&&o)if(c=c.lastElement)if(c=n(c)){b=l(i);b._selectedEl=
c;b._plugin=e;b.show()}else if(b){b._selectedEl=b._plugin=null;b.hide()}});j.on(a.document,"scroll",function(){b&&b.hide()});j.on(document,"click",function(){b&&b.hide()})}};d.register=function(a){f[a.pluginName]={cfg:a}};d.ATTRS={focusMgr:{value:false}};h.extend(d,g.SimpleOverlay,{_initEl:function(){var a=new m('<div class="ke-bubbleview-bubble" onmousedown="return false;"></div>');a.appendTo(document.body);this.el=a;this.set("el",a)},show:function(){var a=this._selectedEl,e=a._4e_getOffset(document);
e.top+=a.height()+5;d.superclass.show.call(this,e)}});g.BubbleView=d}});
