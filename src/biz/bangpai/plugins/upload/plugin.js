KISSY.Editor.add("bangpai-upload", function(editor) {
    var S = KISSY,KE = S.Editor;

    if (KE.BangPaiUpload) return;
    (function() {

        function BangPaiUpload(editor) {
            this.editor = editor;
            this._init();
        }

        var DOM = S.DOM,
            Node = S.Node,
            holder = [],
            movie = KE.Config.base + KE.Utils.debugUrl("plugins/uploader/uploader.swf"),
            Node = S.Node,
            progressBars = {};
        name = "ke-bangpai-upload";

        DOM.addStyleSheet("" +
            ".ke-upload-list {" +
            "width:100%;" +
            "" +
            "}" +

            ".ke-upload-list th {" +
            "border-top:1px solid #c1c8d1;" +
            "background-color:#EBEDF1;" +
            "}" +
            ".ke-upload-list td,.ke-upload-list th {" +
            "padding:0.5em;" +
            "text-align:center;" +
            "border-bottom:1px solid #c1c8d1;" +
            "}" +
            "", "ke-BangPaiUpload"
            )
            ;

        S.augment(BangPaiUpload, S.EventTarget, {
            _init:function() {
                var self = this,
                    editor = self.editor,
                    bangpaiCfg = editor.cfg["pluginConfig"]["bangpai-upload"],
                    holderEl = bangpaiCfg.holder,
                    bangpaiUploaderHolder = S.isString(holderEl) ?
                        S.one(holderEl) :
                        holderEl,
                    flashHolder = new Node("<div style='position:relative;" +
                        "margin:10px;'>批量上传图片：" +
                        "</div>")
                        .appendTo(bangpaiUploaderHolder),
                    btn = new Node("<button disabled='disabled'>浏览</button>")
                        .appendTo(flashHolder),
                    boffset = btn.offset(),
                    flashHolderOffset = flashHolder.offset(),
                    flashPos = new Node("<div style='" +
                        ("position:absolute;" +
                            "width:" + (btn.width() + 8) + "px;" +
                            "height:" + (btn.height() + 8) + "px;" +
                            "z-index:9999;")
                        + "'>").appendTo(flashHolder),
                    list = new Node("<div>" +
                        "<table class='ke-upload-list'>" +
                        "<thead>" +
                        "<tr>" +
                        "<th>" +
                        "图片" +
                        "</td>" +
                        "<th>" +
                        "大小" +
                        "</td>" +
                        "<th>" +
                        "上传进度" +
                        "</td>" +
                        "<th>" +
                        "图片操作" +
                        "</td>" +
                        "</tr>" +
                        "</thead>" +
                        "<tbody>" +
                        "</tbody>" +
                        "</table>" +
                        "</div>").appendTo(bangpaiUploaderHolder)
                        .one("tbody"),
                    up = new Node("<p style='margin:10px;" +
                        "text-align:right;'><button>确定上传</button></p>")
                        .appendTo(bangpaiUploaderHolder).one("button"),
                    fid = S.guid(name);
                holder[fid] = self;
                self.btn = btn;
                self.up = up;
                self.on("swfReady", self._ready, self);
                flashPos.offset(boffset);

                var flash = KE.Utils.flash.createSWFRuntime(movie, {
                    holder:flashPos,
                    attrs:{
                        allowScriptAccess:'always',
                        allowNetworking:'all',
                        scale:'noScale',
                        width:btn.width() ,
                        height:btn.height()
                    },
                    flashVars:{
                        allowedDomain : location.hostname,
                        shareData: true,
                        YUISwfId:fid,
                        YUIBridgeCallback:"KISSY.Editor.BangPaiUpload.EventHandler",
                        browser: name,
                        useCompression: true,
                        menu:true
                    }
                });

                self.flash = flash;
                self._list = list;
                self._ds = bangpaiCfg.serverUrl;
                self._dsp = bangpaiCfg.serverParams || {};

                list.on("click", function(ev) {
                    var target = new Node(ev.target),tr;
                    ev.halt();
                    if (target.hasClass("ke-upload-insert")) {
                        tr = target.parent("tr"),url = tr.attr("url");
                        editor.insertElement(new Node("<img src='" +
                            url + "'/>", null, editor.document));
                    } else if (target.hasClass("ke-upload-delete")) {
                        tr = target.parent("tr"),fid = tr.attr("fid");
                        try {
                            flash.cancel(fid);
                        } catch(e) {
                        }
                        flash.removeFile(fid);
                        progressBars[fid].destroy();
                        delete progressBars[fid];
                        tr._4e_remove();
                    }
                });
                /*
                 clearList.on("click", function() {
                 var c;
                 for (var p in progressBars) {
                 if (progressBars.hasOwnProperty(p))
                 progressBars[p].destroy();
                 try {
                 flash.cancel(p);
                 } catch(e) {
                 }
                 }
                 flash.clearFileList();
                 progressBars = {};
                 while (c = list[0].firstChild) {
                 DOM._4e_remove(c)
                 }
                 });
                 */
                self.on("fileSelect", self._onSelect, self);
                self.on("uploadStart", self._onUploadStart, self);
                self.on("uploadProgress", self._onProgress, self);
                self.on("uploadComplete", self._onComplete, self);
                self.on("uploadCompleteData", self._onUploadCompleteData, self);

            },
            _onUploadStart:function(ev) {
                //console.log("_onUploadStart", ev);
                var id = ev.id,flash = this.flash;
                flash.removeFile(id);
            },
            _onComplete:function() {
                //console.log("_onComplete", ev);
            },
            _onUploadCompleteData:function(ev) {
                var self = this,
                    data = S.trim(ev.data).replace(/\\r||\\n/g, ""),
                    id = ev.id,
                    list = self._list,
                    trs = list.all("tr");
                if (!data) return;
                data = JSON.parse(data);
                if (data.error) {
                    alert(data.error);
                    return;
                }
                for (var i = 0; i < trs.length; i++) {
                    var tr = new Node(trs[i]);
                    if (tr.attr("fid") == id) {
                        tr.one(".ke-upload-insert").show();
                        tr.attr("url", data.imgUrl);
                    }
                }

            },
            _onProgress:function(ev) {
                //console.log("_onProgress", ev);
                var fid = ev.id,
                    progess = ev.bytesLoaded * 100 / ev.bytesTotal,
                    bar = progressBars[fid];
                bar && bar.set("progress", progess);

            },
            _onSelect:function(ev) {
                //console.log("_onSelect", ev);
                var self = this,
                    list = self._list,
                    files = ev.fileList;
                if (files) {
                    for (var i in files) {
                        if (!files.hasOwnProperty(i)) continue;
                        var f = files[i],
                            //console.log(f);
                            n = new Node("<tr fid='" + f.id + "'>"
                                + "<td>"
                                + f.name
                                + "</td>"
                                + "<td>"
                                + Math.floor(f.size / 1000)
                                + "k</td>" +
                                "<td class='ke-upload-progress'>" +
                                "</td>" +
                                "<td>" +
                                "<a href='#' " +
                                "class='ke-upload-insert' " +
                                "style='display:none'>" +
                                "[插入]</a> &nbsp; " +
                                "<a href='#' class='ke-upload-delete'>[删除]</a> &nbsp; "
                                +
                                "</td>"
                                + "</tr>").appendTo(list);

                        progressBars[f.id] = new KE.ProgressBar({
                            container:n.one(".ke-upload-progress") ,
                            width:"100px",
                            height:"18px"
                        });
                    }
                }
            },

            _ready:function() {

                var self = this,
                    flash = self.flash,
                    up = self.up,
                    btn = self.btn;
                btn[0].disabled = false;
                flash.setAllowMultipleFiles(true);
                flash.setFileFilters([
                    {
                        extensions:"*.jpeg;*.jpg;*.png;*.gif",
                        description:"图片文件( png,jpg,jpeg,gif )"

                    }
                ]);
                up.on("click", function() {
                    flash.uploadAll(self._ds, "POST",
                        self._dsp,
                        "Filedata");
                })

            },
            _eventHandler:function(event) {
                var self = this,
                    type = event.type;
                //console.log(type);
                if (type === 'log') {
                    S.log(event.message);
                } else if (type) {
                    self.fire(type, event);
                }
            }
        });
        BangPaiUpload.EventHandler = function(fid, event) {
            holder[fid]._eventHandler.call(holder[fid], event);
        };
        KE.BangPaiUpload = BangPaiUpload;
    })();
    editor.addPlugin(function() {
        new KE.BangPaiUpload(editor);
    });
},
{
    attach:false,
    requires : ["flashutils","progressbar"]
});