KISSY.Editor.add("pagebreak", function(editor) {
    var S = KISSY,
        KE = S.Editor,
        Node = S.Node,
        dataProcessor = editor.htmlDataProcessor,
        dataFilter = dataProcessor && dataProcessor.dataFilter,
        CLS = "ke_pagebreak",
        TYPE = "div";
    if (dataFilter) {
        dataFilter.addRules({
            elements :
            {
                div : function(element) {
                    var attributes = element.attributes,
                        style = attributes && attributes.style,
                        child = style && element.children.length == 1 && element.children[ 0 ],
                        childStyle = child && ( child.name == 'span' ) && child.attributes.style;

                    if (childStyle && ( /page-break-after\s*:\s*always/i ).test(style) && ( /display\s*:\s*none/i ).test(childStyle))
                        return dataProcessor.createFakeParserElement(element, CLS, TYPE);
                }
            }
        });
    }
    editor.ready(function() {
        var mark_up = '<div' +
            ' style="page-break-after: always; ">' +
            '<span style="DISPLAY:none">&nbsp;</span></div>';
        editor.addButton("page-break", {
            title:"分页",
            mode:KE.WYSIWYG_MODE,
            contentCls:"ke-toolbar-pagebreak",
            offClick:function() {
                var editor = this.editor,
                    real = new Node(mark_up, null, editor.document),
                    substitute = editor.createFakeElement ?
                        editor.createFakeElement(real,
                            CLS,
                            TYPE,
                            true,
                            mark_up) :
                        real,
                    insert = new Node("<div>", null, editor.document).append(substitute);
                editor.insertElement(insert);
            }
        });
    });
});