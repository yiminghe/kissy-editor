KISSY.Editor.add("sourceareasupport",function(e){var c=KISSY.Editor,f=KISSY,g=f.UA;c.SourceAreaSupport||function(){function h(){var a=this.mapper={};a[i]=this._show;a[j]=this._hide}var i=c.SOURCE_MODE,j=c.WYSIWYG_MODE;f.augment(h,{exec:function(a,b){var d=this.mapper;d[b]&&d[b].call(this,a)},_show:function(a){a.textarea.val(a.getData(true));this._showSource(a);a.fire("sourcemode")},_showSource:function(a){var b=a.textarea,d=a.iframe;b.css("display","");d.css("display","none");g.ie<8&&b.css("height",
a.wrap.css("height"));b[0].focus()},_hideSource:function(a){var b=a.textarea;a.iframe.css("display","");b.css("display","none")},_hide:function(a){var b=a.textarea;this._hideSource(a);a.fire("save");a.setData(b.val());a.fire("wysiwygmode");a.fire("save");g.gecko&&a.activateGecko()}});c.SourceAreaSupport=new h}();e.addPlugin(function(){e.addCommand("sourceAreaSupport",c.SourceAreaSupport)})});
