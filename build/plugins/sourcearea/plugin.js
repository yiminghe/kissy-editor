/**
 * source editor for kissy editor
 * @author: yiminghe@gmail.com
 */
KISSY.Editor.add("sourcearea", function(editor) {
    var KE = KISSY.Editor,
        S = KISSY,
        UA = S.UA,
        TripleButton = KE.TripleButton;
    if (!KE.SourceArea) {
        (function() {
            function SourceArea(editor) {
                this.editor = editor;
                this._init();
            }

            S.augment(SourceArea, {
                _init:function() {
                    var self = this,editor = self.editor;
                    self.el = new TripleButton({
                        container:editor.toolBarDiv,
                        cls:"ke-tool-editor-source",
                        title:"源码",
                        contentCls:"ke-toolbar-source"
                        //text:"source"
                    });
                    self.el.on("offClick", self._show, self);
                    self.el.on("onClick", self._hide, self);

                    //不被父容器阻止默认，可点�?
                    editor.textarea.on("mousedown", function(ev) {
                        ev.stopPropagation();
                    });
                },
                _show:function() {
                    var self = this,
                        editor = self.editor,
                        textarea = editor.textarea,
                        iframe = editor.iframe,
                        el = self.el;
                    textarea.val(editor.getData());
                    editor._showSource();
                    el.set("state", TripleButton.ON);
                },
                _hide:function() {
                    var self = this,
                        editor = self.editor,
                        textarea = editor.textarea,
                        iframe = editor.iframe,
                        el = self.el;
                    editor._hideSource();
                    editor.setData(textarea.val());
                    //firefox 光标�?��，强迫刷�?
                    if (UA.gecko && editor.iframeFocus) {
                        el.el[0].focus();
                        editor.focus();
                    }
                    el.set("state", TripleButton.OFF);
                }
            });
            KE.SourceArea = SourceArea;
        })();
    }

    editor.addPlugin(function() {
        new KE.SourceArea(editor);
    });
});
