KISSY.Editor.add("bangpai-upload", function(editor) {
    var S = KISSY,
        KE = S.Editor,
        UA = S.UA;

    if (!KE.BangPaiUpload) {
        (function() {

            function BangPaiUpload(editor) {
                var self = this;
                self.editor = editor;
                self._init();
            }

            S.augment(BangPaiUpload, S.EventTarget, {
                _init:function() {
                    var self = this,
                        editor = self.editor,
                        el = new KE.TripleButton({
                            contentCls:"ke-toolbar-mul-image",
                            title:"批量插图",
                            container:editor.toolBarDiv
                        });
                    el.on("offClick", self.show, self);
                    self.el = el;
                    KE.Utils.sourceDisable(editor, self);
                    self.disable();
                    KE.storeReady(function() {
                        self.enable();
                    });
                },
                disable:function() {
                    this.el.disable();
                },
                enable:function() {
                    this.el.boff();
                },
                show:function() {
                    var editor = this.editor;
                    editor.useDialog("bangpai-upload/dialog", function(dialog) {
                        dialog.show();
                    });
                }
            });

            KE.add({
                "bangpai-upload/dialog":{
                    attach: false,
                    requires:["flashutils","progressbar","flashbridge","overlay"],
                    path:KE.Utils.debugUrl(
                        "biz/bangpai/plugins/upload/" +
                            "dialog/plugin.js?t=@TIMESTAMP@"
                        )
                }
            });
            KE.BangPaiUpload = BangPaiUpload;
        })();
    }
    editor.addPlugin(function() {
        new KE.BangPaiUpload(editor);
    });
}, {
    attach:false,
    requires : ["localStorage","button"]
});