KISSY.Editor.add("bangpai-upload", function(editor) {
    var S = KISSY,KE = S.Editor;

    if (KE.BangPaiUpload) return;
    (function() {

        function BangPaiUpload(editor) {
            var self = this;
            self.editor = editor;
            self._init();
        }

        var DOM = S.DOM,
            Node = S.Node,
            holder = [],
            movie = KE.Config.base + KE.Utils.debugUrl("plugins/uploader/uploader.swf"),
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
                    up = new Node("<p " +
                        "style='margin:10px;" +
                        "text-align:right;'>" +
                        "<button>确定上传</button>" +
                        "</p>")
                        .appendTo(bangpaiUploaderHolder).one("button"),
                    fid = S.guid(name);
                holder[fid] = self;
                self.btn = btn;
                self.up = up;

                //swfready 要求可见
                flashPos.offset(boffset);

                var uploader = new KE.FlashBridge({
                    movie:movie,
                    methods:["removeFile",
                        "cancel",
                        "removeFile",
                        "setAllowMultipleFiles",
                        "setFileFilters",
                        "uploadAll"],
                    holder:flashPos,
                    attrs:{
                        width:btn.width() ,
                        height:btn.height()
                    },
                    flashVars:{
                        menu:true
                    }
                });

                self.uploader = uploader;
                self._list = list;
                self._ds = bangpaiCfg.serverUrl;
                self._dsp = bangpaiCfg.serverParams || {};
                self._fileInput = bangpaiCfg.fileInput || "Filedata";

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
                            uploader.cancel(fid);
                        } catch(e) {
                        }
                        uploader.removeFile(fid);
                        progressBars[fid].destroy();
                        delete progressBars[fid];
                        tr._4e_remove();
                    }
                });

                uploader.on("fileSelect", self._onSelect, self);
                uploader.on("uploadStart", self._onUploadStart, self);
                uploader.on("uploadProgress", self._onProgress, self);
                uploader.on("uploadComplete", self._onComplete, self);
                uploader.on("uploadCompleteData", self._onUploadCompleteData, self);
                uploader.on("swfReady", self._ready, self);
            },
            _onUploadStart:function(ev) {
                //console.log("_onUploadStart", ev);
                var id = ev.id,uploader = this.uploader;
                uploader.removeFile(id);
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
                    progess = Math.floor(ev.bytesLoaded * 100 / ev.bytesTotal),
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
                    uploader = self.uploader,
                    up = self.up,
                    btn = self.btn;
                //self.flashPos.offset(self.boffset);
                btn[0].disabled = false;
                uploader.setAllowMultipleFiles(true);
                uploader.setFileFilters([
                    {
                        extensions:"*.jpeg;*.jpg;*.png;*.gif",
                        description:"图片文件( png,jpg,jpeg,gif )"

                    }
                ]);
                up.on("click", function(ev) {
                    ev.halt();
                    uploader.uploadAll(self._ds, "POST",
                        self._dsp,
                        self._fileInput);
                })

            }
        });

        KE.BangPaiUpload = BangPaiUpload;
    })();
    editor.addPlugin(function() {
        new KE.BangPaiUpload(editor);
    });
},
{
    attach:false,
    requires : ["flashutils","progressbar","flashbridge"]
});