/**
 * smiley icon from wangwang for kissy editor
 * @author: yiminghe@gmail.com
 */
KISSY.Editor.add("smiley", function(editor) {
    var KE = KISSY.Editor,
        S = KISSY;

    editor.ready(function() {
        var context = editor.addButton("smiley", {
            contentCls:"ke-toolbar-smiley",
            title:"插入表情",
            loading:true
        });

        KE.use("smiley/support", function() {
            context.reload(KE.SmileySupport);
        });
    });
});
