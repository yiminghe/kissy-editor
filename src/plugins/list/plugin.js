/**
 * list formatting
 * @modifier: yiminghe@gmail.com
 */
KISSY.Editor.add("list", function(editor) {
    var KE = KISSY.Editor;
    editor.ready(function() {
        var context = editor.addButton("ul", {
            title:"项目列表",
            contentCls:"ke-toolbar-ul",
            loading:true,
            type:"ul"
        });
        var contextOl = editor.addButton("ol", {
            title:"编号列表",
            contentCls:"ke-toolbar-ol",
            loading:true,
            type:"ol"
        });
        KE.use("list/support", function() {
            context.reload(KE.ListSupport);
            contextOl.reload(KE.ListSupport);
        });
    });
});
