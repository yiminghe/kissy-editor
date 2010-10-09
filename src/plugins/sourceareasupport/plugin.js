/**
 * 切换源码与可视化模式的命令对象
 */
KISSY.Editor.add("sourceareasupport", function(editor) {
    var KE = KISSY.Editor,
        S = KISSY,
        UA = S.UA;

    if (!KE.SourceAreaSupport) {
        (function() {
            var SOURCE_MODE = KE.SOURCE_MODE ,
                WYSIWYG_MODE = KE.WYSIWYG_MODE;

            function SourceAreaSupport() {
                var self = this;
                self.mapper = {};
                var m = self.mapper;
                m[SOURCE_MODE] = self._show;
                m[WYSIWYG_MODE] = self._hide;
            }

            S.augment(SourceAreaSupport, {
                exec:function(editor, mode) {
                    var m = this.mapper;
                    m[mode] && m[mode].call(this, editor);
                },

                _show:function(editor) {
                    var textarea = editor.textarea;
                    textarea.val(editor.getData());
                    this._showSource(editor);
                },
                _showSource:function(editor) {
                    var textarea = editor.textarea,
                        iframe = editor.iframe;
                    textarea.css("display", "");
                    iframe.css("display", "none");
                    //ie textarea height:100%不起作用
                    if (UA.ie < 8) {
                        textarea.css("height", editor.wrap.css("height"));
                    }
                    editor.fire("sourcemode");
                },
                _hideSource:function(editor) {
                    var textarea = editor.textarea,
                        iframe = editor.iframe;
                    iframe.css("display", "");
                    textarea.css("display", "none");
                    editor.fire("wysiwygmode");
                },
                _hide:function(editor) {
                    var textarea = editor.textarea;
                    this._hideSource(editor);
                    editor.setData(textarea.val());
                    //firefox 光标激活，强迫刷新                    
                    editor.activateGecko();
                }
            });
            KE.SourceAreaSupport = new SourceAreaSupport();
        })();
    }


    editor.addPlugin(function() {
        editor.addCommand("sourceAreaSupport", KE.SourceAreaSupport);
    });

});