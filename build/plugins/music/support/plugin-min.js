KISSY.Editor.add("music/support",function(){function e(a){e.superclass.constructor.apply(this,arguments);a.cfg.disableObjectResizing||i.on(a.document.body,j.ie?"resizestart":"resize",function(b){(new c.Node(b.target)).hasClass(d)&&b.preventDefault()})}function f(a){return a._4e_name()==="img"&&!!a.hasClass(d)&&a}var c=KISSY,g=c.Editor,i=c.Event,h=g.Flash,j=c.UA,d="ke_music",k=["img."+d];c.extend(e,h,{_config:function(){this._cls=d;this._type="music";this._contextMenu=l;this._flashRules=k}});h.registerBubble("music",
"\u97f3\u4e50\u7f51\u5740\uff1a ",f);g.MusicInserter=e;var l={"\u97f3\u4e50\u5c5e\u6027":function(a){var b=a.editor.getSelection();(b=(b=b&&b.getStartElement())&&f(b))&&a.show(null,b)}}});
