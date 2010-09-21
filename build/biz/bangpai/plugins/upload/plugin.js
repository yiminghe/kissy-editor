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

            holder = [],movie = KE.Config.base + KE.Utils.debugUrl("biz/bangpai/" +
            "plugins/upload/uploader.swf"),
            Node = S.Node,
            progressBars = {};
        name = "ke-bangpai-upload";

        DOM.addStyleSheet("" +
            ".ke-upload-list {" +
            "width:90%;" +
            "margin:10px auto;" +
            "}" +
            "" +
            ".ke-upload-list td {" +
            "padding:0.5em;" +
            "}" +
            "", "ke-BangPaiUpload");

        S.augment(BangPaiUpload, S.EventTarget, {
            _init:function() {
                var self = this,
                    editor = self.editor,
                    bangpaiCfg = editor.cfg["pluginConfig"]["bangpai-upload"],
                    holderEl = bangpaiCfg.holder,
                    bangpaiUploaderHolder = S.isString(holderEl) ?
                        S.one(holderEl) :
                        holderEl,
                    flashHolder = new Node("<div style='position:relative'>")
                        .appendTo(bangpaiUploaderHolder),
                    btn = new Node("<button disabled='disabled'>选择文件</button>")
                        .appendTo(flashHolder),
                    clearList = new Node("<button>清除列表</button>")
                        .appendTo(flashHolder),
                    boffset = btn.offset(),
                    flashHolderOffset = flashHolder.offset(),
                    flashPos = new Node("<div style='" +
                        ("position:absolute;" +
                            "top:"
                            + (flashHolderOffset.top - boffset.top) +
                            "px;" +
                            "left:"
                            + (flashHolderOffset.left - boffset.left) + "px;" +
                            "width:" + btn.width() + "px;" +
                            "height:" + btn.height() + "px;" +
                            "z-index:9999;")
                        + "'>").appendTo(flashHolder),
                    list = new Node("<div>" +
                        "<table class='ke-upload-list'" +
                        ">" +
                        "<tbody>" +
                        "</tbody>" +
                        "</table>" +
                        "</div>").appendTo(bangpaiUploaderHolder)
                        .one("tbody"),
                    up = new Node("<p><button>开始上传</button></p>")
                        .appendTo(bangpaiUploaderHolder).one("button"),
                    fid = S.guid(name);
                holder[fid] = self;
                self.btn = btn;
                self.up = up;
                self.on("contentReady", self._ready, self);
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
                        //ds:bangpaiCfg.serverUrl,
                        // dsp:bangpaiCfg.serverParams,
                        swfID:fid,
                        jsEntry:"KISSY.Editor.BangPaiUpload.EventHandler",
                        browser: name,
                        useCompression: true,
                        hand:true,
                        btn:true
                    }
                });

                self.flash = flash;
                self._list = list;
                self._ds = bangpaiCfg.serverUrl;
                self._dsp = bangpaiCfg.serverParams || {};

                list.on("click", function(ev) {
                    var target = new Node(ev.target);
                    ev.halt();
                    if (target.hasClass("ke-upload-insert")) {


                    } else if (target.hasClass("ke-upload-delete")) {
                        var tr = target.parent("tr"),fid = tr.attr("fid");
                        flash.removeFile(fid);
                        progressBars[fid].destroy();
                        delete progressBars[fid];
                        tr._4e_remove();
                    }

                    /*else if (target.hasClass("ke-upload-cancel")) {
                     var tr = target.parent("tr");
                     flash.cancelUpload(tr.attr("fid"));
                     tr.one(".ke-upload-cancel").hide();
                     }*/
                });

                clearList.on("click", function(ev) {
                    var c;
                    for (var p in progressBars) {
                        if (progressBars.hasOwnProperty(p))
                            progressBars[p].destroy();
                    }
                    progressBars = {};
                    while (c = list[0].firstChild) {

                        DOM._4e_remove(c)
                    }
                });

                self.on("select", self._onSelect, self);
                self.on("progress", self._onProgress, self);
                self.on("complete", self._onComplete, self);
                self.on("uploadCompleteData", self._onUploadCompleteData, self);

            },
            _onComplete:function(ev) {

            },
            _onUploadCompleteData:function(ev) {

            },
            _onProgress:function(ev) {

            },
            _onSelect:function(ev) {
                var self = this,
                    list = self._list,
                    files = ev.files;
                if (files) {
                    for (var i = 0; i < files.length; i++) {
                        var f = files[i],
                            //console.log(f);
                            n = new Node("<tr fid='" + f.fid + "'>"
                                + "<td>"
                                + f.name
                                + "</td>"
                                + "<td>"
                                + Math.floor(f.size / 1000)
                                + "k</td>" +
                                "<td class='ke-upload-progress'>" +
                                "</td>" +
                                "<td>" +
                                "<a href='#' class='ke-upload-insert' style='display:none'>[插入]</a> &nbsp; " +
                                "<a href='#' class='ke-upload-delete'>[取消/删除]</a> &nbsp; " +
                                //"<a href='#' class='ke-upload-cancel'>[取消]</a> &nbsp; " +
                                "</td>"
                                + "</tr>").appendTo(list);

                        progressBars[f.fid] = new KE.ProgressBar({
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
                flash.browse(true, [
                    {desc:"图片文件( png,jpg,jpeg,gif )",ext:"*.jpeg;*.jpg;*.png;*.gif"}
                ]);
                up.on("click", function() {
                    flash.upload(self._ds,
                        self._dsp,
                        true);
                })

            },
            _eventHandler:function(event) {
                var self = this,
                    type = event.type;

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