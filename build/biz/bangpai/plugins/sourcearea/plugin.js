/**
 * bangpai source editor for kissy editor
 * @author: yiminghe@gmail.com
 */
KISSY.Editor.add("bangpai-sourcearea", function(editor) {
    var KE = KISSY.Editor,
        S = KISSY,
        Node = S.Node,
        UA = S.UA,
        TripleButton = KE.TripleButton;
    //firefox 3.5 不支持，有bug
    if (UA.gecko < 1.92) return;
    if (!KE.BangPaiSourceArea) {
        (function() {
            var SOURCE_MODE = KE.SOURCE_MODE ,
                WYSIWYG_MODE = KE.WYSIWYG_MODE;

            function BangPaiSourceArea(editor) {
                this.editor = editor;
                this._init();
            }

            S.augment(BangPaiSourceArea, {
                _init:function() {
                    var self = this,
                        editor = self.editor,
                        statusDiv = editor.statusDiv;
                    self.el = new Node("<span " +
                        "style='zoom:1;display:inline-block;height:22px;line-height:22px;'>" +
                        "<input style='margin:0 5px;vertical-align:middle;' " +
                        "type='checkbox' />" +
                        "<span style='vertical-align:middle;'>编辑源代码</span></span>")
                        .appendTo(statusDiv).one("input");
                    var el = self.el;
                    el.on("click", self._check, self);
                    editor.on("sourcemode", function() {
                        el[0].checked = true;
                    });
                    editor.on("wysiwygmode", function() {
                        el[0].checked = false;
                    });
                },
                _check:function() {
                    var self = this,el = self.el;
                    if (el[0].checked) self._show();
                    else self._hide();
                },
                _show:function() {
                    var self = this,
                        editor = self.editor;
                    editor.execCommand("sourceAreaSupport", SOURCE_MODE);
                },


                _hide:function() {
                    var self = this,
                        editor = self.editor;
                    editor.execCommand("sourceAreaSupport", WYSIWYG_MODE);
                }
            });
            KE.BangPaiSourceArea = BangPaiSourceArea;
        })();
    }

    editor.addPlugin(function() {
        new KE.BangPaiSourceArea(editor);
    });
},
{
    attach:false,
    requires : ["sourceareasupport"]
});
