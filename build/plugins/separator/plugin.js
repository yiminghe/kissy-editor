KISSY.Editor.add("separator", function(editor) {
    editor.addPlugin("separator", function() {

        new KISSY.Node('<span class="ke-toolbar-separator">&nbsp;</span>')
            .appendTo(editor.toolBarDiv);
    },{
        duplicate:true
    });
},{
    attach:false
});