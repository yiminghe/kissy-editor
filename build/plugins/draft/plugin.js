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
                INTERVAL = 5 * 60 ,
                JSON = S.JSON,
                MIDDLE = " vertical-align:middle;",
                DRAFT_SAVE = "ke-draft-save",
                localStorage = window[KE.STORE],
                TIP = "内容正文每10分钟自动保存一次，上次保存 ： ";

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
                        padding(d.getMonth() - 1, 2, "0"),
                        "-",
                        padding(d.getDay(), 2, "0"),
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
                        holder = new Node(
                            "<div style='" +
                                "position:absolute;" +
                                "right:30px;" +
                                "bottom:0;" +
                                "width:600px'>" +
                                "<span style='" + MIDDLE + "'>" +
                                "内容正文每5分钟自动保存一次。" +
                                "</span>" +
                                "</div>").appendTo(statusbar);
                    self.timeTip = new Node("<span style='" + MIDDLE + "" +
                        "margin:0 10px;" +
                        "'>").appendTo(holder);
                    var versions = new KE.Select({
                        container: holder,
                        doc:editor.document,
                        width:"100px",
                        popUpWidth:"220px",
                        title:"恢复编辑历史"
                    }),
                        save = new KE.TripleButton({
                            text:"立即保存",
                            title:"立即保存",
                            container: holder
                        }),
                        str = localStorage.getItem(DRAFT_SAVE),
                        drafts = [],date;
                    self.versions = versions;
                    if (str) {
                        drafts = S.isString(str) ? JSON.parse(decodeURIComponent(str)) : str;
                    }
                    self.drafts = drafts;
                    self.sync();

                    save.on("click", function() {
                        self.save(false);
                    });

                    setInterval(function() {
                        self.save(true);
                    }, INTERVAL * 1000);

                    versions.on("click", self.recover, self);
                    self.holder = holder;
                    KE.Utils.sourceDisable(editor, self);
                },
                disable:function() {
                    this.holder.css("visibility", "hidden");
                },
                enable:function() {
                    this.holder.css("visibility", "");
                },
                sync:function() {
                    var self = this,
                        timeTip = self.timeTip,
                        versions = self.versions,drafts = self.drafts;
                    if (drafts.length > LIMIT)
                        drafts.splice(0, drafts.length - LIMIT);
                    var items = [],draft,tip;
                    for (var i = 0; i < drafts.length; i++) {
                        draft = drafts[i];
                        tip = (draft.auto ? "自动" : "手动") + "保存于：" + date(draft.date);
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
                    var self = this,drafts = self.drafts,data = editor._getRawData();

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
                        versions = self.versions,drafts = self.drafts,
                        v = ev.newVal;
                    versions.reset("value");
                    if (confirm("确认恢复 " + date(drafts[v].date) + " 的编辑历史？")) {
                        editor.fire("save");
                        editor._setRawData(drafts[v].content);
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