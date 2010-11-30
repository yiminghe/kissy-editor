KISSY.Editor.add("bangpai-upload", function(editor) {
    var S = KISSY,
        KE = S.Editor;

    if (!KE.Env.mods["bangpai-upload/dialog"]) {
        KE.add({
            "bangpai-upload/dialog":{
                attach: false,
                charset:"utf-8",
                requires:["flashutils","progressbar","flashbridge","overlay"],
                path:KE.Utils.debugUrl(
                    "biz/bangpai/plugins/upload/" +
                        "dialog/plugin.js"
                    )
            }
        });
    }
    editor.ready(function() {
        KE.use("button localstorage", function() {
            editor.addButton("bangpai-upload", {
                contentCls:"ke-toolbar-mul-image",
                title:"批量插图",
                offClick:function() {
                    var editor = this.editor;
                    editor.useDialog("bangpai-upload/dialog", function(dialog) {
                        dialog.show();
                    });
                }
            });
        });
    });
},{
    attach:false
});