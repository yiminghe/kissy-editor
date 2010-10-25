KISSY.Editor.add("separator", function(editor) {
    editor.addPlugin(function() {
        new KISSY.Node('<span class="ke-toolbar-separator">&nbsp;</span>').appendTo(editor.toolBarDiv);
    });
});