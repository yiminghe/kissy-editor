KISSY.Editor.add("separator", function(editor) {
    editor.ready(function() {
        new KISSY.Node('<span class="ke-toolbar-separator">&nbsp;</span>')
            .appendTo(editor.toolBarDiv);
    });
});