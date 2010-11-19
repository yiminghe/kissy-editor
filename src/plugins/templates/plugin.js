/**
 * templates support for kissy editor
 * @author: yiminghe@gmail.com
 */
KISSY.Editor.add("templates", function(editor) {
    var KE = KISSY.Editor,
        S = KISSY,
        Node = S.Node,
        //Event = S.Event,
        //KEN = KE.NODE,
        //UA = S.UA,
        DOM = S.DOM,
        TripleButton = KE.TripleButton,
        Dialog = KE.Dialog;

    if (!KE.TplUI) {

        (function() {
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


            function TplUI(editor) {
                this.editor = editor;
                this._init();
            }

            S.augment(TplUI, {
                _init:function() {
                    var self = this,editor = self.editor,el = new TripleButton({
                        container:editor.toolBarDiv,
                        //text:"template",
                        contentCls:"ke-toolbar-template",
                        title:"模板"
                    });
                    el.on("offClick", self._show, self);
                    KE.Utils.lazyRun(this, "_prepare", "_real");
                    self.el = el;
                    KE.Utils.sourceDisable(editor, self);
                },
                disable:function() {
                    this.el.set("state", TripleButton.DISABLED);
                },
                enable:function() {
                    this.el.set("state", TripleButton.OFF);
                },
                _prepare:function() {
                    var self = this,editor = self.editor,templates = editor.cfg.pluginConfig.templates || [];
                    var HTML = "<div class='ke-tpl'>";

                    for (var i = 0; i < templates.length; i++) {
                        var t = templates[i];
                        HTML += "<a href='javascript:void(0)' class='ke-tpl-list' tabIndex='-1'>" + t.demo + "</a>";
                    }
                    HTML += "</div>";

                    this._initDialogOk = true;
                    var ui = new Dialog({
                        width:500,
                        mask:true,
                        headerContent:"内容模板",
                        bodyContent:HTML});
                    ui.renderer();
                    var list = ui.get("el").all(".ke-tpl-list");
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
                },
                _real:function() {
                    var self = this;
                    self.ui.show();
                },
                _show:function() {
                    var self = this;
                    self._prepare();
                }
            });
            KE.TplUI = TplUI;
        })();
    }
    editor.addPlugin(function() {
        new KE.TplUI(editor);

    });

});
