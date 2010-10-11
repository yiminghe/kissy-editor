/**
 * source editor for kissy editor
 * @author: yiminghe@gmail.com
 */
KISSY.Editor.add("sourcearea", function(editor) {
    var KE = KISSY.Editor,
        S = KISSY,
        UA = S.UA,
        TripleButton = KE.TripleButton;
    //firefox 3.5 不支持，有bug
    if (UA.gecko < 1.92) return;
    if (!KE.SourceArea) {
        (function() {
            var SOURCE_MODE = KE.SOURCE_MODE ,
                WYSIWYG_MODE = KE.WYSIWYG_MODE;

            function SourceArea(editor) {
                this.editor = editor;
                this._init();
            }

            S.augment(SourceArea, {
                _init:function() {
                    var self = this,editor = self.editor;
                    self.el = new TripleButton({
                        container:editor.toolBarDiv,
                        title:"源码",
                        contentCls:"ke-toolbar-source"
                    });
                    var el = self.el;
                    el.on("offClick", self._show, self);
                    el.on("onClick", self._hide, self);
                    editor.on("sourcemode", function() {
                        el.bon();
                    });
                    editor.on("wysiwygmode", function() {
                        el.boff();
                    });
                },
                _show:function() {
                    var self = this,
                        editor = self.editor;
                    editor.execCommand("sourceAreaSupport", SOURCE_MODE);
                    self.el.bon();
                },


                _hide:function() {
                    var self = this,
                        editor = self.editor,
                        el = self.el;
                    editor.execCommand("sourceAreaSupport", WYSIWYG_MODE);
                    el.boff();
                }
            });
            KE.SourceArea = SourceArea;
        })();
    }

    editor.addPlugin(function() {
        new KE.SourceArea(editor);
    });
});
