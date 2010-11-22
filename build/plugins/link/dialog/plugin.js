KISSY.Editor.add("link/dialog", function(editor) {

    var S = KISSY,KE = S.Editor,Link = KE.Link;

    if (!Link.Dialog) {

        (function() {
            var checkLink = Link.checkLink,
                KEStyle = KE.Style,
                Node = S.Node,
                KERange = KE.Range,
                Dialog = KE.Dialog,
                _ke_saved_href = Link._ke_saved_href,
                BubbleView = KE.BubbleView,
                link_Style = Link.link_Style,
                MIDDLE = "vertical-align:middle;",

                bodyHtml = "<div style='padding:20px 20px 0 20px'>" +
                    "<p>" +
                    "<label>" +
                    "链接网址： " +
                    "<input " +
                    " data-verify='^(https?://[^\\s]+)|(#.+)$' " +
                    " data-warning='请输入合适的网址格式' " +
                    "class='ke-link-url ke-input' " +
                    "style='width:390px;" +
                    MIDDLE +
                    "'" +
                    " />" +
                    "</label>" +
                    "</p>" +
                    "<p " +
                    "style='margin: 15px 0 10px 0px;'>" +
                    "<label>" +
                    "链接名称： " +
                    "<input class='ke-link-title ke-input' style='width:100px;" +
                    MIDDLE + "'>" +
                    "</label> " +
                    "<label>" +
                    "<input " +
                    "class='ke-link-blank' " +
                    "style='vertical-align: middle; margin-left: 21px;' " +
                    "type='checkbox'/>" +
                    " &nbsp; 在新窗口打开链接" +
                    "</label>" +
                    "</p>" +

                    "</div>",
                footHtml = "" +
                    "<div style='padding:5px 20px 20px;'><a class='ke-link-ok ke-button' " +
                    "style='margin-left:65px;margin-right:20px;'>确定</a> " +
                    "<a class='ke-link-cancel ke-button'>取消</a>" +
                    "</div>";


            function LinkDialog(editor) {
                var self = this;
                self.editor = editor;
                KE.Utils.lazyRun(self, "_prepareShow", "_real");
            }

            Link.Dialog = LinkDialog;

            S.augment(LinkDialog, {
                _prepareShow:function() {

                    var self = this,
                        d = new Dialog({
                            width:500,
                            headerContent:"链接",//属性",
                            bodyContent:bodyHtml,
                            footerContent:footHtml,
                            mask:true
                        });
                    d.renderer();
                    self.dialog = d;
                    var body = d.get("body"),foot = d.get("footer");
                    d.urlEl = body.one(".ke-link-url");
                    d.urlTitle = body.one(".ke-link-title");
                    d.targetEl = body.one(".ke-link-blank");
                    var cancel = foot.one(".ke-link-cancel"),
                        ok = foot.one(".ke-link-ok");
                    ok.on("click", function() {
                        self._link();
                    }, self);
                    cancel.on("click", function() {
                        d.hide();
                    }, self);
                    KE.Utils.placeholder(d.urlEl, "http://");
                },
                //得到当前选中的 link a
                _getSelectedLink:function() {
                    var self = this,
                        editor = self.editor,
                        //ie焦点很容易丢失,tipwin没了
                        selection = editor.getSelection(),
                        common = selection && selection.getStartElement();
                    if (common) {
                        common = checkLink(common);
                    }
                    return common;
                },

                _link:function() {
                    var self = this,range,
                        editor = this.editor,
                        d = self.dialog,
                        url = d.urlEl.val(),
                        link,
                        attr,
                        a,
                        linkStyle;

                    if (!KE.Utils.verifyInputs(d.get("el").all("input"))) {
                        return;
                    }
                    d.hide();

                    link = self._getSelectedLink();

                    attr = {
                        href:url,
                        _ke_saved_href:url,
                        target:d.targetEl[0].checked ? "_blank" : "_self",
                        title:S.trim(d.urlTitle.val())
                    };

                    //是修改行为
                    if (link) {
                        editor.fire("save");
                        link.attr(attr);
                        editor.fire("save");
                    } else {
                        var sel = editor.getSelection();
                        range = sel && sel.getRanges()[0];
                        //编辑器没有焦点或没有选择区域时直接插入链接地址
                        if (!range || range.collapsed) {
                            a = new Node("<a>" + url + "</a>",
                                attr, editor.document);
                            editor.insertElement(a);
                        } else {
                            editor.fire("save");
                            linkStyle = new KEStyle(link_Style, attr);
                            linkStyle.apply(editor.document);
                            editor.fire("save");
                        }
                    }

                    editor.notifySelectionChange();
                },



                _real:function() {
                    var self = this,
                        d = self.dialog,
                        link = self._getSelectedLink();
                    d.link = this;
                    //是修改行为
                    if (link) {
                        KE.Utils.valInput(d.urlEl, link.attr(_ke_saved_href) || link.attr("href") || "");
                        d.urlTitle.val(link.attr("title") || "");
                        d.targetEl[0].checked = (link.attr("target") == "_blank");
                    } else {
                        KE.Utils.resetInput(d.urlEl);
                        d.urlTitle.val("");
                    }
                    d.show();
                },
                show:function() {
                    this._prepareShow();
                }
            });
        })();
    }
    editor.addDialog("link/dialog", new Link.Dialog(editor));
});