/**
 * draft support for kissy editor
 * @author:yiminghe@gmail.com
 */
KISSY.Editor.add("draft", function(editor) {
    var S = KISSY,KE = S.Editor;
    if (!KE.Draft) {
        (function() {
            var Node = S.Node,
                LIMIT = 5,
                Event = S.Event,
                INTERVAL = 5,
                UA = KISSY.UA,
                JSON = S.JSON,
                DRAFT_SAVE = "ke-draft-save",
                localStorage = window[KE.STORE];

            function padding(n, l, p) {
                n += "";
                while (n.length < l) {
                    n = p + n;
                }
                return n;
            }

            function date(d) {
                if (S.isNumber(d)) {
                    d = new Date(d);
                }
                if (d instanceof Date)
                    return [
                        d.getFullYear(),
                        "-",
                        padding(d.getMonth() + 1, 2, "0"),
                        "-",
                        padding(d.getDate(), 2, "0"),
                        " ",
                        //"&nbsp;",
                        padding(d.getHours(), 2, "0"),
                        ":",
                        padding(d.getMinutes(), 2, "0"),
                        ":",
                        padding(d.getSeconds(), 2, "0")
                        //"&nbsp;",
                        //"&nbsp;"
                    ].join("");
                else
                    return d;
            }

            function Draft(editor) {
                this.editor = editor;
                this._init();
            }

            S.augment(Draft, {
                _init:function() {
                    var self = this,
                        editor = self.editor,
                        toolbar = editor.toolBarDiv,
                        statusbar = editor.statusDiv,
                        cfg = editor.cfg.pluginConfig;
                    cfg.draft = cfg.draft || {};
                    self.draftInterval = cfg.draft.interval
                        = cfg.draft.interval || INTERVAL;
                    self.draftLimit = cfg.draft.limit
                        = cfg.draft.limit || LIMIT;
                    var holder = new Node(
                        "<div class='ke-draft'>" +
                            "<spa class='ke-draft-title'>" +
                            "内容正文每" +
                            cfg.draft.interval
                            + "分钟自动保存一次。" +
                            "</span>" +
                            "</div>").appendTo(statusbar);
                    self.timeTip = new Node("<span class='ke-draft-time'>")
                        .appendTo(holder);

                    var save = new Node(
                        "<a " +
                            "class='ke-button ke-draft-save-btn' " +
                            "style='" +
                            "vertical-align:middle;" +
                            "padding:1px 9px;" +
                            "'>" +
                            "<span class='ke-draft-mansave'>" +
                            "</span>" +
                            "<span>立即保存</span>" +
                            "</a>"
                        ).appendTo(holder),
                        versions = new KE.Select({
                            container: holder,
                            menuContainer:document.body,
                            doc:editor.document,
                            width:"85px",
                            popUpWidth:"225px",
                            align:["r","t"],
                            title:"恢复编辑历史"
                        }),
                        str = localStorage.getItem(DRAFT_SAVE),
                        drafts = [],date;
                    self.versions = versions;
                    if (str) {
                        drafts = S.isString(str) ?
                            JSON.parse(decodeURIComponent(str)) : str;
                    }
                    self.drafts = drafts;
                    self.sync();

                    save.on("click", function() {
                        self.save(false);
                    });

                    /*
                     监控form提交，每次提交前保存一次，防止出错
                     */
                    (function() {
                        var textarea = editor.textarea,
                            form = textarea[0].form;
                        form && Event.on(form, "submit", function() {
                            self.save(false);
                        });
                    })();


                    setInterval(function() {
                        self.save(true);
                    }, self.draftInterval * 60 * 1000);

                    versions.on("click", self.recover, self);
                    self.holder = holder;
                    //KE.Utils.sourceDisable(editor, self);
                    if (cfg.draft.helpHtml) {
                        var help = new KE.TripleButton({
                            cls:"ke-draft-help",
                            title:"帮助",
                            text:"帮助",
                            container: holder
                        });
                        help.on("click", function() {
                            self._prepareHelp();
                        });
                        KE.Utils.lazyRun(self, "_prepareHelp", "_realHelp");
                        self.helpBtn = help.el;
                    }
                    self._holder = holder;

                },
                _prepareHelp:function() {
                    var self = this,
                        editor = self.editor,
                        cfg = editor.cfg.pluginConfig,
                        draftCfg = cfg.draft,
                        helpBtn = self.helpBtn,
                        help = new Node(draftCfg.helpHtml || "").appendTo(document.body);
                    var arrowCss = "height:0;" +
                        "position:absolute;" +
                        "font-size:0;" +
                        "width:0;" +
                        "border:8px #000 solid;" +
                        "border-color:#000 transparent transparent transparent;" +
                        "border-style:solid dashed dashed dashed;";
                    var arrow = new Node("<div style='" +
                        arrowCss +
                        "border-top-color:#CED5E0;" +
                        "'>" +
                        "<div style='" +
                        arrowCss +
                        "left:-8px;" +
                        "top:-10px;" +
                        "border-top-color:white;" +
                        "'>" +
                        "</div>" +
                        "</div>");
                    help.append(arrow);
                    help.css({
                        border:"1px solid #ACB4BE",
                        "text-align":"left"
                    });
                    self._help = new KE.SimpleOverlay({
                        el:help,
                        focusMgr:false,
                        draggable:false,
                        width:help.width() + "px",
                        mask:false
                    });
                    self._help.el.css("border", "none");
                    self._help.arrow = arrow;
                    Event.on([document,editor.document], "click", function(ev) {
                        var t = ev.target;
                        if (t == helpBtn[0] || helpBtn.contains(t))
                            return;
                        self._help.hide();
                    })
                },
                _realHelp:function() {
                    var win = this._help,
                        helpBtn = this.helpBtn,
                        arrow = win.arrow;
                    win.show();
                    var off = helpBtn.offset();
                    win.el.offset({
                        left:(off.left - win.el.width()) + 17,
                        top:(off.top - win.el.height()) - 7
                    });
                    arrow.offset({
                        left:off.left - 2,
                        top:off.top - 8
                    });
                },
                disable:function() {
                    this.holder.css("visibility", "hidden");
                },
                enable:function() {
                    this.holder.css("visibility", "");
                },
                sync:function() {
                    var self = this,
                        draftLimit = self.draftLimit,
                        timeTip = self.timeTip,
                        versions = self.versions,drafts = self.drafts;
                    if (drafts.length > draftLimit)
                        drafts.splice(0, drafts.length - draftLimit);
                    var items = [],draft,tip;
                    for (var i = 0; i < drafts.length; i++) {
                        draft = drafts[i];
                        tip = (draft.auto ? "自动" : "手动") + "保存于 : "
                            + date(draft.date);
                        items.push({
                            name:tip,
                            value:i
                        });
                    }
                    versions.set("items", items.reverse());
                    timeTip.html(tip);
                    localStorage.setItem(DRAFT_SAVE, encodeURIComponent(JSON.stringify(drafts)));
                },

                save:function(auto) {
                    var self = this,
                        drafts = self.drafts,
                        //不使用rawdata
                        //undo 只需获得可视区域内代码
                        //可视区域内代码！= 最终代码
                        //代码模式也要支持草稿功能
                        //统一获得最终代码
                        data = editor.getData(true);

                    //如果当前内容为空，不保存版本
                    if (!data) return;

                    if (drafts[drafts.length - 1] &&
                        data == drafts[drafts.length - 1].content) {
                        drafts.length -= 1;
                    }
                    self.drafts = drafts.concat({
                        content:data,
                        date:new Date().getTime(),
                        auto:auto
                    });
                    self.sync();
                },

                recover:function(ev) {
                    var self = this,
                        editor = self.editor,
                        versions = self.versions,
                        drafts = self.drafts,
                        v = ev.newVal;
                    versions.reset("value");
                    if (confirm("确认恢复 " + date(drafts[v].date) + " 的编辑历史？")) {
                        editor.fire("save");
                        editor.setData(drafts[v].content);
                        editor.fire("save");
                    }
                }
            });
            KE.Draft = Draft;
        })();
    }

    editor.addPlugin(function() {
        KE.storeReady(function() {
            new KE.Draft(editor);
        });
    });


});