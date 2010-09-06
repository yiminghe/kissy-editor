KISSY.Editor.add("separator", function(editor) {
    var S = KISSY,markup = '<span class="ke-toolbar-separator">&nbsp;</span>';
    editor.addPlugin(function() {
        new S.Node(markup).appendTo(editor.toolBarDiv);
    });
});