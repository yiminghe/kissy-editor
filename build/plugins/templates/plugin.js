/**
 * templates support for kissy editor
 * @author: yiminghe@gmail.com
 */
KISSY.Editor.add("templates", function(editor) {
    var S = KISSY,
        KE = S.Editor,
        Node = S.Node,
        DOM = S.DOM,
        Dialog = KE.Dialog;

    DOM.addStyleSheet(
        ".ke-tpl {" +
            "    border: 2px solid #EEEEEE;" +
            "    width: 95%;" +
            "    margin: 20px auto;" +
            "}" +

            ".ke-tpl-list {" +
            "    border: 1px solid #EEEEEE;" +
            "    margin: 5px;" +
            "    padding: 7px;" +
            "    display: block;" +
            "    text-decoration: none;" +
            "    zoom: 1;" +
            "}" +

            ".ke-tpl-list:hover, .ke-tpl-selected {" +
            "    background-color: #FFFACD;" +
            "    text-decoration: none;" +
            "    border: 1px solid #FF9933;" +
            "}"
        , "ke-templates");

    editor.ready(function() {
        editor.addButton("templates", {
            contentCls:"ke-toolbar-template",
            title:"模板",
            mode:KE.WYSIWYG_MODE,
            offClick:function() {
                this.cfg._prepare.call(this);
            },
            _prepare:function() {
                var self = this,
                    editor = self.editor,
                    templates = editor.cfg.pluginConfig.templates || [],
                    HTML = "<div class='ke-tpl'>";
                for (var i = 0; i < templates.length; i++) {
                    var t = templates[i];
                    HTML += "<a " +
                        "href='javascript:void(0)' " +
                        "class='ke-tpl-list' " +
                        "tabIndex='-1'>" +
                        t.demo +
                        "</a>";
                }
                HTML += "</div>";

                var ui = new Dialog({
                    width:500,
                    mask:true,
                    autoRender:true,
                    headerContent:"内容模板",
                    bodyContent:HTML
                }),
                    list = ui.get("el").all(".ke-tpl-list");
                list.on("click", function(ev) {
                    ev.halt();
                    var t = new Node(ev.target);
                    var index = t._4e_index();
                    if (index != -1) {
                        editor.insertHtml(templates[index].html);
                    }
                    ui.hide();
                });
                self.ui = ui;
                self.cfg.show.call(self);
                self.cfg._prepare = self.cfg.show;
            },
            show:function() {
                this.ui.show();
            }
        });
    });


});
