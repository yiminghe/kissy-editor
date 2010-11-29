KISSY.Editor.add("resize", function(editor) {
    var S = KISSY,
        KE = S.Editor,
        Node = S.Node,
        Draggable = S.Draggable;

    editor.ready(function() {
        var statusDiv = editor.statusDiv,
            resizer = new Node("<div class='ke-resizer'>"),
            cfg = editor.cfg["pluginConfig"]["resize"] || {};
        cfg = cfg["direction"] || ["x","y"];
        resizer.appendTo(statusDiv);
        //最大化时就不能缩放了
        editor.on("maximizeWindow", function() {
            resizer.css("display", "none");
        });
        editor.on("restoreWindow", function() {
            resizer.css("display", "");
        });
        var d = new Draggable({
            node:resizer
        }),
            height = 0,
            width = 0,
            heightEl = editor.wrap,
            widthEl = editor.editorWrap;
        d.on("dragstart", function() {
            height = heightEl.height();
            width = widthEl.width();
        });
        d.on("drag", function(ev) {
            var diffX = ev.pageX - this.startMousePos.left,
                diffY = ev.pageY - this.startMousePos.top;

            if (S.inArray("y", cfg)) heightEl.height(height + diffY);
            if (S.inArray("x", cfg)) widthEl.width(width + diffX);
        });
    });
});